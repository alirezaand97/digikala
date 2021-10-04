<?php

namespace App\Http\Controllers\Admin;

use App\Brand;
use App\Http\Requests\Brand\CreateBrandRequest;
use Illuminate\Http\Request;

class BrandController extends AdminBaseController
{
    protected $model='\App\Brand';
    protected $routeName='brands';
    protected $modelName=' برند';

    public function index(Request $request)
    {
        $brands = Brand::getData($request);
        $trashed_count = Brand::onlyTrashed()->count();
        return view('brand.index', ['brands' => $brands, 'trashed_count' => $trashed_count,'search'=>$request->get('search')]);
    }


    public function create()
    {
        return view('brand.create');
    }


    public function store(CreateBrandRequest $request)
    {
        $brand = new Brand();
        $brand->name = $request->name;
        $brand->ename = $request->ename;
        $brand->description = $request->description;
        $brand->icon = upload_file($request, 'icon', 'upload');
        $brand->save();
        return redirect('admin/brands')->with('message', 'برند جدید با موفقیت ایجاد شد');
    }



    public function edit($id)
    {
        $brand = Brand::findOrFail($id);
        return view('brand.edit', compact('brand'));
    }


    public function update(CreateBrandRequest $request, $id)
    {
        $brand = Brand::findOrFail($id);
        $data = $request->all();
        $img = upload_file($request, 'icon', 'upload');
        if ($img != null) {
            $data['icon'] = $img;
        }
        $brand->update($data);
        return redirect('admin/brands')->with('message', 'برند با موفقیت به روز رسانی شد');
    }

}
