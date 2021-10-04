@extends('layouts/admin')
@section('content')
    @include('includes.breadcrumb',['data'=>[],
   'current'=>['title'=>'پنل ادمین']
   ])

    <div class="row">
        <div class="col-12">
            <div class="c_wrapper">
                <h6 class="c_chart_header">نمودار میزان فروش ماه اخیر فروشگاه</h6>
                <div id="container"></div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script type="text/javascript" src="{{asset('js/highcharts.js')}}"></script>
    <script>
        Highcharts.chart('container', {
            chart: {
                type: 'line',
                style: {
                    fontFamily: 'IRANSans'
                }
            },
            title: {
                text: ''
            },

            subtitle: {
                text: ''
            },

            yAxis: {
                title: {
                    text: ''
                },
                labels:{
                    useHTML:true,
                    formatter:function () {
                        return "<div style='direction: rtl'>"+this.value+"<span class='tooman'>تومان</span>" + "</div>";
                    }
                }
            },

            xAxis: {
                categories: [<?= $datesString?>]
            },

            legend: {
                verticalAlign: 'center'
            },
            series: [{
                name: 'تعداد تراکنش',
                data: [<?= $countString?>],
                color: 'red'
            }, {
                name: 'میزان فروش',
                data: [<?= $priceString ?>],
                marker: {
                    symbol: 'circle'
                }
            }],
            tooltip: {
                useHTML:true,
                formatter: function () {
                    if (this.series.name === 'میزان فروش') {
                        return this.x + '</br>' + this.series.name + ':' + this.y+'تومان';
                    }else {
                        return this.x + '</br>' + this.series.name + ':' + this.y+' بار';
                    }
                }
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        })
        ;
    </script>
@endsection
