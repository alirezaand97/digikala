@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت نقد و بررسی ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت نقد و بررسی ها</h3>
        <div class="admin-header">
            <form action="{{url('admin/reviews')}}">
                <div class="input-group">
                    <input type="text" name="search" class="form-control search_inp" value="{{$search}}">
                    <button class="btn digi_btn_blue search_btn">جستجو</button>
                </div>

            </form>

            @include('includes.action-dropdown',['count'=>$trashed_count,'queryString'=>$queryString,'url'=>'admin/reviews','title'=>'نقد و بررسی'])
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-xl table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <td>عنوان</td>
                        <td>خلاصه نقد و بررسی</td>
                        <th>عملیات</th>

                    </tr>
                    </thead>
                    <tbody>
                    @foreach($reviews as $review)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$review->id}}'/></td>
                            <td>{{$review->id}}</td>

                            <td class="td_150">
                                @if(empty($review->title))
                                    نقد و بررسی تخصصی
                                @else
                                    {{$review->title}}
                                @endif
                            </td>
                            <td>
                                <div class="td_overflow_hidden">{!! $review->description !!}</div>
                            </td>

                            <td>
                                <div class="table_action">
                                    @if(!$review->trashed())
                                        <a href="{{url('admin/reviews/'.$review->id.'/edit?product_id='.$product->id)}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش نقد و بررسی"></span>
                                        </a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف نقد و بررسی"
                                          onclick="del_confirm('{{url('admin/reviews/'.$review->id.'?product_id='.$product->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این نقد و بررسی مطمئن هستید؟' )"
                                    ></span>
                                    @if($review->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی نقد و بررسی"
                                              onclick="restore_item('{{url('admin/reviews/restore/'.$review->id.'?product_id='.$product->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این نقد و بررسی مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($reviews)==0)
                        <tr>
                            <td colspan="7" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found"/>
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </form>
        </div>
        {{$reviews->links()}}
    </div>
@endsection
