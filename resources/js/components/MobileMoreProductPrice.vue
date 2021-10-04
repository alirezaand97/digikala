<template>
    <div class="c_modal_container" id="c_more_price_modal" v-if="product_warranties.length>1">
        <div class="c_modal_title c_close_other_price">
            <arrow-right-icon size="1.4x" class="ml-2"></arrow-right-icon>
            فروشندگان دیگر این کالا
        </div>
        <div class="variation_box">
            <div v-for="(variation,key) in product_warranties"
                 v-bind:key="key"
                 v-bind:class="[key==0?'variation_item variation_item_active':'variation_item']">
                <div class="variation_cell">{{variation.get_seller.brand_name}}</div>
                <div class="variation_cell">
                    <truck-icon size="1.4x" class="digi_color_red ml-2" style="color:gray"></truck-icon>
                    {{sendDay(variation.send_time)}}
                </div>
                <div class="variation_cell">
                    <shield-icon size="1.4x" class="ml-2" style="color:gray"></shield-icon>
                    {{variation.get_warranty.name}}
                </div>
                <div class="variation_cell justify-content-between">
                    <div><span class="variation_price">{{number_format(variation.price2)}}</span>
                        تومان
                    </div>
                    <a class="variation_add_card" v-on:click="addToCart(variation.get_warranty.id)">افزودن به سبد</a>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import {TruckIcon} from 'vue-feather-icons';
    import {ShieldIcon} from 'vue-feather-icons';
    import {ArrowRightIcon} from 'vue-feather-icons';

    export default {
        name: "MobileMoreProductPrice",
        props: ['product_id'],
        data() {
            return {
                color_id: 0,
                try_count: 0,
                product_warranties: []
            }
        },
        components: {
            TruckIcon,
            ShieldIcon,
            ArrowRightIcon
        },
        mounted() {
            this.color_id = $("#color_id").val();
            this.getProductWarranty();
            const app = this;
            $(document).on('click', '.color_li', function () {
                app.color_id = $(this).attr('data-id');
                app.getProductWarranty();

            })
        },
        methods: {
            getProductWarranty: function () {
                this.try_count = this.try_count + 1;
                let url = this.$siteUrl + 'api/get-prices/' + this.product_id + '/' + this.color_id;
                this.axios.post(url).then(response => {
                    this.try_count = 0;
                    this.product_warranties = response.data;
                    console.log(this.product_warranties);
                    if(this.product_warranties.length>1){
                        $(".c_other_seller").css('display','flex');
                    }else {
                        $(".c_other_seller").css('display','none');
                    }

                }).catch(error => {
                    if (this.try_count <= 2) {
                        this.getProductWarranty();//سه بار تلاش مجدد
                    }
                })

            },
            sendDay: function (day) {
                if (day == 0) {
                    return 'آماده ارسال';
                } else {
                    return 'ارسال از ' + day + ' روز کاری دیگر';
                }
            },
            number_format: function (number) {
                return new Intl.NumberFormat('fa').format(number)
            },
            addToCart: function (warranty_id) {
                $("#warranty_id").val(warranty_id);
                $("#add_to_cart_form").submit();
            }
        }
    }
</script>

<style scoped>

</style>
