<template>
<div id="mybody" style="width: 100%">
  <el-main>

  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="单机任务" name="single">
    <el-row :gutter="5" :span="5">
      <el-col :span="4">
        <el-input v-model="ip" placeholder="请输入ipv4 地址" clearable></el-input>
      </el-col>

      <el-col :span="8">
        <el-input v-model="cmd" placeholder="命令" clearable></el-input>
      </el-col>

      <el-col :span="3">
        <el-input v-model="user" placeholder="用户名" clearable></el-input>
      </el-col>


      <el-col :span="2">
        <el-button type="primary" v-on:click="cmdManager()">提交</el-button>
      </el-col>
    </el-row>

    </el-tab-pane>

    <el-tab-pane label="组任务" name="group">
      未开放
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
  var opsurl = 'api/v2/host'
  var data
  export default {
    data() {
      return {
        displayData: false,
        activeName: 'single',
        ip: '',
        cmd: '',
        user: '',
      }
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
        this.displayData = false
      },
      cmdManager () {
        this.displayData = false
        data = {
            "key": "c1c2",
            "obj": "host",
            "content": {
                "task": "remote",
                "ip": this.ip,
                "cmd": this.cmd,
                "user": this.user
                }
        };

        axios.post(opsurl,data)

        .then((res) => {
          console.log(res.data)
          if (res.status == 200) {
            if (res.data.recode == 0) {
              this.$notify({type: 'success', title: '成功',message: '执行成功'});
              this.displayData = true;
              this.rundata = '<pre>'+res.data.redata+'</pre>';
            } else {
              this.$notify({type: 'error', title: '失败',message: res.data.redata});
            }

          } else {
            this.$notify({type: 'error', title: '失败',message: '请求失败'});
          }
        })
        .catch((error) => {
          // 这里是处理错误的回调
          this.$notify({type: 'error', title: '失败',message: '请求失败'});
          console.log(error);
        });
      },


    }

  };

</script>


