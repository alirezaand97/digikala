<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Slider extends Model
{
    use SoftDeletes;
    protected $table = 'sliders';
    protected $fillable = ['title', 'url', 'image_url','mobile_image_url'];

    public static function getData($request)
    {
        $url = '?';
        $slider = Slider::orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $slider = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }
        $slider = $slider->paginate(10);
        $slider = $slider->withPath($url);
        return $slider;
    }

    protected static function boot()
    {
        parent::boot();
        self::forceDeleted(function ($slider){
            if(file_exists('files/slider/'.$slider->image_url)){
                remove_file('files/slider/'.$slider->image_url);
            }
            if(file_exists('files/slider/'.$slider->mobile_image_url)){
                remove_file('files/slider/'.$slider->mobile_image_url);
            }
        });
    }
}
