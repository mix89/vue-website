<template>
  <div>
    <div class="layout_w780 p0">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="reg_info">
        <div class="input_box mt20 form_default_arrow_box input_box_disabled">
          <div class="input_title">
            <div class="align_box">账户类型</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="" prop="customerType">
              <el-select v-model="ruleForm.customerType" disabled>
                <el-option label="融资方(出质方)" value="1"></el-option>
                <!-- <el-option
                      v-for="item in accountTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                ></el-option>-->
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">企业名称</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="" prop="customerName">
              <el-input v-model="ruleForm.customerName" placeholder="请输入企业名称"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">账号</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="" prop="loginAccount">
              <el-input v-model="ruleForm.loginAccount" placeholder="请输入手机号码或邮箱"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">请输入验证码</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="" prop="msgCode">
              <el-input v-model="ruleForm.msgCode" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <div v-show="sendAuthCode" class="send_code" @click="getAuthCode">获取验证码</div>
            <div
              v-show="!sendAuthCode"
              class="sended_code"
              style="color:#c5c5c5"
            >{{auth_time}} 秒之后重发</div>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">统一社会信用代码</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="" prop="organizationCode">
              <el-input v-model="ruleForm.organizationCode" placeholder="请输入组织机构代码"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">法人代表</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="" prop="legalName">
              <el-input v-model="ruleForm.legalName" placeholder="请输入法人代表名称"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">企业性质</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="" prop="customerWay">
              <el-select v-model="ruleForm.customerWay" placeholder="请选择企业性质" style="width: 100%">
                <el-option
                  v-for="item in customerWayList"
                  :key="item.key"
                  :label="item.name"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">注册资金</div>
          </div>
          <div class="input_body box_required register_money" style="width:500px;">
            <el-form-item label="" prop="capital">
              <el-input v-model="ruleForm.capital" placeholder="请输企业注册资金"></el-input>
            </el-form-item>
            <div class="rmb">人民币</div>
            <div class="rmb_mount">（万元）</div>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">经营范围</div>
          </div>
          <div class="input_body">
            <el-form-item label="" prop="operationScop">
              <el-input v-model="ruleForm.operationScop" placeholder="请输入企业经营范围（选填）"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">联系人</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="" prop="contactName">
              <el-input v-model="ruleForm.contactName" placeholder="请输入联系人姓名"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">联系电话</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">联系邮箱</div>
          </div>
          <div class="input_body">
            <el-form-item label="" prop="email">
              <el-input v-model="ruleForm.email" placeholder="请输入联系邮箱（选填）"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20 form_default_arrow_box">
          <div class="input_title">
            <div class="align_box">企业地址</div>
          </div>
          <div class="input_body">
            <vue-address
              :isShow="addressDisabled"
              :province="ruleForm.provinceId"
              :city="ruleForm.cityId"
              :detail="ruleForm.address"
              :district="ruleForm.areaId"
              @change="handlerChange"
              :check="checkAddress"
              ref="address"
            ></vue-address>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">邮政编码</div>
          </div>
          <div class="input_body">
            <el-form-item label="" prop="zipcode">
              <el-input v-model="ruleForm.zipcode" placeholder="请输入正确的邮政编码"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">备注</div>
          </div>
          <div class="input_body">
            <el-form-item label="" prop="description">
              <el-input type="textarea" v-model="ruleForm.description"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">资料上传</div>
          </div>
          <div class="input_body box_required input_body_register" style="padding-top:0px;padding-bottom:20px;position:relative">
            <el-form-item label="" style="width:620px">
              <el-upload
                class="upload-demo"
                :file-list="fileList"
                :action="uploadUrl"
                :on-remove="handleRemove"
                
                :before-upload="beforeUpload"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :limit="20"
                :on-exceed="handleExceed"
                :accept="acceptList"
                :multiple="true"
              >
                <el-button size="small" type="text" :class="{attachDisabled:uploadDisabled}">点击上传资料</el-button>
                <div
                  slot="tip"
                  class="el-upload__tip" style="left: 0px;top: 8px;"
                >上传可支持的文档格式包括：jpg、png、pdf、word、excel、ppt，且大小不超过10M</div>
              </el-upload>
            </el-form-item>
            <div v-if="validateAttachment">
              <div class="validate_attach_register">请上传附件</div>
            </div>
          </div>
        </div>
        <!-- <div class="submit_buttons custom_buttons">
                               <button class="primary_btn"  @click="submit_register">提交注册</button>
                               <button class="cancel_btn" @click="cancel">取消注册</button>
        </div>-->
        <el-form-item class="submit_buttons_enterprise" style="margin-top:40px">
          <el-button @click="reset('ruleForm')" class="reset_btn">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" class="primary_btn">新增</el-button>
          <el-button @click="cancel(ruleForm)" class="cancel_btn">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import pageContainer from "@/views/layout/components/Page/index";
import vueAddress from "@/components/Address/address";
import {
  validatemsgCode,
  validateAccount,
  validateContactPhone,
  validateRegisterMoney,
  validateOrgnizationCode,
  validateEnterpriseContact,
  validateEnterpriseRepresent,
  validateZipCodeOptional,
  validateEmailOptional
} from "@/utils/validateRules";
import { requestPost } from "@/api/parent";

export default {
  data() {
    return {
      // 上传附件
      checkAddress:false,
      validateAttachment: false,
      attachMent: false,
      acceptList: "image/png, image/jpeg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
      fileList: [],
      uploadDisabled:false,

      // 发送验证码
      sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
      auth_time: 0 /*倒计时 计数器*/,

      uploadUrl: uploadUrl,
      addressDisabled: false,
      fileList: [],
      customerWayList: [
        { key: 1, name: "国有企业" },
        { key: 2, name: "民营企业" },
        { key: 3, name: "个体户" },
        { key: 4, name: "集体企业" },
        { key: 5, name: "联营企业" },
        { key: 6, name: "股份合作制企业" },
        { key: 7, name: "合伙企业" },
        { key: 8, name: "有限责任公司" },
        { key: 9, name: "股份有限公司" }
      ],
      ruleForm: {
        valiCode: "",
        msgCode: "",
        customerType: "1",
        customerName: "",
        loginAccount: "",
        organizationCode: "",
        legalName: "",
        capital: "",
        operationScop: "",
        contactName: "",
        phone: "",
        email: "",
        enterpriseAddress: "",
        zipcode: "",
        remark: ""
      },
      rules: {},
      rules: {
        msgCode: [{ validator: validatemsgCode, trigger: ["blur", "change"] }],
        customerName: [
          {
            required: true,
            message: "请输入正确的企业名称！",
            trigger: ["blur", "change"]
          },
          {
            min: 2,
            max: 30,
            message: "长度在 2 到 30 个字符",
            trigger: ["blur", "change"]
          }
        ],
        loginAccount: [
          { validator: validateAccount, trigger: ["blur", "change"] }
        ],
        organizationCode: [
          { validator: validateOrgnizationCode, trigger: ["blur", "change"] }
        ],
        legalName: [
          {
            validator: validateEnterpriseRepresent,
            trigger: ["blur", "change"]
          }
        ],
        customerWay: [
          {
            required: true,
            message: "请选择企业性质",
            trigger: ["blur", "change"]
          }
        ],
        operationScop: [
          {
            max: 160,
            message: "长度在160个字符以内",
            trigger: ["blur", "change"]
          }
        ],
        capital: [
          { validator: validateRegisterMoney, trigger: ["blur", "change"] }
        ],
        contactName: [
          { validator: validateEnterpriseContact, trigger: ["blur", "change"] }
        ],
        phone: [
          { validator: validateContactPhone, trigger: ["blur", "change"] }
        ],
        zipcode: [
          { validator: validateZipCodeOptional, trigger: ["blur", "change"] }
        ],
        email: [
          { validator: validateEmailOptional, trigger: ["blur", "change"] }
        ],
        description: [
          {
            max: 100,
            message: "长度在100个字符以内",
            trigger: ["blur", "change"]
          }
        ]
      },
      accountTypeOptions: [
        {
          value: "1",
          label: "融资方(出质方)"
        }
        // {
        //   value: '2',
        //   label: "第三方保管机构"
        // },
        // {
        //   value: '3',
        //   label: "风险评估机构"
        // },
        // {
        //   value: '4',
        //   label: "第三方风险评估机构"
        // }
      ],
      province: "",
      city: "",
      district: "",
      detail: ""
    };
  },
  components: {
    // pageContainer,
    vueAddress
  },
  created() {},
  mounted() {},
  methods: {
    //重置表单
    reset(ruleForm) {
      setTimeout(function() {
        window.location.reload();
      }, 100);

      // this.$refs[ruleForm].resetFields()
      // this.ruleForm.description = null;
      // this.fileList =[]
      // // this.ruleForm.address =""
      // //子组件方法
      // this.$refs.address.resetAddress(ruleForm)
    },
    // #4
    //获取验证码
    getAuthCode: function() {
      this.sendAuthCode = false;
      this.auth_time = 60;
      var auth_timetimer = setInterval(() => {
        this.auth_time--;
        if (this.auth_time <= 0) {
          this.sendAuthCode = true;
          clearInterval(auth_timetimer);
        }
      }, 1000);
      let sendData = {};
      sendData.recipients = this.ruleForm.loginAccount;

      // console.log(333);
      console.log(sendData);
      requestPost("api/send/msg", sendData).then(response => {
        console.log(response);
        if (response.data.code === 0) {
          console.log(response.data.res_data);

          console.log("发送验证码成功");
        }
      });
      // requestPost(api/send/msg,)
    },
    //上传附件
    beforeUpload(file) {
      //文件类型校验
      // let regFileName = /\.(\w+)$/;
      // let suffixName = file.name.match(regFileName)[0];

      // const isJPG = suffixName === ".jpg" || suffixName === ".jpeg";
      // const isPNG = suffixName === ".png";
      // const isPdf = suffixName === ".pdf";
      // const isWord = suffixName === ".doc" || suffixName === ".docx";
      // const isExcel = suffixName === ".xls" || suffixName === ".xlsx";
      // const isPPT = suffixName === ".ppt" || suffixName === ".pptx";

      // const isMatch = isJPG || isPNG || isPdf || isWord || isExcel || isPPT;

      // if (!isMatch) {
      //   this.$message.error(
      //     "上传的文档格式仅支持：jpg、png、pdf、word、excel、ppt"
      //   );
      //   return;
      // }

      // //文件大小校验
      // const isLt10M = file.size / 1024 / 1024 < 10;
      // if (!isLt10M) {
      //   this.$message.error("上传文件大小不能超过 10MB!");
      //   return;
      // }
         const isJPG = file.type === 'image/jpeg';
     const isPNG  = file.type ==='image/png'
     const isPDF  = file.type ==='application/pdf'
     const isWord  = file.type ==='application/msword'
     const isExcel  = file.type ==='application/vnd.ms-excel'
     const isPPT  = file.type ==='application/vnd.ms-powerpoint'
     const is10M  = file.size/1024/1024<10
        if (!isJPG && !isPNG && !isPDF && !isWord && !isExcel && !isPPT ) {
          this.$message.error('文件格式错误！可支持的文档格式包括：jpg、png、pdf、word、Excel、ppt');
        }else if(!is10M){
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return (isJPG || isPNG || isPDF || isWord || isExcel || isPPT) && is10M;
    },
    //上传文件总数不超过20个
    handleExceed(files, fileList) {
      this.$message.warning("最多上传20个文件");
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    uploadError(err, file, fileList) {
        console.log(err)
        if(!err.lengthComputable){
            return
        }else{
            this.$message({
                showClose: true,
                message: "上传失败",
                type: "error"
            });
        }
        
    //   this.$message({
    //     showClose: true,
    //     message: "上传失败",
    //     type: "error"
    //   });
    },
    uploadSuccess(response, file, fileList) {
      let regFileName = /\.(\w+)$/;
      let suffixName = file.name.match(regFileName)[0];	
      //文件存在
      let _that = this 
      if (fileList.length != 0) {
        this.attachMent = true;
        this.validateAttachment = false;
        //限制上传总文件数
        if (fileList.length>=20){
          return  _that.uploadDisabled =true;
        }
      }
      if (file.response.code === 200) {
        if (suffixName === ".txt") {
         this.fileList.splice(-1, 0);
        }
       else if(suffixName === ".psd"){
          this.fileList.splice(-1, 0);
        }  
       else {
         //上传成功的文件
          this.fileList = fileList;
          console.log(this.fileList)
        }
      } else if (response.code === 1001) {
        // 上传失败
        this.fileList.splice(-1, 0);
      }
    },
    handleRemove(file, fileList) {
      if (fileList.length == 0) {
        this.validateAttachment = true;
        this.attachMent = false;
        this.fileList =[]
      }

      //上传文件长度限制
      if(fileList.length<20){
          this.uploadDisabled = false;
      }
    },




  
    submitForm(formName) {
       var _that = this;

      _that.checkAddress = true
        if (this.fileList.length == 0) {
          this.validateAttachment = true;
        }
      this.$refs[formName].validate(valid => {
        if (valid && this.attachMent) {
          // #5
          //  this.$refs.address.validateAddress(ruleForm)

          let validateData = {};
          validateData.recipients = this.ruleForm.loginAccount;
          validateData.msgCode = this.ruleForm.msgCode;

          // 验证之前
          requestPost("/api/vali/msg", validateData).then(response => {
            console.log("验证之后");
            console.log(response);
            if (response.data.code === 0) {
              //  this.ruleForm.valiCode =
              this.ruleForm.valiCode = response.data.res_data.valiCode;
              let commAttachments = this.fileList.map(item=>{
                return {
                  "attachment":item.response.res_data.url,
                  "fileName": item.response.res_data.oldFileName
                }
              })
              let regData = Object.assign({}, this.ruleForm, {
                capital: this.ruleForm.capital * 10000
              },{commAttachments});

      
              // console.log(999999)
              // console.log(regData);
              requestPost("/api/site/register", regData).then(response => {
                if (response.data.code === 0) {
                  this.$message({
                    showClose: true,
                    message: "操作成功",
                    type: "success"
                  });
                  this.$router.push({ path: "registerFeedback" });
                } else if (response.data.code === 10003) {
                  this.$message({
                    showClose: true,
                    message: response.data.msg,
                    type: "warning"
                  });
                } 
                else if(response.data.code === 10006){
                  this.$message({
                    showClose: true,
                    message: '该企业已注册，请重新输入',
                    type: "warning"
                  });
                }
                else {
                  this.$message({
                    showClose: true,
                    message: "操作失败",
                    type: "error"
                  });
                }
              });
              console.log(response.data.res_data.valiCode);
            } else {
              this.$message({
                showClose: true,
                message: "请输入正确的验证码",
                type: "warning"
              });
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "提交注册",
        cancelButtonText: "取消注册",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
       
    },
    handlerChange(val) {
      if (val.province) {
        this.ruleForm.provinceId = val.province;
      }
      if (val.city) {
        this.ruleForm.cityId = val.city;
      }
      if (val.detail) {
        this.ruleForm.address = val.detail;
      }
      if (val.district) {
        this.ruleForm.areaId = val.district;
      }
    },
    cancel(formName) {
                   let testArr=[]
                  for(var item in formName){
                      console.log(formName[item])
                    if(item !="customerType" && formName[item]!=''){  
                        testArr.push(formName[item])
                    }
                  }
                   
                 
             if(testArr.length==0){
               this.$router.push({ path: "enterpriseUserManageList" });        
             }else if(testArr.length!=0){
                this.$confirm("取消操作将不保存本次编辑内容，请确认是否取消！", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
           this.$router.push({ path: "enterpriseUserManageList" });
         })
             }
      
      
    },
    callback() {
      this.$confirm("返回操作将不保存本次编辑内容，请确认是否返回！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$router.push({ path: "enterpriseUserManageList" });
        })
      
    }
  }
};
</script>

<style scoped>
.send_code {
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  right: 16px;
  top: 12px;
  color: #00acf3;
}
.sended_code {
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  right: 16px;
  top: 12px;
  color: #bbb;
  cursor: default;
}

.rmb {
  position: absolute;
  right: -120px;
  top: -1px;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  color: #777777;
  background: #f0f0f0;
  width: 100px;
  height: 40px;
  border: 1px solid #cfcfcf;
}
.rmb_mount {
  position: absolute;
  right: 0;
  top: 10px;
  font-size: 14px;
  color: #323232;
}
.box_required.register_money:after {
  right: -130px;
}
</style>
