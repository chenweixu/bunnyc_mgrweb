<template>
<div id="hostshow" style="width: 100%">
  <el-main>
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


    <div style="background-color: #C0C0C0;">
      <template v-if="displayData">
      <h4>执行结果：</h4>
          <span v-html="rundata"></span>
      </template>
    </div>


  </el-main>
</div>
</template>


<script>
  import axios from "axios"
  var opsurl = 'api/v2/host'
  var data

  export default {
    data() {
      return {
        labelPosition: 'top',
        server: '',
        displayData: false
      }
    },

    methods: {
      showserverinfo(mess) {
        this.displayData = false;

        data = {
            "key": "c1c2",
            "obj": "host",
            "content": {
                "unit": mess,
                "task": "remote",
                "ip": this.server,
                }
        };

        if (mess == "vmstat") {
          this.$message('后台运行中，请稍等5-10秒！');
        }

        console.log(data)

        axios.post(opsurl, data)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            if (res.data.recode == 0) {
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


