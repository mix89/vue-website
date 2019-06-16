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
              <div class="page_head_title">查 看 应 收 单</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 页面内容 -->
    <div class="page_container">
      <div class="order_number_show mt10">
        <div class="fix">
          系统单号：{{ruleForm.sysReceNo}}
           <span class="waiting_txt">风险待评估</span>
          <!-- <span class="waiting_txt" v-if="ruleForm.status=='1'">待审核</span>
          <span class="waiting_txt" v-else-if="ruleForm.status=='2'">审核中</span>
          <span class="reject_txt" v-else-if="ruleForm.status=='3'">审核驳回</span>
          <span class="info_txt" v-else-if="ruleForm.status=='4'">审核通过</span> -->
          <!-- <span class="info_txt" v-else-if="ruleForm.status=='5'">价值评估完成</span> -->

          <!-- <span class="info_txt" v-else-if="ruleForm.status=='6'">风险评估完成</span>
          <span class="reject_txt" v-else-if="ruleForm.status=='7'">托管机构已驳回</span>
          <span class="info_txt" v-else-if="ruleForm.status=='8'">已确认</span>
          <span class="waiting_txt" v-else-if="ruleForm.status=='9'">平台待确认</span>
          <span class="reject_txt" v-else-if="ruleForm.status=='10'">平台已驳回</span>
          <span class="waiting_txt" v-else-if="ruleForm.status=='11'">融资中</span>
          <span class="reject_txt" v-else-if="ruleForm.status=='12'">融资失败</span>
          <span class="info_txt" v-else-if="ruleForm.status=='13'">已解质押</span> -->
          <!-- <span class="info_txt">已通过</span>  -->
          <!-- color   ff3c00 -->
        </div>
      </div>
      <el-form :model="ruleForm">
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
                <div class="infoshow_cell_body">{{ruleForm.pledgorName}}</div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">托管机构地址</div>
                </div>
                <div class="infoshow_cell_body">{{ruleForm.keepingAddress}}</div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">联系电话</div>
                </div>
                <div class="infoshow_cell_body">{{ruleForm.keepingPhone}}</div>
              </div>
            </div>
            <div class="layout_infoshow border">
              <div class="infoshow_cell mt0">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">托管机构</div>
                </div>
                <div class="infoshow_cell_body">
                  {{ruleForm.keepingName}}
                  <el-tooltip placement="bottom-end" style="position:absolute;right:53px;top:-2px">
                    <div slot="content">
                      <div class="tips_p">
                          请将相关买卖合同/协议等原件寄送至指定托管机构，
                        <br>如不寄送将无法进行融资服务！
                      </div>
                    </div>
                    <el-button>
                      <span class="tips_ask">?</span>
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">联系人</div>
                </div>
                <div class="infoshow_cell_body">{{ruleForm.keepingContactName}}</div>
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
                <div class="infoshow_cell_body">
                  <!-- #0 -->
                    <div v-for="(item,index) in receTypeList" :key="index">
                        <div v-if="item.key==ruleForm.receType">
                          {{item.value}}
                        </div>
                    </div>
                </div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">编号</div>
                </div>
                <div class="infoshow_cell_body">{{ruleForm.receNo}}</div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">卖方</div>
                </div>
                <div class="infoshow_cell_body">{{ruleForm.sellName}}</div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">签订时间</div>
                </div>
                <div class="infoshow_cell_body">{{ruleForm.startTime | formartDate('')}}</div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">附件信息</div>
                </div>
                <div class="infoshow_cell_body minh60">
                    <div class="flex mt10">
                      <!-- #666 -->
                          <div>
                              <!--合同扫描件-->
                               {{filesub1.fileName}}
                              <!-- <a href="#" class="info_txt">货品样品照片</a> -->
                          </div>

                          <div class="ml20p">{{filesub1.createTime}}</div>
                          <div class="ml5p info_txt">
                              <a href="#" @click.prevent="downloadFile(filesub1.attachment,filesub1.fileName)">下载</a>
                          </div>
                  </div>

                  <!-- <div style="margin-top:-12px;">

                    <el-upload
                      :file-list="filelist2"
                      class="upload-demo"
                      :action="uploadUrl"
                      :on-remove="handleRemove2"
                      :before-remove="beforeRemove2"
                      :before-upload="beforeUpload2"
                      :on-success="uploadSuccess2"
                      :on-error="uploadError2"
                    >
                      <el-button size="small" type="text">点击上传资料</el-button>
                      <div slot="tip" class="el-upload__tip">文件类型jpg、png、pdf、word、excel、ppt，大小不超过5M</div>
                    </el-upload>
                  </div> -->



                  <!-- <div class="flex">
                        <div>
                          <a href="#" class="info_txt">货品样品照片</a>
                        </div>
                        <div class="ml20p">2018.08.01 10:23</div>
                        <div class="ml5p info_txt">
                          <a href="#">下载</a>
                        </div>
                      </div>
                      <div class="mt15">
                        <a href="#" class="info_txt">全部下载</a>
                  </div>-->
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
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">买方</div>
                </div>
                <div class="infoshow_cell_body">
                  {{ruleForm.buyName}}
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
                    <div class="infoshow_title_inner">货物信息</div>
                </div>
                <div class="infoshow_body" style="padding-top:0;">
                    <el-form :model="ruleForm2">
                        <div
                            class="cargo_box"
                            v-for="(item,index) in ruleForm2.receivableCommodityList"
                            :key="index"
                        >
                            <div class="cargo_title">货物{{index+1}}</div>
                            <div class="layout_infoshow">
                                <div class="infoshow_cell mt0">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">货物名称</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.name}}</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">规格</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.type}}</div>
                                </div>
                                <div class="infoshow_cell" style="margin-top:30px;">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">是否标品</div>
                                    </div>
                                    <div class="infoshow_cell_body">
                                      <!-- {{item.isMark}} -->

                                        <div v-for="(subitem,index) in isMarkList" :key="index">
                                          <div v-if="subitem.key==item.isMark">
                                            {{subitem.value}}
                                          </div>
                                      </div>
                                    </div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">单价</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.price | currency("")}}（元）</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <!-- #22 -->
                                        <div class="infoshow_cell_title_inner">附件信息</div>
                                    </div>
                                    <div class="infoshow_cell_body minh60">
                                        <div style="margin-top:-12px;">
                                            <div v-for="(sub1,index1) in item.receivableCommodity" :key="index1">
                                              <div class="flex mt10">
                                                <div>
                                                    <!--货品样品信息-->
                                                     {{sub1.fileName}}
                                                    <!-- <a href="#" class="info_txt">货品样品照片</a> -->
                                                </div>
                                                <div class="ml20p"> {{sub1.createTime}}</div>
                                                <div class="ml5p info_txt">

                                                    <a href="#" @click.prevent="downloadFile(sub1.attachment,sub1.fileName)">下载</a>
                                                </div>
                                            </div>
                                        </div>
                                            <!-- <el-upload
                                                :file-list="filelist1"
                                                class="upload-demo"
                                                :action="uploadUrl"

                                                :on-error="uploadError"
                                                multiple
                                                :limit="3"
                                                :on-exceed="handleExceed"
                                            >
                                                <el-button size="small" type="text">点击上传资料</el-button>
                                                <div
                                                    slot="tip"
                                                    class="el-upload__tip"
                                                >只能上传jpg/png文件，且大小不超过5M</div>
                                            </el-upload> -->
                                            <!-- <div class="flex">
                                                <div>
                                                    <a href="#" class="info_txt">货品样品照片</a>
                                                </div>
                                                <div class="ml20p"></div>
                                                <div class="ml5p info_txt">
                                                    <a href="#">下载</a>
                                                </div>
                                            </div> -->
                                            <div class="mt15">
                                                <!-- <a href="#" class="info_txt">全部下载</a> -->
                                            </div>
                                        </div>
                                        <!-- <div class="flex">
                        <div>
                          <a href="#" class="info_txt">货品样品照片</a>
                        </div>
                        <div class="ml20p">2018.08.01 10:23</div>
                        <div class="ml5p info_txt">
                          <a href="#">下载</a>
                        </div>
                      </div>
                      <div class="mt15">
                        <a href="#" class="info_txt">全部下载</a>
                                        </div>-->
                                    </div>
                                </div>
                            </div>
                            <div class="layout_infoshow border">
                                <div class="infoshow_cell mt0">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">品类</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.category}}</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">单位</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.unit}}</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">数量</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.count}}</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">货物总价</div>
                                    </div>
                                    <!--  = item.price*item.count -->
                                    <div
                                        class="infoshow_cell_body"
                                    >{{item.totalPrice | currency("")}}（元）</div>
                                    <!-- <el-input v-model="item.totalPrice" @change="totalChange" /> -->
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">备注</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.remark}}</div>
                                </div>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>

       <!-- 风险评估 -->
            <div class="infoshow_box">
                <div class="infoshow_title">
                    <div class="infoshow_title_inner">风险评估</div>
                </div>
                <div class="infoshow_body">
                    <el-form :model="ruleForm4" :rules="rules4" ref="ruleForm4">
                        <div class="layout_infoshow">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">风险等级</div>
                                </div>
                                <div class="infoshow_cell_body box_required">
                                    <el-form-item label="" class="custom-item" prop="riskLevel">
                                        <el-select v-model="ruleForm4.riskLevel">
                                            <el-option
                                                v-for="item in riskLevelList"
                                                :key="item.key"
                                                :label="item.value"
                                                :value="item.key"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="infoshow_cell mt20">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">评估资料</div>
                                </div>
                                <div class="infoshow_cell_body">
                                    <el-form-item label="" style="width:420px">
                                        <el-upload
                                            class="upload-demo"
                                            :file-list="fileList"
                                            :action="uploadUrl"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :before-upload="beforeUpload"
                                            :on-success="uploadSuccess"
                                            :on-error="uploadError"
                                            :limit="1"
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
                                            >仅支持上传1个文件，上传可支持的文档格式包括：jpg、png、pdf、word、excel、ppt，且大小不超过10M</div>
                                        </el-upload>
                                    </el-form-item>
                                    <div v-if="validateAttachment">
                                        <div class="validate_attach">请上传附件</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="layout_infoshow border">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">备注</div>
                                </div>
                                <div class="infoshow_cell_body">
                                    <el-form-item label="" prop="desc" class="custom-item">
                                        <el-input type="textarea" v-model="ruleForm4.remark"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>

      <!-- 流程图 -->
      <div class="infoshow_box">
        <div class="infoshow_title">
          <div class="infoshow_title_inner">流程</div>
        </div>
        <div class="infoshow_body">
          <div class="showflow">
            <div v-for="(item,index) in check.list" :key="index">
              <div class="showflow_box_year" v-if="index == 0">
                <div class="showflow_year">{{check.createName}}</div>
                <div class="showflow_date">{{item.createTime}}</div>
                <div class="showflow_person">{{item.handleNickName}}</div>
                <div class="showflow_state">{{item.handleExplain}}</div>
                <div class="showflow_state" v-if="item.flowDescription">{{item.flowDescription}}</div>
              </div>
              <div
                :class="{'warining':item.status == 3 , 'showflow_box':true}"
                v-else
              >
                <div class="showflow_date">{{item.createTime}}</div>
                <div class="showflow_person">{{item.handleNickName}}</div>
                <div class="showflow_state">{{item.flowDescription}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 弹出框 -->
      <div class="submit_buttons" style="background:#fff;">
                <el-button
                    type="primary"
                    @click="submitForm('ruleForm4')"
                    class="primary_btn"
                >确认评估结果</el-button>
                <el-button @click="cancel" class="cancel_btn" style="margin-left:70px">返回</el-button>
            </div>
      <!-- <div class="submit_buttons" style="background:#fff;">

        <el-button @click="cancel" class="cancel_btn" style="margin-left:0">返回</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
// #0
import vueAddress from "@/components/Address/address";
import Logo from "@/views/layout/components/Logo";
import PageTopBar from "@/views/layout/components/PageTopBar";
import PageHead from "@/views/layout/components/PageHead";
import { isPhone, isWscnEmail } from "@/utils/validate";
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

  // 上传附件
      validateAttachment: false,
      attachMent: false,
      acceptList: "image/png, image/jpeg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
      fileList: [],
      uploadDisabled:false,

      fileList1:[],
      ruleForm4: {
        desc:""
      },
      riskLevelList: [
        { key: 1, value: "低" },
        { key: 2, value: "中" },
        { key: 3, value: "高" }
      ],
      rules4: {
        riskLevel: [
          { required: true, message: "请选择融资风险等级", trigger: "change" }
        ],
        desc:[{required:false,max:100,message:'字符长度在100个以内',trigger: ["blur","change"]}]
      },
      //文件上传
      uploadUrl: uploadUrl,
      //流程
      check: {},
      filesub1:{},

      isMarkList:[{ key: 1, value: "是" },{ key: 2, value: "否" }],
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
      cargoTypeList: [{ key: 0, value: "晶圆" }, { key: 1, value: "半导体" }],
      cargoUnitList: [{ key: 0, value: "米" }, { key: 1, value: "厘米" }],

      //审核人列表
      checkform: {
        people: ""
      },
      checkPeopleList: [],
      commodityList: [],
      //上传
      uploadUrl: uploadUrl,
      fileListValue: [],
      //日期禁选
      // pickerOptions: {
      //   disabledDate(time) {
      //     let _now = Date.now();
      //     let disabledDays = 50 * 24 * 60 * 60 * 1000;
      //     disabledDays = _now + disabledDays;
      //     //不能显示当天
      //     return time.getTime() > _now && time.getTime() < disabledDays;
      //   },
      //   onPick({ maxDate, minDate }) {
      //     // alert(minDate)
      //     // alert(minDate)
      //   }
      // },
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
        sysReceNo:null,
        pledgorType:null,
        startTime: null,
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
      ruleForm3: {
        // checkPeople: "",
        wfProcessDetail: {
          handleId: ""
        }
      },
      rules: {},
      rules2: {},
      rules3: {
      }

    };
  },
  // #3
  created() {
    let user = JSON.parse(localStorage.getItem("user_front"));
    this.pledgorName = user.customerName;
    this.ruleForm.pledgorId = user.customerId;
    //拉取仓单信息和货物信息
    // /api/auth/site/receivable/show
     // /api/auth/site/receivable/risk/addInfoShow
    requestPost("/api/auth/site/receivable/risk/addInfoShow", {
      receId: this.$route.query.receId
    }).then(response => {
      // #22
      console.log(response);
      if (response.data.code === 0) {
        // .receivableInfo
        this.ruleForm = response.data.res_data;
        this.ruleForm2.receivableCommodityList =
          response.data.res_data.receivableCommodityList;
        console.log(87878);
        console.log(this.ruleForm)

        // console.log(87878);
        // console.log(this.ruleForm2.receivableCommodityList)



       this.filesub1.attachment =this.ruleForm.receivableAttachment[0].attachment
       this.filesub1.fileName = this.ruleForm.receivableAttachment[0].fileName
       this.filesub1.createTime = this.ruleForm.receivableAttachment[0].createTime
        // this.ruleForm2.receivableCommodityList[0].whreceiptAttachment[0].attachment =

        // this.fileList1
      }
    });
    //流程
    requestPost("/api/auth/site/receivable/wfDetail", {
      receId: this.$route.query.receId
    }).then(response => {
      if (response.data.code === 0) {
        this.check.list = response.data.res_data.list;
      }
    });
  },
   // #4
    methods: {
    //文件下载
    downloadFile:downloadFile,
    submitForm(formName) {
        if (this.fileList.length == 0) {
          this.validateAttachment = true;
        }
      this.$refs[formName].validate(valid => {
        if (valid && this.attachMent) {
        // let attachmentList = this.fileList1.map((fileItem,index)=>{
        //       return {
        //           attachment: fileItem.response.res_data.url,
        //           attaName: fileItem.response.res_data.oldFileName,
        //       }
        //   })


          let  riskData ={}
          riskData.receId = this.ruleForm.receId
          riskData.riskLevel = this.ruleForm4.riskLevel
          riskData.remark = this.ruleForm4.remark
          // riskData.attachment = attachmentList
          riskData.attachment = this.ruleForm4.attachment
           riskData.attaName =this.ruleForm4.attaName
        //     "receId": 27,
      	// " riskLevel ":2,
        // "handleExplain":"可以准予通过",
          // "attachment":""
        // console.log(88888)
        console.log(riskData)
          requestPost("/api/auth/site/receivable/risk",riskData)
            .then(response => {
              if (response.data.code === 0) {
                this.$router.push({name:'receiveRiskAssessmentList'});
                this.$message.success('风险评估已完成')
              }else if(response.data.code === 10009){
                this.$message.warning(response.data.msg)
                window.history.go(-1)
              }else {
                this.$message.warning(response.data.msg)
                window.history.go(-1)
              }
            })
            .catch(error => console.log(error));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消操作
    cancel() {
      this.$router.go(-1);
      // this.$router.push({ name: "receiveRiskAssessmentList" });
    },
   //上传附件
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
    //上传文件总数不超过1个
    handleExceed(files, fileList) {
      this.$message.warning("最多上传1个文件");
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
      console.log(fileList);
      let regFileName = /\.(\w+)$/;
      let suffixName = file.name.match(regFileName)[0];

      if (fileList.length != 0) {
        let _that = this
        this.validateAttachment = false;
        this.attachMent = true;
        fileList.forEach((item)=>{
            //上传成功并且过滤psd和txt文件
            if(item.response.code==200){
              if(!(suffixName === ".txt" || suffixName === ".psd")){
                return  _that.uploadDisabled =true;
              }
            }
        })

      }

      if (response.code === 200) {

        if (suffixName === ".txt") {
          this.fileList.splice(-1, 0);
        }else if(suffixName === ".psd"){
          this.fileList.splice(-1, 0);
        }
        else {
          this.fileList = fileList;
          // #单个文件
        this.ruleForm4.attachment = fileList[0].response.res_data.url
        this.ruleForm4.attaName =  fileList[0].response.res_data.oldFileName
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
        this.uploadDisabled = false;
        this.fileList =[]
      }
    },

  },
  // #5
  watch: {

  },

  //地址
    // #6
  computed: {
    //计算仓单总金额
    totalChange() {
      this.ruleForm.totalAmount = 0;
      this.ruleForm2.receivableCommodityList.forEach(item => {
        this.ruleForm.totalAmount += item.totalPrice;
      });
      return this.ruleForm.totalAmount;
    },

  }

};
</script>

<style scoped>
.el-button {
  padding: 0;
  border: 0;
}
</style>
