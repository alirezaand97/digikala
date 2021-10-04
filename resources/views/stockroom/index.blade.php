@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت انبار ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت انبار ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/stockrooms')}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/stockrooms','title'=>'انبار'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>نام انبار</th>
                        <th>توضیحات انبار</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($stockrooms as $stockroom)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$stockroom->id}}'/></td>
                            <td>{{$stockroom->id}}</td>
                            <td>{{$stockroom->name}}</td>
                            <td>{{$stockroom->description}}</td>
                            <td>
                                <div class="table_action">
                                    <a href="{{url('admin/stockrooms/'.$stockroom->id)}}"> <span
                                            data-feather="eye" class="feather" data-toggle="tooltip"
                                            data-placement="top"
                                            title="مشاهده محصولات انبار">
                                        </span>
                                    </a>
                                    @if(!$stockroom->trashed())
                                        <a href="{{url('admin/stockrooms/'.$stockroom->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش انبار"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف انبار"
                                          onclick="del_confirm('{{url('admin/stockrooms/'.$stockroom->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این انبار مطمئن هستید؟' )"
                                    ></span>
                                    @if($stockroom->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی انبار"
                                              onclick="restore_item('{{url('admin/stockrooms/restore/'.$stockroom->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این انبار مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($stockrooms)==0)
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
        {{$stockrooms->links()}}
    </div>
@endsection
