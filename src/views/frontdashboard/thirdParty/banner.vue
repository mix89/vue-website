<template>
    <div>
        <div class="fix">
            <div class="info_box">
                <div class="info_cell">
                    <div class="info_img">
                        <!-- <img :src="adminprotraitSrc" alt=""> -->
                    </div>
                    <div class="info_intro">
                        <div class="fix layout_table">
                            <div class="tel">
                                <div class="w130">{{userName}}</div>
                            </div>
                            <div class="financing" v-if="customerType=='1'">融资方</div>
                            <div class="financing" v-else-if="customerType=='2'">托管机构</div>
                            <div class="financing" v-else-if="customerType=='3'">价值评估机构</div>
                            <div class="financing" v-else-if="customerType=='4'">风险评估机构</div>
                        </div>
                        <div>
                            <span class="company">{{customerName}}</span>
                        </div>
                    </div>
                </div>
                <div class="info_descript"></div>
                <div class="info_button">
                    <button class="basic_button" @click="showPersonalCenter_third">个人中心</button>
                </div>
                <div class="info_login_time" v-if="lastLoginTime">上次登录 {{lastLoginTime}}</div>
                <div></div>
                <div></div>
            </div>
            <div class="banner">
                <img :src="bannerSrc" alt="banner">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "", //用户账号
      customerType: JSON.parse(localStorage.getItem("user_front")).customerType, //企业类型,: value
      roleCode: JSON.parse(localStorage.getItem("user_front")).userRoles[0]
        .roleCode, //账号类型,

      bannerSrc: require("../../../assets/images/banner.png") //图片路径
    };
  },
  created(){
    let userInfo = JSON.parse(localStorage.getItem("user_front"));
    // console.log(userInfo);
    this.customerName = userInfo.customerName;
    this.userName = userInfo.userName;
    this.customerType = userInfo.customerType;
    this.lastLoginTime = userInfo.memberInfo.lastLoginTime;
  },
  methods:{
    showPersonalCenter_third(){
        this.$router.push({ name: "PersonalCenterThird" }); 
    }
  }
};
</script>

<style scoped>
</style>