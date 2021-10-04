@extends('layouts.mobile-shop')
@section('content')
    <mobile-shopping-cart  :cart="{{json_encode($cart_data)}}"></mobile-shopping-cart>
@endsection

