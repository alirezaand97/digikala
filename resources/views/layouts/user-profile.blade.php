@extends('layouts.shop')
@section('content')
    <div class="user_profile_container">
        <div class="user_profile_side">
            <div class="user_profile_sidebar">
                <div class="user_profile_top"></div>
                <ul class="user_profile_menu">
                    <li class="user_profile_menu_item">
                        <a href="{{url('user/profile/orders')}}">
                            <span data-feather="clipboard" class="user_profile_menu_icon"></span>
                            <span class="user_profile_menu_text">سفارش های من</span>
                        </a>
                    </li>

                    <li class="user_profile_menu_item">
                        <a href="">
                            <span data-feather="heart" class="user_profile_menu_icon"></span>
                            <span class="user_profile_menu_text">علاقه مندی ها</span>
                        </a>
                    </li>

                    <li class="user_profile_menu_item">
                        <a href="">
                            <span data-feather="message-circle" class="user_profile_menu_icon"></span>
                            <span class="user_profile_menu_text">نظرات</span>
                        </a>
                    </li>

                    <li class="user_profile_menu_item">
                        <a href="{{url('user/profile/address')}}">
                            <span data-feather="navigation" class="user_profile_menu_icon"></span>
                            <span class="user_profile_menu_text">نشانی ها</span>
                        </a>
                    </li>

                    <li class="user_profile_menu_item">
                        <a href="{{url('user/profile/gift-cart')}}">
                            <span data-feather="credit-card" class="user_profile_menu_icon"></span>
                            <span class="user_profile_menu_text">کارت های هدیه</span>
                        </a>
                    </li>

                    <li class="user_profile_menu_item">
                        <a href="">
                            <span data-feather="mail" class="user_profile_menu_icon"></span>
                            <span class="user_profile_menu_text">پیغام ها</span>
                        </a>
                    </li>

                    <li class="user_profile_menu_item">
                        <a href="{{url('user/profile/additional-info')}}">
                            <span data-feather="user" class="user_profile_menu_icon"></span>
                            <span class="user_profile_menu_text">اطلاعات حساب</span>
                        </a>
                    </li>
                </ul>
            </div>

        </div>
        <div class="user_profile_main">
            @yield('user-profile')
        </div>
    </div>
@endsection
