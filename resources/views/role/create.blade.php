@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت نقش کاربری ها','url'=>url('admin/roles')]],
   'current'=>['title'=>'افزودن نقش کاربری']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">نقش کاربری جدید</h3>
        {!! Form::open(['url' => 'admin/roles', 'files' => 'true']) !!}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('name','نام نقش کاربری ') !!}
                {!! Form::text('name',null,['class'=>'form-control']) !!}
                @if($errors->has('name'))
                    <span class="input_error">{{$errors->first('name')}}</span>
                @endif

            </div>

            <div class="col-sm-12">
                <button class="btn digi_btn">ثبت نقش کاربری</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection
