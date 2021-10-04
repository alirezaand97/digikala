@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت گارانتی ها','url'=>url('admin/warranties')]],
   'current'=>['title'=>'افزودن گارانتی']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">گارانتی جدید</h3>
        {!! Form::open(['url' => 'admin/warranties']) !!}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('name','نام گارانتی ') !!}
                {!! Form::text('name',null,['class'=>'form-control']) !!}
                @if($errors->has('name'))
                    <span class="input_error">{{$errors->first('name')}}</span>
                @endif

            </div>


            <div class="col-sm-12">
                <button class="btn digi_btn">ثبت گارانتی</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection

