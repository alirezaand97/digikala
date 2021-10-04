@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت صفحه ها','url'=>url('admin/pages')]],
   'current'=>['title'=>'ویرایش صفحه']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">صفحه جدید</h3>
        {!! Form::model($page,['url' => 'admin/pages/'.$page->id]) !!}
        {{method_field('PUT')}}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('title','عنوان صفحه ') !!}
                {!! Form::text('title',null,['class'=>'form-control']) !!}
                @if($errors->has('title'))
                    <span class="input_error">{{$errors->first('title')}}</span>
                @endif

            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('keywords','کلمات کلیدی ') !!}
                {!! Form::text('keywords',null,['class'=>'form-control']) !!}
                <span class="inp_description"><span data-feather="alert-circle" style="width: .8rem"></span> کلمات کلیدی را با , یا ، جدا کنید</span>
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('description','توضیحات مختصر (سئو- حداکثر 150 کلمه )') !!}
                {!! Form::text('description',null,['class'=>'form-control']) !!}
            </div>

            <div class="col-sm-12 form-group">
                {!! Form::label('content','محتوای صفحه') !!}
                {!! Form::textarea('content',null,['class'=>'form-control ckeditor']) !!}
                @if($errors->has('content'))
                    <span class="input_error">{{$errors->first('content')}}</span>
                @endif
            </div>

            <div class="col-sm-12">
                <button class="btn digi_btn">ویرایش صفحه</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection


@section('scripts')
    <script src="{{asset('ckeditor/ckeditor.js')}}" type="application/javascript"></script>
@endsection
