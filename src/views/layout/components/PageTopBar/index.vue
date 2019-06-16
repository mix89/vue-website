<template>
    <div class="page_head_dialogue">
        <div class="page_head_topbar">
            <div class="page_container">
                <div class="fix">
                    <div class="topbar">
                        <div class="customer_dropbox" :class="{active_dropbox:isMenuActive}" id="menudrop">
                            <div>
                            <!-- {{customerName}} -->
                            <div v-if="customerType==='1'">
                                    <div v-if="roleCode == 'L1000'"  class="drop_title"
                                @click="toggleShow"
                                id="menudroptitle">
                                        {{customerName}}
                                    </div> 
                                    <div v-else  class="drop_title"
                                @click="toggleShow"
                                id="menudroptitle">
                                        {{staffName}}
                                    </div>
                            </div>
                            <!-- 其它机构 -->
                            <div v-else>
                             <div  class="drop_title"
                                @click="toggleShow"
                                id="menudroptitle">
                                        {{customerName}}
                             </div> 
                            </div>
                            </div>
                            <div class="customer_drop" v-show="isMenuActive" id="menudropbody9">
                                <div class="customer_info" id="menudropbody8">
                                    <div class="customer_account"  id="menudropbody1">{{userName}}</div>
                                    <div class="company_name" id="menudropbody2">{{customerName}}</div>
                                </div>
                                <div class="change_password" id="menudropbody3">
                                    <a href="#" @click.prevent="dialogFormVisible = true" id="menudropbody4">修改密码</a>
                                </div>
                                <div class="last_login_time" v-if="lastLoginTime" id="menudropbody5">
                                    <span id="menudropbody6">上次登录</span>
                                    <span id="menudropbody7">{{lastLoginTime}}</span>
                                </div>
                            </div>
                        </div>
                        <a href="#" class="login_out" @click.prevent="loginOut">退出</a>
                        <div class="system_info">系统消息</div>
                        <!-- <div>info_active</div> -->
                        <div class="help">帮助</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改密码弹出框 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" 
        :close-on-click-modal="isClosed" 
        :show-close="showClosed"
        :class="{change_diag: stepState==='third'}"
        >
            <div>
                <div class="step_title" v-if="showComplete">
                    <div
                        class="step_title_inner no_line processed"
                        :class="{step_active:stepActiveState===0}"
                        style="width: 73px;margin-left:20px;"
                    >
                        <div class="step_inner_text">身份验证</div>
                    </div>
                    <div class="step_title_inner" :class="{step_active:stepActiveState===1}"  style="width: 73px;">
                        <div class="step_inner_text">密码修改</div>
                    </div>
                    <div class="step_title_inner"  style="width: 73px;">
                        <div class="step_inner_text">完成</div>
                    </div>
                </div>
                <!-- 获得验证码 -->
                <div v-show="stepState==='first'">
                    <el-form :model="formForget" ref="formForget" :rules="rules">
                        <div class="change_password_inner">
                            <div class="input_box_small input_box_disabled">
                                <div class="input_title">
                                    <div class="align_box">账号</div>
                                </div>
                                <div class="input_body">
                                    <el-form-item label="">
                                        <el-input disabled v-model="formForget.customerName"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="input_box_small">
                                <div class="input_title">
                                    <div class="align_box">验证码</div>
                                </div>
                                <div class="input_body box_required">
                                    <el-form-item label="" prop="verifycode">
                                        <el-input
                                            v-model="formForget.verifyCode"
                                            placeholder="请输入验证码"
                                        ></el-input>
                                    </el-form-item>
                                    <div v-show="sendAuthCode" class="verify_code" @click="getVerifyCode">获取验证码</div>
                                    <div v-show="!sendAuthCode" class="verify_code" style="color:#c5c5c5"> {{auth_time}} 秒之后重发</div>
                                </div>
                            </div>
                        </div>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <div class="submit_buttons" style="margin-top:40px;">
                            <el-button
                                type="primary"
                                @click="next('formForget')"
                                class="primary_btn"
                                style="width:140px;"
                            >下一步</el-button>
                            <el-button
                                @click="dialogFormVisible = false"
                                class="cancel_btn"
                                style="margin-left:50px;width:140px;"
                            >取 消</el-button>
                        </div>
                    </div>
                </div>
                <!-- 修改密码 -->
                <div v-show="stepState==='second'">
                    <el-form :model="user" ref="user" :rules="rules2">
                        <div class="change_password_inner">
                            <div class="input_box_small">
                                <div class="input_title">
                                    <div class="align_box">新密码</div>
                                </div>
                                <div class="input_body box_required">
                                    <el-form-item label="" prop="newPassword">
                                        <el-input
                                            v-model="user.newPassword"
                                            placeholder="请输入新密码"
                                            type="password"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="input_box_small">
                                <div class="input_title">
                                    <div class="align_box">确认密码</div>
                                </div>
                                <div class="input_body box_required">
                                    <el-form-item label="" prop="checkPassword">
                                        <el-input
                                            v-model="user.checkPassword"
                                            placeholder="请确认新密码"
                                            type="password"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <div class="submit_buttons" style="margin-top:40px;">
                            <el-button
                                type="primary"
                                @click="next2('user')"
                                class="primary_btn"
                                style="width:140px;"
                            >确认</el-button>
                            <el-button
                                @click="dialogFormVisible = false"
                                class="cancel_btn"
                                style="margin-left:50px;width:140px;"
                            >取消</el-button>
                        </div>
                    </div>
                </div>
                <div v-show="stepState==='third'">
                    <div class="" style="text-align:center;margin-top:20px;font-size:18px;">
                        <div>密码修改成功,请使用新密码登录</div>
                        <div style="margin-top:20px;">{{loginOut_time}}秒后自动退出登录</div>
                        <div>
                            <el-button
                                @click="forgetPasswordBack"
                                class="cancel_btn"
                                style="margin-left:0px;width:140px;margin-top:40px;"
                            >返回</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { requestPost } from "@/api/parent";
import { hex_sha1 } from "@/utils/sha1";
let validateVerifyCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入验证码"));
  }

  // if(this.formForget.verifyCode==){

  // }
};

export default {
  data() {
    return {
        changeSize:false,
        loginOut_time:"",
        isClosed:true,
        showClosed:true,

        roleCode:"",
        customerType:"",
        staffName:"",
        //验证码倒计时
        sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 0, /*倒计时 计数器*/

      isMenuActive: false,
      customerName: "",
      userName: "",
      checkCode: "",
      //弹出对话框
      dialogFormVisible: false,
      stepActiveState: 0,
      //验证码初始值
      titleActive: 0,
      stepState: "first",
      showComplete: true,
      //忘记密码
      formForget: {
        customerName: "",
        verifyCode: "",
        oldMessage: "",
        newMessage: ""
      },
      user: {
        newPassword: "",
        checkPassword: ""
      },
      formLabelWidth: "120",
      rules: {
        verifycode: [
          // { validator: validateVerifyCode, trigger: 'blur' }
          //   { required: true, message: "请输入正确的验证码", trigger: "blur" },
          //   { min: 2, max: 5, message: "验证码为6位", trigger: "blur" }
        ]
      },
      rules2: {
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码为6-16位", trigger: "blur" }
        ],
        checkPassword: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码为6-16位", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("user_front"));

    this.customerName = userInfo.customerName;
    this.userName = userInfo.userName;

    this.customerType = userInfo.customerType //企业类型
    this.staffName = userInfo.memberInfo.nickName;  //企业审核人或者录入员名称
    this.roleCode = userInfo.userRoles[0].roleCode
    
    this.formForget.customerName = userInfo.userName;
    this.lastLoginTime = userInfo.memberInfo.lastLoginTime;

    let body = document.querySelector("body");
    body.addEventListener(
      "click",
      e => {
        // console.log(e.target.id === "toggler-icon");
        if (e.target.id === "menudrop" || e.target.id === "menudroptitle" || e.target.id==="menudropbody1" || e.target.id==="menudropbody2" || e.target.id==="menudropbody3" || e.target.id==="menudropbody4" || e.target.id==="menudropbody5" || e.target.id==="menudropbody6" || e.target.id==="menudropbody7" || e.target.id==="menudropbody8" || e.target.id==="menudropbody9") {
            // e.stopPropagation();
       this.isMenuActive = true;
        } else {
          this.isMenuActive = false;
        }
      },
      false
    );
  },
  // #4
  methods: {
      getAuthCode:function () {
            this.sendAuthCode = false;
            this.auth_time = 60;
            var auth_timetimer =  setInterval(()=>{
                this.auth_time--;
                if(this.auth_time<=0){
                    this.sendAuthCode = true;
                    clearInterval(auth_timetimer);
                }
            }, 1000);
        },
        //5秒后退出倒计时
    autoLoginOut(){
        this.loginOut_time = 5;
        var loginOut_timetimer = setInterval(()=>{
            this.loginOut_time--;
            if(this.loginOut_time<=0){
                this.forgetPasswordBack()
                clearInterval(loginOut_timetimer)
            }
        },1000) 
    },    
    loginOut() {
      this.$store.dispatch("FedLogOut");
      this.$router.push({ name: "login" });
    },
    toggleShow() {

        this.isMenuActive = !this.isMenuActive


    //   return (this.show = !this.show);
    },

    next(formForget) {
      //验证表单基本规则
      this.$refs[formForget].validate(valid => {
        if (valid) {
          //校验验证码
          let verifyRecipidata = {
            recipients: this.formForget.customerName,
            msgCode: this.formForget.verifyCode
          };
          requestPost("/api/vali/msg", verifyRecipidata).then(response => {
            console.log();
            if (response.data.code === 0) {
              //转到修改密码
              this.stepState = "second";
              this.stepActiveState = 1;

              this.checkCode = response.data.res_data.valiCode;
            } else if (response.data.code === 10002) {
              this.$message.error("验证码不为空");
            } else if (response.data.code === 10004) {
              this.$message.error("验证码不正确");
            }
          });
        } else {
          return false;
        }
      });
    },
    next2(user) {
      this.$refs[user].validate(valid => {
        if (valid) {
          if (this.user.checkPassword != this.user.newPassword) {
            this.$message.error("两次密码不一致");
            return;
          }
          let newPassword = {
            checkCode: this.checkCode,
            password: hex_sha1(this.user.checkPassword)
          };
          requestPost("/api/auth/site/user/changePassword", newPassword).then(
            response => {
              if (response.data.code === 0) {
                //验证成功
                this.showComplete = false;
                this.stepState = "third";
                this.isClosed = false;
                this.showClosed = false;
                //5秒后自动退出登录
                this.autoLoginOut()
              }else if (response.data.code === 10002) {
                  this.$message.error("新密码不能与原密码相同");
              } else {
                //   验证失败
                this.$message.error("密码格式不正确");
              }
            }
          );
        }
      });
    },
    forgetPasswordBack() {
      this.dialogFormVisible = false;
      this.showComplete = true;
      this.stepState = "first";
      this.formForget.verifyCode = "";
      this.formForget.oldMessage = "";
      this.formForget.newMessage = "";
      this.$store.dispatch("FedLogOut");
      this.$router.push({ name: "login" });
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    getVerifyCode() {
        this.getAuthCode()
      //获取验证码,判断
      let recipidata = {
        recipients: this.formForget.customerName
      };
      requestPost("/api/send/msg", recipidata)
        .then(response => {
          //this.loading = false
          console.log(response.data.code);
          if (response.data.code === 0) {
            // console.log("验证码已发送");
          }
        })
        .catch(error => {
          console.log(error);
        });

      //   if (isWscnEmail(this.formForget.customerName)) {
      //     //  验证邮箱
      //     recipidata = {
      //       "recipients": this.formForget.customerName
      //     };
      //     // this.loginType=3
      //     // console.log(this.loginType)
      //   } else if (isPhone(this.formForget.customerName)) {

      //   }
      //  this.loading = true;
    },
    // verifyCode() {},

    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

