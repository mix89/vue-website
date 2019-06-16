<template>
    <div>
        <div class="layout_w780 p0 show_third">
            <el-form

                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
            >
                <div class="input_box mt20 form_default_arrow_box input_box_disabled" >
                    <div class="input_title">
                        <div class="align_box">账户类型</div>
                    </div>
                    <div class="input_body box_required">
                        <el-form-item label="" prop="customerType">
                            <el-select disabled v-model="ruleForm.customerType" placeholder="请选择">
                                <el-option
                                    v-for="item in accountTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">企业名称</div>
                    </div>
                    <div class="input_body box_required">
                        <el-form-item label="" prop="customerName">
                            <el-input
                                disabled
                                v-model="ruleForm.customerName"
                                placeholder="请输入企业名称"
                            ></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">账号</div>
                    </div>
                    <div class="input_body box_required">
                        <el-form-item label="" prop="loginAccount">
                            <el-input
                                disabled
                                v-model="ruleForm.loginAccount"
                                placeholder="请输入手机号码或邮箱"
                            ></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">统一社会信用代码</div>
                    </div>
                    <div class="input_body box_required">
                        <el-form-item label="" prop="organizationCode">
                            <el-input
                                disabled
                                v-model="ruleForm.organizationCode"
                                placeholder="请输入组织机构代码"
                            ></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">法人代表</div>
                    </div>
                    <div class="input_body box_required">
                        <el-form-item label="" prop="legalName">
                            <el-input disabled v-model="ruleForm.legalName" placeholder="请输入法人代表名称"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">企业性质</div>
                    </div>
                    <div class="input_body box_required">
                        <el-form-item label="" prop="customerWay">
                            <el-select
                                disabled
                                v-model="ruleForm.customerWay"
                                placeholder="请选择企业性质"
                                style="width: 100%"
                            >
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
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">注册资金</div>
                    </div>
                    <!-- <div class="input_body box_required">
                        <el-form-item label="" prop="capital">
                            <el-input disabled v-model="ruleForm.capital" placeholder="请输企业注册资金"></el-input>
                        </el-form-item>
                    </div> -->
                <div class="input_body box_required register_money" style="width:500px;">
                        <el-form-item label="" prop="">
                        <el-input v-model="ruleForm.capital" placeholder="请输企业注册资金" disabled></el-input>
                        </el-form-item>
                        <div class="rmb">人民币</div>
                        <div class="rmb_mount">（万元）</div>
          </div>
                </div>
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">经营范围</div>
                    </div>
                    <div class="input_body">
                        <el-form-item label="" prop="operationScop">
                            <el-input
                                disabled
                                v-model="ruleForm.operationScop"

                            ></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">联系人</div>
                    </div>
                    <div class="input_body box_required">
                        <el-form-item label="" prop="contactName">
                            <el-input
                                disabled
                                v-model="ruleForm.contactName"
                                placeholder="请输入联系人姓名"
                            ></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">联系电话</div>
                    </div>
                    <div class="input_body box_required">
                        <el-form-item label="" prop="phone">
                            <el-input disabled v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">联系邮箱</div>
                    </div>
                    <div class="input_body">
                        <el-form-item label="" prop="email">
                            <el-input disabled v-model="ruleForm.email"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="input_box mt20 form_default_arrow_box input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">企业地址</div>
                    </div>
                    <div class="input_body">
                        <el-form-item label="" prop="province">
                            <vue-address
                                :isShow="addressDisabled"
                                :province="ruleForm.provinceId"
                                :city="ruleForm.cityId"
                                :detail="ruleForm.address"
                                :district="ruleForm.areaId"
                                @change="handlerChange"
                            ></vue-address>
                        </el-form-item>
                    </div>
                </div>
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">邮政编码</div>
                    </div>
                    <div class="input_body">
                        <el-form-item label="" prop="zipcode">
                            <el-input disabled v-model="ruleForm.zipcode" placeholder="请输入联系邮箱"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="input_box mt20 input_box_disabled">
                    <div class="input_title">
                        <div class="align_box">备注</div>
                    </div>
                    <div class="input_body">
                        <el-form-item label="" prop="description">
                            <el-input disabled type="textarea" v-model="ruleForm.description"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <!-- <div class="input_box mt20">
                    <div class="input_title">
                        <div class="align_box">资料上传</div>
                    </div>
                    <div class="input_body box_required">
                        <el-form-item label="" prop="bussinessScope">
                            <el-upload
                                disabled
                                class="upload-demo"
                                action=""
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList"
                            >
                                <el-button size="small" type="text">点击上传资料</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
                            </el-upload>
                        </el-form-item>
                    </div>
                </div> -->
                      <el-form-item class="submit_buttons" style="margin-top:40px">
            <!-- <el-button @click="edit" class="primary_btn" style="color:#fff">编辑</el-button> -->
              <el-button @click="edit" class="primary_btn" style="color:#fff">返回</el-button>
          </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import pageContainer from "@/views/layout/components/Page/index";
import vueAddress from "@/components/Address/address";
import { isWscnEmail, isPhone, validatNumber } from "@/utils/validate";
import { requestPost } from "@/api/parent";

export default {
  data() {
    let validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入正确的手机号码或邮箱地址！"));
      }
      if (!isWscnEmail(value) && !isPhone(value)) {
        return callback(new Error("请输入正确的手机号码或邮箱地址！"));
      }
      callback();
    };
    let validateRegisterMoney = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入企业注册资金！"));
      }
      if (!validatNumber(value)) {
        return callback(new Error("请输入数字！"));
      }
      callback();
    };
    let validateContactPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入正确的联系电话！"));
      }
      if (!isPhone(value)) {
        return callback(new Error("请输入正确的联系电话！"));
      }
      callback();
    };
    return {
      addressDisabled: true,
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
        capital: null,
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
      rules: {},
      /*rules: {
        customerType: [
          { required: true, message: "请选择账户类型", trigger: "change" }
        ],
        customerName: [
          { required: true, message: "请输入正确的企业名称！", trigger: ["blur", "change"] },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: ["blur", "change"] }
        ],
        loginAccount: [{ validator: validateAccount, trigger: 'blur' }],
        organizationCode: [
          { required: true, message: "请输入正确的组织机构代码", trigger: ["blur", "change"] }
        ],
        legalName: [
          { required: true, message: "请输入正确的法人代表名称", trigger: ["blur", "change"] }
        ],
        customerWay: [
          { required: true, message: "请选择企业性质", trigger: ["blur", "change"] }
        ],
        province: [
          { required: true, message: "请选择地址", trigger: ["blur", "change"] }
        ],
        capital: [{ validator: validateRegisterMoney, trigger: 'blur' }],
        // bussinessScope: [],
        contactName: [{ required: true, message: "请输入正确的联系人姓名！", trigger: ["blur", "change"] }],
        phone: [{ validator: validateContactPhone, trigger: 'blur' }],
        // contactEmail: [],
        // enterpriseAddress: []
      },*/
      accountTypeOptions: [
        {
          value: "1",
          label: "融资方(出质方)"
        },
        {
          value: "2",
          label: "第三方保管机构"
        },
        {
          value: "3",
          label: "第三方价值评估机构"
        },
        {
          value: "4",
          label: "第三方风险评估机构"
        }
      ]
    };
  },
  components: {
    vueAddress
  },
  created() {

    requestPost("/api/auth/site/member/show")
      .then(response => {
       //  console.log(response.data.res_data);
        if (response.data.code === 0) {
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
        }
      })
      .catch(error => {
        reject(error);
      });
  },
  methods: {
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
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
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handlerChange: function(val) {},
    edit() {
        // this.$router.push({ name: 'companyAccountEdit' })
        this.$router.go(-1)
    }
  }
};
</script>
<style>
.show_third .el-form-item__error{
    display: none;
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
.box_required.register_money:after{
  right: -130px;
}
</style>


