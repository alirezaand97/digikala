<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OldPrice extends Model
{
    protected $table = 'old_prices';
    protected $fillable = ['product_warranty_id', 'price1', 'price2', 'product_number', 'product_number_cart', 'product_number_sales'];
}
