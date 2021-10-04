@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت دیدگاه ها']
    ])


    <div class="pannel">
        @include('includes.message-alert')
        <div class="admin-header">
            <h3 class="admin_pages_title">مدیریت دیدگاه ها</h3>
            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/comments','title'=>'دیدگاه'])
        </div>
        @include('comment.comment-list')
        @if(count($comments)==0)
            <div class="text-center">
                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found"/>
                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
            </div>
        @endif
    </div>
@endsection
