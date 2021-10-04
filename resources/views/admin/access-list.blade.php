@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[
    ['title'=>'مدیریت نقش ها','url'=>url('admin/roles')]],
    'current'=>['title'=>'مدیریت دسترسی ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت دسترسی های {{$role->name}}</h3>
        <div>
            <form method="post" action="{{url('admin/access/role/'.$role->id)}}">
                @csrf

                @foreach($accessList as $accessField=>$accessInfo)
                    <div class="access_item_box">
                        <h6>{{$accessInfo['label']}}</h6>
                        <div class="access_list">
                            @foreach($accessInfo['access'] as $accessName=>$accessItem)
                                <div class="access_list_item">
                                    <label for="{{$accessName}}" class="checkbox_container">
                                        <input type="checkbox"
                                               name="access[{{$accessField}}][]"
                                               value="{{$accessName}}"
                                               @if(accessChecked($userAccess,$accessField,$accessName)) checked="checked" @endif
                                               id="{{$accessName}}"/>
                                        <span class="checkbox_span"></span>
                                        <span class="checkbox_text">{{$accessItem['label']}}</span>
                                    </label>

                                </div>
                            @endforeach
                        </div>
                    </div>
                @endforeach

                <div>
                    <button class="btn digi_btn">ثبت دسترسی ها</button>
                </div>
            </form>
        </div>
    </div>
@endsection
