@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت شهر ها','url'=>url('admin/cities')]],
   'current'=>['title'=>'افزودن شهر']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">شهر جدید</h3>
        {!! Form::model($city,['url' => 'admin/cities/'.$city->id, 'files' => 'true']) !!}
        {{method_field('PUT')}}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('name','نام شهر ') !!}
                {!! Form::text('name',null,['class'=>'form-control']) !!}
                @if($errors->has('name'))
                    <span class="input_error">{{$errors->first('name')}}</span>
                @endif
            </div>
            <div class="form-group col-sm-6">
                {!! Form::label('province_id','استان') !!}
                {!! Form::select('province_id',$provinces,null,['class'=>'selectpicker','data-live-search'=>'true']) !!}
                @if($errors->has('province_id'))
                    <span class="input_error">{{$errors->first('province_id')}}</span>
                @endif
            </div>
            <div class="form-group col-sm-6">
                {!! Form::label('send_time','زمان حدودی ارسال سفارش') !!}
                {!! Form::text('send_time',null,['class'=>'form-control']) !!}
                @if($errors->has('send_time'))
                    <span class="input_error">{{$errors->first('send_time')}}</span>
                @endif
            </div>
            <div class="form-group col-sm-6">
                {!! Form::label('send_price','هزینه حدودی ارسال سفارش') !!}
                {!! Form::text('send_price',null,['class'=>'form-control']) !!}
                @if($errors->has('send_price'))
                    <span class="input_error">{{$errors->first('send_price')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('min_order_price','حداقل مبلغ خرید برای ارسال رایگان') !!}
                {!! Form::text('min_order_price',null,['class'=>'form-control']) !!}
                @if($errors->has('min_order_price'))
                    <span class="input_error">{{$errors->first('min_order_price')}}</span>
                @endif
            </div>

            <div class="col-sm-12">
                <button class="btn digi_btn">ثبت شهر</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection
