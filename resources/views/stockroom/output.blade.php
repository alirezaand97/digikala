@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'خروجی انبار ']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">خروجی انبار </h3>

        <stockroom-output :stockrooms='{{$stockrooms}}'></stockroom-output>
    </div>
@endsection
