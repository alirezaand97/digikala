@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت محصولات']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت محصولات</h3>
        <div class="admin-header">
            <form action="{{url('admin/products')}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/products','title'=>'محصول'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-xl table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>عکس محصول</th>
                        <th>نام محصول</th>
                        <th>فروشنده</th>
                        <th>وضعیت محصول</th>
                        <th>عملیات</th>

                    </tr>
                    </thead>
                    <tbody>
                    @foreach($products as $product)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$product->id}}'/></td>
                            <td>{{$product->id}}</td>
                            <td class="item_image_container">
                                @if($product->image_url)
                                    <img src="{{url('files/thumbnails/'.$product->image_url)}}" class="table_item_image"/>
                                @endif
                            </td>
                            <td>{{$product->title}}</td>
                            <td>دیجی کالا</td>

                            @php
                                $status_color=\App\Product::PRODUCTS_STATUS_COLOR;
                                $status_text=\App\Product::PRODUCT_STATUS;
                            @endphp

                            <td class="text-center">
                                <span class="btn btn-{{$status_color[$product->status]}}  status_span">{{$status_text[$product->status]}} </span>
                            </td>

                            <td>
                                <div class="table_action">
                                    @if(!$product->trashed())
                                        <a href="{{url('admin/products/'.$product->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش محصول"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف محصول"
                                          onclick="del_confirm('{{url('admin/products/'.$product->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این محصول مطمئن هستید؟' )"
                                    ></span>
                                    @if($product->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی محصول"
                                              onclick="restore_item('{{url('admin/products/restore/'.$product->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این محصول مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($products)==0)
                        <tr>
                            <td colspan="7" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found" />
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </form>
        </div>
        {{$products->links()}}
    </div>
@endsection
