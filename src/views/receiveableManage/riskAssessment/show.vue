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
           <span class="info_txt">风险已评估</span>
          <!-- <span class="waiting_txt" v-if="ruleForm.status=='6'">风险已评估</span> -->
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
                                            <div v-for="(sub1,index1) in item.receivableAttachment" :key="index1">
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
                                <div class="infoshow_cell_body">
                                      <div v-for="(subitem,index) in riskLevelList" :key="index">
                                          <div v-if="subitem.key==ruleForm.riskLevel">
                                            {{subitem.value}}
                                          </div>
                                      </div>
                                </div>
                            </div>
                            <div class="infoshow_cell mt20">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">评估资料</div>
                                </div>
                                <div class="infoshow_cell_body">
                                    <div class="flex mt10">
                                        <div>
                                          <!--评估资料-->
                                             {{subFile1.fileName}}
                                            <!-- <a href="#" class="info_txt">货品样品照片</a> -->
                                        </div>
                                        <div class="ml20p">{{subFile1.createTime}}</div>
                                        <div class="ml5p info_txt">
                                            <a
                                                href="#"
                                                @click.prevent="downloadFile(subFile1.attachment,subFile1.fileName)"
                                            >下载</a>
                                        </div>
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
                                     {{subFile1.remark}}
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
                <!-- <el-button
                    type="primary"
                    @click="submitForm('ruleForm4')"
                    class="primary_btn"
                >确认评估结果</el-button> -->
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
      subFile1:{},
      isMarkList: [{ key: 1, value: "是" }, { key: 2, value: "否" }],
      riskLevelList: [{ key: 1, value: "低" }, { key: 2, value: "中" }, { key: 3, value: "高" }],
      fileList1:[],
      ruleForm4: {},
      rules4: {},
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
        "wfProcessDetail.handleId": [
          { required: true, message: "请选择审核人", trigger: "change" }
        ]
      }
      // rules: {
      //   keepingId: [
      //      { required: true, message: "请选择托管机构", trigger: "change" }
      //   ],
      //   receType: [
      //      { required: true, message: "请选择质押物", trigger: "change" }
      //   ],
      //   receNo: [
      //     { required: true, message: "请输入质押物相关编号", trigger: "blur" },
      //     { max: 40, message: "名称长度不多于40个字符", trigger: "blur" }
      //   ],
      //   sellName: [
      //     { required: true, message: "请输入卖方名称", trigger: "blur" },
      //     { min: 2, max: 40, message: "名称长度不多于40个字符", trigger: "blur" }
      //   ],
      //   buyName:[
      //     { required: true, message: "请输入买方名称", trigger: "blur" },
      //     { min: 2, max: 40, message: "名称长度不多于40个字符", trigger: "blur" }
      //   ]
      // },

      // rules2: {
      //   //货物验证规则
      //   name: [
      //     { required: true, message: "请输入正确的货物名称", trigger: "blur" },
      //     { min: 2, max: 26, message: "长度在 2 到 26 个字符", trigger: "blur" }
      //   ],
      //   type:[
      //     { required: true, message: "请输入规格", trigger: "blur" },
      //     { min: 2, max: 26, message: "长度在 2 到 26 个字符", trigger: "blur" }
      //   ],
      //   category:[
      //     { required: true, message: '请选择品类', trigger: 'change' }

      //   ],
      //   isMark:[
      //      { required: true, message: '请选择标品', trigger: 'change' }
      //   ],
      //   price:[
      //        { required: true, message: '请选输入单价', trigger: 'blur' }
      //   ],
      //   unit:[
      //        { required: true, message: '请选择单位', trigger: 'change' }
      //   ],
      //   count:[
      //      { required: true, message: "请输入正确的货物名称", trigger: "blur" },
      //   ],

      // }
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
    requestPost("/api/auth/site/receivable/risk/detailShow", {
      receId: this.$route.query.receId
    }).then(response => {
      // #22
      console.log(response);
      if (response.data.code === 0) {
        // .receivableInfo
        this.ruleForm = response.data.res_data;
        this.ruleForm2.receivableCommodityList =
          response.data.res_data.receivableCommodityList;

        //评估资料


       this.ruleForm4 = response.data.res_data.wfProcessDetail;


        // this.subFile1.createTime = this.ruleForm4.createTime
        // this.subFile1.attachment = this.ruleForm4.attachment
        // this.subFile1.fileName = this.ruleForm4.flowCode
        // this.subFile1.desc = this.ruleForm4.remark




        this.subFile1.createTime = this.ruleForm4.createTime
         this.subFile1.attachment = this.ruleForm4.attachment
        // console.log(1111)
        //  console.log(this.subFile1)

         this.subFile1.fileName = this.ruleForm4.flowCode
         this.subFile1.remark = this.ruleForm4.remark

      //单一合同
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
      this.$refs[formName].validate(valid => {
        if (valid) {
        let attachmentList = this.fileList1.map((fileItem,index)=>{
              return {
                  attachment: fileItem.response.res_data.url,
                  attaName: fileItem.response.res_data.oldFileName,
              }
          })


          // let  riskData ={}
          // riskData.receId = this.ruleForm.receId
          // riskData.riskLevel = this.ruleForm4.riskLevel
          // riskData.handleExplain = this.ruleForm4.desc
          // riskData.attachment = attachmentList
        //     "receId": 27,
      	// " riskLevel ":2,
        // "handleExplain":"可以准予通过",
        // "attachment":""
        // console.log(riskData)
          // requestPost("/api/auth/site/receivable/risk",riskData)
          //   .then(response => {
          //     if (response.data.code === 0) {
          //       this.$router.push({name:'receiveRiskAssessmentList'});
          //       this.$message.success('风险评估已完成')
          //     }
          //   })
          //   .catch(error => console.log(error));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消操作
    cancel() {
      this.$router.push({ name: "receiveRiskAssessmentList" });
    },
    //文件上传
    handleRemove(file, fileList) {
        console.log(2)
        this.fileList1 = fileList
      if (fileList.length < 1) {
        this.uploadDisabled = false;
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      if (file.size <= 0) {
        alert(请上传附件);
      }
    },
    uploadSuccess(response, file, fileList) {
        // [{attachment:"",attaName:""},{attachment:"",attaName:""}]
      this.uploadDisabled = true;
      this.fileList1 = fileList
      // this.ruleForm4.attachment = file.response.res_data.url;
    //   this.ruleForm4.attaName = file.response.res_data.oldFileName;
    //  this.ruleForm4.attachList = fileList;
    //   console.log(1)
    //   console.log(fileList)

    },
    uploadError(err, file, fileList) {
      this.$message({
        showClose: true,
        message: "上传失败",
        type: "error"
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 10 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    }


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
