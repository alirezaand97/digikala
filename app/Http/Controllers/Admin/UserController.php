<?php

namespace App\Http\Controllers\Admin;

use App\AdditionalInfo;
use App\Comment;
use App\Http\Requests\CreateUserRequest;
use App\Order;
use App\Question;
use App\Role;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends AdminBaseController
{
    protected $model = '\App\User';
    protected $routeName = 'users';
    protected $modelName = ' برند';

    public function index(Request $request)
    {
        $users = User::getData($request);
        $roles = Role::get();
        $trashed_count = User::onlyTrashed()->count();
        return view('user.index', ['users' => $users, 'roles' => $roles, 'trashed_count' => $trashed_count, 'request' => $request]);
    }


    public function create()
    {
        $roles = Role::get();
        return view('user.create', compact('roles'));
    }


    public function store(CreateUserRequest $request)
    {
        $user = new User($request->all());
        $role = $request->get('role');
        if ($role === 'admin' || $role === 'user') {
            $user->role = $role;
        } else {
            $user->role = 'user';
            $user->role_id = $role;
        }
        $user->active_code = generate_active_code();
        $user->password = Hash::make($request->password);
        $user->save();
        return redirect('admin/users')->with('message', 'کاربر جدید با موفقیت ایجاد شد');
    }


    public function edit($id)
    {
        $user = User::findOrFail($id);
        $roles = Role::get();
        return view('user.edit', compact('user', 'roles'));
    }


    public function update(CreateUserRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $data = $request->all();
        $role = $request->role;
        if ($role === 'admin' || $role === 'user') {
            $data['role'] = $role;
        } else {
            $data['role'] = 'user';
            $data['role_id'] = $role;
        }
        $user->active_code = generate_active_code();
        if (!empty($request->password)) {
            $data['password'] = Hash::make($request->password);
        } else {
            unset($data['password']);
        }
        $user->update($data);
        return redirect('admin/users')->with('message', 'برند با موفقیت به روز رسانی شد');
    }

    public function show($id)
    {
        $user = User::with('getUserRole')->findOrFail($id);
        $orders = Order::where(['user_id' => $user->id])->orderBy('id', 'DESC')->limit(10)->get();
        $questions = Question::where(['user_id' => $user->id, 'question_id' => 0])->paginate(10);
        $comments = Comment::with(['getUserInfo', 'getScore', 'getProduct'])->where('user_id', $user->id)->orderBy('id', 'ASC')->paginate(10);
        $additionalInfos = AdditionalInfo::where('user_id', $user->id)->first();
        return view('user.show', compact('user', 'orders', 'questions', 'comments', 'additionalInfos'));
    }
}
