<template>
  <div>
    <!-- 页头 -->
    <div slot="page_header">
      <div class="page_header">
        <PageTopBar/>
        <div class="page_head_container">
          <div class="page_container">
            <div class="page_head_menu">
              <Logo/>
              <div class="page_head_title">编 辑 应 收 单</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 页面内容 -->
    <div class="page_container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <!-- 质权信息 -->
        <div class="infoshow_box">
          <div class="infoshow_title">
            <div class="infoshow_title_inner">质权信息</div>
          </div>
          <div class="infoshow_body">
            <div class="layout_infoshow">
              <div class="infoshow_cell mt0">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">出质方</div>
                </div>
                <div class="infoshow_cell_body">{{pledgorName}}</div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">托管机构地址</div>
                </div>
                <div class="infoshow_cell_body">{{form.keeping.addresDitail}}</div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">联系电话</div>
                </div>
                <div class="infoshow_cell_body">{{form.keeping.phone}}</div>
              </div>
            </div>
            <div class="layout_infoshow border">
              <div class="infoshow_cell mt0">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">托管机构</div>
                </div>
                <div class="infoshow_cell_body box_required">
                  <el-form-item label="" class="custom-item" prop="keepingId">
                    <el-select v-model="ruleForm.keepingId">
                      <el-option
                        v-for="item in form.keeping.list"
                        :key="item.customerId"
                        :label="item.customerName"
                        :value="item.customerId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">联系人</div>
                </div>
                <div class="infoshow_cell_body">{{form.keeping.contactName}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 质押信息 -->
        <div class="infoshow_box">
          <div class="infoshow_title">
            <div class="infoshow_title_inner">质押信息</div>
          </div>
          <div class="infoshow_body">
            <div class="layout_infoshow">
              <div class="infoshow_cell mt0">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">质押物：</div>
                </div>
                <div class="infoshow_cell_body box_required">
                  <el-form-item label="" class="custom-item" prop="receType">
                    <el-select v-model="ruleForm.receType">
                      <el-option
                        v-for="item in receTypeList"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="infoshow_cell" style="margin-top:20px;">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">编号</div>
                </div>
                <div class="infoshow_cell_body box_required">
                  <el-form-item label="" prop="receNo" class="custom-item">
                    <el-input v-model="ruleForm.receNo" placeholder="请输入质押物相关编号(如合同编号)" @focus="receNoFocus"></el-input>
                  </el-form-item>
                  <div class="error_tips" v-if="existedSerialNum">该编号已存在，请重新输入</div>
                </div>
              </div>
              <div class="infoshow_cell" style="margin-top:20px;">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">卖方</div>
                </div>
                <div class="infoshow_cell_body box_required">
                  <el-form-item label="" prop="sellName" class="custom-item">
                    <el-input v-model="ruleForm.sellName" placeholder="请输入卖方名称（全称）"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="infoshow_cell">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">签订时间</div>
                </div>
                <div class="infoshow_cell_body">
                  <el-form-item label="" class="datepicker-item box_required" prop="dateTime">
                    <el-date-picker
                      v-model="ruleForm.dateTime"
                      type="date"
                      size="small"
                      placeholder="请选择签订时间"
                      range-seperator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="infoshow_cell">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">附件上传</div>
                </div>
                <div class="infoshow_cell_body minh60">
                    <!-- #11 -->
                    <el-form-item label="" style="width:420px">
                      <el-upload
                        :file-list="filelist2"
                        class="upload-demo"
                        :action="uploadUrl"
                        :on-remove="handleRemove2"
                        :before-remove="beforeRemove2"
                        :before-upload="beforeAvatarUpload"
                        :on-success="uploadSuccess2"
                        :on-error="uploadError2"
                        :limit="20"
                        :on-exceed="handleExceed2"
                        :accept="acceptList"
                      >
                        <el-button
                          size="small"
                          type="text"
                          :class="{attachDisabled:uploadDisabled2}"
                        >点击上传资料</el-button>
                        <div
                          slot="tip"
                          class="el-upload__tip"
                        >支持上传的文档类型jpg、png、pdf、word、excel、ppt文件，且单个文件大小不超过10M</div>
                      </el-upload>
                    </el-form-item>
                    <div v-if="validateAttach2">
                      <div class="validate_attach">请上传附件</div>
                    </div>
                  </div>
              </div>
            </div>
            <div class="layout_infoshow border">
              <div class="infoshow_cell mt0">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">质押物价值</div>
                </div>
                <div class="infoshow_cell_body">
                  {{ totalChange | currency("")}}（元）
                  <span class="info_tips">(备注：质押物价值 = 货物总价之和)</span>
                </div>
              </div>
              <!-- <div class="infoshow_cell">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner" style="margin-top:8px;">仓库地址</div>
                </div>
                <div class="infoshow_cell_body">
                  <vue-address
                    class="address-item"
                    :isShow="addressDisabled"
                    :province="ruleForm.provinceId"
                    :city="ruleForm.cityId"
                    :detail="ruleForm.wAddress"
                    :district="ruleForm.areaId"
                    @change="handlerChange"
                  ></vue-address>
                </div>
              </div>-->
              <div class="infoshow_cell">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">买方</div>
                </div>
                <div class="infoshow_cell_body box_required">
                  <el-form-item label="" prop="buyName" class="custom-item">
                    <el-input v-model="ruleForm.buyName"></el-input>
                  </el-form-item>
                </div>
              </div>
              <!-- <div class="infoshow_cell">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">存储天数</div>
                </div>
                <div class="infoshow_cell_body">{{ruleForm.storageDay}}</div>
              </div>-->
            </div>
          </div>
        </div>
      </el-form>
      <!-- 货物信息（货物1） -->
      <div class="infoshow_box--cargo">
        <div class="infoshow_title">
          <div class="infoshow_title_inner">
            货物信息
             <div v-if="limitCargo">
            <a class="add_new_cargo" href="#" @click.prevent="addNewCargo">
              <i class="el-icon-circle-plus"></i>新增货物信息
            </a>
            </div>
          </div>
        </div>
        <div class="infoshow_body" style="padding-top:0;">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2">
            <div
              class="cargo_box"
              v-for="(item,index) in ruleForm2.receivableCommodityList"
              :key="index"
            >
              <div class="cargo_title">货物{{index+1}}</div>
              <div v-if="index>0" class="delete_cargo" @click="deleteCargo(index)">
                <i class="el-icon-close"></i>
              </div>
              <div class="layout_infoshow">
                <div class="infoshow_cell mt0">
                  <div class="infoshow_cell_title">
                    <div class="infoshow_cell_title_inner">货物名称</div>
                  </div>
                  <div class="infoshow_cell_body">
                    <el-form-item
                      label=""
                      :prop="'receivableCommodityList.'+index+'.name'"
                      :rules="rules2.name"
                      class="custom-item box_required"
                    >
                      <el-input v-model="item.name"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="infoshow_cell">
                  <div class="infoshow_cell_title">
                    <div class="infoshow_cell_title_inner">规格</div>
                  </div>
                  <div class="infoshow_cell_body">
                    <el-form-item
                      label=""
                      :prop="'receivableCommodityList.'+index+'.type'"
                      :rules="rules2.type"
                      class="custom-item box_required"
                    >
                      <el-input v-model="item.type">10*10*10</el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="infoshow_cell" style="margin-top:30px;">
                  <div class="infoshow_cell_title">
                    <div class="infoshow_cell_title_inner">是否标品</div>
                  </div>
                  <div class="infoshow_cell_body">
                    <el-form-item
                      label=""
                      class="custom-radio"
                      style="margin-bottom:0;"
                      :prop="'receivableCommodityList.'+index+'.isMark'"
                      :rules="rules2.isMark"
                    >
                      <el-radio-group v-model="item.isMark">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </div>
                <div class="infoshow_cell">
                  <div class="infoshow_cell_title">
                    <div class="infoshow_cell_title_inner">单价</div>
                  </div>
                  <div class="infoshow_cell_body">
                    <el-form-item
                      label=""
                      :prop="'receivableCommodityList.'+index+'.price'"
                      :rules="rules2.price"
                      class="custom-item box_required"
                    >
                      <el-input v-model="item.price"></el-input>
                      <span style="position:absolute;right:0;top:0px;">（元）</span>
                    </el-form-item>
                  </div>
                </div>
                <div class="infoshow_cell">
                  <div class="infoshow_cell_title">
                    <div class="infoshow_cell_title_inner">附件上传</div>
                  </div>
                  <div class="infoshow_cell_body minh60">
                    <!-- #11 -->
                    <el-form-item label="" style="width:420px">
                      <el-upload
                        :file-list="filelist1[index]"
                        class="upload-demo"
                        :action="uploadUrl"
                        :on-remove="(file, fileList)=>{return handleRemove(file, fileList,index)}"
                        :before-remove="beforeRemove"
                        :before-upload="beforeAvatarUpload"
                        :on-success="(res,file,filelist)=>{return uploadSuccess(res,file,filelist,index)}"
                        :on-error="uploadError"
                        :limit="20"
                        :on-exceed="handleExceed"
                        :accept="acceptList"
                      >
                        <el-button
                          size="small"
                          type="text"
                          :class="{attachDisabled:uploadDisabled}"
                        >点击上传资料</el-button>
                        <div
                          slot="tip"
                          class="el-upload__tip"
                        >支持上传的文档类型jpg、png、pdf、word、excel、ppt文件，且单个文件大小不超过10M</div>
                      </el-upload>
                    </el-form-item>
                    <div v-if="validateAttachmentList[index]">
                      <div class="validate_attach">请上传附件</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="layout_infoshow border">
                <div class="infoshow_cell mt0">
                  <div class="infoshow_cell_title">
                    <div class="infoshow_cell_title_inner">品类</div>
                  </div>
                  <div class="infoshow_cell_body">
                    <el-form-item
                      label=""
                      class="custom-item box_required"
                      :prop="'receivableCommodityList.'+index+'.category'"
                      :rules="rules2.category"
                    >
                      <el-select v-model="item.category" placeholder="请选择">
                        <el-option
                          v-for="item in cargoTypeList"
                          :key="item.prdId"
                          :label="item.productName"
                          :value="item.productName"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="infoshow_cell">
                  <div class="infoshow_cell_title">
                    <div class="infoshow_cell_title_inner">单位</div>
                  </div>
                  <div class="infoshow_cell_body">
                    <el-form-item
                      label=""
                      class="custom-item box_required"
                      :prop="'receivableCommodityList.'+index+'.unit'"
                      :rules="rules2.unit"
                    >
                      <el-select v-model="item.unit" placeholder="请选择">
                        <el-option
                          v-for="item in cargoUnitList"
                          :key="item.key"
                          :label="item.value"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="infoshow_cell">
                  <div class="infoshow_cell_title">
                    <div class="infoshow_cell_title_inner">数量</div>
                  </div>
                  <div class="infoshow_cell_body">
                    <el-form-item
                      label=""
                      class="custom-item box_required"
                      :prop="'receivableCommodityList.'+index+'.count'"
                      :rules="rules2.count"
                    >
                      <el-input v-model="item.count"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="infoshow_cell">
                  <div class="infoshow_cell_title">
                    <div class="infoshow_cell_title_inner">货物总价</div>
                  </div>
                  <!--  = item.price*item.count -->
                  <div
                    class="infoshow_cell_body"
                  >{{item.totalPrice = item.price*item.count | currency("")}}（元）</div>
                  <!-- <el-input v-model="item.totalPrice" @change="totalChange" /> -->
                </div>
                <div class="infoshow_cell">
                  <div class="infoshow_cell_title">
                    <div class="infoshow_cell_title_inner">备注</div>
                  </div>
                  <div class="infoshow_cell_body">
                    <el-form-item label="" class="custom-item">
                      <el-input
                        type="textarea"
                        v-model="item.remark"
                        placeholder="请输入备注(选填）"
                        class="custom-textarea"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <!-- 确认删除货物信息弹框 -->
              <el-dialog
                title="提示"
                :visible.sync="visbleSingleDialogue2"
                class="check_dialogue_small"
                :index="index"
              >
                <div>
                  <div style="text-align:center;margin-top:30px;font-size:16px;">确认删除货物信息？</div>
                  <div>
                    <el-form>
                      <el-form-item class="submit_buttons" style="margin-top:40px;">
                        <el-button
                          type="primary"
                          @click="singleDialogue2(index)"
                          class="primary_btn"
                          style="width:140px;"
                        >确认</el-button>
                        <el-button
                          @click="cancelsingleDialogue2"
                          class="cancel_btn"
                          style="margin-left:50px;width:140px;"
                        >取消</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </el-dialog>
            </div>
          </el-form>
        </div>
        <el-form>
          <el-form-item class="submit_buttons">
            <el-button type="primary" @click="submit()" class="primary_btn">保存</el-button>
            <el-button @click="cancel" class="cancel_btn">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 弹出框 -->
    </div>
  </div>
</template>

<script>
// #0
import vueAddress from "@/components/Address/address";
import Logo from "@/views/layout/components/Logo";
import PageTopBar from "@/views/layout/components/PageTopBar";
import PageHead from "@/views/layout/components/PageHead";
import {
  validateReNum,
  validateBuyName,
  validateSellName,
  validateGoodsType,
  validateGoodsPrice,
  validateGoodsNumber
} from "@/utils/validateRules";
import { requestPost, downloadFile } from "@/api/parent";
import { currency } from "@/utils/filters";

export default {
  //#1
  components: {
    Logo,
    PageTopBar,
    PageHead,
    vueAddress
  },
  // #2
  data() {
    return {
        //限制货物数量
      limitCargo:true,
      // 上传货物附件
      newArrList:[],
      validateAttachmentList: [],
      attachMent: false,
      acceptList: "image/png, image/jpeg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
      fileList: [],
      uploadDisabled: false,
      //上传应收单附件
      attachMent2:false,
      uploadDisabled2: false,
      validateAttach2:false,

      existedSerialNum:false,
      receType: null,
      receTypeList: [
        { key: 1, value: "合同" },
        { key: 2, value: "发票" },
        { key: 3, value: "协议" },
        { key: 4, value: "票据" }
      ],
      visbleSingleDialogue2: false,
      filelist1: [],
      filelist2: [],
      filelistRemove: [[]],
      filelistPledgeRemove: [],
      cargoTypeList: [],
      // cargoTypeList: [{ key: 0, value: "晶圆" }, { key: 1, value: "半导体" }],
      cargoUnitList: [
        { key: 0, value: "米（m）" },
        { key: 1, value: "厘米(cm)" },
        { key: 2, value: "毫米（mm）" },
        { key: 3, value: "千克（kg）" },
        { key: 4, value: "克（g）" }
      ],
      //上传
      uploadUrl: uploadUrl,
      //弹出框
      dialogFormVisible: false,
      form: {
        keeping: {
          list: []
        },
        customerId: null
      },
      //地址显示
      addressDisabled: false,
      wAddress: null,
      //表单1内容
      ruleForm: {
        // dateTime: null,
        keepingId: "",
        pledgorId: "",
        receNo: "",
        sellName: "",
        startTime: "",
        // endTime: "",
        totalAmount: null,
        buyName: "",
        //审核人
        wfProcessDetail: {
          handleId: null
        },
        // 地址
        provinceId: "",
        cityId: "",
        areaId: ""
      },
      //表单2内容
      ruleForm2: {
        receivableCommodityDeleteList: [],
        receivableCommodityList: [
          {
            count: "",
            isMark: "1",
            name: "", //货物名称
            price: "",
            remark: "",
            totalPrice: null,
            type: "", //规格
            category: "", //品类
            unit: "", //单位
            // receivableAttachment: {
            //   attachment: "测试附件地址",
            //   attaName: ""
            // }
            receivableAttachment: []
          }
        ]
      },
      rules: {},
      rules2: {},
      rules: {
        keepingId: [
          { required: true, message: "请选择托管机构", trigger: "change" }
        ],
        receType: [
          { required: true, message: "请选择质押物", trigger: "change" }
        ],
        receNo: [{ validator: validateReNum, trigger: ["blur", "change"] }],
        sellName: [
          { validator: validateSellName, trigger: ["blur", "change"] }
        ],
        buyName: [{ validator: validateBuyName, trigger: ["blur", "change"] }]
      },

      rules2: {
        //货物验证规则
        // 货物名称
        name: [
          {
            required: true,
            message: "请输入正确的货物名称",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 40,
            message: "长度为40字符以内",
            trigger: ["blur", "change"]
          }
        ],
        // 货物规格
        type: [{ validator: validateGoodsType, trigger: ["blur", "change"] }],
        category: [
          { required: true, message: "请选择品类", trigger: "change" }
        ],
        isMark: [{ required: true, message: "请选择标品", trigger: "change" }],
        price: [{ validator: validateGoodsPrice, trigger: ["blur", "change"] }],
        unit: [{ required: true, message: "请选择单位", trigger: "change" }],
        count: [{ validator: validateGoodsNumber, trigger: ["blur", "change"] }]
      }
    };
  },
  // #3
  created() {
    let user = JSON.parse(localStorage.getItem("user_front"));
    this.pledgorName = user.customerName;
    this.ruleForm.pledgorId = user.customerId;


    //仓单信息和货物信息
    requestPost("/api/auth/site/receivable/show", {
      receId: this.$route.query.receId
    }).then(response => {
      if (response.data.code === 0) {
        let startTime = response.data.res_data.receivableInfo.startTime;
        let time = new Date(startTime);
        response.data.res_data.receivableInfo.dateTime = time;
        this.ruleForm.dateTime = time;
        this.ruleForm = response.data.res_data.receivableInfo;
        this.ruleForm2.receivableCommodityList =
          response.data.res_data.receivableCommodityList;
        //质押信息附件
        let pledgeAttachment = this.ruleForm.receivableAttachment.map(
          (item, index) => {
            return {
              name: item.fileName,
              url: item.attachment,
              id: item.id
            };
          }
        );
        this.filelist2 = pledgeAttachment;
      // 初始化附件信息,获得数组长度
      var commodityListLength = this.ruleForm2.receivableCommodityList.length;
      console.log(6666)
      console.log(commodityListLength)
      //  if(this.newArrList.length==0){
         this.newArrList = Array.apply(null, Array(commodityListLength)).map((item)=>{
        //  return item === undefined ? true : item 
         return item = false
       })
      // }
      // array to object
      let validateAttachObj= Object.assign({},this.newArrList,this.validateAttachmentList)
      // object to array
      this.validateAttachmentList = Array.from(Object.keys(validateAttachObj),k=>validateAttachObj[k])  

      this.attachMent2 = true


        //取出货物附件值
        this.ruleForm2.receivableCommodityList.forEach((itemList, index) => {
          return (this.filelist1[index] = itemList.receivableAttachment);
        });

        let newArr = this.filelist1.map((itemList2, index) => {
          return itemList2.map((item, index2) => {
            return {
              id: item.id,
              name: item.fileName,
              url: item.attachment
            };
          });
        });
        this.filelist1 = newArr;

        let markList = this.ruleForm2.receivableCommodityList;
        markList.map(item => {
          return (item.isMark = item.isMark.toString());
        });
        this.ruleForm2.receivableCommodityList.isMark = [
          this.ruleForm2.receivableCommodityList.isMark
        ].toString();
      }
    });

    //品类列表
    requestPost("/api/auth/site/product/list").then(response => {
      if (response.data.code === 0) {
        this.cargoTypeList = response.data.res_data;
      }
    });

    // 1 融资方  2 第三方机构,拉取托管机构列表
    requestPost("/api/auth/site/customer/list", { customerType: 2 }).then(
      response => {
        //托管机构
        if (response.data.code === 0) {
          this.form.keeping.list = response.data.res_data.list;
        }
      }
    );
  },
  // #4
  methods: {
    receNoFocus(){
        this.existedSerialNum = false
    },
    singleDialogue2(index) {
      this.ruleForm2.receivableCommodityList.map((item, index1) => {
        if (index1 == index) {
          this.ruleForm2.receivableCommodityDeleteList.push(item.id);
          //  console.log(this.ruleForm2.receivableCommodityDeleteList)
        }
      });
      this.ruleForm2.receivableCommodityList.splice(index, 1);

      this.visbleSingleDialogue2 = false;

      return;
    },
    cancelsingleDialogue2() {
      this.visbleSingleDialogue2 = false;
    },
    loadContract() {},
    //提交表单1和表单2验证
    submit() {
      var _that = this;

        // 初始化附件信息,获得数组长度
      var commodityListLength = this.ruleForm2.receivableCommodityList.length;
      
     if(this.newArrList.length==0){
         this.newArrList = Array.apply(null, Array(commodityListLength)).map((item)=>{
         return item === undefined ? true : item 
       })
      }

      // array to object
      let validateAttachObj= Object.assign({},this.newArrList,this.validateAttachmentList)
      // object to array
      this.validateAttachmentList = Array.from(Object.keys(validateAttachObj),k=>validateAttachObj[k])

      // alert(1)
      //上传附件成功
      this.attachMent = this.validateAttachmentList.every(item=>{
        return item == false
      })
      


       if (this.filelist2.length == 0) {
          this.validateAttach2 = true;
        }

      console.log(555)
      console.log('ruleForm2'+this.attachMent)
      console.log('ruleForm' +this.attachMent2)
      // console.log(this.validateAttach2)
      //  alert(2)
      var p1 = new Promise(function(resolve, reject) {
        _that.$refs["ruleForm"].validate(valid => {
          if (valid && _that.attachMent2) {
            resolve();
          }
        });
      });
      var p2 = new Promise(function(resolve, reject) {
        _that.$refs["ruleForm2"].validate(valid => {
          if (valid && _that.attachMent) {
            resolve();
          }
        });
      });

      Promise.all([p1, p2])
        .then(function() {
          let submitData = {};
          // 弹出对话框
          // _that.dialogFormVisible = true;
          //提交新增仓单数据
          let addData = {};

          //处理对象
          let newFileList = _that.filelist1.map((itemList, index) => {
            return itemList.map((item, index1) => {
              if (item.response) {
                return {
                  id: item.id,
                  attachment: item.response.res_data.url,
                  fileName: item.response.res_data.oldFileName
                };
              } else {
                return {
                  id: item.id,
                  attachment: item.url,
                  fileName: item.name
                };
              }
              // return {
              //   attachment: item.response.res_data.url,
              //   fileName: item.response.res_data.oldFileName
              // };
            });
          });

          newFileList.map((item, index) => {
            if (_that.ruleForm2.receivableCommodityList[index]) {
              return (_that.ruleForm2.receivableCommodityList[
                index
              ].receivableAttachment = item);
            }
          });

          _that.filelistRemove.map((item, index) => {
            return (_that.ruleForm2.receivableCommodityList[
              index
            ].receivableAttachmentDeleteList = item);
          });

          //应收上传附件
          let newFileList2 = _that.filelist2.map((item, index) => {
            if (item.response) {
              return {
                id: item.id,
                attachment: item.response.res_data.url,
                fileName: item.response.res_data.oldFileName
              };
            } else {
              return {
                id: item.id,
                attachment: item.url,
                fileName: item.name
              };
            }
          });

          //应收上传删除和新增
          _that.ruleForm.receivableAttachmentDeleteList =
            _that.filelistPledgeRemove;
          // _that.filelistPledgeRemove.map((item,index)=>{
          //   _that.ruleForm.receivableAttachmentDeleteList = item
          //   // return (_that.ruleForm2.whreceiptCommodityList[index].whreceiptAttachmentDeleteList = item);
          // })

          Object.assign(addData, _that.ruleForm, _that.ruleForm2, {
            receivableAttachment: newFileList2
          });
          // console.log(222);
          // console.log(addData);
          //编辑应收单操作

          requestPost("/api/auth/site/receivable/edit", addData).then(
            response => {
              // console.log(333);
              // console.log(response);
              if (response.data.code === 0) {
                _that.$message.success("修改应收单成功");
                _that.$router.go(-1);
              } 
              else if(response.data.code === 10005){
                  _that.existedSerialNum = true
                }
              else if (response.data.code === 0) {
                _that.$message.warn("请上传附件");
              }
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {
      this.$confirm("取消操作将不保存本次编辑内容，请确认是否取消！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$router.push({ name: "receiveableManageList" });
          this.$router.go(-1);
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消"
          // });
        });
    },
    //文件上传
    //文件上传
    beforeUpload(file) {
      //文件类型校验
      let regFileName = /\.(\w+)$/;
      let suffixName = file.name.match(regFileName)[0];

      const isJPG = suffixName === ".jpg" || suffixName === ".jpeg";
      const isPNG = suffixName === ".png";
      const isPdf = suffixName === ".pdf";
      const isWord = suffixName === ".doc" || suffixName === ".docx";
      const isExcel = suffixName === ".xls" || suffixName === ".xlsx";
      const isPPT = suffixName === ".ppt" || suffixName === ".pptx";

      const isMatch = isJPG || isPNG || isPdf || isWord || isExcel || isPPT;

      if (!isMatch) {
        this.$message.error(
          "上传的文档格式仅支持：jpg、png、pdf、word、excel、ppt"
        );
        return;
      }

      //文件大小校验
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传文件大小不能超过 10MB!");
        return;
      }
    },
     beforeAvatarUpload(file) {
           console.log(file.type)  
            const isJPG = file.type === 'image/jpeg';
            const isPNG  = file.type ==='image/png'
            const isPDF  = file.type ==='application/pdf'
            const isWord  = file.type ==='application/msword'
            const isExcel  = file.type ==='application/vnd.ms-excel'
            const isPPT  = file.type ==='application/vnd.ms-powerpoint'
            const is10M  = file.size/1024/1024<10

        if (!isJPG && !isPNG && !isPDF && !isWord && !isExcel && !isPPT ) { //限制文件类型
          this.$message.error('文件格式错误！可支持的文档格式包括：jpg、png、pdf、word、Excel、ppt');
        }else if(!is10M){ //限制文件大小
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return (isJPG || isPNG || isPDF || isWord || isExcel || isPPT) && is10M;
      },
    //上传文件总数不超过20个
    handleExceed(files, fileList) {
      this.$message.warning("最多上传20个文件");
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`);
    },

    uploadError(err, file, fileList) {
      console.log(err);
      if (!err.lengthComputable) {
        return;
      } else {
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
    uploadSuccess(response, file, fileList, index) {
      let regFileName = /\.(\w+)$/;
      let suffixName = file.name.match(regFileName)[0];
      let _that = this;
      let len = fileList.length;

      this.$set(this.filelist1, index, fileList);
       
      //文件存在
      if (fileList.length != 0) {
        //this.validateAttachmentList[index] = false;
        this.$set(this.validateAttachmentList, index, false);
        //限制上传总文件数
        if (fileList.length >= 20) {
          return (_that.uploadDisabled = true);
        }
      }

     
      //上传成功
      if (file.response.code === 200) {
     
        if (suffixName === ".txt") {
          this.filelist1[index].splice(-1,1);
        } else if (suffixName === ".psd") {
          this.filelist1[index].splice(-1,1);
        } else {
          //上传成功的文件
          this.$set(this.filelist1, index, fileList);
       
        }
      } else if (file.response.code === 1001) {
        // 上传失败
        this.filelist1[index].splice(-1,1);
      }
    },
    handleRemove(file, fileList, index) {
      if (fileList.length == 0) {
        // this.validateAttachmentList[index] = true;
        this.$set(this.validateAttachmentList, index, true);
        this.filelist1[index] =[]
        //  this.$set(this.filelist1,index,fileList)
      }
      this.filelistRemove.map(item => {
        return item.push(file.id);
      });
      //上传文件长度限制
      if (fileList.length < 20) {
        this.uploadDisabled = false;
      }
    },


    //上传2  应收单附件
    //文件上传
    beforeUpload2(file) {
      //文件类型校验
      let regFileName = /\.(\w+)$/;
      let suffixName = file.name.match(regFileName)[0];

      const isJPG = suffixName === ".jpg" || suffixName === ".jpeg";
      const isPNG = suffixName === ".png";
      const isPdf = suffixName === ".pdf";
      const isWord = suffixName === ".doc" || suffixName === ".docx";
      const isExcel = suffixName === ".xls" || suffixName === ".xlsx";
      const isPPT = suffixName === ".ppt" || suffixName === ".pptx";

      const isMatch = isJPG || isPNG || isPdf || isWord || isExcel || isPPT;

      if (!isMatch) {
        this.$message.error(
          "上传的文档格式仅支持：jpg、png、pdf、word、excel、ppt"
        );
        return;
      }

      //文件大小校验
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传文件大小不能超过 10MB!");
        return;
      }
    },
    //上传文件总数不超过20个
    handleExceed2(files, fileList) {
      this.$message.warning("最多上传20个文件");
    },
    beforeRemove2(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`);
    },

    uploadError2(err, file, fileList) {
      console.log(err);
      if (!err.lengthComputable) {
        return;
      } else {
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
    uploadSuccess2(response, file, fileList) {
      let regFileName = /\.(\w+)$/;
      let suffixName = file.name.match(regFileName)[0];
      let _that = this;
      let len = fileList.length;
      // this.$set(this.filelist1, index, fileList);
      this.filelist2 = fileList;
       
      //文件存在
      if (fileList.length != 0) {
        this.attachMent2 = true;
       this.validateAttach2 = false;
        // this.attachMent = true;
        //限制上传总文件数
        if (fileList.length >= 20) {
          return (_that.uploadDisabled2 = true);
        }
      }

     

      //上传成功
      if (file.response.code === 200) {
        if (suffixName === ".txt") {
          this.filelist2.splice(-1,1);
        } else if (suffixName === ".psd") {
          this.filelist2.splice(-1,1);
        } else {
          //上传成功的文件
          // this.$set(this.filelist2, index, fileList);
          this.filelist2 = fileList;
       
        }
      } else if (file.response.code === 1001) {
        // 上传失败
        // this.filelist1[index].splice(0, len);
         this.filelist2.splice(-1,1)
      }
    },
    handleRemove2(file, fileList) {
      if (fileList.length == 0) {
        this.validateAttach2 = true;
        this.attachMent2 = false;
        this.uploadDisabled = false;
        this.filelist2 =[]
      }
      this.filelistPledgeRemove.push(file.id);
      //上传文件长度限制
      if (fileList.length < 20) {
        this.uploadDisabled2 = false;
      }
    },


    //城市地址变化
    // handlerChange(val) {
    //   if (val.province) {
    //     this.ruleForm.provinceId = val.province;
    //   }
    //   if (val.city) {
    //     this.ruleForm.cityId = val.city;
    //   }
    //   if (val.detail) {
    //     this.ruleForm.wAddress = val.detail;
    //   }
    //   if (val.district) {
    //     this.ruleForm.areaId = val.district;
    //   }
    // },

    //删除货物
    deleteCargo(index) {
      this.visbleSingleDialogue2 = true;
         let commodityListLength = this.ruleForm2.receivableCommodityList.length;
        if(commodityListLength<=20){
            this.limitCargo = true
      }
    },
    //新增货物
    addNewCargo() {
      this.newArrList = []
      let commodityListLength = this.ruleForm2.receivableCommodityList.length;
       commodityListLength++;
      if(commodityListLength>=20){
          this.limitCargo = false
      }
      this.ruleForm2.receivableCommodityList.push({
        count: "",
        isMark: "1",
        name: "", //货物名称
        price: "",
        remark: "",
        totalPrice: "", //货物总价
        type: "", //规格
        category: "", //品类
        unit: "", //单位
        receivableAttachment: [
          //   {
          //   attachment: "",
          //   attaName:''
          // }
        ]
      });
    }
    //
  },
  // #5
  watch: {
    "ruleForm.dateTime"(dateTime) {
      if (dateTime !== null) {
        this.ruleForm.startTime = dateTime.getTime();
        // this.ruleForm.endTime = dateTime[1].getTime();

        // this.ruleForm.endTime =  dateTime[1].getTime() + 50*3600*24*1000
        // if (this.ruleForm.startTime === dateTime[1].getTime()) {
        //   this.ruleForm.endTime = dateTime[1].getTime() + 3600 * 24 * 1000;
        // }
      } else {
        this.startTime = null;
        this.endTime = null;
      }
    },
    "ruleForm.keepingId"(customerId) {
      this.ruleForm.keepingId = customerId;

      if (customerId && this.form.keeping.list) {
        this.form.keeping.list.forEach(item => {
          if (item.customerId === customerId) {
            let address = JSON.parse(localStorage.getItem("address_front"));
            let addresDitail = "";
            address.forEach(addres => {
              if (addres.id === item.provinceId) {
                addresDitail += " " + addres.name;
              }
              addres.childrens.forEach(addres2 => {
                if (addres2.id === item.cityId) {
                  addresDitail += " " + addres2.name;
                }
                addres2.childrens.forEach(addres3 => {
                  if (addres3.id === item.areaId) {
                    addresDitail += " " + addres3.name;
                  }
                });
              });
            });
            addresDitail += " " + item.address;
            this.form.keeping.addresDitail = addresDitail;
            Object.assign(this.form.keeping, item);
          }
        });
      }
    },
    "ruleForm2.category"(categoryId) {
      this.cargoTypeList.forEach(item => {
        if (item.prdId === categoryId) {
          ruleForm2.category = item.productName;
        }
      });
    },
    "ruleForm.receType"(selectId) {
      this.ruleForm.receType = selectId;
      if (selectId) {
        this.receTypeList.forEach(item => {
          if (item.key == selectId) {
            item.key = selectId;
          }
        });
      }
    }
  },
  // #6
  computed: {
    //计算仓单总金额
    totalChange() {
      this.ruleForm.totalAmount = 0;
      this.ruleForm2.receivableCommodityList.forEach(item => {
        this.ruleForm.totalAmount += item.totalPrice;
      });
      return this.ruleForm.totalAmount;
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 390px;
}
</style>
