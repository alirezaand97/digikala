<?php

namespace App\Http\Middleware;

use App\UserAccess;
use Closure;
use Illuminate\Support\Facades\Auth;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $request->user();
        if ($user->role == 'admin') {
            return $next($request);
        } else {
            $roleId = $user->role_id;
            $userAccess = UserAccess::where('role_id', $user->role_id)->first();
            if ($userAccess && $roleId > 0) {
                $checkUserAccess = check_user_access($userAccess,$request->route()->getName());
                if ($checkUserAccess) {
                    return $next($request);
                } else {
                    return redirect('admin/unauthorized');
                }
            } else {
                return redirect('/');
            }
        }
    }
}
