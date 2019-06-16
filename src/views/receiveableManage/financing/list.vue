<template>
  <div>
    <PageHead/>
    <div class="page_container">
      <div class="page_title_main">
        <el-menu :default-active="''" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index class="tab_item">全部</el-menu-item>
          <el-menu-item index="10" class="tab_item">待处理</el-menu-item>
          <el-menu-item index="4" class="tab_item">处理中</el-menu-item>
          <el-menu-item index="11" class="tab_item">已驳回</el-menu-item>
        </el-menu>
        <div class="page_main_cont">
          <!-- 顶部搜索框 -->
          <el-form>
            <div class="fix">
              <div style="float:right;margin-right:10px;">
                <div class="search_box">
                  <el-form-item class="button-item">
                    <router-link
                      :to="{name:'receiveableManageAdd'}"
                      v-if="user.userRoles[0].roleCode == 'L1001' || user.userRoles[0].roleCode == 'L1000' "
                    >
                      <el-button type="primary" icon="el-icon-add" class="primary_btn">
                        <i class="el-icon-plus"></i>
                        新增
                      </el-button>
                    </router-link>
                  </el-form-item>
                  <el-form-item label="质押物价值" class="money-item">
                    <div class="money-box">
                      <el-input v-model="startAmount" placeholder="请输入金额"></el-input>
                    </div>
                    <span>-</span>
                    <div class="money-box">
                      <el-input v-model="endAmount" placeholder="请输入金额"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="状态" class="select-item w150">
                    <div>
                      <el-select v-model="statusObj" size="small" placeholder="请选择">
                        <el-option
                          v-for="item in optionList"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"
                        ></el-option>
                      </el-select>
                    </div>
                  </el-form-item>
                  <el-form-item label="制单时间" class="datepicker-item4">
                    <div class="datepicker-box">
                      <el-date-picker
                        v-model="dateTime"
                        type="daterange"
                        size="small"
                        placeholder="选择日期时间"
                        range-seperator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy.MM.dd"
                        :unlink-panels="true"
                      ></el-date-picker>
                    </div>
                  </el-form-item>
                  <!-- <el-form-item label="" class="prepend-datepicker-item">
              <div class="prepend-box">
                <el-select v-model="tagTime" slot="prepend">
                  <el-option
                    v-for="item in timeList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </div>
              <div class="datepicker-box">
                <el-date-picker
                  v-model="dateTime"
                  type="daterange"
                  size="small"
                  placeholder="选择日期时间"
                  range-seperator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy.MM.dd"
                ></el-date-picker>
              </div>
                  </el-form-item>-->
                  <el-form-item label="" class="searchbox-item">
                    <el-input placeholder="请输入关键字" v-model="searchData">
                      <el-select v-model="select" slot="prepend" class="prepend">
                        <el-option label="系统单号" value="1"></el-option>
                        <el-option label="托管机构" value="2"></el-option>
                        <el-option label="买方全称" value="3"></el-option>
                        <el-option label="制单人" value="4"></el-option>
                      </el-select>
                    </el-input>
                  </el-form-item>
                  <el-form-item class="button-item" style="margin-left:5px">
                    <el-button
                      icon="el-icon-search "
                      class="search_btn"
                      type="warning"
                      size="small"
                      @click="init"
                    >搜索</el-button>
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
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
            <el-table-column prop="sysReceNo" label="系统单号" width="178">
              <template slot-scope="scope">
                <el-button
                  @click="toShow(scope.row)"
                  type="text"
                  size="small"
                  class="info_txt--number"
                >{{scope.row.sysReceNo}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="pledgorName" label="出质方" width="110"></el-table-column>
            <el-table-column prop="keepingName" label="托管机构" width="110"></el-table-column>
            <el-table-column prop="buyName" label="买方全称" width="110"></el-table-column>
            <el-table-column label="签订时间" width="110">
              <template slot-scope="scope">
                <span>{{scope.row.startTime | formartDate('') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="质押物价值(元)" width="160" :show-overflow-tooltip="true">
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
                  <span>{{scope.row.createName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="120">
              <template slot-scope="scope">
                <!-- {{scope.row.status}} -->
                <div v-for="(item,index) in statusList1" :key="index">
                  <span v-if="item.key == scope.row.status">{{item.value}}</span>
                </div>
              </template>
            </el-table-column>
                <!-- L1000	企业管理人员
            L1001	企业信息录入员
            L1002	企业信息审核员-->
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
        <div class="fix">
          <div style="float:right;margin-right:0px;margin-top:-10px;">
            <pagination
              :total="total"
              :pageNum.sync="pageNum"
              :pageSize.sync="pageSize"
              @pagination="init"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>








<script>
import { formartDate, formartDateTime } from "@/utils/filters";
import moment from "moment";
import { requestPost } from "@/api/parent";
import { currency } from "@/utils/index";
import Pagination from "@/components/Pagination";
import PageHead from "@/views/layout/components/PageHead";
import { area } from "../../../utils/filters";
export default {
  components: {
    Pagination,
    PageHead
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
        { key: "0", value: "作废" },
        { key: "1", value: "待审核" },
        { key: "2", value: "审核中" },
        { key: "3", value: "审核驳回" },
        { key: "4", value: "风险待评估" },
        { key: "6", value: "凭证待确认" },
        { key: "7", value: "已驳回" },
        { key: "8", value: "待融资" },
        { key: "0", value: "作废" },
        { key: "9", value: "平台待确认" },
        { key: "10", value: "平台已驳回" },
        { key: "11", value: "融资中" },  //(待认购)
        { key: "12", value: "融资成功" }, //(未到期)
        { key: "13", value: "融资失败" },
        { key: "14", value: "已解质押" }

        //   "作废",  //0
        //   "待审核",//1
        //   "审核中",  //2
        //   "审核驳回", //3
        //  // "价值待评估",   //审核通过(待价值评估)
        //   "风险待评估",  //价值评估完成(待风险评估)  4
        //   "凭证待确认", // 风险评估完成(待托管机构确认) 6
        //   "已驳回", //托管机构驳回  7
        //   "待融资",  // "托管机构已确认(待申请融资)",   8
        //   "平台待确认", //已申请融资(待平台确认)  9
        //   "平台已驳回",   //10
        //   "融资中", //融资中(未到期)  //11
        //   "融资失败", //12
        //   "已解质押"  //13
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
    // toValueAssess(row){
    //   // this.$router.push({name:'whreceiptBasicsManageValue',query: { whrId: row.whrId }})
    //   this.$router.push({name:'whreceiptBasicsManageValue',query: { receId: row.receId }})
    // },
    // toRiskAssess(row){
    //   this.$router.push({name:'whreceiptBasicsManageRisk',query: { whrId: row.whrId }})
    // },
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

    handleSelect(key) {
      if (key < 10) {
        this.statusList = null;
        this.statusRange = null;
        this.status = null;
        this.status = key;
        // #66
      } else if (key == "10") {
        //待处理
        this.statusList = null;
        this.statusRange = null;
        this.status = null;
        this.statusList = [1, 8];
      } else if (key == "11") {
        this.statusList = null;
        this.statusRange = null;
        this.status = null;
        this.statusList = [3, 7, 10];
      }

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
    //  toAdd() {
    //   this.$router.push({ path: "adminManageAdd", query: { add: "1" } });
    // },
    toShow(row) {
      this.$router.push({
        path: "receiveableManageShow",
        query: { receId: row.receId }
      });
    },
    toEdit(row) {
      this.$router.push({
        name: "receiveableManageEdit",
        query: { receId: row.receId }
      });
    },
    toCheck(row) {
      this.$router.push({
        name: "receiveableManageCheck",
        query: { receId: row.receId }
      });
    },
    toApply(row) {
      this.$router.push({
        name: "receiveableManageApply",
        query: { receId: row.receId }
      });
    },
    // toVoucher(row){
    //   this.$router.push({name:'whreceiptBasicsManageConfirmVoucher', query: {receId: row.receId}})
    // },
    handleClick(userId) {
      this.$router.push({ path: "adminManageEdit", query: { userId: userId } });
    },
    init() {
      this.tableData = [];
      let sysReceNo = null;
      let pledgorName = null;
      let keepingName = null;
      let buyName = null;
      let createName = null;
      let statusList = null;
      let statusRange = null;
      if (this.select === "1") {
        sysReceNo = this.searchData;
      } else if (this.select === "2") {
        keepingName = this.searchData;
      } else if (this.select === "3") {
        buyName = this.searchData;
      } else if (this.select === "4") {
        createName = this.searchData;
      }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        createStartTime: this.startTime,
        createEndTime: this.endTime,
        statusList: this.statusList,
        statusRange: this.statusRange,
        status: this.status,
        startTotalAmount:
          Number(this.startAmount) == null || Number(this.startAmount) == 0
            ? null
            : area(Number(this.startAmount)),
        endTotalAmount:
          Number(this.endAmount) == null || Number(this.endAmount) == 0
            ? null
            : area(Number(this.endAmount)),

        sysReceNo: sysReceNo,
        pledgorName: pledgorName,
        keepingName: keepingName,
        buyName: buyName,
        createName: createName
      };
      console.log(111);
      console.log(data);
      requestPost("/api/auth/site/receivable/list", data).then(response => {
        if (response.data.code === 0) {
          console.log(222);
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
.el-button--small,
.el-button--small.is-round {
  padding: 0;
}
</style>
