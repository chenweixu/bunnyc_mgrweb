<template>
<div id="mybody" style="width: 100%">
  <el-main>

  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
    <el-row :gutter="5" :span="5">
      <el-col :span="6">
        <el-input v-model="inputip" placeholder="请输入ipv4 地址" clearable></el-input>
      </el-col>
    </el-row>
      <br>
    <el-row :gutter="5" :span="5">
      <el-col :span="6">
        <el-button type="primary">提交</el-button>
      </el-col>
    </el-row>

    </el-tab-pane>

    <el-tab-pane label="配置管理" name="second">

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>


    </el-tab-pane>

    <el-tab-pane label="角色管理" name="third">

  <el-input placeholder="请输入url" v-model="inputurl">
    <template slot="prepend">Http://</template>
  </el-input>

    </el-tab-pane>

    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
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
      const item = {
        date: '2017-05-02',
        name: '王某某',
        address: '测试内容'
      };
      return {
        tableData: Array(10).fill(item),
        activeName2: 'first',
        inputip: '',
        inputurl: ''
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }

  };

</script>


