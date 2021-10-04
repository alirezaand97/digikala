<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Province extends Model
{
    use SoftDeletes;
    protected $table='provinces';
    protected $fillable=['name'];

    public static function getData($request)
    {
        $url = '?';
        $province= Province::orderBy('id', 'ASC');

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


}
