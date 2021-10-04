<template>
    <div class="payment_content_sec">
        <div class="payment_gift_header" v-on:click="toggleShowGiftBox()">
            <h6>کد تخفیف و کارت هدیه</h6>
            <span class=" payment_gift_icon fa fa-angle-down"></span>
        </div>
        <div class="payment_gift_box" v-if="showGiftBox">
            <div class="digi_input_with_label">
                <label class="payment_gift_label">کد تخفیف</label>
                <div class="digi_input_with_btn_box payment_gift_inp">
                    <input type="text" v-model="discountCode" class="digi_input" placeholder="کد تخفیف را وارد کنید">
                    <span class="btn_into_digi_inp" v-on:click="setDiscountCode()">ثبت</span>
                </div>
                <span class="digi_input_error" v-if="discountError">{{discountError}}</span>
                <span class="digi_input_success" v-if="discountSuccess">{{discountSuccess}}</span>
            </div>

            <div class="digi_input_with_label mt-4">
                <label class="payment_gift_label">کارت هدیه</label>
                <div class="digi_input_with_btn_box payment_gift_inp">
                    <input type="text" v-model="giftCode" class="digi_input" placeholder="کد کارت هدیه را وارد کنید">
                    <span class="btn_into_digi_inp" v-on:click="setGiftCode()">ثبت</span>
                </div>
                <span class="digi_input_error" v-if="giftError">{{giftError}}</span>
                <span class="digi_input_success" v-if="giftSuccess">{{giftSuccess}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GiftDiscountCode",
        data() {
            return {
                showGiftBox: false,
                discountCode: '',
                giftCode: '',
                giftError: false,
                giftSuccess:false,
                discountError: false,
                discountSuccess:false,

            }
        },
        methods: {
            toggleShowGiftBox: function () {
                if (this.showGiftBox == true) {
                    this.showGiftBox = false;
                    $(".payment_gift_icon").removeClass('fa-angle-up').addClass('fa-angle-down');

                } else {
                    this.showGiftBox = true;
                    $(".payment_gift_icon").removeClass('fa-angle-down').addClass('fa-angle-up');

                }
            },
            setDiscountCode: function () {
                let formData = new FormData();
                formData.append('code', this.discountCode);
                let url = this.$siteUrl + 'payment/set-discount';
                this.axios.post(url, formData).then(response => {
                    if (response.data.status == 'success') {
                        this.discountError = false;
                        this.discountSuccess = 'تخفیف از هزینه سفارش کسر شد';
                        $("#payment_final_price").text(response.data.cartFinalPriceWithDiscount);
                        $("#payment_discount_value").text(response.data.discountValue);
                        $(".payment_checkout_gift_li").show();
                        console.log(response.data);

                    } else {
                        this.discountError = response.data;
                        this.discountSuccess=false;

                    }
                }).catch(error => {

                });
            },
            setGiftCode: function () {
                let formData = new FormData();
                formData.append('code', this.giftCode);
                let url = this.$siteUrl + 'payment/set-gift';
                this.axios.post(url, formData).then(response => {
                    if (response.data.status == 'success') {
                        $("#payment_final_price").text(response.data.cartFinalWithGiftCart);
                        $("#payment_gift_value").text(response.data.giftValue);
                        $(".payment_checkout_gift_li").show();
                        this.giftError = false;
                        this.giftSuccess = 'مبلغ کارت هدیه از هزینه سفارش کسر شد';
                    } else {
                        this.giftError = response.data;
                        this.giftSuccess=false;
                    }
                }).catch(error => {

                });
            }
        }
    }
</script>

<style scoped>

</style>
