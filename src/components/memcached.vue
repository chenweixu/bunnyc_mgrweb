<template>
<div id="memcached" style="width: 100%">
  <el-main>
<h2>memcached manager</h2>
  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">


    <el-tab-pane label="应用管理" name="single">
      <div class="demo-input-suffix">
        <el-row>
          <el-col :span="2">
            ip：
          </el-col>
          <el-col :span="2">
            <el-input v-model="ip" placeholder="127.0.0.1" clearable></el-input>
          </el-col>

          <el-col :span="2">
            port
          </el-col>

          <el-col :span="2">
            <el-input v-model="port" placeholder="21101" clearable></el-input>
          </el-col>

          <el-col :span="20">
            <el-button type="primary">启动</el-button>
            <el-button type="primary">停止</el-button>
            <el-button type="primary">stats</el-button>
            <el-button type="primary">关键指标</el-button>
          </el-col>

      </el-row>

      </div>
    </el-tab-pane>

    <el-tab-pane label="数据查询" name="group">


      <el-input v-model="mckey" placeholder="key" clearable></el-input>

      <el-button type="primary">查询</el-button>
      <el-button type="primary">存放</el-button>
      <el-button type="primary">删除</el-button>

    </el-tab-pane>

  </el-tabs>

  </el-main>
</div>
</template>

<style>
/*  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    width: 100%;
  }
*/
</style>


<script>
  export default {
    data() {

      return {

        activeName2: 'single',
        ip: '',
        port: '',
        inputurl: '',
        servicenumber: '',
        value: 'all',
        group: '',
        test: '',
        mckey: '',

      input2: '',
      input21: '',
      input22: '',
      input23: '',

        groupoptions: [
          {value: 'dmz1',label: 'dmz1'},
          {value: 'dmz2',label: 'dmz2'},
          {value: 'dmz3',label: 'dmz3'},
          {value: 'cd1',label: 'cd1'},
          {value: 'cd2',label: 'cd2'},
        ]
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }

  };

</script>


