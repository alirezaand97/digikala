@extends('layouts.auth')

@section('content')
    <div class="form_container">
        <div class="auth-form">
            <form method="post" action="{{route('login')}}" id="login_form">
                @csrf
                <div class="auth_top">
                    <a href="{{url('/')}}"><img src="{{asset('images/logo.svg')}}"/></a>
                </div>
                <h5 class="auth_title">ورود</h5>
                <div class="dg_input_div">
                    <label class="digi_label">شماره موبایل</label>
                    <input type="text" name="mobile" id="login_mobile" class="digi_input"
                           placeholder="شماره موبایل خود را وارد کنید">
                    <span class="error" id="login_mobile_error"></span>
                </div>
                <div class="dg_input_div">
                    <label class="digi_label">گذرواژه</label>
                    <input type="password" name="password" id="login_password" class="digi_input"
                           placeholder="گذرواژه خود را وارد کنید">
                </div>
                @if($errors->has('mobile'))
                    <span class="error">{{$errors->first('mobile')}}</span>
                @endif
                <div>
                    <span class="auth_button" id="login_submit">ورود</span>
                </div>
                <div class="remember_me">
                    <div>
                        <input class="form-check-input" type="checkbox" name="remember"
                               id="remember" {{ old('remember') ? 'checked' : '' }}>
                        <label class="form-check-label" for="remember">
                            مرا بخاطر بسپار
                        </label>
                    </div>
                    <p class="text_small">
                        اگر حساب کاربری ندارید<a href="{{route('register')}}" class="digi_dashed_link">ثبت نام</a> کنید
                    </p>
                </div>
                <p class="text_small">
                    <span>رمز عبور خود را فراموش کرده اید؟</span>
                    <a href="{{url('password/reset')}}">بازگردانی رمز عبور</a>
                </p>


            </form>
        </div>
    </div>
@endsection
