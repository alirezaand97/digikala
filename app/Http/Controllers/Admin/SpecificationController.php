<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\Http\Controllers\Controller;
use App\Specification;
use Illuminate\Http\Request;
use function GuzzleHttp\Promise\all;

class SpecificationController extends Controller
{
    public function index(Request $request)
    {
        $category = Category::where('id', $request->id)->first();
        $specifications = Specification::with(['getChild'])
            ->where(['cat_id' => $category->id, 'parent_id' => 0])
            ->orderBy('position')
            ->get();
        return view('specification.index', ['category' => $category, 'specifications' => $specifications]);
    }

    public function addSpecification(Request $request)
    {
        $specs = $request->get('item', array());
        $subSpecs = $request->get('subitem', array());
        $check = $request->get('checkbox', array());
        $catId = $request->id;
        Specification::createSpecifications($specs, $subSpecs, $check, $catId);
        return redirect()->back()->with(['message' => 'عملیات با موفقیت انجام شد']);
    }

    public function deleteSpecification(Request $request)
    {
        $spec = Specification::findOrFail($request->id);
        $specChild = $spec->getChild();
        $spec->delete();
        if ($specChild) {
            $specChild->delete();
        }
        return redirect()->back()->with(['message' => 'حذف با موفقیت انجام شد']);
    }
}

