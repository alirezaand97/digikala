<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductFilter extends Model
{
    protected $table='product_filters';
    protected $fillable=['filter_id', 'product_id', 'value'];

}
