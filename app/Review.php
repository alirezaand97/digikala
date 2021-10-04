<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use SoftDeletes;
    protected $table='reviews';
    protected $fillable=['title','description','product_id'];

    public static function getData($request)
    {
        $url = '?';
        $review= Review::where('product_id',$request->product_id)->orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $review = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['search']) && $_GET['search']!='') {
            $searchVal=$_GET['search'];
            $review->withTrashed()->where('title','like','%'.$searchVal.'%');
        }

        $review = $review->paginate(10);
        $review = $review->withPath($url);
        return $review;
    }
}
