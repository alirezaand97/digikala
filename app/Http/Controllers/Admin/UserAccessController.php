<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Role;
use App\User;
use App\UserAccess;
use Illuminate\Http\Request;

class UserAccessController extends Controller
{
    public function showRoleAccess($role_id)
    {
        $accessList = UserAccess::ACCESS_LIST;

        $role = Role::where('id', $role_id)->first();
        $userAccess = UserAccess::where('role_id', $role_id)->first();
        if($userAccess){
            $userAccess = json_decode($userAccess->access);
        }
        return view('admin.access-list', compact('accessList', 'role', 'userAccess'));
    }

    public function addUserAccess(Request $request, $role_id)
    {
        UserAccess::where('role_id', $role_id)->delete();
        $access = $request->access;
        $access = json_encode($access);
        $userAccess = new UserAccess();
        $userAccess->access = $access;
        $userAccess->role_id = $role_id;
        $userAccess->save();
        return redirect()->back();

    }
}
