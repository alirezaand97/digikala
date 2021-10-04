<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductGallery extends Model
{
    use SoftDeletes;
    protected $table = 'product_galleries';
    protected $fillable=['product_id','image_url','position'];
}
