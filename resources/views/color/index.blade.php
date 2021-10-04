@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت رنگ ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت رنگ ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/colors')}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/colors','title'=>'رنگ'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>نام رنگ</th>
                        <th>کد رنگ</th>
                        <td>عملیات</td>

                    </tr>
                    </thead>
                    <tbody>
                    @foreach($colors as $color)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$color->id}}'/></td>
                            <td>{{$color->id}}</td>
                            <td>{{$color->name}}</td>
                            <td class="text-center">

                                <span class="color_show" style="background:{{$color->code}}">
                                    <span>{{$color->code}}</span>
                                </span>
                            </td>
                            <td>
                                <div class="table_action">
                                    @if(!$color->trashed())
                                        <a href="{{url('admin/colors/'.$color->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش رنگ"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف رنگ"
                                          onclick="del_confirm('{{url('admin/colors/'.$color->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این رنگ مطمئن هستید؟' )"
                                    ></span>
                                    @if($color->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی رنگ"
                                              onclick="restore_item('{{url('admin/colors/restore/'.$color->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این رنگ مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($colors)==0)
                        <tr>
                            <td colspan="6" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found"/>
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </form>
        </div>
        {{$colors->links()}}
    </div>
@endsection
