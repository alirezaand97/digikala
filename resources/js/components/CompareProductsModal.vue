<template>
    <div class="modal fade  compare_products_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="comp_select_close">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="select_comp_header">
                    <div class="select_comp_search">
                        <input type="text" v-model="searchText" v-on:keyup.enter="searchProducts"
                               placeholder="کالای موردنظر خود را جستجو کنید...">
                    </div>
                    <div class="dropdown select_comp_dropdown">
                        <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                          {{this.selectTitle}}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" v-on:click="getBrandsProducts(0)">
                                همه برند ها
                            </a>
                            <a class="dropdown-item" v-for="(brand,key) in brands" v-bind:key="key" v-on:click="getBrandsProducts(brand)">
                                {{brand.get_brand.name}}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="comp_select_products_box">
                    <div v-for="(product,key2) in products.data"
                         class="comp_select_product_item"
                         v-on:click="addCompareProduct(product.id)"
                         v-bind:key="key2"
                    >
                        <img v-bind:src="$siteUrl+'files/products/'+product.image_url"/>
                        <p> {{product.title}}</p>
                        <span>{{product.price}} تومان</span>
                    </div>
                    <div v-if="products.data.length==0">
                        موردی یافت نشد
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: "CompareProductsModal",
        props: ['category'],
        mounted() {
            this.getCatBrands();
            this.getProducts(1);
        },
        data() {
            return {
                brands: [],
                products: {data: []},
                searchText: '',
                latestSearch: '',
                brandId: 0,
                selectTitle:'همه برند ها'
            }
        },
        methods: {
            getProducts: function (page) {
                $(".dg_loading_container").show();
                let url = this.$siteUrl + 'get-compare-products?page=' + page;
                let formData = new FormData;
                formData.append('cat_id', this.category);
                formData.append('brand_id', this.brandId);
                formData.append('search', this.searchText);
                this.axios.post(url, formData).then(response => {
                    if (response.data) {
                        this.products = response.data;
                    }
                    console.log(this.products);
                    $(".dg_loading_container").hide();
                }).catch(error => {

                });
            },
            getCatBrands: function () {
                $(".dg_loading_container").show();
                let url = this.$siteUrl + 'get-cat-brands';
                let formData = new FormData;
                formData.append('cat_id', this.category);
                this.axios.post(url, formData).then(response => {
                    if (response.data) {
                        this.brands = response.data;
                    }
                    $(".dg_loading_container").hide();
                }).catch(error => {

                });
            },
            searchProducts: function () {
                if (this.searchText.trim().length > 0) {
                    this.latestSearch = this.searchText;
                    this.getProducts(1);
                } else {
                    if (this.latestSearch != '') {
                        this.getProducts(1);
                    }
                }
            },
            getBrandsProducts: function (brand) {
                this.brandId = brand.id;
                this.selectTitle=brand.get_brand.name;
                this.getProducts(1);
            },
            addCompareProduct: function (id) {
                let url = window.location.href;
                if (url.split('dgk-' + id).length==1) {
                    url = url + '/dgk-' + id;
                    window.location = url;
                }
            }
        }
    }
</script>

<style scoped>

</style>
