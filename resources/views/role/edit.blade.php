@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت نقش کاربری ها','url'=>url('admin/roles')]],
   'current'=>['title'=>',ویرایش نقش کاربری']
   ])

    <div class="pannel">
        <h3 class="admin_pages_title">ویرایش نقش کاربری</h3>

        {!! Form::model($role,['url' => 'admin/roles/'.$role->id]) !!}
        {{method_field('PUT')}}
        <div class="row">

            <div class="form-group col-sm-6">
                {!! Form::label('name','نام نقش کاربری ') !!}
                {!! Form::text('name',null,['class'=>'form-control']) !!}
                @if($errors->has('name'))
                    <span class="input_error">{{$errors->first('name')}}</span>
                @endif
            </div>
        <div class="col-sm-12">
            <button class="btn btn-primary">ویرایش نقش کاربری</button>
        </div>
        {!! Form::close() !!}
    </div>
    </div>
@endsection
