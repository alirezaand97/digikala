<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model
{
    use SoftDeletes;
    protected $table='cities';
    protected $fillable=['name','province_id','send_price','min_order_price','send_time'];

    public static function getData($request)
    {
        $url = '?';
        $province= City::orderBy('id', 'ASC')->with(['getProvince']);

        if (in_trashed($request)) {
            $province = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['search']) && $_GET['search']!='') {
            $searchVal=$_GET['search'];
            $province->withTrashed()->where('name','like','%'.$searchVal.'%');
        }

        $province = $province->paginate(10);
        $province = $province->withPath($url);
        return $province;
    }

    public function getProvince()
    {
        return $this->hasOne(Province::class,'id','province_id');
    }
}
