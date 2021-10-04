@extends('layouts.mobile-shop')
@section('content')
    @php $jdf=new \App\Jdf(); @endphp
    <div class="o_page">
        <div class="o_box">
            <div class="o_box_header">
               <a href="{{url('user/profile/order')}}" class="inherit_color">
                   <span data-feather="arrow-right" class="back_icon"></span>
               </a>
                <span>جزییات سفارش</span>
            </div>
            <div class="o_box_content">
                <div class="profile_order_info_row">
                    <div class="profile_order_info_cell">
                        <div class="profile_order_info_cell_title">تاریخ ثبت سفارش</div>
                        <div class="profile_order_info_cell_value">{{$jdf->jdate('j F Y',$order->created_at)}}</div>
                    </div>
                    <div class="profile_order_info_cell">
                        <div class="profile_order_info_cell_title">مبلغ کل</div>
                        <div class="profile_order_info_cell_value">{{$order->total_price}}</div>
                    </div>
                </div>

                <div class="profile_order_info_row">
                    <div class="profile_order_info_cell">
                        <div class="profile_order_info_cell_title">تحویل گیرنده</div>
                        <div class="profile_order_info_cell_value">{{$order->getAddress->name}}</div>
                    </div>
                    <div class="profile_order_info_cell">
                        <div class="profile_order_info_cell_title">شماره تماس</div>
                        <div class="profile_order_info_cell_value">{{$order->getAddress->mobile}}</div>
                    </div>
                </div>

                <div class="profile_order_info_row">
                    <div class="profile_order_info_cell">
                        <div class="profile_order_info_cell_title">تعداد مرسوله</div>
                        <div class="profile_order_info_cell_value">{{sizeof($order->getOrderInfo)}}</div>
                    </div>
                    <div class="profile_order_info_cell">
                        <div class="profile_order_info_cell_title">کد سفارش</div>
                        <div class="profile_order_info_cell_value">{{$order->order_code}}</div>
                    </div>
                </div>
                <div class="profile_order_info_row">
                       <div class="profile_order_info_cell_full">
                           <div class="profile_order_info_cell_title">آدرس ارسال</div>
                           <div class="profile_order_info_cell_value">
                               {{$order->getAddress->province->name}}-{{$order->getAddress->city->name}}-{{$order->getAddress->post_address}}
                           </div>
                       </div>
                </div>
            </div>
        </div>

        <div class="o_box o_box_other">
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
                        </div>
                        <div class="profile_order_detail_row">
                            <div class="profile_order_info_cell_title">   مبلغ کل مرسوله :</div>
                            <div class="profile_order_info_cell_value">{{$totalPrice}}</div>
                        </div>
                        <div class="profile_order_detail_row">
                            <div class="profile_order_info_cell_title">  هزینه ارسال :</div>
                            <div class="profile_order_info_cell_value">{{$orderInfo['send_price']}}</div>
                        </div>
                       <div class="profile_order_detail_row">
                           <div class="profile_order_info_cell_title"> بازه تحویل :</div>
                           <div class="profile_order_info_cell_value">{{$orderInfo['delivery_order_interval']}}</div>
                       </div>
                    </div>
                    <div class="order_verify_shipment_content">
                        @foreach($orderProducts as $product)
                            <div class="profile_order_item_product">
                                <div class="profile_order_product_img">
                                    <a href="{{url('product/dgk-'.$product['getProduct']['id'].'/'.$product['getProduct']['product_url'])}}">
                                        <img src={{asset('files/products/'.$product['getProduct']['image_url'])}}>
                                        <div class="profile_order_product_count">
                                            <span class="price">{{$product['product_count']}}</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="profile_order_product_info">
                                    <h6 class="profile_order_product_title"> {{$product['getProduct']['title']}}</h6>
                                    <div class="order_detail_item color">
                                         <span class="profile_order_product_detail_color"
                                               style="background: {{$product['getColor']['code']}}"></span>
                                        <span> {{$product['getColor']['name']}}</span>
                                    </div>
                                    <div class="order_detail_item">
                                        <span> {{$product['getWarranty']['name']}}</span>
                                    </div>
                                    <div class="order_detail_item">
                                        <span>دیجی کالا</span>
                                    </div>
                                    <div class="order_detail_prices">
                                        <div class="order_detail_item">
                                            <div>
                                                <span>قیمت واحد: </span>
                                                <span class="price">{{number_format($product['product_price2'])}}</span>
                                                <span class="tooman">تومان</span>
                                            </div>
                                        </div>
                                        <div class=" order_detail_item ml-4">
                                            <div>
                                                <span>قیمت کل: </span>
                                                <span
                                                    class="price">{{number_format($product['product_price2']*$product['product_count'])}}</span>
                                                <span class="tooman">تومان</span>
                                            </div>
                                        </div>
                                        <div class=" order_detail_item ml-4">
                                            <div>
                                                <span>تخفیف: </span>
                                                <span
                                                    class="price digi_color_red">{{number_format($product['product_price1']-$product['product_price2'])}}</span>
                                                <span class="tooman">تومان</span>
                                            </div>
                                        </div>
                                        <div class=" order_detail_item ml-4">
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
                <?php $i++ ?>
            @endforeach
        </div>
    </div>

@endsection
