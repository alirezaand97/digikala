@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت نقش کاربری ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت نقش کاربری ها</h3>
        <div class="admin-header">

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/roles','title'=>'نقش کاربری'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>نام نقش کاربری</th>
                        <th>تعداد نقش کاربری</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($roles as $role)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$role->id}}'/></td>
                            <td>{{$role->id}}</td>
                            <td>{{$role->name}}</td>
                            <td>{{$role->user_role_count}}</td>
                            <td>
                                <div class="table_action">
                                    <a href="{{url('admin/access/role/'.$role->id)}}"> <span
                                            data-feather="lock" class="feather" data-toggle="tooltip"
                                            data-placement="top"
                                            title="تعیین سطح دسترسی"></span></a>
                                    @if(!$role->trashed())
                                        <a href="{{url('admin/roles/'.$role->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش نقش کاربری"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف نقش کاربری"
                                          onclick="del_confirm('{{url('admin/roles/'.$role->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این نقش کاربری مطمئن هستید؟' )"
                                    ></span>
                                    @if($role->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی نقش کاربری"
                                              onclick="restore_item('{{url('admin/roles/restore/'.$role->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این نقش کاربری مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($roles)==0)
                        <tr>
                            <td colspan="5" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found" />
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </form>
        </div>
        {{$roles->links()}}
    </div>
@endsection
