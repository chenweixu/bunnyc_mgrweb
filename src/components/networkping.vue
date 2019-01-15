<template>
<div id="networkping" style="width: 100%">
  <el-main>
      <h2>请输入一个IPv4地址:</h2>
      <el-input v-model="inputip" placeholder="127.0.0.1" clearable></el-input>
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
        inputip: ''
      }
    },
  };

</script>


