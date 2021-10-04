<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\AdminBaseController;
use App\Http\Requests\City\CityRequest;
use App\City;
use App\Province;
use Illuminate\Http\Request;

class CityController extends AdminBaseController
{

    protected $model = '\App\City';
    protected $routeName = 'cities';
    protected $modelName = ' شهر';

    public function index(Request $request)
    {
        $cities = City::getData($request);
        $trashed_count = City::onlyTrashed()->count();
        return view('city.index', ['cities' => $cities, 'trashed_count' => $trashed_count, 'search' => $request->get('search')]);
    }


    public function create()
    {
        $provinces = Province::get()->pluck('name', 'id');
        return view('city.create', ['provinces' => $provinces]);
    }


    public function store(CityRequest $request)
    {
        $city = City::create($request->all())->save();

        return redirect('admin/cities')->with('message', 'شهر جدید با موفقیت ایجاد شد');
    }


    public function edit($id)
    {
        $provinces = Province::get()->pluck('name', 'id');
        $city = City::findOrFail($id);
        return view('city.edit', compact('city','provinces'));
    }


    public function update(CityRequest $request, $id)
    {
        $city = City::findOrFail($id);
        $data = $request->all();
        $city->update($data);
        return redirect('admin/cities')->with('message', 'شهر با موفقیت به روز رسانی شد');
    }
}
