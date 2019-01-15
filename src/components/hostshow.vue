<template>
<div id="hostshow" style="width: 100%">
  <el-main>
<!--       <h2>请输入一个IPv4地址:</h2>
      <el-input v-model="inputip" placeholder="127.0.0.1" clearable></el-input>
      <el-button type="primary">提交</el-button>
 -->
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="目标IP地址:">
          <el-input v-model="formLabelAlign.dip"></el-input>
        </el-form-item>
        <el-button type="primary" v-on:click="showserverinfo('cpu')">CPU</el-button>
        <el-button type="primary" v-on:click="showserverinfo('disk')">内存信息</el-button>
        <el-button type="primary" v-on:click="showserverinfo('mem')">磁盘空间</el-button>
        <el-button type="primary" v-on:click="showserverinfo('netlistening')">网络监听</el-button>
        <el-button type="primary" v-on:click="showserverinfo('netss')">网络连接数</el-button>
        <el-button type="primary" v-on:click="showserverinfo('netrxtx')">网卡流量</el-button>
        <el-button type="primary" v-on:click="showserverinfo('uptime')">负载信息</el-button>
        <el-button type="primary" v-on:click="showserverinfo('vmstat')">综合信息</el-button>
      </el-form>

  </el-main>
</div>
</template>


<script>
  import axios from "axios"
  var bmgrurl = '../api/v1/'

  export default {
    data() {
      return {
        labelPosition: 'top',
        inputip: '',
        formLabelAlign: {
          dip: ''
        }

      }
    },
    methods: {
      showserverinfo: function (mess) {
        this.ok = false
        // console.log(this)

        axios.post(bmgrurl+'showsysteminfo', {
          des_ip: this.des_ip,
          task: mess
        })

        .then((res) => {
          // console.log(res.status)
          if (res.status == 200) {
            // console.log(res)
            console.log(res.data)
            // console.log(res.data.data)
            this.ip = res.data.ip
            this.recode = res.data.recode
            this.ok = true
            this.rundata = '<pre>'+res.data.data+'</pre>'
          }
        })

        .catch(function (error) {
          // 这里是处理错误的回调
          console.log(error);
        });
    }
    }
  };

</script>


