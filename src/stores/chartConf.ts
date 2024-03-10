import { defineStore } from "pinia";

const optionPie: echarts.EChartsOption = {
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        left: '0px',
        top: '10px',
    },
    series: [
        {
            name: '销售额',
            type: 'pie',
            radius: ['40%', '70%'],
            left: '80px',
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
            },
            label: {
                show: false,
                position: 'center',
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 20,
                    fontWeight: 'bold',
                },
            },
            labelLine: {
                show: false,
            },
            data: [
                { value: 1048, name: '商品A' },
                { value: 735, name: '商品B' },
                { value: 580, name: '商品C' },
                { value: 484, name: '商品D' },
                { value: 300, name: '商品E' },
            ],
        },
    ],
};
const optionLine: echarts.EChartsOption = {
    tooltip: {
        trigger: 'axis',
    },
    legend: {},
    toolbox: {
        show: true,
        feature: {
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
        },
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
        nameTextStyle: {
            align: 'left',
            verticalAlign: 'middle',
        },
        axisLabel: {
            formatter: '利润 {value} %',
        },
    },
    series: [
        {
            name: 'A商品',
            type: 'line',
            data: [10, 11, 13, 11, 12, 12, 9],
            markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' },
                ],
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }],
            },
        },
        {
            name: 'B商品',
            type: 'line',
            data: [1, -2, 2, 5, 3, 2, 0],
            markPoint: {
                data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }],
            },
            markLine: {
                data: [
                    { type: 'average', name: 'Avg' },
                    [
                        {
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max',
                        },
                        {
                            symbol: 'circle',
                            label: {
                                position: 'start',
                                formatter: 'Max',
                            },
                            type: 'max',
                            name: '最高点',
                        },
                    ],
                ],
            },
        },
    ],
};

const optionSales: echarts.EChartsOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
            ],
            axisTick: {
                alignWithLabel: true,
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
        },
    ],
    series: [
        {
            name: '销售额',
            type: 'bar',
            barWidth: '60%',
            data: [120, 200, 150, 80, 70, 110, 130, 140, 180, 190, 100, 90],
        },
    ],
};

const optionVisits: echarts.EChartsOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
            ],
            axisTick: {
                alignWithLabel: true,
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
        },
    ],
    series: [
        {
            name: '访问量',
            type: 'bar',
            barWidth: '60%',
            data: [
                8034, 12230, 11042, 7054, 6032, 9560, 10350, 15620, 15460, 14360, 8090,
                7490,
            ],
        },
    ],
};

const storeData = [
    {
        name: '工专路 0 号店',
        value: 2309,
    },
    {
        name: '工专路 1 号店',
        value: 2309,
    },
    {
        name: '工专路 2 号店',
        value: 2309,
    },
    {
        name: '工专路 3 号店',
        value: 2309,
    },
    {
        name: '工专路 4 号店',
        value: 2309,
    },
    {
        name: '工专路 5 号店',
        value: 2309,
    },
];


export const usechartConfStore = defineStore('chartConf', () => {
    return {
        optionPie,
        optionLine,
        optionSales,
        optionVisits,
        storeData
    }
})