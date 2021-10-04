<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use SoftDeletes;
    protected $table = 'brands';
    protected $fillable = ['name', 'ename', 'icon','description'];

    public static function getData($request)
    {
        $url = '?';
        $brand= Brand::orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $brand = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['search']) && $_GET['search']!='') {
            $searchVal=$_GET['search'];
            $brand->withTrashed()->where('name','like','%'.$searchVal.'%');
        }

        $brand = $brand->paginate(10);
        $brand = $brand->withPath($url);
        return $brand;
    }

    public function getCatBrand()
    {
        return $this->hasMany(CatBrand::class,'brand_id','id');
    }

    protected static function boot()
    {
        parent::boot();
        self::deleting(function ($brand){
            if($brand->trashed()){
                unlink('files/upload/'.$brand->icon);
            }
        });
    }
}
