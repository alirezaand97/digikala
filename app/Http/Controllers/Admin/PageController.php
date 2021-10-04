<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\AdminBaseController;
use App\Page;
use Illuminate\Http\Request;

class PageController extends AdminBaseController
{
    protected $model = '\App\Page';
    protected $routeName = 'pages';
    protected $modelName = ' صفحه';

    public function index(Request $request)
    {
        $pages = Page::getData($request);
        $trashed_count = Page::onlyTrashed()->count();
        return view('page.index', ['pages' => $pages, 'trashed_count' => $trashed_count, 'search' => $request->get('search')]);
    }


    public function create()
    {
        return view('page.create');
    }


    public function store(Request $request)
    {
        $this->validate($request, ['title' => 'required|unique:pages,title', 'content' => 'required'], [], ['title' => 'عنوان صفحه', 'content' => 'محتوای صفحه']);
        $page = new Page($request->all());
        $page->url = get_url($request->title);
        $page->keywords = convert_keywords($request->get('keywords', ''));
        $page->save();
        return redirect('admin/pages')->with('message', 'صفحه جدید با موفقیت ایجاد شد');
    }


    public function edit($id)
    {
        $page = Page::findOrFail($id);
        return view('page.edit', compact('page'));
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, ['title' => 'required|unique:pages,title,' . $id, 'content' => 'required'], [], ['title' => 'عنوان صفحه', 'content' => 'محتوای صفحه']);
        $page = Page::findOrFail($id);
        $page->url = get_url($request->title);
        $page->keywords = convert_keywords($request->get('keywords'));
        $page->update($request->all());
        return redirect('admin/pages')->with('message', 'صفحه با موفقیت به روز رسانی شد');
    }

}





