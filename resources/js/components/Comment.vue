<template>
    <div class="v_comment_container">
        <div class="product_detail_header">
            <h2>نقد و بررسی اجمالی</h2>
            <div>{{product_title}} | 3/5 ({{commentCount}} نفر)</div>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="v_avg_scores_box">
                    <div class="c_comment_score_item" v-for="(score,key) in scores" v-bind:key="key">
                        <span class="c_score_label">{{getAvgScoreLabel(key)}}</span>
                        <div class="score_bar_outer">
                            <div class="score_bar_inner" v-bind:style="{width: score*25+'%' }"></div>
                        </div>
                        <span class="score_type">{{getAvgScoreType(score)}}</span>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="v_comment_note">
                    <h3>شما هم می‌توانید در مورد این کالا نظر بدهید.</h3>
                    <p>برای ثبت نظر، لازم است ابتدا وارد حساب کاربری خود شوید. اگر این محصول را قبلا از دیجی‌کالا خریده
                        باشید، نظر شما به عنوان مالک محصول ثبت خواهد شد.</p>
                    <a class="gray_btn" v-bind:href="$siteUrl+'product/comment/'+product_id">افزودن نظر جدید</a>
                </div>
            </div>
        </div>

        <div class="v_comment_sort_list_box">
            <div class="v_users_comment_label">نظرات کاربران</div>
            <ul class="v_comment_sort_list" data-title="مرتب سازی بر اساس:">
                <li v-bind:class="[sortBy==1?'active':'']" v-on:click="setSortBy(1)">نظر خریداران</li>
                <li v-bind:class="[sortBy==2?'active':'']" v-on:click="setSortBy(2)">مفیدترین نظرات</li>
                <li v-bind:class="[sortBy==3?'active':'']" v-on:click="setSortBy(3)">جدیدترین نظرات</li>
            </ul>
        </div>

        <div class="v_comments_container">
            <div class="v_comment_box" v-for="(comment,key) in commentList.data" v-bind:key="key">
                <div class="v_comment_aside">
                    <div class="v_comment_user">
                        {{comment.get_user_info?comment.get_user_info.first_name
                        + ' '+
                        comment.get_user_info.last_name
                        :'کاربر دیجی کالا'}}
                    </div>
                    <span class="comment_customer" v-if="comment.order_id>0">خریدار</span>
                </div>
                <div class="v_comment_content">
                    <h3 class="v_comment_title" v-if="comment.title!=null">{{comment.title}}</h3>
                    <p class="v_comment_info">
                        {{comment.title}}
                    </p>
                    <div class="v_positive_points">
                        <span>نقاط قوت</span>
                        <ul v-if="comment.advantage.length>0">
                            <li v-for="(point,key2) in comment.advantage" v-bind:key="key2" v-if="point">{{point}}</li>
                        </ul>
                    </div>

                    <div class="v_negative_points">
                        <span>نقاط قوت</span>
                        <ul v-if="comment.disadvantage.length>0">
                            <li v-for="(point,key3) in comment.disadvantage" v-bind:key="key3" v-if="point">{{point}}</li>
                        </ul>
                    </div>

                    <div class="faq_footer comment_footer">
                        <span class="faq_date">تاریخ انتشار</span>
                        <div>
                            <span>آیا این پرسش برایتان مفید بود؟</span>
                            <span class="like_btn" v-on:click="likeItem(comment,'like','comments')">بله {{comment.like}}</span>
                            <span class="like_btn" v-on:click="likeItem(comment,'dislike','comments')">{{comment.dislike}} خیر</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Comment",
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
            }
        },
        mounted() {
            const app = this;
            $("#show_comments").on('click', function () {
                if (app.commentList.data.length === 0) {
                    app.getComments(1);

                }
            })
        },
        methods: {
            getComments: function (page) {
                $(".dg_loading_container").show();
                let url = this.$siteUrl + 'shop/products/comments?page=' + page + '&product_id=' + this.product_id + '&order_by=' + this.sortBy;
                this.axios.get(url).then(response => {
                    this.commentList = response.data.comments;
                    this.scoreAvg = response.data.avg;
                    this.commentCount = response.data.count;
                    this.scores = response.data.scores;

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
            likeItem: function (item, type, table) {
                let url = this.$siteUrl + 'product/' + type;
                let formData = new FormData();
                formData.append('table', table);
                formData.append('row_id', item.id);
                this.axios.post(url, formData).then(response => {
                    if (response.data === 'increment') {
                        if(type==='like'){
                            item.like += 1;
                        }else if(type==='dislike'){
                            item.dislike += 1;
                        }
                    } else if (response.data === 'decrement') {
                        if(type==='like'){
                            item.like -= 1;

                        }else if(type==='dislike'){
                            item.dislike -= 1;
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
