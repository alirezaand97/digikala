<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Slider\CreateSliderRequest;
use App\Http\Requests\Slider\UpdateSliderRequest;
use App\Slider;
use Illuminate\Http\Request;

class SliderController extends AdminBaseController
{
    protected $model='\App\Slider';
    protected $routeName='sliders';
    protected $modelName=' اسلایدر';

    public function index(Request $request)
    {
        $sliders = Slider::getData($request);
        $trashed_count = Slider::onlyTrashed()->count();
        return view('slider.index', ['sliders' => $sliders, 'trashed_count' => $trashed_count]);
    }


    public function create()
    {
        return view('slider.create');
    }


    public function store(CreateSliderRequest $request)
    {
        $slider = new Slider();
        $slider->title = $request->title;
        $slider->url = $request->url;
        $slider->image_url = upload_file($request, 'image_url', 'slider',rand(1,100));
        if($request->mobile_image_url){
            $slider->mobile_image_url = upload_file($request, 'mobile_image_url', 'slider',rand(1,100));
        }
        $slider->save();
        return redirect('admin/sliders')->with('message', 'اسلایدر جدید با موفقیت ایجاد شد');
    }



    public function edit($id)
    {
        $slider = Slider::findOrFail($id);
        return view('slider.edit', compact('slider'));
    }


    public function update(UpdateSliderRequest $request, $id)
    {
        $slider = Slider::findOrFail($id);
        $data = $request->all();
        if($request->image_url){
            $data['image_url'] = upload_file($request, 'image_url', 'slider',rand(1,100));
        }
        if($request->mobile_image_url){
            $data['mobile_image_url'] = upload_file($request, 'mobile_image_url', 'slider',rand(1,100));
        }
        $slider->update($data);
        return redirect('admin/sliders')->with('message', 'اسلایدر با موفقیت به روز رسانی شد');
    }
}
