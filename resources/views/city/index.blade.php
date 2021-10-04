@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت استان ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت استان ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/cities')}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>
            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/cities','title'=>'استان'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>نام شهر</th>
                        <th>استان</th>
                        <th>زمان حدودی ارسال سفارش</th>
                        <th>هزینه حدودی ارسال سفارش</th>
                        <th>حداقل مبلغ خرید برای ارسال رایگان</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($cities as $city)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$city->id}}'/></td>
                            <td>{{$city->id}}</td>
                            <td>{{$city->name}}</td>
                            <td>{{$city->getProvince->name}}</td>
                            <td>{{$city->send_time}}</td>
                            <td>{{$city->send_price}}</td>
                            <td>{{$city->min_order_price}}</td>
                            <td>
                                <div class="table_action">
                                    @if(!$city->trashed())
                                        <a href="{{url('admin/cities/'.$city->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش استان"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف استان"
                                          onclick="del_confirm('{{url('admin/cities/'.$city->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این استان مطمئن هستید؟' )"
                                    ></span>
                                    @if($city->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی استان"
                                              onclick="restore_item('{{url('admin/cities/restore/'.$city->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این استان مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($cities)==0)
                        <tr>
                            <td colspan="8" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found" />
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </form>
        </div>
        {{$cities->links()}}
    </div>
@endsection
