<?php

namespace App\Http\Controllers\Admin;

use App\Role;
use Illuminate\Http\Request;

class RoleController extends AdminBaseController
{
    protected $model='\App\Role';
    protected $routeName='roles';
    protected $modelName=' نقش کاربری';

    public function index(Request $request)
    {
        $roles = Role::getData($request);
        $trashed_count = Role::onlyTrashed()->count();
        return view('role.index', ['roles' => $roles, 'trashed_count' => $trashed_count]);
    }


    public function create()
    {
        return view('role.create');
    }


    public function store(Request $request)
    {
        $this->validate($request,['name'=>'required|unique:roles,name'],[],['name'=>'نقش کاربری']);
        $role = new Role();
        $role->name = $request->name;
        $role->save();
        return redirect('admin/roles')->with('message', 'نقش کاربری جدید با موفقیت ایجاد شد');
    }



    public function edit($id)
    {
        $role = Role::findOrFail($id);
        return view('role.edit', compact('role'));
    }


    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $data = $request->all();
        $role->update($data);
        return redirect('admin/roles')->with('message', 'نقش کاربری با موفقیت به روز رسانی شد');
    }
}
