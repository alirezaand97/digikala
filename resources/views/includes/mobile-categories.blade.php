<div class="a_cat_container">
    <div class="a_cat_box">
        <div class="a_cat_logo">
           <a href="{{url('/')}}">
               <img src="{{asset('files/upload/logo-farsi.svg')}}"/>
           </a>
        </div>
        <div class="a_cat_list_box">
            <ul class="a_cat_list">
                @foreach($categories as $category)
                    @if($category->not_show==0)
                        <li>
                            <a class="a_cat_parent_item">
                                <span>{{$category->name}}</span>
                                @if($category->children)
                                    <span class="fa fa-angle-down"></span>
                                @endif
                            </a>
                            @if(sizeof($category->children)>0)
                                <div class="a_cat_list a_cat_parent_list">
                                    <ul class="a_cat_sub_list">
                                        @foreach( $category->children as $catChild)
                                            <li>
                                                <a class="a_cat_child_item" @if(sizeof($catChild->children)==0) href="{{url('search/'.$catChild->url)}}" @endif>
                                                    <span> {{$catChild->name}}</span>
                                                    @if($catChild->children)
                                                        <span class="fa fa-angle-down"></span>
                                                    @endif
                                                </a>
                                                @if(sizeof($catChild->children)>0)
                                                    <div class="a_cat_list a_cat_child_list">
                                                        <ul class="a_cat_third_list">
                                                            @foreach( $catChild->children as $catGrandChild)
                                                                <li>
                                                                    <a href="{{url('search/'.$catGrandChild->url)}}">{{$catGrandChild->name}}</a>
                                                                </li>
                                                            @endforeach
                                                        </ul>
                                                    </div>
                                                @endif
                                            </li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                        </li>
                    @endif
                @endforeach
            </ul>
        </div>
    </div>
</div>
{{--href="{{url('main/'.$category->url)}}"--}}
{{--@if(sizeof($catChild->children)>0)--}}
{{--    <ul class="grand_child_category_ul">--}}
{{--        @foreach( $catChild->children as $catGrandChild)--}}
{{--            <li>--}}
{{--                <a href="{{url('search/'.$catGrandChild->url)}}">{{$catGrandChild->name}}</a>--}}
{{--            </li>--}}
{{--        @endforeach--}}
{{--    </ul>--}}
{{--@endif--}}
