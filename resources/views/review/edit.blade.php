@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت نقد و بررسی ها','url'=>url('admin/reviews?product_id='.$product->id)]],
   'current'=>['title'=>'ویرایش نقد و بررسی']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">ویرایش نقد و بررسی {{$product->title}}</h3>
        {!! Form::model($review,['url' => 'admin/reviews/'.$review->id.'/?product_id='.$product->id]) !!}
        {{method_field('PUT')}}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('title','عنوان نقد و بررسی (اگر وارد نشود به عنوان نقد و بررسی تخصصی استفاده می شوند) ') !!}
                {!! Form::text('title',null,['class'=>'form-control']) !!}
                @if($errors->has('title'))
                    <span class="input_error">{{$errors->first('title')}}</span>
                @endif
            </div>
            <div class="col-sm-12 form-group">
                {!! Form::label('description','توضیحات نقد و بررسی ') !!}
                {!! Form::textarea('description',null,['class'=>'form-control ckeditor']) !!}
                @if($errors->has('description'))
                    <span class="input_error">{{$errors->first('description')}}</span>
                @endif
            </div>

            <div class="col-sm-12">
                <button class="btn digi_btn mt-4" type="submit">ثبت نقد و بررسی</button>
            </div>
        </div>
        {!! Form::close() !!}
    </div>
    </div>
@endsection

@section('scripts')
    <script src="{{asset('ckeditor/ckeditor.js')}}" type="application/javascript"></script>
@endsection
