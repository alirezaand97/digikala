@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'خروجی های انبار','url'=>url('admin/stockrooms/output/events')]
    ], 'current'=>['title'=>'رویداد خروجی']])

    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">
            <p>
                رویداد خروجی به {{$stockroomEvent->getStockroom->name}} توسط {{$stockroomEvent->getUser->name?$stockroomEvent->getUser->name:'دیجی کالا'}}
            </p>

        </h3>
        <div class="admin-header">
            <form action="{{url('admin/stockrooms/output/events/'.$stockroomEvent->id)}}">
                <div class="d-flex">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

            <a class="show_factor_btn" href="{{url('admin/stockrooms/output/events/'.$stockroomEvent->id.'/factor')}}">
                <span data-feather="clipboard"></span>
                مشاهده فاکتور
            </a>
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
                    @foreach($eventProducts as $eProduct)
                        <tr>
                            <td>{{$eProduct->id}}</td>
                            <td class="item_image_container">
                                <img
                                    src="{{url('files/thumbnails/'.$eProduct->getProductWarranty->getProduct->image_url)}}"
                                    class="table_item_image"/>
                            </td>
                            <td>{{$eProduct->getProductWarranty->getProduct->title}}</td>
                            <td>{{$eProduct->getProductWarranty->getSeller->brand_name}}</td>
                            <td>{{$eProduct->getProductWarranty->getWarranty->name}}</td>
                            <td class="text-center">
                                <span class="color_show"
                                      style="background:{{$eProduct->getProductWarranty->getColor->code}}">{{$eProduct->getProductWarranty->getColor->name}}</span>
                            </td>
                            <td>{{$eProduct->product_count}}</td>
                        </tr>
                    @endforeach
                    @if(count($eventProducts)==0)
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
    </div>
@endsection
