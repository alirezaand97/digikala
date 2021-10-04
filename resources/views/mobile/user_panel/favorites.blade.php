@extends('layouts.mobile-shop')
@section('content')
    <div class="o_page">
            <div class="profile_favorite_header">
                <a href="{{url('user/profile')}}" class="inherit_color">
                    <span data-feather="arrow-right" class="back_icon"></span>
                </a>
                <span>علاقه مندی ها</span>
            </div>
            <mobile-favorite-list></mobile-favorite-list>
    </div>
@endsection
