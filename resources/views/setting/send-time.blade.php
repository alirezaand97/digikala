@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'زمان ارسال','url'=>url('admin/setting/send-time')]],
   'current'=>['title'=>'تغییر زمان ارسال']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">زمان ارسال جدید</h3>
        {!! Form::open(['url' => '/admin/setting/send-time', 'files' => 'true']) !!}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('send_time','زمان حدودی ارسال سفارش') !!}
                {!! Form::text('send_time',$data['send_time'],['class'=>'form-control']) !!}
                @if($errors->has('send_time'))
                    <span class="input_error">{{$errors->first('send_time')}}</span>
                @endif
            </div>
            <div class="form-group col-sm-6">
                {!! Form::label('send_price','هزینه حدودی ارسال سفارش ') !!}
                {!! Form::text('send_price',$data['send_price'],['class'=>'form-control']) !!}
                @if($errors->has('send_price'))
                    <span class="input_error">{{$errors->first('send_price')}}</span>
                @endif
            </div>
            <div class="form-group col-sm-6">
                {!! Form::label('min_order_price','حداقل مبلغ خرید برای ارسال رایگان') !!}
                {!! Form::text('min_order_price',$data['min_order_price'],['class'=>'form-control']) !!}
                @if($errors->has('min_order_price'))
                    <span class="input_error">{{$errors->first('min_order_price')}}</span>
                @endif
            </div>

            <div class="col-sm-12">
                <button class="btn digi_btn">ثبت زمان ارسال</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection
