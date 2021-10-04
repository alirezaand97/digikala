<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

class Category extends Model
{
    use SoftDeletes;
    protected $table = 'category';
    protected $fillable = ['name', 'ename', 'url', 'img', 'search_url', 'parent_id', 'not_show'];

    public static function get_list()
    {
        $array = [0 => 'دسته اصلی'];
        $list = self::with('children.children.children')->where('parent_id', 0)->get();
        foreach ($list as $key => $value) {
            $array[$value->id] = $value->name;
            foreach ($value->children as $key1 => $value1) {
                $array[$value1->id] = '-' . $value1->name;
                foreach ($value1->children as $key2 => $value2) {
                    $array[$value2->id] = '-' . $value2->name;
                    foreach ($value2->children as $key3 => $value3) {
                        $array[$value3->id] = '-' . $value3->name;
                    }
                }
            }
        }
        return $array;
    }

    public static function getData($request)
    {
        $url = '?';
        $category = Category::with(['parent']);

        if (in_trashed($request)) {
            $category = Category::onlyTrashed()->with(['parent']);
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['search']) && $_GET['search'] != '') {
            $searchVal = $_GET['search'];
            $category->withTrashed()->where('ename', 'like', '%' . $searchVal . '%')->orWhere('name', 'like', '%' . $searchVal . '%');
        }
        $category = $category->orderBy('id', 'ASC')->paginate(10);
        $category = $category->withPath($url);
        return $category;
    }


    public static function getCatFilters($category)
    {
        $parentId = $category->parent ? $category->parent->id : 0;

        $catArray = [$category->id, $parentId];
        $filters = Filter::with(['getChild'])
            ->where('parent_id', 0)
            ->whereIn('cat_id', $catArray)
            ->get();
        return $filters;
    }

    //region relations


    public function parent()
    {
        return $this->hasOne(Category::class, 'id', 'parent_id')->withTrashed();
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id')->withTrashed();
    }

    //endregion

    protected static function boot()
    {
        parent::boot();
        self::deleting(function ($category) {
            if (Cache::has('shop-category')) {
                Cache::forget('shop-category');
            }
            $children = $category->children;
            foreach ($children as $child) {
                if ($child->trashed()) {
                    $child->forceDelete();
                } else {
                    $child->delete();
                }
            }
        });
    }

}
