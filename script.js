// Highchart Line
$(function () {
    var lineChart = Highcharts.chart('lineContainer', {

        title: {
            text: 'Total Trafik',
            style: {
                color: "#fff",
                fontSize: '1.5rem',
                fontWeight: '300'
            }
        },

        subtitle: {
            text: 'Topp 5',
            style: {
                color: "#fff",
                fontSize: '1rem'
            }
        },

        chart: {
            style: {
                fontFamily: 'Open Sans, sans-serif'
            },
            backgroundColor: '#213140',
            color: '#fff'
        },

        yAxis: {
            title: {
                useHTML: true,
                text: 'Besökare',
                style: {
                    color: '#fff',
                    fontSize: '1.2rem'
                }
            },
            gridLineColor: '#fff',
            labels: {
                style: {
                    color: '#fff',
                    fontSize: '1rem'
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#fff',
                    fontSize: '1rem',
                    marginTop: '10px'
                }
            }
        },
        legend: {
            itemStyle: {
                color: '#fff',
                fontWeight: '400',
            }
        },

        plotOptions: {
            series: {
                pointStart: Date.UTC(2018, 0, 1),
                pointIntervalUnit: 'month',
               
            }
        },

        series: [{
            name: 'Webbsida',
            data: [399, 456, 567, 734, 765, 607, 565, 468],
            color: '#3cf3ff',
            type: 'spline',
            marker: {
                symbol: 'circle'
            }
        }, {
            name: 'Webbsida',
            data: [489, 527, 657, 565, 618, 572, 549, 686],
            color: '#de7f32',
            type: 'spline',
            marker: {
                symbol: 'circle'
            }
        }, {
            name: 'Webbsida',
            data: [435, 418, 378, 521, 445, 323, 454, 442],
            color: '#ffd852',
            type: 'spline',
            marker: {
                symbol: 'circle'
            }
        }, {
            name: 'Webbsida',
            data: [245, 301, 345, 264, 351, 366, 328, 395],
            color: '#ce5f90',
            type: 'spline',
            marker: {
                symbol: 'circle'
            }
        }, {
            name: 'Webbsida',
            data: [565, 657, 746, 582, 563, 637, 753, 575],
            color: '#a8de32',
            type: 'spline',
            marker: {
                symbol: 'circle'
            }
        }],

    });
});

// Highchart Pie
$(function () {

    var pieChart = Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 220
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Mobile',
                y: 20,
                color: '#8500b6',
                sliced: true,
                selected: true
            }, {
                name: 'Desktop',
                y: 80,
                color: '#adadad',
            }]
        }]
    });
});
