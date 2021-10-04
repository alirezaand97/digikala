<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\Http\Requests\Category\CreateCategoryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CategoryController extends AdminBaseController
{
    protected $model = '\App\Category';
    protected $routeName = 'category';
    protected $modelName = 'دسته بندی';

    public function index(Request $request)
    {
        $cats = Category::getData($request);
        $trashed_count = Category::onlyTrashed()->count();
        return view('category.index', ['categories' => $cats, 'trashed_count' => $trashed_count, 'search' => $request->get('search')]);
    }


    public function create()
    {
        $categories = Category::get_list();
        return view('category.create', ['categories' => $categories]);
    }


    public function store(CreateCategoryRequest $request)
    {
        if (Cache::has('shop-category')) {
            Cache::forget('shop-category');
        }
        $category = new Category();
        $category->name = $request->name;
        $category->ename = $request->ename;
        $category->url = get_url($request->ename);
        $category->img = upload_file($request, 'image', 'upload');
        $category->not_show = $request->has('not_show') ? 1 : 0;
        $category->parent_id = $request->parent_id;
        $category->save();
        return redirect('admin/category')->with('message', 'دسته بندی جدید با موفقیت ایجاد شد');
    }


    public function edit($id)
    {
        $category = Category::findOrFail($id);
        $categories = Category::get_list();
        return view('category.edit', compact('category', 'categories'));
    }


    public function update(CreateCategoryRequest $request, $id)
    {
        if (Cache::has('shop-category')) {
            Cache::forget('shop-category');
        }
        $category = Category::findOrFail($id);
        $data = $request->all();
        $data['not_show'] = $request->has('not_show') ? 1 : 0;
        $data['ename'] = get_url($request->ename);

        $img = upload_file($request, 'image', 'upload');
        if ($img != null) {
            $data['img'] = $img;
        }
        $category->update($data);
        return redirect('admin/category')->with('message', 'دسته بندی با موفقیت به روز رسانی شد');
    }


}
