<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Warranty extends Model
{
    use SoftDeletes;
    protected $table = 'warranties';
    protected $fillable = ['name'];

    public static function getData($request)
    {
        $url = '?';
        $warranty = Warranty::orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $warranty = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['search']) && $_GET['search']!='') {
            $searchVal=$_GET['search'];
            $warranty->withTrashed()->where('name','like','%'.$searchVal.'%');
        }

        $warranty = $warranty->paginate(10);
        $warranty = $warranty->withPath($url);
        return $warranty;
    }
}
