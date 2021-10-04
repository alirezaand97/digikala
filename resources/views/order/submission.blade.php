@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>$title]
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">{{$title}}</h3>
        <div class="admin-header">
            <form action="{{url('admin/orders/submissions')}}">
                <div class="input-group">
                    <input type="text" name="submission_id" class="form-control search_inp" autocomplete="off" value="{{$request->submission_id}}" placeholder="شماره مرسوله">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>شماره مرسوله</th>
                        <th>تاریخ ثبت</th>
                        <th>تعداد کالا</th>
                        <th>وضعیت سفارش</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($submissions as $submission)
                        <?php
                        $jdf = new \App\Jdf();
                        $date = $jdf->jdate(' j F Y H:i',strtotime( $submission->created_at));
                        $sendStatuses = \App\Order::SEND_STATUSES;
                        ?>
                        <tr>
                            <td>{{$submission->id}}</td>
                            <td>{{$date}}</td>
                            <td>{{sizeof(explode('_',$submission->products_id))}}</td>
                            <td class="text-center">
                                <span class="btn status_span">{{$sendStatuses[$submission->send_status]}} </span>
                            </td>
                            <td>
                                <div class="table_action">
                                       <a href="{{url('admin/orders/submissions/'.$submission->id.'/info')}}"> <span
                                                data-feather="eye" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="مشاهده سفارش"></span></a>

                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($submissions)==0)
                        <tr>
                            <td colspan="8" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found"/>
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
        </div>
        {{$submissions->links()}}
    </div>
@endsection

@section('scripts')
    <script src="{{asset('js/js-persian-cal.min.js')}}" type="text/javascript"></script>
    <script type="text/javascript">
        const pcal1 = new AMIB.persianCalendar( 'pcal1' );
        const pcal2 = new AMIB.persianCalendar( 'pcal2' );
    </script>
@endsection
@section('styles')
    <link href="{{asset('css/js-persian-cal.css')}}" rel="stylesheet" type="text/css" />
@endsection
