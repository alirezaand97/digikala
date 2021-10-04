@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت انبار ها','url'=>url('admin/stockrooms')]],
   'current'=>['title'=>'افزودن انبار']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">انبار جدید</h3>
        {!! Form::open(['url' => 'admin/stockrooms']) !!}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('name','نام انبار ') !!}
                {!! Form::text('name',null,['class'=>'form-control']) !!}
                @if($errors->has('name'))
                    <span class="input_error">{{$errors->first('name')}}</span>
                @endif

            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('description','توضیحات انبار ') !!}
                {!! Form::textArea('description',null,['class'=>'form-control admin_textarea']) !!}
                @if($errors->has('description'))
                    <span class="input_error">{{$errors->first('description')}}</span>
                @endif
            </div>

            <div class="col-sm-12">
                <button class="btn digi_btn">ثبت انبار</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection
