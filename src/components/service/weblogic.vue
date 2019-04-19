<template>
<div id="weblogic" style="width: 100%">
  <el-main>

  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">

    <el-tab-pane label="单机管理" name="single">
    <el-row :gutter="5">
      <el-col :span="5">
      <el-input v-model="single_service.server" placeholder="目标主机ipv4" clearable></el-input>
      </el-col>
      <el-col :span="5">
      <el-select v-model="single_service.server_num" placeholder="请选择服务">
        <el-option
          v-for="item in single_service.servicenumberoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>

      <el-col :span="10">
      <el-button type="primary" v-on:click="weblogicManager('start')">启动</el-button>
      <el-button type="primary" v-on:click="weblogicManager('stop')">停止</el-button>
      <el-button type="primary"v-on:click="weblogicManager('accesslog')">访问日志</el-button>
      <el-button type="primary"v-on:click="weblogicManager('projectlog')">业务日志</el-button>
      </el-col>
    </el-row>
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
        inputurl: '',
        activeName2: 'single',
        group: '',

        single_service: {
          server: '127.0.0.1',
          server_num: '',
          servicenumberoptions: [
            {value: 'all',label: 'all'},
            {value: '17101',label: '17101'},
            {value: '17102',label: '17102'},
            {value: '17103',label: '17103'},
            {value: '17104',label: '17104'},
            {value: '17105',label: '17105'},
            {value: '17106',label: '17106'},
          ]
        },
        displayData: false,
        rundata: '',

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
        // console.log(tab, event);
        this.displayData = false;
      },
      weblogicManager(mess) {
        this.displayData = false;
        console.log(mess)
        data = {
            "key": "c1c2",
            "obj": "service",
            "content": {
                "unit": "weblogic",
                "task": mess,
                "server": this.single_service.server,
                "port": this.single_service.server_num
                }
        };
        if (this.single_service.server_num == 'all') {
          delete data.content.port;
        }
        console.log(data)

        axios.post(opsurl, data)
        .then((res) => {
          // console.log(res.status)
          if (res.status == 200) {
            console.log(res.data)
            if (res.data.recode == 0) {
              if (mess=='start') {
                this.$notify({type: 'success', title: '成功',message: '启动成功'});
              } else if (mess=='stop') {
                this.$notify({type: 'success', title: '成功',message: '停止成功'});
              } else if (mess=='accesslog') {
                this.$notify({type: 'success', title: '成功',message: '访问日志'});
                this.displayData = true;
                this.rundata = '<pre>'+res.data.redata+'</pre>';
              } else if (mess=='projectlog') {
                this.$notify({type: 'success', title: '成功',message: '业务日志'});
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


