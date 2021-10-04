<?php
$style = [
    "container" => "
        direction: rtl !important;
        padding: 50px;
        color: #000 !important;
        background-color: #fff;
        font-family: Tahoma;
    ",
    "table" => "
    width:100% ",
    "td" => "
    padding:8px;
    font-size:.9rem
    ",
    "item" => "
    overflow-x: auto;
    width: 100%;
    padding: 16px 8px;
    margin-bottom: 25px;
    border-bottom: 1px solid #eee;
    color: #000;
    font-size: .9rem;
    ",
    "image" => "
    display:block;
    width:220px;
    height:200px
    "


]
?>
<div style="{{$style['container']}}">
    <div>
        <?php
        $jdf = new \App\Jdf();
        $orderDate = $jdf->jdate(' j F Y', $order->created_at)
        ?>
        <div>
            <div>
                <h6>جزییات سفارش</h6>
                <table style="{{$style['table']}}">
                    <tr>
                        <td style="{{$style['td']}}">
                            تاریخ :
                            <div>   {{$orderDate}}</div>
                        </td>
                        <td style="{{$style['td']}}">
                            شماره :
                            <div>{{$order->order_code}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td style="{{$style['td']}}">
                            تحویل گیرنده :
                            <div>{{$order->getAddress->name}}</div>
                        </td>
                        <td style="{{$style['td']}}">
                            مبلغ کل :
                            <div>{{$order->total_price}} <span>تومان</span></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="{{$style['td']}}">
                            شماره تماس :
                            <div>{{$order->getAddress->mobile}}</div>
                        </td>
                        <td style="{{$style['td']}}">
                            آدرس :
                            <div>{{$order->getAddress->province->name}}
                                -{{$order->getAddress->city->name}}-{{$order->getAddress->post_address}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td style="{{$style['td']}}">
                            @if($order->discount_value)
                                کارت هدیه :
                                <div>{{$order->discount_value}} <span>تومان</span></div>
                            @endif
                        </td>
                        <td style="{{$style['td']}}">
                            @if($order->gift_value)
                                کارت هدیه :
                                <div>{{$order->gift_value}} <span>تومان</span></div>
                            @endif
                        </td>
                    </tr>
                </table>

            </div>
            <div>
                <?php $i = 1; ?>
                @foreach($order->getOrderInfo as $orderInfo)
                    <?php
                    $data = get_shipment_price($order['getOrderProducts'], $orderInfo);
                    $totalPrice = $data['total_price'];
                    $orderProducts = $data['products'];
                    ?>
                    <div>
                        <div>
                            <div>مرسوله {{ $i }} از {{sizeof($order->getOrderInfo)}} ارسال
                                با
                                پست اختصاصی دیجی کالا
                            </div>
                            <div>
                                بازه تحویل :
                                <span>{{$orderInfo['delivery_order_interval']}}</span>
                            </div>
                            <div>
                                <div>
                                    مبلغ کل مرسوله :
                                    <span>{{$totalPrice}}</span>
                                </div>
                                <div>
                                    هزینه ارسال :
                                    <span>{{$orderInfo['send_price']}}</span>
                                </div>

                            </div>
                        </div>
                        <div>
                            @foreach($orderProducts as $product)
                                <div style="{{$style['item']}}">
                                    <div>
                                        <a>
                                            <img style="{{$style['image']}}"
                                                 src={{asset('files/products/'.$product['getProduct']['image_url'])}}>
                                        </a>
                                    </div>
                                    <div>
                                        {{$product['getProduct']['title']}}
                                    </div>
                                    <div>
                                        <span> {{$product['getColor']['name']}}</span>
                                        <span
                                            style="background: {{$product['getColor']['code']}}"></span>
                                    </div>
                                    <div>
                                        <span> {{$product['getWarranty']['name']}}</span>
                                    </div>
                                    <div>
                                        <span>دیجی کالا</span>
                                    </div>

                                    <div>
                                        <span>تعداد: </span>
                                        <span>{{$product['product_count']}}</span>
                                    </div>
                                    <div>
                                        <span>قیمت واحد: </span>
                                        <span>{{$product['product_price2']}}</span>
                                        <span>تومان</span>
                                    </div>
                                    <div>
                                        <span>قیمت کل: </span>
                                        <span
                                        >{{$product['product_price2']*$product['product_count']}}</span>
                                        <span>تومان</span>
                                    </div>
                                    <div>
                                        <span>تخفیف: </span>
                                        <span>{{$product['getProduct']['discount_price']}}</span>
                                        <span>تومان</span>
                                    </div>
                                    <div>
                                        <span>قیمت نهایی: </span>
                                        <span>
                              {{($product['product_price2']*$product['product_count'])-($product['getProduct']['discount_price']*$product['product_count'])}}</span>
                                        <span>تومان</span>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
