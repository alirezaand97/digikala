<div class="a_header_box">
    <div class="shop_header">
        <span data-feather="menu" id="open_menu"></span>
        <a href="{{asset('/')}}">
            <img src="{{asset('images/logo.svg')}}" class="a_header_logo">
        </a>
        <span></span>
    </div>
    <div class="a_header_search">
        <div class="a_search_group">
            <div class="a_search_btn">
                <span data-feather="search"></span>
            </div>
            <input type="text" class="form-control a_search_input" id="inlineFormInputGroup"
                   placeholder="جستجو در دیجی کالا ..."/>
        </div>
        <div class="header_cart_link a_header_icons" data-count="{{\App\Cart::getCartCount()}}">
            <a href="{{url('/show-cart')}}">
                <span data-feather="shopping-cart" class="icon"></span>
            </a>
        </div>
        <div class="a_header_icons">
            @if(auth()->check())
                <span data-feather="user" class="icon user_registered"></span>
            @else
                <a href="{{url('/register')}}">
                    <span data-feather="user" class="icon"></span>
                </a>
            @endif
        </div>
    </div>
</div>
@include('includes.mobile-categories')

