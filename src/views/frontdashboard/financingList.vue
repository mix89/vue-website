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
          <el-menu-item index="1" class="tab_item">仓单管理服务</el-menu-item>
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
            >
              <template slot="empty">
                <div class="no_data_pic">还没有数据哦！</div>
              </template>
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="sysWhrNo" label="系统单号" width="178">
                <template slot-scope="scope">
                  <div v-if="scope.row.status ==1 ">
                    <el-button
                      @click="toCheck(scope.row)"
                      type="text"
                      size="small"
                      class="info_txt--number"
                    >{{scope.row.sysWhrNo}}</el-button>
                  </div>
                  <div v-else-if="scope.row.status==8">
                    <el-button
                      @click="toApply(scope.row)"
                      type="text"
                      size="small"
                      class="info_txt--number"
                    >{{scope.row.sysWhrNo}}</el-button>
                  </div>
                  <div v-else>
                    <el-button
                      @click="toShow(scope.row)"
                      type="text"
                      size="small"
                      class="info_txt--number"
                    >{{scope.row.sysWhrNo}}</el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="pledgorName" label="出质方" width="110"></el-table-column>
              <el-table-column prop="keepingName" label="托管机构" width="110"></el-table-column>
              <el-table-column prop="wName" label="仓库" width="110"></el-table-column>
              <el-table-column label="仓租起止时间" width="110">
                <template slot-scope="scope">
                  <span>起 {{scope.row.startTime | formartDate('') }}</span>
                  <span>止 {{scope.row.endTime | formartDate('') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="仓单总金额(元)" width="160" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{scope.row.totalAmount | currency('') }}</template>
              </el-table-column>
              <el-table-column prop="createtime" label="制单时间" width="90">
                <template slot-scope="scope">{{scope.row.createTime | formartDateTime('') }}</template>
              </el-table-column>
              <el-table-column prop="createName" label="制单人" width="110">
                <template slot-scope="scope">
                  <div v-if="scope.row.nickName">
                    <span>{{scope.row.nickName}}</span>
                  </div>
                  <div v-else>
                    <span>{{scope.row.memberName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" width="120">
                <template slot-scope="scope">
                  <div v-for="(item,index) of statusList1" :key="index">
                    <span v-if="index == scope.row.status">{{item}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                  <div v-if="scope.row.status == '1'">
                    <div v-if="user.userRoles[0].roleCode == 'L1000'">
                      <el-button
                        @click="toCheck(scope.row)"
                        type="text"
                        size="small"
                        class="waiting_txt"
                      >审核</el-button>
                      <el-button
                        @click="toEdit(scope.row)"
                        type="text"
                        size="small"
                        class="info_txt border"
                      >编辑</el-button>
                    </div>
                    <div v-else-if="user.userRoles[0].roleCode == 'L1002'">
                      <el-button
                        @click="toCheck(scope.row)"
                        type="text"
                        size="small"
                        class="waiting_txt"
                      >审核</el-button>
                    </div>
                    <div v-else>
                      <div>
                        <div class="operation_finished">
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="scope.row.status=='8' ">
                    <div
                      v-if="user.userRoles[0].roleCode == 'L1000' || user.userRoles[0].roleCode == 'L1002'"
                    >
                      <el-button
                        @click="toApply(scope.row)"
                        type="text"
                        size="small"
                        class="info_txt"
                      >申请融资</el-button>
                    </div>
                  </div>
                  <div v-else>
                    <div>
                      <div class="operation_finished">
                        <span></span>
                      </div>
                    </div>
                  </div>
                  <!-- <el-button @click="toValueAssess(scope.row)" type="text" size="small">价值评估</el-button>
              <el-button @click="toRiskAssess(scope.row)" type="text" size="small">风险评估</el-button>
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
      user: JSON.parse(localStorage.getItem("user_front")),
      tagTime: 1,
      timeList: [{ key: 1, value: "制单时间" }],
      // { key: 2, value: "订单时间" },
      statusObj: "",
      startAmount: "",
      endAmount: "",
      status: "",
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
        "审核驳回",
        "价值待评估", //审核通过(待价值评估)
        "风险待评估", //价值评估完成(待风险评估)
        "凭证待确认", // 风险评估完成(待托管机构确认)
        "已驳回", //托管机构驳回
        "待融资", // "托管机构已确认(待申请融资)",
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
      dateTime: null,

      activeIndex: "1"
    };
  },
  created() {
    this.init();
  },

  methods: {
    toValueAssess(row) {
      // this.$router.push({name:'whreceiptBasicsManageValue',query: { whrId: row.whrId }})
      this.$router.push({
        name: "whreceiptBasicsManageValue",
        query: { whrId: row.whrId }
      });
    },
    toRiskAssess(row) {
      this.$router.push({
        name: "whreceiptBasicsManageRisk",
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
    tableCellClass() {
      return "table_cell";
    },

    handleSelect(key, keyPath) {
      // if(key=1){

      // }

      //   this.status = key;
      this.init();
    },
    resetPassword(userId) {
      requestPost("/api/auth/reset/password", { userId: userId }).then(
        response => {
          if (response.data.code === 0) {
            this.$message({
              showClose: true,
              message: "操作成功",
              type: "success"
            });
            this.init();
          }
        }
      );
    },
    deleteClick(userId, status) {
      let data = {
        userId: userId,
        status: status
      };
      requestPost("/api/auth/user/admin/operation", data).then(response => {
        if (response.data.code === 0) {
          this.$message({
            showClose: true,
            message: "操作成功",
            type: "success"
          });
          this.init();
        }
      });
    },
    toAdd() {
      this.$router.push({ path: "adminManageAdd", query: { add: "1" } });
    },
    toShow(row) {
      this.$router.push({
        path: "whreceiptBasicsManageShow",
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
    toApply(row) {
      this.$router.push({
        name: "whreceiptBasicsManageApply",
        query: { whrId: row.whrId }
      });
    },
    // toVoucher(row){
    //   this.$router.push({name:'whreceiptBasicsManageConfirmVoucher', query: {whrId: row.whrId}})
    // },
    handleClick(userId) {
      this.$router.push({ path: "adminManageEdit", query: { userId: userId } });
    },
    init() {
      this.tableData = [];
      let sysWhrNo = null;
      let pledgorName = null;
      let keepingName = null;
      let wName = null;
      let createName = null;
      let statusList = null;
      if (this.select === "1") {
        sysWhrNo = this.searchData;
      } else if (this.select === "2") {
        keepingName = this.searchData;
      } else if (this.select === "3") {
        wName = this.searchData;
      } else if (this.select === "4") {
        createName = this.searchData;
      }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        createStartTime: this.startTime,
        createEndTime: this.endTime,
        // status: this.status,
        statusList: [1, 8],
        // statusRange:this.statusRange,
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
        wName: wName,
        createName: createName
      };
      console.log(6667);
      console.log(data);
      //   console.log(new Date(this.startTime))
      //   console.log(new Date(this.endTime))
      requestPost("/api/auth/site/whreceipt/list", data).then(response => {
        if (response.data.code === 0) {
          console.log(response.data.res_data);
          this.tableData = response.data.res_data.list;
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
.el-button--small,
.el-button--small.is-round {
  padding: 0;
}
</style>
