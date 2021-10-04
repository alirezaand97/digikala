@extends('layouts.mobile-shop')
@section('content')
    <mobile-products-box></mobile-products-box>

    <div class="c_modal_container" id="c_advanced_filter_box">
        <div class="c_modal_title c_close_advanced_search">
            <span class="ml-3" data-feather="arrow-right"></span>جستجوی پیشرفته
        </div>
            <div class="cp_filters_container">

                @if(isset($category))
                    <div class="cp_filter_box">
                        <div class="cp_filter_header">
                            <span>دسته بندی</span>
                            <span class="fa fa-angle-down"></span>
                        </div>
                        <div class="cp_filter_sub_content" style="display: block">
                            <div class="cat_filter_list_box">
                                @if($category->parent && $category->parent->parent)
                                    <div><a class="cat_parent"
                                            href="{{url('search/'.$category->parent->parent->url)}}">{{$category->parent->parent->name}}</a>
                                    </div>
                                @endif
                                <ul>
                                    @if($category->parent)
                                        <li><a class="cat_parent"
                                               href="{{url('search/'.$category->parent->url)}}">{{$category->parent->name}}</a>
                                            @endif
                                            <ul>
                                                <li><a class="cat_current"
                                                       href="{{url('search/'.$category->url)}}">{{$category->name}}</a>
                                                    <ul>
                                                        @foreach($category->children as $subCategory)
                                                            <li>
                                                                <a href="{{url('search/'.$subCategory->url)}}">{{$subCategory->name}}</a>
                                                            </li>
                                                        @endforeach
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                @endif

                <div class="cp_filter_box">
                    <div class="cp_filter_header">
                        <span>جستجو در نتایج:</span>
                        <span class="fa fa-angle-down"></span>
                    </div>
                    <div class="cp_filter_sub_content " style="display: block">
                        <div class="digi_input_with_btn_box cp_search_product">
                            <span data-feather="search" class="digi_input_icon"></span>
                            <input type="text" name="string"
                                   @if(array_key_exists('string',$_GET)) value="{{$_GET['string']}}"
                                   @endif id="cp_search_product" class="digi_input digi_input_with_icon"
                                   placeholder="نام محصول یا برند مورد نظر را بنویسید">
                        </div>
                    </div>
                </div>

                <div class="cp_filter_box">
                    <div class="cp_filter_header">
                        <span> محدوده قیمت مورد نظر</span>
                        <span class="fa fa-angle-down"></span>

                    </div>
                    <div class="cp_filter_sub_content" style="display: none">
                        <div id="slider" dir="ltr" class="price_range_slider"></div>
                        <ul class="price_range_label">
                            <li>
                                <div>از</div>
                                <div class="range_price_num" id="min_price_range"></div>
                                <div>تومان</div>
                            </li>
                            <li>
                                <div>تا</div>
                                <div class="range_price_num" id="max_price_range"></div>
                                <div>تومان</div>
                            </li>
                        </ul>
                        <div class="set_filter_box">
                            <button class="set_price_filter" id="set_price_filter">
                                <span data-feather="filter"></span>
                                <span>اعمال محدوده قیمت</span>
                            </button>
                        </div>
                    </div>
                </div>


                <div class="cp_filter_box cp_toggle_box">
                    <div class="toggle-light" id="product_status"></div>
                    <span class="cp_toggle_label">فقط کالاهای موجود</span>
                </div>

                <div class="cp_filter_box cp_toggle_box">
                    <div class="toggle-light" id="send_status"></div>
                    <span class="cp_toggle_label">فقط کالاهای آماده ارسال</span>
                </div>

                <div class="cp_filter_box">
                    <div class="cp_filter_header">
                        <span>برند</span>
                        <span class="fa fa-angle-down"></span>
                    </div>

                    <div class="cp_filter_sub_content cp_filter_content" style="display: none">
                        <div class="digi_input_with_btn_box cp_search_product">
                            <span data-feather="search" class="digi_input_icon"></span>
                            <input type="text"
                                   class="digi_input digi_input_with_icon filter_input"
                                   placeholder="جستجوی برند...">
                            <span data-feather="x" class="digi_input_clear"></span>
                        </div>
                        <ul class="cp_filter_sub_list cp_filter_content">
                            @foreach($brands as $brand)
                                <li class="cp_filter_sub_item" data="{{'brand'.'_param_'.$brand->brand_id}}">
                                    <span class="dg_checkbox"> </span>
                                    <span class="cp_filter_item_title">{{$brand->getBrand->name}}</span>
                                    <span class="ml-0 mr-auto">{{$brand->getBrand->ename}}</span>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>

                <div class="cp_filter_box">
                    <div class="cp_filter_header">
                        <span>رنگ</span>
                        <span class="fa fa-angle-down"></span>
                    </div>
                    <div class="cp_filter_sub_content ">
                        <div class="digi_input_with_btn_box cp_search_product">
                            <span data-feather="search" class="digi_input_icon"></span>
                            <input type="text"
                                   class="digi_input digi_input_with_icon filter_input"
                                   placeholder="جستجوی رنگ...">
                            <span data-feather="x" class="digi_input_clear"></span>

                        </div>
                        <ul class="cp_filter_sub_list cp_filter_content">
                            @foreach($colors as $color)
                                <li class="cp_filter_sub_item" data="{{'color'.'_param_'.$color->id}}">
                                    <span class="dg_checkbox"> </span>
                                    <span class="cp_filter_item_title">{{$color->name}}</span>
                                    <span class="ml-0 mr-auto cp_color_circle"
                                          style="background: {{$color->code}}"></span>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>

                @if(isset($filters))
                    @foreach($filters as $filter)
                        <div class="cp_filter_box">
                            <div class="cp_filter_header">
                                <span>{{$filter->title}}</span>
                                <span class="fa fa-angle-down"></span>
                            </div>
                            <div class="cp_filter_sub_content ">
                                <div class="digi_input_with_btn_box cp_search_product">
                                    <span data-feather="search" class="digi_input_icon"></span>
                                    <input type="text"
                                           class="digi_input digi_input_with_icon filter_input"
                                           placeholder="جستجوی  {{$filter->title}}...">
                                    <span data-feather="x" class="digi_input_clear"></span>
                                </div>
                                <ul class="cp_filter_sub_list cp_filter_content">
                                    @foreach($filter->getChild as $subFilter)
                                        <?php
                                        $filterKey = 'attribute[' . $filter->id . ']';
                                        ?>
                                        <li class="cp_filter_sub_item" data="{{$filterKey.'_param_'.$subFilter->id}}">
                                            <span class="dg_checkbox"> </span>
                                            <span class="cp_filter_item_title">{{$subFilter->title}}</span>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    @endforeach
                @endif
            </div>
        <button class="advanced_filter_btn">جستجوی پیشرفته</button>
    </div>

@endsection
<script>

</script>

@section('styles')
    <link rel="stylesheet" href="{{asset('css/nouislider.min.css')}}" type="text/css">
    <link rel="stylesheet" href="{{asset('css/toggles-full.css')}}" type="text/css">
    <script src="{{asset('js/nouislider.min.js')}}" type="text/javascript"></script>
@endsection

@section('scripts')
    <script src="{{asset('js/toggles.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('js/shop.js')}}" type="text/javascript"></script>

    <script type="text/javascript">
        $("#send_status").toggles({
            type: 'Light',
            text: {'on': '', 'off': ''},
            width: 45,
            direction: 'rtl',
            on: false
        });
        $("#product_status").toggles({
            type: 'Light',
            text: {'on': '', 'off': ''},
            width: 45,
            direction: 'rtl',
            on: false
        });
    </script>
@endsection
<script>
    import MobileProductsBox from "../../../js/components/MobileProductsBox";

    export default {
        components: {MobileProductsBox}
    }
</script>
