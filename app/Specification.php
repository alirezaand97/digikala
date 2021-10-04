<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Specification extends Model
{
    protected $table = 'specifications';
    protected $fillable = ['cat_id', 'parent_id', 'title', 'position', 'show_item'];

    public static function createSpecifications($specs, $subSpecs, $check, $catId)
    {
        $parentPosition = 1;
        foreach ($specs as $specKey => $specValue) {
            if (!empty($specValue)) {
                if ($specKey < 0) {
                    $id = Specification::insertGetId([
                        'cat_id' => $catId,
                        'parent_id' => 0,
                        'title' => $specValue,
                        'position' => $parentPosition,
                    ]);
                    Specification::createSubSpec($specKey, $subSpecs, $check, $catId, $id);
                    $parentPosition++;
                } else {
                    $updatedSpec = Specification::where(['cat_id' => $catId, 'parent_id' => 0, 'id' => $specKey])->update([
                        'cat_id' => $catId,
                        'parent_id' => 0,
                        'title' => $specValue,
                        'position' => $parentPosition,
                    ]);
                    Specification::createSubSpec($specKey, $subSpecs, $check, $catId, $specKey);
                }
            }
        }
    }

    private static function createSubSpec($specKey, $subSpecs, $check, $catId, $parentId)
    {
        $childPosition = 0;
        if (array_key_exists($specKey, $subSpecs) || 1) {
            foreach ($subSpecs[$specKey] as $subSpecKey => $subSpecValue) {
                $isChecked = Specification::isChecked($check, $specKey, $subSpecKey);
                if (!empty($subSpecValue)) {
                    if ($subSpecKey < 0) {
                        Specification::insert([
                            'cat_id' => $catId,
                            'parent_id' => $parentId,
                            'title' => $subSpecValue,
                            'position' => $childPosition,
                            'show_item' => $isChecked
                        ]);
                    } else {
                        Specification::where(['cat_id' => $catId, 'parent_id' => $parentId, 'id' => $subSpecKey])->update([
                            'cat_id' => $catId,
                            'parent_id' => $parentId,
                            'title' => $subSpecValue,
                            'position' => $childPosition,
                            'show_item' => $isChecked
                        ]);
                    }
                }
                $childPosition++;
            }
        }
    }

    private static function isChecked($check, $specKey, int $subSpecKey)
    {
        if (array_key_exists($specKey, $check)) {
            if (array_key_exists($subSpecKey, $check[$specKey])) {
                return 1;
            } else return 0;
        } else {
            return 0;
        }
    }

    public static function getProductSpecification($product)
    {
        define('product_id', $product->id);
        //مشخصات برخی دسته بندی ها با والدشان یکی است.
        $category = Category::findOrFail($product->cat_id);
        $specifications = Specification::with('getChild.getValue')->where('parent_id', 0)
            ->whereIn('cat_id', [$product->cat_id, $category->parent_id])
            ->get();
        return $specifications;
    }

    public static function getCategorySpecification($cat_id)
    {
        return Specification::with(['getChild'])->where(['cat_id' => $cat_id, 'parent_id' => 0])->get();
    }

    public function getChild()
    {
        return $this->hasMany(Specification::class, 'parent_id', 'id')->orderBy('position');
    }

    public function getValue()
    {
        return $this->hasOne(SpecificationValue::class, 'specification_id', 'id')
            ->where('product_id', product_id);
    }
}
