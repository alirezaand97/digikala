<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Filter extends Model
{
    protected $table = 'filters';
    protected $fillable = ['cat_id', 'parent_id', 'title', 'position','specification_id'];

    public static function createfilters($filters, $subFilter,$catId)
    {
        $parentPosition = 1;
        foreach ($filters as $filterKey => $filterValue) {
            if (!empty($filterValue)) {
                if ($filterKey < 0) {
                    $id = Filter::insertGetId([
                        'cat_id' => $catId,
                        'parent_id' => 0,
                        'title' => $filterValue,
                        'specification_id'=>null,
                        'position' => $parentPosition,
                    ]);
                    Filter::createSubFilter($filterKey, $subFilter, $catId, $id);
                    $parentPosition++;
                } else {
                    $updatedSpec = Filter::where(['cat_id' => $catId, 'parent_id' => 0, 'id' => $filterKey])->update([
                        'cat_id' => $catId,
                        'parent_id' => 0,
                        'title' => $filterValue,
                        'specification_id'=>null,
                        'position' => $parentPosition,
                    ]);
                    Filter::createSubFilter($filterKey, $subFilter,$catId, $filterKey);
                }
            }
        }
    }

    public static function createSubFilter($filterKey, $subFilter, $catId, $parentId)
    {
        $childPosition = 0;
        if (array_key_exists($filterKey, $subFilter)) {
            foreach ($subFilter[$filterKey] as $subSpecKey => $subSpecValue) {
                if (!empty($subSpecValue)) {
                    if ($subSpecKey < 0) {
                        Filter::insert([
                            'cat_id' => $catId,
                            'parent_id' => $parentId,
                            'title' => $subSpecValue,
                            'specification_id'=>null,
                            'position' => $childPosition,
                        ]);
                    } else {
                        Filter::where(['cat_id' => $catId, 'parent_id' => $parentId, 'id' => $subSpecKey])->update([
                            'cat_id' => $catId,
                            'parent_id' => $parentId,
                            'title' => $subSpecValue,
                            'specification_id'=>null,
                            'position' => $childPosition,
                        ]);
                    }
                }
                $childPosition++;
            }
        }
    }


    public static function getProductFilter($product)
    {
        define('product_id',$product->id);
        $category = Category::findOrFail($product->cat_id);
        $filters = Filter::with(['getChild','getValue'])->where('parent_id', 0)
            ->whereIn('cat_id', [$product->cat_id,$category->parent_id])
            ->get();
        return $filters;
    }

    public function getChild()
    {
        return $this->hasMany(Filter::class, 'parent_id', 'id')->orderBy('position');
    }
    public function getValue()
    {
        return $this->hasMany(ProductFilter::class, 'filter_id', 'id')
            ->where('product_id',product_id);
    }
}
