


@extends('layouts.auth')

@section('content')
    <div class="form_container">
        <div class="auth-form">
            <form method="POST" action="{{ route('password.update') }}" id="reset_password_form">
                @csrf
                <input type="hidden" name="token" value="{{ $token }}">

                <div class="auth_top">
                    <a href="{{url('/')}}"><img src="{{asset('images/logo.svg')}}"/></a>
                </div>
                @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                @endif
                <h5 class="auth_title">فراموشی رمز عبور</h5>

                <div class="dg_input_div">
                    <label class="digi_label">شماره موبایل</label>
                    <input id="mobile" type="text" name="mobile" value="{{ $mobile ?? old('mobile') }}" class="digi_input" placeholder="شماره موبایل خود را وارد کنید">
                    <span class="error" id="forget_pass_error"></span>
                    @error('mobile')
                    <span class="error" role="alert">
                        <strong>{{ $message }}</strong>
                     </span>
                    @enderror
                </div>

                <div class="dg_input_div">
                    <label class="digi_label">رمز عبور</label>
                    <input id="password" type="password"
                           class="digi_input" name="password"
                           required autocomplete="new-password">

                    @error('password')
                    <span class="invalid-feedback" role="alert">
                           <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <div class="dg_input_div">
                    <label class="digi_label">رمز عبور</label>
                    <input id="password-confirm" type="password" class="digi_input"
                           name="password_confirmation" required autocomplete="new-password">
                </div>

                <div>
                    <button type="submit" class="auth_button" >ثبت رمز عبور جدید</button>
                </div>
            </form>
        </div>
    </div>
@endsection
