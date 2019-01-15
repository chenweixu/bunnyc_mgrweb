<template>
<div id="app">
<el-container style="height: 600px;border: 1px solid #eee">
  <leftpage></leftpage>
  <el-container>
    <router-view></router-view>
  </el-container>
</el-container>
</div>
</template>


<script>

import leftpage from './components/left_page.vue'

export default {
  data() {
    return {}
  },
  components: {
    leftpage
  }
};
</script>


