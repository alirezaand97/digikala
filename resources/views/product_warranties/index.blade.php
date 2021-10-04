@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت تنوع قیمت ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت تنوع قیمت ها برای {{$product->title}}</h3>
        <div class="admin-header">
            <form action="{{url('admin/product_warranties?product_id='.$product->id)}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'queryString'=>$queryString,'url'=>'admin/product_warranties','title'=>'تنوع قیمت'])
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
                        <th>نام گارانتی</th>
                        <th>قیمت محصول</th>
                        <th>قیمت محصول برای فروش</th>
                        <th>تعداد موجودی محصول</th>
                        <th>رنگ</th>
                        <th>فروشنده</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($product_warranties as $product_warranty)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$product_warranty->id}}'/></td>
                            <td>{{$product_warranty->id}}</td>
                            <td class="td_150">{{$product_warranty->getWarranty->name}}</td>
                            <td class=" td_150 previous_price price">{{number_format($product_warranty->price1)}} <span class="tooman">تومان</span>
                            </td>
                            <td class="td_150 digi_color_red price">{{number_format($product_warranty->price2)}} <span class="tooman">تومان</span>
                            </td>
                            <td>{{$product_warranty->product_number}}</td>
                            <td class="text-center">
                                <span class="color_show"
                                      style="background:{{$product_warranty->getColor->code}}">{{$product_warranty->getColor->name}}</span>
                            </td>
                            <td class="td_150">دیجی کالا</td>
                            <td>
                                <div class="table_action">
                                    @if(!$product_warranty->trashed())
                                        <a href="{{url('admin/product_warranties/'.$product_warranty->id.'/edit?product_id='.$product->id)}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش تنوع قیمت"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف تنوع قیمت"
                                          onclick="del_confirm('{{url('admin/product_warranties/'.$product_warranty->id.'?product_id='.$product->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این تنوع قیمت مطمئن هستید؟' )"
                                    ></span>
                                    @if($product_warranty->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی تنوع قیمت"
                                              onclick="restore_item('{{url('admin/product_warranties/restore/'.$product_warranty->id.'?product_id='.$product->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این تنوع قیمت مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($product_warranties)==0)
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
        {{$product_warranties->links()}}
    </div>
@endsection
