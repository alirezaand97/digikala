@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت کد تخفیف ها','url'=>url('admin/discount-codes')]],
   'current'=>['title'=>'ویرایش کد تخفیف']
   ])
    @include('includes.warning-message')

    <div class="pannel">
        <h3 class="admin_pages_title">ویرایش کد تخفیف جدید</h3>
        {!! Form::model($discount,['url' => 'admin/discount-codes/'.$discount->id]) !!}
        {{method_field('PUT')}}

        <div class="row">
            <div class="col-sm-6 form-group">
                {!! Form::label('code','کد تخفیف') !!}
                {!! Form::text('code',null,['class'=>'form-control']) !!}
                @if($errors->has('code'))
                    <span class="input_error">{{$errors->first('code')}}</span>
                @endif
            </div>

            <div class="col-sm-6 form-group">
                {!! Form::label('discount_value','مبلغ تخفیف') !!}
                {!! Form::text('discount_value',null,['class'=>'form-control discount_value']) !!}
                @if($errors->has('discount_value'))
                    <span class="input_error">{{$errors->first('discount_value')}}</span>
                @endif
            </div>

            <div class="col-sm-6 form-group">
                {!! Form::label('discount_percent','درصد تخفیف') !!}
                {!! Form::text('discount_percent',null,['class'=>'form-control discount_percent']) !!}
                @if($errors->has('discount_percent'))
                    <span class="input_error">{{$errors->first('discount_percent')}}</span>
                @endif
            </div>

            <div class="col-sm-6 form-group">
                {!! Form::label('min_order_price','حداقل مبلغ سفارش تا استفاده از تخفیف') !!}
                {!! Form::text('min_order_price',null,['class'=>'form-control min_order_price']) !!}
                @if($errors->has('min_order_price'))
                    <span class="input_error">{{$errors->first('min_order_price')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('category_id','دسته بندی') !!}
                {!! Form::select('category_id',$categories,null,['class'=>'selectpicker','data-live-search'=>'true']) !!}
                @if($errors->has('category_id'))
                    <span class="input_error">{{$errors->first('category_id')}}</span>
                @endif
            </div>

            <div class="col-sm-6 form-group">
                {!! Form::label('number_usable','تعداد دفعات مجاز استفاده از کد تخفیف') !!}
                {!! Form::text('number_usable',null,['class'=>'form-control number_usable']) !!}
                @if($errors->has('number_usable'))
                    <span class="input_error">{{$errors->first('number_usable')}}</span>
                @endif
            </div>

            <?php
            $jdf=new \App\Jdf();
            $discount->expire_time=$jdf->tr_num($jdf->jdate('Y/n/j',$discount->expire_time));
            ?>

            <div class="col-sm-6 form-group discount_expire_time">
                {!! Form::label('expire_time','زمان اعتبار کد تخفیف') !!}
                {!! Form::text('expire_time',null,['class'=>'form-control expire_time']) !!}
                @if($errors->has('expire_time'))
                    <span class="input_error">{{$errors->first('expire_time')}}</span>
                @endif
            </div>

            <div class="col-sm-6 form-group">
                <label>استفاده برای پیشنهادات شگفت انگیز</label>
                <input type="checkbox" name="incredible_offers_allowable" @if($discount->incredible_offers_allowable) checked @endif>
                @if($errors->has('incredible_offers_allowable'))
                    <span class="input_error">{{$errors->first('incredible_offers_allowable')}}</span>
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

    <script src="{{asset('js/js-persian-cal.min.js')}}" type="text/javascript"></script>
    <script type="text/javascript">
        const expire_time = new AMIB.persianCalendar( 'expire_time' );
    </script>

    <script src="{{asset('js/cleave.min.js')}}" type="application/javascript"></script>
    <script type="application/javascript">

        var min_order_price = new Cleave('.min_order_price', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var discount_value = new Cleave('.discount_value', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var discount_percent = new Cleave('.discount_percent', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var number_usable = new Cleave('.number_usable', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });

    </script>
@endsection
@section('styles')
    <link href="{{asset('css/js-persian-cal.css')}}" rel="stylesheet" type="text/css" />
@endsection
