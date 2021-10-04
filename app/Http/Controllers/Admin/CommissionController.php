<?php

namespace App\Http\Controllers\Admin;

use App\Brand;
use App\Category;
use App\Commission;
use Illuminate\Http\Request;

class CommissionController extends AdminBaseController
{
    protected $model = '\App\Commission';
    protected $routeName = 'commissions';
    protected $modelName = ' کمیسیون';

    public function index(Request $request)
    {
        $commissions = Commission::getData($request);
        $brands = [0 => 'انتخاب برند'] + Brand::pluck('name', 'id')->toArray();
        $cats = Category::get_list();
        $trashed_count = Commission::onlyTrashed()->count();
        return view('commission.index', ['commissions' => $commissions,'cats'=>$cats,'brands'=>$brands,'trashed_count' => $trashed_count, 'request' => $request]);
    }


    public function create()
    {
        $brands = [0 => 'انتخاب برند'] + Brand::pluck('name', 'id')->toArray();
        $cats = Category::get_list();
        return view('commission.create', compact('brands', 'cats'));
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'brand_id' => 'required',
            'category_id' => 'required',
            'percentage' => 'required|numeric',
        ], [], ['brand_id' => 'برند', 'category_id' => 'دسته بندی', 'percentage' => 'درصد کمیسیون']);

        $check = Commission::where(['brand_id' => $request->get('brand_id', 0), 'category_id' => $request->get('category_id')])->first();
        if ($check) {
            return redirect()->back()->withInput()->with(['error' => 'برای این برند و دسته بندی قبلا کمیسیون ثبت شده است']);
        } else {
            $commission = new Commission($request->all());
            $commission->save();
        }
        return redirect('admin/commissions')->with('message', 'کمیسیون جدید با موفقیت ایجاد شد');
    }


    public function edit($id)
    {
        $commission = Commission::findOrFail($id);
        $brands = [0 => 'انتخاب برند'] + Brand::pluck('name', 'id')->toArray();
        $cats = Category::get_list();
        return view('commission.edit', compact('commission', 'brands', 'cats'));
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'brand_id' => 'required',
            'category_id' => 'required',
            'percentage' => 'required|numeric',
        ], [], ['brand_id' => 'برند', 'category_id' => 'دسته بندی', 'percentage' => 'درصد کمیسیون']);

        $check = Commission::where(['brand_id' => $request->get('brand_id', 0), 'category_id' => $request->get('category_id')])->first();
        //حتما باید با همان برند و دسته بندی باشد و فقط درصد اپدیت شود
        if ($check && $check->id != $id) {
            return redirect()->back()->withInput()->with(['error' => 'شما فقط مجاز به تغییر میزان کمیسیون هستید']);
        } else {
            $check->update($request->all());
        }
        return redirect('admin/commissions')->with('message', 'کمیسیون با موفقیت ویرایش شد');
    }
}
