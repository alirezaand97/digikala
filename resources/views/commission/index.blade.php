@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت کمیسیون ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت کمیسیون ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/commissions')}}">
                <div class="d-flex">
                    <select name="category_id" class="selectpicker admin_search_input" data-live-search="true">
                        @foreach($cats as $key=>$value)
                            <option value="{{$key}}" @if($key==$request->get('category_id','')) selected="selected"@endif>{{$value}}</option>
                        @endforeach
                    </select>
                    <select name="brand_id" class="selectpicker admin_search_input" data-live-search="true">
                        @foreach($brands as $key=>$value)
                            <option value="{{$key}}" @if($key==$request->get('brand_id','')) selected="selected"@endif>{{$value}}</option>
                        @endforeach
                    </select>
                    <button class="btn digi_btn_blue">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/commissions','title'=>'کمیسیون'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>دسته بندی</th>
                        <th>برند</th>
                        <th>درصد کمیسیون</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($commissions as $commission)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$commission->id}}'/></td>
                            <td>{{$commission->id}}</td>
                            <td>{{$commission->getCategory->name}}</td>
                            <td>{{$commission->getBrand->name}}</td>
                            <td>{{$commission->percentage}}</td>
                            <td>
                                <div class="table_action">
                                    @if(!$commission->trashed())
                                        <a href="{{url('admin/commissions/'.$commission->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش کمیسیون"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف کمیسیون"
                                          onclick="del_confirm('{{url('admin/commissions/'.$commission->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این کمیسیون مطمئن هستید؟' )"
                                    ></span>
                                    @if($commission->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی کمیسیون"
                                              onclick="restore_item('{{url('admin/commissions/restore/'.$commission->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این کمیسیون مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($commissions)==0)
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
        {{$commissions->links()}}
    </div>
@endsection
