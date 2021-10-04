@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت انبارها','url'=>url('admin/stockrooms')]],
   'current'=>['title'=>',ویرایش انبار']
   ])

    <div class="pannel">
        <h3 class="admin_pages_title">ویرایش انبار</h3>

        {!! Form::model($stockroom,['url' => 'admin/stockrooms/'.$stockroom->id]) !!}
        {{method_field('PUT')}}
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

        <div class="col-sm-6">
            <button class="btn btn-primary">ویرایش انبار</button>
        </div>
        {!! Form::close() !!}
    </div>
    </div>
@endsection
