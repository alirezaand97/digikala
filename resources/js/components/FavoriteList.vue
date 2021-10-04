<template>
    <div class="favorite_container">
        <div class="row">
            <div class="col-6" v-for="(favorite,key) in favoriteList.data" v-bind:key="key">
                <div class="favorite_item">
                    <div class="favorite_item_img">
                        <img v-bind:src="$siteUrl+'files/products/'+favorite.get_product.image_url"/>
                    </div>
                    <div class="favorite_item_content">
                        <div class="favorite_item_header">
                            <div class="favorite_item_title">{{favorite.get_product.title}}</div>
                            <div class="dropdown">
                                <span class="fa fa-ellipsis-v options_dots" data-toggle="dropdown"></span>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" v-on:click="deleteFavorite(favorite.id,key)">حذف</a>
                                </div>
                            </div>
                        </div>
                        <div class="favorite_price_box">
                            <span class="favorite_price">{{number_format(favorite.get_product.price )}}</span>
                            <span class="tooman">تومان</span>
                        </div>
                        <a class="show_more_info"
                           v-bind:href="$siteUrl+'product/dgk-'+favorite.get_product.id+'/'+favorite.get_product.product_url">
                            مشاهده محصول
                            <span class="fa fa-angle-left"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <Pagination :data="favoriteList" @pagination-change-page="getFavoriteList"></Pagination>

        <div class="modal fade bd-example-modal-sm" id="delete_favorite" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="p-2 mt-4 mb-3"> آیا از حذف این محصول از لیست علاقه مندی ها مطمئن هستید؟
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-light delete_modal_btn ml-1" data-dismiss="modal">بستن
                            </button>
                            <button type="button" class="btn digi_btn_blue delete_modal_btn"
                                    v-on:click="deleteFavoriteConfirm()">تایید
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FavoriteList",
        data() {
            return {
                favoriteList: {data: []},
                selectedFavoriteId: 0,
                selectedFavoriteKey: 0,
            }
        },
        mounted() {
            this.getFavoriteList(1);
        },
        methods: {
            getFavoriteList: function (page) {
                const url = this.$siteUrl + 'user/profile/favorites/get-list?page=' + page;
                $(".dg_loading_container").show();
                this.axios.get(url).then(response => {
                    this.favoriteList = response.data;
                    $(".dg_loading_container").hide();
                });
            },
            deleteFavorite: function (id, key) {
                this.selectedFavoriteId = id;
                this.selectedFavoriteKey = key;
                $("#delete_favorite").modal('show');

            },
            number_format: function (number) {
                return new Intl.NumberFormat('fa').format(number)
            },
            deleteFavoriteConfirm: function () {
                const url = this.$siteUrl + 'user/profile/favorites/remove';
                let formData = new FormData();
                formData.append('favorite_id', this.selectedFavoriteId);
                $(".dg_loading_container").show();
                this.axios.post(url, formData).then(response => {
                    if (response.data === 'success') {
                        this.$delete(this.favoriteList.data, this.selectedFavoriteKey);
                    }
                    $("#delete_favorite").modal('hide');
                    $(".dg_loading_container").hide();
                }).catch(error => {
                    $("#delete_favorite").modal('hide');
                    $(".dg_loading_container").hide();
                });
            }
        }
    }
</script>

<style scoped>

</style>
