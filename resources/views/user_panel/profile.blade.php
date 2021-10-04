@extends('layouts.user-profile')
@section('user-profile')
    <div class="profile_box">
        <div class="profile_box_title">اطلاعات شخصی</div>
        <div class="profile_box_table">
            <div class="profile_table_cell">
                <span class="profile_table_cell_title">نام و نام خانوادگی</span>
                <span
                    class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'first_name','last_name')}}</span>
            </div>
            <div class="profile_table_cell">
                <span class="profile_table_cell_title">پست الکترونیکی</span>
                <span class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'email')}}</span>
            </div>
            <div class="profile_table_cell">
                <span class="profile_table_cell_title">شماره تلفن همراه</span>
                <span class="profile_table_cell_content">{{auth()->user()->mobile}}</span>
            </div>
            <div class="profile_table_cell">
                <span class="profile_table_cell_title">کد ملی</span>
                <span
                    class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'national_identity_number')}}</span>
            </div>
            <div class="profile_table_cell">
                <span class="profile_table_cell_title">دریافت خبرنامه</span>
                <span class="profile_table_cell_content">{{getNewsletter($additionalInfos)}}</span>
            </div>
            <div class="profile_table_cell">
                <span class="profile_table_cell_title">شماره کارت</span>
                <span
                    class="profile_table_cell_content">{{getAdditionalItem($additionalInfos,'bank_card_number')}}</span>
            </div>
            <div class="edit_additional_info">
                <a href="{{url('user/profile/additional-info')}}" class="digi_dashed_link">ویرایش اطلاعات شخصی</a>
            </div>
        </div>
    </div>

    <div class="profile_box">
        <div class="profile_box_title">آخرین سفارش ها</div>
        <div class="profile_orders_table">
            <div class="profile_orders_table_header">
                <div class="profile_orders_table_row">
                    <div class="profile_orders_table_head_cell">#</div>
                    <div class="profile_orders_table_head_cell">شماره سفارش</div>
                    <div class="profile_orders_table_head_cell">تاریخ ثبت سفارش</div>
                    <div class="profile_orders_table_head_cell">مبلغ قابل پرداخت</div>
                    <div class="profile_orders_table_head_cell">مبلغ کل</div>
                    <div class="profile_orders_table_head_cell">عملیات پرداخت</div>
                    <div class="profile_orders_table_head_cell">جزییات</div>
                </div>
            </div>
            <div class="profile_orders_table_body">
                <?php ?>
                @php
                    $jdf=new \App\Jdf();
                     $i=1;
                    $payStatus=\App\Order::PAY_STATUS;
                @endphp
                @foreach($orders as $order)
                    <div class="profile_orders_table_row">
                        <div class="profile_orders_table_cell">{{$i}}</div>
                        <div class="profile_orders_table_cell">{{$order->order_code}}</div>
                        <div class="profile_orders_table_cell"> {{$jdf->jdate('j F Y',$order->created_at)}}</div>
                        <div class="profile_orders_table_cell profile_order_cell_dark">{{number_format($order->price)}} تومان</div>
                        <div class="profile_orders_table_cell profile_order_cell_dark">{{number_format($order->total_price)}} تومان</div>
                        <div class="profile_orders_table_cell">{{$payStatus[$order->pay_status]}}</div>
                        <div class="profile_orders_table_cell profile_orders_see_info">
                            <a href="{{url('user/profile/orders/'.$order->id)}}">
                                <span class="fa fa-angle-left"></span>
                            </a>
                        </div>
                    </div>
                    @php
                        $i++;
                    @endphp
                @endforeach
                <a href="{{url('user/profile/orders')}}" class="show_orders_list">مشاهده لیست سفارش ها</a>
            </div>
        </div>
    </div>

@endsection
