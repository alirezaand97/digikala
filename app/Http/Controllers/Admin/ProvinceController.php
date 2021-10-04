<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Province\CityRequest;
use App\Province;
use Illuminate\Http\Request;

class ProvinceController extends AdminBaseController
{

    protected $model='\App\Province';
    protected $routeName='provinces';
    protected $modelName=' استان';

    public function index(Request $request)
    {
        $provinces = Province::getData($request);
        $trashed_count = Province::onlyTrashed()->count();
        return view('province.index', ['provinces' => $provinces, 'trashed_count' => $trashed_count,'search'=>$request->get('search')]);
    }


    public function create()
    {
        return view('province.create');
    }


    public function store(CityRequest $request)
    {
        $province = new Province();
        $province->name = $request->name;
        $province->save();
        return redirect('admin/provinces')->with('message', 'استان جدید با موفقیت ایجاد شد');
    }



    public function edit($id)
    {
        $province = Province::findOrFail($id);
        return view('province.edit', compact('province'));
    }


    public function update(CityRequest $request, $id)
    {
        $province = Province::findOrFail($id);
        $data = $request->all();
        $province->update($data);
        return redirect('admin/provinces')->with('message', 'استان با موفقیت به روز رسانی شد');
    }
}
