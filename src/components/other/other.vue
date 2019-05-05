<template>
<div id="weblogic" style="width: 100%">
  <el-main>

  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="监控系统" name="single">
        <li v-for="item in conf_data.monitor" :key="item.name">
          <a :href="`${item.url}`" target="_blank">{{item.name}}</a><br>
        </li>
    </el-tab-pane>

    <el-tab-pane label="管理平台" name="system_mgr">
        <li v-for="item in conf_data.system_mgr" :key="item.name">
          <a :href="`${item.url}`" target="_blank">{{item.name}}</a><br>
        </li>
    </el-tab-pane>

    <el-tab-pane label="weblogic控制台" name="region">

      <div class="left_weblogic">
        <h3>{{conf_data.appmgr.group1.name}}</h3>
        <li v-for="item in conf_data.appmgr.group1.value" :key="item.name">
          <a :href="`${item.url}`" target="_blank">{{item.name}}</a><br>
        </li>
      </div>

      <div class="right_weblogic">
        <h3>{{conf_data.appmgr.group2.name}}</h3>
        <li v-for="item in conf_data.appmgr.group2.value" :key="item.name">
          <a :href="`${item.url}`" target="_blank">{{item.name}}</a><br>
        </li>
      </div>

    </el-tab-pane>

  </el-tabs>



  </el-main>
</div>
</template>

<style>
  .left_weblogic{
    width: 200px;
    float: left;
    /*display: table;*/
    text-align: left;
    /*line-height: 600px;*/
    /*color: #fff;*/
    list-style-type: none;
  }

  .right_weblogic{
    margin-left: 210px;
    float: left;
    text-align: left;
    list-style-type: none;
    /*height: 600px;*/
    /*background: yellow;*/
    /*line-height: 600px;*/
  }
</style>


<script>

import json_data from "./conf_other.json"

  export default {
    data() {

      return {
        activeName2: 'single',
        conf_data: json_data,
      }
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
        console.log(json_data)
        console.log(json_data.system_mgr)
      }
    }

  };

</script>


