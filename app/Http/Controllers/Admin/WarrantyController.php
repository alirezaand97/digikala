<?php

namespace App\Http\Controllers\Admin;

use App\Warranty;
use Illuminate\Http\Request;

class WarrantyController extends AdminBaseController
{

    protected $model = '\App\Warranty';
    protected $routeName = 'warranties';
    protected $modelName = ' گارانتی';

    public function index(Request $request)
    {
        $warranties = Warranty::getData($request);
        $trashed_count = Warranty::onlyTrashed()->count();
        return view('warranty.index', ['warranties' => $warranties, 'trashed_count' => $trashed_count, 'search' => $request->get('search')]);
    }


    public function create()
    {
        return view('warranty.create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|string'
        ]);
        $warranty = new Warranty();
        $warranty->name = $request->name;
        $warranty->save();
        return redirect('admin/warranties')->with('message', 'گارانتی جدید با موفقیت ایجاد شد');
    }


    public function edit($id)
    {
        $warranty = Warranty::findOrFail($id);
        return view('warranty.edit', compact('warranty'));
    }


    public function update(Request $request, $id)
    {
        $warranty = Warranty::findOrFail($id);

        $warranty->update($request->all());
        return redirect('admin/warranties')->with('message', 'گارانتی با موفقیت به روز رسانی شد');
    }
}
