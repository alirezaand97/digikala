@extends('layouts.mobile-order')

@section('content')

    <div class="order_container c_mobile_margin_bottom">
        <div class="order_header">
            <div class="header_center">
                <a href="/"><img src="{{asset('images/logo.svg')}}"></a>
                <ul class="steps">
                    <li class="active">
                        <a>
                            <div class="step active" data-step="اطلاعات ارسال"></div>
                        </a>
                    </li>
                    <li>
                        <a>
                            <div class="step active" data-step="پرداخت"></div>
                        </a>
                    </li>
                    <li>
                        <a>
                            <div class="step" data-step="تکمیل و ارسال"></div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="payment_container">
            <div class="payment_content">
                <div class="payment_content_box payment_box">
                    <div class="payment_content_sec">
                        <h6 class="title">شیوه پرداخت</h6>
                        <ul class="payment_type_ul">
                            <li class="digi_radio">
                                <label>
                                    <input type="radio" checked>
                                    <span></span>
                                </label>
                            </li>
                            <li class="payment_type_content">
                                <span data-feather="credit-card" class="credit_card"></span>
                                <div class="payment_type_text">
                                    <span class="payment_type_title">پرداخت اینترنتی</span>
                                    <span class="payment_type_dsc">قابل پرداخت با تمام کارت های اعتباری</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <gift-discount-code></gift-discount-code>
                    <div class="payment_content_sec">
                        <h6 class="title">خلاصه سفارش </h6>
                        @if($isNormalSend=='true')
                            <div class="payment_product_container">
                                <div class="payment_product_header">
                                    <ul>
                                        <li>
                                            مرسوله
                                            <span>{{sizeof($cartData['cart_product_data'])}} کالا</span>
                                        </li>
                                        <li>
                                            نحوه ارسال
                                            <span>عادی</span>
                                        </li>
                                        <li>
                                            ارسال از
                                            <span>{{$cartData['normal_min_send_day']}}</span>
                                        </li>
                                        <li>
                                            مبلغ مرسوله
                                            <span>{{number_format($cartData['cart_price'])}} تومان</span>
                                        </li>
                                        <li><span class="payment_arrow_icon fa fa-angle-down"></span></li>
                                    </ul>
                                </div>
                                <div class="payment_product_content mt-5">
                                    <div class="payment_products_slider">
                                        @foreach($cartData['cart_product_data'] as $product)
                                            <div>
                                                <img class="shipment_product_slider_img"
                                                     src="{{url('files/products/'.$product['product_image'])}}">
                                                <p class="shiment_item_product_name">
                                                    {{$product['product_name']}}
                                                </p>
                                                <div class="shipment_color_circle">
                                                    <span class="color_name">{{$product['color_name']}}</span>
                                                    <span class=" color_circle"
                                                          style="background: {{$product['color_code']}}"></span>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        @else
                            @foreach($cartData['product_id_array'] as $key=>$shipment)

                                <div class="payment_product_container">
                                    <div class="payment_product_header">
                                        <ul>
                                            <li>
                                                مرسوله
                                                <span>{{sizeof($shipment)}} کالا</span>
                                            </li>
                                            <li>
                                                نحوه ارسال
                                                <span>سریع</span>
                                            </li>
                                            <li>
                                                ارسال از
                                                <span>{{$cartData['delivery_order_interval'][$key]['minDayslabels']}}</span>
                                            </li>
                                            <li>
                                                مبلغ مرسوله
                                                <span>{{$cartData['delivery_order_interval'][$key]['send_fast_price']}} تومان</span>
                                            </li>
                                            <li><span class="payment_arrow_icon fa fa-angle-down"></span></li>
                                        </ul>
                                    </div>

                                    <div class="payment_product_content mt-5">
                                        <div class="payment_products_slider">
                                            @foreach($shipment as $pId=>$wpId)
                                                <?php $id = $wpId . '_' . $pId;?>

                                                <div>
                                                    <img class="shipment_product_slider_img"
                                                         src="{{url('files/products/'.$cartData['cart_product_data'][$id]['product_image'])}}">
                                                    <p class="shiment_item_product_name">
                                                        {{$cartData['cart_product_data'][$id]['product_name']}}
                                                    </p>
                                                    <div class="shipment_color_circle">
                                                        <span
                                                            class="color_name">{{$cartData['cart_product_data'][$id]['color_name']}}</span>
                                                        <span class=" color_circle"
                                                              style="background: {{$cartData['cart_product_data'][$id]['color_code']}}"></span>
                                                    </div>
                                                </div>
                                            @endforeach
                                        </div>
                                    </div>
                                </div>


                            @endforeach
                        @endif
                    </div>
                </div>
            </div>


            <div class="c_wrapper">
                    <ul class="cart_checkout_ul">
                        <li class="cart_checkout_item">
                            <span class="checkout_text">قیمت کالا ها</span>
                            <span class="checkout_price">
                                <span class="price">{{number_format($cartData['total_price'])}}</span>
                                <span class="tooman">تومان</span>
                            </span>
                        </li>
                        <li class="cart_checkout_item">
                            <span class="checkout_text">تخفیف کالا ها</span>
                            <span class="checkout_price">
                                <span class="price digi_color_red">{{number_format($cartData['cart_discount'])}}</span>
                                <span class="tooman digi_color_red">تومان</span>
                            </span>
                        </li>
                        <li class="cart_checkout_item sum_price cart_checkout_bold_item">
                            <span>جمع</span>
                            <span class="checkout_price">
                                <span class="price">{{number_format($cartData['cart_price'])}}</span>
                                <span class="tooman">تومان</span>
                            </span>
                        </li>


                        <li class="cart_checkout_item gift_li">
                            <span>کد تخفیف</span>
                            <span class="checkout_price">
                                <span class="price"
                                      id="payment_discount_value">0</span>
                                <span class="tooman">تومان</span>
                            </span>

                        </li>
                        <li class="cart_checkout_item gift_li">
                            <span>کارت هدیه</span>
                            <span class="checkout_price">
                                <span class="price"
                                      id="payment_gift_value">0</span>
                                <span class="tooman">تومان</span>
                            </span>
                        </li>

                        <li class="cart_checkout_item">
                            <h6>هزینه ارسال</h6>
                        </li>
                        <li class="cart_checkout_item">
                            <span data-feather="truck" class="truck_icon"></span>
                            <span class="checkout_price">
                                <span class="price">
                                    @if($isNormalSend=='true')
                                        {{number_format($cartData['normal_send_price'])}}
                                    @else
                                        {{number_format($cartData['fast_send_price'])}}
                                    @endif
                                  </span>
                                <span class="tooman">تومان</span>
                            </span>
                        </li>
                        <li class="cart_checkout_item cart_checkout_bold_item">
                            <span>هزینه قابل پرداخت</span>
                            <span class="checkout_price">
                                <span class="price cart_price checkout_final_price" id="payment_final_price">
                                    @if($isNormalSend=='true')
                                        {{number_format($cartData['cart_price_with_normal_send'])}}
                                    @else
                                        {{number_format($cartData['cart_price_with_fast_send'])}}
                                    @endif
                                    </span>
                                <span class="tooman">تومان</span>
                            </span>
                        </li>
                    </ul>
            </div>
            <div class="c_checkout_submit ">
                <a class="add_to_cart" v-bind:href="$siteUrl+'shipping'">ادامه فرایند خرید</a>
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

        $('.payment_products_slider').slick({
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 2,
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
<script>
    import GiftDiscountCode from "../../js/components/GiftDiscountCode";

    export default {
        components: {GiftDiscountCode}
    }
</script>
