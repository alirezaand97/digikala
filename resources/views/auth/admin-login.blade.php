@extends('layouts.auth')

@section('content')
    <div class="form_container">
        <div class="auth-form">
            <form method="post" action="{{route('login')}}">
                @csrf
                <div class="auth_top">
                    <a href="{{url('/')}}"><img src="{{asset('images/logo.svg')}}"/></a>
                </div>
                <h5 class="auth_title">ورود مدیر</h5>
                <div class="dg_input_div">
                    <label class="digi_label">نام کاربری</label>
                    <input type="text" name="username" class="digi_input"
                           placeholder="نام کاربری خود را وارد کنید">
                    <span class="error" id="login_mobile_error"></span>
                </div>
                <div class="dg_input_div">
                    <label class="digi_label">گذرواژه</label>
                    <input type="password" name="password" id="login_password" class="digi_input"
                           placeholder="گذرواژه خود را وارد کنید">
                </div>
                @if($errors->has('username'))
                    <span class="error">{{$errors->first('username')}}</span>
                @endif
                <div>
                    <button type="submit" class="auth_button">ورود</button>
                </div>
                <div class="remember_me">
                    <div>
                        <input class="form-check-input" type="checkbox" name="remember"
                               id="remember" {{ old('remember') ? 'checked' : '' }}>
                        <label class="form-check-label" for="remember">
                            مرا بخاطر بسپار
                        </label>
                    </div>
                </div>
                <p class="text_small">
                    <span>رمز عبور خود را فراموش کرده اید؟</span>
                    <a href="{{url('password/reset')}}">بازگردانی رمز عبور</a>
                </p>


            </form>
        </div>
    </div>
@endsection
