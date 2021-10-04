<?php

namespace App\Http\Controllers\Auth;

use App\AdditionalInfo;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\RedirectsUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{


    public function registerConfirm()
    {
        if (Session::has('mobile')) {
            return \view('auth.register-confirm', ['mobile' => Session::get('mobile')]);
        }
    }

    public function changeMobileConfirm()
    {
        if (Session::has('mobile')) {
            return \view('auth.change-mobile-confirm', ['mobile' => Session::get('mobile')]);
        }
    }

    public function verifyUser(Request $request)
    {
        $code = $request->register_code;
        $mobile = $request->mobile;
        $user = User::where(['mobile' => $mobile, 'account_status' => User::USER_INACTIVE])->first();
        if ($user && $user->active_code == $code) {
            $user->active_code = null;
            $user->account_status = User::USER_ACTIVE;
            $user->update();
            Auth::login($user);
            return redirect('/');
        } else {
            return redirect()->back()->with(['mobile' => $mobile, 'confirm_error' => 'کد وارد شده اشتباه است.'])->withInput();
        }
    }

    public function verifyChangeMobile(Request $request)
    {
        $code = $request->register_code;
        $mobile = $request->mobile;
        $user = Auth::user();
        $additionalInfo = AdditionalInfo::where(['mobile_phone' => $mobile, 'user_id' => $user->id])->first();
        if ($additionalInfo && $user->active_code == $code) {
            $user->active_code = null;
            $user->mobile = $mobile;
            $user->update();
            return redirect('/user/profile');
        } else {
            return redirect()->back()->with(['mobile' => $mobile, 'confirm_error' => 'کد وارد شده اشتباه است.'])->withInput();
        }
    }

    public function resendCode(Request $request)
    {
        $user = User::where(['mobile' => $request->mobile])->first();
        $additionalInfo=AdditionalInfo::where(['mobile_phone' => $request->mobile])->first();
        //هم برای ثبت نام اولیه و هم برای تغییر موبایل از این کد استفاده می کنیم
        if ($user || $additionalInfo) {
            $user->active_code = rand(111111, 999999);
            $user->update();
        }
        return true;
    }
}
