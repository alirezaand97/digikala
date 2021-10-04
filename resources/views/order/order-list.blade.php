<div class="table-responsive-md table-responsive-lg table-responsive-sm">
    <form method="post" id="data_form_group_select">
        @csrf
        <table class="table table-bordered  table-hover">
            <thead>
            <tr>
                @if($allowAction)
                    <th>#</th>
                @endif
                <th>ردیف</th>
                <th>شماره سفارش</th>
                <th>زمان ثبت</th>
                <th>مبلغ سفارش</th>
                <th>وضعیت سفارش</th>
                @if($allowAction)
                    <th>عملیات</th>
                @endif
            </tr>
            </thead>
            <tbody>
            @foreach($orders as $order)
                <?php
                $jdf = new \App\Jdf();
                $date = $jdf->jdate(' j F Y H:i', $order->created_at);
                $status_color = \App\Order::PAY_STATUS_COLOR;
                $status_text = \App\Order::PAY_STATUS;
                ?>
                <tr>
                    @if($allowAction)
                        <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                   value='{{$order->id}}'/></td>
                    @endif
                    <td>{{$order->id}}</td>
                    <td>{{$order->order_code}}</td>
                    <td>{{$date}}</td>
                    <td class="price digi_color_red">{{number_format($order->price)}}<span
                            class="tooman">تومان</span>
                    </td>
                    <td class="text-center">
                        <span
                            class="btn btn-{{$status_color[$order->pay_status]}}  status_span">{{$status_text[$order->pay_status]}} </span>
                    </td>
                    @if($allowAction)
                        <td>
                            <div class="table_action">
                                @if(!$order->trashed())
                                    <a href="{{url('admin/orders/'.$order->id.'/show')}}"> <span
                                            data-feather="eye" class="feather" data-toggle="tooltip"
                                            data-placement="top"
                                            title="مشاهده سفارش"></span></a>
                                @endif
                                <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                      data-placement="top"
                                      title="حذف سفارش"
                                      onclick="del_confirm('{{url('admin/orders/'.$order->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این سفارش مطمئن هستید؟' )"
                                ></span>
                                @if($order->trashed())
                                    <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                          data-placement="top"
                                          title="بازنشانی سفارش"
                                          onclick="restore_item('{{url('admin/orders/restore/'.$order->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این سفارش مطمئن هستید؟' )"
                                    ></span>
                                @endif
                            </div>
                        </td>
                    @endif

                </tr>
            @endforeach
            @if(count($orders)==0)
                <tr>
                    <td colspan="8" class="text-center">
                        <img src="{{asset('images\no-item-found.png')}}" class="table_not_found"/>
                        <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                    </td>
                </tr>
            @endif
            </tbody>
        </table>
    </form>
</div>
