@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت محصولات','url'=>url('admin/products')]],
   'current'=>['title'=>'افزودن محصول']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">محصول جدید</h3>
        {!! Form::open(['url' => 'admin/products', 'files' => 'true']) !!}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('title','عنوان محصول ') !!}
                {!! Form::text('title',null,['class'=>'form-control']) !!}
                @if($errors->has('title'))
                    <span class="input_error">{{$errors->first('title')}}</span>
                @endif
            </div>
            <div class="col-sm-6 form-group">
                {!! Form::label('title','عنوان انگلیسی محصول ') !!}
                {!! Form::text('ename',null,['class'=>'form-control']) !!}
                @if($errors->has('ename'))
                    <span class="input_error">{{$errors->first('ename')}}</span>
                @endif
            </div>


            <div class="form-group col-sm-6">
                {!! Form::label('cat_id','دسته بندی') !!}
                {!! Form::select('cat_id',$categories,null,['class'=>'selectpicker','data-live-search'=>'true']) !!}
                @if($errors->has('cat_id'))
                    <span class="input_error">{{$errors->first('cat_id')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('brand_id','برند') !!}
                {!! Form::select('brand_id',$brands,null,['class'=>'selectpicker','data-live-search'=>'true']) !!}
                @if($errors->has('brand_id'))
                    <span class="input_error">{{$errors->first('brand_id')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('colors','رنگ ها') !!}
                <select class="selectpicker" multiple="multiple" data-live-search="true" name="colors[]" id="colors">
                    @foreach($colors as $color)
                        <option
                            data-content="<span class='badge p-2' style='background:{{$color->code}}'>{{$color->name}}</span>"
                            value='{{$color->id}}'>{{$color->name}}</option>
                    @endforeach
                </select>

                @if($errors->has('colors'))
                    <span class="input_error">{{$errors->first('colors')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('status','وضعیت') !!}
                {!! Form::select('status',$product_status,-2,['class'=>'selectpicker','data-live-search'=>'true']) !!}
                @if($errors->has('status'))
                    <span class="input_error">{{$errors->first('status')}}</span>
                @endif
            </div>


            <div class="form-group col-sm-6" style="margin-bottom: 30px">
                <label for="cat_image" style="font-weight: 500">تصویر دسته بندی</label>

                <input type="file" onchange="load_image(event)" id="cat_image" name="image_url"
                       style="display: none">

                <div class="upload_area" onclick="select_file()">آپلود تصویر
                    <img src="{{asset('images/Upload-Transparent-Images.png')}}"
                         id="categroy_image_upload"/>
                </div>
                @if($errors->has('image_url'))
                    <span class="input_error">{{$errors->first('image_url')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('keywords','کلمات کلیدی ') !!}
                {!! Form::text('keywords',null,['class'=>'form-control']) !!}
                <span class="inp_description"><span data-feather="alert-circle" style="width: .8rem"></span> کلمات کلیدی را با , یا ، جدا کنید</span>
                @if($errors->has('keywords'))
                    <span class="input_error">{{$errors->first('keywords')}}</span>
                @endif
            </div>

            <div class="col-sm-12 form-group">
                {!! Form::label('description','توضیحات محصول ') !!}
                {!! Form::textarea('description',null,['class'=>'form-control ckeditor']) !!}
                @if($errors->has('description'))
                    <span class="input_error">{{$errors->first('description')}}</span>
                @endif
            </div>

            <div class="col-sm-12 form-group">
                <div class="form-check">
                    <label class="form-check-label" for="defaultCheck2">
                        استفاده به عنوان کارت هدیه
                    </label>
                    <input class="form-check-input mr-2" type="checkbox" name="is_gift">
                </div>
            </div>
                <div class="col-sm-12">
                    <button class="btn digi_btn mt-4" type="submit">ثبت محصول</button>
                </div>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection

@section('scripts')
    <script src="{{asset('ckeditor/ckeditor.js')}}" type="application/javascript"></script>
@endsection
