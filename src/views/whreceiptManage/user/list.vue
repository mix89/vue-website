<template>
  <div>
    <PageHead/>
    <div class="page_container">
      <div class="page_title_main">
        <el-menu :default-active="''" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index class="tab_item">全部</el-menu-item>
          <el-menu-item index="1" class="tab_item">暂存</el-menu-item>
          <el-menu-item index="2" class="tab_item">待审核</el-menu-item>
          <el-menu-item index="4" class="tab_item">已通过</el-menu-item>
          <el-menu-item index="10" class="tab_item">已驳回</el-menu-item>
        </el-menu>
        <div class="page_main_cont">
          <!-- 顶部搜索框 -->
          <el-form>
            <div class="fix">
              <div style="float:right;margin-right:10px;">
                <div class="search_box">
                  <el-form-item class="button-item">
                    <router-link
                      :to="{name:'whreceiptBasicsManageAdd'}"
                      v-if="user.userRoles[0].roleCode == 'L1001' || user.userRoles[0].roleCode == 'L1000' "
                    >
                      <el-button type="primary" icon="el-icon-add" class="primary_btn">
                        <i class="el-icon-plus"></i>
                        新增
                      </el-button>
                    </router-link>
                  </el-form-item>

                  <el-form-item label="仓单总金额" class="money-item">
                    <div class="money-box">
                      <el-input v-model="startAmount" placeholder="请输入金额"></el-input>
                    </div>
                    <span>-</span>
                    <div class="money-box">
                      <el-input v-model="endAmount" placeholder="请输入金额"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="状态" class="select-item w150" v-if="this.statusItem != '1' && this.statusItem != '2' && this.statusItem != '4' && this.statusItem != '10'">
                    <div>
                      <el-select v-model="status" size="small" placeholder="请选择">
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
                  <el-form-item label="" class="searchbox-item">
                    <el-input placeholder="请输入关键字" v-model="searchData">
                      <el-select v-model="select" slot="prepend" class="prepend">
                        <el-option label="系统单号" value="1"></el-option>
                        <el-option label="托管机构" value="2"></el-option>
                        <el-option label="仓库" value="3"></el-option>
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
            <el-table-column prop="sysWhrNo" label="系统单号" width="178">
              <template slot-scope="scope">
                <div>
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
            <el-table-column prop="keepingName" label="托管机构" width="100"></el-table-column>
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
              <template slot-scope="scope">{{scope.row.createTime | formartDateTimeMinute('') }}</template>
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
                <div v-if="scope.row.status >= 4">
                  <span>已通过</span>
                </div>
                <div v-else v-for="item in statusList">
                  <span v-if="item.key == scope.row.status">{{item.value}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <div v-if="scope.row.status == '1'">
                  <div>
                    <el-button
                      @click="toCheck(scope.row)"
                      type="text"
                      size="small"
                      class="waiting_txt"
                    >提交审核</el-button>
                    <el-button
                      @click="toEdit(scope.row)"
                      type="text"
                      size="small"
                      class="info_txt border"
                    >修改</el-button>
                    <el-button
                      @click="deleteWhreceipt(scope.row.whrId,init)"
                      type="text"
                      size="small"
                      class="info_txt border"
                    >删除</el-button>
                  </div>
                </div>
                <!-- <div v-else-if="scope.row.status=='3' ">
                  <el-button
                    @click="delete(scope.row)"
                    type="text"
                    size="small"
                    class="info_txt"
                  >重新提交</el-button>
                </div> -->
                <div v-else>
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

    <!-- 弹出框 -->
    <checkDialog
      :id="whrId"
      :showCheckDialog="dialogFormVisible"
      :isWhreceipt="true"
      @succeed="checkDialogEvent"
      @closeShow="closeShow"
    ></checkDialog>

  </div>
</template>








<script>
import { formartDate, formartDateTime } from "@/utils/filters";
import { requestPost } from "@/api/parent";
import { deleteWhreceipt } from "@/api/api";
import { currency } from "@/utils/index";
import Pagination from "@/components/Pagination";
import checkDialog from "@/components/checkDialog/checkDialog";
import PageHead from "@/views/layout/components/PageHead";
import { area } from "../../../utils/filters";
export default {
  components: {
    Pagination,
    PageHead,
    checkDialog
  },
  data() {
    return {
      deleteWhreceipt:deleteWhreceipt,
      whrId:null,
      dialogFormVisible:false,

      statusItemList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
      statusItem:'',
      user: JSON.parse(localStorage.getItem("user_front")),
      startAmount: "",
      endAmount: "",
      status: "",
      optionList: [
        {key:"",value: "全部" },
        {key:1,value:"暂存"},
        {key:2,value:"待审核"},
        {key:3,value:"审核驳回"},
        {key:4,value:"已通过"}
      ],
      statusList: [
        {key:0,value:"作废"},
        {key:1,value:"暂存"},
        {key:2,value:"待审核"},
        {key:3,value:"审核驳回"},
        {key:4,value:"已通过"},
        {key:5,value:"风险待评估"},
        {key:6,value:"凭证待确认"},
        {key:7,value:"凭证驳回"},
        {key:8,value:"待融资"},
        {key:9,value:"融资申请中"},
        {key:10,value:"融资驳回"},

        {key:11,value:"融资中"},
        {key:12,value:"融资成功"},
        {key:13,value:"融资失败"},
        {key:14,value:"已解质押"}
      ],
      total: 0,
      pageNum: 1,
      pageSize: 10,

      startTime: null,
      endTime: null,
      searchData: "",
      select: "1",

      tableData: [],
      dateTime: null,
    };
  },
  created() {
    this.init();
  },

  methods: {
    toCheck(row) {
      this.whrId = row.whrId
      this.dialogFormVisible = true
      console.log(this.dialogFormVisible)
    },

    closeShow(value){
      this.dialogFormVisible = value
    },
    checkDialogEvent(value){
      if(value){
        this.init()
      }
    },

    handleSelect(key) {
      this.status = null;
      this.statusItem = key;
      if (key == "1") {
        //暂存
        this.statusItemList = [1]
      }else if (key == "2") {
        //待审核
        this.statusItemList = [2]
      } else if (key == "4") {
        //已通过
        this.statusItemList = [4,5,6,7,8,9,10,11,12,13,14]
      }else if(key == "10"){
        //已驳回
        this.statusItemList = [3]
      }else {
        this.statusItemList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
        this.optionList = [
          {key:"",value: "全部" },
          {key:1,value:"暂存"},
          {key:2,value:"待审核"},
          {key:3,value:"审核驳回"},
          {key:4,value:"已通过"}
        ]
      }
      this.init();
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
    init() {
      this.tableData = [];
      let sysWhrNo = null;
      let pledgorName = null;
      let keepingName = null;
      let wName = null;
      let createName = null;
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
        statusList: this.status == null || this.status == "" ? this.statusItemList:(this.status == 4 ? [4,5,6,7,8,9,10,11,12,13,14]:[this.status]),
        statusRange: this.statusRange,
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
      requestPost("/api/auth/site/whreceipt/list", data).then(response => {
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
