<template>
    <div>
        <div class="order_verify_steps">
            <h6 class="order_verify_title">مراحل ارسال سفارش:</h6>
            <div class="order_steps_slider" dir="rtl">
                <div class="order_step_item"
                     v-for="(step,key) in order_statuses"
                     v-if="key>=0"
                     v-bind:key="key"
                     v-on:click="changeOrderStatus(key)">
                    <div class="order_step_circle" v-bind:class="[key<=sendStatus?'step_active':'']">
                        <span v-if="key>sendStatus" >{{key}}</span>
                        <span v-if="key<=sendStatus" class="fa fa-check"></span>
                    </div>
                    <div class="order_step_text">
                        {{step}}
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bd-example-modal-sm" id="changeStep" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="p-2 mt-4 mb-3">
                            آیا می خواهید وضعیت محصول را به <b>{{order_statuses[changeToStatus]}}</b> تغییر دهید؟
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-light delete_modal_btn ml-1" data-dismiss="modal">بستن
                            </button>
                            <button type="button" class="btn digi_btn_blue delete_modal_btn"
                                    v-on:click="confirmChangeStatus()">تایید
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
        name: "OrderSteps",
        props: ['status', 'order_statuses', 'order_info_id'],
        mounted() {
            this.sendStatus = this.status;
        },
        data() {
            return {
                sendStatus: 0,
                changeToStatus: 0
            }
        },
        methods: {
            changeOrderStatus: function (key) {
                this.changeToStatus = key;
                $("#changeStep").modal('show');
            },
            confirmChangeStatus: function () {
                let url = this.$siteUrl + 'admin/orders/status/update';
                let data = new FormData();
                data.append('status', this.changeToStatus);
                data.append('order_info_id', this.order_info_id);
                this.axios.post(url, data).then(response => {
                    if (response.data != 'error') {
                        $("#changeStep").modal('hide');
                        this.sendStatus = this.changeToStatus;
                    }
                });
            }
        }

    }
</script>

<style scoped>

</style>
