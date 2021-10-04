<nav id="sidebar" class="sidebar-wrapper">
    <div class="sidebar-content">
        <div class="sidebar-brand">
            <a href="{{asset('/')}}"><img src="{{asset('images/logo.svg')}}"></a>
            <div id="close-sidebar">
                <span data-feather="x"></span>
            </div>
        </div>

        <?php
        $sideBarMenu = array();
        $sideBarMenu[0] = [
            'access' => 'dashboard',
            'label' => 'داشبورد',
            'url' => url('admin'),
            'icon' => 'server',
        ];
        $sideBarMenu[1] = [
            'access' => 'products',
            'label' => 'محصولات',
            'url' => '',
            'icon' => 'shopping-cart',
            'child' => [
                ['url' => url('admin/products'), 'label' => 'مدیریت محصولات', 'access' => 'products'],
                ['url' => url('admin/products/create'), 'label' => 'افزودن محصول', 'access' => 'products','accessValue'=>'add_edit_product'],
                ['url' => url('admin/colors'), 'label' => 'مدیریت رنگ ها', 'access' => 'colors'],
                ['url' => url('admin/brands'), 'label' => 'مدیریت برند ها', 'access' => 'brands'],
            ]
        ];
        $sideBarMenu[2] = [
            'access' => 'sliders',
            'label' => 'اسلایدر ها',
            'url' => '',
            'icon' => 'sliders',
            'child' => [
                ['url' => url('admin/sliders'), 'label' => 'مدیریت اسلایدر ها', 'access' => 'sliders'],
                ['url' => url('admin/sliders/create'), 'label' => 'افزودن اسلایدر', 'access' => 'sliders','accessValue'=>'add_edit_slider'],
            ]
        ];
        $sideBarMenu[3] = [
            'access' => 'incredible-offers',
            'label' => ' پیشنهادات شگفت انگیز',
            'url' => url('admin/incredible-offers'),
            'icon' => 'gift',
        ];
        $sideBarMenu[4] = [
            'access' => 'navigations',
            'label' => 'موقعیت ها',
            'url' => '',
            'icon' => 'navigation',
            'child' => [
                ['url' => url('admin/provinces'), 'label' => 'استان ها', 'access' => ''],
                ['url' => url('admin/provinces/create'), 'label' => 'افزودن استان', 'access' => ''],
                ['url' => url('admin/cities'), 'label' => 'شهر ها', 'access' => ''],
                ['url' => url('admin/cities/create'), 'label' => 'افزودن شهر', 'access' => ''],
            ]
        ];
        $sideBarMenu[5] = [
            'access' => 'submissions',
            'label' => 'مرسوله ها',
            'url' => '',
            'icon' => 'clipboard',
            'child' => [
                ['url' => url('admin/orders/submissions'), 'label' => 'همه ی مرسوله ها', 'access' => ''],
                ['url' => url('admin/orders/submissions/approved'), 'label' => 'مرسوله های تایید شده', 'access' => ''],
                ['url' => url('admin/orders/submissions/today'), 'label' => 'مرسوله های امروز', 'access' => ''],
                ['url' => url('admin/orders/submissions/ready'), 'label' => 'مرسوله های آماده ارسال', 'access' => ''],
                ['url' => url('admin/orders/submissions/posting/send'), 'label' => 'مرسوله های ارسال شده به پست', 'access' => ''],
                ['url' => url('admin/orders/submissions/posting/receive'), 'label' => 'مرسوله های آماده دریافت از پست', 'access' => ''],
                ['url' => url('admin/orders/submissions/delivered/customer'), 'label' => 'مرسوله های تحویل داده شده به مشتری', 'access' => ''],

            ]
        ];
        $sideBarMenu[6] = [
            'access' => 'discounts',
            'label' => 'تخفیف ها',
            'url' => '',
            'icon' => 'percent',
            'child' => [
                ['url' => url('admin/discount-codes'), 'label' => 'مدیریت کدهای تخفیف', 'access' => ''],
                ['url' => url('admin/discount-codes/create'), 'label' => 'افزودن کد تخفیف', 'access' => ''],
            ]
        ];

        $sideBarMenu[7] = [
            'access' => 'comments',
            'label' => 'دیدگاه ها',
            'url' => url('admin/comments'),
            'icon' => 'message-square',
        ];
        ?>

        <div class="sidebar-menu">
            <ul>
                @foreach($sideBarMenu as $menuItem)
                    @if(check_parent_menu_access($menuItem['access']))
                        <li class="sidebar-dropdown">
                            <a @if($menuItem['url']!='') href="{{$menuItem['url']}}" @endif>
                                <span data-feather={{$menuItem['icon']}}></span>
                                <span>{{$menuItem['label']}}</span>
                            </a>
                            @if(array_key_exists('child',$menuItem))
                                <div class="sidebar-submenu">
                                    <ul>
                                        @foreach($menuItem['child'] as $subMenuItem)
                                            @if(check_child_menu_access($subMenuItem))
                                                <li>
                                                    <a href="{{$subMenuItem['url']}}">{{$subMenuItem['label']}}</a>
                                                </li>
                                            @endif
                                        @endforeach
                                    </ul>
                                </div>
                    @endif
                    @endif
                @endforeach
            </ul>
        </div>
        <!-- sidebar-menu  -->
    </div>
    <!-- sidebar-content  -->
    <div class="sidebar-footer">
    </div>
</nav>
