// 该文件是用来写echarts这个图表的文件

//柱状图
var $oneCanvas = $('.content .content-bottom .canvas')[0];
var oneChart = echarts.init($oneCanvas);
var oneoption = {
    title: {
        text: '2017注册的人数'
    },
    color: ['#f0f'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    legend: {
        data:['人数']
    },
    series : [
        {
            name:'人数',
            type:'bar',
            barWidth: '60%',
            data:[22, 52, 222, 522, 1225, 250, 220]
        }
    ]
};
oneChart.setOption(oneoption);

//饼状图
var $secCanvas = $('.content .content-bottom .canvas')[1];
var secChart = echarts.init($secCanvas);
var secoption = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','百伦','安踏','李宁']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'百伦'},
                {value:135, name:'安踏'},
                {value:1548, name:'李宁'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
secChart.setOption(secoption);
