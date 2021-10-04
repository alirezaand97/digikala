<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="c_wrapper">
                    مشاهده آمار سال
                    <select class="selectpicker select_report_year" ref="yearList" v-model="selected_year"
                            v-on:change="getChartData()">
                        <option v-for="(year,key) in yearList" v-bind:key="key" v-bind:value="year">{{year}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-lg-3">
                <div class="c_wrapper report_item">
                    <p class="report_item_title">فروش کل</p>
                    <span class="report_item_value">{{number_format(total_sale)}}</span>
                    <span class="tooman">تومان</span>
                </div>
            </div>
            <div class="col-sm-6 col-lg-3">
                <div class="c_wrapper report_item">
                    <p class="report_item_title">کمیسیون دریافتی کل</p>
                    <span class="report_item_value">{{number_format(total_commission)}}</span>
                    <span class="tooman">تومان</span>
                </div>
            </div>
            <div class="col-sm-6 col-lg-3">
                <div class="c_wrapper report_item">
                    <p class="report_item_title">فروش سال منتخب</p>
                    <span class="report_item_value">{{number_format(selected_sale)}}</span>
                    <span class="tooman">تومان</span>
                </div>
            </div>
            <div class="col-sm-6 col-lg-3">
                <div class="c_wrapper report_item">
                    <p class="report_item_title">کمیسیون سال منتخب</p>
                    <span class="report_item_value">{{number_format(selected_commission)}}</span>
                    <span class="tooman">تومان</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="c_wrapper">
                    <h6 class="c_chart_header">نمودار میزان فروش </h6>
                    <highcharts :options="chartOptions"></highcharts>
                </div>
            </div>

            <div class="col-12">
                <div class="c_wrapper">
                    <h6 class="c_chart_header">نمودار میزان کمیسیون دریافتی </h6>
                    <highcharts :options="commissionOptions"></highcharts>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Chart} from 'highcharts-vue';

    export default {
        name: "SaleReport",
        components: {
            highcharts: Chart
        },
        props: [
            'product_id',
        ],
        data() {
            return {
                requested: false,
                chartOptions: {
                    series: [{
                        data: [],
                        color: '#fb3449',
                        dataLabels: {
                            enabled: true,
                            color: 'rgb(0,0,0)',
                            formatter: function () {
                                return number_format(this.y)
                            },
                            rotation: -90,
                            align: 'right',
                            y: 10
                        }
                    }],
                    legend: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    chart: {
                        type: 'column',
                        style: {
                            fontFamily: 'IRANSans'
                        }
                    },
                    xAxis: {
                        type: 'category' //برای نمایش اسم ماه ها
                    },
                    yAxis: {
                        title: {
                            text: 'قیمت'
                        },
                        labels: {
                            useHTML: true,
                            formatter: function () {
                                return '<div class="chart_price" dir="rtl"><span>' + number_format(this.value) + '</span><span class="chart_tooman"> تومان</span></div>';
                            }
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        formatter: function () {
                            return '<div class="c_chart_tooltip">' +
                                '<p>میزان فروش در <span>' + getMonthName(this.x) + '</span></p>' +
                                '<div dir="rtl"><b>' + number_format(this.y) + '</b><span>تومان</span></div>' +
                                '</div>';
                        }
                    }
                },
                commissionOptions: {
                    series: [{
                        data: [],
                        color: '#00bfd6',
                        dataLabels: {
                            enabled: true,
                            color: 'rgb(0,0,0)',
                            formatter: function () {
                                return number_format(this.y)
                            },
                            rotation: -90,
                            align: 'right',
                            y: 10
                        }
                    }],
                    legend: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    chart: {
                        type: 'column',
                        style: {
                            fontFamily: 'IRANSans'
                        }
                    },
                    xAxis: {
                        type: 'category' //برای نمایش اسم ماه ها
                    },
                    yAxis: {
                        title: {
                            text: 'قیمت'
                        },
                        labels: {
                            useHTML: true,
                            formatter: function () {
                                return '<div class="chart_price" dir="rtl"><span>' + number_format(this.value) + '</span><span class="chart_tooman"> تومان</span></div>';
                            }
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        formatter: function () {
                            return '<div class="c_chart_tooltip">' +
                                '<p>میزان کمیسیون دریافتی در <span>' + getMonthName(this.x) + '</span></p>' +
                                '<div dir="rtl"><b>' + number_format(this.y) + '</b><span>تومان</span></div>' +
                                '</div>';
                        }
                    }
                },
                selected_year: '',
                yearList: [],
                monthNames: [
                    'فروردین',
                    'اردیبهشت',
                    'خرداد',
                    'تیر',
                    'مرداد',
                    'شهریور',
                    'مهر',
                    'آبان',
                    'آذر',
                    'دی',
                    'بهمن',
                    'اسفند',
                ],
                total_sale: 0,
                total_commission: 0,
                selected_sale: 0,
                selected_commission: 0,
                url: '',
            }
        },
        mounted() {
            if (this.product_id != undefined) {
                this.url = this.$siteUrl + 'admin/report/product-sale/get-data?selected_year=' + this.selected_year + '&product_id=' + this.product_id;
            } else {
                this.url = this.$siteUrl + 'admin/report/overall-sale/get-data?selected_year=' + this.selected_year;
            }
            this.getChartData();

        },
        methods: {
            getChartData: function () {
                if (!this.requested) {
                    $("#loading_box").show();
                    this.axios.get(this.url).then(response => {
                        $("#loading_box").hide();
                        this.yearList = response.data.year_list;
                        const app = this;
                        console.log(response.data);
                        //با هر بار دریافت اطلاعات، دیتای چارت را پاک می کنیم تا دوباره پر کنیم
                        this.chartOptions.series[0].data = [];
                        this.commissionOptions.series[0].data = [];
                        const sales = response.data.sales;
                        this.total_sale = response.data.total_sale;
                        this.total_commission = response.data.total_commission;
                        this.selected_sale = response.data.selected_sale;
                        this.selected_commission = response.data.selected_commission;

                        if (sales) {
                            sales.forEach(function (row, key) {
                                if (key != 0) {
                                    app.chartOptions.series[0].data.push([app.getMonthName(key), row])
                                }
                            })
                        }

                        const commissions = response.data.commissions;
                        if (commissions) {
                            commissions.forEach(function (row, key) {
                                if (key != 0) {
                                    app.commissionOptions.series[0].data.push([app.getMonthName(key), row])
                                }
                            })
                        }

                        this.$nextTick(function () {
                            $(this.$refs.yearList).selectpicker('refresh');
                        })
                    }).catch(error => {


                    })
                }
            },
            number_format: function (number) {
                return new Intl.NumberFormat('fa').format(number)
            },
            getMonthName: function (key) {
                key = key - 1;
                return this.monthNames[key];
            }
        }
    }
</script>

<style scoped>

</style>
