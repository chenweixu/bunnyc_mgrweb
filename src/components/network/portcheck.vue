<template>
<div id="networkping" style="width: 100%">
  <el-main>
<!--       <h2>请输入一个IPv4地址:</h2>
      <el-input v-model="inputip" placeholder="127.0.0.1" clearable></el-input>
      <el-button type="primary">提交</el-button>
 -->
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="源主机IP地址:">
          <el-input v-model="formLabelAlign.sip"></el-input>
        </el-form-item>
        <el-form-item label="目标IP地址:">
          <el-input v-model="formLabelAlign.dip"></el-input>
        </el-form-item>
        <el-form-item label="目标端口:">
          <el-input v-model="formLabelAlign.port"></el-input>
        </el-form-item>
        <el-button type="primary">提交</el-button>
      </el-form>


  </el-main>
</div>
</template>


<script>
  export default {
    data() {
      return {
        labelPosition: 'top',
        inputip: '',
        formLabelAlign: {
          sip: '',
          dip: '',
          port: ''
        }

      }
    },
  };

</script>


