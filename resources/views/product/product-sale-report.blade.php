@extends('layouts.admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
   'current'=>['title'=>'گزارش فروش سالیانه محصول']
   ])

    <sale-report :product_id='{{$product_id}}'></sale-report>

@endsection

