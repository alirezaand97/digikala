@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت اسلایدر ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title">مدیریت اسلایدر ها</h3>
        <div class="admin-header-left" >
            @include('includes.action-dropdown',['count'=>$trashed_count,'url'=>'admin/sliders','title'=>'اسلایدر'])
        </div>
        <div class="table-responsive-md table-responsive-xl table-responsive-lg table-responsive-sm">
            <form method="post" id="data_form_group_select">
                @csrf
                <table class="table table-bordered  table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ردیف</th>
                        <th>نام اسلایدر</th>
                        <th>آدرس اسلایدر</th>
                        <th>تصویر اسلایدر</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($sliders as $slider)
                        <tr>
                            <td><input type="checkbox" class="data_checkbox" name="data_checkboxes[]"
                                       value='{{$slider->id}}'/></td>
                            <td>{{$slider->id}}</td>
                            <td>{{$slider->title}}</td>
                            <td>{{$slider->url}}</td>
                            <td class="item_image_container">
                                @if($slider->image_url)
                                    <img src="{{url('files/slider/'.$slider->image_url)}}" class="slider_table_image"/>
                                @endif
                            </td>
                            <td>
                                <div class="table_action">
                                    @if(!$slider->trashed())
                                        <a href="{{url('admin/sliders/'.$slider->id.'/edit')}}"> <span
                                                data-feather="edit-2" class="feather" data-toggle="tooltip"
                                                data-placement="top"
                                                title="ویرایش اسلایدر"></span></a>
                                    @endif
                                    <span data-feather="x" class="feather digi_color_red" data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف اسلایدر"
                                          onclick="del_confirm('{{url('admin/sliders/'.$slider->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این اسلایدر مطمئن هستید؟' )"
                                    ></span>
                                    @if($slider->trashed())
                                        <span data-feather="refresh-cw" class="feather" data-toggle="tooltip"
                                              data-placement="top"
                                              title="بازنشانی اسلایدر"
                                              onclick="restore_item('{{url('admin/sliders/restore/'.$slider->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیااز بازنشانی این اسلایدر مطمئن هستید؟' )"
                                        ></span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if(count($sliders)==0)
                        <tr>
                            <td colspan="7" class="text-center">
                                <img src="{{asset('images\no-item-found.png')}}" class="table_not_found" />
                                <h6 class="table_not_found_text">آیتمی یافت نشد</h6>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </form>
        </div>
        {{$sliders->links()}}
    </div>
@endsection
