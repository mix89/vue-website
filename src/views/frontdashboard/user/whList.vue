<template>
  <div>
    <div class="">
      <div class="">
        <div class="page_main_cont" style="min-height:300px;">

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
            <!-- <el-table-column type="index" label="序号" width="50"></el-table-column> -->
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
            <el-table-column prop="pledgorName" label="出质方" width="220"></el-table-column>
            <el-table-column prop="keepingName" label="托管机构" width="220"></el-table-column>
               <el-table-column label="评估金额（元）" width="200" :show-overflow-tooltip="true">
              <!-- <template slot-scope="scope">{{scope.row.totalAmount | currency('') }}</template> -->
            <template slot-scope="scope">
              <div v-if="scope.row.costAmount">
                  {{scope.row.costAmount | currency('') }}
              </div>
              <div v-else>
                  <div>
                    <div class="operation_finished">
                      <span></span>
                    </div>
                  </div>
                </div>
              </template>

            </el-table-column>
              <el-table-column prop="status" label="状态" width="120">
              <template slot-scope="scope">
                <div v-for="(item,index) of statusList1" :key="index">
                  <span v-if="index == scope.row.status">{{item.value}}</span>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="wName" label="仓库" width="110"></el-table-column> -->
            <el-table-column label="仓租起止时间" width="190">
              <template slot-scope="scope">
                <span> {{scope.row.startTime | formartDate('') }}</span> -
                <span> {{scope.row.endTime | formartDate('') }}</span>
              </template>
            </el-table-column>


            <!-- <el-table-column label="仓单总金额(元)" width="160" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{scope.row.totalAmount | currency('') }}</template>
            </el-table-column> -->
            <el-table-column prop="createtime" label="制单时间" width="110">
              <template slot-scope="scope">{{scope.row.createTime | formartDate('') }}</template>
            </el-table-column>
            <!-- <el-table-column prop="createName" label="制单人" width="110">
              <template slot-scope="scope">
                <div v-if="scope.row.nickName">
                  <span>{{scope.row.nickName}}</span>
                </div>
                <div v-else>
                  <span>{{scope.row.memberName}}</span>
                </div>
              </template>
            </el-table-column> -->
        
            <!-- L1000	企业管理人员
            L1001	企业信息录入员
            L1002	企业信息审核员-->
            <!-- <el-table-column label="操作" width="100">
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
                      type="text"
                      size="small"
                      class="info_txt border"
                      @click="deleteWhreceipt(scope.row.whrId,init)"
                    >删除</el-button>
                  </div>
                </div>
                <div v-else>
                  <div>
                    <div class="operation_finished">
                      <span></span>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column> -->
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
      <!-- v-bind="$attrs"
      v-on="$listeners" -->
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
import moment from "moment";
import { requestPost } from "@/api/parent";
import { currency } from "@/utils/index";
import Pagination from "@/components/Pagination";
import checkDialog from "@/components/checkDialog/checkDialog";
import { area } from "../../../utils/filters";
import { deleteWhreceipt } from "@/api/api";
export default {
  components: {
    Pagination,
    checkDialog
  },
  data() {
    return {
      deleteWhreceipt:deleteWhreceipt,
      whrId:null,
      dialogFormVisible:false,

      statusItemList:[1,2,3,4],
      statusItem:'',
      user: JSON.parse(localStorage.getItem("user_front")),
      statusObj: "",
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
      statusList1: [
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
    },

     closeShow(value){
      this.dialogFormVisible = value
    },
    checkDialogEvent(value){
      if(value){
        this.init()
      }
    },
    checkDialogFn(row) {
      this.whrId = row.whrId
      this.dialogFormVisible = true
    },


    handleSelect(key) {
      this.status = null;
      this.statusItem = key;
      if (key == "1") {
        //待审核
        this.statusItemList = [2]
      } else if (key == "4") {
        //已通过
        this.statusItemList = [4]
      }else if(key == "10"){
        //已驳回
        this.statusItemList = [3]
      }else {
        this.statusItemList = [1,2,3,4]
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

    deleteClick(userId, status) {
      let data = {
        userId: userId,
        status: status
      };
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
    toApply(row) {
      this.$router.push({
        name: "whreceiptBasicsManageApply",
        query: { whrId: row.whrId }
      });
    },
    init() {
      this.tableData = [];
    //   let sysWhrNo = null;
    //   let pledgorName = null;
    //   let keepingName = null;
    //   let wName = null;
    //   let createName = null;
    //   if (this.select === "1") {
    //     sysWhrNo = this.searchData;
    //   } else if (this.select === "2") {
    //     keepingName = this.searchData;
    //   } else if (this.select === "3") {
    //     wName = this.searchData;
    //   } else if (this.select === "4") {
    //     createName = this.searchData;
    //   }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        statusItemList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
        // statusList: this.status == null || this.status == "" ? this.statusItemList:[this.status],
        // statusRange: this.statusRange,

      };

      requestPost("/api/auth/site/whreceipt/list", data).then(response => {
        if (response.data.code === 0) {
            console.log(6666)
          console.log(response.data.res_data);
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
