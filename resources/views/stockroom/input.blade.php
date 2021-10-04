@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'ورودی انبار ']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">ورودی انبار </h3>

        <stockroom-input :stockrooms='{{$stockrooms}}'></stockroom-input>

    </div>
@endsection
