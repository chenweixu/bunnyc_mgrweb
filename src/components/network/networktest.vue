<template>
<div id="networkping" style="width: 100%">
  <el-main>

  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="PING探测" name="ping">
    <el-row :gutter="5">
      <el-col :span="6">
      <el-input v-model="pingIP" placeholder="目标IP:127.0.0.1" clearable></el-input>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" v-on:click="getManager('ping')">提交</el-button>
    </el-col>
    </el-row>
  </el-tab-pane>

    <el-tab-pane label="端口探测" name="port">
    <el-row :gutter="5">
      <el-col :span="4">
          <el-input v-model="porttest.sip" placeholder="源IP:localhost"></el-input>
      </el-col>
      <el-col :span="4">
          <el-input v-model="porttest.ip" placeholder="目标IP"></el-input>
      </el-col>
      <el-col :span="3">
          <el-input v-model="porttest.port" placeholder="目标端口"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" v-on:click="portManager()">提交</el-button>
      </el-col>
    </el-row>
    </el-tab-pane>

  <el-tab-pane label="URL探测" name="urltest">
    <el-row :gutter="5">
      <el-col :span="10">
      <el-input placeholder="请输入url" v-model="testurl" clearable></el-input>
    </el-col>
      <el-col :span="2">
      <el-button type="primary" v-on:click="getManager('url')">提交</el-button>
    </el-col>
  </el-row>

  </el-tab-pane>

</el-tabs>

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
  var opsurl = 'api/v2/network'
  var data

  export default {
    data() {
      return {
        displayData: false,
        activeName: "ping",
        pingIP: '',
        porttest: {
          sip: "",
          ip: "",
          port: ""
        },
        testurl: ""
      }
    },
    methods: {
      handleClick(tab, event) {
        this.displayData = false;
        // console.log(tab, event);
      },

      getManager (mess) {
        this.displayData = false
        if (mess == 'ping') {
          data = {ip: this.pingIP}
        } else if (mess == 'url') {
          data = {url: this.testurl}
        }
        console.log(data)
        axios.get(opsurl,{params: data})
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            this.$notify({type: 'success', title: '成功',message: '请求成功'});
            this.displayData = true;
            this.rundata = '<pre>'+res.data.redata+'</pre>';
            } else {
              this.$notify({type: 'error', title: '失败',message: '请求失败'});
            }
        })
        .catch((error) => {
          // 这里是处理错误的回调
          this.$notify({type: 'error', title: '失败',message: '操作失败'});
          console.log(error);
        });
      },

      portManager () {
        this.displayData = false
        data = {
            "key": "c1c2",
            "obj": "network",
            "content": {
                "task": "check_port",
                "sip": this.porttest.sip,
                "ip": this.porttest.ip,
                "port": this.porttest.port,
                }
        };
        if (this.porttest.sip == ""){
          delete data.content.sip
        }

        axios.post(opsurl,data)

        .then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            this.$notify({type: 'success', title: '成功',message: '请求成功'});
            this.displayData = true;
            this.rundata = '<pre>'+res.data.redata+'</pre>';
            } else {
              this.$notify({type: 'error', title: '失败',message: '请求失败'});
            }
        })
        .catch((error) => {
          // 这里是处理错误的回调
          this.$notify({type: 'error', title: '失败',message: '操作失败'});
          console.log(error);
        });
      },


    }
  };

</script>


