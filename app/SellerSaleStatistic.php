<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SellerSaleStatistic extends Model
{
    protected $table = 'seller_sale_statistics';
    protected $fillable = ['seller_id', 'year', 'month', 'day', 'commission', 'price'];

    public static function saveSellerSaleStatistic($year, $month, $day, $seller_id, int $comis, int $productPrice, $type = 'plus')
    {
        if ($seller_id > 0) {
            $check = SellerSaleStatistic::where(['year' => $year, 'month' => $month, 'day' => $day, 'seller_id' => $seller_id])->first();
            if ($check) {
                if ($type == 'plus') {
                    $check->commission = $check->commission + $comis;
                    $check->price = $check->price + $productPrice;
                } else {
                    //اگر مرجوعی بود
                    $check->commission = $check->commission - $comis;
                    $check->price = $check->price - $productPrice;
                }
                $check->update();
            } else {
                if ($type == 'minus') {
                    //اگر مرجوعی باشد مبالغ منفی می شوند
                    $comis = -$comis;
                    $productPrice = -$productPrice;
                }
                SellerSaleStatistic::create([
                    'year' => $year,
                    'month' => $month,
                    'day' => $day,
                    'seller_id' => $seller_id,
                    'commission' => $comis,
                    'price' => $productPrice
                ])->save();
            }
        }
    }

}
