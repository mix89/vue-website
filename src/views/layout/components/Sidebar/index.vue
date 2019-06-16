<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="h100p">
    <div><img :src="logoIcon" alt="" class="admin_logo"></div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#171F22"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      
    </el-menu> 
    </div>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  data() {
    return {
      // logoIcon: require("../../../../assets/images/admin_title.png")
    };
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
<style>
.admin_logo {
  width: 200px;
  height: 100px;
}
.h100p{
  height: 100%;
  background: #171F22;
}
</style>

