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
                        <el-menu-item index="1" class="tab_item">待凭证确认</el-menu-item>
                        <!-- <el-menu-item index="2" class="tab_item">评估中</el-menu-item>
                        <el-menu-item index="3" class="tab_item">待申请融资</el-menu-item>-->
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
                            <el-table-column prop="sysNo" label="系统单号" width="200">
                                <template slot-scope="scope">
                                    <!-- 判断仓单还是应收单 -->
                                    <div v-if="scope.row.sysType==1">
                                        <el-button
                                            @click="toConfirm(scope.row)"
                                            type="text"
                                            size="small"
                                            class="info_txt--number"
                                        >{{scope.row.sysNo}}</el-button>
                                    </div>
                                    <div v-else-if="scope.row.sysType==3">
                                        <el-button
                                            @click="toReceivableConfirm(scope.row)"
                                            type="text"
                                            size="small"
                                            class="info_txt--number"
                                        >{{scope.row.sysNo}}</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="sysType" label="单据类型" width="80">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.sysType=='1'">仓单信息</div>
                                    <div v-else-if="scope.row.sysType=='3'">应收信息</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="customer_name" label="出质方" width="230">
                                <template slot-scope="scope">
                                    <div class="ellipse_hide" style="width:230px;">
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="scope.row.customer_name"
                                            placement="bottom"
                                        >
                                            <el-button>{{scope.row.customer_name}}</el-button>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="totalAmount" label="金额(元)" width="200">
                                <template slot-scope="scope">{{scope.row.totalAmount}}</template>
                            </el-table-column>
                            <el-table-column label="操作" width="90">
                                <template slot-scope="scope">
                                    <!-- 判断仓单1,还是应收单3 -->
                                    <!-- 仓单 -->
                                    <div v-if="scope.row.sysType==1">
                                        <el-button
                                            @click="toConfirm(scope.row)"
                                            type="text"
                                            size="small"
                                            class="waiting_txt"
                                        >待确认</el-button>
                                    </div>
                                    <div v-else-if="scope.row.sysType==3">
                                        <el-button
                                            @click="toReceivableConfirm(scope.row)"
                                            type="text"
                                            size="small"
                                            class="waiting_txt"
                                        >待确认</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="fix">
                        <div style="float:right;margin-right:0px;margin-top:10px;">
                            <el-pagination
                                background=""
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
import { formartDate, formartDateTime, area } from "@/utils/filters";
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

    toConfirm(row) {
      this.$router.push({
        name: "custodianInstitutionConfirm",
        query: { whrId: row.id }
      });
    },

    toReceivableConfirm(row) {
      this.$router.push({
        name: "receiveCustodianInstitutionConfirm",
        query: { receId: row.id }
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

    //仓单风险评估
    toRiskAssess(row) {
      this.$router.push({
        name: "riskAssessmentAssess",
        query: { whrId: row.id }
      });
    },
    //应收风险评估
    toReceivableRiskAssess(row) {
      this.$router.push({
        name: "receiveRiskAssessmentAssess",
        query: { receId: row.id }
      });
    },

    init() {
      this.tableData = [];
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        // statusList: [1, 8],
        customerType: 2
        // status: this.statusList
      };

      requestPost("/api/auth/site/thirdParty/list", data).then(response => {
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
