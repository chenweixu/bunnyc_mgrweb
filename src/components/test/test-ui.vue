<template>
<div id="test">
<!--     <p>{{ message }}</p>
    <input type="text" v-model.lazy="message" value="message">
    <el-button type="primary" v-on:click="cmdManager()">提交</el-button>
 -->

<div id="serverUptimeImg" style="width: 1000px;height:400px;"></div>




</div>
</template>

<script>

// 引入 ECharts 主模块
// var echarts = require('echarts/lib/echarts');
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'


// require('echarts/lib/chart/bar');
// import bar from 'echarts/lib/chart/bar'      // 引入柱状图
import line from 'echarts/lib/chart/line'       // 折线图

// 引入提示框和标题组件
import tooltip from 'echarts/lib/component/tooltip'
import title from 'echarts/lib/component/title'

// 另存为图片
import toolbox from 'echarts/lib/component/toolbox'

import legend from 'echarts/lib/component/legend'

// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');

  export default {
    data() {
      return {
        message: 3,
        displayData: false,
        member: [1,2,3,4,5]
      }
    },
    mounted() {
        let this_ = this;

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('serverUptimeImg'));

        // 指定图表的配置项和数据
        let option = {
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['ld1','ld5','ld15']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },

            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },

            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
                name:'ld1',
            },
            {
                data: [20, 232, 90, 34, 190, 130, 120],
                type: 'line',
                smooth: true,
                name:'ld5',
            },
            {
                data: [20, 22, 92, 34, 90, 30, 20],
                type: 'line',
                smooth: true,
                name:'ld15',
            }
            ]
        };



    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option);

    },


    methods: {
        cmdManager() {
            console.log(this.message)
        }

    }




}
</script>
