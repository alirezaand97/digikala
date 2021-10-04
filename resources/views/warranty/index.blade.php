@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت گارانتی ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت گارانتی ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/warranties')}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/warranties','title'=>'گارانتی'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>نام گارانتی</th>
                        <td>عملیات</td>

                    </tr>
                    </thead>
                    <tbody>
                    @foreach($warranties as $warranty)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$warranty->id}}'/></td>
                            <td>{{$warranty->id}}</td>
                            <td>{{$warranty->name}}</td>
                            <td>
                                <div class="table_action">
                                    @if(!$warranty->trashed())
                                        <a href="{{url('admin/warranties/'.$warranty->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش گارانتی"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف گارانتی"
                                          onclick="del_confirm('{{url('admin/warranties/'.$warranty->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این گارانتی مطمئن هستید؟' )"
                                    ></span>
                                    @if($warranty->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی گارانتی"
                                              onclick="restore_item('{{url('admin/warranties/restore/'.$warranty->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این گارانتی مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($warranties)==0)
                        <tr>
                            <td colspan="6" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found" />
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </form>
        </div>
        {{$warranties->links()}}
    </div>
@endsection
