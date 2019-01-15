<template>
<div id="weblogic" style="width: 100%">
  <el-main>

  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="单机管理" name="single">

      <el-input v-model="ip" placeholder="目标主机ipv4" clearable></el-input>

      <el-select v-model="servicenumber" placeholder="请选择">
        <el-option
          v-for="item in servicenumberoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>


      <el-button type="primary">启动</el-button>
      <el-button type="primary">停止</el-button>
      <el-button type="primary">访问日志</el-button>
      <el-button type="primary">业务日志</el-button>

    </el-tab-pane>

    <el-tab-pane label="组管理" name="group">


      <el-select v-model="group" placeholder="请选择">
        <el-option
          v-for="item in groupoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button type="primary">提交</el-button>



    </el-tab-pane>

    <el-tab-pane label="区域管理" name="region">
      区域管理
    </el-tab-pane>

    <el-tab-pane label="日志服务" name="log">日志服务</el-tab-pane>
    <el-tab-pane label="测试环境" name="test">测试环境</el-tab-pane>
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
        inputurl: '',
        servicenumber: '',
        value: 'all',
        group: '',

        servicenumberoptions: [
          {value: 'all',label: 'all'},
          {value: '1',label: '1'},
          {value: '2',label: '2'},
          {value: '3',label: '3'},
          {value: '4',label: '4'},
          {value: '5',label: '5'},
          {value: '6',label: '6'},
        ],
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


