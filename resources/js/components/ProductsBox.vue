<template>
    <div class="cp_products_container">
        <div class="cp_sort_box">
            <span class="fa fa-sort-amount-desc"></span>
            <span>مرتب سازی بر اساس: </span>
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
        <div class="cp_products_box" v-if="productsList.data.length>0">
            <div class="cp_product_item" v-for="(product,key) in productsList.data" v-bind:key="key">
                <!--                <a v-bind:href="$siteUrl+'product/dgk-'+product.id+'/'+product.product_url" class="cp_product_image_link">-->
                <div class="cp_product_image_box">
                    <img v-bind:src="$siteUrl+'files/products/'+product.image_url"/>
                    <ul class="cp_product_colors">
                        <li v-for="(productColor,key) in product.get_product_color" v-bind:key="key" v-if="key<3">
                            <span class="cp_product_color"
                                  v-bind:style="[{background:productColor.get_color.code}]"
                            ></span>
                        </li>
                        <li v-if="product.get_product_color.length>3">+</li>
                    </ul>
                    <div class="cp_compare_box"
                         v-on:click="addProductToCompareList(product)"
                         :class="[compareItemExists(product.id, 'key')?'cp_compare_box compare_check_active':'cp_compare_box']">
                        <div class="compare_check">
                            <span
                                :class="[compareItemExists(product.id, 'key')?'dg_checkbox active':'dg_checkbox']"></span>
                            <span>مقایسه</span>
                        </div>
                    </div>
                </div>

                <!--                </a>-->
                <div class="cp_product_info">
                    <a class="link_decor" v-bind:href="$siteUrl+'product/dgk-'+product.id+'/'+product.product_url">
                        <div class="cp_product_title">{{product.title}}</div>
                    </a>
                </div>
                <div class="product_count_limit"
                     v-if="product.get_first_product_price && product.get_first_product_price.product_number<8 && product.get_first_product_price.product_number>0">
                    تنها {{product.get_first_product_price.product_number}} عدد در انبار باقی مانده
                </div>
                <div class="cp_product_prices_box" v-if="product.status==1">
                    <div class="cp_product_old_price"
                         v-if="product.get_first_product_price.price1!==product.get_first_product_price.price2">
                        <del> {{number_format(product.get_first_product_price.price1)}}</del>
                        <span class="cp_product_discount_percent">٪{{calcDiscount(product.get_first_product_price.price1,product.get_first_product_price.price2)}}</span>
                    </div>
                    <div class="cp_product_price">
                        <span
                            class="cp_product_price_num">{{number_format(product.get_first_product_price.price2)}}</span>
                        <span class="cp_product_tooman">تومان</span>
                    </div>
                </div>
                <div v-else class="unavailable_product">
                    <div class="line"></div>
                    <span class="unavailable_text">ناموجود</span>
                </div>
                <div class="cp_seller_container">
                    <div class="cp_seller_box">
                        <img v-bind:src="$siteUrl+'files/upload/shop-icon.svg'"/>
                        <span>فروشنده:</span>
                        <span class="cp_seller_name">دیجی کالا</span>
                    </div>
                </div>
            </div>
        </div>
        <Pagination :data="productsList" @pagination-change-page="getProduct"></Pagination>

        <div class="cp_no_product_fount" v-if="tryToGetProduct && productsList.data.length==0">
            <div class="alert alert-warning">جستجو برای این ترکیب از فیلترها با هیچ کالایی هم‌خوانی نداشت.</div>
            <ul>
                <li>- تعدادی از فیلترها را حذف کنید.</li>
                <li>- در جستجو از عبارت‌های متداول‌تر استفاده کنید.</li>
            </ul>
        </div>


        <div class="cp_compare_list" v-if="compareList.length>0">
            <div class="cp_compare_item" v-for="(item,key2) in compareList" v-bind:key="key2">
                <img v-bind:src="$siteUrl+'files/products/'+item.image" class="cp_compare_item_image">
                <span>{{item.title}}</span>
                <span class="cp_remove_compare" v-on:click="removeCompareItem(item.productId)">X</span>
            </div>
            <span class="cp_compare_cancel" v-on:click="clearCompareList()">انصراف</span>
        </div>
        <a v-bind:href="compareLink" class="cp_compare_button" v-if="compareList.length>0">
            <span>مقایسه</span>
            <div>{{compareList.length}} کالا</div>
        </a>
    </div>
</template>

<script>
    export default {
        name: "ProductsBox",
        data() {
            return {
                requestUrl: '',
                productsList: {data: []},
                nouislider: null,
                minPrice: 0,
                maxPrice: 0,
                tryToGetProduct: false,
                searchString: '',
                sort: 21,
                compareList: [],
                compareLink: ''
            }
        },
        mounted() {
            this.requestUrl = window.location.href.replace(this.$siteUrl, this.$siteUrl + 'get-products/');
            const app = this;
            //اعمال فیلتر قیمت با کلیک بر اعمال فیلتر
            $(document).on('click', '#set_price_filter', function () {
                app.setPriceFilter();
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
            $(document).on('mouseover', '.cp_product_item', function () {
                app.mouseOverOnProduct(this);
            });
            $(document).on('mouseleave', '.cp_product_item', function () {
                app.mouseLeaveOfProduct(this);
            });

            $(document).on('mouseover', '.cp_compare_button', function () {
                $(".cp_compare_list").show();
            });

            $(document).on('mouseleave', '.cp_compare_list', function () {
                $(this).hide();
            });
            this.setCheckedFilterActive();
            this.setSearchString();
            this.setSortByAfterMount();
            this.getProduct(1);

        },
        methods: {
            getProduct: function (page) {
                $(".dg_loading_container").show();
                this.requestUrl = window.location.href.replace(this.$siteUrl, this.$siteUrl + 'get-products/');
                let params = this.requestUrl.split('?');
                let url = this.requestUrl;
                if (params[1] !== undefined) {
                    url = this.requestUrl + '&page=' + page;
                } else {
                    url = this.requestUrl + '?page=' + page;
                }
                this.axios.get(url).then(response => {
                    if(response.data['products'] && response.data['maxPrice']){
                        this.productsList = response.data['products'];
                        var maxPrice = response.data['maxPrice']['price'];
                        this.setRangeSlider(maxPrice);
                        if(response.data['count']!=undefined){
                            $("#products_count").text(response.data['count']+' کالا')
                        }
                    }
                    this.tryToGetProduct = true;
                    $(".dg_loading_container").hide();
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
                this.getProduct(1);

            },
            addUrlParam: function (key, value) {
                let params = new window.URLSearchParams(window.location.search);
                let url = window.location.href;
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
                this.updatePageUrl(url);
            },
            updatePageUrl: function (url) {
                //url با اطلاعات جدید جایگزین url قبلی می شود.
                window.history.pushState('data', 'title', url);
                //دریافت دوباره محصولات با فیلتر های اعمال شده. فیلتر ها در url موجود هستند
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
                let url = window.location.href;
                let index = url.split(attr).length - 1; //مشخص شدن ایندکس فیلتر در صورت داشتن چند مقدار
                let urlParams = url.split('?');
                if (urlParams[1] === undefined) {
                    url = url + '?' + attr + '[' + index + ']=' + value;
                } else {
                    url = url + '&' + attr + '[' + index + ']=' + value;
                }
                this.updatePageUrl(url);
                this.getProduct(1);
            },
            removeFilters: function (attr, value) {
                let url = window.location.href;
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
                this.updatePageUrl(url);
                this.getProduct(1);
            },
            setCheckedFilterActive: function () {
                let url = window.location.href;
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
                            this.getProduct(1);
                        }
                    } else {
                        this.searchString = string;
                        string = string.trim();
                        this.addUrlParam('string', string);
                        this.getProduct(1);
                    }
                }
            },
            removeUrlParam: function (key, value) {
                let params = new window.URLSearchParams(window.location.search);
                let url = window.location.href;
                if (params.get(key) !== undefined) {
                    value = encodeURIComponent(value);
                    url = url.replace('?' + key + '=' + value, '');
                    url = url.replace('&' + key + '=' + value, '');

                    const urlParams2 = url.split('?');
                    if (urlParams2[1] === undefined) {
                        url = url.replace('&', '?');
                    }
                    this.updatePageUrl(url);
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
                this.getProduct(1);
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
                this.getProduct(1);
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
                this.getProduct(1);
            },
            addFilterTag: function (data, attr, value) {
                if (attr !== 'has_product' && attr !== 'is_ready_to_shipment' && attr!=='sortBy') {
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
                this.getProduct(1);

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
                this.getProduct(1);
            },
            mouseOverOnProduct: function (el) {
                let seller = $('.cp_seller_container', el);
                let compare = $('.cp_compare_box', el);
                if (seller.css('display') == 'none') {
                    seller.show();
                }
                if (compare.css('display') == 'none') {
                    compare.show();
                }
            },
            mouseLeaveOfProduct: function (el) {
                let seller = $('.cp_seller_container', el);
                let compare = $('.cp_compare_box', el);
                if (seller.css('display') == 'block') {
                    seller.hide();
                }
                if (compare.css('display') == 'block') {
                    compare.hide();
                }
            },
            addProductToCompareList: function (product) {
                let isAlreadyExist = this.compareItemExists(product.id, 'key');
                if (isAlreadyExist.type == 'key') {
                    this.removeCompareItem(product.id);
                    this.$delete(this.compareList, isAlreadyExist.key);
                } else {
                    if (this.compareList.length < 4) {
                        this.compareList.push({
                            'productId': product.id,
                            'image': product.image_url,
                            'title': product.title
                        });
                        this.addProductToCompareLink(product.id);
                    }
                }

            },
            compareItemExists: function (id, typeOfCheck) {
                let result = false;
                for (let i = 0; i < this.compareList.length; i++) {
                    if (this.compareList[i].productId == id) {
                        if (typeOfCheck === 'bool') {
                            result = true;
                        } else {
                            result = {
                                type: 'key',
                                key: i
                            };
                        }
                    }
                }
                return result;

            },
            removeCompareItem: function (id) {
                let isAlreadyExist = this.compareItemExists(id, 'key');
                if (isAlreadyExist.type == 'key') {
                    this.$delete(this.compareList, isAlreadyExist.key);
                    this.compareLink = this.compareLink.replace('/dgk-' + id, '');
                }
            },
            addProductToCompareLink: function (productId) {
                if (this.compareLink === '') {
                    this.compareLink = this.$siteUrl + 'compare';
                }
                this.compareLink = this.compareLink + '/dgk-' + productId;
                console.log(this.compareLink);
            },
            clearCompareList:function(){
                this.compareList=[];
                this.compareLink='';
            }


        }
    }
</script>

<style scoped>

</style>
