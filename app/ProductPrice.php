<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductPrice extends Model
{
    use SoftDeletes;
    protected $table = 'product_price';
    protected $fillable = ['product_id', 'color_id', 'warranty_id', 'time', 'year', 'month', 'day', 'price',];

    public function getColor()
    {
        return $this->hasOne(Color::class, 'id', 'color_id');
    }

    public function getProductWarranty()
    {
        return $this->hasOne(ProductWarranty::class, 'id', 'warranty_id');

    }

    /**
     * نمودار تغییرات قیمت محصولات
     * به ازای تغییر قیمت های هر رنگ محصول یک نمودار خواهیم داشت
     */
    public static function getChartData($productId)
    {
        $array = array();
        $points = array();
        $jdf = new Jdf();
        $productColors = ProductColor::with(['getColor'])->where('product_id', $productId)->get(); //رنگ های هر محصول
        $daysLimit = strtotime('-30 day'); //نمودار بر اساس سی روز گذشته است
        $productPrices = ProductPrice::with(['getColor'])
            ->with(['getProductWarranty' => function ($query) {
                $query->withTrashed();
            }])->where('product_id', $productId)
            ->where('time', '>=', $daysLimit)
            ->get();

        $price = array();
        $warrantyPrice = array();
        $color = array();
        $seller = array();
        $zone = array();

        foreach ($productPrices as $item) {
            $date = $jdf->tr_num($jdf->jdate('Y-n-j', $item->time));
            $warrantyPrice[$date][$item->color_id] = $item->price;
            $seller[$date][$item->color_id] = 'دیجی کالا';
        }
        //در سی روز گذشته باید به ازای هر روز قیمتی داشته باشیم.
// اگر تغییر قیمت در روز مشخص وجود داشت که از آن استفاده می کنیم در غیر این صورت از قیمت روزهای قبلش استفاده می کنیم
        for ($i = 30; $i >= 0; $i--) {
            $timestamp = strtotime('-' . $i . ' day');
            $date = $jdf->tr_num($jdf->jdate('Y-n-j', $timestamp));
            if (array_key_exists($date, $warrantyPrice)) { //تاریخ هایی که در آن مقدار قیمت وجود دارد(تغییرات داشته ایم)

                foreach ($productColors as $key => $pColor) {

                    $size = array_key_exists($pColor->color_id, $price) ? sizeof($price[$pColor->color_id]) : 0;
                    $points[$date] = $date;

                    if (array_key_exists($pColor->color_id, $warrantyPrice[$date])) { //اگر در تاریخ مشخص رنگ محصول دارای تنوع قیمتی بود
                        $price[$pColor->color_id][$size]['y'] = $warrantyPrice[$date][$pColor->color_id]; //y قیمت حصول است

                        $color[$pColor->color_id] = ['name' => $pColor->getColor->name, 'code' => $pColor->getColor->code, 'id' => $pColor->getColor->id];

                        if ($warrantyPrice[$date][$pColor->color_id] == 0) {//وقتی صفر می شود یعنی محصول نا موجود شده است
                            $price[$pColor->color_id][$size]['y'] = $price[$pColor->color_id][($size - 1)]['y'];
                            $price[$pColor->color_id][$size]['color'] = 'gray';
                            $price[$pColor->color_id][$size]['price'] = 0;
                            $price[$pColor->color_id][$size]['has_product'] = 'no';

                            //نقاطی که محصول قیمتش صفر می شود را باید مشخص کنیم تا در نمودار به عنوان ناموجود نمایش دهیم
                            $zone_size = array_key_exists($pColor->color_id, $zone) ? sizeof($zone[$pColor->color_id]) : 0;
                            $zone[$pColor->color_id][$size] = ['value' => $size];

                            if (sizeof($zone[$pColor->color_id]) == 1 && $i == 0) {
                                $zone[$pColor->color_id][$size+1]['value'] = $zone[$pColor->color_id][$size]['value'];
                                $zone[$pColor->color_id][$size+1]['color'] = 'gray';

                            }

                        } else {
                            $price[$pColor->color_id][$size]['price'] = $warrantyPrice[$date][$pColor->color_id];
                            $price[$pColor->color_id][$size]['color'] = '#00bfd6';
                            $price[$pColor->color_id][$size]['has_product'] = 'ok';
                            $price[$pColor->color_id][$size]['seller'] = 'دیجی کالا';

                            if (array_key_exists($pColor->color_id, $zone)) { //پایان محدوده ناموجودی را باید مشخص کنیم
                                $first = sizeof($zone[$pColor->color_id]) - 1;
                                $end = $zone[$pColor->color_id][$first];

                                if ($price[$pColor->color_id][($size - 1)]['price'] == 0) { //پایان محدوده ی ناموجودی
                                    $zone[$pColor->color_id][sizeof($zone[$pColor->color_id])] = ['value' => $size, 'color' => 'gray'];
                                }
                            }
                        }

                    } else {//ااگر در تاریخ مشخص رنگ محصول دارای تنوع قیمتی نبود
                        if (array_key_exists($pColor->color_id, $price) && array_key_exists(($size - 1), $price[$pColor->color_id])) { //اگر در کل این رنگ دارای قیمتی است. یعنی جزو رنگ هایی است که برایش تنوع قیمت و قیمت وجود دارد
                            $color[$pColor->color_id] = ['name' => $pColor->getColor->name, 'code' => $pColor->getColor->code,'id' => $pColor->getColor->id];

                            if ($price[$pColor->color_id][$size - 1]['y'] == 0) {

                                $price[$pColor->color_id][$size]['y'] = $price[$pColor->color_id][($size - 1)]['y'];
                                $price[$pColor->color_id][$size]['color'] = 'gray';
                                $price[$pColor->color_id][$size]['price'] = 0;
                                $price[$pColor->color_id][$size]['has_product'] = 'no';

                                $zone_size = array_key_exists($pColor->color_id, $zone) ? sizeof($zone[$pColor->color_id]) : 0;
                                $zone[$pColor->color_id][$size] = ['value' => $size];

                            } else {
                                //قیمت آن را برابر با قیمت پیشین می کنیم چون قیمت آن تغییری نکرده است
                                $price[$pColor->color_id][$size]['y'] = $price[$pColor->color_id][$size - 1]['y'];

                                $price[$pColor->color_id][$size]['price'] = $price[$pColor->color_id][$size - 1]['price'];
                                $price[$pColor->color_id][$size]['color'] = '#00bfd6';
                                $price[$pColor->color_id][$size]['has_product'] = 'ok';
                                $price[$pColor->color_id][$size]['seller'] = 'دیجی کالا';

                                if (array_key_exists($pColor->color_id, $zone)) { //پایان محدوده ناموجودی را باید مشخص کنیم
                                    $first = sizeof($zone[$pColor->color_id]) - 1;
                                    $end = $zone[$pColor->color_id][$first];

                                    if ($price[$pColor->color_id][($size - 1)]['price'] == 0) { //پایان محدوده ی ناموجودی
                                        $zone[$pColor->color_id][sizeof($zone[$pColor->color_id])] = ['value' => $size, 'color' => 'gray'];
                                    }
                                }
                            }
                        }
                    }
                }

            } else if (sizeof($price) > 0) { //تاریخ هایی که در آن ها تغییرات نداشته ایم و قیمت برابر است با اخرین قیمت ثبت شده در روز های قبل
                $points[$date] = $date;
                foreach ($productColors as $key => $pColor) {
                    $size = array_key_exists($pColor->color_id, $price) ? sizeof($price[$pColor->color_id]) : 0;
                    if (array_key_exists($pColor->color_id, $price) && array_key_exists(($size - 1), $price[$pColor->color_id])) {

                        $color[$pColor->color_id] = ['name' => $pColor->getColor->name, 'code' => $pColor->getColor->code,'id' => $pColor->getColor->id];

                        if ($price[$pColor->color_id][$size - 1]['y'] == 0) {
                            $price[$pColor->color_id][$size]['y'] = $price[$pColor->color_id][($size - 1)]['y'];
                            $price[$pColor->color_id][$size]['color'] = 'gray';
                            $price[$pColor->color_id][$size]['price'] = 0;
                            $price[$pColor->color_id][$size]['has_product'] = 'no';

                            $zone_size = array_key_exists($pColor->color_id, $zone) ? sizeof($zone[$pColor->color_id]) : 0;
                            $zone[$pColor->color_id][$size] = ['value' => $size];

                        } else {
                            //قیمت آن را برابر با قیمت پیشین می کنیم چون قیمت آن تغییری نکرده است
                            $price[$pColor->color_id][$size]['y'] = $price[$pColor->color_id][$size - 1]['y'];

                            $price[$pColor->color_id][$size]['price'] = $price[$pColor->color_id][$size - 1]['price'];
                            $price[$pColor->color_id][$size]['color'] = '#00bfd6';
                            $price[$pColor->color_id][$size]['has_product'] = 'ok';
                            $price[$pColor->color_id][$size]['seller'] = 'دیجی کالا';

                            //TODO:اگر خطایی باشه از اینجاس. ویدیوی 209
                            if (array_key_exists($pColor->color_id, $zone)) { //پایان محدوده ناموجودی را باید مشخص کنیم
                                $first = sizeof($zone[$pColor->color_id]) - 1;
                                $end = $zone[$pColor->color_id][$first];

                                if ($price[$pColor->color_id][($size - 1)]['price'] == 0) { //پایان محدوده ی ناموجودی
                                    $zone[$pColor->color_id][sizeof($zone[$pColor->color_id])] = ['value' => $size, 'color' => 'gray'];
                                }
                            }
                        }
                    }
                }
            }
        }

        $i = 0;
        foreach ($points as $key => $value) {
            $points[$i] = $value;
            unset($points[$key]);
            $i++;
        }

        $j = 0;
        $price2 = [];
        foreach ($price as $key => $value) {
            $price2[$j] = $value;
            unset($price[$key]);
            $j++;
        }

        $x = 0;
        $color2 = [];
        foreach ($color as $key => $value) {
            $color2[$x] = $value;
            unset($color[$key]);
            $x++;
        }

        $array['points'] = $points;
        $array['price'] = $price2;
        $array['color'] = $color2;
        $array['zone'] = $zone;

        return $array;
    }
}
