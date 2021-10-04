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
@php
    $jdf=new \App\Jdf();
    $date = $jdf->jdate('d F Y', $stockroomEvent->time);
     $time = $jdf->jdate('H:i:s', $stockroomEvent->time);
@endphp
<div class="container factor_container">
    <div class="factor_header">
        <div class="factor_header_info">
            <p>
                تاریخ :
                <span>   {{$date}} - {{$time}} </span>
            </p>
            <p>
                شماره فاکتور : {{$stockroomEvent->id}}
            </p>
            <p>
                تعداد محصول : {{sizeof($eventProducts)}}
            </p>
        </div>
        <div class="factor_title">
            @if($stockroomEvent->type=='input')
                ورود کالا به  {{$stockroomEvent->getStockroom->name}}
            @else
                خروج کالا از  {{$stockroomEvent->getStockroom->name}}
            @endif
        </div>
        <div class="shop_logo">
            <img src="{{asset(env('SHOP_LOGO'))}}">
        </div>
    </div>
    <div class="factor_content">
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>تصویر محصول</th>
                        <th>عنوان محصول</th>
                        <th>فروشنده</th>
                        <th>گارانتی</th>
                        <th>رنگ</th>
                        <th>تعداد</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($eventProducts as $eProduct)
                        <tr>
                            <td>{{$eProduct->id}}</td>
                            <td class="item_image_container">
                                <img
                                    src="{{url('files/thumbnails/'.$eProduct->getProductWarranty->getProduct->image_url)}}"
                                    class="table_item_image"/>
                            </td>
                            <td>{{$eProduct->getProductWarranty->getProduct->title}}</td>
                            <td>{{$eProduct->getProductWarranty->getSeller->brand_name}}</td>
                            <td>{{$eProduct->getProductWarranty->getWarranty->name}}</td>
                            <td class="text-center">
                                <span class="color_show"
                                      style="background:{{$eProduct->getProductWarranty->getColor->code}}">{{$eProduct->getProductWarranty->getColor->name}}</span>
                            </td>
                            <td>{{$eProduct->product_count}}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
        </div>
    </div>
    <div class="factor_person">
       <div class="factor_person_box">
           <span>کالاهای فوق توسط {{$stockroomEvent->getUser->name}}</span>
           @if($stockroomEvent->type=='input')
               به انبار وارد شده است
           @else
               از انبار خارج شده است
           @endif
       </div>
    </div>
    <div class="factor_signature">
        <span>مهر و امضای تحویل دهنده</span>
        <span>مهر و امضای تحویل گیرنده</span>
    </div>

    <span class="print_factor" onclick="window.print()">
        <span class="fa fa-print"></span>
        پرینت فاکتور
    </span>
</div>
</body>
</html>
