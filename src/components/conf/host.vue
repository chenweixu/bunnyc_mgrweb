<template>
<div id="confhost" style="width: 100%">
  <el-main>

    <el-form :inline="true" :model="searchform" class="demo-form-inline">
      <el-form-item label="目标IP地址:">
        <el-input v-model="searchform.ip"></el-input>
      </el-form-item>
      <el-button type="primary" v-on:click="show()">查询</el-button>
      <el-button type="primary" v-on:click="show('all')">查询全部主机</el-button>
      <el-button type="primary" @click="dialogFormVisible=true,addHost()">增加主机</el-button>
    </el-form>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      height="400"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <!-- 固定表头 -->

      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="id" label="设备ID"></el-table-column>
      <el-table-column prop="ip_v4" label="IP"></el-table-column>
      <el-table-column prop="name" label="别名"></el-table-column>
      <el-table-column prop="hostname" label="主机名"></el-table-column>
      <el-table-column prop="address" label="设备区域"></el-table-column>
      <el-table-column prop="level" label="级别" width="50"></el-table-column>
      <el-table-column prop="operating_system" label="操作系统"></el-table-column>
      <el-table-column prop="cpu_number" label="CPU核心数"></el-table-column>
      <el-table-column prop="memory_size" label="内存(GB)"></el-table-column>

    <el-table-column label="操作" fixed="right" width="150">
      <template slot-scope="scope">
          <el-button size="mini" type="danger"
            @click="dialogFormVisible=true,showHostData(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger"
            @click="handleDelete(scope.$index, scope.row, tableData)">删除</el-button>
      </template>
    </el-table-column>

    </el-table>

  <div style="margin-top: 20px">
    <el-button @click="selectionAll()">全选</el-button>
    <el-button @click="clearSelectionAll()">取消选择</el-button>
  </div>

<!-- 弹框，用于编辑配置 -->
<el-dialog title="编辑属性" :visible.sync="dialogFormVisible">
  <el-form :model="editFromData" :label-width="formLabelWidth">

    <el-row :gutter="5">
      <el-col :span="10">
        <el-form-item label="IPv4地址" :label-width="formLabelWidth">
          <el-input v-model="editFromData.ip_v4" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="14">
        <el-form-item label="IPv4管理地址">
          <el-input v-model="editFromData.ip_v4_m" autocomplete="off"></el-input>
      </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="IPv6地址" :label-width="formLabelWidth">
      <el-input v-model="editFromData.ip_v6" autocomplete="off"></el-input>
    </el-form-item>


    <el-form-item label="操作系统" :label-width="formLabelWidth">
      <el-input v-model="editFromData.operating_system" autocomplete="off"></el-input>
    </el-form-item>
    <el-row :gutter="5">
      <el-col :span="10">
    <el-form-item label="别名" :label-width="formLabelWidth">
      <el-input v-model="editFromData.name" autocomplete="off"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="14">
    <el-form-item label="系统主机名" :label-width="formLabelWidth">
      <el-input v-model="editFromData.hostname" autocomplete="off"></el-input>
    </el-form-item>
  </el-col>
</el-row>

    <el-row :gutter="5">
      <el-col :span="10">
    <el-form-item label="CPU核心数" :label-width="formLabelWidth">
      <el-input v-model="editFromData.cpu_number" autocomplete="off"></el-input>
    </el-form-item>
  </el-col>
<el-col :span="14">
    <el-form-item label="内存GB" :label-width="formLabelWidth">
      <el-input v-model="editFromData.memory_size" autocomplete="off"></el-input>
    </el-form-item>
  </el-col>
</el-row>
    <el-form-item label="序列号" :label-width="formLabelWidth">
      <el-input v-model="editFromData.sn" autocomplete="off"></el-input>
    </el-form-item>
    <el-row :gutter="5">
      <el-col :span="10">
    <el-form-item label="地理位置" :label-width="formLabelWidth">
      <el-select v-model="editFromData.address" placeholder="请选择位置">
        <el-option label="北京" value="北京"></el-option>
        <el-option label="廊坊" value="廊坊"></el-option>
        <el-option label="南京" value="南京"></el-option>
        <el-option label="深圳" value="深圳"></el-option>
      </el-select>
    </el-form-item>
  </el-col>

  <el-col :span="14">
    <el-form-item label="机房" :label-width="formLabelWidth">
      <el-select v-model="editFromData.belong_machineroom" placeholder="请选择机房">
        <el-option label="2002" value="2002"></el-option>
        <el-option label="2003" value="2003"></el-option>
        <el-option label="2006" value="2006"></el-option>
        <el-option label="2062" value="2062"></el-option>
      </el-select>

    </el-form-item>
  </el-col>
</el-row>

    <el-row :gutter="5">
      <el-col :span="10">
    <el-form-item label="机柜" :label-width="formLabelWidth">
      <el-input v-model="editFromData.rack" autocomplete="off"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="14">
    <el-form-item label="厂商" :label-width="formLabelWidth">
      <el-select v-model="editFromData.manufacturer" placeholder="请选择厂商">
        <el-option label="HP" value="HP"></el-option>
        <el-option label="浪潮" value="浪潮"></el-option>
        <el-option label="华为" value="华为"></el-option>
      </el-select>
    </el-form-item>
  </el-col>
</el-row>
    <el-row :gutter="5">
      <el-col :span="10">
    <el-form-item label="设备型号" :label-width="formLabelWidth">
      <el-input v-model="editFromData.dev_type" autocomplete="off"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="14">
    <el-form-item label="设备类别" :label-width="formLabelWidth">
      <el-select v-model="editFromData.dev_category" placeholder="请选择设备类别">
        <el-option label="服务器" value="服务器"></el-option>
        <el-option label="网络设备" value="网络设备"></el-option>
      </el-select>
    </el-form-item>
  </el-col>
</el-row>

    <el-row :gutter="5">
      <el-col :span="10">
    <el-form-item label="生产" :label-width="formLabelWidth">
      <el-select v-model="editFromData.produce" placeholder="请选择环境">
        <el-option label="生产" value="0"></el-option>
        <el-option label="非生产" value="1"></el-option>
      </el-select>
    </el-form-item>
      </el-col>
      <el-col :span="14">
  <el-form-item label="级别" :label-width="formLabelWidth">
      <el-select v-model="editFromData.level" placeholder="请选择级别">
        <el-option label="业务-核心-关键" value="1"></el-option>
        <el-option label="业务-核心-普通" value="2"></el-option>
        <el-option label="业务-普通" value="3"></el-option>
        <el-option label="测试-核心" value="4"></el-option>
        <el-option label="测试-普通" value="5"></el-option>
        <el-option label="管理" value="6"></el-option>
        <el-option label="空闲" value="9"></el-option>
      </el-select>
    </el-form-item>
  </el-col>
</el-row>

    <el-form-item label="备注" :label-width="formLabelWidth">
      <el-input v-model="editFromData.info" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false,editHostData()">确 定</el-button>
  </div>
</el-dialog>

  </el-main>
</div>
</template>


<script>
  import axios from "axios"
  var opsurl = 'api/v2/cmdb/host'
  var task
  var data
  var modifyOldData

  export default {
    data() {
      return {
        dialogFormVisible: false,   // 默认不显示弹框
        formLabelWidth: '100px',

        searchform: {
          ip: '127.0.0.1'
        },

        // 编辑时的临时数据
        editFromData: {
        },

        // 表单数据，从服务器拉取的数据
        tableData: [
          {
            id: 2002,
            ip_v4: '10.2.1.5',
            name: '测试数据',
            hostname: 'testhost',
            address: '北京',
            level: '1',
            operating_system: 'rhel',
            cpu_number: '16',
            memory_size: '1023832',
          }
        ]
      }
    },

    methods: {
      show: function (mess) {
        if (mess=='all') {task='showall'} else {task='show'}
        data = {
            "key": "c1c2",
            "obj": "cmdb",
            "content": {
                "task": task,
                "unit": "host",
                "ip": this.searchform.ip
                }
        }
        console.log(data)
        axios.post(opsurl, data)

        .then((res) => {
          // console.log(res.status)
          if (res.status == 200) {
            console.log(res.data)
            if (res.data.recode == 0) {
              this.tableData = res.data.redata
            } else {
              this.tableData = []
              console.log('search not found')
              console.log(res.data)
            }
          }
        })

        .catch(function (error) {
          // 这里是处理错误的回调
          console.log(error);
        });
    },

    addHost: function () {
      task = 'add'
      this.editFromData = {
            ip_v4: '10.2.10.7',
            name: 'WEB网站',
            hostname: 'testhost01',
            address: '北京',
            operating_system: 'rhel4',
            cpu_number: 16,
            memory_size: 128,
            belong_machineroom: '2002',
            manufacturer: '华为',
            dev_type: 'dl380',
            dev_category: '服务器',
            produce: '0',
            level: '1',
      }  // 更新弹框默认内容





    },


    selectionAll() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    clearSelectionAll() {
      this.$refs.multipleTable.clearSelection();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // handleEdit(index,row) {
    //   console.log(index, row)
    //   this.$prompt('请输入邮箱', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    //     inputErrorMessage: '邮箱格式不正确'
    //   }).then(({ value }) => {
    //     this.$message({
    //       type: 'success',
    //       message: '编辑成功: ' + value
    //     });
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消输入'
    //     });
    //   });
    // },

    handleDelete(index,row,rows) {
      console.log(index, row)
      data = {
          "key": "c1c2",
          "obj": "cmdb",
          "content": {
              "task": 'del',
              "unit": "host",
              "id": row.id
              }
      }

      this.$confirm('确认删除该主机, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('put start')
        console.log(data)
        axios.post(opsurl, data)
        .then((res) => {
          if (res.status == 200) {
            if (res.data.recode == 0) {
              rows.splice(index, 1)
              // this.$message({type: 'success',message: '删除成功!'});
              this.$notify({type: 'success', title: '成功',message: '删除成功'});
              console.log('del host -- yes')
              console.log(res.data)
            } else {
              this.$notify({type: 'error', title: '失败',message: '删除主机失败'});
              console.log('error')
              console.log(res.data)
            }
          }
        })

        .catch(function (error) {
          // 这里是处理错误的回调
          console.log(error);
        })

      }).catch(() => {
        this.$message({type: 'info',message: '已取消删除'});
      });
    },

    showHostData(row) {
      // 点击主机编辑
      task = 'update'
      console.log(row)
      console.log(this.tableData)
      for (var x in this.tableData) {
        console.log(x)
        console.log(row.id)
        if (this.tableData[x].id == row.id) {
          modifyOldData = this.tableData[x]
          // 保存修改前的此行数据的区域位置

          this.editFromData = Object.assign({},this.tableData[x])
          // 合并对象
          // Object.assign(form, obj);
          console.log('合并原始数据到编辑数据')
          console.log(this.editFromData)
          break
        }
      }

    },

    editHostData() {
      console.log(this.editFromData)
      console.log(task)
      data = {
          "key": "c1c2",
          "obj": "cmdb",
          "content": {
              "task": task,
              "unit": "host",
              "body": this.editFromData
              }
      }
      console.log('edit host start')
      console.log(data)

      axios.post(opsurl, data)
      .then((res) => {
        if (res.status == 200) {
          if (res.data.recode == 0) {
            console.log('update host -- yes')
            console.log(res.data)
            if (task == 'update') {
              // this.$message.success('编辑成功');
              this.$notify({type: 'success', title: '成功',message: '编辑主机成功'});
              Object.assign(modifyOldData, this.editFromData);
              // 将新数据合并到旧区域，达到修改成功后同步修改页面显示的效果
            } else {
              // this.$message.success('新增成功');
              this.$notify({type: 'success', title: '成功',message: '新增主机成功'});
              // 新增主机成功后，是否需要立即在页面上显示
              // 还时暂时不显示，待用户点击查询
            }

          } else {
            if (task == 'add') {
              // this.$message.error('新增失败');
              this.$notify({type: 'success', title: '成功',message: '新增主机成功'});
            }
            else {
              // this.$message.error('修改失败');
              this.$notify({type: 'error', title: '失败',message: '新增主机失败'});
            }
            console.log('error')
            console.log(res.data)
          }
        }
      })

      .catch((error) => {
        // 这里是处理错误的回调
        this.$notify({type: 'error', title: '失败',message: '操作失败'});
        console.log(error);
      })


    }




    },
  };
</script>
