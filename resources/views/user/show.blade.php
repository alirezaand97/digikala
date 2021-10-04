@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت کاربران','url'=>url('admin/users')]],
    'current'=>['title'=>'کاربر']
    ])


    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">
            <span>جزییات کاربر : {{$user->name?$user->name:'ثبت نشده'}}</span>
            <span class="user_role">
                @if($user->getUserRole)
                    {{ $user->getUserRole->name}}
                @else
                    {{ $user->role=='user'?'کاربر عادی':'مدیر'}}
                @endif
            </span>
        </h3>

        <div class="panel_user_detail">
            @if($additionalInfos)
                <div class="profile_box">
                    <div class="profile_box_title">اطلاعات شخصی</div>
                    <div class="profile_box_table">
                        <div class="profile_table_cell">
                            <span class="profile_table_cell_title">نام و نام خانوادگی</span>
                            <span
                                class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'first_name','last_name')}}</span>
                        </div>
                        <div class="profile_table_cell">
                            <span class="profile_table_cell_title">پست الکترونیکی</span>
                            <span
                                class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'email')}}</span>
                        </div>
                        <div class="profile_table_cell">
                            <span class="profile_table_cell_title">شماره تلفن همراه</span>
                            <span class="profile_table_cell_content">{{$user->mobile}}</span>
                        </div>
                        <div class="profile_table_cell">
                            <span class="profile_table_cell_title">کد ملی</span>
                            <span
                                class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'national_identity_number')}}</span>
                        </div>
                        <div class="profile_table_cell">
                            <span class="profile_table_cell_title">دریافت خبرنامه</span>
                            <span class="profile_table_cell_content">{{getNewsletter($additionalInfos)}}</span>
                        </div>
                        <div class="profile_table_cell">
                            <span class="profile_table_cell_title">شماره کارت</span>
                            <span
                                class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'bank_card_number')}}</span>
                        </div>

                        @if($additionalInfos->company_name)

                            <div class="profile_table_cell">
                                <span class="profile_table_cell_title">نام سازمان</span>
                                <span
                                    class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'company_name')}}</span>
                            </div>
                            <div class="profile_table_cell">
                                <span class="profile_table_cell_title">کد اقتصادی</span>
                                <span
                                    class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'company_economic_number')}}</span>
                            </div>
                            <div class="profile_table_cell">
                                <span class="profile_table_cell_title">شناسه ثبت</span>
                                <span
                                    class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'company_registration_number')}}</span>
                            </div>
                            <div class="profile_table_cell">
                                <span class="profile_table_cell_title">شناسه ملی</span>
                                <span
                                    class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'company_national_identity_number')}}</span>
                            </div>
                            <div class="profile_table_cell">
                                <span class="profile_table_cell_title">شماره تلفن ثابت</span>
                                <span
                                    class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'company_phone')}}</span>
                            </div>
                        @endif
                    </div>
                </div>
            @endif

            <div>
                <div class="product_navs">
                    <ul class="nav nav-tabs">
                        <li>
                            <a data-toggle="tab" href="#orders" class="active">
                                <span data-feather="shopping-bag"></span><span>سفارشات کاربر </span>
                            </a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#questions">
                                <span data-feather="help-circle"></span><span>پرسش های کاربر</span>
                            </a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#comments">
                                <span data-feather="message-square"></span><span>نظرات کاربر</span>
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div id="orders" class="tab-pane fade show active">
                            @include('order.order-list',['allowAction'=>false])
                            <a class="digi_dashed_link" href="{{url('admin/orders?user_id='.$user->id)}}">
                                لیست کامل سفارشات کاربر
                                <span class="fa fa-angle-left"></span>
                            </a>
                        </div>
                        <div id="questions" class="tab-pane fade">
                            @include('question.question-list')
                        </div>
                        <div id="comments" class="tab-pane fade">
                            @include('comment.comment-list')
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
@endsection
