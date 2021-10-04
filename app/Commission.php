<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Commission extends Model
{
    use SoftDeletes;
    protected $table = 'commissions';
    protected $fillable = ['brand_id', 'category_id', 'percentage'];

    public static function getData($request)
    {
        $url = '?';
        $commission = Commission::orderBy('id', 'ASC')->with(['getBrand', 'getCategory']);

        if (in_trashed($request)) {
            $commission = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (!empty($request->brand_id)) {
            $commission->where('brand_id', $request->brand_id);
            $url = create_paginate_url($url, 'brand_id=' . $request->brand_id);
        }

        if (!empty($request->category_id)) {
            $commission->where('category_id', $request->category_id);
            $url = create_paginate_url($url, 'category_id=' . $request->category_id);
        }

        $commission = $commission->paginate(10);
        $commission = $commission->withPath($url);
        return $commission;
    }

    public function getBrand()
    {
        return $this->hasOne(Brand::class, 'id', 'brand_id')->withDefault(['name' => 'حذف شده']);
    }

    public function getCategory()
    {
        return $this->hasOne(Category::class, 'id', 'category_id')->withDefault(['name' => 'حذف شده']);
    }

}
