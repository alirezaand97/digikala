<template>
    <div class="profile_address_container">
        <div v-for="(address,key) in addressList.data" v-bind:key="key" class="profile_address_item">
            <ul class="profile_address_list">
                <p class="profile_post_address">
                    <span>{{address.province.name}}</span>-<span>{{address.city.name}}</span>-<span>{{address.post_address}}</span>
                </p>
                <li class="profile_address_info">
                    <span>
                        <mail-icon size="1x" class="ml-2"></mail-icon>{{address.post_code}}
                    </span>
                </li>
                <li class="profile_address_info">
                    <span>
                        <smartphone-icon size="1x" class="ml-2"></smartphone-icon>{{address.mobile}}
                    </span>
                </li>
                <li class="profile_address_info">
                    <span class="long_text_overflow">
                        <user-icon size="1x" class="ml-2"></user-icon>{{address.name}}
                    </span>
                </li>
            </ul>
            <ul class="profile_address_actions">
                <li><span v-on:click="update_address_confirm(address)"> ویرایش</span></li>
                <li><span v-on:click="remove_address_confirm(address.id)">حذف</span></li>
            </ul>
        </div>
        <div class="profile_add_address" data-toggle="modal" data-target="#address_modal">
            <span>اضافه کردن آدرس جدید</span>
            <span class="fa fa-angle-left"></span>
        </div>

        <Pagination :data="addressList" @pagination-change-page="getUserAddressList" class="mt-3"></Pagination>

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

    import AddressModal from './AddressModal';

    export default {
        name: "ProfileUserAddress",
        components: {
            AddressModal,
            XIcon,
            TruckIcon,
            SmartphoneIcon,
            MailIcon,
            UserIcon,
        },
        data() {
            return {
                addressList: {data: []},
            }
        },
        mounted() {
            this.getUserAddressList(1);
            $("#confirm_delete_address").modal('hide');

        },
        methods: {
            getUserAddressList: function (page) {
                let url = this.$siteUrl + 'user/address-list/?page=' + page;
                $(".dg_loading_container").show();
                this.axios.get(url).then(response => {
                    this.addressList = response.data;
                    $(".dg_loading_container").hide();
                })
            },
            addAddressToList: function (addresses) {
                this.addressList.data = addresses;
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
                        this.addressList.data = this.addressList.data.filter(item => item.id != this.removeAddressId);
                        $("#confirm_delete_address").modal('hide');
                    }
                });
            },
            update_address_confirm: function (address) {
                this.$refs.data.updateAddress(address, true);
            },
        }
    }
</script>

<style scoped>
</style>
