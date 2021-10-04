<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Session;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    //متد های زیر برای استفاده از موبایل به جای ایمیل برای فراموشی گذرواژه، بازنویسی شده اند
    protected function validateEmail(Request $request)
    {
        $request->validate(['mobile' => 'required']);
    }

    protected function credentials(Request $request)
    {
        return $request->only('mobile');
    }

    public function sendResetLinkEmail(Request $request)
    {

        $user = $this->broker()->getUser($this->credentials($request));

        if ($user) {
            $token = $this->broker()->createToken($user);
            Session::put('token', $token);
            //باید در مدل کاربر از تابع getEmailForPasswordReset استفاده کنیم تا از موبایل جای ایمیل برای ذخیره در جدول توکن استفاده کند
            $user->forget_password_code = generate_active_code();
            $user->update();
            return redirect('password/confirm')->with([
                'mobile' => $user->mobile
            ]);
        } else {
            return redirect()->back()->withInput()->with(['warning' => 'شماره موبایل وارد شده یافت نشد']);
        }
    }


    public function forgetPassword()
    {
        $mobile = Session::get('mobile');
        $token = Session::get('token');
        if ($token && $mobile) {
            return view('auth.passwords.confirm', compact('mobile', 'token'));
        } else {
            return redirect('/');
        }
    }

    public function checkConfirmPassword(Request $request)
    {
        $mobile = $request->mobile;
        $token = Session::get('token');
        $forget_password_code = $request->forget_password_code;
        $user = User::where(['mobile' => $mobile, 'forget_password_code' => $forget_password_code])->first();
        if ($user) {
            $user->forget_password_code = null;
            $user->update;
            return redirect('/password/reset/' . $token . '?mobile=' . $mobile);
        } else {
            return redirect()->back()->with(['token' => $token])->with(['confirm_error' => 'کد فعالسازی صحیح نمی باشد']);
        }
    }
}
