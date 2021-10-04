@extends('layouts.mobile-shop')
@section('content')
        <div class="product_details" id="product_details">
            @include('mobile.includes.product-show-detail',['color_id'=>0])
        </div>
@endsection

@section('styles')
    <link href="{{asset('css/swiper-bundle.css')}}" rel="stylesheet" type="text/css">
@endsection

@section('scripts')
    <script src="{{asset('js/swiper-bundle.js')}}" type="text/javascript"></script>
    <script type="text/javascript">
        let slider=new Swiper('.c_product_gallery_box .swiper-container',{
            pagination:{
                el:'.swiper-pagination',
                dynamicBullets:true
            }
        });

        let product_slider=new Swiper('.products_list .swiper-container',{
            slidesPerView:2,
            spaceBetween:10
        });

    </script>
@endsection



