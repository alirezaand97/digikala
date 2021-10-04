@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت استان ها','url'=>url('admin/provinces')]],
   'current'=>['title'=>',ویرایش استان']
   ])

    <div class="pannel">
        <h3 class="admin_pages_title">ویرایش استان</h3>

        {!! Form::model($province,['url' => 'admin/provinces/'.$province->id, 'files' => 'true']) !!}
        {{method_field('PUT')}}
        <div class="row">

            <div class="form-group col-sm-6">
                {!! Form::label('name','نام استان ') !!}
                {!! Form::text('name',null,['class'=>'form-control']) !!}
                @if($errors->has('name'))
                    <span class="input_error">{{$errors->first('name')}}</span>
                @endif
            </div>

        <div class="col-sm-12">
            <button class="btn btn-primary">ویرایش استان</button>
        </div>
        {!! Form::close() !!}
    </div>
    </div>
@endsection
