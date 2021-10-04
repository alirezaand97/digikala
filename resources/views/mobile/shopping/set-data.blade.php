@extends('layouts.mobile-order')

@section('content')
    <div class="order_container">
        <div class="order_header">
            <div class="header_center">
                <a href="/"><img src="{{asset('images/logo.svg')}}"></a>
                <ul class="steps">
                    <li>
                        <a>
                            <div class="step active" data-step="اطلاعات ارسال"></div>
                        </a>
                    </li>
                    <li>
                        <a>
                            <div class="step" data-step="پرداخت"></div>
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
        <form action="{{url('/payment')}}" method="post" id="go_to_payment">
            @csrf
            <input type="hidden" id="is_normal_send" name="is_normal_send">
            <input type="hidden" id="address_id" name="address_id">
        </form>
        <mobile-shopping  :address_list="{{json_encode($address_list)}}"></mobile-shopping>
    </div>

@endsection

