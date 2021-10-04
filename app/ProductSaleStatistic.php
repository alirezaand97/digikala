<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductSaleStatistic extends Model
{
    protected $table = 'product_sale_statistics';
    protected $fillable = ['year', 'month', 'day', 'product_id', 'commission', 'price'];

    /**
     * @param $year
     * @param $month
     * @param $day
     * @param $comis
     * @param $product_id
     * @param $productPrice
     * @param string $type اگر پلاس باشد یعنی خرید انجام شده و اگر ماینس باشد یعنی مرجوعی داشته ایم
     */
    public static function saveProductSaleStatistic($year, $month, $day, $comis, $product_id, $productPrice, $type = 'plus')
    {
        $check = ProductSaleStatistic::where(['year' => $year, 'month' => $month, 'day' => $day, 'product_id' => $product_id])->first();
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
            ProductSaleStatistic::create([
                'year' => $year,
                'month' => $month,
                'day' => $day,
                'product_id' => $product_id,
                'commission' => $comis,
                'price' => $productPrice
            ])->save();
        }
    }
}
