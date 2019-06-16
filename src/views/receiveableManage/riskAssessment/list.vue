<template>
  <div>
    <PageHead/>
    <div class="page_container">
      <div class="page_title_main">
        <el-menu :default-active="''" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index class="tab_item">全部</el-menu-item>
          <el-menu-item index="4" class="tab_item">待评估</el-menu-item>
          <el-menu-item index="20" class="tab_item">已评估</el-menu-item>
        </el-menu>
        <div class="page_main_cont">
          <!-- 顶部搜索框 -->
          <el-form>
            <div class="fix">
              <div style="float:right;margin-right:20px;">
                <div class="search_box">
                  <el-form-item label="质押物价值" class="money-item">
                    <div class="money-box">
                      <el-input v-model="startAmount" placeholder="请输入金额"></el-input>
                    </div>
                    <span>-</span>
                    <div class="money-box">
                      <el-input v-model="endAmount" placeholder="请输入金额"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="" class="prepend-datepicker-item"  style="width:360px">
                    <div style="float: left;width: 130px">
                      <el-select v-model="tagTime" size="small" :disabled="isShowSelect" slot="prepend">
                        <el-option
                          v-for="item in timeList"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"
                        ></el-option>
                      </el-select>
                    </div>
                    <div style="float: left;width: 220px;vertical-align: middle">
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
                  <el-form-item label="" class="searchbox-item">
                    <el-input placeholder="请输入关键字" v-model="searchData">
                      <el-select v-model="select" slot="prepend" class="prepend">
                        <el-option label="系统单号" value="1"></el-option>
                        <el-option label="出质方" value="2"></el-option>
                        <el-option label="买方全称" value="3"></el-option>
                        <el-option label="评估申请人" value="4"></el-option>
                      </el-select>
                    </el-input>
                  </el-form-item>
                  <el-form-item class="button-item">
                    <el-button
                      icon="el-icon-search "
                      class="search_btn"
                      type="warning"
                      size="small"
                      @click="search"
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
            :cell-style="tableCellStyle"
          >
           <template slot="empty">
                <div class="no_data_pic">还没有数据哦！</div>
           </template>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="sysReceNo" label="系统单号" width="178">
              <template slot-scope="scope">
                <div v-if="scope.row.status > 4">
                  <el-button
                    @click="toShow(scope.row)"
                    type="text"
                    size="small"
                    class="info_txt--number"
                  >{{scope.row.sysReceNo}}</el-button>
                </div>
                <div v-else-if="scope.row.status == 4">
                  <el-button
                    @click="toRiskAssess(scope.row)"
                    type="text"
                    size="small"
                    class="info_txt--number"
                  >{{scope.row.sysReceNo}}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pledgorName" label="出质方" width="198"></el-table-column>
            <el-table-column prop="buyName" label="买方全称" width="110"></el-table-column>
            <el-table-column label="签订时间" width="110">
              <template slot-scope="scope">
                <span>{{scope.row.startTime | formartDateTimeMinute('') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="质押物价值(元)" width="162">
              <template slot-scope="scope">{{scope.row.totalAmount | currency('') }}</template>
            </el-table-column>
            <el-table-column prop="createtime" label="评估申请时间" width="110">
              <template slot-scope="scope">{{scope.row.processDetailCreateTime | formartDateTimeMinute('')}}</template>
            </el-table-column>
            <el-table-column prop="createName" label="评估申请人" width="110">
              <template slot-scope="scope">{{scope.row.createName}}</template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="110">
              <template slot-scope="scope">
                <span v-if="scope.row.status > 4">已评估</span>
                <span v-else-if="scope.row.status == 4">待评估</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.status == 4">
                  <el-button @click="toRiskAssess(scope.row)" type="text" size="small" class="info_txt">去评估</el-button>
                </div>
                <div v-else-if="scope.row.status > 4">
                  <div>
                    <div class="operation_finished">
                      <span></span>
                    </div>
                  </div>
                </div>
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
import { area, formartDate, formartDateTime } from "@/utils/filters";
import { requestPost } from "@/api/parent";
import { currency } from "@/utils/index";
import Pagination from "@/components/Pagination";
import PageHead from "@/views/layout/components/PageHead";
export default {
  components: {
    Pagination,
    PageHead
  },
  data() {
    return {
      isShowSelect:true,
      statusItemList:null,
      statusRange:4,
      tagTime: 1,
      timeList: [{ key: 1, value: "评估申请时间" }],

      startAmount: "",
      endAmount: "",
      total: 0,
      pageNum: 1,
      pageSize: 10,

      startTime: null,
      endTime: null,
      searchData: "",
      select: "1",

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
        name: "receiveRiskAssessmentAssess",
        query: { receId: row.receId }
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
      this.statusItem = key
      this.timeList = [{ key: 1, value: "评估申请时间" }]
      this.tagTime = 1
      this.isShowSelect = true
      this.statusRange = null
      this.statusItemList = null
      if (key == '4') {
        this.statusItemList = [4]
      } else if (key == "20") {
        this.isShowSelect = false
        this.statusRange = 6
        this.timeList = [{ key: 2, value: "评估时间" }, { key: 1, value: "评估申请时间" }]
      }else {
        this.statusRange = 4
      }
      this.init();
    },
    toShow(row) {
      this.$router.push({
        path: "receiveRiskAssessmentShow",
        query: { receId: row.receId }
      });
    },
    search() {
      this.init();
    },
    init() {
      this.tableData = [];
      let sysReceNo = null;
      let pledgorName = null;
      let buyName = null;
      let createName = null;

      if (this.select === "1") {
        sysReceNo = this.searchData;
      } else if (this.select === "2") {
        pledgorName = this.searchData;
      } else if (this.select === "3") {
        buyName = this.searchData;
      } else if (this.select === "4") {
        createName = this.searchData;
      }
      let processDetailCreateStartTime = null
      let processDetailCreateEndTime = null
      let processDetailHandleStartTime = null
      let processDetailHandleEndTime = null
      if(this.tagTime == 1){
        //评估申请时间
        processDetailCreateStartTime = this.startTime
        processDetailCreateEndTime = this.endTime
      }else {
        processDetailHandleStartTime = this.startTime
        processDetailHandleEndTime = this.endTime
      }

      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        processDetailCreateStartTime: processDetailCreateStartTime,
        processDetailCreateEndTime: processDetailCreateEndTime,
        processDetailHandleStartTime:processDetailHandleStartTime,
        processDetailHandleEndTime:processDetailHandleEndTime,
        statusList:this.statusItemList,
        statusRange:this.statusRange,

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
        buyName:buyName,
        createName: createName
      };

      requestPost("/api/auth/site/receivable/risk/list", data).then(response => {
        if (response.data.code === 0) {
          this.tableData = response.data.res_data.list;
          this.total = response.data.res_data.total;
        }
      });
    },
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
  }
};
</script>

<style scoped>
.search_box {
  margin: 10px 5px -10px;
}
.el-button--small, .el-button--small.is-round{
  padding: 0 ;
}
</style>
