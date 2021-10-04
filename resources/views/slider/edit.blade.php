@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت برندها','url'=>url('admin/brands')]],
   'current'=>['title'=>',ویرایش برند']
   ])

    <div class="pannel">
        <h3 class="admin_pages_title">ویرایش برند</h3>

        {!! Form::model($slider,['url' => 'admin/sliders/'.$slider->id, 'files' => 'true']) !!}
        {{method_field('PUT')}}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('title','عنوان اسلایدر ') !!}
                {!! Form::text('title',null,['class'=>'form-control']) !!}
                @if($errors->has('title'))
                    <span class="input_error">{{$errors->first('title')}}</span>
                @endif

            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('url','آدرس اسلایدر ') !!}
                {!! Form::text('url',null,['class'=>'form-control']) !!}
                @if($errors->has('url'))
                    <span class="input_error">{{$errors->first('url')}}</span>
                @endif
            </div>


            <div class="form-group col-sm-6 mb-5" >
                <label for="cat_image" class="font-weight-bold" >تصویر اسلایدر</label>

                <input type="file" onchange="load_image(event)" id="cat_image" name="image_url"
                       class="d-none">

                <div class="upload_area" onclick="select_file()">آپلود تصویر</div>

                <img src="{{asset('images/Upload-Transparent-Images.png')}}"
                     id="categroy_image_upload"/>

                @if($errors->has('image_url'))
                    <span class="input_error">{{$errors->first('image_url')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6 mb-5">
                <label for="cat_image" class="font-weight-bold">تصویر موبایل و تبلت اسلایدر</label>

                <input type="file" onchange="second_load_image(event)" id="second_image" name="mobile_image_url"
                       class="d-none">

                <div class="upload_area" onclick="second_select_file()">آپلود تصویر</div>

                <img src="{{asset('images/Upload-Transparent-Images.png')}}"
                     id="second_image_upload"/>

                @if($errors->has('mobile_image_url'))
                    <span class="input_error">{{$errors->first('mobile_image_url')}}</span>
                @endif
            </div>


            <div class="col-sm-12">
                <button class="btn digi_btn">ثبت اسلایدر</button>
            </div>
        {!! Form::close() !!}
    </div>
    </div>
@endsection
