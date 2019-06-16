<template>
    <div class="topbar">
        <div class="customer_drop">
            <div class="customer_info">
              158888888
              深圳兆易通科技有限公司
            </div>
            <div class="change_password">
              修改密码
            </div>
            <div class="last_login_time">
              上次登录
            </div>
        </div>
     

    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
   export default {
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
 .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
</style>