@extends('layouts/admin')
@section('content')

    @include('includes.breadcrumb',['data'=>[
   ['title'=>'مدیریت سفارش ها','url'=>url('admin/orders')],
   ['title'=>'مرجوع کردن کالا','url'=>url('admin/orders/return-product/'.$orderProduct->order_id)],
   ]])

    <div class="pannel">
        <h3 class="admin_pages_title">مرجوع کردن کالا</h3>
        <div class="return_product">
            {!! Form::open(['url' => 'admin/orders/return-product/'.$orderProduct->id]) !!}
            <div class="cart_item position-relative">
                <div class="cart_p_image">
                    <a>
                        <img
                            src={{asset('files/products/'.$orderProduct->getProduct->image_url)}}>
                    </a>

                </div>
                <div class="cart_p_content">
                    <h6> {{$orderProduct->getProduct->title}}</h6>

                    <div class="cart_p_detail color">
                        <span> {{$orderProduct->getColor->name}}</span>
                        <span class="color_circle"
                              style="background: {{$orderProduct->getColor->code}}"></span>
                    </div>
                    <div class="cart_p_detail">
                        شماره سفارش:
                        <span> {{$orderProduct->getOrder->order_code}}</span>
                    </div>
                    <div class="cart_p_detail">
                        <span> {{$orderProduct->getWarranty->name}}</span>
                    </div>
                    <div class="cart_p_detail">
                        <span>دیجی کالا</span>
                    </div>
                    <div class="d-flex">
                        <div class=" cart_p_detail ml-4">
                            <div>
                                <span>قیمت کل: </span>
                                <span
                                    class="price">{{number_format($orderProduct->product_price2*$orderProduct->product_count)}}</span>
                                <span class="tooman">تومان</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="form-group col-sm-6">
                    {!! Form::label('stockroom_id','انتقال به انبار') !!}
                    {!! Form::select('stockroom_id',$stockrooms,null,['class'=>'selectpicker','data-live-search'=>'true']) !!}
                </div>

                <div class="form-group col-sm-6">
                    {!! Form::label('count','تعداد کالای مرجوعی') !!}
                    <select name="count" id="count" class="selectpicker">
                        @for($i=1;$i<=$orderProduct->product_count;$i++)
                            <option value="{{$i}}">{{$i}}</option>
                        @endfor
                    </select>
                </div>

                <div class="form-group col-sm-6">
                    {!! Form::label('description','توضیحات مرجوعی ') !!}
                    {!! Form::textArea('description',null,['class'=>'form-control admin_textarea']) !!}
                    @if($errors->has('description'))
                        <span class="input_error">{{$errors->first('description')}}</span>
                    @endif
                </div>
            </div>
            <div>
                <button class="btn digi_btn">ثبت کالای مرجوعی</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection

