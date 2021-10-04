@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
   'current'=>['title'=>'گزارش فروش سالیانه']
   ])

    <sale-report></sale-report>

@endsection

