<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    //متد های زیر برای استفاده موبایل بازنویسی شده اند
    public function showResetForm(Request $request, $token = null)
    {
        return view('auth.passwords.reset')->with(
            ['token' => $token, 'mobile' => $request->mobile]
        );
    }

    protected function rules()
    {
        return [
            'token' => 'required',
            'mobile' => 'required',
            'password' => 'required|confirmed|min:8',
        ];
    }

    protected function credentials(Request $request)
    {
        return $request->only(
            'mobile', 'password', 'password_confirmation', 'token'
        );
    }

    protected function sendResetFailedResponse(Request $request, $response)
    {
        if ($request->wantsJson()) {
            throw ValidationException::withMessages([
                'mobile' => [trans($response)],
            ]);
        }

        return redirect()->back()
            ->withInput($request->only('mobile'))
            ->withErrors(['mobile' => trans($response)]);
    }
}
