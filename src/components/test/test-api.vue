<template>
<el-main>
<el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">

<el-tab-pane label="文件上传" name="upload">

<el-form :inline="true" :model="uploadData" class="demo-form-inline">
<el-row>
  <el-form-item label="目标IP地址:" label-width="90px">
    <el-input v-model="uploadData.ip" placeholder="目标IP:127.0.0.1" clearable></el-input>
  </el-form-item>
</el-row>
<el-row>
  <el-form-item label="系统用户名:" label-width="90px">
    <el-input v-model="uploadData.user" placeholder="defuat" clearable></el-input>
  </el-form-item>
</el-row>
<el-row>
  <el-form-item label="文件目录:" label-width="90px">
    <el-input v-model="uploadData.dir" placeholder="/dir/" clearable></el-input>
  </el-form-item>
</el-row>
<el-row :gutter="10">


  <el-col :span="5">
<el-upload
  class="upload-demo"
  ref="upload"
  :action="uploadurl"
  :data="upload_data"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-error="uploadError"
  :auto-upload="false"
  :on-success="uploadSuccess"
  multiple>
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
</el-upload>
</el-col>

  <el-col :span="2">
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
  </el-col>

</el-row>
</el-form>

</el-tab-pane>
<el-tab-pane label="文件下载" name="filedown">

<el-form :inline="true" :model="downData" class="demo-form-inline">
<el-row>
  <el-form-item label="目标IP地址:" label-width="90px">
    <el-input v-model="downData.ip" placeholder="目标IP:127.0.0.1" clearable></el-input>
  </el-form-item>
</el-row>
<el-row>
  <el-form-item label="系统用户名:" label-width="90px">
    <el-input v-model="downData.user" placeholder="defuat" clearable></el-input>
  </el-form-item>
</el-row>
<el-row>
  <el-form-item label="文件路径:" label-width="90px">
    <el-input v-model="downData.file" placeholder="/dir/file1" clearable></el-input>
  </el-form-item>
</el-row>
<el-row :gutter="20">
  <el-col :span="15">
    <el-button size="small" type="primary" v-on:click="downFile()">下载文件</el-button>
  </el-col>
</el-row>
</el-form>


</el-tab-pane>
</el-tabs>

</el-main>
</template>

<script>
  import axios from "axios"
  var data
  var downurl = "api/v2/downfile"

  export default {
    data() {
      return {
        activeName: "upload",
        uploadurl: "api/v2/upload",
        uploadData: {
          ip: '',
          dir: '',
          user: ''
        },
        downData: {
          ip: '',
          file: '',
          user: ''
        },
      };
    },

    computed: {
      upload_data(){
          return this.uploadData
      }
    },

    methods: {
      handleClick(tab, event) {
        this.uploadData = {};
        this.downData = {};
        // console.log(tab, event);
      },

      downFile() {
        data = {
            "key": "c1c2",
            "obj": "file",
            "content": {
                "unit": "file",
                "task": "down",
                "ip": this.downData.ip,
                "file": this.downData.file,
                "user": this.downData.user
                }
        };

        axios.post(downurl, data)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            if (res.data.recode == 0) {
                this.$notify({type: 'success', title: '成功',message: '下载成功'});
                // window.location.href=res.data.redata
                window.open(res.data.redata);
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
      },

      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePreview(file) {
        console.log(file);
      },
      uploadError() {
        this.$notify({type: 'error', title: '上传失败',message: '连接失败'});
      },
      uploadSuccess(res) {
        console.log(res)
        if (res.recode == 0) {
            this.$notify({type: 'success', title: '上传成功',message: '上传成功'});
        } else {
          this.$notify({type: 'error', title: '上传失败',message: res.redata});
        }

      }
    }
  }
</script>
