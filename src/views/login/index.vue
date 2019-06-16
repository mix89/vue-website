<template>
  <div class="login-container">
    <div class="login-box">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <h3 class="title">用户登录</h3>
        <el-form-item prop="username">
          <span class="svg-container">
            <!-- <svg-icon icon-class="user" /> -->
            <img :src="imgUrl.userIcon" alt="">
          </span>
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            autocomplete="on"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item class="password_item" prop="password">
          <span class="svg-container">
            <!-- <svg-icon icon-class="password" /> -->
            <img :src="imgUrl.passwordIcon" alt="">
          </span>
          <el-input
            :type="pwdType"
            v-model="loginForm.password"
            name="password"
            autocomplete="on"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye"/>
          </span>
        </el-form-item>
        <div class="forgetpasswprd_text_content">
          <!-- dialogue -->
          <div class="forget_password">
            <router-link :to="{name:'forgetPassword'}">忘记密码？</router-link>
          </div>
        </div>
        <el-form-item class="slider">
          <span class="slider_img_box">
            <img class="sliderImg" :src="imgUrl.sliderImg" alt="">
          </span>
          <span class="slider_text">向右滑动验证</span>
        </el-form-item>
        <!-- 验证 -->
        <!-- <div class="verify_box">
          <div class="large_pic" ref="largePic">
            <img :src="oriCopyImage" alt="">
            <div class="refresh_btn" ref="refresh" @click="refreshImg"></div>
          </div>
          <div class="small_pic" ref="validImg">
            <img :src="validateNewImage">
          </div>
          <div class="verify_click" @click="showVerify" ref="verifyClick">点击完成验证</div>
          <div
            class="dragbar_box"
            ref="dragbarBox"
            :class="{success:verifyStatus==='success',failed:verifyStatus==='failed',dragging:verifyStatus==='dragging'}"
          >
              <div v-if="verifyStatus==='success'" class="slide_txt">验证成功</div>
              <div v-else-if="verifyStatus==='failed'" class="slide_txt">验证失败</div>
              <div v-else class="slide_txt">向右滑动验证</div>
              <div class="slide_mask" ref="slideMask"></div>
              <div class="dragbar" id="dragbar" @mousedown="dragbox" ref="dragbar"></div>
          </div>
        </div> -->

        <el-form-item class="login_btn no_border mt30">
          <el-button
            :loading="loading"
            type="primary"
            class="login_button"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form-item>
        <!-- <div class="or_back"></div> -->
        <div class="or_line_bg"></div>
        <div class="or_line">
          <span>or</span>
        </div>
        <div class="login_to_register">尚无账号,
          <router-link class="link_to_register" :to="{name:'protocol'}">前往注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// #0
import { isvalidUsername } from "@/utils/validate";
// import { getList } from '@/api/table'
import { login } from "@/api/login";
import { requestPost, requestGet } from "@/api/parent";

import { hex_sha1 } from "@/utils/sha1";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { isPhone, isWscnEmail } from "@/utils/validate.js";
import {validateAccount,validateLoginPassword} from "@/utils/validateRules"
export default {
  data() {
    // let validateAccount = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("请输入正确的手机号码或邮箱地址！"));
    //   }
    //   if (!isWscnEmail(value) && !isPhone(value)) {
    //     return callback(new Error("请输入正确的手机号码或邮箱地址！"));
    //   }
    //   callback();
    // };
    return {
      // #2
      // verifyStatus:"failed",
      valiCode: "e4675536eb952060b3549a8ea4d60fb8fef55114",
      verifyStatus: "",
      // verifyStatus:"success",
      validateNewImage: "",
      oriCopyImage: "",
      loginForm: {
        username: "",
        password: "",
        // username: "nathan@gmail.com",
        // username: "tangxu@qq.com",
        // password: "123456",
        loginType: ""
      },
      loginRules: {
        username: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator:validateLoginPassword, trigger: "blur" }]
        // password: [
        //   { required: true, message: "请输入密码", trigger: "blur" },
        //   { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        // ]
      },
      loading: false,
      pwdType: "password",
      // redirect: undefined,
      imgUrl: {
        sliderImg: require("../../assets/images/slider.png"),
        userIcon: require("../../assets/images/icon_user.png"),
        passwordIcon: require("../../assets/images/icon_password.png")
      },
      forgetPasswordForm: {
        accout: "",
        verifycode: ""
      },
      dialogTableVisible: false
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },

  methods: {
    showVerify() {
      let validImg = this.$refs["validImg"];
      let validBigPic = this.$refs["largePic"];
      let verifyClick = this.$refs["verifyClick"];

      verifyClick.style.display = "none";
      validImg.style.display = "block";
      validBigPic.style.display = "block";
    },

    refreshImg() {
      requestGet("/api/verify/get").then(response => {
        if (response.data.code === 0) {
          this.validateNewImage = response.data.res_data.newImage;
          this.oriCopyImage = response.data.res_data.oriCopyImage;
        }
      });
    },
    dragbox(e) {
      let _that = this;
      let verifyDistance = {};
      let validBigPic = this.$refs["largePic"];
      let el = this.$refs["dragbar"];
      let validImg = this.$refs["validImg"];
      let slideMask = this.$refs["slideMask"];

      let disX = e.clientX - el.offsetLeft;
      let disY = e.clientY - el.offsetTop;

      document.onmousemove = function(e) {
        _that.verifyStatus = "dragging";
        let L = e.clientX - disX;
        let T = e.clientY - disY;
        if (L < 0) {
          L = 0;
          // slideMask.style.border = 'none'
        }
        if (L > 246) {
          L = 246;
        }
        //  if(L>590)   {
        //   L =590
        // }
        if (T > 0) {
          T = 0;
        }
        if (T < 0) {
          T = 0;
        }
        el.style.left = L + "px";
        el.style.top = T + "px";
        validImg.style.left = L + "px";
        verifyDistance.coordinate = L;
        slideMask.style.width = L + "px";
      };

      document.onmouseup = function() {
        document.onmouseup = document.onmousemove = null;

        requestPost("/api/verify/check", verifyDistance)
          .then(response => {
            if (response.data.code === 0) {
              console.log("校验成功");
              _that.verifyStatus = "success";
              validBigPic.style.display = "none";
              validImg.style.display = "none";

              // this.valiCode = response.res_data.valiCode
            } else {
              console.log("校验失败");
              _that.verifyStatus = "failed";

              setTimeout(function() {
                _that.verifyStatus = "drag";
                el.style.left = 0 + "px";
                validImg.style.left = 0 + "px";
              }, 200);
              // if (el.releaseCapture) {
              //   el.releaseCapture();
              // }

              // if (el.setCapture) {
              //   el.setCapture();
              // }
            }
          })
          .catch(error => console.log(error));
        return false;
      };
    },

    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (isWscnEmail(this.loginForm.username)) {
            this.loginType = 3;
          } else if (isPhone(this.loginForm.username)) {
            this.loginType = 2;
          }

          let data = {
            loginAccount: this.loginForm.username,
            loginType: this.loginType,
            password: hex_sha1(this.loginForm.password),
            valiCode: this.valiCode
          };
          this.loading = true;

          requestPost("/api/site/login", data).then(response => {
            this.loading = false;
            if (response.data.code === 0) {
              sessionStorage.setItem(
                "token_front",
                response.data.res_data.token
              );

              // requestPost("/api/auth/site/member/show")
              //   .then(response => {
              //     if (response.data.code === 0) {
              //       console.log(555)
              //       // localStorage.setItem("user_front", JSON.stringify(data));
              //       // localStorage.getItem("user_front", JSON.stringify(data))
              //       // console.log( localStorage.getItem("user_front", JSON.stringify(data)))

              //     }
              //   })
              //   .catch(error => {
              //     reject(error);
              //   });

              this.$router.push({ name: "frontdashboard" });
            } else if (response.data.code === 4) {
              this.$message({
                message: "密码错误",
                type: "warning"
              });
            } else {
              this.$message({
                message: "用户名或密码错误！",
                type: "warning"
              });
            }
          });

          //获取地区列表
          requestPost("/api/area/get", {}).then(response2 => {
            if (response2.data.code === 0) {
              localStorage.setItem(
                "address_front",
                JSON.stringify(response2.data.res_data)
              );
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created() {
    //获取地区列表
    requestPost("/api/area/get", {}).then(response2 => {
      if (response2.data.code === 0) {
        console.log("abc");
        localStorage.setItem(
          "address",
          JSON.stringify(response2.data.res_data)
        );
      }
    });

    // #666
    //获取图片
    this.refreshImg();
  }
};

// import { isvalidUsername } from '@/utils/validate'

// export default {
//   name: 'Login',
//   data() {
//     const validateUsername = (rule, value, callback) => {
//       if (!isvalidUsername(value)) {
//         callback(new Error('请输入正确的用户名'))
//       } else {
//         callback()
//       }
//     }
//     const validatePass = (rule, value, callback) => {
//       if (value.length < 5) {
//         callback(new Error('密码不能小于5位'))
//       } else {
//         callback()

//       }
//     }
//     return {
//       loginForm: {
//         username: 'admin',
//         password: 'admin'
//       },
//       loginRules: {
//         username: [{ required: true, trigger: 'blur', validator: validateUsername }],
//         password: [{ required: true, trigger: 'blur', validator: validatePass }]
//       },
//       loading: false,
//       pwdType: 'password',
//       redirect: undefined,
//       imgUrl:{
//         sliderImg:require('../../assets/images/slider.png'),
//         userIcon:require('../../assets/images/icon_user.png'),
//         passwordIcon:require('../../assets/images/icon_password.png')
//       }
//     }
//   },
//   watch: {
//     $route: {
//       handler: function(route) {
//         this.redirect = route.query && route.query.redirect
//       },
//       immediate: true
//     }
//   },
//   methods: {
//     showPwd() {
//       if (this.pwdType === 'password') {
//         this.pwdType = ''
//       } else {
//         this.pwdType = 'password'
//       }
//     },
//     handleLogin() {
//       this.$refs.loginForm.validate(valid => {
//         if (valid) {
//           this.loading = true
//           this.$store.dispatch('Login', this.loginForm).then(() => {
//             this.loading = false
//             this.$router.push({ path: this.redirect || '/' })
//           }).catch(() => {
//             this.loading = false
//           })
//         } else {
//           console.log('error submit!!')
//           return false
//         }
//       })
//     }
//   }
// }
</script>
<style scoped>
</style>



