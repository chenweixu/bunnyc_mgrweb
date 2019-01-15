<template>
<div id="nginx" style="width: 100%">
  <el-main>
<h2>nginx manager</h2>
  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">


    <el-tab-pane label="应用管理" name="single">

      <el-input v-model="nginxip" placeholder="目标主机ipv4" clearable></el-input>

      <el-button type="primary">启动</el-button>
      <el-button type="primary">停止</el-button>
      <el-button type="primary">访问日志</el-button>
      <el-button type="primary">业务日志</el-button>

    </el-tab-pane>

    <el-tab-pane label="IP地址屏蔽" name="group">


      <el-input v-model="lockip" placeholder="锁定IP" clearable></el-input>

      <el-button type="primary">锁定</el-button>
      <el-button type="primary">解锁</el-button>
      <el-button type="primary">查看已锁定IP</el-button>

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
        nginxip: '',
        inputurl: '',
        servicenumber: '',
        value: 'all',
        group: '',
        lockip: '',

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


