<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <span class="position">位置: </span><breadcrumb />
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  border-radius: 0px !important;
  border-bottom: 0;
  background: #F8F9FA;
  .hamburger-container {
    line-height: 36px;
    height: 32px;
    float: left;
    padding: 0 6px;
  }
  // .screenfull {
  //   position: absolute;
  //   right: 90px;
  //   top: 16px;
  //   color: red;
  // }
 
  .position{
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
  }
  
// 清除el menu样式
.el-menu--horizontal{
  border-bottom: 0;
}
.navbar{
  line-height: 32px !important;
  height: 32px !important;
}

}
</style>

