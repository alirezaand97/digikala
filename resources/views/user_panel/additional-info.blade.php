@extends('layouts.user-profile')
@section('user-profile')
    <div class="user_profile_content">
        <div class="user_profile_tab_title">
            <span>اطلاعات شخصی</span>
        </div>
        @php
            $userInfo=['first_name'=>'نام','last_name'=>'نام خانوادگی','national_identity_number'=>'کد ملی','mobile_phone'=>'شماره تلفن همراه','email'=>'پست الکترونیکی','bank_card_number'=>'کارت بانکی'];
        $legalInfo=['company_name'=>'نام سازمان','company_economic_number'=>'کد اقتصادی','company_registration_number'=>'شناسه ثبت','company_national_identity_number'=>'شناسه ملی','company_phone'=>'شماره تلفن ثابت'];
        @endphp
        <div class="profile_info_box">
            <form method="post" action="{{url('user/profile/additional-info')}}">
                @csrf
                <div class="row">
                    @foreach($userInfo as $key=>$value)
                        <div class="col-sm-12 col-md-6 profile_input_box">
                            <label class="digi_input_label">{{$value}}</label>
                            <input type="text"
                                   class="digi_input profile_user_input @if($errors->has($key)) error_border @endif"
                                   name="{{$key}}"
                                   value="{{getUserData($additionalInfos,$key)}}"
                            >
                            @if($errors->has($key))
                                <span class="digi_input_error">{{$errors->first($key)}}</span>
                            @endif
                        </div>
                    @endforeach
                    <div class="col-sm-12 col-md-6 profile_input_box">
                        <label for="profile_newsletter">اشتراک خبرنامه</label>
                        <input type="checkbox" id="profile_newsletter" name="newsletter"
                               @if(getUserData($additionalInfos,'newsletter')=='yes') checked="checked" @endif />
                    </div>
                </div>
                <div class="profile_form_submit_left">
                    <button class="profile_submit_btn"> ثبت اطلاعات</button>
                </div>
            </form>
        </div>
    </div>


    <div class="user_profile_content profile_legal_box">
        <div class="user_profile_tab_title">
            <span>اطلاعات حقوقی</span>
        </div>
        <div class="profile_info_box">
            <div class="profile_legal_tab">
                <p>با تکمیل اطلاعات حقوقی، می‌توانید اقدام به خرید سازمانی با دریافت فاکتور رسمی و گواهی ارزش افزوده
                    نمایید.</p>
                <div class="profile_legal_link">
                    ویرایش اطلاعات حقوقی
                    <span class="fa fa-angle-left"></span>
                </div>
            </div>
            <div class="profile_legal_form_box">
                <form method="post" action="{{url('user/profile/legal-info')}}">
                    @csrf
                    <div class="row">
                        @foreach($legalInfo as $key=>$value)
                            <div class="col-sm-12 col-md-6 profile_input_box">
                                <label class="digi_input_label">{{$value}}</label>
                                <input type="text"
                                       class="digi_input profile_user_input @if($errors->has($key)) error_border @endif"
                                       name="{{$key}}"
                                       value="{{getUserData($additionalInfos,$key)}}"
                                >
                                @if($errors->has($key))
                                    <span class="digi_input_error">{{$errors->first($key)}}</span>
                                @endif
                            </div>
                        @endforeach

                        <div class="col-sm-12 col-md-6 profile_input_box">
                            <label class="digi_input_label">استان محل دفتر مرکزی</label>
                            {{ Form::select('province_id',$provinces,getUserData($additionalInfos,'province_id'),['class'=>'selectpicker','data-live-search'=>'true','id'=>'legal_province_id']) }}
                            @if($errors->has('province_id'))
                                <span class="digi_input_error">{{$errors->first('province_id')}}</span>
                            @endif
                        </div>

                        <div class="col-sm-12 col-md-6 profile_input_box">
                            <label class="digi_input_label">شهر محل دفتر مرکزی</label>
                            {{ Form::select('city_id',[],getUserData($additionalInfos,'city_id'),['class'=>'selectpicker','data-live-search'=>'true','id'=>'legal_city']) }}
                            @if($errors->has('city_id'))
                                <span class="digi_input_error">{{$errors->first('city_id')}}</span>
                            @endif
                        </div>
                    </div>
                    <div class="profile_form_submit_left">
                        <button class="profile_submit_btn"> ثبت اطلاعات</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    @if(old('company_name'))
        <script type="text/javascript">
            $(".profile_legal_link").click();
        </script>
    @endif
@endsection
