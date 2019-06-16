<template>
    <div>
        <slot name="page_header">
            <div class="page_header">
                <PageTopBar/>
                <div class="page_head_container">
                    <div class="page_container">
                        <div class="page_head_menu">
                            <Logo />
                            <div class="menu_container" :class="{menu_container1:menuState==1}">
                                <ul class="menu_list fix ">

                                    <router-link
                                        :to="{name:'frontdashboard'}"
                                        tag="li"
                                        index="1"
                                        extract
                                    >首页</router-link>
                                     <div>
                                       <div v-if="whreceiptShow">
                                         <router-link
                                           :to="whreceiptManager"
                                           tag="li"
                                           index="2"
                                           extract
                                         >仓单管理服务</router-link>
                                       </div>
                                       <div v-if="receiveableShow">
                                         <router-link
                                           :to="receiveableManage"
                                           tag="li"
                                           index="3"
                                           extract
                                         >应收管理服务</router-link>
                                       </div>
                                             <li class="disabled">
                                           订单管理服务
                                           <div class="menu_tips">

                                             敬请期待
                                           </div>
                                         </li>
                                         <li class="disabled">
                                           资产包管理服务
                                           <div class="menu_tips">
                                             敬请期待
                                           </div>
                                         </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
import PageTopBar from "@/views/layout/components/PageTopBar";
import Logo from "@/views/layout/components/Logo";

export default {
  data() {

    return {
      menuState:0,
      whreceiptShow:true,
      receiveableShow:true,
      whreceiptManager:{},
      receiveableManage:{},

      roleCode:'',
      userRoles: [],
      customerType:"",
      logoSrc: require("../../../../assets/images/logo.png")
    };
  },
  components: {
    PageTopBar,
    Logo
  },
  created(){
     let user = JSON.parse(localStorage.getItem('user_front'))
      this.userRoles = user.userRoles
      this.roleCode = this.userRoles[0].roleCode
      this.customerType = user.customerType

      if(this.customerType == '1'){
        //融资方
        this.whreceiptShow = true
        this.receiveableShow = true
        if(this.roleCode == "L1000"){
          //企业管理人员
          this.whreceiptManager = {name:'whreceiptManageAdminList'}
          this.receiveableManage= {name:'receiveableManageAdminList'}
        }else if(this.roleCode == "L1001"){
          //企业信息录入员
          this.whreceiptManager = {name:'whreceiptManageUserList'}
          this.receiveableManage= {name:'receiveableManageUserList'}
        }else if(this.roleCode == "L1002"){
          //企业信息审核员
          this.whreceiptManager = {name:'whreceiptManageCheckList'}
          this.receiveableManage= {name:'receiveableManageCheckList'}
        }

      }else if(this.customerType == '3'){
        //价值评估方
        this.whreceiptShow = true
        this.receiveableShow = false
        this.menuState = 1
        this.whreceiptManager = {name:'valueAssessmentList'}
      }else if(this.customerType == '4'){
        //风险评估方
        this.whreceiptShow = true
        this.receiveableShow = true
        this.whreceiptManager = {name:'riskAssessmentList'}
        this.receiveableManage= {name:'receiveRiskAssessmentList'}
      }else if(this.customerType == '2'){
        //托管机构
        this.whreceiptShow = true
        this.receiveableShow = true
        this.whreceiptManager = {name:'custodianInstitutionList'}
        this.receiveableManage= {name:'receiveCustodianInstitutionList'}
      }
  }
};
</script>

