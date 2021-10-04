
<div class="shop_header">
    <div class="shop_header_top">
        <div class="shop_header_right">
            <div class="header_brand_container">
                <a href="{{asset('/')}}">
                    <img src="{{asset('images/logo.svg')}}" class="header_brand">
                </a>
            </div>
            <div class="shop_search_container">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <span data-feather="search"></span>
                        </div>
                    </div>
                    <input type="text" class="form-control search_input" id="inlineFormInputGroup"
                           placeholder="جستجو در دیجی کالا ...">
                </div>
            </div>
        </div>
        <div class="shop_header_left">

            <div class="header_auth">
                @if(\Illuminate\Support\Facades\Auth::check())
                    <div class="dropdown">
                        <div class="dropdown-toggle" type="button" id="authDropdown" data-toggle="dropdown"
                             aria-haspopup="true" aria-expanded="false">
                            <span data-feather="user" class="icon"></span>
                        </div>
                        <div class="dropdown-menu" aria-labelledby="authDropdown">
                            <a class="dropdown-item" href="#">
                                <div class="drop_item_profile">
                                    <div class="profile_image">
                                        <img src="{{asset('images/user.svg')}}">
                                    </div>
                                    <div class="left">
                                        <span class="username">
                                            @if(!empty(auth()->user()->name))
                                                {{ auth()->user()->name}}
                                            @else
                                                {{auth()->user()->mobile}}
                                            @endif
                                        </span>
                                        <span class="show_profile digi_color_blue">مشاهده حساب کاربری
                                        <span data-feather="chevron-left"></span>
                                        </span>
                                    </div>
                                </div>
                            </a>

                            <a class="dropdown-item" href="#">
                                <span data-feather="shopping-bag"></span>
                                <span>سفارش های من</span>
                            </a>

                            <form method="post" action="{{url('logout')}}" id="logout_form">@csrf</form>
                            <a class="dropdown-item" id="logout_link">
                                <span data-feather="log-out"></span>
                                <span>خروج از حساب کاربری</span>
                            </a>
                        </div>
                    </div>
                @else
                    <a href="{{url('register')}}">
                        <button class="auth_btn">
                            <span data-feather="user" class="icon"></span>
                            ورود یا عضویت
                        </button>
                    </a>
                @endif
            </div>

            <div class="divider"></div>

            <div class="shop_cart ml-2">
                <div class="dropdown">
                    <div class="dropdown-toggle" type="button" id="cart_summary_dropdown" data-toggle="dropdown"
                         aria-haspopup="true" aria-expanded="false">
                        <span class="header_cart_link position-relative"
                              data-count="{{\App\Cart::getCartCount()}}">
                            <span data-feather="shopping-cart" class="icon"></span>
                        </span>
                    </div>
                    <div class="dropdown-menu" aria-labelledby="cart_summary_dropdown">
                        <header-summary-cart></header-summary-cart>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="nav_container">
        <ul class="nav_list">
            <li id="show_mega_menu">
                <a>
                    <span data-feather="menu" class="nav_icon"></span>
                    <span>دسته بندی کالا ها</span>
                </a>
                <div class="mega_menu" id="#mega_menu">
                    <div class="mega_container">
                        <div class="nav_main">
                            <ul class="main_category">
                                @foreach($categories as $category)
                                    @if($category->not_show==0)
                                        <li id="cat-{{$category->id}}"><a
                                                href="{{url('main/'.$category->url)}}">{{$category->name}}</a></li>
                                    @else
                                    @endif
                                @endforeach
                            </ul>
                        </div>
                        <div class="nav_sub">
                            @foreach($categories as $category)
                                <div class="sub_category" id="sub-{{$category->id}}">
                                    <div class="all_cat">
                                        <a>همه دسته بندی های {{$category->name}}</a>
                                        <span data-feather="chevron-left" class="chevron_icon"></span>
                                    </div>
                                    <ul class="sub_category_ul">
                                        @foreach( $category->children as $catChild)
                                            <li>
                                                <a href="" class="sub_cat_bold">{{$catChild->name}}</a>
                                                <span data-feather="chevron-left" class="chevron_icon"></span>
                                                @if(sizeof($catChild->children)>0)
                                                    <ul class="grand_child_category_ul">
                                                        @foreach( $catChild->children as $catGrandChild)
                                                            <li>
                                                                <a href="{{url('search/'.$catGrandChild->url)}}">{{$catGrandChild->name}}</a>
                                                            </li>
                                                        @endforeach
                                                    </ul>
                                                @endif
                                            </li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <a href="">
                    <span data-feather="gift" class="nav_icon"></span>
                    <span> تخفیف ها و پیشنهاد ها</span>
                </a>
            </li>
            <li>
                <a href="">
                    <span data-feather="award" class="nav_icon"></span>
                    <span>دیجی کالای من</span>
                </a>
            </li>
            <li>
                <a href="">سوالی دارید؟</a>
            </li>
        </ul>

    </div>

</div>

