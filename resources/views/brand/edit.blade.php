@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت برندها','url'=>url('admin/brands')]],
   'current'=>['title'=>',ویرایش برند']
   ])

    <div class="pannel">
        <h3 class="admin_pages_title">ویرایش برند</h3>

        {!! Form::model($brand,['url' => 'admin/brands/'.$brand->id, 'files' => 'true']) !!}
        {{method_field('PUT')}}
        <div class="row">

            <div class="form-group col-sm-6">
                {!! Form::label('name','نام برند ') !!}
                {!! Form::text('name',null,['class'=>'form-control']) !!}
                @if($errors->has('name'))
                    <span class="input_error">{{$errors->first('name')}}</span>
                @endif

            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('ename','نام انگلیسی برند ') !!}
                {!! Form::text('ename',null,['class'=>'form-control']) !!}
                @if($errors->has('ename'))
                    <span class="input_error">{{$errors->first('ename')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6" style="margin-bottom: 30px">
                <label for="cat_image" style="font-weight: 500">تصویر برند</label>

                <input type="file" onchange="load_image(event)" id="cat_image" name="icon"
                       style="display: none">

                <div class="upload_area" onclick="select_file()">آپلود تصویر</div>

                <img src="{{asset('images/Upload-Transparent-Images.png')}}"
                     id="categroy_image_upload"/>

                @if($errors->has('icon'))
                    <span class="input_error">{{$errors->first('icon')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('description','توضیحات برند ') !!}
                {!! Form::textArea('description',null,['class'=>'form-control admin_textarea']) !!}
                @if($errors->has('description'))
                    <span class="input_error">{{$errors->first('description')}}</span>
                @endif

            </div>

        <div class="col-sm-6">
            <button class="btn btn-primary">ویرایش برند</button>
        </div>
        {!! Form::close() !!}
    </div>
    </div>
@endsection
