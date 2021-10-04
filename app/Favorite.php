<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $table = 'favorites';
    protected $fillable = ['user_id', 'product_id'];

    public function getProduct()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
