<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>دیجی کالا</title>
    <link rel="stylesheet" href="{{asset('css/app.css')}}" type="text/css">
    <link rel="stylesheet" href="{{asset('css/shop.css')}}" type="text/css">
    <link rel="icon" href="<?= asset('images/digi.ico') ?>">

    @yield('styles')
</head>
<body>
<div id="app">
    @include('layouts/shop-header')
    <div  class="container-fluid">
        @yield('content')
    </div>
    @include('layouts/shop-footer')
</div>

<div class="dg_loading_container">
    <div class="dg_loading_box">
        <img src="{{asset('images/logo.svg')}}" />
        <div>
            <span class="dg_loading_circle"></span>
            <span class="dg_loading_circle"></span>
            <span class="dg_loading_circle"></span>
            <span class="dg_loading_circle"></span>
        </div>
    </div>
</div>

<script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
<script src="{{ asset('js/main.js') }}" type="text/javascript"></script>
<script src="{{ asset('js/shop.js') }}" type="text/javascript"></script>
<script src="{{ asset('js/shopVue.js') }}" type="text/javascript"></script>
@yield('scripts')
</body>
</html>
