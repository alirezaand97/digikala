@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت پرسش ها']
    ])


    <div class="pannel">
        @include('includes.message-alert')
        <div class="admin-header">
            <h3 class="admin_pages_title">مدیریت پرسش ها</h3>
            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/questions','title'=>'پرسش ها'])
        </div>
        @include('question.question-list')
        @if(count($questions)==0)
            <div class="text-center">
                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found"/>
                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
            </div>
        @endif
    </div>
@endsection
