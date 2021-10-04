<!doctype html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="<?= asset('images/digi.ico') ?>">

    <title>داشبورد ادمین</title>
    @yield('styles')

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">

</head>
<body>

<div class="page-wrapper toggled">
    <!-- sidebar-->
    @include('layouts.sidebar')
    <main class="page-content">
        <div class="container-fluid">
            <div class="content_box" id="app">
                @yield('content')
            </div>
        </div>
    </main>
    <!-- page-content" -->
</div>

<div class="modal fade bd-example-modal-sm" id="confirm_delete_modal" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalCenterTitle"
     aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="delete_modal_content"></div>
                <button type="button" class="btn btn-light delete_modal_btn" data-dismiss="modal"
                        onclick="close_del_item()">بستن
                </button>
                <button type="button" class="btn digi_btn_blue delete_modal_btn" onclick="del_item()">تایید</button>
            </div>
        </div>
    </div>
</div>

<div id="loading_box">
    <div class="loading_container">
        <div class="digi_spinner"></div>
        <span class="mr-3 font-weight-bold">در حال پردازش...</span>
    </div>
</div>

@include('includes.side-notification')

<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ asset('js/admin.js') }}"></script>
<script src="{{ asset('js/adminVue.js') }}"></script>
@yield('scripts')

</body>
</html>
