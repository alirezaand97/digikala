@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت رنگ ها','url'=>url('admin/colors')]],
   'current'=>['title'=>'افزودن رنگ']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">رنگ جدید</h3>
        {!! Form::open(['url' => 'admin/colors']) !!}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('name','نام رنگ ') !!}
                {!! Form::text('name',null,['class'=>'form-control']) !!}
                @if($errors->has('name'))
                    <span class="input_error">{{$errors->first('name')}}</span>
                @endif

            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('code','کد رنگ') !!}
                {!! Form::text('code',null,['class'=>'form-control jscolor']) !!}
                @if($errors->has('code'))
                    <span class="input_error">{{$errors->first('code')}}</span>
                @endif
            </div>


            <div class="col-sm-12">
                <button class="btn digi_btn">ثبت رنگ</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection
@section('scripts')
<script src="{{asset('js/jscolor.js')}}" type="application/javascript"></script>
@endsection
