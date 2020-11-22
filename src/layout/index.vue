<template>
  <el-container>
    <el-aside width="200px">
      <AppAside />
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style lang='scss' scoped>
.el-container {
  min-height: 100vh;
  min-width: 980px;
}
.el-header {
  background-color: #fff;
}
.el-aside {
  background-color: #b3c0d1;
}
.el-main {
  background-color: #E9EEF3;
}
</style>
