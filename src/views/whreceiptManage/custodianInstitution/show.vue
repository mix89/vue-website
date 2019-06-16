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
                            <div class="page_head_title">查 看 仓 单</div>
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
                    <span class="reject_txt" v-if="ruleForm.status=='7'">已驳回</span>
                    <span class="info_txt" v-else-if="ruleForm.status >=8">已确认</span>
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
                                <div class="infoshow_cell_body">{{ruleForm.keepingName}}</div>
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
                            <div class="infoshow_cell mt30">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">仓库</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.wName}}</div>
                            </div>
                            <div class="infoshow_cell mt30">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">仓库联系人</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.wContact}}</div>
                            </div>
                            <div class="infoshow_cell mt30">
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
                            <div class="infoshow_cell mt30">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">仓库地址</div>
                                </div>
                                <div class="infoshow_cell_body">{{showAddress}}</div>
                            </div>
                            <div class="infoshow_cell mt30">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">仓库联系电话</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.wPhone}}</div>
                            </div>
                            <div class="infoshow_cell mt30">
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
                                            <div v-for="sub1 in item.whreceiptAttachment" >
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
               <!-- 仓单凭证确认 -->
            <div class="infoshow_box">
                <div class="infoshow_title">
                    <div class="infoshow_title_inner">仓单凭证确认</div>
                </div>
                <div class="infoshow_body">
                    <el-form :model="ruleForm4" :rules="rules4" ref="ruleForm4">
                        <div class="layout_infoshow">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">确认已经接受仓单凭证</div>
                                </div>
                                <div class="infoshow_cell_body">
                                    <span v-if="ruleForm.status=='7'">
                                        否
                                    </span>
                                    <span v-else-if="ruleForm.status >=8">
                                        是
                                    </span>

                                    <!-- <el-form-item
                                        label=""
                                        class="custom-radio"
                                        style="margin-bottom:0;"
                                        :prop="ruleForm4.confirm"

                                    >
                                        <el-radio-group v-model="ruleForm4.confirm">
                                            <el-radio label="8">是</el-radio>
                                            <el-radio label="7">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item> -->
                                </div>
                            </div>
                            <div class="infoshow_cell mt20">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">
                                      附件信息
                                    </div>
                                </div>
                                <div class="infoshow_cell_body">
                                    <div class="flex mt10">
                                        <div>
                                          {{subFile1.fileName}}
                                             <!--<a href="#" class="info_txt" @click="downloadFile(subFile1.attachment,subFile1.fileName)">{{subFile1.fileName}}</a>-->
                                        </div>
                                        <div class="ml20p">{{subFile1.createTime}}</div>
                                        <div class="ml5p info_txt" v-if="subFile1.attachment">
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
                                <div
                                    class="showflow_state"
                                    v-if="item.flowDescription"
                                >{{item.flowDescription}}</div>
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
                <!-- <el-button type="primary" @click="submitForm('ruleForm')" class="primary_btn">新增</el-button> -->
                <el-button @click="cancel" class="cancel_btn" style="margin-left:0">返回</el-button>
            </div>
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
      subFile1:{},
      isMarkList: [{ key: 1, value: "是" }, { key: 2, value: "否" }],
      riskLevelList: [{ key: 1, value: "低" }, { key: 2, value: "中" }, { key: 3, value: "高" }],
      ruleForm4: {

      },
      rules4:{},

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
      },
      ruleForm3: {
        // checkPeople: "",
        wfProcessDetail: {
          handleId: ""
        }
      }
    };
  },
  // #3
  created() {
    let user = JSON.parse(localStorage.getItem("user_front"));
    this.pledgorName = user.customerName;
    this.ruleForm.pledgorId = user.customerId;
    //拉取仓单信息和货物信息
    // /api/auth/site/whreceipt/value/detailShow
    // /api/auth/site/whreceipt/show
    requestPost("/api/auth/site/whreceipt/storage/detailShow", {
      whrId: this.$route.query.whrId
    }).then(response => {
      // #22



      if (response.data.code === 0) {
        this.ruleForm = response.data.res_data.whreceiptInfo;
        console.log(222);
        console.log(this.ruleForm)
        this.ruleForm2.whreceiptCommodityList =
          response.data.res_data.whreceiptCommodityList;

        console.log(1111111111)
        console.log(this.ruleForm2.whreceiptCommodityList)
        this.ruleForm4 = response.data.res_data.wfProcessDetail;
        if(this.ruleForm4.attachment){
          this.subFile1.createTime = this.ruleForm4.createTime
          this.subFile1.attachment = this.ruleForm4.attachment
          this.subFile1.fileName = this.ruleForm4.flowCode
        }
        this.subFile1.remark = this.ruleForm4.remark

        // this.ruleForm2.whreceiptCommodityList[0].whreceiptAttachment[0].attachment =

        // this.fileList1
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
  },
  // #4
  methods: {


    //取消操作
    cancel() {
      this.$router.push({ name: "custodianInstitutionList" });
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
</style>
