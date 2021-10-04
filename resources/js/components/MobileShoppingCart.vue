<template>
    <div>
        <div class="c_cart_container">
            <div class="cart_header">
                <div class="cart_header_tab" v-if="cartData.product_data && cartData.product_data.length">
                    <span class="cart_header_count" v-bind:data-count="cartData.product_data && cartData.product_data.length">تعداد کالا</span>
                </div>
            </div>
            <div  v-if="cartData.product_data && cartData.product_data.length>0">
                <div class="c_wrapper">
                    <div class="cart_content_wrapper">
                        <div class="cart_item" v-for="(product,key) in cartData.product_data" v-bind:key="key">
                            <div class="cart_p_image">
                                <a v-bind:href="$siteUrl+'product/dgk-'+product.product_id+'/'+product.product_url">
                                    <img v-bind:src="$siteUrl+'files/products/'+product.product_image">
                                </a>

                            </div>
                            <div class="cart_p_content">
                                <h6 class="cart_p_title">{{product.product_name}}</h6>
                                <div class="cart_p_detail cart_p_color" v-if="product.color_name">
                                    <span>{{product.color_name}}</span>
                                    <span class="color_circle" v-bind:style="{background:product.color_code}"></span>
                                </div>
                                <div class="cart_p_detail">
                                    <shield-icon size="1.2x"></shield-icon>
                                    <span>{{product.warranty_name}}</span>
                                </div>
                                <div class="cart_p_detail">
                                    <archive-icon size="1.2x"></archive-icon>
                                    <span>دیجی کالا</span>
                                </div>
                                <div class="cart_p_detail">
                                    <package-icon size="1.2x"></package-icon>
                                    <span>آماده ارسال از {{product.send_time}} روز دیگر</span>
                                </div>

                                <div class="cart_p_discount cart_p_detail" v-if="product.discount>0">
                                    <div>
                                        <span>تخفیف </span>
                                        <span class="price">{{nubmer_format(product.discount)}}</span>
                                        <span class="cart_tooman">تومان</span>
                                    </div>
                                </div>
                                <div class="cart_p_detail cart_item_action">
                                    <div class="d-flex align-items-center">
                                        <div class="remove_item" v-on:click="remove_cart_item(product)">
                                            <trash2-icon size="1.2x" class="custom-class"></trash2-icon>
                                        </div>
                                        <div class="cart_count_select">
                                            <select class="selectpicker" v-model="product.product_count"
                                                    v-on:change="change_product_count(product)">
                                                <option v-for="(i,key2) in product.product_allowed_count" v-bind:key="key2" v-bind:value="i">
                                                    {{i}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="cart_p_price">{{nubmer_format(product.price2)}}</span>
                                        <span class="cart_tooman">تومان</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="c_wrapper">
                    <div class="cart_checkout">
                        <ul class="cart_checkout_ul">
                            <li class="cart_checkout_item">
                                <span class="checkout_text">قیمت کالا ها</span>
                                <span class="checkout_price">
                                <span class="price">{{nubmer_format(cartData.total_price)}}</span>
                                <span class="cart_tooman">تومان</span>
                            </span>
                            </li>
                            <li class="cart_checkout_item">
                                <span class="checkout_text">تخفیف کالا ها</span>
                                <span class="checkout_price digi_color_red">
                                <span class="price digi_color_red">{{nubmer_format(cartData.cart_discount)}}</span>
                                <span class="cart_tooman digi_color_red">تومان</span>
                            </span>
                            </li>
                            <li class="cart_checkout_item cart_checkout_bold_item">
                                <span>جمع</span>
                                <span class="checkout_price">
                                <span class="price">{{nubmer_format(cartData.cart_price)}}</span>
                                <span class="cart_tooman">تومان</span>
                            </span>
                            </li>
                            <li class="cart_checkout_item">
                                <h6>هزینه ارسال</h6>
                            </li>
                            <li class="cart_checkout_item">
                            <span>
                          <truck-icon size="1.2x" class="digi_color_red"></truck-icon>
                               ارسال عادی
                            </span>
                                <span class="checkout_price">
                                <span class="price">{{nubmer_format(12500)}}</span>
                                <span class="cart_tooman">تومان</span>
                            </span>

                            </li>
                            <li class="cart_checkout_item cart_checkout_bold_item">
                                <span>هزینه قابل پرداخت</span>
                                <span class="checkout_price">
                                <span class="price cart_price">{{nubmer_format(cartData.cart_price)}}</span>
                                <span class="cart_tooman">تومان</span>
                            </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="empty_cart" v-else>
                <img v-bind:src="$siteUrl+'/images/empty-cart.png'">
                <h6>سبد خرید خالی است</h6>
                <span>می‌توانید برای مشاهده محصولات بیشتر به <a v-bind:href="$siteUrl" class="digi_dashed_link">صفحه اصلی</a> بروید</span>

            </div>
            <div class="c_checkout_submit">
                <a class="add_to_cart" v-bind:href="$siteUrl+'shipping'">ادامه فرایند خرید</a>
            </div>
        </div>
        <div class="modal fade bd-example-modal-sm" id="confirm_delete_cart_item" tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="delete_modal_content">آیا مایل به حذف این کالا هستید؟</div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-light delete_modal_btn" data-dismiss="modal"
                                    v-on:click="showDeleteConfirm=false">بستن
                            </button>
                            <button type="button" class="btn digi_btn_blue delete_modal_btn mr-1"
                                    v-on:click="delete_product">
                                تایید
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {AlertCircleIcon} from 'vue-feather-icons';
    import {TruckIcon} from 'vue-feather-icons';
    import {ShieldIcon} from 'vue-feather-icons';
    import {PackageIcon} from 'vue-feather-icons';
    import {ArchiveIcon} from 'vue-feather-icons';
    import {Trash2Icon} from 'vue-feather-icons';

    export default {
        name: "MobileShoppingCart",
        props: ['cart'],
        data() {
            return {
                showDeleteConfirm: false,
                cartData: {product_data: []},
                selectedProduct: null,
            }
        },
        components: {
            AlertCircleIcon,
            TruckIcon,
            ShieldIcon,
            PackageIcon,
            ArchiveIcon,
            Trash2Icon
        },
        mounted() {
            $("#confirm_delete_cart_item").modal('hide');
            this.cartData = this.cart;
        },
        methods: {
            remove_cart_item: function (product) {
                this.selectedProduct = product;
                $("#confirm_delete_cart_item").modal('show');
            },
            delete_product: function () {
                let url = this.$siteUrl + 'site/cart/remove';
                let formData = new FormData()
                formData.append('product_id', this.selectedProduct.product_id);
                formData.append('warranty_id', this.selectedProduct.warranty_id);
                formData.append('color_id', this.selectedProduct.color_id);
                this.axios.post(url, formData).then(response => {
                    if (response.data != 'error') {
                        this.cartData = response.data;
                        $("#confirm_delete_cart_item").modal('hide');
                    }
                });
            },
            change_product_count: function (product) {
                let url = this.$siteUrl + 'site/cart/change-product-count';
                let formData = new FormData()
                formData.append('product_id',  product.product_id);
                formData.append('warranty_id',  product.warranty_id);
                formData.append('color_id',  product.color_id);
                formData.append('product_count', product.product_count);
                this.axios.post(url, formData).then(response => {
                    if (response.data != 'error') {
                        this.cartData = response.data;
                        $("#confirm_delete_cart_item").modal('hide');
                    }
                });
            },
            nubmer_format:function (number) {
                return  new Intl.NumberFormat('fa').format(number)
            }
        }
    }

</script>

<style scoped>

</style>
