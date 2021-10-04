<template>
    <div class="c_wrapper">
        <div class="ordering_time_header">
            <div class="title">آدرس تحویل سفارش</div>
            <div class="shipment_nav">
                <div :class="[normalSend?'active':'','shipment_pill_tab']" v-on:click="set_send_type('normal')">
                    <p>
                        <briefcase-icon size="1.1x" class="custom-class"></briefcase-icon>
                        <span class="pil_title">ارسال عادی</span></p>
                    <span class="shipment_pil_des">ارسال همه مرسوله ها پس از آماده شدنشان</span>
                </div>
                <div v-if="multiTypeSending" :class="[fastSend?'active':'','shipment_pill_tab']"
                     v-on:click="set_send_type('fast')">
                    <p>
                        <zap-icon size="1.1x" class="custom-class"></zap-icon>
                        <span class="pil_title">ارسال سریع</span></p>
                    <span class="shipment_pil_des">ارسال هر مرسوله به محض آماده شدن</span>
                </div>
            </div>
        </div>
        <!--      ارسال سریع  -->
        <div v-if="fastSend" class="shipping_time_content">
            <div class="shipment_item" v-for="(delivery,key) in orderingData.delivery_order_interval" v-bind:key="key">
                <h6 class="">مرسوله {{key+1}} از {{ orderingData.delivery_order_interval.length}}</h6>
                <div class="shipment_product_slider">
                    <swiper ref="mySwiper" :options="swiperOption">
                        <swiper-slide v-for="(pId,pwId) in orderingData.product_id_array[key]" v-bind:key="pwId">
                            <img
                                class="shipment_product_slider_img"
                                v-bind:src="$siteUrl+'files/products/'+orderingData.cart_product_data[pId+'_'+pwId].product_image">

                            <p class="shiment_item_product_name">
                                {{orderingData.cart_product_data[pId+'_'+pwId].product_name}}
                            </p>
                            <div class="shipment_color_circle">
                                <span
                                    class="color_name">{{orderingData.cart_product_data[pId+'_'+pwId].color_name}}</span>
                                <span class="color_circle"
                                      v-bind:style="{background:orderingData.cart_product_data[pId+'_'+pwId].color_code}"></span>
                            </div>

                        </swiper-slide>
<!--                        <div class="swiper-pagination" slot="pagination"></div>-->
<!--                        <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--                        <div class="swiper-button-next" slot="button-next"></div>-->
                    </swiper>
                </div>
                <div class="shipment_time_info">
                    <p> بازه ارسال مرسوله از {{delivery.minDayslabels}} تا {{delivery.maxDayslabels}} </p>
                    <span>هزینه ارسال: <span class="price">{{delivery.send_fast_price}}</span></span>
                </div>
            </div>
        </div>
        <div v-if="normalSend" class="shipping_time_content">
            <div class="shipment_product_slider">
                <swiper ref="mySwiper" class="swiper" :options="swiperOption">
                    <swiper-slide v-for="(product,key3) in orderingData.cart_product_data" v-bind:key="key3">
                        <img
                        class="shipment_product_slider_img"
                        v-bind:src="$siteUrl+'files/products/'+product.product_image">

                        <p class="shiment_item_product_name">
                            {{product.product_name}}
                        </p>
                        <div class="shipment_color_circle">
                                <span
                                    class="color_name">{{product.color_name}}</span>
                            <span class="color_circle"
                                  v-bind:style="{background:product.color_code}"></span>
                        </div>

                    </swiper-slide>
<!--                    <div class="swiper-pagination" slot="pagination"></div>-->
<!--                    <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--                    <div class="swiper-button-next" slot="button-next"></div>-->
                </swiper>
            </div>
            <div class="shipment_time_info">
                <p> بازه ارسال مرسوله از {{orderingData.normal_min_send_day}} تا
                    {{orderingData.normal_max_send_day}} </p>
                <span>هزینه ارسال: <span class="price">{{orderingData.normal_send_price_label}}</span></span>
            </div>
        </div>
    </div>
</template>

<script>
    import {ZapIcon, BriefcaseIcon} from 'vue-feather-icons'
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
    import 'swiper/swiper-bundle.css';
    export default {
        name: "OrderingTime",
        props: ['city_id'],
        components: {
            ZapIcon,
            BriefcaseIcon,
            Swiper,
            SwiperSlide
        },

        data() {
            return {
                normalSend: true,
                fastSend: false,
                orderingData: [],
                multiTypeSending: false,
                swiperOption: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    slidesPerGroup: 3,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }

            }
        },
        mounted() {
            this.get_ordering_time();
        }
        , methods: {
            set_send_type: function (type) {
                if (type == 'fast') {
                    this.normalSend = false;
                    this.fastSend = true;

                } else {
                    this.normalSend = true;
                    this.fastSend = false;
                }
            },
            get_ordering_time: function () {
                let url = this.$siteUrl + 'shipping/get-send-data?city_id=' + this.city_id;
                this.axios.get(url).then(response => {
                    if (response.data != 'error') {
                        this.orderingData = response.data;
                    }
                    //اگر روزهای ارسال بیش از یک باشد
                    if (this.orderingData.delivery_order_interval.length > 1) {
                        this.multiTypeSending = true;
                    }
                    this.$emit('setSendData', this.orderingData,this.normalSend);
                });
            },
        },
        watch: {
            city_id: function (newValue,oldValue ) {
                this.get_ordering_time();
            },
            normalSend:function (newValue,oldValue) {
                this.$emit('setSendData', this.orderingData,this.normalSend);
            }
        }
    }
</script>

<style scoped>
    .swiper-button-next,.swiper-button-prev{
        border-radius: 100%;
        background: #ffffff6f;
        width: 40px;
        height: 40px;
        box-shadow:1px 1px 6px 0 #d5d5d5;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .swiper-button-prev:after, .swiper-button-next:after {
        color: #6b6b6b;
        font-size: 1.15rem;
        font-weight: 600;
    }
</style>
