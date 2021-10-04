<template>
    <div>
        <div id="shopping">
            <div class="c_wrapper">
                <div class="check_address" v-if="!showNewAddress">
                    <div class="title">آدرس تحویل سفارش</div>
                    <div v-if="this.addressList.length==0" class="new_address_area address_item" data-toggle="modal"
                         data-target="#address_modal">ایجاد آدرس جدید
                    </div>
                    <div v-else>
                        <ul class="check_address_list" v-for="(i,key) in addressList" v-bind:key="key" v-if="i.is_selected==1">
                            <li>
                                <span>{{i.province.name}}</span>-<span>{{i.city.name}}</span>-<span>{{i.post_address}}</span>
                            </li>
                            <li class="check_address_username">
                                <user-icon size="1.2x"></user-icon>
                                <span>{{i.name}}</span>
                            </li>
                            <li class="check_address_edit ">
                                <span class="cursor_pointer"
                                      v-on:click="showNewAddress=true">تغییر یا ویرایش آدرس</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="showNewAddress">
                    <div class="d-flex justify-content-between">
                        <h6 class="title">آدرس تحویل سفارش را انتخاب کنید</h6>
                        <x-icon size="1.2x" class="cursor_pointer" v-on:click="showNewAddress=false"></x-icon>
                    </div>
                    <div class="new_address">
                        <div v-for="(address,key2) in addressList" v-bind:key="key2" class="address_item"
                             :class="[address.is_selected?'active':'']">
                            <p class="address_will_send">
                                <input
                                    type="radio"
                                    class="d-inline-block ml-2 address_check"
                                    name="selected_address"
                                    v-on:change="change_goal_address(address.id)"
                                    :checked="address.is_selected"
                                >
                                <span v-if="address.is_selected">به این آدرس ارسال می شود</span>
                                <span v-else>ارسال به این آدرس</span>
                            </p>


                            <ul class="address_item_ul">
                                <p class="post_address"><span>{{address.province.name}}</span>-<span>{{address.city.name}}</span>-<span
                                    class="long_text_overflow">{{address.post_address}}</span>
                                </p>
                                <li>
                                        <span><mail-icon size="1x"
                                                         class="ml-2"></mail-icon>{{address.post_code}}  </span>
                                </li>
                                <li>
                                    <span> <smartphone-icon size="1x" class="ml-2"></smartphone-icon>{{address.mobile}} </span>

                                </li>
                                <li>
                                    <span class="long_text_overflow"> <user-icon size="1x" class="ml-2"></user-icon>{{address.name}} </span>
                                </li>
                            </ul>
                            <ul class="address_list_actions">
                                <li><span v-on:click="update_address_confirm(address)"> ویرایش</span></li>
                                <li><span v-on:click="remove_address_confirm(address.id)">حذف</span></li>
                            </ul>
                        </div>
                        <div class="new_address_area address_item" data-toggle="modal" data-target="#address_modal">
                            <span>+</span>
                            <div>ایجاد آدرس جدید</div>
                        </div>
                    </div>
                </div>
            </div>
            <OrderingTime v-if="city_id>0" v-bind:city_id="city_id" @setSendData="getSendData"></OrderingTime>


            <div class="c_wrapper c_mobile_margin_bottom">
                <div class="cart_checkout">
                    <ul class="cart_checkout_ul">
                        <li class="cart_checkout_item">
                            <span class="checkout_text">قیمت کالا ها</span>
                            <span class="checkout_price">
                                <span class="price">{{send_data['total_price']}}</span>
                                <span class="tooman">تومان</span>
                            </span>
                        </li>
                        <li class="cart_checkout_item">
                            <span class="checkout_text">تخفیف کالا ها</span>
                            <span class="checkout_price">
                                <span class="price digi_color_red">{{send_data['cart_discount']}}</span>
                                <span class="tooman digi_color_red">تومان</span>
                            </span>
                        </li>
                        <li class="cart_checkout_item sum_price">
                            <span>جمع</span>
                            <span class="checkout_price">
                                <span class="price">{{send_data['cart_price']}}</span>
                                <span class="tooman">تومان</span>
                            </span>
                        </li>
                        <li class="cart_checkout_item">
                            <h6>هزینه ارسال</h6>
                        </li>
                        <li class="cart_checkout_item">
                            <span>
                          <truck-icon size="1.2x" class="digi_color_red"></truck-icon>
                             <span v-if="is_normal_send">   ارسال عادی</span>
                             <span v-else>   ارسال سریع</span>
                            </span>
                            <span class="checkout_price">
                                <span class="price" v-if="is_normal_send">{{send_data['normal_send_price']}}</span>
                                <span class="price" v-if="!is_normal_send">{{send_data['fast_send_price']}}</span>
                                <span class="tooman"
                                      v-if="send_data['normal_send_price']!=0 || send_data['fast_send_price']!=0">تومان</span>
                            </span>

                        </li>
                        <li class="cart_checkout_item sum_price">
                            <span>هزینه قابل پرداخت</span>
                            <span class="checkout_price cart_checkout_bold_item">
                                <span class="price cart_price checkout_final_price" v-if="is_normal_send">{{send_data['cart_price_with_normal_send']}}</span>
                                <span class="price cart_price checkout_final_price" v-if="!is_normal_send">{{send_data['cart_price_with_fast_send']}}</span>
                                <span class="tooman">تومان</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="c_checkout_submit">
            <span class="dg_main_button add_to_cart" v-on:click="goToPayment">ادامه فرایند خرید</span>
        </div>

        <AddressModal @addNewAddress="addAddressToList" ref="data"></AddressModal>

        <div class="modal fade bd-example-modal-sm" id="confirm_delete_address" tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="delete_modal_content">آیا مایل به حذف این آدرس هستید؟</div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-light delete_modal_btn" data-dismiss="modal">بستن
                            </button>
                            <button type="button" class="btn digi_btn_blue delete_modal_btn mr-1"
                                    v-on:click="remove_address">
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
    import {XIcon} from 'vue-feather-icons';
    import {TruckIcon} from 'vue-feather-icons';
    import {SmartphoneIcon} from 'vue-feather-icons';
    import {MailIcon} from 'vue-feather-icons';
    import {UserIcon} from 'vue-feather-icons';
    import OrderingTime from "./OrderingTime";

    import AddressModal from './AddressModal';

    export default {
        name: "MobileShopping",
        props: [
            'address_list',
            'cart_count',
        ],
        mounted() {
            this.addressList = this.address_list;
            $("#confirm_delete_address").modal('hide');
            this.get_selected_city();
        },
        components: {
            AddressModal,
            XIcon,
            TruckIcon,
            SmartphoneIcon,
            MailIcon,
            UserIcon,
            OrderingTime
        },
        data() {
            return {
                showNewAddress: false,
                addressList: {},
                selected: false,
                removeAddressId: '',
                city_id: 0,
                address_id: 0,
                is_normal_send: true,
                send_data: [],
            }
        },
        methods: {
            change_goal_address: function (addressId) {
                let url = this.$siteUrl + 'user/address/change-selected?address_id=' + addressId;
                this.axios.post(url).then(response => {
                    $('.address_item').removeClass('active');
                    let el = $('.address_check:checked').parent().parent().addClass('active');
                    this.addressList = response.data;
                    this.get_selected_city();
                });
            },
            remove_address_confirm: function (addressId) {
                $("#confirm_delete_address").modal('show');
                this.removeAddressId = addressId;
            }
            ,
            remove_address: function () {
                let url = this.$siteUrl + 'user/address/remove?address_id=' + this.removeAddressId;
                this.axios.delete(url).then(response => {
                    if (response.data != 'error') {
                        this.addressList = this.addressList.filter(item => item.id != this.removeAddressId);
                        $("#confirm_delete_address").modal('hide');
                        this.get_selected_city();
                    }
                });
            },
            addAddressToList: function (addresses) {
                this.addressList = addresses;
                this.get_selected_city();
            },
            update_address_confirm: function (address) {
                this.$refs.data.updateAddress(address, true);
                this.get_selected_city();
            },
            get_selected_city: function () {
                let selected = this.addressList.filter(item => item.is_selected == 1)[0];
                this.city_id = selected['city_id'];
                this.address_id = selected['id'];
            },
            getSendData: function (sendData, sendType) {
                this.is_normal_send = sendType;
                this.send_data = sendData;
            },
            goToPayment: function () {
                document.getElementById('address_id').value = this.address_id;
                document.getElementById('is_normal_send').value = this.is_normal_send;
                $("#go_to_payment").submit();
            }
        }
    }
</script>

<style scoped>

</style>
