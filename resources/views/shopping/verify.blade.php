@extends('layouts.order')

@section('content')

    <div class="order_container">
        <div class="order_header">
            <div class="header_center">
                <a href="/"><img src="{{asset('images/logo.svg')}}"></a>
                <ul class="steps">
                    <li class="active">
                        <a>
                            <div class="step active" data-step="اطلاعات ارسال"></div>
                        </a>
                    </li>
                    <li class="active">
                        <a>
                            <div class="step active" data-step="پرداخت"></div>
                        </a>
                    </li>
                    <li>
                        <a>
                            <div class="step active" data-step="تکمیل و ارسال"></div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <?php
        $jdf = new \App\Jdf();
        $orderDate = $jdf->jdate(' j F Y', $order->created_at)
        ?>
        <div class="verify_order">
            <div class="order_verify_desc order_verify_header">
                <h6>جزییات سفارش</h6>
                <ul class="order_list_inline">
                    <li class="order_list_item">
                        تاریخ :
                        <span class="order_list_item_text">   {{$orderDate}}</span>

                    </li>
                    <li class="order_list_item">
                        شماره :
                        <span class="order_list_item_text">
                            {{$order->order_code}}
                        </span>
                    </li>
                    <li class="order_list_item">
                        مبلغ کل :
                        <span class="order_list_item_text">
                            {{$order->total_price}} <span class="tooman">تومان</span>
                        </span>
                    </li>
                    @if($order->gift_value)
                        <li class="order_list_item">
                            کارت هدیه :
                            <span class="order_list_item_text">
                            {{$order->gift_value}} <span class="tooman">تومان</span>
                        </span>
                        </li>
                    @endif
                </ul>
            </div>
            <div class="order_verify_desc">
                <ul class="order_list_inline">
                    <li class="order_list_item">
                        تحویل گیرنده :
                        <span class="order_list_item_text">{{$order->getAddress->name}}</span>

                    </li>
                    <li class="order_list_item">
                        شماره تماس :
                        <span class="order_list_item_text">
                            {{$order->getAddress->mobile}}
                        </span>
                    </li>
                </ul>
                <ul class="order_list_inline">
                    <li class="order_list_item">
                        آدرس :
                        <span class="order_list_item_text">
                            {{$order->getAddress->province->name}}-{{$order->getAddress->city->name}}-{{$order->getAddress->post_address}}
                        </span>

                    </li>
                </ul>
            </div>
            <div class="verify_shipments_list">
                <?php $i = 1; ?>
                @foreach($order->getOrderInfo as $orderInfo)
                    <?php
                    $data = get_shipment_price($order['getOrderProducts'], $orderInfo);
                    $totalPrice = $data['total_price'];
                    $orderProducts = $data['products'];
                    ?>
                    <div class="order_verify_shipment_box">
                        <div class="order_verify_shipment_header">
                            <div class="order_list_item_text">مرسوله {{ $i }} از {{sizeof($order->getOrderInfo)}} ارسال
                                با
                                پست اختصاصی دیجی کالا
                            </div>
                            <ul class="order_list_inline">
                                <li class="order_list_item">
                                    بازه تحویل :
                                    <span class="order_list_item_text">{{$orderInfo['delivery_order_interval']}}</span>

                                </li>
                            </ul>
                            <ul class="order_list_inline">
                                <li class="order_list_item">
                                    مبلغ کل مرسوله :
                                    <span class="order_list_item_text">{{$totalPrice}}</span>
                                </li>
                                <li class="order_list_item">
                                    هزینه ارسال :
                                    <span class="order_list_item_text">{{$orderInfo['send_price']}}</span>
                                </li>
                            </ul>
                            <div class="order_verify_steps">
                                <h6 class="order_verify_title">مراحل ارسال سفارش:</h6>
                                <div class="order_steps_slider" dir="rtl">
                                    @foreach($orderStatuses as $key=>$step)
                                        @if($key>=0)
                                            <div class="order_step_item">
                                                <div class="order_step_circle @if($orderInfo['send_status']>=$key) step_active @endif" >

                                                    @if($orderInfo['send_status']>=$key) <span class="fa fa-check"> </span> @else  {{$key}}@endif
                                                </div>
                                                <div class="order_step_text">
                                                    {{$step}}
                                                </div>
                                            </div>
                                        @endif
                                    @endforeach
                                </div>
                            </div>
                        </div>
                        <div class="order_verify_shipment_content">
                            @foreach($orderProducts as $product)
                                <div class="cart_item">
                                    <div class="cart_p_image">
                                        <a>
                                            <img src={{asset('files/products/'.$product['getProduct']['image_url'])}}>
                                        </a>

                                    </div>
                                    <div class="cart_p_content">
                                        <h6> {{$product['getProduct']['title']}}</h6>
                                        <div class="cart_p_detail color">
                                            <span> {{$product['getColor']['name']}}</span>
                                            <span class="color_circle"
                                                  style="background: {{$product['getColor']['code']}}"></span>
                                        </div>
                                        <div class="cart_p_detail">
                                            <span> {{$product['getWarranty']['name']}}</span>
                                        </div>
                                        <div class="cart_p_detail">
                                            <span>دیجی کالا</span>
                                        </div>

                                        <div class="cart_p_detail">
                                            <div>
                                                <span>تعداد: </span>
                                                <span class="price">{{$product['product_count']}}</span>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="cart_p_detail ml-4">
                                                <div>
                                                    <span>قیمت واحد: </span>
                                                    <span class="price">{{$product['product_price2']}}</span>
                                                    <span class="tooman">تومان</span>
                                                </div>
                                            </div>
                                            <div class=" cart_p_detail ml-4">
                                                <div>
                                                    <span>قیمت کل: </span>
                                                    <span
                                                        class="price">{{$product['product_price2']*$product['product_count']}}</span>
                                                    <span class="tooman">تومان</span>
                                                </div>
                                            </div>
                                            <div class=" cart_p_detail ml-4">
                                                <div>
                                                    <span>تخفیف: </span>
                                                    <span
                                                        class="price digi_color_red">{{$product['getProduct']['discount_price']}}</span>
                                                    <span class="tooman">تومان</span>
                                                </div>
                                            </div>
                                            <div class=" cart_p_detail ml-4">
                                                <div>
                                                    <span>قیمت نهایی: </span>
                                                    <span class="price">
                                                    {{($product['product_price2']*$product['product_count'])-($product['getProduct']['discount_price']*$product['product_count'])}}
                                                </span>
                                                    <span class="tooman">تومان</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    <?php $i++ ?>
                @endforeach
            </div>
        </div>
    </div>


@endsection

@section('styles')
    <link href="{{asset('css/slick.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('css/slick-theme.css')}}" rel="stylesheet" type="text/css">
@endsection
@section('scripts')
    <script src="{{asset('js/slick.js')}}" type="text/javascript"></script>
    <script type="text/javascript">
        $('.order_steps_slider').slick({
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
