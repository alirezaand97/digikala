<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SaleStatistic extends Model
{
    protected $table = 'sale_statistics';
    protected $fillable = ['year', 'month', 'day', 'commission', 'price'];

    public static function saveSaleStatistic($order)
    {
        $jdf = new Jdf();
        $year = $jdf->tr_num($jdf->jdate('Y'));
        $month = $jdf->tr_num($jdf->jdate('n'));
        $day = $jdf->tr_num($jdf->jdate('j'));
        $totalCommission = 0;
        $totalPrice = 0;

        foreach ($order->getOrderProducts as $orderProduct) {
            $catId = $orderProduct->getProduct->cat_id;
            $brandId = $orderProduct->getProduct->brand_id;
            $comis = 0;
            $productPrice = $orderProduct->product_price2 * $orderProduct->product_count;
            $totalPrice += $productPrice;

            if ($orderProduct->seller_id > 0) {
                $checkCommission = Commission::where(['brand_id' => $brandId, 'category_id' => $catId])->first();
                if ($checkCommission) {
                    $comis = ($productPrice * $checkCommission->percentage) / 100;
                    $totalCommission += $comis;
                }

                self::updateSeller($orderProduct->seller_id, $comis, $productPrice, 'plus');
                SellerSaleStatistic::saveSellerSaleStatistic($year, $month, $day, $orderProduct->seller_id, $comis, $productPrice);
                $orderProduct->commission = $comis;
                $orderProduct->update();
            }
            $type = 'plus';
            ProductSaleStatistic::saveProductSaleStatistic($year, $month, $day, $comis, $orderProduct->product_id, $productPrice, $type);
            self::saveOverallStatistic($year, $month, $day, $totalCommission, $totalPrice, $type);
        }

    }

    /**
     * آپدیت اطلاعات فروش فروشنده
     * @param $seller_id
     * @param int $comis
     * @param int $productPrice
     */
    public static function updateSeller($seller_id, int $comis, int $productPrice, $type = 'plus')
    {

        $seller = Seller::where('id', $seller_id)->first();
        if ($seller) {
            if ($type == 'plus') {
                $seller->total_commission = $seller->total_commission + $comis;
                $seller->total_price = $seller->total_price + $productPrice;
                $seller->new_order_count = $seller->new_order_count + 1;
            } else {
                $seller->total_commission = $seller->total_commission - $comis;
                $seller->total_price = $seller->total_price - $productPrice;
            }
            $seller->update();
        }
    }

    public static function saveOverallStatistic($year, $month, $day, int $totalCommission, int $totalPrice, $type = 'plus')
    {

        $check = SaleStatistic::where(['year' => $year, 'month' => $month, 'day' => $day])->first();
        if ($check) {
            if ($type == 'plus') {
                $check->commission = $check->commission + $totalCommission;
                $check->price = $check->price + $totalPrice;
            } else {
                //اگر مرجوعی بود
                $check->commission = $check->commission - $totalCommission;
                $check->price = $check->price - $totalPrice;
            }
            $check->update();
        } else {
            if ($type == 'minus') {
                //اگر مرجوعی باشد مبالغ منفی می شوند
                $totalCommission = -$totalCommission;
                $totalPrice = -$totalPrice;
            }
            SaleStatistic::create([
                'year' => $year,
                'month' => $month,
                'day' => $day,
                'commission' => $totalCommission,
                'price' => $totalPrice
            ])->save();
        }
    }
}
