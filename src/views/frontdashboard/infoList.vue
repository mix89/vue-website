<template>
    <div>
        <div class="info_notify_box">
            <div class="tit">消息中心</div>
            <div class="bdy">
                <div class="info_notify_list">
                    <div
                        class="info_notify_item"
                        v-for="(item,index) in newsObj.newsList"
                        :key="index"
                    >
                        <div class="num">{{item.content}}</div>
                        <div class="status">
                            <div v-for="(statsItem,statusIndex) in statusList1" :key="statusIndex">
                                <div v-if="statsItem.key==item.status">{{statsItem.value}}</div>
                            </div>
                        </div>
                        <div class="time">{{item.createTime}}</div>
                    </div>
                    <!-- <div class="info_notify_item">
                                <div class="num">CD201809260001</div>
                                <div class="status">价值评估通过评估</div>
                                <div class="time">2018.09.09 10:50</div>
                    </div>-->
                </div>
                <div>
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
import { requestPost } from "@/api/parent";

export default {
  data() {
    return {
       // #2
       //状态列表
      statusList1: [
        { key: 0, value: "作废" },
        { key: 1, value: "暂存" },
        { key: 2, value: "待审核" },
        { key: 3, value: "审核驳回" },
        { key: 4, value: "已通过" },
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
      //消息中心
      newsObj: {
        newsList: []
      },
      currentPage1: 1,
      total: 0,
      pageNum: 1,
      pageSize: 5
    };
  },
  created() {
      // #3
    this.init();
  },
  methods: {
    // #4
    init() {
      this.newsObj.newsList = [];
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
        //  pageSize: 10,
        // statusList: [1, 8],
        // status: this.statusList
      };

      //消息中心
      requestPost("/api/sys/msg/list", data).then(response => {
        if (response.data.code === 0) {
          let newsObjData = response.data.res_data.list;
          this.total = newsObjData.total;
          this.newsObj.newsList = newsObjData.list;
        }
      });
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.init();
    }
  }
};
</script>

<style scoped>
</style>