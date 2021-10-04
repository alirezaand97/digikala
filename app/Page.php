<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use SoftDeletes;

    protected $table = 'pages';
    protected $fillable = ['title', 'content', 'description', 'keywords', 'url'];


    public static function getData($request)
    {
        $url = '?';
        $page = Page::orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $page = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['search']) && $_GET['search'] != '') {
            $searchVal = $_GET['search'];
            $page->withTrashed()->where('title', 'like', '%' . $searchVal . '%');
        }

        $page = $page->paginate(10);
        $page = $page->withPath($url);
        return $page;
    }
}
