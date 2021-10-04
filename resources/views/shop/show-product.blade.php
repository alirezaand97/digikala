@extends('layouts.shop')
@section('content')
    @if(\Illuminate\Support\Facades\Session::has('status'))
        <div
            class="alert mt-3 @if(\Illuminate\Support\Facades\Session::get('status')=='success') alert-success @else alert-danger @endif">
            @if(\Illuminate\Support\Facades\Session::get('status')=='success') دیدگاه شما با موفقیت ثبت شد و پس از تایید
            نمایش داده می شود @else
                در ثبت دیدگاه خطایی رخ داده است مجددا تلاش کنید @endif
        </div>
    @endif
    <div class="product_show_container">
        <div class="product_images">
            <div class="product_main_iamge_box">
                <div class="image_box">
                    <img id="product_main_image_zoom"  src="{{asset('files/products/'.$product->image_url)}}" data-zoom-image="{{asset('files/products/'.$product->image_url)}}"/>
                </div>
                <ul class="product_side_action">
                    <li data-toggle="tooltip" data-placement="left" title="افزودن به علاقمندی ها">
                        <a id="add_favorite" class="favorite" product_id="{{$product->id}}"><span data-feather="heart"
                                                                                                  class="@if($favorite) favorite_checked @endif"></span></a>
                    </li>
                    <li data-toggle="tooltip" data-placement="left" title="اشتراک گذاری">
                        <span data-feather="share-2" data-toggle="modal" data-target="#share_product_modal"></span>
                    </li>

                    @include('includes.share-product')

                    <li data-toggle="tooltip" data-placement="left" title="اطلاع رسانی شگفت انگیز">
                        <span data-feather="bell"></span>
                    </li>
                    <li data-toggle="tooltip" data-placement="left" title="نمودار قیمت" id="open_chart">
                        <span data-feather="bar-chart-2"></span>
                    </li>
                    <li data-toggle="tooltip" data-placement="left" title="مقایسه">
                        <a href="{{url('compare/dgk-'.$product->id)}}">
                            <span data-feather="sidebar"></span>
                        </a>
                    </li>
                    <price-chart product_id="<?=$product->id ?>" product_name="<?=$product->title ?>"></price-chart>
                </ul>
            </div>
            @include('includes.product-gallery')
        </div>

        <div class="product_details" id="product_details">
            @include('includes.product-show-detail',['color_id'=>0])
        </div>
    </div>



    <more-product-price :product_id="<?= $product->id ?>"></more-product-price>

    @if(sizeof($related_products)>0)
        @include('includes.product-slider',['products_list'=>$related_products,'list_title'=>'محصولات مرتبط'])
    @endif

    <div class="product_navs">
        <ul class="nav nav-tabs">
            <li><a data-toggle="tab" href="#Review" class="active"><span
                        data-feather="search"></span><span>نقد و بررسی</span></a></li>
            @if(sizeof($product_specs)>0)
                <li><a data-toggle="tab" href="#specification"><span data-feather="list"></span><span>مشخصات فنی</span></a>
                </li>
            @endif
            <li><a data-toggle="tab" id="show_comments" href="#comments"><span
                        data-feather="message-square"></span><span>نظرات کاربران</span></a></li>
            <li><a data-toggle="tab" href="#qa" id="show_questions"><span data-feather="help-circle"></span><span>پرسش و پاسخ</span></a>
            </li>
        </ul>

        <div class="tab-content">
            <div id="Review" class="tab-pane fade show active">
                @include('includes.product-review',['reviews'=>$reviews,'product'=>$product])
            </div>
            @if(sizeof($product_specs)>0)
                <div id="specification" class="tab-pane fade">
                    @include('includes.product_specification',['product_specs'=>$product_specs,'product'=>$product])
                </div>
            @endif
            <div id="comments" class="tab-pane fade">
                <comment product_id="<?= $product->id ?>" product_title="<?= $product->title ?>"></comment>
            </div>
            <div id="qa" class="tab-pane fade ">
                <questions product_id="<?= $product->id ?>" product_title="<?= $product->title ?>"></questions>
            </div>
        </div>
    </div>

@endsection



@section('styles')
    <link href="{{asset('css/slick.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('css/slick-theme.css')}}" rel="stylesheet" type="text/css">
@endsection
@section('scripts')

    <script type="text/javascript">
        $('li').tooltip();
    </script>

    <script src="{{asset('js/slick.js')}}" type="text/javascript"></script>
    <script src="{{asset('js/jquery.elevatezoom.js')}}" type="text/javascript"></script>

    <script type="text/javascript">


        $('.product_list').slick({
            infinite: false,
            speed: 300,
            slidesToShow: 6,
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

        $("#product_main_image_zoom").elevateZoom({
            scrollZoom: true,
            borderSize: 1,
            cursor: 'zoom-in',
            zoomWindowWidth: 450,
            zoomWindowHeight: 500,
            zoomWindowPosition: 10
        })

        $("#main_gallery_image").elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            scrollZoom: true,
        })


    </script>
@endsection
