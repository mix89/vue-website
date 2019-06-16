<template>
    <div>
        <PageHead/>
        <div class="page_container">
            <!-- L1000	企业管理人员
            L1001	企业信息录入员
            L1002	企业信息审核员-->
            <div v-if="customerType==='1'">
                <!-- 企业管理人员 -->
                <div v-if="roleCode == 'L1000'">
                    <Info/>
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
                                <button class="basic_button" @click="showPersonalCenter" style="margin-left:-7px">个人中心</button>
                            </div>
                            <div class="info_login_time" v-if="lastLoginTime" style="margin-left:-7px">上次登录 {{lastLoginTime}}</div>
                            <div></div>
                            <div></div>
                        </div>
                        <div class="banner">
                            <img :src="bannerSrc" alt="banner">
                        </div>
                    </div>
                    <adminDashboard/>
                </div>
                <!-- 企业审核员 -->
                <div v-else-if="roleCode == 'L1002'">
                    <checkDashboard />
                </div>
                <!-- 企业录入员 -->
                <div v-else-if="roleCode == 'L1001'">
                    <userDashboard />
                </div>
            </div>
             <!-- 第三方价值评估机构 -->
            <div v-else-if="customerType==='3'">
                  <Info/>
                  <banner />
                 <valueDashboard/>
            </div>
            <!-- 第三方风险评估机构 -->
            <div v-else-if="customerType==='4'">
                 <Info/>
                 <banner />
                <riskDashboard/>
            </div>
            <!-- 第三方保管机构  -->
            <div v-else-if="customerType==='2'">
                 <Info/>
                 <banner />
                <custodianInstitutionDashboard/>
            </div>
        </div>
    </div>
</template>

<script>
import banner from "@/views/frontdashboard/thirdParty/banner"
import Info from "../../views/layout/components/Info";
import { requestPost, requestGet } from "@/api/parent";
import PageHead from "@/views/layout/components/PageHead";
import { mapGetters } from "vuex";
import adminDashboard from "@/views/frontdashboard/adminDashboard";
import checkDashboard from "@/views/frontdashboard/checkDashboard";
import userDashboard from "@/views/frontdashboard/userDashboard";

import valueDashboard from "@/views/frontdashboard/valueDashboard";
import riskDashboard from "@/views/frontdashboard/riskDashboard";
import custodianInstitutionDashboard from "@/views/frontdashboard/custodianInstitutionDashboard";




// import financingList from "@/views/frontdashboard/financingList";


// import valueList from "@/views/frontdashboard/valueList"
// import riskList from "@/views/frontdashboard/riskList"
// import custodianInstitutionList from "@/views/frontdashboard/custodianInstitutionList"

export default {
  data() {
    return {
      //   roleCode:'',
      userRoles: [],
      options: [{ key: 0, value: "a" }, { key: 1, value: "b" }],

      //获取用户信息
      customerName: "", //企业名称
      userName: "", //用户账号
      customerType: JSON.parse(localStorage.getItem("user_front")).customerType, //企业类型,
      roleCode: JSON.parse(localStorage.getItem("user_front")).userRoles[0].roleCode, //账号类型,
      lastLoginTime: "",

      //图片路径
      bannerSrc: require("../../assets/images/banner.png"),
      //tabs
      activeName: "first"
    };
  },
  components: {
    PageHead,
    Info,
    adminDashboard,
    checkDashboard,
    userDashboard,
    banner,
    valueDashboard,
    riskDashboard,
    custodianInstitutionDashboard
    // financingList
    // valueList,
    // riskList,
    // custodianInstitutionList
  },
  computed: {
    // ...mapGetters([
    //   'name',
    //   'roles'
    // ])
    // username() {
    //   return "abc";
    // }
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("user_front"));
    console.log(userInfo);
    this.customerName = userInfo.customerName;
    this.userName = userInfo.userName;
    this.customerType = userInfo.customerType;
    this.lastLoginTime = userInfo.memberInfo.lastLoginTime;
  },
  methods: {
    handleClick() {
      console.log("");
    },
    showPersonalCenter() {
      this.$router.push({ name: "personalCenter" });
    },
  }
  //   beforeRouteEnter(to,from,next){
  //       if(to.meta.instiuation){
  //           console.log(1)
  //         next()
  //       }else{
  //           console.log(2)
  //         next({name:"thirdPartyList"})
  //       }

  //     //   else if(to.meta.instiuation==='b'){
  //     //       console.log(2)
  //     //       next({name:"thirdPartyList"})
  //     //   }
  //     //  console.log(3)
  //     // console.log(vm)
  //     //  next()
  //   }
};
</script>

