@extends('layouts.shop')
@section('content')
    <shopping-cart  :cart="{{json_encode($cart_data)}}"></shopping-cart>
@endsection

