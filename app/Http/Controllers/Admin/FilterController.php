<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\Filter;
use App\Http\Controllers\Controller;
use App\Specification;
use Illuminate\Http\Request;
use function GuzzleHttp\Promise\all;

class FilterController extends Controller
{
    public function index(Request $request)
    {
        $category = Category::where('id', $request->id)->first();
        $filters = Filter::with(['getChild'])
            ->where(['cat_id' => $category->id, 'parent_id' => 0])
            ->orderBy('position')
            ->get();
        return view('filter.index', ['category' => $category, 'filters' => $filters]);
    }

    public function addFilter(Request $request)
    {
        $filters = $request->get('item', array());
        $subSpecs = $request->get('subitem', array());
        $catId = $request->id;
        Filter::createfilters($filters, $subSpecs, $catId);
        return redirect()->back()->with(['message' => 'عملیات با موفقیت انجام شد']);
    }

    public function deleteFilter(Request $request)
    {
        $filter = Filter::findOrFail($request->id);
        $filterChild = $filter->getChild();
        $filter->delete();
        if ($filterChild) {
            $filterChild->delete();
        }
        return redirect()->back()->with(['message' => 'حذف با موفقیت انجام شد']);
    }
}

