<?php

namespace App\Http\Controllers\Admin;

use App\Color;
use App\Http\Requests\Color\CreateColorRequest;
use Illuminate\Http\Request;

class ColorController extends AdminBaseController
{
    protected $model = '\App\Color';
    protected $routeName = 'colors';
    protected $modelName = ' رنگ';

    public function index(Request $request)
    {
        $colors = Color::getData($request);
        $trashed_count = Color::onlyTrashed()->count();
        return view('color.index', ['colors' => $colors, 'trashed_count' => $trashed_count, 'search' => $request->get('search')]);
    }


    public function create()
    {
        return view('color.create');
    }


    public function store(CreateColorRequest $request)
    {
        $color = new Color();
        $color->name = $request->name;
        $color->code = $request->code;
        $color->save();
        return redirect('admin/colors')->with('message', 'رنگ جدید با موفقیت ایجاد شد');
    }


    public function edit($id)
    {
        $color = Color::findOrFail($id);
        return view('color.edit', compact('color'));
    }


    public function update(CreateColorRequest $request, $id)
    {
        $color = Color::findOrFail($id);
        $color->update($request->all());
        return redirect('admin/colors')->with('message', 'رنگ با موفقیت به روز رسانی شد');
    }
}
