<?php

namespace App;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderProduct extends Model
{
    protected $table = 'order_products';
    protected $fillable = ['product_id', 'warranty_id', 'color_id', 'order_id', 'seller_id', 'stockroom_id', 'product_price1', 'product_price2', 'product_count', 'preparation_time', 'send_status', 'time', 'seller_read', 'commission', 'description'];

    public static function createOrderProducts($globalSendData, $newOrder)
    {
        if (array_key_exists('cart_product_data', $globalSendData)) {
            foreach ($globalSendData['cart_product_data'] as $product) {
                $newOrderProduct = OrderProduct::create([
                    'product_id' => $product['product_id'],
                    'warranty_id' => $product['warranty_id'],
                    'color_id' => $product['color_id'],
                    'order_id' => $newOrder->id,
                    'seller_id' => $product['seller_id'] ?? 0,
                    'product_price1' => $product['price1'] / $product['product_count'], //باید قیمت واحد را ثبت کنیم. پس تقسیم بر تعداد می کنیم
                    'product_price2' => $product['price2'] / $product['product_count'],
                    'product_count' => $product['product_count'],
                    'preparation_time' => $product['send_time'],
                    'time' => time(),
                ]);
                if ($product['is_gift_cart'] == GiftCart::IS_GIFT_CART) {
                    GiftCart::newGiftCart($product, $newOrder->id);
                }
                $newOrderProduct->save();
            }
            return true;
        }
    }

    public static function setReturnProduct(Request $request, $orderProduct)
    {
        DB::beginTransaction();
        try {
            //تغییر وضعیت محصول به مرجوه شده
            $returnProductCount = $request->count;
            $description = $request->description;
            $stockroomId = $request->stockroom_id;
            $returnProductCount = $request->count;
            //اگر تعداد محصول سفارش داده شده یکی باشد
            if ($returnProductCount == 1 && $returnProductCount == $orderProduct->product_count) {
                $orderProduct->send_status = Order::SEND_STATUS_CANCELED;
                $orderProduct->description = $description;
                $orderProduct->stockroom_id = $stockroomId;
                $orderProduct->update();
                self::setSale($orderProduct, 'minus');
            } else {
                //اگر تعداد محصول برگشتی بیش از یکی بود باید یک سطر جدید برای محصولات باقی مانده درست کنیم و سطرفعلی را هم با تعداد مرجوعی و وضعیت آن آپدیت کنیم
                $newOrderProduct = $orderProduct->replicate();
                $remainProductCount = $orderProduct->product_count - $returnProductCount;
                $remainProductCommission = ($orderProduct->commission * $remainProductCount) / $orderProduct->product_count;
                $newOrderProduct->product_count = $remainProductCount;
                $newOrderProduct->commission = $remainProductCommission;
                $newOrderProduct->save(); //سطر جدید برای باقی مانده محصولات در زمانی که از یک محصول بیش از یک عدد سفارش داده شده

                $orderProduct->send_status = Order::SEND_STATUS_CANCELED;
                $orderProduct->description = $description;
                $orderProduct->stockroom_id = $stockroomId;
                $orderProduct->product_count = $returnProductCount;
                $orderProduct->update();
            }

            self::stockroomEvent($request, $returnProductCount, $orderProduct);
            DB::commit();

            return redirect('admin/orders/return-product');
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    private static function setSale($orderProduct, $type = 'minus')
    {
        DB::beginTransaction();
        try {
            $jdf = new Jdf();
            $time = time();
            $year = $jdf->tr_num($jdf->jdate('Y', $time));
            $month = $jdf->tr_num($jdf->jdate('n', $time));
            $day = $jdf->tr_num($jdf->jdate('j', $time));
            $productPrice = $orderProduct->product_price2 * $orderProduct->product_count;
            $sellerId = $orderProduct->seller_id;
            $commission = $orderProduct->commission;
            SaleStatistic::updateSeller($sellerId, $commission, $productPrice, $type);
            SellerSaleStatistic::saveSellerSaleStatistic($year, $month, $day, $sellerId, $commission, $productPrice, $type);
            ProductSaleStatistic::saveProductSaleStatistic($year, $month, $day, $commission, $orderProduct->product_id, $productPrice, $type);
            SaleStatistic::saveOverallStatistic($year, $month, $day, $commission, $productPrice, $type);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
        }

    }


    private static function stockroomEvent($request, $returnProductCount, $orderProduct, $stockroomId = null)
    {

        $productWarranty = ProductWarranty::where([
            'product_id' => $orderProduct->product_id,
            'warranty_id' => $orderProduct->warranty_id,
            'color_id' => $orderProduct->color_id,
            'seller_id' => $orderProduct->seller_id,
        ])->withTrashed()->first();

        if ($productWarranty) {
            $list = $productWarranty->id . '_' . $returnProductCount;
        }
        $stockroomId = $stockroomId ? $stockroomId : $request->stockroom_id;

        Stockroom::saveProducts($request, $returnProductCount, $list, $stockroomId);
    }

    public static function removeReturnProduct(Request $request, $orderProduct)
    {
        DB::beginTransaction();
        try {
            $description = $request->description;
            $stockroomId = $orderProduct->stockroom_id;
            $orderProduct->send_status = Order::SEND_STATUS_DELIVERY_CUSTOMER;
            $orderProduct->description = $description;
            $orderProduct->stockroom_id = 0;
            $orderProduct->update();
            self::stockroomEvent($request, $orderProduct->product_count, $orderProduct, $stockroomId);
            self::setSale($orderProduct, 'plus');

            DB::commit();
        } catch (Exception $exception) {
            DB::rollBack();
        }
    }

    public function getProduct()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }

    public function getWarranty()
    {
        return $this->hasOne(Warranty::class, 'id', 'warranty_id');

    }

    public function getColor()
    {
        return $this->hasOne(Color::class, 'id', 'color_id');
    }

    public function getOrder()
    {
        return $this->hasOne(Order::class, 'id', 'order_id');
    }

    public function getStockroom()
    {
        return $this->hasOne(Stockroom::class, 'id', 'stockroom_id')->withDefault(['name' => 'انباری انتخاب نشده است']);
    }

    public function getSeller()
    {
        return $this->hasOne(Seller::class, 'id', 'seller_id')
            ->withDefault(['brand_name', 'دیجی کالا']);
    }

}
