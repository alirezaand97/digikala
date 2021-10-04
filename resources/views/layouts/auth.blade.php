<!doctype html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="<?= asset('images/digi.ico') ?>">

    <title>ورود یا عضویت</title>
    @yield('styles')

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/auth.css') }}" rel="stylesheet">

</head>
<body>

<div class="container-fluid">
    <div class="content_box">
        @yield('content')
    </div>
</div>


<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ asset('js/auth.js') }}"></script>
@yield('scripts')

</body>
</html>
