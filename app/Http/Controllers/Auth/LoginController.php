<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */


    use AuthenticatesUsers;

    /**
     * روت login فقط برای کاربر است و ادمین از  روت دیگری برای ورود استفاده می کند
     * این متد بازنویسی شده است
     */
    public function username()
    {
        $url = URL::previous();
        if ($url == url('login')) {
            return 'mobile';
        } else {
            return 'username';
        }
    }

    /**
     * این متد بازنویسی شده است. مقادیر موجود در ارایه credential در هنگام لاگین بررسی می شوند و باید این کاربر این ویژگی ها را داشته باشد
     */
    protected function credentials(Request $request)
    {
        $credentials = $request->only($this->username(), 'password');
        $credentials['account_status'] = User::USER_ACTIVE;
        $url = URL::previous();
        if ($url == url('login')) {
            $credentials['role'] = User::USER_NORMAL;
        } else {
            $credentials['role'] = User::USER_ADMIN;
        }
        return $credentials;
    }


    public function showAdminLogin()
    {
        return view('auth.admin-login');
    }


    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
