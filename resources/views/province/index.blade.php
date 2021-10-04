@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت استان ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت استان ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/provinces')}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/provinces','title'=>'استان'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>نام استان</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($provinces as $province)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$province->id}}'/></td>
                            <td>{{$province->id}}</td>
                            <td>{{$province->name}}</td>
                            <td>
                                <div class="table_action">
                                    @if(!$province->trashed())
                                        <a href="{{url('admin/provinces/'.$province->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش استان"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف استان"
                                          onclick="del_confirm('{{url('admin/provinces/'.$province->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این استان مطمئن هستید؟' )"
                                    ></span>
                                    @if($province->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی استان"
                                              onclick="restore_item('{{url('admin/provinces/restore/'.$province->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این استان مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($provinces)==0)
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
        {{$provinces->links()}}
    </div>
@endsection
