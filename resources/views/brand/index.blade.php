@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت برند ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت برند ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/brands')}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/brands','title'=>'برند'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>نام برند</th>
                        <th>نام انگلیسی برند</th>
                        <th>نماد برند</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($brands as $brand)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$brand->id}}'/></td>
                            <td>{{$brand->id}}</td>
                            <td>{{$brand->name}}</td>
                            <td>{{$brand->ename}}</td>
                            <td class="item_image_container">
                                @if($brand->icon)
                                    <img src="{{url('files/upload/'.$brand->icon)}}" class="table_item_image"/>
                                @endif
                            </td>
                            <td>
                                <div class="table_action">
                                    @if(!$brand->trashed())
                                        <a href="{{url('admin/brands/'.$brand->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش برند"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف برند"
                                          onclick="del_confirm('{{url('admin/brands/'.$brand->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این برند مطمئن هستید؟' )"
                                    ></span>
                                    @if($brand->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی برند"
                                              onclick="restore_item('{{url('admin/brands/restore/'.$brand->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این برند مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($brands)==0)
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
        {{$brands->links()}}
    </div>
@endsection
