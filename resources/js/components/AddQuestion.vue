<template>
    <transition name="fade">
        <div class="c_modal_container" style="display: block" v-if="showBox">
            <div class="c_modal_title" v-on:click="hideQuestionBox()">
                <arrow-right-icon size="1.4x" class="ml-2"></arrow-right-icon>
                {{getLabel()}} جدید
            </div>
            <div class="c_wrapper">
                <div class="alert alert-success" v-if="saveQuestion">{{getLabel()}} شما با موفقیت ثبت و پس از تایید
                    منتشر خواهد شد
                </div>

                <div class="new_faq_headline" v-if="questionId===0"> پرسش خود را در مورد محصول مطرح نمایید</div>
                <div v-if="questionText" class="question_review">{{questionText}}</div>
                <textarea v-model="question" class="ui_text_area"></textarea>
                <div class="submit_question">
                    <span class="ui_btn_gray d-inline-block" v-on:click="addNewQuestion(questionId)">ثبت {{getLabel()}}</span>
                    <div class="faq_agreement" v-on:click="toggleSendEmail()">
                        <span v-bind:class="[sendEmail ? 'ui_checkbox active':'ui_checkbox']"></span>
                        <div class="faq_agreement_text">
                            اولین پاسخی که به پرسش من داده شد، از طریق ایمیل به من اطلاع دهید.
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </transition>
</template>

<script>

    import {ArrowRightIcon} from 'vue-feather-icons';

    export default {
        name: "َAddQuestion",
        data() {
            return {
                question: '',
                sendEmail: false,
                canRequest: true,
                saveQuestion: false,
                answerId: 0,
                questionId: 0,
                showBox: false,
                questionText: '',
                productId:0
            }
        },
        mounted() {
        },
        components: {
            ArrowRightIcon
        },
        methods: {
            addNewQuestion: function (questionId) {

                if (this.canRequest && this.question.trim() !== "") {
                    let url = this.$siteUrl + 'product/question/add';
                    $(".dg_loading_container").show();
                    let formData = new FormData();
                    formData.append('content', this.question);
                    formData.append('send_email', this.sendEmail);
                    formData.append('product_id', this.productId);
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
            },
            toggleSendEmail: function () {
                this.sendEmail = !this.sendEmail;
            },
            updateData: function (qId, showBox, questionText,productId) {
                this.questionId = qId;
                this.showBox = showBox;
                this.questionText = questionText;
                this.productId=productId;
            },
            hideQuestionBox: function () {
                this.showBox = !this.showBox;
            },
            getLabel: function () {
                if (this.questionId === 0) {
                    return 'پرسش';
                } else {
                    return 'پاسخ';
                }
            }

        }
    }
</script>

<style scoped>

</style>
