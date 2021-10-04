@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت دسته بندی ها','url'=>url('admin/category')]],
   'current'=>['title'=>'افزودن دسته بندی']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">دسته بندی جدید</h3>
        {!! Form::open(['url' => 'admin/category', 'files' => 'true']) !!}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('name','نام دسته ') !!}
                {!! Form::text('name',null,['class'=>'form-control']) !!}
                @if($errors->has('name'))
                    <span class="input_error">{{$errors->first('name')}}</span>
                @endif

            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('ename','نام انگلیسی دسته ') !!}
                {!! Form::text('ename',null,['class'=>'form-control']) !!}
                @if($errors->has('ename'))
                    <span class="input_error">{{$errors->first('ename')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('url','url دسته') !!}
                {!! Form::text('url',null,['class'=>'form-control']) !!}
                @if($errors->has('url'))
                    <span class="input_error">{{$errors->first('url')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('parent_id','والد دسته') !!}
                {!! Form::select('parent_id',$categories,null,['class'=>'selectpicker','data-live-search'=>'true']) !!}
                @if($errors->has('parent_id'))
                    <span class="input_error">{{$errors->first('parent_id')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6" style="margin-bottom: 30px">
                <label for="cat_image" style="font-weight: 500">تصویر دسته بندی</label>

                <input type="file" onchange="load_image(event)" id="cat_image" name="image"
                       style="display: none">

                <div class="upload_area" onclick="select_file()">آپلود تصویر
                    <img src="{{asset('images/Upload-Transparent-Images.png')}}"
                         id="categroy_image_upload"/>
                </div>



                @if($errors->has('image'))
                    <span class="input_error">{{$errors->first('image')}}</span>
                @endif
            </div>
            <div class="form-group col-sm-6">
                <label style="display: block">عدم نمایش در صفحه اصلی</label>
                <label class="switch">
                    {!! Form::checkbox('not_show',false,['class'=>'form-control']) !!}
                    <span class="slider round"></span>
                    @if($errors->has('not_show'))
                        <span class="input_error">{{$errors->first('not_show')}}</span>
                    @endif
                </label>
            </div>

            <div class="col-sm-6">
                <button class="btn digi_btn">ثبت اطلاعات</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection
