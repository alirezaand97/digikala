<template>
    <div class="">
        <div class="header_filters_box">
            <button class="filter_btn advanced_search_btn">
                جستجوی پیشرفته
                <sliders-icon size="1.3x" class="mr-1"></sliders-icon>
            </button>
            <button class="filter_btn " data-toggle="modal" data-target="#sort_modal">
                <span class="sort_text">پربازدید ترین </span>
                <filter-icon size="1.3x" class="mr-1"></filter-icon>
            </button>
        </div>
        <div class="cp_filter_box" id="cp_filter_box">
            <div class="cp_checked_filter_header">
                <span>فیلتر های اعمال شده</span>
                <span class="digi_color_red">حذف</span>
            </div>
            <div id="cp_checked_filter_box"></div>
        </div>



        <div class="cp_products_box" id="cp_products_list_box">
            <div class="cp_product_item" v-for="(product,key) in productsList.data" v-bind:key="key">
                <a v-bind:href="$siteUrl+'product/dgk-'+product.id+'/'+product.product_url"
                   class="cp_product_image_box">
                    <img v-bind:src="$siteUrl+'files/products/'+product.image_url"/>
                </a>
                <div class="cp_product_info">
                    <div class="cp_product_info">
                        <a class="link_decor"
                           v-bind:href="$siteUrl+'product/dgk-'+product.id+'/'+product.product_url">
                            <div class="product_item_name">{{product.title}}</div>
                        </a>
                    </div>
                    <div class="product_rating_box">
                        <div class="product_count_limit">
                            {{if_is_limit(product)?
                            'تنها'+ product.get_first_product_price.product_number +'عدد درانبار باقی مانده ' :
                            '' }}
                        </div>
                        <div class="c_rate_box">
                            ({{product.score_count ? product.score_count : 0}})
                            <span class="c_rate_number">
                                {{product.score_count?Math.floor(product.score / (product.score_count * 6)):0}}
                            </span>
                            <span class="fa fa-star c_action_icon c_rate"></span>
                        </div>
                    </div>

                    <div class="cp_product_prices_box" v-if="product.status==1">
                        <div class="c_product_item_discount"
                             v-if="product.get_first_product_price.price1!==product.get_first_product_price.price2">
                            <del class="c_product_item_discount_del">
                                {{number_format(product.get_first_product_price.price1)}}
                            </del>
                            <span class="c_product_item_discount_badge">٪{{calcDiscount(product.get_first_product_price.price1,product.get_first_product_price.price2)}}</span>
                        </div>
                        <div class="c_product_item_main_price">
                            <span class="c_product_item_main_price_num">{{number_format(product.get_first_product_price.price2)}}</span>
                            <span class="product_currency">تومان</span>
                        </div>
                    </div>
                    <div v-else class="unavailable_product">
                        <div class="line"></div>
                        <span class="unavailable_text">ناموجود</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="cp_no_product_fount" v-if="tryToGetProduct && productsList.data.length==0">
            <div class="alert alert-warning">جستجو برای این ترکیب از فیلترها با هیچ کالایی هم‌خوانی نداشت.</div>
            <ul>
                <li>- تعدادی از فیلترها را حذف کنید.</li>
                <li>- در جستجو از عبارت‌های متداول‌تر استفاده کنید.</li>
            </ul>
        </div>

        <div class="modal fade" id="sort_modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <span>مرتب سازی بر اساس</span>
                        <span class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">&times;</span>
                    </div>
                    <div class="modal-body">
                        <ul class="cp_sort_list">
                            <li class="cp_sort_item"
                                :class="sort==21?'cp_sort_active':'' "
                                v-on:click="setSort(21)"
                            >پربازدیدترین
                            </li>
                            <li class="cp_sort_item"
                                :class="sort==22?'cp_sort_active':''"
                                v-on:click="setSort(22)"
                            >محبوب ترین
                            </li>
                            <li class="cp_sort_item"
                                :class="sort==23?'cp_sort_active':''"
                                v-on:click="setSort(23)"
                            >جدیدترین
                            </li>
                            <li class="cp_sort_item"
                                :class="sort==24?'cp_sort_active':''"
                                v-on:click="setSort(24)"
                            >ارزان ترین
                            </li>
                            <li class="cp_sort_item"
                                :class="sort==25?'cp_sort_active':''"
                                v-on:click="setSort(25)"
                            >گران ترین
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {SlidersIcon} from 'vue-feather-icons';
    import {FilterIcon} from 'vue-feather-icons';

    export default {
        name: "MobileProductsBox",
        data() {
            return {
                requestUrl: '',
                search_url: window.location.href,
                productsList: {data: []},
                nouislider: null,
                minPrice: 0,
                maxPrice: 0,
                tryToGetProduct: false,
                searchString: '',
                sort: 21,
                pageNum: 1,
                productBoxHeight: 0,
                lastPage: 0,

            }
        },
        components: {
            SlidersIcon,
            FilterIcon
        },
        mounted() {
            this.requestUrl = window.location.href.replace(this.$siteUrl, this.$siteUrl + 'get-products/');
            const app = this;
            //اعمال فیلتر قیمت با کلیک بر اعمال فیلتر
            $(document).on('click', '#set_price_filter', function () {
                app.setPriceFilter();
                $("#c_advanced_filter_box").hide();
            });
            $(document).on('click', '.cp_filter_sub_item', function () {
                app.setFilterEvent(this);
            });
            $(document).on('keyup', '#cp_search_product', function (event) {
                app.searchProduct(event);
            });
            $(document).on('toggle', '#product_status', function (e, action) {
                app.setProductStatusFilter(event, action);
            });
            $(document).on('toggle', '#send_status', function (e, action) {
                app.setSendStatusFilter(event, action);
            });
            $(document).on('click', '.cp_checked_filter', function () {
                app.removeFilterTagOnBoxClick(this);
            });
            $(document).on('click', '.cp_has_product_filter', function () {
                app.removeHasProductFilter(this);
            });
            $(document).on('click', '.cp_ready_to_shipment_filter', function () {
                app.removeReadyToShipmentFilter(this);
            });

            $(document).on('click', '.advanced_filter_btn', function () {
                app.getProduct();
                $("#c_advanced_filter_box").hide();
                $("body").css('overflow', 'auto');
                app.initProductList();
            });

            $(document).on('click', '.cp_sort_item', function () {
                let text = $(this).text();
                $(".sort_text").text(text);
            });

            $(window).scroll(function (e) {
                app.checkScrollToPaginate($(document).scrollTop());
            })

            this.setCheckedFilterActive();
            this.setSearchString();
            this.setSortByAfterMount();
            this.getProduct();

        },
        methods: {
            getProduct: function () {
                const app = this;
                $(".dg_loading_container").show()
                this.updatePageUrl(this.search_url);
                this.requestUrl = this.search_url.replace(this.$siteUrl, this.$siteUrl + 'get-products/');
                let params = this.requestUrl.split('?');
                let url = this.requestUrl;
                if (params[1] !== undefined) {
                    url = this.requestUrl + '&page=' + this.pageNum;
                } else {
                    url = this.requestUrl + '?page=' + this.pageNum;
                }
                this.axios.get(url).then(response => {
                    if (response.data['products'] && response.data['maxPrice']) {

                        //صفحه بندی با اسکرول: هر بار آیتم های جدید باید به قبلی ها افزوده شوند
                        response.data['products'].data.forEach(function (item) {
                            app.productsList.data.push(item)
                        })
                        this.lastPage = response.data['products'].last_page;
                        //تعیین بیشترین قیمت برای جستجوی پیشرفته قیمت
                        var maxPrice = response.data['maxPrice']['price'];
                        this.setRangeSlider(maxPrice);
                        if (response.data['count'] != undefined) {
                            $("#products_count").text(response.data['count'] + ' کالا')
                        }

                    }
                    this.tryToGetProduct = true;
                    $(".dg_loading_container").hide();

                    this.$nextTick(function () {
                        this.productBoxHeight = $("#cp_products_list_box")[0].scrollHeight;
                    });
                });


            },
            number_format: function (number) {
                return new Intl.NumberFormat('fa').format(number)
            },
            calcDiscount: function (price1, price2) {
                return 100 - Math.floor((price2 / price1) * 100);
            },
            setRangeSlider: function (maxPrice) {
                if (this.nouislider == null) { //فقط در مان ساخت کامپوننت اسلایدر رو بسازیم و بعدا فقط آپدیت شه
                    var slider = document.querySelector('.price_range_slider');
                    this.nouislider = noUiSlider.create(slider, {
                        start: [0, maxPrice],
                        direction: 'rtl',
                        range: {
                            'min': 0,
                            'max': maxPrice
                        },

                        connect: true,
                        format: {
                            from: function (value) {
                                return parseInt(value);
                            },
                            to: function (value) {
                                return parseInt(value)
                            }
                        }
                    });
                    let app = this;
                    slider.noUiSlider.on('update', function (values, handle) {
                        app.minPrice = values[0];
                        app.maxPrice = values[1];
                        $("#min_price_range").text(app.number_format(values[0]));
                        $("#max_price_range").text(app.number_format(values[1]));
                    })

                    let search = new window.URLSearchParams(window.location.search);
                    const min = search.get('price[min]') != null ? parseInt(search.get('price[min]')) : 0;
                    if (search.get('price[max]') != null) {
                        slider.noUiSlider.updateOptions({
                            start: [min, parseInt(search.get('price[max]'))]
                        });
                    }
                    if (search.get('price[max]') == null && search.get('price[max]') != null) {
                        slider.noUiSlider.updateOptions({
                            start: [min, slider.noUiSlider.get()[1]]
                        });
                    }
                }
            },
            setPriceFilter: function () {
                //فیلتر و مقدارش را در url ثبت می کنیم تا با اجرای دوباره دریافت محصولات با url جدید محصولات فیلتر شوند
                this.addUrlParam('price[min]', this.minPrice);
                this.addUrlParam('price[max]', this.maxPrice);
                this.initProductList();
                this.getProduct();

            },
            addUrlParam: function (key, value) {
                //افزودن بازه قیمت، سرچ، اماده ارسال و موجود
                let params = new window.URLSearchParams(window.location.search);
                let url = this.search_url;
                value = encodeURIComponent(value);
                //اگر فیلتر درurl وحود داشت باید مقدار جدید جایگزین و در غیر اینصورت مقدار جدید وارد شود
                if (params.get(key) != null) {
                    let oldParam = key + '=' + encodeURIComponent(params.get(key));
                    let newParam = key + '=' + value;
                    url = url.replace(oldParam, newParam);
                } else {
                    let urlParams = url.split('?');
                    if (urlParams[1] === undefined) {
                        url = url + '?' + key + '=' + value;
                    } else {
                        url = url + '&' + key + '=' + value;
                    }
                }
                this.updateSearchUrl(url);
            },
            updatePageUrl: function (url) {
                //url با اطلاعات جدید جایگزین url قبلی می شود.
                window.history.pushState('data', 'title', url);
                //دریافت دوباره محصولات با فیلتر های اعمال شده. فیلتر ها در url موجود هستند
            },
            updateSearchUrl: function (url) {
                this.search_url = url;
                console.log('search_url', this.search_url);
            },
            setFilterEvent: function (el) {
                let data = $(el).attr('data');
                data = data.split('_');
                if ($('.dg_checkbox', el).hasClass('active')) {
                    $('.dg_checkbox', el).removeClass('active');
                    this.removeFilters(data[0], data[2]);
                    this.removeFilterTag(data[0], data[2]);

                } else {
                    $('.dg_checkbox', el).addClass('active');
                    this.addFilters(data[0], data[2]);
                    this.addFilterTag(data, data[0], data[2]);

                }
            },
            addFilters: function (attr, value) {
                //افزودن فیلتر مشخصات محصول شامل برند و رنگ و ...
                let url = this.search_url;
                let index = url.split(attr).length - 1; //مشخص شدن ایندکس فیلتر در صورت داشتن چند مقدار
                let urlParams = url.split('?');
                if (urlParams[1] === undefined) {
                    url = url + '?' + attr + '[' + index + ']=' + value;
                } else {
                    url = url + '&' + attr + '[' + index + ']=' + value;
                }
                this.updateSearchUrl(url);
            },
            removeFilters: function (attr, value) {
                let url = this.search_url;
                let urlParams = url.split('?');
                let h = 0;
                if (urlParams[1] !== undefined) {
                    if (urlParams[1].indexOf('&') > -1) {
                        let vars = urlParams[1].split('&');
                        for (let i in vars) {
                            let key = vars[i].split('=')[0];
                            let val = vars[i].split('=')[1];
                            let check = key.indexOf(attr);
                            if (check > -1 && val != value) { //فیلتر والد
                                key = key.replace(attr, '');
                                key = key.replace('[', '');
                                key = key.replace(']', '');
                                let oldString = attr + '[' + key + ']=' + val;
                                let newString = attr + '[' + h + ']=' + val;
                                url = url.replace(oldString, newString);
                                h++;
                            } else if (check > -1) { //فیلتر موردنظر
                                //حذف فیلتر مورد نظر
                                url = url.replace('&' + key + '=' + value, '');
                                url = url.replace('?' + key + '=' + value, '');
                            }
                        }
                    } else {
                        url = url.replace('?' + attr + '[' + 0 + ']=' + value, '');
                    }
                }
                const urlParams2 = url.split('?');
                if (urlParams2[1] === undefined) {
                    url = url.replace('&', '?');
                }
                this.updateSearchUrl(url);

            },
            setCheckedFilterActive: function () {
                let url = this.search_url;
                let params = url.split('?');
                if (params[1] !== undefined) {
                    if (params[1].indexOf('&') > -1) {
                        let vars = params[1].split('&');
                        for (let i in vars) {
                            let attr = vars[i].split('=')[0];
                            let value = vars[i].split('=')[1];
                            this.activeCheckBox(attr, value);

                        }
                    } else {
                        let attr = params[1].split('=')[0];
                        let value = params[1].split('=')[1];
                        this.activeCheckBox(attr, value);
                    }

                }
            },
            activeCheckBox: function (attr, value) {

                attr = attr.split('[');
                if (attr.length == 3) {
                    let data = attr[0] + '[' + attr[1] + '_param_' + value;
                    data = "'" + data + "'";
                    $('.cp_filter_sub_item[data=' + data + '] .dg_checkbox').addClass('active').parent().parent().parent().slideDown();
                    this.addFilterTag(data, attr[0] + '[' + attr[1], value);
                } else {
                    let data = attr[0] + '_param_' + value;
                    data = "'" + data + "'";
                    $('.cp_filter_sub_item[data=' + data + '] .dg_checkbox').addClass('active').parent().parent().parent().slideDown();
                    this.addFilterTag(data, attr[0], value);

                }
            },
            searchProduct: function (event) {
                if (event.keyCode === 13) {//اگر enter زد
                    let string = $('#cp_search_product').val();
                    if (string.trim().length === 0) { //برای پاک کردن سرچ. وقتی خالی باشد اینتر بزنیم سرچ را پاک می کند
                        if (this.searchString !== '') { //باید سرچ انجام شده باشد تا پاک شود. برای جلوگیری از سرچ الکی
                            this.removeUrlParam('string', this.searchString);
                            this.searchString = '';
                            this.initProductList();
                            this.getProduct();
                        }
                    } else {
                        this.searchString = string;
                        string = string.trim();
                        this.addUrlParam('string', string);
                        this.initProductList();
                        this.getProduct();
                    }
                    $("#c_advanced_filter_box").hide();
                    $("body").css('overflow', 'auto');
                }
            },
            removeUrlParam: function (key, value) {
                let params = new window.URLSearchParams(window.location.search);
                let url = this.search_url;
                if (params.get(key) !== undefined) {
                    value = encodeURIComponent(value);
                    url = url.replace('?' + key + '=' + value, '');
                    url = url.replace('&' + key + '=' + value, '');

                    const urlParams2 = url.split('?');
                    if (urlParams2[1] === undefined) {
                        url = url.replace('&', '?');
                    }
                    this.updateSearchUrl(url);
                }
            },
            setSearchString: function () {
                let params = new window.URLSearchParams(window.location.search);
                if (params.get('string') !== undefined) {
                    this.searchString = params.get('string');
                }
            },
            setSort: function (sortNum) {
                this.sort = sortNum;
                this.addUrlParam('sortBy', this.sort);
                this.initProductList();
                this.getProduct();
                $("#sort_modal").modal('hide');

            },
            setSortByAfterMount: function () {
                let params = new window.URLSearchParams(window.location.search);
                if (params.get('sortBy') !== undefined) {
                    if (params.get('sortBy') >= 21 && params.get('sortBy') <= 25) {
                        this.sort = params.get('sortBy');
                    }
                }
            },
            setProductStatusFilter: function (event, action) {
                if (action) {//اگر فعال باشد true است
                    this.addUrlParam('has_product', 1);
                    $("#cp_filter_box").show();
                    const html = '<div class="cp_checked_filter cp_has_product_filter"' +
                        '<span class="cp_checked_filter_text"> فقط کالاهای موجود</span>' +
                        '<span class="fa fa-close mr-1"></span>' +
                        '</div>';
                    $("#cp_checked_filter_box").append(html);

                } else {
                    $('.cp_has_product_filter').remove();

                    if ($("#cp_checked_filter_box div").length == 0) {
                        $("#cp_filter_box").hide();
                    }
                    this.removeUrlParam('has_product', 1);
                }
            },
            setSendStatusFilter: function (event, action) {
                if (action) {//اگر فعال باشد true است
                    this.addUrlParam('is_ready_to_shipment', 1);
                    $("#cp_filter_box").show();
                    const html = '<div class="cp_checked_filter cp_ready_to_shipment_filter"' +
                        '<span class="cp_checked_filter_text"> فقط کالاهای آماده ارسال</span>' +
                        '<span class="fa fa-close mr-1"></span>' +
                        '</div>';
                    $("#cp_checked_filter_box").append(html);
                } else {
                    $('.cp_ready_to_shipment_filter').remove();
                    if ($("#cp_checked_filter_box div").length == 0) {
                        $("#cp_filter_box").hide();
                    }
                    this.removeUrlParam('is_ready_to_shipment', 1);
                }
            },
            addFilterTag: function (data, attr, value) {
                if (attr !== 'has_product' && attr !== 'is_ready_to_shipment' && attr !== 'sortBy') {
                    //ایجاد تگ مربوط به موجود بودن و آماده ارسال در فایل shop.js انجام می شود و نباید اینجا انجام شود چون خالی بر می گرداند
                    $("#cp_filter_box").show();
                    data = data.toString().replace(",", '_').replace(",", '_');
                    data = data.toString().replace("'", '').replace("'", '');
                    let el = "li[data='" + data + "']";
                    let title = $(el).parent().parent().parent().find('.cp_filter_header>span').text();

                    const html = '<div class="cp_checked_filter" data-key="' + attr + '" data-value="' + value + '">' +
                        '<span class="cp_checked_filter_text">' +
                        title + ': ' + $(el).find('.cp_filter_item_title').text() +
                        '</span>' +
                        '<span class="fa fa-close mr-1"></span>' +
                        '</div>';

                    $("#cp_checked_filter_box").append(html);
                }


            },
            removeFilterTag: function (attr, value) {
                $('.cp_checked_filter[data-key="' + attr + '"][data-value="' + value + '"]').remove();
                if ($("#cp_checked_filter_box div").length == 0) {//اگر فیلتری نداشتیم باکسشو پنهان کن
                    $("#cp_filter_box").hide();
                }
            },
            removeFilterTagOnBoxClick: function (el) {
                let key = $(el).attr('data-key');
                let value = $(el).attr('data-value');
                $(el).remove();//حذف تگ
                let data = key + '_param_' + value;
                $('li[data="' + data + '"] .dg_checkbox').removeClass('active');
                this.removeFilters(key, value); //حذف از url
                if ($("#cp_checked_filter_box div").length == 0) {//اگر فیلتری نداشتیم باکسشو پنهان کن
                    $("#cp_filter_box").hide();
                }

                this.getProduct();
            },
            removeHasProductFilter: function (el) {
                $(el).remove();
                this.removeUrlParam('has_product', 1); //حذف از url
                if ($("#cp_checked_filter_box div").length == 0) {//اگر فیلتری نداشتیم باکسشو پنهان کن
                    $("#cp_filter_box").hide();
                }
                //ایونت کلیلک را باید از روش برداریم چون یه ایونت تاگل داره خودش
                $('#product_status').unbind('click');

                $('#product_status').toggles({
                    type: 'Light',
                    text: {'on': '', 'off': ''},
                    width: 45,
                    direction: 'rtl',
                    on: false
                });

                this.getProduct();


            },
            removeReadyToShipmentFilter: function (el) {
                $(el).remove();
                this.removeUrlParam('is_ready_to_shipment', 1); //حذف از url
                if ($("#cp_checked_filter_box div").length == 0) {//اگر فیلتری نداشتیم باکسشو پنهان کن
                    $("#cp_filter_box").hide();
                }
                $('#send_status').unbind('click');
                $('#send_status').toggles({
                    type: 'Light',
                    text: {'on': '', 'off': ''},
                    width: 45,
                    direction: 'rtl',
                    on: false
                });
                this.getProduct();

            },
            if_is_limit: function (product) {
                return product.get_first_product_price && product.get_first_product_price.product_number < 8 && product.get_first_product_price.product_number > 0
            },
            checkScrollToPaginate: function (scrollHeight) {
                console.log(this.pageNum);
                if (scrollHeight > (this.productBoxHeight * .6) && this.productBoxHeight > 200 && this.pageNum < this.lastPage) {
                    this.pageNum += 1;
                    this.getProduct();
                }
            },
            initProductList:function () {
                this.pageNum=1;
                this.productsList.data=[];
            }

        }
    }
</script>

<style scoped>
#cp_filter_box{
    display: none;
}
</style>
