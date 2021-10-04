<template>
    <div class="h_cart_container">
        <div class="h_cart_header">
            <span>{{cartData.product_data && cartData.product_data.length}} کالا</span>
            <a class="h_cart_show" v-bind:href="$siteUrl+'show-cart'">مشاهده سبد خرید</a>
        </div>
        <div class="h_cart_item_list">
            <div v-for="(product,key) in cartData.product_data" v-bind:key="key" class="h_cart_item_box">
                <div class="h_cart_image_box">
                    <a v-bind:href="$siteUrl+'product/dgk-'+product.product_id+'/'+product.product_url">
                        <img v-bind:src="$siteUrl+'files/products/'+product.product_image">
                    </a>
                </div>
                <div class="h_cart_info">
                    <div class="h_cart_product_title">{{product.product_name}}</div>
                    <div class="h_cart_item_footer">
                        <div class="h_cart_color_box">
                            <span>{{product.product_count}} عدد</span>
                            <span class="ml-1 mr-1 d-inline-block">|</span>
                            <div class="h_cart_color" v-if="product.color_name">
                                <span class="color_circle" v-bind:style="{background:product.color_code}"></span>
                                <span>{{product.color_name}}</span>
                            </div>
                        </div>
                        <div>
                            <trash2-icon size="1.5x" class="custom-class"></trash2-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="h_cart_footer row">
            <div class="h_cart_price col-6">
                <span>مبلغ قابل پرداخت: </span>
                <span class="price">{{number_format(cartData.cart_price)}}</span>
                <span>تومان</span>
            </div>
            <a class="h_cart_submit_btn col-6" v-bind:href="$siteUrl+'shipping'">تکمیل خرید</a>
        </div>
    </div>
</template>

<script>
    import {Trash2Icon} from 'vue-feather-icons';
    export default {
        name: "HeaderSummaryCart",
        mounted() {
            this.getCartData();
        },
        data() {
            return {
                cartData: {product_data: []},
            }
        },
        components: {
            Trash2Icon
        },
        methods: {
            getCartData: function () {
                let url = this.$siteUrl + 'cart/get-data';
                this.axios.get(url).then(response => {
                    this.cartData = response.data;
                    console.log(this.cartData);
                })
            },
            number_format:function (number) {
               return  new Intl.NumberFormat('fa').format(number)
            }
        }
        // remove_cart_item: function (product) {
        //     this.selectedProduct = product;
        //     $("#confirm_delete_cart_item").modal('show');
        // },
        // delete_product: function () {
        //     let url = this.$siteUrl + 'site/cart/remove';
        //     let formData = new FormData()
        //     formData.append('product_id', this.selectedProduct.product_id);
        //     formData.append('warranty_id', this.selectedProduct.warranty_id);
        //     formData.append('color_id', this.selectedProduct.color_id);
        //     this.axios.post(url, formData).then(response => {
        //         if (response.data != 'error') {
        //             this.cartData = response.data;
        //             $("#confirm_delete_cart_item").modal('hide');
        //         }
        //     });
        // },
        // change_product_count: function (product) {
        //     let url = this.$siteUrl + 'site/cart/change-product-count';
        //     let formData = new FormData()
        //     formData.append('product_id',  product.product_id);
        //     formData.append('warranty_id',  product.warranty_id);
        //     formData.append('color_id',  product.color_id);
        //     formData.append('product_count', product.product_count);
        //     this.axios.post(url, formData).then(response => {
        //         if (response.data != 'error') {
        //             this.cartData = response.data;
        //             $("#confirm_delete_cart_item").modal('hide');
        //         }
        //     });
        // },

    }
</script>

<style scoped>

</style>
