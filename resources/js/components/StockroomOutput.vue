<template>
    <div class="stockroom_box">
        <div class="alert alert-danger" role="alert" v-if="errors.length">
            <ul class="errors_list">
                <li v-for="(e,key3) in errors" v-bind:key="key3">
                    {{e}}
                </li>
            </ul>
        </div>
        <div class="alert alert-danger" role="alert" v-if="serverError">
            {{serverError}}
        </div>

        <div class="row">
            <div class="col-sm-6 form-group">
                <label for="stockroom">انبار</label>
                <select v-model="stockroomId" id="stockroom" class="selectpicker">
                    <option value="0">انتخاب انبار</option>
                    <option v-for="(op,key) in stockrooms" v-bind:value="op.id" v-bind:key="key">{{op.name}}</option>
                </select>
            </div>
            <div class="col-sm-6 form-group">
                <label for="description">توضیحات</label>
                <textarea id="description" v-model="description" class="admin_textarea form-control"> </textarea>
            </div>

            <div class="col-sm-6 form-group">
                <label for="description">انتخاب محصولات</label>
                <button class="btn btn-outline-primary w-100" data-toggle="modal" data-target="#productsModal">لیست
                    محصولات
                </button>
            </div>
        </div>

        <div class="selected-products" v-if="this.selectedProducts.length>0">
            <h6>محصولات انتخاب شده:</h6>
            <div class="table-responsive-md table-responsive-lg table-responsive-xl table-responsive-sm">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <td>تصویر</td>
                        <td>نام</td>
                        <td>فروشنده</td>
                        <td>گارانتی</td>
                        <td>رنگ</td>
                        <td>تعداد</td>
                        <td>عملیات</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,key2) in selectedProducts" v-bind:key="key2">
                        <td>
                            <img
                                v-bind:src="$siteUrl+'files/thumbnails/'+item.get_product_warranty.get_product.image_url"
                                class="table_item_image">
                        </td>
                        <td>
                            {{item.get_product_warranty.get_product.title}}
                        </td>
                        <td>
                            {{item.get_product_warranty.get_seller.brand_name}}
                        </td>
                        <td>
                            {{item.get_product_warranty.get_warranty.name}}
                        </td>
                        <td v-if="item.get_product_warranty.get_color.id>0">
                                         <span v-bind:style="[{background:item.get_product_warranty.get_color.code}]"
                                               class="color_show">
                                              {{item.get_product_warranty.get_color.name}}
                                           </span>
                        </td>
                        <td>
                            <input type="text" v-model="selectedProducts[key2].product_number" class="form-control"/>
                        </td>
                        <td>
                            <button class="btn btn-outline-danger" v-on:click="removeFromSelectedList(key2)">حذف

                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <button class="btn btn-primary mt-3" v-on:click="sendData()">افزودن به انبار</button>

        <div class="modal fade" id="productsModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">لیست محصولات</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group col-sm-6 mb-3 p-0">
                            <input type="text" v-model="searchText" class="form-control search_inp"
                                   placeholder="نام محصول ...">
                            <button class="btn digi_btn_blue search_btn" v-on:click="getProductWarranty(1)">جستجو
                            </button>
                        </div>
                        <div class="table-responsive-md table-responsive-lg table-responsive-xl table-responsive-sm">
                            <table class="table  table-hover">
                                <tr v-for="(item,key) in productList.data" v-bind:key="key">
                                    <td>
                                        <img
                                            v-bind:src="$siteUrl+'files/thumbnails/'+item.get_product_warranty.get_product.image_url"
                                            class="table_item_image">
                                    </td>
                                    <td>
                                        {{item.get_product_warranty.get_product.title}}
                                    </td>
                                    <td>
                                        {{item.get_product_warranty.get_seller.brand_name}}
                                    </td>
                                    <td>
                                        {{item.get_product_warranty.get_warranty.name}}
                                    </td>
                                    <td v-if="item.get_product_warranty.get_color.id>0">
                                         <span v-bind:style="[{background:item.get_product_warranty.get_color.code}]"
                                               class="color_show">
                                              {{item.get_product_warranty.get_color.name}}
                                           </span>
                                    </td>
                                    <td>
                                        <input type="text" v-model="productCount[key]" class="form-control"/>
                                    </td>
                                    <td>
                                        <span v-if="checkInList(item.id)" class="digi_color_blue">افزوده شده</span>
                                        <button v-else v-on:click="addToSelectedProduct(item.id,key)"
                                                class="btn btn-outline-secondary">افزودن
                                        </button>
                                    </td>
                                </tr>
                            </table>
                            <Pagination :data="productList" @pagination-change-page="getProductWarranty"
                                        class="mt-3"></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "StockroomOutput",
        props: ['stockrooms'],
        data() {
            return {
                stockroomId: 0,
                description: '',
                productList: {data: []},
                searchText: '',
                productCount: [],
                selectedProducts: [],
                errors: [],
                serverError: ''
            }
        },
        mounted() {
            if (this.productList.data.length < 1) {
                this.getProductWarranty(1);
            }
        },
        methods: {
            getProductWarranty: function (page) {
                const url = this.$siteUrl + 'admin/stockrooms/output/get-products?page=' + page + '&stockroom_id=' + this.stockroomId + '&search=' + this.searchText;
                this.axios.get(url).then(response => {
                    console.log(response);
                    for (let i = 0; i < response.data.data.length; i++) {
                        this.productCount[i] = response.data.data[i].product_count;
                    }
                    this.productList = response.data;

                }).catch(error => {

                })
            },
            checkInList: function (id) {
                let result = false;
                this.selectedProducts.forEach(function (row) {
                    if (row.id == id) {
                        result = true;
                    }
                })
                return result;
            },
            addToSelectedProduct: function (id, key) {
                if (parseInt(this.productCount[key]) > 0) {
                    let item = this.productList.data[key];
                    item.product_number = this.productCount[key];
                    this.selectedProducts.push(item);
                    console.log(this.selectedProducts);
                }

            },
            removeFromSelectedList: function (key) {
                this.$delete(this.selectedProducts, key);
            },
            sendData: function () {
                let validation = this.validation();
                if (validation) {
                    let list = this.createList();
                    let formData = new FormData();
                    formData.append('list', list);
                    formData.append('stockroom_id', this.stockroomId);
                    formData.append('description', this.description);
                    formData.append('type', 'output');
                    const url = this.$siteUrl + 'admin/stockrooms/add-input';
                    this.axios.post(url, formData).then(response => {
                        if (response.data === 'success') {
                            this.serverError = '';
                            window.location = this.$siteUrl + 'admin/stockrooms/output/events';
                        } else {
                            this.serverError = 'خطایی در ثبت اطلاعات رخ داده است. مجددا تلاش کنید';
                        }
                    }).catch(error => {
                        this.serverError = 'خطایی در ثبت اطلاعات رخ داده است. مجددا تلاش کنید';
                    })
                }
            },
            validation: function () {
                let result = true;
                this.errors = [];
                if (this.stockroomId == 0) {
                    this.errors.push('لطفا انبار مورد نظر خود را انتخاب کنید');
                    result = false;
                }
                if (this.selectedProducts.length === 0) {
                    this.errors.push('لطفا محصولاتی که می خواهید به انبار اضافه شوند را انتخاب کنید');
                    result = false;
                }
                return result;
            },
            createList: function () {
                let string = '';
                this.selectedProducts.forEach(function (row) {
                    string = string + row.get_product_warranty.id + '_' + row.product_count + '-';
                })

                console.log(string);
                return string;
            }
        },
        watch: {
            stockroomId: function () {
                this.getProductWarranty(1);
            }
        }
    }
</script>

<style scoped>

</style>
