<template>
    <div class="modal fade bd-example-modal-lg" id="chart_modal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="chart_title ">
                        نمودار قیمت فروش
                        <span>{{product_name}}</span>
                    </div>
                    <highcharts :options="chartOptions"></highcharts>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Chart} from 'highcharts-vue';

    export default {
        name: "PriceChart",
        components: {
            highcharts: Chart
        },
        props: [
            'product_id',
            'product_name',
        ],
        data() {
            return {
                requested: false,
                chartOptions: {
                    series: [],
                    title: {
                        text: ''
                    },
                    chart: {
                        height: 450,
                        type: 'line',
                        style: {
                            fontFamily: 'IRANSans'
                        }
                    },
                    xAxis: {
                        categories: []
                    },
                    yAxis: {
                        title: {
                            text: 'قیمت'
                        },
                        labels: {
                            useHTML: true,
                            formatter: function () {
                                return '<div class="chart_price"><span>' + this.value + '</span><span class="chart_tooman"> تومان</span></div>';
                            }
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        borderColor: '#c8c8c8',
                        borderWidth: 1,
                        formatter: function () {
                            if (this.point.has_product === 'ok') {
                                return '<div class="chart_tooltip">' +
                                    '<div class="chart_seller">' +
                                    '<span>فروشنده: </span><span>' + this.point.seller + '</span></div>'
                                    + '<div class="chart_tooltip_price_box">' +
                                    '<span class="chart_tooltip_label">کمترین قیمت</span>' +
                                    '<div class="chart_tooltip_price">' + this.point.price + '<span class="chart_tooman">تومان</span></div>' +
                                    '</div>' +
                                    '</div>';
                            } else {
                                return '<div class="chart_tooltip">' +
                                    '<div class="chart_tooltip_price_box">' +
                                    '<span>ناموجود</span>' +
                                    '</div>';
                            }

                        }
                    }
                },
                colors: []
            }
        },
        mounted() {
            const app = this;
            $(document).on('click', '#open_chart', function () {
                app.getChartData();

            })
        },
        methods: {
            getChartData: function () {
                $("#chart_modal").modal('show');

                if (!this.requested) {
                    let url = this.$siteUrl + 'api/chart/get-data/' + this.product_id;
                    $(".dg_loading_container").show();
                    this.axios.get(url).then(response => {
                        $(".dg_loading_container").hide();
                        this.chartOptions['xAxis']['categories'] = response.data.points;
                        this.colors = response.data.color;
                        const app = this;
                        let i = 0;
                        this.requested = true;
                        response.data.price.forEach(function (item) {
                            let name = response.data.color[i].name;
                            let zoneRow = response.data.zone[response.data.color[i].id];
                            app.chartOptions.series.push({
                                'data': item,
                                'name': name,
                                'color': '#00bfd6',
                                marker: {symbol: 'circle'},
                                zones: zoneRow,
                                zoneArea: 'x'
                            });
                            if (i > 0) {
                                app.chartOptions.series[i].visible = false;
                            } else {
                                app.chartOptions.series[i].visible = true;

                            }
                            i++;
                        });

                    }).catch(error => {


                    })
                }
            },
            number_format: function (number) {
                return new Intl.NumberFormat('fa').format(number)
            }
        }
    }
</script>

<style scoped>

</style>
