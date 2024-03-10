<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import TodoList from '@/components/TodoList.vue'
import Statistic from '@/components/Statistic.vue'
import Card from '@/components/Card.vue'

import { usechartConfStore } from '@/stores/chartConf'

const tabName: { [key: string]: string } = {
    sales: '销售额',
    visits: '访问量',
};

// echart 图表将要挂载到的 DOM。
const pie = ref();
const line = ref();
const histogram = ref();
const activeName = ref('sales');
// echart 图表的配置信息
const {
    optionPie,
    optionLine,
    optionSales,
    optionVisits,
    storeData
} = usechartConfStore();



// 初始化后得到的 echart 实例
let pieChart;
let lineChart;
let myHistogram;

onMounted(() => {
    // 挂载后进行 echart 初始化
    pieChart = echarts.init(pie.value);
    lineChart = echarts.init(line.value);
    myHistogram = echarts.init(histogram.value);
    pieChart.setOption(optionPie);
    lineChart.setOption(optionLine);
    myHistogram.setOption(optionSales);
});

// 处理 myHistogram 图表点击
const handleClick = (tab: TabsPaneContext) => {
    if (tab.props.name === 'sales') {
        myHistogram.clear();
        myHistogram.setOption(optionSales);
    } else if (tab.props.name === 'visits') {
        myHistogram.clear();
        myHistogram.setOption(optionVisits);
    }
};

</script>


<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="card">
                    <Card></Card>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" class="card">
                    <Statistic></Statistic>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card shadow="hover" class="card">
                    <TodoList></TodoList>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <h2>商品类别占比</h2>
                    <div class="pie-container" ref="pie"></div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover">
                    <h2>商品销售利润率</h2>
                    <div class="line-container" ref="line"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px">
            <el-col :span="24">
                <el-card shadow="hover">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane label="销售额" name="sales" />
                        <el-tab-pane label="访问量" name="visits" />
                        <div class="data-analysis-container">
                            <div class="histogram-container" ref="histogram" />
                            <div class="rank">
                                <h4>门店{{ tabName[activeName] }}排名</h4>
                                <ul v-for="(item, index) in storeData" :key="item.name">
                                    <li>
                                        <span class="rankingItemNumber" :class="{ top: index < 3 }">{{ index + 1
                                            }}</span>
                                        <span class="rankingItemName"> {{ item.name }}</span>
                                        <span>{{ item.value }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
        <!-- <TheWelcome /> -->
    </div>
</template>


<style scoped lang="less">
.el-card .el-card__body {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card {
    width: 100%;
    height: 260px;
    margin-bottom: 10px;
}

.pie-container {
    height: 260px;
}

.line-container {
    height: 260px;
}

.data-analysis-container {
    height: 260px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
}

.rank {
    height: 260px;
    width: 400px;
}

.histogram-container {
    height: 260px;
    flex-grow: 1;
}

ul {
    list-style: none;
    padding: 5px;

    li {
        padding: 3px;
        display: flex;
        align-items: center;

        .rankingItemNumber {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            color: #000;
            text-align: center;
            border-radius: 50%;
            background-color: #fafafa;
            margin-right: 10px;
        }

        .top {
            background-color: #314659;
            color: #fff;
        }

        .rankingItemName {
            flex-grow: 1;
        }
    }
}
</style>