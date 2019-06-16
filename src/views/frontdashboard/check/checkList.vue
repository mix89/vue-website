<template>
    <div>
        <div class="">
            <div class="page_title_main" style="padding-top:12px;">
                <div class="inner_tabs_menu">
                    <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                    >
                        <el-menu-item index="1" class="tab_item">待审核</el-menu-item>
                        <el-menu-item index="2" class="tab_item">评估中</el-menu-item>
                        <el-menu-item index="3" class="tab_item">待申请融资</el-menu-item>
                    </el-menu>
                </div>
                <div class="page_main_cont no_td_border" style="border:none;">
                    <div style="margin-top:8px;height:268px;">
                        <!-- 表格展示内容 -->
                        <el-table
                            :data="tableData"
                            :row-class-name="tableRowClassName"
                            :header-row-class-name="customTableheader"
                            :highlight-current-row="true"
                            :cell-class-name="tableCellClass"
                        >
                            <template slot="empty">
                                <div class="no_data_pic_small">还没有数据哦！</div>
                            </template>
                            <el-table-column prop="sysWhrNo" label="系统单号" width="178">
                                <template slot-scope="scope">
                                    <!-- 判断仓单还是应收单 -->
                                    <div v-if="scope.row.sysType==1">
                                        <el-button
                                            @click="toCheck(scope.row)"
                                            type="text"
                                            size="small"
                                            class="info_txt--number"
                                        >{{scope.row.sysNo}}</el-button>
                                    </div>
                                    <div v-else-if="scope.row.sysType==3">
                                        <el-button
                                            @click="toCheckReceivable(scope.row)"
                                            type="text"
                                            size="small"
                                            class="info_txt--number"
                                        >{{scope.row.sysNo}}</el-button>
                                    </div>
                                    <!-- <div v-if="scope.row.status ==1 ">
                                    
                                    </div>
                                    <div v-else-if="scope.row.status==8">
                                        <el-button
                                            @click="toApply(scope.row)"
                                            type="text"
                                            size="small"
                                            class="info_txt--number"
                                        >{{scope.row.sysNo}}</el-button>
                                    </div>
                                    <div v-else>
                                        <el-button
                                            @click="toShow(scope.row)"
                                            type="text"
                                            size="small"
                                            class="info_txt--number"
                                        >{{scope.row.sysNo}}</el-button>
                                    </div>-->
                                </template>
                            </el-table-column>
                            <el-table-column prop="sysType" label="单据类型" width="80">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.sysType=='1'">仓单信息</div>
                                    <div v-else-if="scope.row.sysType=='3'">应收信息</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="customerName" label="出资方" width="180">
                                <template slot-scope="scope">
                                    <div class="ellipse_hide" style="width:180px;">
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="scope.row.customerName"
                                            placement="bottom"
                                        >
                                            <el-button>{{scope.row.customerName}}</el-button>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createtime" label="创建时间" width="130">
                                <!-- <template
                                    slot-scope="scope"
                                >{{scope.row.createTime | formartDateTime('')}}</template> -->
                                  <template
                                    slot-scope="scope"
                                >{{scope.row.createTime | formartDateTimeMinute}}</template>
                            </el-table-column>
                            <el-table-column prop="createName" label="业务员" width="140">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.nickName">
                                        <div class="ellipse_hide">
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="scope.row.nickName"
                                                placement="bottom"
                                            >
                                                <el-button>{{scope.row.nickName}}</el-button>
                                            </el-tooltip>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="ellipse_hide">
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="scope.row.memberName"
                                                placement="bottom"
                                            >
                                                <el-button>{{scope.row.memberName}}</el-button>
                                            </el-tooltip>
                                        </div>
                                    </div>
                                    <!-- <div v-if="scope.row.nickName">
                                        <span>{{scope.row.nickName}}</span>
                                    </div>
                                    <div v-else>
                                        <span>{{scope.row.memberName}}</span>
                                    </div>-->
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="状态" width="90" >
                                <template slot-scope="scope">

                                </template>
                            </el-table-column>-->
                            <el-table-column label="操作" width="90">
                                <template slot-scope="scope">
                                    <!-- 判断仓单1,还是应收单3 -->
                                    <div v-for="(statusItem,index) in statusList" :key="index">
                                        <!-- 仓单 -->
                                        <div v-if="scope.row.sysType==1">
                                            <div v-if="statusItem==2">
                                                <el-button
                                                    @click="toCheck(scope.row)"
                                                    type="text"
                                                    size="small"
                                                    class="waiting_txt"
                                                >审核</el-button>
                                            </div>
                                            <div v-else-if="statusItem==8">
                                            <el-button
                                                @click="toApply(scope.row)"
                                                type="text"
                                                size="small"
                                                class="info_txt"
                                            >申请融资</el-button>
                                            </div>
                                        </div>
                                        <div v-else-if="scope.row.sysType==3">
                                            <div v-if="statusItem==2">
                                                <el-button
                                                    @click="toCheckReceivable(scope.row)"
                                                    type="text"
                                                    size="small"
                                                    class="waiting_txt"
                                                >审核</el-button>
                                            </div>
                                            <div v-else-if="statusItem==8">
                                            <el-button
                                                @click="toApplyReceivable(scope.row)"
                                                type="text"
                                                size="small"
                                                class="info_txt"
                                            >申请融资</el-button>
                                            </div>    


                                            <!-- <div v-if="statusList.includes(2)">
                                                <el-button
                                                    @click="toCheckReceivable(scope.row)"
                                                    type="text"
                                                    size="small"
                                                    class="waiting_txt"
                                                >审核</el-button>
                                            </div>
                                            <div v-else-if="statusList.includes(4,5,6)">
                                                评估中
                                            </div> -->
                                        </div>
                                    </div>
                                    <!-- old -->
                                    <!-- <div v-if="scope.row.status == '2'">
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
                                    </div>-->

                                    <!-- <el-button @click="toValueAssess(scope.row)" type="text" size="small">价值评估</el-button>
              <el-button @click="toRiskAssess(scope.row)" type="text" size="small">风险评估</el-button>
                                    <el-button @click="toVoucher(scope.row)" type="text" size="small">确认凭证</el-button>-->
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="fix">
                        <div style="float:right;margin-right:0px;margin-top:10px;">
                            <el-pagination
                                background
                                layout="total,prev, pager, next"
                                :page-size.sync="pageSize"
                                :total="total"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage1"
                            ></el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>





<script>
import moment from "moment";
import { formartDate, formartDateTime, area,formartDateTimeMinute } from "@/utils/filters";
import { requestPost } from "@/api/parent";
import { currency } from "@/utils/index";
import Pagination from "@/components/Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      currentPage1: 1,
      user: JSON.parse(localStorage.getItem("user_front")),
      tagTime: 1,
      timeList: [{ key: 1, value: "制单时间" }],
      startAmount: "",
      endAmount: "",
      statusList: [2],
      statusList1: [
        { key: "", value: "全部" },
        { key: 1, value: "暂存" },
        { key: 2, value: "待审核" },
        { key: 3, value: "审核驳回" },
        { key: 4, value: "价值待评估" },
        { key: 5, value: "风险待评估" },
        { key: 6, value: "凭证待确认" },
        { key: 7, value: "凭证驳回" },
        { key: 8, value: "待融资" },
        { key: 9, value: "融资申请中" },
        { key: 10, value: "融资驳回" },
        { key: 11, value: "融资中" },
        { key: 12, value: "融资成功" },
        { key: 13, value: "融资失败" },
        { key: 14, value: "已解质押" }
      ],

      total: 0,
      pageNum: 1,
      pageSize: 4,

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
    handleCurrentChange(val) {
      this.pageNum = val;
      this.init();
    },

    toValueAssess(row) {
      this.$router.push({
        name: "whreceiptBasicsManageValue",
        query: { whrId: row.id }
      });
    },
    toReceValueAssess() {
      this.$router.push({
        name: "whreceiptBasicsManageValue",
        query: { whrId: row.id }
      });
    },

    toRiskAssess(row) {
      this.$router.push({
        name: "whreceiptBasicsManageRisk",
        query: { whrId: row.whrId }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row1";
      }
      //   if (rowIndex === 1) {
      //     return "warning-row1";
      //   } else if (rowIndex === 3) {
      //     return "success-row1";
      //   }
      //   return "";
    },
    customTableheader() {
      return "thead_bgfff";
    },
    tableCellClass() {
      return "table_cell_p14";
    },

    handleSelect(key) {
      if (key == "1") {
        this.statusList = [2];
      } else if (key == "2") {
        this.statusList = [4, 5, 6];
      } else if (key == "3") {
        this.statusList = [8];
      }

      this.init();
    },

    //仓单审核
    toCheck(row) {
      this.$router.push({
        name: "whreceiptBasicsManageCheck",
        query: { whrId: row.id }
      });
    },
    //应收审核
    toCheckReceivable(row) {
      this.$router.push({
        name: "receiveableManageCheck",
        query: { receId: row.id }
      });
    },

    //仓单申请
    toApply(row) {
      this.$router.push({
        name: "whreceiptBasicsManageApply",
        query: { whrId: row.id }
      });
    },
    //应收申请
    toApplyReceivable(row) {
      this.$router.push({
        name: "receiveableManageApply",
        query: { receId: row.id }
      });
    },

    init() {
      this.tableData = [];
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        // statusList: [1, 8],
        status: this.statusList
      };

      requestPost("/api/auth/site/check/list", data).then(response => {
        if (response.data.code === 0) {
          this.tableData = response.data.res_data.list;

          this.total = response.data.res_data.total;
        }
      });
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
  height: 300px;
}
.el-button--small,
.el-button--small.is-round {
  padding: 0;
}
.el-table td,
.el-table th {
  padding: 14px 0;
}

.ellipse_hide .el-button {
  border: 0;
  padding: 0;
  background: transparent;
  font-size: 12px;
}
</style>
