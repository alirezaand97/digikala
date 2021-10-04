@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت تنوع قیمت ها','url'=>url('admin/product_warranties/?product_id='.$product->id)]],
   'current'=>['title'=>'افزودن تنوع قیمت']
   ])
    @include('includes.warning-message')

    <div class="pannel">
        <h3 class="admin_pages_title">تنوع قیمت جدید برای {{$product->title}}</h3>
        {!! Form::open(['url' => 'admin/product_warranties?product_id='.$product->id, 'files' => 'true']) !!}
        <div class="row">


            <div class="form-group col-sm-6">
                {!! Form::label('warranty_id','انتخاب گارانتی') !!}
                {!! Form::select('warranty_id',$warranties,null,['class'=>'selectpicker','data-live-search'=>'true']) !!}
                @if($errors->has('warranty_id'))
                    <span class="input_error">{{$errors->first('warranty_id')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('colors','رنگ ها') !!}
                <select class="selectpicker" data-live-search="true" name="color_id" id="colors">
                    @foreach($colors as $color)
                        <option
                            data-content="<span class='badge p-2' style='background:{{$color->getColor->code}}'>{{$color->getColor->name}}</span>"
                            value='{{$color->getColor->id}}'>{{$color->name}}</option>
                    @endforeach
                </select>

                @if($errors->has('colors'))
                    <span class="input_error">{{$errors->first('colors')}}</span>
                @endif
            </div>

            <div class="col-sm-6 form-group">
                {!! Form::label('title','قیمت محصول (تومان)') !!}
                {!! Form::text('price1',null,['class'=>'form-control price1']) !!}
                @if($errors->has('price1'))
                    <span class="input_error">{{$errors->first('price1')}}</span>
                @endif
            </div>


            <div class="col-sm-6 form-group">
                {!! Form::label('title','قیمت فروش محصول (تومان)') !!}
                {!! Form::text('price2',null,['class'=>'form-control price2']) !!}
                @if($errors->has('price2'))
                    <span class="input_error">{{$errors->first('price2')}}</span>
                @endif
            </div>


            <div class="col-sm-6 form-group">
                {!! Form::label('title','تعداد موجودی محصول ') !!}
                {!! Form::text('product_number',null,['class'=>'form-control product_number']) !!}
                @if($errors->has('product_number'))
                    <span class="input_error">{{$errors->first('product_number')}}</span>
                @endif
            </div>


            <div class="col-sm-6 form-group">
                {!! Form::label('title','تعداد مجاز سفارش مشتری') !!}
                {!! Form::text('product_number_cart',null,['class'=>'form-control product_number_cart']) !!}
                @if($errors->has('product_number_cart'))
                    <span class="input_error">{{$errors->first('product_number_cart')}}</span>
                @endif
            </div>

            <div class="col-sm-6 form-group">
                {!! Form::label('title','زمان آماده سازی محصول') !!}
                {!! Form::text('send_time',null,['class'=>'form-control send_time']) !!}
                @if($errors->has('send_time'))
                    <span class="input_error">{{$errors->first('send_time')}}</span>
                @endif
            </div>


            <div class="col-sm-12">
                <button class="btn digi_btn">ثبت اطلاعات</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection

@section('scripts')
    <script src="{{asset('js/cleave.min.js')}}" type="application/javascript"></script>
    <script type="application/javascript">
        var price1 = new Cleave('.price1', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var price2 = new Cleave('.price2', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var product_number = new Cleave('.product_number', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var product_number_cart = new Cleave('.product_number_cart', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        send_timevar = new Cleave('.send_time', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });

    </script>
@endsection
