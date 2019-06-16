<template>
  <div>
    <div class="">
      <div class="page_title_main">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="5" class="tab_item">仓单管理服务</el-menu-item>
          <!-- <el-menu-item index="1" class="tab_item">待处理</el-menu-item>
          <el-menu-item index="4" class="tab_item">处理完成</el-menu-item>
          <el-menu-item index="7" class="tab_item">已驳回</el-menu-item>-->
        </el-menu>
        <div class="page_main_cont">
          <!-- 表格展示内容 -->
          <div style="margin-top:10px;">
         <!-- 表格展示内容 -->
          <el-table
            :data="tableData"
            :row-class-name="tableRowClassName"
            :header-row-class-name="customTableheader"
            :highlight-current-row="true"
            :cell-class-name="tableCellClass"
            :cell-style="tableCellStyle"
          >
           <template slot="empty">
                <div class="no_data_pic">还没有数据哦！</div>
           </template>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="sysWhrNo" label="系统单号" width="178">
              <template slot-scope="scope">
                <div v-if="scope.row.status >= '6'">
                  <el-button
                    @click="toShow(scope.row)"
                    type="text"
                    size="small"
                    class="info_txt--number"
                  >{{scope.row.sysWhrNo}}</el-button>
                </div>
                <div v-else-if="scope.row.status < '6'">
                  <el-button
                    @click="toRiskAssess(scope.row)"
                    type="text"
                    size="small"
                    class="info_txt--number"
                  >{{scope.row.sysWhrNo}}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pledgorName" label="出质方" width="198"></el-table-column>
            <!-- <el-table-column prop="keepingName" label="托管机构" width="110"></el-table-column> -->
            <el-table-column prop="wName" label="仓库" width="110"></el-table-column>
            <el-table-column label="仓租起止时间" width="110">
              <template slot-scope="scope">
                <span>起 {{scope.row.startTime | formartDate('') }}</span>
                <span>止 {{scope.row.endTime | formartDate('') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="仓单总金额(元)" width="162">
              <template slot-scope="scope">{{scope.row.totalAmount | currency('') }}</template>
            </el-table-column>
            <el-table-column prop="createtime" label="评估申请时间" width="110">
              <template slot-scope="scope">{{scope.row.processDetailCreateTime}}</template>
            </el-table-column>
            <el-table-column prop="createName" label="评估申请人" width="110">
              <template slot-scope="scope">{{scope.row.processDetailCreateNickName}}</template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="110">
              <template slot-scope="scope">
                <div v-for="(item,index) of statusList1" :key="index">
                  <span v-if="scope.row.status > 5">
                    <span v-if="index == scope.row.status">已评估</span>
                  </span>
                  <span v-else-if="index == scope.row.status">待评估</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.status == '5'">
                  <el-button @click="toRiskAssess(scope.row)" type="text" size="small" class="info_txt">去评估</el-button>
                </div>
                <div v-else-if="scope.row.status >='5'">
                  <div>
                    <div class="operation_finished">
                      <span></span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.row.status == '1'">
                  <!-- <el-button @click="toCheck(scope.row)" type="text" size="small">审核</el-button> -->
                </div>
                <div v-if="scope.row.status=='4'"></div>
                <!-- <el-button @click="toEdit(scope.row)" type="text" size="small">编辑</el-button>
             <el-button @click="toValueAssess(scope.row)" type="text" size="small">价值评估</el-button>
              <el-button @click="toRiskAssess(scope.row)" type="text" size="small">去评估</el-button>
                <el-button @click="toVoucher(scope.row)" type="text" size="small">确认凭证</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
// import financingTable from '@/components/whreceiptManage/financingTable'
import moment from "moment";
import { formartDate, formartDateTime, area } from "@/utils/filters";
import { requestPost } from "@/api/parent";
import { currency } from "@/utils/index";

export default {
  components: {
    // financingTable
  },
  data() {
    return {
      activeIndex:"5",
      tagTime: 1,
      timeList: [{ key: 2, value: "订单时间" }, { key: 1, value: "制单时间" }],

      statusObj: "",
      startAmount: "",
      endAmount: "",
      status: "5",
      statusList:null,
      statusRange:null,
      optionList: [
        { key: "", value: "全部" },
        { key: 1, value: "待审核" },
        { key: 4, value: "待价值评估" },
        { key: 5, value: "待风险评估" },
        { key: 6, value: "凭证待确认" },
        { key: 9, value: "已确认" },
        { key: 10, value: "审核驳回" },
        { key: 7, value: "凭证驳回" }
      ],
      statusList1: [
        "作废",
        "待审核",
        "审核中",
        "审核拒绝",
        "价值待评估",   //审核通过(待价值评估)
        "风险待评估",  //价值评估完成(待风险评估)
        "待凭证确认", // 风险评估完成(待托管机构确认)
        "已驳回", //托管机构驳回
        "待融资",  // "托管机构已确认(待申请融资)",
        "平台待确认", //已申请融资(待平台确认)
        "平台已驳回",
        "融资中", //融资中(未到期)
        "融资失败",
        "已解质押"
      ],
      total: 0,
      pageNum: 1,
      pageSize: 10,

      startTime: null,
      endTime: null,
      searchData: "",
      select: "1",

      phone: null,
      permissionNames: "",
      operation: "",
      tableData: [],
      dateTime: null
    };
  },
  created() {
    this.init();
  },

methods: {
    toRiskAssess(row) {
      this.$router.push({
        name: "riskAssessmentAssess",
        query: { whrId: row.whrId }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    customTableheader() {
      return "thead";
    },
    tableCellClass(obj) {
      if(obj.columnIndex==6){
        return "table_cell_time"
        }else{
          return "table_cell";
        }
    },
    tableCellStyle() {},
    handleSelect(key) {
      //   if (key < 10) {
      //   this.statusList = null;
      //   this.statusRange = null;
      //   this.status = null;
      //   this.status = 5;
      //   // #66
      // } else if (key == "20") {
      //   this.statusList = null;
      //   this.statusRange = null;
      //   this.status = null;
      //   this.statusRange = '5';
      // }
      if(key==5){
          this.status = key
      }

      this.init();
    },

    deleteClick(userId, status) {
      let data = {
        userId: userId,
        status: status
      };
    },
    toAdd() {
      this.$router.push({ path: "adminManageAdd", query: { add: "1" } });
    },
    toShow(row) {
      this.$router.push({
        path: "riskAssessmentShow",
        query: { whrId: row.whrId }
      });
    },
    toEdit(row) {
      this.$router.push({
        name: "whreceiptBasicsManageEdit",
        query: { whrId: row.whrId }
      });
    },
    toCheck(row) {
      this.$router.push({
        name: "whreceiptBasicsManageCheck",
        query: { whrId: row.whrId }
      });
    },
    toVoucher(row) {
      this.$router.push({
        name: "whreceiptBasicsManageConfirmVoucher",
        query: { whrId: row.whrId }
      });
    },
    handleClick(userId) {
      this.$router.push({ path: "adminManageEdit", query: { userId: userId } });
    },
    search() {
      this.init();
    },
    init() {
      this.tableData = [];
      let sysWhrNo = null;
      let pledgorName = null;
      let keepingName = null;
      let wName = null;
      let createName = null;
      let processDetailCreateNickName = null;
      let statusList =null


      if (this.select === "1") {
        sysWhrNo = this.searchData;
      } else if (this.select === "2") {
        pledgorName = this.searchData;
      } else if (this.select === "3") {
        keepingName = this.searchData;
      } else if (this.select === "4") {
        createName = this.searchData;
      }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        processDetailCreateStartTime: this.startTime,
        processDetailCreateEndTime: this.endTime,
        statusList:this.statusList,
        statusRange:this.statusRange,
        status: this.status,

        startTotalAmount:
          Number(this.startAmount) == null || Number(this.startAmount) == 0
            ? null
            : area(Number(this.startAmount)),
        endTotalAmount:
          Number(this.endAmount) == null || Number(this.endAmount) == 0
            ? null
            : area(Number(this.endAmount)),

        sysWhrNo: sysWhrNo,
        pledgorName: pledgorName,
        keepingName: keepingName,
        processDetailCreateNickName: createName
      };

      console.log(111);
      console.log(data);
      requestPost("/api/auth/site/whreceipt/risk/list", data).then(response => {
        if (response.data.code === 0) {
          console.log(response.data.res_data);
          this.tableData = response.data.res_data.list.splice(0,4);
          this.total = response.data.res_data.total;
        }
      });
    },

    onSubmit(formName) {
      this.init();
    }
  },

  watch: {
    dateTime(dateTime) {
      if (dateTime != null && dateTime.length > 1) {
        this.endTime = formartDate(dateTime[1]) + " 23:59:59";
        this.startTime = formartDate(dateTime[0]) + " 00:00:00";
      } else {
        this.startTime = null;
        this.endTime = null;
      }
    },
    select(select) {
      this.searchData = null;
    },
    statusObj(status) {
      this.status = status;
    }
  }
};
</script>

<style scoped>
.search_box {
  margin: 10px 5px -10px;
}
.page_title_main {
  margin-top: 0;
  border-top: 0;
  padding-bottom: 15px;
  min-height: 450px;
}
</style>
