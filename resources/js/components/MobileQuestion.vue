<template>
    <div>
        <transition name="fade">
            <div class="c_modal_container" style="display: block" v-if="showQuestions">
                <div class="c_modal_title" v-on:click="hideQuestionBox()">
                    <arrow-right-icon size="1.4x" class="ml-2"></arrow-right-icon>
                    پرسش های کاربران
                </div>
                <div>
                    <div class="c_wrapper">
                        <div class="v_comment_sort_list_box">
                            <div class="v_add_comment_box">
                                <span>پرسش خود را ثبت کنید</span>
                                <a class="add_new_btn_blue" v-on:click="newQuestion(0,'')">
                                    افزودن پرسش
                                </a>
                            </div>
                            <div class="v_users_comment_label">مرتب سازی بر اساس</div>
                            <ul class="v_comment_sort_list">
                                <li v-bind:class="[sortBy==1?'active':'']" v-on:click="setSortBy(1)">جدیدترین پرسش</li>
                                <li v-bind:class="[sortBy==2?'active':'']" v-on:click="setSortBy(2)">بیشترین پاسخ به
                                    پرسش
                                </li>
                                <li v-bind:class="[sortBy==3?'active':'']" v-on:click="setSortBy(3)">پرسش های شما</li>
                            </ul>
                        </div>
                    </div>
                    <div class="questions_list">
                        <div class="c_wrapper" v-for="(questionItem,key) in questionsList.data" v-bind:key="key">
                            <div class="question_title">
                                <span class="fa fa-question-circle	"></span>
                                <span>پرسش</span>
                                <span class="question_user">{{questionItem.get_user.name?questionItem.get_user.name:'ناشناس'}}</span>
                            </div>
                            <div class="question_content">
                                {{questionItem.content}}
                            </div>
                            <div class="question_action">
                                <a class="add_answer_btn" v-on:click="newQuestion(questionItem.id,questionItem.content)">
                                    به این پرسش پاسخ دهید
                                    <span class="fa fa-angle-left"></span>
                                </a>
                            </div>
                            <div class="answer_item" v-for="(answerItem,key2) in questionItem.get_answer"
                                 v-bind:key="key2">
                                <div class="faq_item_section">
                                    <div class="question_title">
                                        <span>پاسخ</span>
                                        <span class="question_user">{{answerItem.get_user.name}}</span>
                                    </div>
                                    <div class="question_content">
                                        {{answerItem.content}}
                                    </div>
                                    <div class="faq_footer">
                                        <div>
                                            <span>آیا این پاسخ برایتان مفید بود؟</span>
                                            <span class="like_btn" v-on:click="likeItem(answerItem,'like','questions')">بله {{answerItem.like}}</span>
                                            <span class="like_btn"
                                                  v-on:click="likeItem(answerItem,'dislike','questions')">{{answerItem.dislike}} خیر</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="vue_pagination">
                    <span :class="page<lastPage?'active':'in-active'" v-on:click="nextPage()">
                        <span class="fa fa-angle-right"></span>
                        بعدی
                    </span>
                        <div>
                            صفحه
                            {{page}}
                            از
                            {{lastPage}}
                        </div>
                        <span :class="page>1?'active':'in-active'" v-on:click="prevPage()">
                        قبلی
                        <span class="fa fa-angle-left"></span>
                    </span>
                    </div>
                </div>
            </div>
        </transition>
        <add-question ref="addQuestion"></add-question>
    </div>
</template>

<script>

    import {ArrowRightIcon} from 'vue-feather-icons';
    import AddQuestion from "./AddQuestion";
    export default {
        name: "MobileQuestion",
        props: ['product_id', 'product_title'],
        data() {
            return {
                showQuestions: false,
                sortBy: 1,
                questionsList: {data: []},
                page: 1,
                lastPage: 0,
            }
        },
        mounted() {
            const app = this;

            $(document).on('click', '#more_questions_open', function () {
                app.showQuestions = true;
                $("body").css('overflow', 'hidden');
                if (app.questionsList.data.length < 1) {
                    app.getQuestions(1);
                }
            })

            $(document).on('click', '#add_new_question', function () {
                app.newQuestion(0,'');
            })
        },
        components: {
            ArrowRightIcon,
            AddQuestion
        },
        methods: {

            getQuestions: function () {
                let url = this.$siteUrl + 'product/question/get/' + this.product_id + '?page=' + this.page + '&sortBy=' + this.sortBy;
                let formData = new FormData();
                $(".dg_loading_container").show();
                this.axios.get(url).then(response => {
                    if (response.data) {
                        this.questionsList = response.data;
                        this.lastPage = response.data.last_page;
                        console.log(response.data);
                        $(".dg_loading_container").hide();
                    }
                });

            },
            setSortBy: function (sort) {
                this.sortBy = sort;
                this.getQuestions(1);
            },
            likeItem: function (item, type, table) {
                let url = this.$siteUrl + 'product/' + type;
                let formData = new FormData();
                formData.append('table', table);
                formData.append('row_id', item.id);
                this.axios.post(url, formData).then(response => {
                    if (response.data === 'increment') {
                        if (type === 'like') {
                            item.like += 1;
                        } else if (type === 'dislike') {
                            item.dislike += 1;
                        }
                    } else if (response.data === 'decrement') {
                        if (type === 'like') {
                            item.like -= 1;

                        } else if (type === 'dislike') {
                            item.dislike -= 1;
                        }
                    }
                });
            },
            hideQuestionBox: function () {
                this.showQuestions = !this.showQuestions;
                $("body").css('overflow', 'scroll');
            },
            nextPage: function () {
                if (this.page < this.lastPage) {
                    this.page = this.page + 1;
                    this.getQuestions();
                }
            },
            prevPage: function () {
                if (this.page > 1) {
                    this.page = this.page - 1;
                    this.getQuestions();
                }
            },
            newQuestion:function(qId,questionText){
                this.$refs.addQuestion.updateData(qId,true,questionText,this.product_id)
            }
        }
    }
</script>

<style scoped>

</style>
