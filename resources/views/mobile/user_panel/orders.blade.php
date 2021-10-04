@extends('layouts.mobile-shop')
@section('content')
    @php $jdf=new \App\Jdf(); @endphp
    <div class="o_page">
        <div class="o_box">
            <div class="o_box_header">
               <a href="{{url('user/profile')}}" class="inherit_color">
                   <span data-feather="arrow-right" class="back_icon"></span>
               </a>
                <span>سفارشات من</span>
            </div>
            <div class="o_box_content">
                @foreach($orders as $order)
                    <div class="profile_order_item">
                        <div class="profile_order_header">
                            <div class="profile_order_title">
                                <span>{{$order->order_code}}</span>
                                <span>{{number_format($order->price)}}<span class="tooman">تومان</span></span>
                            </div>
                            <div class="profile_order_date">
                                {{$jdf->jdate('j F Y',$order->created_at)}}
                            </div>
                        </div>
                       <div class="flex_box">
                           <div class="profile_order_products">
                               @foreach($order->getOrderProductsWithProducts as $product)
                                   <a href="{{url('product/dgk-'.$product->getProduct->id.'/'.$product->getProduct->product_url)}}">
                                       <img src="{{asset('files/products/'.$product->getProduct->image_url)}}">
                                   </a>
                               @endforeach
                           </div>
                           <a href="{{url('user/profile/orders/'.$order->id)}}" class="inherit_color">
                               <span class="fa fa-angle-left"></span>
                           </a>
                       </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection
