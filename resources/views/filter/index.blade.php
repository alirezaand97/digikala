@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت فیلتر ها']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title"> مدیریت فیلتر ها برای {{$category->name}}</h3>
        <div>
            <form method="post" action="{{url('admin/category/'.$category->id.'/filters/add')}}"
                  id="data_form_group_select">
                @csrf
                <div id="items_container">
                    @foreach($filters as $filterKey=>$filterValue)
                        <div class="row item mt-3" id="item_-{{$filterValue->id}}">
                            <div class="col-sm-12">
                                <input class="form-control" placeholder="فیلتر اصلی"
                                       name="item[{{$filterValue->id}}]"
                                       value="{{$filterValue->title}}">
                                <span class="btn btn-link digi_color_red mt-1  pointer f8rem"
                                      onclick="del_confirm('{{url('admin/category/filters/'.$filterValue->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این مجموعه فیلتر مطمئن هستید؟' )"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="حذف فیلتر جاری و زیر فیلتر هایش"
                                >حذف فیلتر ها</span>
                                <span class="btn btn-link mt-1 f8rem"
                                      onclick="add_new_sub_item({{$filterValue->id}})">افزودن زیر فیلتر</span>
                            </div>
                            @foreach($filterValue->getChild as $subSpecKey=>$subSpecValue)
                                <div class="col-sm-6 mt-2 d-flex align-items-center sub_item">
                                    <input class="form-control mr-1"
                                           name="subitem[{{$subSpecValue->parent_id}}][{{$subSpecValue->id}}]"
                                           placeholder="فیلتر زیرین" value="{{$subSpecValue->title}}">
                                    <span data-feather="x" class=" mr-1 pointer"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف فیلتر"
                                          onclick="del_confirm('{{url('admin/category/filters/'.$subSpecValue->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این فیلتر مطمئن هستید؟' )"
                                    ></span>
                                </div>
                            @endforeach
                        </div>
                    @endforeach
                </div>

                <span class="btn digi_btn_blue mt-4" onclick="add_new_item()">
                     <span>افزودن فیلتر جدید</span>
                    <span data-feather="plus"></span>
                </span>

                <div class="col-sm-12 mt-4 d-flex justify-content-end">
                    <button class="btn digi_btn">ثبت فیلتر ها</button>
                </div>


            </form>
        </div>
    </div>

@endsection
