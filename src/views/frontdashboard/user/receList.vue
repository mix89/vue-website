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
            <el-table-column prop="pledgorName" label="出质方" width="240"></el-table-column>
            <el-table-column prop="keepingName" label="托管机构" width="240"></el-table-column>
            <!-- <el-table-column prop="buyName" label="买方全称" width="110"></el-table-column> -->
   
            <el-table-column label="质押物价值(元)" width="210" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{scope.row.totalAmount | currency('') }}</template>
            </el-table-column>
              <el-table-column prop="status" label="状态" width="120">
              <template slot-scope="scope">
                <div v-for="item in statusList1">
                  <span v-if="item.key == scope.row.status">{{item.value}}</span>
                </div>
              </template>
            </el-table-column>
              <el-table-column label="签订时间" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.startTime | formartDate('') }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createtime" label="制单时间" width="130">
              <template slot-scope="scope">{{scope.row.createTime | formartDate('') }}</template>
            </el-table-column>
            <!-- <el-table-column prop="createName" label="制单人" width="110">
              <template slot-scope="scope">
                <div v-if="scope.row.nickName">
                  <span>{{scope.row.nickName}}</span>
                </div>
                <div v-else>
                  <span>{{scope.row.createName}}</span>
                </div>
              </template>
            </el-table-column> -->
          
            <!-- <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <div v-if="scope.row.status == '1'">
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
                  @click="deleteReceivable(scope.row.receId,init)"
                    type="text"
                    size="small"
                    class="info_txt border"
                  >删除</el-button>
                </div>
                <div v-else-if="scope.row.status=='8' ">
                    <el-button
                      @click="toApply(scope.row)"
                      type="text"
                      size="small"
                      class="info_txt"
                    >申请融资</el-button>
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
    <checkDialog
      :id="receId"
      :showCheckDialog="dialogFormVisible"
      :isWhreceipt="false"
      @succeed="checkDialogEvent"
      @closeShow="closeShow"
    ></checkDialog>

  </div>
</template>
<script>
import { formartDate, formartDateTime } from "@/utils/filters";
import { requestPost } from "@/api/parent";
import { currency } from "@/utils/index";
import Pagination from "@/components/Pagination";
import checkDialog from "@/components/checkDialog/checkDialog";
import PageHead from "@/views/layout/components/PageHead";
import { area } from "../../../utils/filters";
import { deleteReceivable } from "@/api/api";
export default {
  components: {
    Pagination,
    PageHead,
    checkDialog
  },
  data() {
    return {
      deleteReceivable:deleteReceivable,
      statusItemList:[1,2,3,4],
      statusItem:'',
      receId:null,
      dialogFormVisible:false,

      user: JSON.parse(localStorage.getItem("user_front")),
      tagTime: 1,
      timeList: [{ key: 1, value: "制单时间" }],
      // { key: 2, value: "订单时间" },
      statusObj: "",
      startAmount: "",
      endAmount: "",
      status: "",
      optionList: [
        { key: 1, value: "暂存" },
        { key: 2, value: "待审核" },
        { key: 3, value: "审核驳回" },
        { key: 4, value: "已通过" },
      ],
      statusList1: [
        { key: 0, value: "作废" },
        { key: 1, value: "暂存" },
        { key: 2, value: "待审核" },
        { key: 3, value: "审核驳回" },
        { key: 4, value: "已通过" },
        { key: 6, value: "凭证待确认" },
        { key: 7, value: "凭证驳回" },
        { key: 8, value: "申请成功" },
        { key: 9, value: "融资申请中" },
        { key: 10, value: "融资驳回" },
        { key: 11, value: "融资中" },
        { key: 12, value: "融资成功" },
        { key: 13, value: "融资失败" }
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
    };
  },
  created() {
    this.init();
  },

  methods: {
    closeShow(value){
      this.dialogFormVisible = value
    },
    checkDialogFn(row) {
      this.whrId = row.whrId
      this.dialogFormVisible = true
    },
    checkDialogEvent(value){
      if(value){
        this.init()
      }
    },

    handleSelect(key) {
        // <el-menu-item index="2" class="tab_item">待审核</el-menu-item>
        // <el-menu-item index="4" class="tab_item">已通过</el-menu-item>
        // <el-menu-item index="3" class="tab_item">已驳回</el-menu-item>
      if (key == "2") {
      //待审核
        this.statusItemList = [2]
      } else if (key == "4") {
      //已通过
        this.statusItemList = [4]
      } else if (key == "3") {
      //已驳回
        this.statusItemList = [3]
      }else {
        this.statusItemList = [1,2,3,4]
        this.optionList = [
          { key: 1, value: "暂存" },
          { key: 2, value: "待审核" },
          { key: 3, value: "审核驳回" },
          { key: 4, value: "已通过" },
        ]
      }
      this.init();
    },




    toCheck(row) {
      this.receId = row.receId
      this.dialogFormVisible = true
    },
    checkDialogEvent(value){
      if(value){
        this.init()
      }
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
    //   let sysReceNo = null;
    //   let pledgorName = null;
    //   let keepingName = null;
    //   let buyName = null;
    //   let createName = null;
    //   if (this.select === "1") {
    //     sysReceNo = this.searchData;
    //   } else if (this.select === "2") {
    //     keepingName = this.searchData;
    //   } else if (this.select === "3") {
    //     buyName = this.searchData;
    //   } else if (this.select === "4") {
    //     createName = this.searchData;
    //   }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        statusItemList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
        // createStartTime: this.startTime,
        // createEndTime: this.endTime,

        //statusList: this.status == null || this.status == ""? this.statusItemList:[this.status],

      };

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
