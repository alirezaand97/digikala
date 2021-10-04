@extends('layouts/admin')
@section('content')

    @include('includes.breadcrumb',['data'=>[
   ['title'=>'مدیریت مرسوله ها','url'=>url('admin/orders/submissions')]],
    'current'=>['title'=>'مرسوله'.$orderInfo->id]])

    <div class="pannel">
        @include('includes.message-alert')
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="admin_pages_title">
                مرسوله {{$orderInfo->id}}
            </h3>
            <a href="{{url('admin/submissions/'.$orderInfo->id.'/factor')}}" class="show_factor_btn">مشاهده فاکتور</a>
        </div>

        <div class="order_container">
            <?php
            $jdf = new \App\Jdf();
            $orderInfoDate = $jdf->jdate(' j F Y',strtotime( $orderInfo->created_at));
            ?>
            <div class="verify_order">
                <div class="order_verify_desc order_verify_header">
                    <h6>جزییات مرسوله</h6>
                    <ul class="order_list_inline">
                        <li class="order_list_item">
                            تاریخ :
                            <span class="order_list_item_text">   {{$orderInfoDate}}</span>

                        </li>
                        <li class="order_list_item">
                            شماره سفارش:
                            <span class="order_list_item_text">
                            {{$orderInfo->getOrder->order_code}}
                        </span>
                        </li>
                        <li class="order_list_item">
                            مبلغ کل سفارش :
                            <span class="order_list_item_text">
                            {{number_format($orderInfo->getOrder->total_price)}} <span class="tooman">تومان</span>
                        </span>
                        </li>
                    </ul>
                </div>
                <div class="order_verify_desc">
                    <ul class="order_list_inline">
                        <li class="order_list_item">
                            تحویل گیرنده :
                            <span class="order_list_item_text">{{$orderInfo->getOrder->getAddress->name}}</span>

                        </li>
                        <li class="order_list_item">
                            شماره تماس :
                            <span class="order_list_item_text">
                            {{$orderInfo->getOrder->getAddress->mobile}}
                        </span>
                        </li>
                    </ul>
                    <ul class="order_list_inline">
                        <li class="order_list_item">
                            آدرس :
                            <span class="order_list_item_text">
                            {{$orderInfo->getOrder->getAddress->province->name}}-{{$orderInfo->getOrder->getAddress->city->name}}-{{$orderInfo->getOrder->getAddress->post_address}}
                        </span>

                        </li>
                    </ul>
                </div>
                <div class="verify_shipments_list">

                        <?php
                        $data = get_shipment_price($orderInfo->getOrder->getOrderProducts, $orderInfo);
                        $totalPrice = $data['total_price'];
                        $orderInfoProducts = $data['products'];
                        ?>
                        <div class="order_verify_shipment_box">
                            <div class="order_verify_shipment_header">
                                <div class="order_list_item_text">
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
                                        مبلغ کل مرسوله :
                                        <span class="order_list_item_text">{{number_format($totalPrice)}}</span>
                                    </li>
                                    <li class="order_list_item">
                                        هزینه ارسال :
                                        <span class="order_list_item_text">{{$orderInfo['send_price']}}</span>
                                    </li>
                                </ul>
                                <order-steps
                                    v-bind:status="{{$orderInfo['send_status']}}"
                                    v-bind:order_statuses="{{json_encode($orderInfoStatuses)}}"
                                    v-bind:order_info_id="{{$orderInfo['id']}}"

                                ></order-steps>
                            </div>
                            <div class="order_verify_shipment_content">
                                @foreach($orderInfoProducts as $product)
                                    <div class="cart_item">
                                        <div class="cart_p_image">
                                            <a>
                                                <img
                                                    src={{asset('files/products/'.$product['getProduct']['image_url'])}}>
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
                                                        <span class="price">{{number_format($product['product_price2'])}}</span>
                                                        <span class="tooman">تومان</span>
                                                    </div>
                                                </div>
                                                <div class=" cart_p_detail ml-4">
                                                    <div>
                                                        <span>قیمت کل: </span>
                                                        <span
                                                            class="price">{{number_format($product['product_price2']*$product['product_count'])}}</span>
                                                        <span class="tooman">تومان</span>
                                                    </div>
                                                </div>
                                                <div class=" cart_p_detail ml-4">
                                                    <div>
                                                        <span>تخفیف: </span>
                                                        <span
                                                            class="price digi_color_red">{{number_format($product['product_price1']-$product['product_price2'])}}</span>
                                                        <span class="tooman">تومان</span>
                                                    </div>
                                                </div>
                                                <div class=" cart_p_detail ml-4">
                                                    <div>
                                                        <span>قیمت نهایی: </span>
                                                        <span class="price">
                                                    {{number_format(($product['product_price2']*$product['product_count']))}}
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
