@extends('layouts/admin')
@section('content')

    @include('includes.breadcrumb',['data'=>[
   ['title'=>'مدیریت سفارش ها','url'=>url('admin/orders?user_id='.$order->user_id)]],
    'current'=>['title'=>'سفارش'.$order->order_code]])

    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">سفارش {{$order->order_code}}ا</h3>
        <div class="order_container">
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
                            {{number_format($order->total_price)}} <span class="tooman">تومان</span>
                        </span>
                        </li>
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
                                <div class="order_list_item_text">مرسوله {{ $i }} از {{sizeof($order->getOrderInfo)}}
                                    ارسال
                                    با
                                    پست اختصاصی دیجی کالا
                                </div>
                                <ul class="order_list_inline">
                                    <li class="order_list_item">
                                        بازه تحویل :
                                        <span
                                            class="order_list_item_text">{{$orderInfo['delivery_order_interval']}}</span>

                                    </li>
                                </ul>
                                <ul class="order_list_inline">
                                    <li class="order_list_item">
                                        کد تخفیف :
                                        <span class="order_list_item_text">{{$order->discount_code}}</span>
                                    </li>
                                    <li class="order_list_item">
                                        مبلغ کد تخفیف:
                                        <span class="order_list_item_text">{{$order->discount_value}}</span>
                                    </li>
                                </ul>
                                <ul class="order_list_inline">
                                    <li class="order_list_item">
                                        کد کارت هدیه :
                                        <span class="order_list_item_text">{{$order->gift_id}}</span>
                                    </li>
                                    <li class="order_list_item">
                                        مبلغ کارت هدیه:
                                        <span class="order_list_item_text">{{$order->gift_value}}</span>
                                    </li>
                                </ul>
                                <ul class="order_list_inline">
                                    <li class="order_list_item">
                                        مبلغ قابل پرداخت :
                                        <span class="order_list_item_text">{{$totalPrice}}</span>
                                    </li>
                                    <li class="order_list_item">
                                        هزینه ارسال :
                                        <span class="order_list_item_text">{{$orderInfo['send_price']}}</span>
                                    </li>
                                </ul>
                                <order-steps
                                    v-bind:status="{{$orderInfo['send_status']}}"
                                    v-bind:order_statuses="{{json_encode($orderStatuses)}}"
                                    v-bind:order_info_id="{{$orderInfo['id']}}"

                                ></order-steps>
                            </div>
                            <div class="order_verify_shipment_content">
                                @foreach($orderProducts as $product)
                                    <div class="cart_item position-relative">
                                        <div class="cart_p_image">
                                            <a>
                                                <img
                                                    src={{asset('files/products/'.$product->getProduct->image_url)}}>
                                            </a>

                                        </div>
                                        <div class="cart_p_content">
                                            <h6> {{$product->getProduct->title}}</h6>
                                            <div class="cart_p_detail color">
                                                <span> {{$product->getColor->name}}</span>
                                                <span class="color_circle"
                                                      style="background: {{$product->getColor->code}}"></span>
                                            </div>
                                            <div class="cart_p_detail">
                                                <span> {{$product->getWarranty->name}}</span>
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
                                                        <span
                                                            class="price">{{number_format($product->product_price2)}}</span>
                                                        <span class="tooman">تومان</span>
                                                    </div>
                                                </div>
                                                <div class=" cart_p_detail ml-4">
                                                    <div>
                                                        <span>قیمت کل: </span>
                                                        <span
                                                            class="price">{{number_format($product->product_price2*$product->product_count)}}</span>
                                                        <span class="tooman">تومان</span>
                                                    </div>
                                                </div>
                                                <div class=" cart_p_detail ml-4">
                                                    <div>
                                                        <span>تخفیف: </span>
                                                        <span
                                                            class="price digi_color_red">{{number_format(($product->product_price1-$product->product_price2)*$product->product_count)}}</span>
                                                        <span class="tooman">تومان</span>
                                                    </div>
                                                </div>
                                                <div class=" cart_p_detail ml-4">
                                                    <div>
                                                        <span>قیمت نهایی: </span>
                                                        <span class="price">
                                                    {{number_format(($product->product_price2*$product->product_count))}}
                                                </span>
                                                        <span class="tooman">تومان</span>
                                                    </div>
                                                </div>
                                            </div>
                                            @if($product->send_status==-1)
                                                <div class="alert alert-primary return_alert">
                                                    <div class="d-flex align-items-center">
                                                        <strong> این کالا مرجوع شده است</strong>
                                                    </div>
                                                    <div>علت: <span>{{$product->description}}</span></div>
                                                    <div>
                                                        هزینه پرداخت شده به خریدار:
                                                       <b>
                                                           {{number_format(get_priceof_return_to_customer($product->getProduct->cat_id,$order->getOrderDiscounts,$product))}} تومان
                                                       </b>
                                                    </div>
                                                </div>
                                            @endif
                                            @if($product->send_status>-1)
                                                <div class="dropdown options_list_dropdown">
                                                    <span class="fa fa-ellipsis-v options_dots"
                                                          data-toggle="dropdown"></span>
                                                    <div class="dropdown-menu">
                                                        <a href="{{url('admin/orders/return-product/'.$product->id)}}"
                                                           class="dropdown-item">مرجوع کردن کالا</a>
                                                    </div>
                                                </div>
                                            @endif
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
<script>
    import OrderSteps from "../../js/components/OrderSteps";

    export default {
        components: {OrderSteps}
    }
</script>
