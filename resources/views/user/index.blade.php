@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت کاربر ها']
    ])


    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت کاربر ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/users')}}" class="form-inline">

                <input type="text" name="name" class="form-control ml-1" value="{{$request->name}}" placeholder="نام کاربر">
                <input type="text" name="mobile" class="form-control ml-1" value="{{$request->mobile}}"
                       placeholder="شماره موبایل">
                <select type="text" name="role" class="form-control ml-1 selectpicker">
                    // TODO: default option

                    <option value="">نقش کاربر</option>
                    <option value="user"  @if($request->role=='user') selected="selected" @endif>کاربر عادی</option>
                    <option value="admin" @if($request->role=='admin') selected="selected" @endif>مدیر</option>
                    @foreach($roles as $role)
                        <option value="{{$role->id}}"  @if($request->role==$role->id) selected="selected" @endif>{{$role->name}}</option>
                    @endforeach
                </select>
                <select type="text" name="account_status" class="form-control ml-1 selectpicker">
                    <option value="" >وضعت کاربر</option>
                    <option value="Active" @if($request->account_status=='Active') selected="selected" @endif>فعال</option>
                    <option value="InActive"  @if($request->account_status=='InActive') selected="selected" @endif>غیرفعال</option>
                </select>
                <button class="btn digi_btn_blue">جستجو</button>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/users','title'=>'کاربر'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>نام کاربر</th>
                        <th>موبایل</th>
                        <th>تاریخ عضویت</th>
                        <th>وضعیت</th>
                        <th>نقش کاربری</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($users as $user)
                        <?php
                        $jdf = new \App\Jdf();
                        $date = $jdf->jdate('j F y', strtotime($user->created_at))
                        ?>
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$user->id}}'/></td>
                            <td>{{$user->id}}</td>
                            <td>{{$user->name?$user->name:'ثبت نشده'}}</td>
                            <td>{{$user->mobile}}</td>
                            <td>{{$date}}</td>
                            <td class="text-center td_150">
                                @if($user->account_status===\App\User::USER_ACTIVE)
                                    <span class="status_active">تایید شده</span>
                                @elseif($user->account_status===\App\User::USER_INACTIVE)
                                    <span class="status_inactive">تایید نشده</span>
                                @endif
                            </td>

                            <td>
                                @if($user->getUserRole)
                                    {{$user->getUserRole->name}}
                                @elseif($user->role==='admin')
                                    <span>مدیر</span>
                                @else($user->account_status===\App\User::USER_INACTIVE)
                                    <span>کاربر عادی</span>
                                @endif
                            </td>

                            <td>
                                <div class="table_action">
                                        <a href="{{url('admin/users/'.$user->id)}}"> <span
                                                data-feather="eye" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="مشاهده کاربر"></span></a>
                                    @if(!$user->trashed())
                                        <a href="{{url('admin/users/'.$user->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش کاربر"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف کاربر"
                                          onclick="del_confirm('{{url('admin/users/'.$user->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این کاربر مطمئن هستید؟' )"
                                    ></span>
                                    @if($user->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی کاربر"
                                              onclick="restore_item('{{url('admin/users/restore/'.$user->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این کاربر مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($users)==0)
                        <tr>
                            <td colspan="8" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found"/>
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </form>
        </div>
        {{$users->links()}}
    </div>
@endsection
