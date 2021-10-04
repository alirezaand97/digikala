<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    protected $table = 'products';
    protected $fillable = ['title', 'cat_id', 'brand_id', 'ename', 'product_url', 'price', 'discount_price', 'show', 'view', 'keywords', 'description', 'special', 'image_url', 'full_description', 'order_number', 'status', 'is_gift_cart'];
    const PRODUCT_STATUS = ['-3' => 'رد شده', '-2' => 'در انتظار بررسی', '-1' => 'توقف تولید', '0' => 'ناموجود', '1' => 'منتشر شده'];
    const PRODUCTS_STATUS_COLOR = ['-3' => 'danger', '-2' => 'light', '-1' => 'secondary', '0' => 'warning', '1' => 'primary'];

    public static function getData($request)
    {
        $url = '?';
        $product = Product::orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $product = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['search']) && $_GET['search'] != '') {
            $searchVal = $_GET['search'];
            $product->withTrashed()->where('title', 'like', '%' . $searchVal . '%');
        }

        $product = $product->paginate(10);
        $product = $product->withPath($url);
        return $product;
    }

    public function getCategory()
    {
        return $this->hasOne(Category::class, 'id', 'cat_id');
    }

    public function getBrand()
    {
        return $this->hasOne(Brand::class, 'id', 'brand_id');
    }

    public function getProductColor()
    {
        return $this->hasMany(ProductColor::class, 'product_id', 'id');
    }

    public function getProductWarranty()
    {
        return $this->hasMany(ProductWarranty::class, 'product_id', 'id')
            ->orderBy('price2', 'ASC');
    }

    public function getFirstProductPrice()
    {
        return $this->hasOne(ProductWarranty::class, 'product_id', 'id')
            ->orderBy('price2', 'ASC')
            ->select(['id', 'product_id', 'price1', 'price2', 'product_number', 'offers_end_time', 'is_offer']);
    }

    public function gallery()
    {
        return $this->hasMany(ProductGallery::class, 'product_id', 'id')
            ->orderBy('position');
    }

    public function specificationValue()
    {
        return $this->hasMany(SpecificationValue::class, 'product_id', 'id');

    }

    protected static function boot()
    {
        parent::boot();
        self::deleting(function ($product) {
            if ($product->trashed()) {
                unlink('files/products/' . $product->image_url);
                unlink('files/thumbnails/' . $product->image_url);
                ProductWarranty::where('product_id',$product->id)->forceDelete();
            }
        });
    }


}
