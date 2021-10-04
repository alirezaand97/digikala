<template>
    <div>
        <div class="input-group col-sm-6 mb-3 p-0">
            <input type="text" v-model="search_value" class="form-control search_inp" placeholder="نام محصول ...">
            <button class="btn digi_btn_blue search_btn" v-on:click="get_product_warranty(1)">جستجو</button>
        </div>
        <div class="table-responsive-md table-responsive-lg table-responsive-xl table-responsive-sm">
            <table class="table table-bordered  table-hover">
                <thead>
                <tr>
                    <th>ردیف</th>
                    <th>عکس محصول</th>
                    <th>نام محصول</th>
                    <th>گارانتی</th>
                    <th>رنگ محصول</th>
                    <th>فروشنده</th>
                    <th>عملیات</th>

                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,key) in productWarranty.data">
                    <td>{{key}}</td>
                    <td><img v-bind:src="$siteUrl+'files/thumbnails/'+item.get_product.image_url"
                             class="table_item_image"/></td>
                    <td class="td_210">{{item.get_product.title}}</td>
                    <td class="td_210">{{item.get_warranty.name}}</td>
                    <td v-if="item.get_color.id>0">
            <span v-bind:style="[{background:item.get_color.code}]" class="color_show">
                {{item.get_color.name}}
            </span>
                    </td>
                    <td class="td_150">دیجی کالا</td>

                    <td>
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn digi_btn_outline_blue ml-2"
                                    v-on:click="show_select_product_modal(item.id,key)">انتخاب
                            </button>
                            <button class="btn digi_btn" v-if="item.is_offer"
                                    v-on:click="delete_offer(item.id,key)">حذف
                            </button>
                        </div>

                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <Pagination :data="productWarranty" @pagination-change-page="get_product_warranty" class="mt-3"></Pagination>

        <!-- show offer modal -->
        <div class="modal fade" id="show_product_modal" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="exampleModalLongTitle">افزودن به لیست محصولات شگفت انگیز</h6>
                        <span class="close_modal" aria-hidden="true" data-dismiss="modal"
                              aria-label="Close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-10 m-auto" v-if="server_validation_error">
                                <div class="alert alert-danger alert-dismissible fade show " role="alert">
                                    <ul class="list-unstyled mb-0 pr-0">
                                        <li v-for="(error,key) in server_validation_error" v-bind:key="key">
                                            {{error[0]}}
                                        </li>
                                    </ul>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"
                                            v-on:click="server_validation_error=false">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                            <div class="col-10 m-auto">
                                <label class="mt-2">هزینه محصول</label>
                                <Cleave :options="options" v-model="formValue.price1" class="form-control"></Cleave>
                                <span class="input_error" v-if="this.validation_errors.price1">{{this.validation_errors.price1}}</span>
                            </div>
                            <div class="col-10 m-auto">
                                <label class="mt-2">هزینه محصول برای فروش</label>
                                <Cleave :options="options" v-model="formValue.price2" class="form-control"></Cleave>
                                <span class="input_error" v-if="this.validation_errors.price2">{{this.validation_errors.price2}}</span>

                            </div>
                            <div class="col-10 m-auto">
                                <label class="mt-2">تعداد موجودی محصول</label>
                                <Cleave :options="options" v-model="formValue.product_number"
                                        class="form-control"></Cleave>
                                <span class="input_error" v-if="this.validation_errors.product_number">{{this.validation_errors.product_number}}</span>

                            </div>
                            <div class="col-10 m-auto">
                                <label class="mt-2">تعداد قابل سفارش در سبد خرید</label>
                                <Cleave :options="options" v-model="formValue.product_number_cart"
                                        class="form-control "></Cleave>
                                <span class="input_error" v-if="this.validation_errors.product_number_cart">{{this.validation_errors.product_number_cart}}</span>

                            </div>

                            <div class="col-10 m-auto">
                                <label class="mt-2">زمان شروع تخفیف</label>
                                <div class="d-flex align-items-center">
                                    <input type="text" id="pcal1" v-model="date1" class="form-control ml-2 " autocomplete="off"/>
                                </div>
                                <span class="input_error" v-if="this.validation_errors.date1">{{this.validation_errors.date1}}</span>

                            </div>
                            <div class="col-10 m-auto">
                                <label class="mt-2">زمان پایان تخفیف</label>
                                <div class="d-flex align-items-center">
                                    <input type="text" id="pcal2" v-model="date2" class="form-control ml-2 " autocomplete="off"/>
                                </div>
                                <span class="input_error" v-if="this.validation_errors.date2">{{this.validation_errors.date2}}</span>

                            </div>
                            <div class="col-10 m-auto">
                                <button type="button" v-on:click="add()"
                                        class="btn digi_btn mt-5 float-left">افزودن به لیست
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end show offer modal -->

        <!-- confirm deletee offer modal-->
        <div class="modal fade bd-example-modal-sm" id="delete_ofer_confirm" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="p-2 mt-4 mb-3"> آیا از حذف این محصول از لیست پیشنهاد های شگفت انگیز مطمئن هستی؟
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-light delete_modal_btn ml-1" data-dismiss="modal">بستن
                            </button>
                            <button type="button" class="btn digi_btn_blue delete_modal_btn"
                                    v-on:click="delete_offer_request()">تایید
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end confirm deletee offer modal-->


    </div>


</template>

<script>
    export default {
        name: "IncredibleOffers",
        data() {
            return {
                productWarranty: {data: []},
                page: 1,
                formValue: {
                    price1: '',
                    price2: '',
                    product_number: '',
                    product_number_cart: ''
                },
                date1: '',
                date2: '',
                options: {
                    numeral: true,
                },
                product_warranty_id: '',
                selected_key: '',
                show_modal: true,
                search_value: '',
                show_delete_confirm: false,
                validation_errors: {
                    price1: false,
                    price2: false,
                    product_number: false,
                    product_number_cart: false,
                    date1: false,
                    date2: false,
                },
                input_labels: {
                    price1: 'هزینه محصول',
                    price2: 'هزینه محصول برای فروش',
                    product_number: 'تعداد موجودی محصول',
                    product_number_cart: 'تعداد قابل سفارش در سبد خرید',
                    date1: 'زمان شروع تخفیف',
                    date2: 'زمان پایان تخفیف',
                },
                server_validation_error: false,

            }
        },
        mounted() {
            this.get_product_warranty(1);
        },
        methods: {
            get_product_warranty: function (page) {
                this.page = page;
                const url = this.$siteUrl + 'admin/ajax/product-warranty?page=' + page + '&search=' + this.search_value;
                this.axios.get(url).then(response => {
                    this.productWarranty = response.data;
                });
            },
            show_select_product_modal: function (id, key) {
                this.server_validation_error = false;
                this.product_warranty_id = id;
                this.selected_key = key;
                this.formValue.price1 = this.productWarranty.data[key].price1;
                this.formValue.price2 = this.productWarranty.data[key].price2;
                this.formValue.product_number = this.productWarranty.data[key].product_number;
                this.formValue.product_number_cart = this.productWarranty.data[key].product_number_cart;
                this.date1 = this.productWarranty.data[this.selected_key].offers_start_date != null ? this.productWarranty.data[this.selected_key].offers_start_date : '';
                this.date2 = this.productWarranty.data[this.selected_key].offers_end_date != null ? this.productWarranty.data[this.selected_key].offers_end_date : '';
                $('#show_product_modal').modal('show');


            }
            ,
            add: function () {
                this.date1 = $("#pcal1").val();
                this.date2 = $("#pcal2").val();
                let validation = this.validationForm();
                if (validation) {

                    const formData = new FormData();
                    formData.append('price1', this.formValue.price1);
                    formData.append('price2', this.formValue.price2);
                    formData.append('product_number', this.formValue.product_number);
                    formData.append('product_number_cart', this.formValue.product_number_cart);
                    formData.append('start_date', this.date1);
                    formData.append('end_date', this.date2);
                    const url = this.$siteUrl + 'admin/incredible-offers/add/' + this.product_warranty_id;
                    this.axios.post(url, formData).then(response => {
                        if (response.data == 'success') {
                            this.productWarranty.data[this.selected_key].is_offer = 1;
                            this.productWarranty.data[this.selected_key].price1 = this.formValue.price1;
                            this.productWarranty.data[this.selected_key].price2 = this.formValue.price2;
                            this.productWarranty.data[this.selected_key].product_number = this.formValue.product_number;
                            this.productWarranty.data[this.selected_key].product_number_cart = this.formValue.product_number_cart;
                            this.productWarranty.data[this.selected_key].offers_start_date = this.date1;
                            this.productWarranty.data[this.selected_key].offers_end_date = this.date2;
                            $('#show_product_modal').modal('hide');
                        } else if (response.data.type == 'server_error') {
                            this.server_validation_error = response.data.errors;
                        }
                    });
                }

            },
            delete_offer: function (id, key) {
                this.product_warranty_id = id;
                this.selected_key = key;
                $('#delete_ofer_confirm').modal('show');
            },
            delete_offer_request: function () {
                const url = this.$siteUrl + 'admin/incredible-offers/delete/' + this.product_warranty_id;
                this.axios.post(url).then(response => {
                    if (response.data != 'error') {
                        $('#delete_ofer_confirm').modal('hide');
                        this.productWarranty.data[this.selected_key].is_offer = 0;
                        this.productWarranty.data[this.selected_key].price1 = response.data.price1;
                        this.productWarranty.data[this.selected_key].price2 = response.data.price2;
                        this.productWarranty.data[this.selected_key].product_number = response.data.product_number;
                        this.productWarranty.data[this.selected_key].product_number_cart = response.data.product_number_cart;
                        this.productWarranty.data[this.selected_key].offers_start_date = '';
                        this.productWarranty.data[this.selected_key].offers_end_date = '';
                    }
                });
            },
            validationForm: function () {

                let hasNotError = true;
                for (let input in this.formValue) {
                    if (this.formValue[input] == '' || this.formValue[input] == null) {
                        this.validation_errors[input] = this.input_labels[input] + ' نمی تواند خالی باشد';
                        hasNotError = false;
                    }
                }
                if (this.date1 == '' || this.date1 == null) {
                    this.validation_errors.date1 = this.input_labels.date1 + ' نمی تواند خالی باشد';
                    hasNotError = false;
                }
                if (this.date2 == '' || this.date2 == null) {
                    this.validation_errors.date2 = this.input_labels.date2 + ' نمی تواند خالی باشد';
                    hasNotError = false;
                }
                return hasNotError;
            }

        }


    }
</script>

<style scoped>

</style>
