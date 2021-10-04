@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت کاربران','url'=>url('admin/users')]],
   'current'=>['title'=>'بروزرسانی کاربر']
   ])
    <div class="pannel">
        <h3 class="admin_pages_title">کاربر جدید</h3>
        {!! Form::model($user,['url' => 'admin/users/'.$user->id]) !!}
        {{method_field('PUT')}}
        <div class="row">
            <div class="form-group col-sm-6">
                {!! Form::label('name','نام کاربر ') !!}
                {!! Form::text('name',null,['class'=>'form-control']) !!}
                @if($errors->has('name'))
                    <span class="input_error">{{$errors->first('name')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('username','نام کاربری (برای مدیر) ') !!}
                {!! Form::text('username',null,['class'=>'form-control']) !!}
                @if($errors->has('username'))
                    <span class="input_error">{{$errors->first('username')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('mobile','شماره موبایل') !!}
                {!! Form::text('mobile',null,['class'=>'form-control']) !!}
                @if($errors->has('mobile'))
                    <span class="input_error">{{$errors->first('mobile')}}</span>
                @endif
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('password','رمز عبور') !!}
                {!! Form::password('password',['class'=>'form-control']) !!}
                @if($errors->has('password'))
                    <span class="input_error">{{$errors->first('password')}}</span>
                @endif
            </div>
            <div class="form-group col-sm-6">
                {!! Form::label('account_status','وضعیت کاربر') !!}
                <select type="text" name="account_status" id="account_status" class="form-control ml-1 selectpicker">
                    <option value="Active" @if($user->account_status=='Active') selected="selected" @endif>فعال
                    </option>
                    <option value="InActive" @if($user->account_status=='InActive') selected="selected" @endif>
                        غیرفعال
                    </option>
                </select>
            </div>

            <div class="form-group col-sm-6">
                {!! Form::label('role','نقش کاربری') !!}
                <select type="text" name="role" id="role" class="form-control ml-1 selectpicker">
                    <option value="user" @if($user->role=='user') selected="selected" @endif>کاربر عادی</option>
                    <option value="admin" @if($user->role=='admin') selected="selected" @endif>مدیر</option>
                    @foreach($roles as $role)
                        <option value="{{$role->id}}" @if($user->role_id==$role->id) selected="selected" @endif>
                            {{$role->name}}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="col-sm-12">
                <button class="btn digi_btn">ثبت کاربر</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection
