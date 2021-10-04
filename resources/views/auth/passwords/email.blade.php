@extends('layouts.auth')

@section('content')
    <div class="form_container">
        <div class="auth-form">
            <form method="post" action="{{ route('password.email') }}" id="forget_password_form">
                @csrf
                <div class="auth_top">
                    <a href="{{url('/')}}"><img src="{{asset('images/logo.svg')}}"/></a>
                </div>
                @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                @endif

                @if (session('warning'))
                    <div class="alert alert-warning" role="alert">
                        {{ session('warning') }}
                    </div>
                @endif
                <h5 class="auth_title">فراموشی رمز عبور</h5>
                <div class="dg_input_div">
                    <label class="digi_label">شماره موبایل</label>
                    <input type="text" name="mobile" id="forget_pass_mobile" class="digi_input"
                           placeholder="شماره موبایل خود را وارد کنید">
                    <span class="error" id="forget_pass_error"></span>
                </div>

                <div>
                    <span class="auth_button" id="forget_password_submit">ارسال کد عبور</span>
                </div>
            </form>
        </div>
    </div>
@endsection
