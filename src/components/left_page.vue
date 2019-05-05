<template>
<div id="left_page">

  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <span style="font-size: 25px;text-align: center;">运维管理平台</span>
    <el-menu unique-opened>
      <div class="mynav">
      <el-menu-item index="0"><router-link to="/">主页</router-link></el-menu-item>

      <el-submenu index="1">
        <template slot="title">主机管理</template>
          <el-menu-item index="1-1"><router-link to="/hostcmd">远程指令</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="/hostshow">系统监控</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="/index">ssh登陆</router-link></el-menu-item>
          <el-menu-item index="1-4"><router-link to="/file">文件上传/下载</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">网络管理</template>
          <el-menu-item index="2-1"><router-link to="/networktest">网络探测</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/index">主机防火墙</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="/index">HOST文件</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">服务管理</template>
          <el-menu-item index="3-1"><router-link to="/nginx">nginx</router-link></el-menu-item>
          <el-menu-item index="3-2"><router-link to="/weblogic">weblogic</router-link></el-menu-item>
          <el-menu-item index="3-3"><router-link to="/memcached">memcached</router-link></el-menu-item>
          <el-menu-item index="3-4"><router-link to="/index">mysql</router-link></el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">配置管理</template>
          <el-menu-item index="4-0"><router-link to="/confhost">主机配置</router-link></el-menu-item>
          <el-menu-item index="4-1"><router-link to="/confnginx">服务配置</router-link></el-menu-item>
          <el-menu-item index="4-2"><router-link to="/confuser">用户配置</router-link></el-menu-item>
      </el-submenu>

      <el-menu-item index="5"><router-link to="/other">其它系统</router-link></el-menu-item>
      <el-menu-item index="6"><router-link to="/index">运维文档</router-link></el-menu-item>
      <!-- <el-menu-item index="7"><router-link to="/testui">测试页-ui</router-link></el-menu-item> -->
      <!-- <el-menu-item index="7"><router-link to="/testapi">测试页-API</router-link></el-menu-item> -->
      </div>
    </el-menu>
  </el-aside>

</div>
</template>

<style>
.el-aside {
  color: #333;
}

.mynav a{
  color: #000;
  display: block;
  text-decoration: none;
  /*display:inline-block;*/
  /*padding:0 13px;*/
  /*color:#fff;*/
  /*border-radius:15px;*/
}
.mynav a.router-link-active{
  /*background:#c10514;*/
}

</style>




<script>
  export default {
    data() {
      return {
      }
    }
  };
</script>


