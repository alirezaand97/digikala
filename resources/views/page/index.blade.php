@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت صفحه ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت صفحه ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/pages')}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/pages','title'=>'صفحه'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>عنوان صفحه</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($pages as $page)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$page->id}}'/></td>
                            <td>{{$page->id}}</td>
                            <td>{{$page->title}}</td>
                            <td>
                                <div class="table_action">
                                    <a href="{{url('/pages/'.$page->url)}}"> <span
                                            data-feather="external-link" class="feather" data-toggle="tooltip"
                                            data-placement="top"
                                            title="مشاهده صفحه"></span>
                                    </a>
                                    @if(!$page->trashed())
                                        <a href="{{url('admin/pages/'.$page->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش صفحه"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف صفحه"
                                          onclick="del_confirm('{{url('admin/pages/'.$page->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این صفحه مطمئن هستید؟' )"
                                    ></span>
                                    @if($page->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی صفحه"
                                              onclick="restore_item('{{url('admin/pages/restore/'.$page->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این صفحه مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($pages)==0)
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
        {{$pages->links()}}
    </div>
@endsection
