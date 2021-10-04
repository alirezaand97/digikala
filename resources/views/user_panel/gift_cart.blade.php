@extends('layouts.user-profile')
@section('user-profile')
    <div class="user_profile_content">
        <div class="user_profile_tab_title">
            <span> کارت های هدیه</span>
        </div>
        @if(sizeof($gifts)>0)
            <ul class="user_profile_gift_list">
                @foreach($gifts as $gift)
                    <?php
                    $jdf = new \App\Jdf();
                    $date = $jdf->jdate('j F y', strtotime($gift->created_at))
                    ?>
                    <li>
                        <div class="user_profile_gift_item">
                            <div class="user_profile_gift_image">
                                <a href="{{url('product/dgk-'.$gift->getProduct->id.'/'.$gift->getProduct->product_url)}}">
                                    <img src="{{asset('files/products/'.$gift->getProduct->image_url)}}"/>
                                </a>
                            </div>
                            <div class="user_profile_gift_item_content">
                                <div>
                                    <ul class="gift_cart_code_list">
                                        <li>
                                            {{$gift->code}}
                                        </li>
                                        <li>
                                            {{$date}}
                                        </li>
                                    </ul>
                                    <div>
                                        <a class="gift_cart_title"
                                           href="{{url('product/dgk-'.$gift->getProduct->id.'/'.$gift->getProduct->product_url)}}">
                                            <span>{{$gift->getProduct->title}}</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="gift_cart_info_list">
                                    <div class="gift_cart_info_list_item">
                                        <span class="gift_cart_info_title">اعتبار:</span>
                                        {{number_format($gift->cart_credit)}}
                                    </div>
                                    <div class="gift_cart_info_list_item">
                                        <span class="gift_cart_info_title"> مصرف شده:</span>
                                        {{number_format($gift->credit_used)}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                @endforeach
            </ul>
        @else
            <div class="empty_section">
                <img src="{{asset('images/no-gift.svg')}}">
                <p>کارت هدیه ای موجود نمی باشد</p>
            </div>
        @endif
    </div>

@endsection
