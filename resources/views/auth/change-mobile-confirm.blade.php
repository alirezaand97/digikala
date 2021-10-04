@extends('layouts.auth')

@section('content')
    <div class="form_container">
        <div class="auth-form">
            <form method="post" action="{{url('verify-change-mobile')}}" id="verify_user">
                @csrf
                <div class="auth_top">
                    <a href="{{url('/')}}"><img src="{{asset('images/logo.svg')}}"/></a>
                </div>
                <h5 class="auth_title">کد تایید را وارد نمایید</h5>
                <div class="auth_paragraph">
                    <p>حساب کاربری با شماره موبایل {{$mobile}} وجود ندارد.</p>
                    <p>برای ساخت حساب جدید، کد تایید برای این شماره ارسال گردید.</p>
                </div>
                <div class="dg_input_div mt-4">
                    <label class="digi_label">کد فعالسازی</label>
                    <input type="text" name="register_code" id="register_code" class="digi_input"
                           placeholder="کد ارسال شده را وارد کنید">
                    <input type="hidden" id="confirm_mobile" name="mobile" value="{{$mobile}}">
                    <span class="error" id="register_code_error"></span>
                    @if(\Illuminate\Support\Facades\Session::has('confirm_error'))
                        <span class="error">{{\Illuminate\Support\Facades\Session::get('confirm_error')}}</span>
                    @endif
                </div>

                <span id="resend_code">
                    ارسال مجدد کد
                     <span id="timer">
                        03:00
                    </span>
                </span>


                <div>
                    <span class="auth_button" id="confirm_code">تکمیل ثبت نام</span>
                </div>

            </form>
        </div>
    </div>
@endsection

@section('scripts')
    <script type="text/javascript">
        startTimer();
    </script>
@endsection
