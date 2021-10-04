@extends('layouts.auth')

@section('content')
    <div class="form_container">
        <div class="auth-form">
            <form method="post" action="{{route('register')}}" id="register_form">
                @csrf
                <div class="auth_top">
                    <a href="{{url('/')}}"><img src="{{asset('images/logo.svg')}}"/></a>
                </div>
                <h5 class="auth_title">ثبت نام</h5>
                <div class="dg_input_div">
                    <label class="digi_label">شماره موبایل</label>
                    <input type="text" name="mobile" id="register_mobile" class="digi_input" placeholder="شماره موبایل خود را وارد کنید">
                    <span class="error" id="register_mobile_error">{{$errors->first('mobile')}}</span>
                </div>
                <div class="dg_input_div">
                    <label class="digi_label">گذرواژه</label>
                    <input type="password" name="password" id="register_password" class="digi_input" placeholder="گذرواژه خود را وارد کنید">
                    <span class="error" id="register_password_error">{{$errors->first('password')}}</span>
                </div>
                <div>
                    <span class="auth_button" id="register_submit">ادامه</span>
                </div>
                <p class="text_small">اگر حساب کاربری دارید <a class="digi_dashed_link" href="{{route('login')}}">وارد</a> شوید </p>
                <span class="dg_policy">
                    با ورود و یا ثبت نام در دیجی‌کالا شما <a href="#" class="digi_dashed_link">شرایط و قوانین</a> استفاده از سرویس های سایت دیجی‌کالا و <a href="#" class="digi_dashed_link">قوانین حریم خصوصی</a> آن را می‌پذیرید.
                </span>
            </form>
        </div>
    </div>
@endsection
