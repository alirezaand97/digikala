<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductWarranty extends Model
{
    use SoftDeletes;
    protected $table = 'product_warranties';
    protected $fillable = ['product_id', 'color_id', 'warranty_id', 'seller_id', 'price1', 'price2', 'send_time', 'product_number', 'product_number_cart', 'offers_start_time', 'offers_end_time', 'offers_start_date', 'offers_end_date', 'show_idex', 'is_offer'];

    public static function getData($request)
    {
        $url = '?';
        $product_warranties = ProductWarranty::with(['getColor', 'getWarranty'])->where('product_id', $request->product_id)->orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $product_warranties = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }
        $product_warranties = $product_warranties->paginate(10);
        $product_warranties = $product_warranties->withPath($url);
        return $product_warranties;
    }

    public function getColor()
    {
        return $this->belongsTo(Color::class, 'color_id', 'id')->withDefault(['name' => '', 'id' => 0]);
    }

    public function getWarranty()
    {
        return $this->belongsTo(Warranty::class, 'warranty_id', 'id');
    }

    public function getProduct()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function getProductSpecificationValues()
    {
        return $this->hasMany(SpecificationValue::class, 'product_id', 'product_id');
    }

    public function getSeller()
    {
        return $this->hasOne(Seller::class, 'id', 'seller_id')
            ->withDefault(['brand_name'=>'دیجی کالا','id'=>0]);
    }

    protected static function boot()
    {
        parent::boot();
        static::restored(function ($productWarranty) {
            $product = $productWarranty->getProduct;
            update_product_price($product);
            add_min_product_price($productWarranty);
        });

        static::deleted(function ($productWarranty) {
            $product = $productWarranty->getProduct;
            update_product_price($product);
            check_has_product_warranty($productWarranty);
        });

    }
}
