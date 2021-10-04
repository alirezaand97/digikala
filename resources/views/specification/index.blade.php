@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
    'current'=>['title'=>'مدیریت مشخصات']
    ])
    <div class="pannel">
        @include('includes.message-alert')
        <h3 class="admin_pages_title"> مدیریت مشخصات برای {{$category->name}}</h3>
        <div>
            <form method="post" action="{{url('admin/category/'.$category->id.'/specifications/add')}}"
                  id="data_form_group_select">
                @csrf
                <div id="specifications">
                    @foreach($specifications as $specKey=>$specValue)
                        <div class="row specs mt-3" id="item_-{{$specValue->id}}">
                            <div class="col-sm-12">
                                <input class="form-control" placeholder="ویژگی اصلی" name="item[{{$specValue->id}}]"
                                       value="{{$specValue->title}}">
                                <span class="btn btn-link digi_color_red mt-1  pointer f8rem"
                                      onclick="del_confirm('{{url('admin/category/specifications/'.$specValue->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این مجموعه ویژگی مطمئن هستید؟' )"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="حذف ویژگی جاری و زیر ویژگی هایش"
                                >حذف مشخصات</span>
                                <span class="btn btn-link mt-1 f8rem"
                                      onclick="add_new_sub_specification({{$specValue->id}})">افزودن زیر ویژگی</span>
                            </div>

                            @foreach($specValue->getChild as $subSpecKey=>$subSpecValue)
                                <div class="col-sm-6 mt-2 d-flex align-items-center sub_specs">
                                    <input
                                        type="checkbox"
                                        name="checkbox[{{$subSpecValue->parent_id}}][{{$subSpecValue->id}}]"
                                        @if($subSpecValue->show_item==1) checked @endif
                                    >
                                    <input class="form-control mr-1"
                                           name="subitem[{{$subSpecValue->parent_id}}][{{$subSpecValue->id}}]"
                                           placeholder="ویژگی زیرین" value="{{$subSpecValue->title}}">
                                    <span data-feather="x" class=" mr-1 pointer"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="حذف ویژگی"
                                          onclick="del_confirm('{{url('admin/category/specifications/'.$subSpecValue->id)}}','{{\Illuminate\Support\Facades\Session::token()}}','آیا از حذف این ویژگی مطمئن هستید؟' )"
                                    ></span>
                                </div>
                            @endforeach
                        </div>
                    @endforeach
                </div>

                <span class="btn digi_btn_blue mt-4" onclick="add_new_specification()">
                     <span>افزودن ویژگی جدید</span>
                    <span data-feather="plus"></span>
                </span>

                <div class="col-sm-12 mt-4 d-flex justify-content-end">
                    <button class="btn digi_btn">ثبت مشخصات</button>
                </div>
            </form>
        </div>
    </div>

@endsection
