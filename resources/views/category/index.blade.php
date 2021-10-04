@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت دسته بندی ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت دسته بندی ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/category')}}">
                <div class="input-group " >
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/category','title'=>'دسته بندی'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>نام دسته</th>
                        <th>دسته والد</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($categories as $category)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$category->id}}' /></td>
                            <td>{{$category->id}}</td>
                            <td>{{$category->name}}</td>
                            <td>@if(empty($category->parent)) دسته اصلی  @else {{$category->parent->name}} @endif</td>
                            <td>
                                <div class="table_action">
                                    @if(!$category->trashed())
                                        <a href="{{url('admin/category/'.$category->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش دسته بندی"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف دسته بندی"
                                          onclick="del_confirm('{{url('admin/category/'.$category->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این دسته بندی مطمئن هستید؟' )"
                                    ></span>
                                    @if($category->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی دسته بندی"
                                              onclick="restore_item('{{url('admin/category/restore/'.$category->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این دسته بندی مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($categories)==0)
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
        {{$categories->links()}}
    </div>
@endsection
