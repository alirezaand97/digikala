@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'ورودی های انبار','url'=>url('admin/stockrooms/input/events')]
    ], 'current'=>['title'=>'رویداد ورودی']])

    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">
           <p>
               محصولات موجود در {{$stockroom->name}}
           </p>

        </h3>
        <div class="admin-header">
            <form action="{{url('admin/stockrooms/'.$stockroom->id)}}">
                <div class="d-flex">
                    <input type="text" name="search" class="form-control search_inp" placeholder="نام محصول" value="{{$request->get('search')}}">
                    <select name="seller_id" class="selectpicker">
                        @foreach($sellers as $key=>$value)
                            <option value="{{$key}}" @if($request->get('seller_id')==$key) selected="selected" @endif>{{$value}}</option>
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
                        <th>تصویر محصول</th>
                        <th>عنوان محصول</th>
                        <th>فروشنده</th>
                        <th>گارانتی</th>
                        <th>رنگ</th>
                        <th>تعداد</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($inventoryLists as $inventory)
                        <tr>
                            <td>{{$inventory->id}}</td>
                            <td class="item_image_container">
                                <img
                                    src="{{url('files/thumbnails/'.$inventory->getProductWarranty->getProduct->image_url)}}"
                                    class="table_item_image"/>
                            </td>
                            <td>{{$inventory->getProductWarranty->getProduct->title}}</td>
                            <td>{{$inventory->getProductWarranty->getSeller->brand_name}}</td>
                            <td>{{$inventory->getProductWarranty->getWarranty->name}}</td>
                            <td class="text-center">
                                <span class="color_show"
                                      style="background:{{$inventory->getProductWarranty->getColor->code}}">{{$inventory->getProductWarranty->getColor->name}}</span>
                            </td>
                            <td>{{$inventory->product_count}}</td>
                        </tr>
                    @endforeach
                    @if(count($inventoryLists)==0)
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
        {{$inventoryLists->links()}}
    </div>
@endsection
