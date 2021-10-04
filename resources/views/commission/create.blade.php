@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت کمیسیون ها','url'=>url('admin/brands')]],
   'current'=>['title'=>'افزودن کمیسیون']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">کمیسیون جدید</h3>
        {!! Form::open(['url' => 'admin/commissions']) !!}
        @if(\Illuminate\Support\Facades\Session::get('error'))
            <div class="alert alert-warning">{{\Illuminate\Support\Facades\Session::get('error')}}</div>
        @endif
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('brand_id','برند') !!}
                {!! Form::select('brand_id',$brands,null,['class'=>'selectpicker','data-live-search'=>'true']) !!}
                @if($errors->has('brand_id'))
                    <span class="input_error">{{$errors->first('brand_id')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('category_id','دسته بندی') !!}
                {!! Form::select('category_id',$cats,null,['class'=>'selectpicker','data-live-search'=>'true']) !!}
                @if($errors->has('category_id'))
                    <span class="input_error">{{$errors->first('category_id')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('name','درصد') !!}
                {!! Form::text('percentage',null,['class'=>'form-control']) !!}
                @if($errors->has('percentage'))
                    <span class="input_error">{{$errors->first('percentage')}}</span>
                @endif
            </div>

            <div class="col-sm-12">
                <button class="btn digi_btn">ثبت کمیسیون</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection
