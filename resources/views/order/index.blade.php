@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت سفارش ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت سفارش ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/orders')}}">
                <div class="d-flex orders_filter_search">
                    <input type="text" name="order_code" class="form-control ml-1" autocomplete="off"
                           value="{{$request->order_code}}" placeholder="شماره سفارش">
                    <input type="text" name="start_date" id="pcal1" class="form-control ml-1 " autocomplete="off"
                           value="{{$request->start_date}}" placeholder="سفارش ها از تاریخ">
                    <input type="text" name="end_date" id="pcal2" class="form-control ml-1" autocomplete="off"
                           value="{{$request->end_date}}" placeholder="تا تاریخ">
                    <button class="btn digi_btn_blue ">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/products','title'=>'محصول'])
        </div>
        @include('order.order-list',['allowAction'=>true])
        {{$orders->links()}}
    </div>
@endsection

@section('scripts')
    <script src="{{asset('js/js-persian-cal.min.js')}}" type="text/javascript"></script>
    <script type="text/javascript">
        const pcal1 = new AMIB.persianCalendar('pcal1');
        const pcal2 = new AMIB.persianCalendar('pcal2');
    </script>
@endsection
@section('styles')
    <link href="{{asset('css/js-persian-cal.css')}}" rel="stylesheet" type="text/css"/>
@endsection
