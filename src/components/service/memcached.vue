<template>
<div id="memcached" style="width: 100%">
  <el-main>
  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">

    <el-tab-pane label="应用管理" name="single">
      <div class="demo-input-suffix">
        <el-row :gutter="5">
          <el-col :span="5">
            <el-input v-model="server" placeholder="mcip:127.0.0.1" clearable></el-input>
          </el-col>

          <el-col :span="5">
            <el-select v-model="port" placeholder="mc:port">
              <el-option label="21101" value="21101"></el-option>
              <el-option label="21102" value="21102"></el-option>
              <el-option label="21103" value="21103"></el-option>
              <el-option label="all" value="all"></el-option>
            </el-select>


          </el-col>

          <el-col :span="10">
            <el-button type="primary" v-on:click="memcachedManager('start')">启动</el-button>
            <el-button type="primary" v-on:click="memcachedManager('stop')">停止</el-button>
            <el-button type="primary" v-on:click="memcachedManager('stats')">stats</el-button>
            <el-button type="primary" v-on:click="memcachedManager('info')">关键指标</el-button>
          </el-col>

      </el-row>

      </div>
    </el-tab-pane>

    <el-tab-pane label="组管理" name="group">

      <el-row :gutter="5">
        <el-button type="primary">清空缓存(全局)</el-button>
        <el-button type="primary">查询状态(全局)</el-button>
      </el-row>

    </el-tab-pane>

    <el-tab-pane label="数据查询" name="data">

      <el-row :gutter="5">
        <el-col :span="5">
          <el-input v-model="mckey" placeholder="key" clearable></el-input>
        </el-col>
        <el-col :span="5">
          <el-input v-model="mcvalue" placeholder="value" clearable></el-input>
        </el-col>
        <el-col :span="10">
      <el-button type="primary">查询</el-button>
      <el-button type="primary">存放</el-button>
      <el-button type="primary">删除</el-button>
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
  var opsurl = 'api/v2/service'
  var data

  export default {
    data() {

      return {
        displayData: false,
        activeName2: 'single',
        server: '',
        port: '',
        mckey: '',
        mcvalue: '',
        rundata: '',
      }
    },
    methods: {
      handleClick(tab, event) {
        this.displayData = false;
        // console.log(tab, event);
      },
      memcachedManager(mess) {
        this.displayData = false;
        console.log(mess)

        data = {
            "key": "c1c2",
            "obj": "service",
            "content": {
                "unit": "memcached",
                "task": mess,
                "server": this.server,
                "port": this.port,
                }
        };

        console.log(data)

        axios.post(opsurl, data)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            if (res.data.recode == 0) {
              if (mess=='start') {
                this.$notify({type: 'success', title: '成功',message: '启动成功'});
              } else if (mess=='stop') {
                this.$notify({type: 'success', title: '成功',message: '停止成功'});
              } else if (mess=='stats') {
                this.$notify({type: 'success', title: '成功',message: 'status'});
                this.displayData = true;
                this.rundata = '<pre>'+res.data.redata+'</pre>';
              } else if (mess=='info') {
                this.$notify({type: 'success', title: '成功',message: 'info'});
                this.displayData = true;
                this.rundata = '<pre>'+res.data.redata+'</pre>';
              }
            } else {
              this.$notify({type: 'error', title: '失败',message: res.data.redata});
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


