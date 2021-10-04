@extends('layouts.shop')
@section('content')
    <div class="info_page">
        <div class="info_page_box">
            <h1 class="info_page_title">
                {{$showPage->title}}
            </h1>
            <div class="info_page_content">
                {!! strip_tags($showPage->content,'<br><p><h3><h6><h5><h1><h2>') !!}
            </div>
        </div>
    </div>
@endsection
