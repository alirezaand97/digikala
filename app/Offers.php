<?php


namespace App;


use App\Jobs\RemoveIncredibleOfferJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class Offers
{
    /**
     * این کلاس مدل نیست و فقط برای جلوگیری از کدهای زیاد در کنترلر admin ایجاد شده
     */

    public function addOffer($request, $productWarranty)
    {
        $validator = Validator::make($request->all(), [
            'price1' => 'required|numeric',
            'price2' => 'required|numeric',
            'product_number' => 'required|numeric',
            'product_number_cart' => 'required|numeric',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
        ], [], [
            'price1' => 'هزینه محصول',
            'price2' => 'هزینه محصول برای فروش',
            'product_number' => ' موجودی محصول',
            'product_number_cart' => 'تعداد قابل سفارش در سبد خرید',
            'start_date' => 'زمان شروع تخفیف',
            'end_date' => 'زمان پایان تخفیف',
        ]);
        if ($validator->fails()) {
            return response(['errorsget_incredible_time' => $validator->errors(), 'type' => 'server_error']);
        } else {

            $firstDate = get_timestamp_from_jalali($request->start_date, true);
            $endDate = get_timestamp_from_jalali($request->end_date, true);
            $hasOffer = OldPrice::where('product_warranty_id', $productWarranty->id)->first();
            if (!$hasOffer) {
                $this->addNewOffer($request, $productWarranty);
            } else {
                $this->updateOffer($hasOffer, $request, $productWarranty);
            }
            $jobTime = $endDate - time() + 1;
            RemoveIncredibleOfferJob::dispatch($productWarranty->id)->delay(now()->addSeconds(60));

            $productWarranty->offers_start_time = $firstDate;
            $productWarranty->offers_end_time = $endDate;
            $productWarranty->offers_start_date = $request->start_date;
            $productWarranty->offers_end_date = $request->end_date;
            $productWarranty->is_offer = 1;
            if ($productWarranty->update($request->all())) {
                $product = Product::where('id', $productWarranty->product_id)->first();
                update_product_price($product);
                add_min_product_price($productWarranty);
                return 'success';
            } else {
                return 'error';
            }
        }
    }

    public function addNewOffer($request, $productWarranty)
    {
        /**
         * تعداد محصول در درخواست همان تعدادیست که در تخفیف می خواهیم بفروشیم. از تعداد کل محصول کم می کنیم و می شود تعداد محصولی که بعد تخفیف برایمان می ماند
         */
        $n = $productWarranty->product_number - $request->product_number;
        if ($n < 0) {
            $n = 0;
        }
        OldPrice::create([
            'product_warranty_id' => $productWarranty->id,
            'price1' => $productWarranty->price1,
            'price2' => $productWarranty->price2,
            'product_number' => $n,
            'product_number_cart' => $productWarranty->product_number_cart,
            'product_number_sales' => $productWarranty->product_number
        ])->save();

    }

    public function updateOffer($offer, $request, $productWarranty)
    {
        //product_number تعداد محصول بعد از پایان تخفیف
        //product_number_salesتعداد محصول که در تخفیف قرار است فروخته شود
        //اگر این محصول شامل تخفیف بوده می توانیم تنها تعداد آنرا تغییر دهیم. این سیاست ماست
        $n = $offer->product_number;
        if ($offer->product_number_sales > $request->product_number) {
            $r = $offer->product_number_sales - $request->product_number;
            $n = $n + $r;
        } else {
            $r = $request->product_number - $offer->product_number_sales;
            $n = $n - $r;
        }
        OldPrice::where('id', $offer->id)->update([
            'product_number_sales' => $request->product_number,
            'product_number' => $n
        ]);

    }

    public function deleteOffer($productWarranty)
    {
        try {
            DB::beginTransaction();
            $oldPrice = OldPrice::where('product_warranty_id', $productWarranty->id)->first();
            if ($oldPrice) {
                //مقادیر محصول را به حالت پیش از پیشنهاد شگفت انگیز بر می گردانیم
                $productWarranty->price1 = $oldPrice->price1;
                $productWarranty->price2 = $oldPrice->price2;
                if ($productWarranty->product_number > 0) {
                    $n = $oldPrice->product_number + $productWarranty->product_number;
                    $productWarranty->product_number = $n;
                } else {
                    $productWarranty->product_number = $oldPrice->product_number;
                }
                $productWarranty->product_number_cart = $oldPrice->product_number_cart;
                $productWarranty->is_offer = 0;

                $product = Product::where('id', $productWarranty->product_id)->first();
                //بعد از هر تغییر در تنوع قیمت باید اطلاعات بروز رسانی شود
                update_product_price($product);
                add_min_product_price($productWarranty);

                $productWarranty->update();
                $oldPrice->delete();
                DB::commit();
                return $productWarranty;
            } else {
                return 'error';
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);
            return 'error';
        }

    }


}
