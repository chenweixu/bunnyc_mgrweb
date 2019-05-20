<template>
<div id="nginx" style="width: 100%">
  <el-main>
  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">

    <el-tab-pane label="应用管理" name="single">
    <el-row :gutter="5">
      <el-col :span="6">
      <el-input v-model="server" placeholder="目标主机ipv4" clearable></el-input>
      </el-col>
      <el-col :span="12">
      <el-button type="primary" v-on:click="nginxManager('start')">启动</el-button>
      <el-button type="primary" v-on:click="nginxManager('stop')">停止</el-button>
      <el-button type="primary" v-on:click="nginxManager('reload')">重载配置</el-button>
      <el-button type="primary" v-on:click="nginxManager('show_access_log')">访问日志</el-button>
      <el-button type="primary" v-on:click="nginxManager('show_error_log')">错误日志</el-button>
      </el-col>
    </el-row>
    </el-tab-pane>

    <el-tab-pane label="后台服务管理" name="backupservice">
    <el-row :gutter="5">
      <el-col :span="3">
      <el-select v-model="backstage.zone" placeholder="区域">
        <el-option label="DMZ域" value="dmz"></el-option>
        <el-option label="核心域" value="cd"></el-option>
        <el-option label="日志" value="log"></el-option>
        <el-option label="登出" value="logout"></el-option>
      </el-select>
      </el-col>

      <el-col :span="5">
        <el-input v-model="backstage.ip" placeholder="服务器IP" clearable></el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="backstage.port" placeholder="服务器端口">
          <el-option label="all" value="all"></el-option>
          <el-option label="17101" value="17101"></el-option>
          <el-option label="17102" value="17102"></el-option>
          <el-option label="17103" value="17103"></el-option>
          <el-option label="17104" value="17104"></el-option>
          <el-option label="17105" value="17105"></el-option>
          <el-option label="17106" value="17106"></el-option>
        </el-select>
      </el-col>
    <el-col :span="10">
      <el-button type="primary" v-on:click="nginxManager('shield')">屏蔽后台</el-button>
      <el-button type="primary" v-on:click="nginxManager('cancelShield')">解除屏蔽</el-button>
      </el-col>
    </el-row>
    </el-tab-pane>

    <el-tab-pane label="IP地址屏蔽" name="iplock">
    <el-row :gutter="5">
      <el-col :span="6">
      <el-input v-model="lockip" placeholder="锁定IP" clearable></el-input>
    </el-col>
    <el-col :span="15">
      <el-button type="primary" v-on:click="nginxManager('lock')">锁定</el-button>
      <el-button type="primary" v-on:click="nginxManager('unlock')">解锁</el-button>
      <el-button type="primary" v-on:click="nginxManager('showlock')">查看当前已锁定IP</el-button>
      <el-button type="primary" v-on:click="nginxManager('clearlock')">清除全部锁定IP</el-button>
      </el-col>
    </el-row>
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
  var task

  export default {
    data() {

      return {
        displayData: false,
        rundata: '',
        server: '',
        activeName2: 'single',
        nginxip: '',
        lockip: '',
        backstage: {
          ip: '',
          port: '',
          zone: '',
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        this.displayData = false;
        // console.log(tab, event);
      },
      nginxManager(mess) {
        this.displayData = false;
        console.log(mess)

        data = {
            "key": "c1c2",
            "obj": "service",
            "content": {
                "unit": "nginx",
                "task": mess,
                }
        };

        if (mess == "lock" || mess == "unlock") {
          data.content.ip = this.lockip
        } else if (
          mess == "start" || mess == "stop" || mess == "reload" ||
          mess == "show_access_log" || mess == "show_error_log") {
            data.content.server = this.server
        } else if (mess == "shield" || mess == "cancelShield") {
          data.content.ip = this.backstage.ip
          data.content.port = this.backstage.port
          data.content.zone = this.backstage.zone
        }

        console.log(data)

        axios.post(opsurl, data)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            if (res.data.recode == 0) {
              if (mess=='start') {
                this.$notify({type: 'success', title: '成功',message: '启动成功'});
              } else if (mess=='stop') {
                this.$notify({type: 'success', title: '成功',message: '停止成功'});
              } else if (mess=='reload') {
                this.$notify({type: 'success', title: '成功',message: '重载成功'});
              } else if (mess=='show_access_log') {
                this.$notify({type: 'success', title: '成功',message: '显示访问日志成功'});
                this.displayData = true;
                this.rundata = '<pre>'+res.data.redata+'</pre>';
              } else if (mess=='show_error_log') {
                this.$notify({type: 'success', title: '成功',message: '显示错误日志成功'});
                this.displayData = true;
                this.rundata = '<pre>'+res.data.redata+'</pre>';
                // this.rundata = res.data.redata;
              } else if (mess == "lock") {
                this.$notify({type: 'success', title: '成功',message: '锁定IP成功'});
              } else if (mess == "unlock") {
                this.$notify({type: 'success', title: '成功',message: '解锁IP成功'});
              } else if (mess == "clearlock") {
                this.$notify({type: 'success', title: '成功',message: '清理全部锁定成功'});
              } else if (mess == "showlock") {
                this.$notify({type: 'success', title: '成功',message: '显示锁定IP'});
                this.displayData = true;
                this.rundata = '<pre>'+res.data.redata+'</pre>';
              } else if (mess == "shield") {
                this.$notify({type: 'success', title: '成功',message: '屏蔽服务成功'});
              } else if (mess == "cancelShield") {
                this.$notify({type: 'success', title: '成功',message: '解除屏蔽成功'});
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


