@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'تنظیمات فروشگاه','url'=>url('admin/setting/shop')]],
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">تنظیمات فروشگاه</h3>
        {!! Form::open(['url' => '/admin/setting/shop', 'files' => 'true']) !!}

        @if(Session::has('message'))
            <div class="alert alert-success">{{Session::get('message')}}</div>
        @endif
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('shop_name','نام فروشگاه') !!}
                {!! Form::text('shop_name',$config['shop_name'],['class'=>'form-control']) !!}
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('shop_description','توضیحات فروشگاه ') !!}
                {!! Form::text('shop_description',$config['shop_description'],['class'=>'form-control']) !!}
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('keywords','کلمات کلیدی ') !!}
                {!! Form::text('keywords',$config['keywords'],['class'=>'form-control']) !!}
                <span class="inp_description"><span data-feather="alert-circle" style="width: .8rem"></span> کلمات کلیدی را با , یا ، جدا کنید</span>
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('admin_login','آدرس لاگین مدیر') !!}
                {!! Form::text('admin_login',$config['admin_login'],['class'=>'form-control']) !!}
            </div>

            <div class="form-group col-sm-6">
                <input type="file" onchange="load_image(event)" name="shop_logo">
            </div>

            <div class="col-sm-12">
                <button class="btn digi_btn">ثبت تنظیمات فروشگاه</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection
