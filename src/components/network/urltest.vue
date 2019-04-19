<template>
<div id="networkurltest" style="width: 100%">
  <el-main>
      <h2>请输入一个URL地址:</h2>

      <el-input placeholder="请输入url" v-model="inputurl" clearable>
        <template slot="prepend">Http://</template>
      </el-input>
      <el-button type="primary">提交</el-button>

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
        inputurl: ''
      }
    },
  };

</script>


