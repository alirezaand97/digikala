@extends('layouts.mobile-shop')
@section('content')

    <div class="slider_box">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                @foreach($sliders as $key=>$slider)
                    <div class="swiper-slide">
                        <a
                            href="{{url($slider->url)}}"
                            style='background: url("{{asset('files/slider/'.$slider->image_url)}}")'
                            class="slider_item"
                        >
                        </a>
                    </div>
                @endforeach
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>

    @include('includes/mobile-incredible-offers',['incredible_offers'=>$incredible_offers])

    @include('includes/mobile-product-slider',['products_list'=>$newest_products,'list_title'=>'جدید ترین محصولات'])

    <div class="row siders_side_container">
        @foreach($slidersSide as $sliderSide)
            <div class="slider_side col-6">
                <a href="{{asset($sliderSide->url)}}"
                   style='background: url("{{asset('files/slider/'.$sliderSide->image_url)}}")'></a>
            </div>
        @endforeach
    </div>

    @include('includes/mobile-product-slider',['products_list'=>$best_selling_products,'list_title'=>'پر فروش ترین محصولات'])


@endsection

@section('styles')
        <link href="{{asset('css/swiper-bundle.css')}}" rel="stylesheet" type="text/css">
@endsection

@section('scripts')
    <script src="{{asset('js/swiper-bundle.js')}}" type="text/javascript"></script>
    <script type="text/javascript">
        let slider=new Swiper('.slider_box .swiper-container',{
            pagination:{
                el:'.swiper-pagination'
            }
        });

        let product_slider=new Swiper('.products_list .swiper-container',{
            slidesPerView: 'auto',
            spaceBetween:10
        });

        let increidible_slider=new Swiper('.incredible_offers_list .swiper-container',{
            slidesPerView: 'auto',
            spaceBetween:10
        });
    </script>
@endsection



