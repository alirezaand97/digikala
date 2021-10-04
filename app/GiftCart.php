<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class GiftCart extends Model
{
    protected $table = 'gift_carts';
    protected $fillable = ['code', 'user_id', 'order_id', 'cart_credit', 'credit_used', 'validate_days','product_id'];

    const IS_GIFT_CART = 'yes';
    const IS_NOT_GIFT_CART = 'no';

    public static function newGiftCart($product, $orderId)
    {
        $userId = Auth::id();
        $code = 'digiGift' . rand(99, 999) . $userId . rand(9, 99);
        GiftCart::create([
            'code' => $code,
            'user_id' => $userId,
            'order_id' => $orderId,
            'cart_credit' => $product['price2'],
            'credit_used' => 0,
            'product_id'=>$product['product_id']
        ])->save();
    }

    //دریافت اطلاعات مربوط به کارت هدیه
    public function getProduct()
    {
        return $this->hasOne(Product::class,'id','product_id');
    }

}
