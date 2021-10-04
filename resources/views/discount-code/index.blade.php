@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت کد تخفیف ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت کد های تخفیف </h3>
        <div class="admin-header">
            <form action="{{url('admin/discount-codes')}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>
            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/discount-codes','title'=>'کد تخفیف'])

        </div>
        <div
            class="table-responsive-xl   table-responsive-lg table-responsive-md table-responsive-sm table-responsive ">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>کد تخفیف</th>
                        <th>دسته بندی تخفیف</th>
                        <th>مبلغ تخفیف</th>
                        <th>تاریخ اعتبار</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($discounts as $discount)
                        <?php
                        $jdf = new \App\Jdf();
                        $date = $jdf->jdate('j F y', $discount->expire_time);
                        ?>
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$discount->id}}'/></td>
                            <td>{{$discount->id}}</td>
                            <td>{{$discount->code}}</td>
                            <td>{{$discount->getCategory->name}}</td>
                            <td class="price">
                                @if($discount->discount_value)
                                    {{number_format($discount->discount_value)}} <span class="tooman">تومان</span>
                                @else
                                    {{$discount->discount_percent}} <span class="tooman">درصد</span>
                                @endif
                            </td>
                            <td>{{$date}}</td>
                            <td>
                                <div class="table_action">
                                    @if(!$discount->trashed())
                                        <a href="{{url('admin/discount-codes/'.$discount->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش کد تخفیف"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف کد تخفیف"
                                          onclick="del_confirm('{{url('admin/discount-codes/'.$discount->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این کد تخفیف مطمئن هستید؟' )"
                                    ></span>
                                    @if($discount->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی کد تخفیف"
                                              onclick="restore_item('{{url('admin/discount-codes/restore/'.$discount->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این کد تخفیف مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($discounts)==0)
                        <tr>
                            <td colspan="9" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found"/>
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </form>
        </div>
        {{$discounts->links()}}
    </div>
@endsection
