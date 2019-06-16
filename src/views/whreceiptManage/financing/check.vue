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
                            <div class="page_head_title">审 核 仓 单</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 页面内容 -->
        <div class="page_container">
            <div class="order_number_show mt10">
                <div class="fix">
                    系统单号：{{ruleForm.sysWhrNo}}
                  <el-button type="text" onclick="history.go(-1)" style="float: right;margin-right: 10px">&lt;返回</el-button>
                  <span class="waiting_txt" style="float: right;margin-right: 140px">待审核</span>
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
                                <div class="infoshow_cell_body">{{ruleForm.keepingName}}
                                     <el-tooltip placement="bottom-end" style="position:absolute;right:53px;top:-2px">
            <div slot="content">请将仓单提货凭证寄送至指定托管机构，<br/>如不寄送将无法进行融资服务！</div>
             <el-button><span class="tips_ask">?</span></el-button>
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
                <!-- 仓库信息 -->
                <div class="infoshow_box">
                    <div class="infoshow_title">
                        <div class="infoshow_title_inner">仓单信息</div>
                    </div>
                    <div class="infoshow_body">
                        <div class="layout_infoshow">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">仓单号</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.whrNo}}</div>
                            </div>
                            <div class="infoshow_cell" style="margin-top:30px;">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">仓库</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.wName}}</div>
                            </div>
                            <div class="infoshow_cell" style="margin-top:20px;">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">仓库联系人</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.wContact}}</div>
                            </div>
                            <div class="infoshow_cell">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">仓租起止时间</div>
                                </div>
                                <div
                                    class="infoshow_cell_body"
                                >{{ruleForm.startTime | formartDate('')}} - {{ruleForm.endTime | formartDate('')}}</div>
                            </div>
                        </div>
                        <div class="layout_infoshow border">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">仓单总金额</div>
                                </div>
                                <div class="infoshow_cell_body">
                                    {{ruleForm.totalAmount | currency("")}}（元）
                                    <span
                                        class="info_tips"
                                    >(备注：仓单总金额 = 货物总价之和)</span>
                                </div>
                            </div>
                            <div class="infoshow_cell">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">仓库地址</div>
                                </div>
                                <div class="infoshow_cell_body">{{showAddress}}</div>
                            </div>
                            <div class="infoshow_cell">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">仓库联系电话</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.wPhone}}</div>
                            </div>
                            <div class="infoshow_cell">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">存储天数</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.storageDay}}</div>
                            </div>
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
                            v-for="(item,index) in ruleForm2.whreceiptCommodityList"
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
                                    <div class="infoshow_cell_body">{{item.isMark}}</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">单价</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.price | currency("")}}（元）</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">附件信息</div>
                                    </div>
                                    <div class="infoshow_cell_body minh60">
                                      <div style="margin-top:-12px;">
                                            <div v-for="(sub1,index1) in item.whreceiptAttachment" :key="index1">
                                                      <div class="flex mt10">
                                                <div>
                                                    货品样品信息
                                                    <!-- {{sub1.fileName}} -->
                                                    <!-- <a href="#" class="info_txt">  货品样品信息</a> -->
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
            <!-- 上传审核资料 -->
            <!-- <div class="infoshow_box">
                <div class="infoshow_title">
                    <div class="infoshow_title_inner">审核信息</div>
                </div>
                <div class="infoshow_body">
                    <el-form :model="ruleForm5" :rules="rules5" ref="ruleForm4">
                        <div class="layout_infoshow">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">审核资料</div>
                                </div>
                                <div class="infoshow_cell_body">
                                    <el-form-item label="" style="margin-top:-12px">
                                        <el-upload
                                            class="upload-demo"
                                            :action="uploadUrl"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :on-success="uploadSuccess"
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
                                        </el-upload>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div> -->
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
                                <div
                                    class="showflow_state"
                                    v-if="item.flowDescription"
                                >{{item.flowDescription}}</div>
                            </div>
                            <div
                                :class="{'warining':item.status == 3 , 'showflow_box':true}"
                                v-else-if="item.status == 1"
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
            <!-- step dialogue1 步骤弹框-->
            <el-dialog
                title="通过"
                :visible.sync="dialogFormVisible"
                :class="{check_dialogue:stepActiveState===1,middle_dialogue:stepActiveState===2}"
            >
                <div>
                    <div class="step_title" v-if="showComplete" style="margin-left:90px;">
                        <!-- <div
                            class="step_title_inner no_line processed"
                            :class="{step_active:stepActiveState===0}"
                        >
                            <div class="step_inner_text">确认质押协议</div>
                        </div> -->
                        <div class="step_title_inner no_line processed" :class="{step_active:stepActiveState===1}">
                            <div class="step_inner_text">选择评估机构</div>
                        </div>
                        <div class="step_title_inner">
                            <div class="step_inner_text">审核完成</div>
                        </div>
                    </div>
                    <!-- 第一步 -->
                    <!-- <div v-show="stepState==='first'">
                        <div>
                            <div class="pledge_agreebox">
                                <div class="pledge_agreebox_title">质押协议</div>
                                <div class="pledge_agreebox_body">内容123112312232131312312323123</div>
                            </div>
                            <div
                                class="pledge_agreebox_tips"
                            >审核通过后，将与托管机构签订托管协议，请详细阅读质押协议！该电子协议与纸质协议具有同等效力！</div>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <div class="submit_buttons" style="margin-top:20px;">
                                <el-button
                                    type="primary"
                                    @click="next()"
                                    class="primary_btn"
                                    style="width:170px;"
                                >同意协议</el-button>
                                <el-button
                                    @click="dialogFormVisible = false"
                                    class="cancel_btn"
                                    style="margin-left:160px;width:170px;"
                                >取 消</el-button>
                            </div>
                        </div>
                    </div> -->
                    <!-- 第二步 -->
                    <div v-show="stepState==='second'">
                        <el-form :model="ruleForm3" ref="ruleForm3" :rules="rules3">
                            <div class="change_password_inner">
                                <div class="search_box inner_assess" style="margin-left:50px">
                                    <el-form-item
                                        label="价值评估"
                                        class="select-item mt10"
                                        prop="evalue"
                                    >
                                        <div class="box_required">
                                            <el-select
                                                v-model="ruleForm3.evalue"
                                                size="small"
                                                placeholder="请选择"
                                            >
                                                <el-option
                                                    v-for="item in EvalueList"
                                                    :key="item.customerId"
                                                    :label="item.customerName"
                                                    :value="item.customerId"
                                                ></el-option>
                                            </el-select>
                                        </div>
                                    </el-form-item>
                                    <el-form-item
                                        label="风险评估"
                                        class="select-item mt20"
                                        prop="riskEvalue"
                                    >
                                        <div class="box_required">
                                            <el-select
                                                v-model="ruleForm3.riskEvalue"
                                                size="small"
                                                placeholder="请选择"
                                            >
                                                <el-option
                                                    v-for="item in riskEvalueList"
                                                    :key="item.customerId"
                                                    :label="item.customerName"
                                                    :value="item.customerId"
                                                ></el-option>
                                            </el-select>
                                        </div>
                                    </el-form-item>
                                </div>
                            </div>
                            <el-form-item class="submit_buttons" style="margin-top:40px;">
                                <el-button
                                    type="primary"
                                    @click="next2('ruleForm3')"
                                    class="primary_btn"
                                    style="width:140px;"
                                >确认</el-button>
                                <el-button
                                    @click="cancel2"
                                    class="cancel_btn"
                                    style="margin-left:50px;width:140px;"
                                >取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!-- 第三步 -->
                    <div v-show="stepState==='third'">
                        <div class="check_through">
                            <div class="check_through_title">审核通过！</div>
                            <div class="check_through_body">
                                <p class="mt30">请尽快将仓单凭证移交至对应托管机构</p>
                                <p class="mt10">否则可能导致无法融资！</p>
                            </div>
                            <div class="" style="text-align:center;margin-top:50px;">
                                <el-button
                                    type="primary"
                                    @click="next3"
                                    class="primary_btn"
                                    style="width:150px;"
                                >确认</el-button>
                                <!-- <el-button
                                    @click="cancel3"
                                    class="cancel_btn"
                                    style="width:150px;margin-left:80px;"
                                >返回</el-button>-->
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <!-- 驳回理由 -->
            <el-dialog
                title="驳回理由"
                :visible.sync="dialogRefuseReason"
                class="check_dialogue_middle"
            >
                <div>
                    <el-form :model="ruleForm4" :rules="rules4" ref="ruleForm4">
                        <el-form-item label="" prop="desc">
                            <el-input type="textarea" v-model="ruleForm4.desc"></el-input>
                        </el-form-item>
                        <div class="" style="text-align:center;margin-top:50px;">
                            <el-button
                                type="primary"
                                @click="finalRefuse('ruleForm4')"
                                class="primary_btn"
                                style="width:150px;"
                            >确认驳回</el-button>
                            <el-button
                                @click="finalRefuseCancel"
                                class="cancel_btn"
                                style="width:150px;margin-left:80px;"
                            >取消</el-button>
                        </div>
                    </el-form>
                </div>
            </el-dialog>
            <el-form>
                <el-form-item class="submit_buttons" style="background:#fff;">
                    <el-button type="primary" @click="submitForm()" class="primary_btn">通过</el-button>
                    <el-button @click="refuse()" class="cancel_btn" style="margin-left:170px">驳回</el-button>
                </el-form-item>
            </el-form>
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
import { requestPost,downloadFile} from "@/api/parent";
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
      // 上传
      uploadUrl: uploadUrl,
      ruleForm5:{},
      rules5:{},
      //驳回理由
      dialogRefuseReason: false,
      ruleForm4: {
        desc: ""
      },
      rules4: {
        desc: { required: true, message: "请填写驳回理由", trigger: "blur" }
      },
      //价值评估列表
      EvalueList: null,
      riskEvalueList: null,
      ruleForm3: {
        evalue: "",
        riskEvalue: ""
      },
      rules3: {
        evalue: [
          { required: true, message: "请选择价值评估人", trigger: "change" }
        ],
        riskEvalue: [
          { required: true, message: "请选择风险评估人", trigger: "change" }
        ]
      },

      // 步骤弹框
      dialogFormVisible: false, //弹框是否弹出
      stepActiveState: 1,
      titleActive: 1,
      stepState: "second",
      showComplete: true,
      //流程
      check: {},

      //表单1内容
      ruleForm: {
        dateTime: null,
        keepingId: "",
        pledgorId: "",
        whrNo: "",
        wName: "",
        wContact: "",
        startTime: "",
        endTime: "",
        storageDay: null,
        totalAmount: null,
        wPhone: "",
        //审核人
        wfProcessDetail: {
          handleId: null
        },
        // 地址
        provinceId: "",
        cityId: "",
        areaId: "",
        wAddress: ""
      },
      //表单2内容
      ruleForm2: {
        whreceiptCommodityList: [
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
            whreceiptAttachment: {
              attachment: "测试附件地址",
              attaName: ""
            }
          }
        ]
      }
    };
  },
  // #3
  created() {
    let user = JSON.parse(localStorage.getItem("user_front"));
    this.pledgorName = user.customerName;
    this.ruleForm.pledgorId = user.customerId;
    //拉取仓单信息和货物信息
    requestPost("/api/auth/site/whreceipt/show", {
      whrId: this.$route.query.whrId
    }).then(response => {
      if (response.data.code === 0) {
        this.ruleForm = response.data.res_data.whreceiptInfo;
        this.ruleForm2.whreceiptCommodityList =
          response.data.res_data.whreceiptCommodityList;
      }
    });
    //流程
    requestPost("/api/auth/site/whreceipt/wfDetail", {
      whrId: this.$route.query.whrId
    }).then(response => {
      if (response.data.code === 0) {
        this.check.list = response.data.res_data.list;
      }
    });

    //价值评估机构、风险评估机构列表
    //  1:融资方(出质方) 2:第三方保管机构  3:第三方价值评估机构  4:第三方风险评估机构
    requestPost("/api/auth/site/customer/list", { customerType: 3 }).then(
      response => {
        if (response.data.code === 0) {
          // console.log(response.data.res_data)
          this.EvalueList = response.data.res_data.list;
        }
      }
    );
    requestPost("/api/auth/site/customer/list", { customerType: 4 }).then(
      response => {
        if (response.data.code === 0) {
          this.riskEvalueList = response.data.res_data.list;
        }
      }
    );
  },
  // #4
  methods: {
    //上传
     handleRemove(file, fileList) {
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
      this.uploadDisabled = true;
      this.ruleForm5.url = file.response.res_data.url;
      this.ruleForm5.filename = file.response.res_data.oldFileName;
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
    },
    //驳回
    finalRefuse(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let Checkdata = {};
          Checkdata.whrId = this.ruleForm.whrId;
          Checkdata.examineOpinion = null;
          Checkdata.institutionId = this.ruleForm3.evalue;
          Checkdata.institutionRiskId = this.ruleForm3.riskEvalue;
          Checkdata.attachment = this.ruleForm5.url;
          Checkdata.attaName = this.ruleForm5.filename;
          Checkdata.examineResult = 3;
          requestPost("/api/auth/site/whreceipt/examine", Checkdata)
            .then(response => {
              console.log(response);
              if (response.data.code === 0) {
                window.history.go(-1)
              }else if(response.data.code === 10007){
                  this.$message.error("你没有审核权限")
              }else if(response.data.code === 10009){
                this.$message.warning(response.data.msg)
                window.history.go(-1)
              }else {
                this.$message.warning(response.data.msg)
                window.history.go(-1)
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("提交错误");
          return false;
        }
      });
    },
    finalRefuseCancel() {
      this.dialogRefuseReason = false;
    },
    refuse() {
      this.dialogRefuseReason = true;
    },
    //步骤弹框
    next() {
      this.stepState = "second";
      this.stepActiveState = 1;
    },

    next2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let Checkdata = {};
          Checkdata.whrId = this.ruleForm.whrId;
          Checkdata.examineOpinion = null;
          Checkdata.institutionId = this.ruleForm3.evalue;
          Checkdata.institutionRiskId = this.ruleForm3.riskEvalue;
          Checkdata.attachment = this.ruleForm5.url;
          Checkdata.attaName = this.ruleForm5.filename;
          Checkdata.examineResult = 2;
          requestPost("/api/auth/site/whreceipt/examine", Checkdata)
            .then(response => {
              console.log(response);
              if (response.data.code === 0) {
                this.showComplete = false;
                this.stepState = "third";
                this.stepActiveState = 2;
              }else if(response.data.code === 10009){
                this.$message.warning(response.data.msg)
                window.history.go(-1)
              }else {
                this.$message.warning(response.data.msg)
                window.history.go(-1)
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel2() {
      this.dialogFormVisible = false;
    },
    next3() {
      // this.$router.push({ name: "whreceiptBasicsManageList" });
      window.history.go(-1)
    },
    cancel3() {},
    //提交
    submitForm() {
      this.dialogFormVisible = true;
    },
    //取消操作
    cancel() {
      // this.$router.push({ name: "whreceiptBasicsManageList" });
      window.history.go(-1)
    },
    //文件下载
    downloadFile:downloadFile
  },
  // #5
  watch: {},
  // #6
  computed: {
    //地址
    showAddress() {
      let addresDitail = "";
      let address = JSON.parse(localStorage.getItem("address_front"));

      address.forEach(addres => {
        // console.log(this.ruleForm.provinceId)
        if (addres.id === this.ruleForm.provinceId) {
          addresDitail += " " + addres.name;
        }
        addres.childrens.forEach(addres2 => {
          if (addres2.id === this.ruleForm.cityId) {
            addresDitail += " " + addres2.name;
          }
          addres2.childrens.forEach(addres3 => {
            if (addres3.id === this.ruleForm.areaId) {
              addresDitail += " " + addres3.name;
            }
          });
        });
      });
      return (addresDitail += " " + this.ruleForm.wAddress);
    }
  }
};
</script>

<style scoped>
.inner_assess .el-form-item__error {
  left: 97px;
}
.el-button{
  padding: 0;
  border: 0;
  /* position: absolute;
   right: 53px;
top: -2px; */
}

</style>
