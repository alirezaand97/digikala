<?php
$style = [
    "body" => "
        direction: rtl !important;
        padding: 50px;
        color: #424750;
        background-color: #fff;
        font-family: Tahoma;
    ",
    "product" => "
       text-align:center;
        padding: 16px 32px;
        margin: 10px auto;
        border-radius: 3px;
        background: #fff;
        border: 1px solid #eee;
    ",

    "buy_btn" => "
       background: #ef394e;
        border: #ef394e;
         color: #fff;
         border-radius: 8px;
        padding: 12px 17px;
        text-align: center;
        text-decoration: none;
        margin: 20px 0;

    ",


    "email_title" => "
        font-size: .9rem;
        position: relative;
        padding: 8px 12px;
        display: inline-block;
        margin-bottom: 8px;
    ",
    "product_price" => "
        font-weight: 700;
        font-size: 1.25rem;
        margin: 8px 0;
    ",
    "product_name" => "
       margin: 8px 0;
    ",
    "digi_logo" => "
       display: block;
    text-align: center;
    margin: 12px 0;
    ",
    "product_img" => "
        width: 180px;
        height: 180px;
    ",
    "email_container" => "
        max-width: 80%;
        margin: auto;

    "

]
?>
<div style="{{$style['body']}}">

    <div style="{{$style['email_container']}}">
        <a style="{{$style['digi_logo']}}" href="{{url('/')}}">
            <img src="{{asset('images/logo.svg')}}">
        </a>
        <p><b>پیشنهاد کالا</b></p>
        <span style="{{$style['email_title']}}">با سلام. دوست شما این محصول از دیجی کالا را به شما پیشنهاد می کند</span>
        <div style="{{$style['product']}}">
            <img style="{{$style['product_img']}}" src="{{asset('files/thumbnails/'.$product->image_url)}}">
            <div style="{{$style['product_name']}}">{{$product->title}}</div>
            <div style="{{$style['product_price']}}">
                {{number_format($product->price)}}
                <span>تومان</span>
            </div>
            <a style="{{$style['buy_btn']}}" href="{{url('product/dgk-'.$product->id.'/'.$product->product_url)}}">
                مشاهده و خرید
                محصول</a>
        </div>
    </div>
</div>


