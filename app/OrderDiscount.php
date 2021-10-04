<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

class OrderDiscount extends Model
{
    protected $table = 'order_discounts';
    protected $fillable = ['cat_id', 'min_order_price', 'total_price', 'discount_value', 'discount_percent', 'order_id'];

    public static function createOrderDiscount($order)
    {
        $discounts = Session::get('discountsInfoArray', array());
        foreach ($discounts as $key => $value) {
            $percent = $value['discount_percent'];
            $price = $value['price'];
            $discount_price = $value['discount_price'];
            settype($percent, 'integer');
            settype($price, 'integer');
            settype($discount_price, 'integer');

            if ($percent) {
                $discount_price = ($price * $percent) / 100;
            }

            self::create([
                'cat_id' => $value['category_id'],
                'min_order_price' => $value['min_order_price'],
                'total_price' => $price,
                'discount_value' => $discount_price,
                'discount_percent' => $percent ? $percent : null,
                'order_id' => $order->id
            ])
                ->save();
        }

    }
}
