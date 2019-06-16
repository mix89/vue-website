<template>
  <div>
    <div class="layout_w780 p0">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="input_box mt20 form_default_arrow_box input_box_disabled">
          <div class="input_title">
            <div class="align_box">账户类型</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="" prop="customerType">
              <el-select v-model="ruleForm.customerType" placeholder="请选择" disabled>
                <el-option value="1" label="融资方(出质方)"></el-option>
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
        <div class="input_box mt20 input_box_disabled">
          <div class="input_title">
            <div class="align_box">企业名称</div>
          </div>
          <div class="input_body">
            <el-form-item label="" prop="customerName">
              <el-input v-model="ruleForm.customerName" placeholder="请输入企业名称" disabled></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20 input_box_disabled">
          <div class="input_title">
            <div class="align_box">账号</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="" prop="">
              <el-input v-model="ruleForm.loginAccount" placeholder="请输入手机号码或邮箱" disabled></el-input>
            </el-form-item>
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
            <el-form-item label="">
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
            <el-form-item label="">
              <el-input v-model="ruleForm.email" placeholder="请输入联系邮箱（选填）"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20 form_default_arrow_box">
          <div class="input_title">
            <div class="align_box">企业地址</div>
          </div>
          <div class="input_body">
            <!--<el-form-item label="" prop="province">-->
            <vue-address
              :isShow="addressDisabled"
              :province="ruleForm.provinceId"
              :city="ruleForm.cityId"
              :detail="ruleForm.address"
              :district="ruleForm.areaId"
              @change="handlerChange"
            ></vue-address>
            <!--</el-form-item>-->
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">邮政编码</div>
          </div>
          <div class="input_body">
            <el-form-item label="">
              <el-input v-model="ruleForm.zipcode" placeholder="请输入联系邮箱"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">备注</div>
          </div>
          <div class="input_body">
            <el-form-item label="">
              <el-input type="textarea" v-model="ruleForm.description"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input_box mt20">
          <div class="input_title">
            <div class="align_box">资料上传</div>
          </div>
          <div class="input_body box_required">
            <el-form-item label="">
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" :disabled="uploadDisabled" type="text">点击上传资料</el-button>
                <div slot="tip" class="el-upload__tip"  style="position:absolute;right:340px;top:10px;color:#c5c5c5">只能上传jpg/png文件，且不超过5M</div>
              </el-upload>
            </el-form-item>
          </div>
        </div>
           <el-form-item class="submit_buttons" style="margin-top:40px;">
            <el-button type="primary"  @click="submitForm('ruleForm')" class="primary_btn">修改</el-button>
            <el-button @click="cancel"  class="cancel_btn">取消</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import pageContainer from "@/views/layout/components/Page/index";
import vueAddress from "@/components/Address/address";
import { validateAccount,validateContactPhone,validateRegisterMoney,validateOrgnizationCode,validateEnterpriseContact,validateEnterpriseRepresent,validateZipCodeOptional,validateEmailOptional } from "@/utils/validateRules"
import { requestPost } from "@/api/parent";

export default {
  data() {
    return {
      uploadUrl: uploadUrl,
      uploadDisabled: false,
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
        customerType: "",
        customerName: "",
        loginAccount: "",
        organizationCode: "",
        legalName: "",
        customerWay:"",
        capital: "",
        operationScop: "",
        contactName: "",
        phone: "",
        email: "",
        provinceId:"",
        cityId:"",
        areaId:"",
        address:"",
        zipcode:"",
        description:"",
       // enterpriseAddress: "",
      },
       rules: {
        msgCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
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
        loginAccount: [{ validator: validateAccount, trigger: "blur" }],
        organizationCode: [{validator:validateOrgnizationCode,trigger: ["blur", "change"] }],
        legalName: [{validator:validateEnterpriseRepresent,trigger: ["blur", "change"] }],
        customerWay: [ {
            required: true,
            message: "请选择企业性质",
            trigger: ["blur", "change"]
          }
        ],
        operationScop:[{ max: 160, message: '长度在160个字符以内', trigger: ["blur", "change"]}],
        capital: [{validator: validateRegisterMoney, trigger: ["blur", "change"]}],
        contactName: [{validator:validateEnterpriseContact,trigger: ["blur", "change"] }],
        phone: [{ validator: validateContactPhone, trigger: ["blur", "change"]}],
        zipcode:[{validator:validateZipCodeOptional,trigger: ["blur", "change"]}],
        email:[{validator:validateEmailOptional,trigger: ["blur", "change"]}],
        description:[{ max: 100, message: '长度在100个字符以内', trigger: ["blur", "change"]}]
      },
      accountTypeOptions: [
        {
          value: "1",
          label: "融资方(出质方)"
        }
        // {
        //   value: "2",
        //   label: "第三方保管机构"
        // },
        // {
        //   value: "3",
        //   label: "风险评估机构"
        // },
        // {
        //   value: "4",
        //   label: "第三方风险评估机构"
        // }
      ]
    };
  },
  components: {
    vueAddress
  },
  created() {
    requestPost("/api/auth/site/member/show").then(response => {
      if (response.data.code === 0) {
        console.log(response.data.res_data)
        // this.ruleForm = response.data.res_data.customerInfo;
        // this.ruleForm.loginAccount =
        //   response.data.res_data.memberInfo.memberName;
          const data = response.data.res_data;
          this.ruleForm.customerType = data.customerType  // 账户类型
          this.ruleForm.customerName = data.customerName // 企业名称
          this.ruleForm.loginAccount = data.userName  // 登录账号
          this.ruleForm.organizationCode = data.organizationCode //组织机构代码
          this.ruleForm.legalName = data.legalName  // 法人代表
          this.ruleForm.customerWay = data.customerWay // 企业性质
          this.ruleForm.capital= data.capital // 注册资金
          this.ruleForm.operationScop= data.operationScop //经营范围 选填
          this.ruleForm.contactName= data.contactName //联系人
          this.ruleForm.phone= data.phone  //联系电话
          this.ruleForm.email = data.email  //联系邮箱
          this.ruleForm.provinceId = data.provinceId // 省
          this.ruleForm.cityId = data.cityId // 市
          this.ruleForm.areaId = data.areaId // 区
          this.ruleForm.address = data.address//企业地址
          this.ruleForm.zipcode = data.zipcode //邮政编码
          this.ruleForm.description = data.description //备注

        this.fileList.push({
          name: this.ruleForm.extend1,
          url: this.ruleForm.licensePic
        });
      }
    });
  },
  // mounted() {},
  methods: {
    uploadError(err, file, fileList) {
      this.$message({
        showClose: true,
        message: "上传失败",
        type: "error"
      });
    },
    uploadSuccess(response, file, fileList) {
      this.uploadDisabled = true;
      this.ruleForm.licensePic = file.response.res_data.url;
      this.ruleForm.extend1 = file.response.res_data.oldFileName;
    },
    handleRemove(file, fileList) {
      if (fileList.length < 1) {
        this.uploadDisabled = false;
      }
    },
    handlePreview(file) {},
    handleExceed(files, fileList) {
      if (fileList.length > 1) {
        this.$message({
          showClose: true,
          message: "只能添加一个文件",
          type: "warning"
        });
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    setwidth() {
      var el = this.$refs.abcd.$el;
      el.setAttribute("style", "color:red;border:1px solid #62CCF8");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.ruleForm.customerId = this.$route.query.customerId;
          requestPost("api/auth/site/member/edit", this.ruleForm).then(
            response => {
              if (response.data.code === 0) {
                this.$message({
                  showClose: true,
                  message: "操作成功",
                  type: "success"
                });
                this.$router.go(-1)
                // this.$router.push({ path: "enterpriseUserManageList" });
              } else {
                this.$message({
                  showClose: true,
                  message: "操作失败",
                  type: "error"
                });
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
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
    cancel() {
      this.$confirm("取消操作将不保存本次编辑内容，请确认是否取消！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push({ name: "personalCenter" });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消"
          // });
        });
    },
    callback() {
      this.$confirm("返回操作将不保存本次编辑内容，请确认是否返回！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push({ name: "personalCenter" });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消"
          // });
        });
    }
  }
};
</script>

<style>
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
.box_required.register_money:after{
  right: -130px;
}
</style>

