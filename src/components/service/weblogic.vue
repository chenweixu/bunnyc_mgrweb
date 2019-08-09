<template>
<div id="weblogic" style="width: 100%">
  <el-main>

  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">

    <el-tab-pane label="单机管理" name="single">
    <el-row :gutter="5">
      <el-col :span="5">
      <el-input v-model="single_service.server" placeholder="目标主机ipv4" clearable></el-input>
      </el-col>
      <el-col :span="4">
      <el-select v-model="single_service.server_num" placeholder="请选择服务">
        <el-option
          v-for="item in single_service.servicenumberoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>

      <el-col :span="15">
      <el-button type="primary" v-on:click="weblogicManager('start')">启动</el-button>
      <el-button type="primary" v-on:click="weblogicManager('stop')">停止</el-button>
      <el-button type="primary" v-on:click="weblogicManager('accesslog')">访问日志</el-button>
      <el-button type="primary" v-on:click="weblogicManager('projectlog')">业务日志</el-button>
      <el-button type="primary" v-on:click="weblogicManager('gclog')">GC日志</el-button>
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
      <el-button type="primary" v-on:click="weblogicGroupManager('start')">启动</el-button>
      <el-button type="primary" v-on:click="weblogicGroupManager('stop')">停止</el-button>
      <el-button type="primary" v-on:click="weblogicGroupManager('check')">检查</el-button>
    </el-tab-pane>

  </el-tabs>

    <div style="background-color: #C0C0C0;">
      <template v-if="displayData">
      <h4>执行结果：</h4>
          <span v-html="rundata"></span>
      </template>
    </div>

<div>
  <template v-if="displayTableData">
    <el-table
      :data="grouprundata"
      border
      style="width: 100%">
      <el-table-column
        prop="ip"
        label="IP地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="recode"
        label="状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="redata"
        label="信息">
      </el-table-column>
    </el-table>
  </template>
</div>

<div>
  <template v-if="displayCheckTableData">
    <br>
    <el-table
      :data="groupcheckdata"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="id"
        label="ID"
        width="40">
      </el-table-column>
      <el-table-column
        prop="url"
        label="URL"
        width="300">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="150">
      </el-table-column>
    </el-table>
  </template>
</div>

  </el-main>
</div>
</template>

<style>
  .el-table .warning-row {
    background: #F56C6C;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  import axios from "axios"
  var opsurl = 'api/v2/service'
  var data
  var checkData
  var new_checkData

  export default {
    data() {
      return {
        inputurl: '',
        activeName2: 'single',

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
        displayTableData: false,
        displayCheckTableData: false,
        rundata: '',
        grouprundata: [],
        groupcheckdata: [],
        group: '',
        groupoptions: [
          {value: 'all',label: 'all'},
          {value: 'dmz1',label: 'dmz1'},
          {value: 'dmz2',label: 'dmz2'},
          {value: 'dmz3',label: 'dmz3'},
          {value: 'cd1',label: 'cd1'},
          {value: 'cd2',label: 'cd2'},
          {value: 'log1',label: 'log1'},
          {value: 'log2',label: 'log2'},
        ]
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        console.log(row)
        if (row.status != 200) {
          return 'warning-row';
        }
        return '';
      },

      handleClick(tab, event) {
        // console.log(tab, event);
        this.displayData = false;
        this.displayTableData = false;
        this.displayCheckTableData = false;
      },
      weblogicManager(mess) {
        this.displayData = false;
        this.displayTableData = false;
        this.displayCheckTableData = false;
        console.log(mess)
        data = {
            "key": "c1c2",
            "obj": "service",
            "content": {
                "unit": "weblogic",
                "types": "single",
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
              } else if (mess=='accesslog' || mess=='gclog' || mess=="projectlog") {
                this.$notify({type: 'success', title: '成功',message: '获取日志成功'});
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
      },

      weblogicGroupManager(mess) {
        this.displayData = false;
        this.displayTableData = false;
        this.displayCheckTableData = false;
        console.log(mess)
        data = {
            "key": "c1c2",
            "obj": "service",
            "content": {
                "unit": "weblogic",
                "types": "group",
                "task": mess,
                "group": this.group
                }
        };
        console.log(data)

        axios.post(opsurl, data)
        .then((res) => {
          console.log(res.data)
          if (res.status == 200) {
            if (res.data.recode == 0) {
              if (mess=='start') {
                this.displayTableData = true
                this.grouprundata = res.data.redata
                this.$notify({type: 'success', title: '成功',message: '启动成功'});
              } else if (mess=='stop') {
                this.displayTableData = true
                this.grouprundata = res.data.redata
                this.$notify({type: 'success', title: '成功',message: '停止成功'});
              } else if (mess=='check') {
                this.displayCheckTableData = true;
                checkData = res.data.redata
                new_checkData = []          // 初始化检查数组
                for (var x in checkData) {
                    new_checkData.push(
                        {'id': x,'url': checkData[x][0],'status': checkData[x][1]}
                    )
                }
                console.log(checkData)
                console.log(new_checkData)
                this.groupcheckdata = new_checkData
                console.log(this.groupcheckdata)
                this.$notify({type: 'success', title: '成功',message: '检查成功'});
              }
            } else {
              this.$notify({type: 'error', title: '失败',message: res.data.redata});
              console.log(res.data.redata)
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


