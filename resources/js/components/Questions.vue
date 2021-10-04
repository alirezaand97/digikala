<template>
    <div class="v_comment_container">
        <div class="product_detail_header">
            <h2>پرسش و پاسخ</h2>
        </div>
        <div class="new_faq_box">
            <div class="alert alert-success" v-if="saveQuestion">پرسش شما با موفقیت ثبت و پس از تایید منتشر خواهد شد
            </div>

            <div class="new_faq_headline"> پرسش خود را در مورد محصول مطرح نمایید</div>
            <textarea v-model="question" class="ui_text_area"></textarea>
            <div class="submit_question">
                <button class="ui_btn_gray" v-on:click="addNewQuestion(0)">ثبت پاسخ</button>
                <div class="faq_agreement" v-on:click="toggleSendEmail()">
                    <span v-bind:class="[sendEmail ? 'ui_checkbox active':'ui_checkbox']"></span>
                    <div class="faq_agreement_text">
                        اولین پاسخی که به پرسش من داده شد، از طریق ایمیل به من اطلاع دهید.
                        <br>
                        با انتخاب دکمه “ثبت پرسش”، موافقت خود را با قوانین انتشار محتوا در دیجی کالا اعلام می کنم.
                    </div>
                </div>
            </div>
        </div>
        <div class="v_comment_sort_list_box" v-if="questionsList.data.length>0">
            <ul class="v_comment_sort_list" data-title="مرتب سازی بر اساس:">
                <li v-bind:class="[sortBy==1?'active':'']" v-on:click="setSortBy(1)">جدیدترین پرسش</li>
                <li v-bind:class="[sortBy==2?'active':'']" v-on:click="setSortBy(2)">بیشترین پاسخ به پرسش</li>
                <li v-bind:class="[sortBy==3?'active':'']" v-on:click="setSortBy(3)">پرسش های شما</li>
            </ul>
        </div>
        <div class="product_question_list">
            <ul class="faq_list_box" v-for="(questionItem,key) in questionsList.data" v-bind:key="key">
                <li class="faq_question_item">
                    <div class="faq_item_section">
                        <div class="faq_item_header">
                            <span>پرسش</span>
                            <span class="faq_user">{{questionItem.get_user.name}}</span>
                        </div>
                        <div class="faq_content">
                            {{questionItem.content}}
                        </div>
                        <div class="faq_footer">
                            <span class="faq_date">تاریخ انتشار</span>
                            <span class="digi_dashed_link" v-on:click="setAnswerId(questionItem.id)">  به این پرسش پاسخ دهید ({{questionItem.answer_count}} پاسخ)</span>
                        </div>
                    </div>
                </li>

                <li class="faq_answer_item" v-if="answerId===questionItem.id">
                    <div class="faq_item_header">
                        <span>پاسخ</span>
                    </div>
                    <div class="faq_content fa_add_answer_box">
                        <div class="faq_answer_form">
                            <textarea v-model="question" class="ui_text_area"></textarea>
                            <div class="submit_question">
                                <button class="ui_btn_gray faq_submit_answer"
                                        v-on:click="addNewQuestion(questionItem.id)">
                                    ثبت پاسخ
                                </button>
                                <div class="faq_agreement faq_answer_agreement">
                                    <div class="faq_agreement_text">
                                        با انتخاب دکمه "ثبت پاسخ"، موافقت خود را با قوانین انتشار محتوا در دیجی‌کالا
                                        اعلام می‌کنم.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="faq_answer_rules">
                            <ul>
                                <li>
                                    <span>قبلا از این محصول استفاده کرده‌اید؟</span>
                                    <p>همیشه بهتر است، به سوالاتی پاسخ بدهید که سوال شخصی شما پیش از این بوده و با تجربه
                                        یا تحقیق پاسخ آن را بدست آورده اید.</p>
                                </li>
                                <li>
                                    <span>خوانا بنویسید</span>
                                    <p>یک ویرایش صحیح و کنترل املای صحیح کلمات اعتبار بیشتری به نقد و بررسی نوشته شده
                                        توسط شما می دهد. همچنین برای بالا رفتن خوانایی، فاصله بین پاراگراف ها و بالت
                                        گذاری را رعایت کنید.</p>
                                </li>
                                <li>
                                    <span>خوانندگان خود را آموزش دهید</span>
                                    <p>اگر سوال پرسیده شده مربوط به تخصص یا تجربه شماست، بدون تعصب، پاسخ مرتبط را به
                                        شیوه ای که خواننده بتواند از آن استفاده کند، ارائه دهید.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>

                <li class="faq_answer_item" v-for="(answerItem,key2) in questionItem.get_answer" v-bind:key="key2">
                    <div class="faq_item_section">
                        <div class="faq_item_header">
                            <span>پاسخ</span>
                            <span class="faq_user">{{answerItem.get_user.name}}</span>
                        </div>
                        <div class="faq_content">
                            {{answerItem.content}}
                        </div>
                        <div class="faq_footer">
                            <span class="faq_date">تاریخ انتشار</span>
                            <div>
                                <span>آیا این پاسخ برایتان مفید بود؟</span>
                                <span class="like_btn" v-on:click="likeItem(answerItem,'like','questions')">بله {{answerItem.like}}</span>
                                <span class="like_btn" v-on:click="likeItem(answerItem,'dislike','questions')">{{answerItem.dislike}} خیر</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <Pagination :data="questionsList" @pagination-change-page="getQuestions"></Pagination>

    </div>
</template>

<script>
    export default {
        name: "Questions",
        props: ['product_id', 'product_title'],
        data() {
            return {
                question: '',
                sendEmail: false,
                canRequest: true,
                saveQuestion: false,
                sortBy: 1,
                questionsList: {data: []},
                answerId: 0,
            }
        },
        mounted() {
            const app = this;
            $("#show_questions").on('click', function () {
                if (app.questionsList.data.length <1)
                    app.getQuestions(1);
            });
        },
        methods: {
            addNewQuestion: function (questionId) {
                if (this.canRequest && this.question.trim() !== "") {
                    let url = this.$siteUrl + 'product/question/add';
                    $(".dg_loading_container").show();
                    let formData = new FormData();
                    formData.append('content', this.question);
                    formData.append('send_email', this.sendEmail);
                    formData.append('product_id', this.product_id);
                    formData.append('question_id', questionId);
                    this.axios.post(url, formData).then(response => {
                        this.canRequest = true;
                        if (response !== 'error') {
                            this.saveQuestion = true;
                            this.question = '';
                            $(".dg_loading_container").hide();
                        }
                    }).catch(error => {
                        this.canRequest = true;
                        $(".dg_loading_container").hide();

                    })

                }
            }
            ,
            getQuestions: function (page) {
                let url = this.$siteUrl + 'product/question/get/' + this.product_id + '?page=' + page + '&sortBy=' + this.sortBy;
                let formData = new FormData();
                $(".dg_loading_container").show();
                this.axios.get(url).then(response => {
                    if (response.data) {
                        this.questionsList = response.data;
                        $(".dg_loading_container").hide();
                    }
                });

            }
            ,
            toggleSendEmail: function () {
                this.sendEmail = !this.sendEmail;
            }
            ,
            setAnswerId: function (id) {
                this.answerId = id;
            }
            ,
            setSortBy: function (sort) {
                this.sortBy = sort;
                this.getQuestions(1);
            }
            ,
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
            }
        }
    }
</script>

<style scoped>

</style>
