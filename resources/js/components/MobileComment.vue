<template>
    <div class="c_modal_container" id="c_more_comments" v-on:scroll="checkScrollToPaginate">
        <div class="c_modal_title c_close_comments">
            <arrow-right-icon size="1.4x" class="ml-2"></arrow-right-icon>
            نظرات کاربران
        </div>
        <div>
            <div class="c_wrapper">
                <div class="v_comment_sort_list_box">
                    <div class="v_add_comment_box">
                        <span>نظر خود را ثبت کنید</span>
                        <a class="add_new_btn_blue">
                            <plus-icon size="1.4x"></plus-icon>
                            افزودن نظر
                        </a>
                    </div>
                    <div class="v_users_comment_label">مرتب سازی بر اساس</div>
                    <ul class="v_comment_sort_list">
                        <li v-bind:class="[sortBy==1?'active':'']" v-on:click="setSortBy(1)">نظر خریداران</li>
                        <li v-bind:class="[sortBy==2?'active':'']" v-on:click="setSortBy(2)">مفیدترین نظرات</li>
                        <li v-bind:class="[sortBy==3?'active':'']" v-on:click="setSortBy(3)">جدیدترین نظرات</li>
                    </ul>
                </div>
            </div>
            <div class="comments_container_box" ref="comments_box">
                <div class="c_wrapper" v-for="(comment,key) in commentList.data" v-bind:key="key">
                    <div class="v_comment_header">
                        <h3 class="v_comment_title" v-if="comment.title!=null">{{comment.title}}</h3>
                        <div class="v_comment_user"> {{getCommentUserName(comment)}}</div>
                    </div>
                    <div class="comment_content">
                        <p class="v_comment_info">
                            {{comment.title}}
                        </p>
                        <div class="v_positive_points">
                            <span>نقاط قوت</span>
                            <ul v-if="comment.advantage.length>0">
                                <li v-for="point in comment.advantage" v-bind:key="key" v-if="point">{{point}}</li>
                            </ul>
                        </div>

                        <div class="v_negative_points">
                            <span>نقاط قوت</span>
                            <ul v-if="comment.disadvantage.length>0">
                                <li v-for="point in comment.disadvantage" v-bind:key="key" v-if="point">{{point}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ArrowRightIcon} from 'vue-feather-icons';
    import {PlusIcon} from 'vue-feather-icons';

    export default {
        name: "MobileComment",
        props: ['product_id', 'product_title'],
        data() {
            return {
                commentList: {data: []},
                scoreAvg: 0,
                commentCount: 0,
                scores: [],
                scoreLabel: [
                    'کیفیت ساخت',
                    'نوآوری',
                    'سهولت استفاده',
                    'ارزش خرید نسبت به قیمت',
                    'امکانات و قابلیت ها',
                    'طراحی و ظاهر'
                ],
                sortBy: 3,
                pageNum: 1,
                commentBoxHeight: 0,
                lastPage: 0,
            }
        },
        mounted() {
            const app = this;
            $(document).on('click', '.c_more_comment_open', function () {
                if (app.commentList.data.length < 1) {
                    app.getComments(1);
                }
            })


        }, components: {
            ArrowRightIcon,
            PlusIcon
        },
        methods: {
            getComments: function () {
                const app=this;
                $(".dg_loading_container").show();
                let url = this.$siteUrl + 'shop/products/comments?page=' + this.pageNum + '&product_id=' + this.product_id + '&order_by=' + this.sortBy;
                this.axios.get(url).then(response => {
                    this.commentList = response.data.comments;
                    response.data['comments'].data.forEach(function (item) {
                        app.commentList.data.push(item)
                    })
                    this.lastPage = response.data['comments'].last_page;
                    console.log(response.data, this.lastPage);
                    this.scoreAvg = response.data.avg;
                    this.commentCount = response.data.count;
                    this.scores = response.data.scores;
                    this.$nextTick(function () {
                        this.commentBoxHeight =this.$refs.comments_box.clientHeight;
                    });

                    $(".dg_loading_container").hide();
                });
            },
            getAvgScoreLabel: function (key) {
                return this.scoreLabel[key];
            },
            getAvgScoreType: function (score) {
                if (score < 0.5) {
                    return 'خیلی بد';
                } else if (0.5 <= score && score < 1.5) {
                    return 'بد';
                } else if (1.5 <= score && score < 2.5) {
                    return 'معمولی';
                } else if (2.5 <= score && score < 3.5) {
                    return 'خوب';
                } else if (score >= 3) {
                    return 'خیلی خوب';
                }
            },
            setSortBy: function (sortBy) {
                this.sortBy = sortBy;
                this.getComments(1)
            },
            getCommentUserName: function (comment) {
                if (comment.get_user_info) {
                    return comment.get_user_info.first_name + ' ' + comment.get_user_info.last_name;
                } else {
                    return 'کاربر دیجی کالا';
                }
            },
            checkScrollToPaginate: function (event) {
                let scrollHeight=event.target.scrollTop;
                if (scrollHeight > (this.commentBoxHeight * .6) && this.commentBoxHeight > 200 && this.pageNum < this.lastPage) {
                    this.pageNum += 1;
                    this.getComments();
                }
                console.log(scrollHeight,this.commentBoxHeight);
            },

        }
    }
</script>

<style scoped>

</style>
