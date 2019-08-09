<template>
<div id="hostshow" style="width: 100%">
  <el-main>

  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="快捷信息" name="fastinfo">
    <el-row :gutter="5" :span="5">
      <el-col :span="6">
        <el-input v-model="server" placeholder="目标主机ipv4" clearable></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="5">
        <el-button type="primary" v-on:click="showserverinfo('cpu')">CPU</el-button>
        <el-button type="primary" v-on:click="showserverinfo('ram')">内存信息</el-button>
        <el-button type="primary" v-on:click="showserverinfo('disk')">磁盘空间</el-button>
        <el-button type="primary" v-on:click="showserverinfo('netlistening')">网络监听</el-button>
        <el-button type="primary" v-on:click="showserverinfo('netss')">网络连接数</el-button>
        <el-button type="primary" v-on:click="showserverinfo('netrxtx')">网卡流量</el-button>
        <el-button type="primary" v-on:click="showserverinfo('uptime')">负载信息</el-button>
        <el-button type="primary" v-on:click="showserverinfo('vmstat')">综合信息</el-button>
    </el-row>
  </el-tab-pane>
  <el-tab-pane label="历史数据" name="historydata">
   <el-row :gutter="5" :span="5">
      <el-col :span="6">
        <el-input v-model="server" placeholder="目标主机ipv4" clearable></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="5">
        <el-button type="primary" v-on:click="showImg('loaddata')">1小时负载</el-button>
        <el-button type="primary" v-on:click="showImg('cpu')">1小时CPU</el-button>
    </el-row>
  </el-tab-pane>
</el-tabs>

    <div v-if="displayData" style="background-color: #C0C0C0;">
      <h4>执行结果：</h4>
      <span v-html="rundata"></span>
    </div>


    <div v-show="displayImgData" id="runImg" style="width: 1000px;height:400px;">
    </div>



  </el-main>
</div>
</template>


<script>
  import axios from "axios"

import echarts from 'echarts/lib/echarts'
import line from 'echarts/lib/chart/line'           // 折线图
import tooltip from 'echarts/lib/component/tooltip' // 提示框
import title from 'echarts/lib/component/title'     // 图标题
import legend from 'echarts/lib/component/legend'   // 开关某Y值的显示

var opsurl
var reqdata = {
    "key": "c1c2",
    "obj": "",
    "content": {}
  };
var imgname


  export default {
    data() {
      return {
        activeName: 'fastinfo',
        server: '',
        displayData: false,
        displayImgData: false,
      }
    },

    methods: {
      handleClick(tab, event) {
        this.displayData = false;
        this.displayImgData = false;
      },

      showImg(mess) {
        this.displayData = false;
        this.displayImgData = false;

        opsurl = 'api/v2/monitor';
        reqdata.obj = 'monitor';
        reqdata.content.types = 'host'
        reqdata.content.ip = this.server;

        if (mess == "loaddata") {
          reqdata.content.unit = 'uptime';
          imgname = '1小时负载图'
        } else if (mess == "cpu") {
          reqdata.content.unit = 'cpu';
          imgname = '1小时CPU使用率图'
        }
        console.log(reqdata)

        axios.post(opsurl, reqdata)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            if (res.data.recode == 0) {
                this.$notify({type: 'success', title: '成功',message: '获取成功'});
                this.displayImgData = true;
                let imgData = res.data.redata;

                let new_data = new Array()
                let legend_data = new Array()
                console.log(imgData)

                for (var i in imgData.y_data) {
                    new_data.push(
                        {
                            data: imgData.y_data[i],
                            type: 'line',
                            smooth: true,
                            name: i,
                        }
                    )
                    legend_data.push(i)
                }

                let myChart = echarts.init(document.getElementById('runImg'));
                myChart.clear()
                // 清空画布，避免之前的数据进行干扰

                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: imgname
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: legend_data
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                            // 添加图片下载功能
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: imgData.x_name
                    },
                    yAxis: {
                        type: 'value'
                    },

                    series: new_data
                };
                console.log(option)
              // 使用刚指定的配置项和数据显示图表
              myChart.setOption(option);

            } else {
              this.$notify({type: 'error', title: '业务失败',message: res.data.redata});
            }
          }
        })
        .catch((error) => {
          // 这里是处理错误的回调
          this.$notify({type: 'error', title: '失败',message: '操作失败'});
          console.log(error);
        });
      },
      showserverinfo(mess) {
        this.displayData = false;
        this.displayImgData = false;
        opsurl = 'api/v2/host';
        reqdata.obj = 'host';
        reqdata.content.task = 'unit';
        reqdata.content.arg = mess;
        reqdata.content.ip = this.server;

        if (mess == "vmstat") {
          this.$message('后台运行中，请稍等5-10秒！');
        }

        console.log(reqdata)

        axios.post(opsurl, reqdata)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            if (res.data.recode == 0) {
              if (mess == 'loaddata') {
                this.$notify({type: 'success', title: '成功',message: '获取成功'});
                this.displayImgData = true;
                this.imgData = res.data.redata;
              }

                this.$notify({type: 'success', title: '成功',message: '获取成功'});
                this.displayData = true;
                this.rundata = '<pre>'+res.data.redata+'</pre>';
            } else {
              this.$notify({type: 'error', title: '业务失败',message: res.data.redata});
            }
          }
        })
        .catch((error) => {
          // 这里是处理错误的回调
          this.$notify({type: 'error', title: '失败',message: '操作失败'});
          console.log(error);
        });
      }

    }
  };

</script>


