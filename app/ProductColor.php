<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductColor extends Model
{
    use SoftDeletes;
    protected $table = 'product_colors';
    protected $fillable=['cat_id','product_id','color_id'];

    public function getColor()
    {
        return $this->hasOne(Color::class, 'id', 'color_id');
        // TODO: رابطش مسخرس
    }
}
