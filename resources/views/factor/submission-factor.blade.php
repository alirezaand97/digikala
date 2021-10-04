<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>فاکتور</title>
    @yield('styles')

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">
</head>
<body class="factor_body">
<?php
$jdf = new \App\Jdf();
$orderInfoDate = $jdf->jdate(' j F Y', strtotime($orderInfo->created_at));
?>
<div class="container factor_container">
    <div class="factor_header">
        <div class="factor_header_info">
            <p>
                تاریخ :
                <span>   {{$orderInfoDate}}</span>
            </p>
            <p>
                شماره سفارش : {{$orderInfo->getOrder->order_code}}
            </p>
            <p>
                شماره مرسوله : {{$orderInfo->id}}
            </p>
            <p>
                مبلغ کل سفارش :
                <span class="order_list_item_text">
                            {{number_format($orderInfo->getOrder->total_price)}} <span class="tooman">تومان</span>
                </span>
            </p>
        </div>
        <div class="factor_title">
            فاکتور مرسوله
        </div>
        <div class="shop_logo">
            <img src="{{asset(env('SHOP_LOGO'))}}">
        </div>
    </div>
    <div class="factor_content">
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">

            <table class="table table-bordered  table-hover order_factor_table">
                <tr>
                    <td>
                        <p>تحویل گیرنده</p>
                        <span>{{$orderInfo->getOrder->getAddress->name}}</span>
                    </td>
                    <td>
                        <p>شماره تماس تحویل گیرنده</p>
                        <span>{{$orderInfo->getOrder->getAddress->mobile}}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>آدرس تحویل گیرنده</p>
                        <span>{{$orderInfo->getOrder->getAddress->province->name}}-{{$orderInfo->getOrder->getAddress->city->name}}-{{$orderInfo->getOrder->getAddress->post_address}}</span>
                    </td>
                    <td>
                        <p>تعداد مرسوله</p>
                        <span></span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>مبلغ پرداخت شده</p>
                        <span>{{number_format($orderInfo->getOrder->total_price)}}  تومان</span>
                    </td>
                    <td>
                        <p>کل مبلغ</p>
                        <span>{{number_format($orderInfo->getOrder->price)}} تومان </span>
                    </td>
                </tr>
                @if($orderInfo->getOrder->gift_id)
                    <tr>
                        <td>
                            <p>کد کارت هدیه</p>
                            <span>{{$orderInfo->getOrder->gift_id}}</span>
                        </td>
                        <td>
                            <p>مبلغ کارت هدیه </p>
                            <span>{{$orderInfo->getOrder->gift_value}}</span>
                        </td>
                    </tr>
                @endif
                @if($orderInfo->getOrder->discount_code)
                    <tr>
                        <td>
                            <p>کد تخفیف</p>
                            <span>{{$orderInfo->getOrder->discount_code}}</span>
                        </td>
                        <td>
                            <p>مبلغ تخفیف </p>
                            <span>{{$orderInfo->getOrder->discount_value}}</span>
                        </td>
                    </tr>
                @endif
            </table>
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>تصویر محصول</th>
                        <th>عنوان محصول</th>
                        <th>قیمت واحد</th>
                        <th>قیمت کل</th>
                        <th>تخفیف</th>
                        <th>قیمت نهایی</th>
                    </tr>
                    </thead>
                    <tbody>
                   @php
                       $i=1;
                   @endphp
                    @foreach($orderInfo->getOrder->getOrderProducts as $product)
                        <tr>
                            <td>{{$i}}</td>
                            <td class="item_image_container"><img  class="table_item_image" src={{asset('files/products/'.$product['getProduct']['image_url'])}}></td>
                            <td>
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
                            </td>
                            <td>
                                <span class="price">{{number_format($product['product_price2'])}}</span>
                                <span class="tooman">تومان</span>
                            </td>
                            <td>
                                 <span
                                     class="price">{{number_format($product['product_price2']*$product['product_count'])}}</span>
                                <span class="tooman">تومان</span>
                            </td>
                            <td>
                                <span
                                    class="price digi_color_red">{{number_format($product['product_price1']-$product['product_price2'])}}</span>
                                <span class="tooman">تومان</span>
                            </td>
                            <td>
                                <span class="price">
                                                    {{number_format(($product['product_price2']*$product['product_count']))}}
                                                </span>
                                <span class="tooman">تومان</span>
                            </td>
                        </tr>
                        @php  $i++; @endphp
                    @endforeach
                    </tbody>
                </table>
            </form>
        </div>
    </div>

    <div class="factor_signature">

    </div>

    <span class="print_factor" onclick="window.print()">
        <span class="fa fa-print"></span>
        پرینت فاکتور
    </span>
</div>
</body>
</html>
