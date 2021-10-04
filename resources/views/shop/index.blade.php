@extends('layouts.shop')
@section('content')



    @include('includes/home-slider',['sliders'=>$sliders])

    @include('includes/incredible-offers',['incredible_offers'=>$incredible_offers])
    @if(sizeof($randomOffers)>0)
        <div class="row">
            <div class="col-10">
                @include('includes/product-slider',['products_list'=>$newest_products,'list_title'=>'جدید ترین محصولات'])
            </div>
            <div class="col-2 random_offers_container">
                <div class="random_offers">
                    <div class="random_offers_header">پیشنهادهای لحظه‌ای برای شما</div>
                    @foreach($randomOffers as $key=>$product)
                        <a data-random-offer="{{$key}}" class="random_offers_item @if($key==0) active @endif " href="{{url('product/dgk-'.$product->id.'/'.$product->product_url)}}">
                            <div class="product_item">
                                <div class="product_thumb">
                                    <img src="{{asset('files/thumbnails/'.$product->image_url)}}"/>
                                </div>
                                <h5 class="product_item_name">{{$product->title}}</h5>
                                @if($product->discount_price>0)
                                    <div class="old_price">
                                        <del>{{number_format($product->price+$product->discount_price)}}</del>
                                        <span class="discount">
                                {{get_product_discount_price($product->price,$product->discount_price)}}٪
                            </span>
                                    </div>
                                @endif

                                <div class="price">
                                    <h3>{{number_format($product->price)}}</h3>
                                    <span>تومان</span>
                                </div>
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>
        </div>
    @else
        @include('includes/product-slider',['products_list'=>$newest_products,'list_title'=>'جدید ترین محصولات'])
    @endif
    @include('includes/product-slider',['products_list'=>$best_selling_products,'list_title'=>'پر فروش ترین محصولات'])




@endsection

@section('styles')
    <link href="{{asset('css/slick.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('css/slick-theme.css')}}" rel="stylesheet" type="text/css">
@endsection
@section('scripts')
    <script src="{{asset('js/slick.js')}}" type="text/javascript"></script>

    <script type="text/javascript">
        load_slider('<?= sizeof($sliders) ?>');
        load_Incredible_offers('<?= sizeof($incredible_offers) ?>');

        $('.product_list').slick({
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 4,
            rtl: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: false,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: false,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
                    }
                }
            ]
        });

    </script>
@endsection
