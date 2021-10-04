@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'خروجی های انبار']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">خروجی های انبار </h3>
        <div class="admin-header">
            <form action="{{url('admin/stockrooms/output/events')}}">
                <div class="d-flex">
                    <select name="stockroom_id" class="selectpicker">
                        @foreach($stockrooms as $key=>$value)
                            <option value="{{$key}}" @if($key==$request->get('stockroom_id','')) selected="selected"@endif>{{$value}}</option>
                        @endforeach
                    </select>
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>نام انبار</th>
                        <th>اضافه شده توسط</th>
                        <th>تعداد محصول اضافه شده</th>
                        <th>زمان ثبت</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($events as $event)
                        <?php
                        $jdf = new \App\Jdf();
                        $date = $jdf->jdate('d F Y', $event->time);
                        $time = $jdf->jdate('H:i:s', $event->time);
                        ?>
                        <tr>
                            <td>{{$event->id}}</td>
                            <td>{{$event->getStockroom->name}}</td>
                            <td>{{$event->getUser->name?$event->getUser->name:'دیجی کالا'}}</td>
                            <td class="text-center">{{$event->product_count}}</td>
                            <td>
                                <span>{{$date}}</span>-
                                <span>{{$time}}</span>
                            </td>
                            <td class="text-center"><a href="{{url('admin/stockrooms/output/events/'.$event->id)}}"><span data-feather="eye"></span></a></td>
                        </tr>
                    @endforeach
                    @if(count($events)==0)
                        <tr>
                            <td colspan="7" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found"/>
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </form>
        </div>
        {{$events->links()}}
    </div>
@endsection
