<template>
    <div>
        <div class="layout_enteringInfo fix">
            <div class="layout_l">
                <!-- <div class="building_box">敬请期待</div> -->
                <div class="entering_box">
                    <div class="entering_box_item bg1">
                        <div class="tit">仓单总计：{{whNum.totalCount}}</div>
                        <div class="last_entering_num">上月录入数量： {{whNum.lastMonthCount}}</div>
                        <div class="entering_num">本月录入数量： {{whNum.currentMonthCount}}</div>
                        <div>
                            <button class="basic_button mt20" @click="toWhouseAdd">仓单录入</button>
                        </div>
                    </div>
                    <div class="entering_box_item bg2">
                        <div class="tit">应收总计：{{receNum.totalCount}}</div>
                        <div class="last_entering_num">上月录入数量： {{receNum.lastMonthCount}}</div>
                        <div class="entering_num">本月录入数量： {{receNum.currentMonthCount}}</div>
                        <div>
                            <button class="basic_button green mt20" @click="toReceivableAdd">应收单录入</button>
                        </div>
                    </div>
                    <div class="entering_box_item bg3">
                        <div class="tit">订单总计：0</div>
                        <div class="last_entering_num">上月录入数量： 0</div>
                        <div class="entering_num">本月录入数量： 0</div>
                        <div>
                            <button class="basic_button gray mt20" disabled>订单录入</button>
                        </div>
                    </div>
                    <div class="entering_box_item bg4">
                        <div class="tit">资产包总计：0</div>
                        <div class="last_entering_num">上月录入数量： 0</div>
                        <div class="entering_num">本月录入数量： 0</div>
                        <div>
                            <button class="basic_button gray mt20" disabled>资产包录入</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layout_r">
                <!-- 消息中心 -->
                 <infoList/>
            </div>
        </div>
        <div class="whole_step_box">
            <div class="whole_every_step">
                <span class="num">01</span>
                <span class="tit">信息录入</span>
                <span class="member">（业务员）</span>
            </div>
            <div class="whole_every_step">
                <span class="num">02</span>
                <span class="tit">提交申请</span>
                <span class="member">（业务员）</span>
            </div>
            <div class="whole_every_step disabled">
                <span class="num">03</span>
                <span class="tit">信息审核</span>
                <span class="member">（审核人）</span>
            </div>
            <div class="whole_every_step step_4 disabled">
                <span class="num">04</span>
                <span class="tit">评估机构</span>
            </div>
            <div class="whole_every_step disabled">
                <span class="num">05</span>
                <span class="tit">申请融资</span>
                <span class="member">（审核人）</span>
            </div>
            <div class="whole_every_step step_6 disabled">
                <span class="num">06</span>
                <span class="tit">进入智能合约</span>
            </div>
        </div>
        <!-- 业务数据总揽 -->
        <div class="">
            <div class="bussiness_tit">业务数据总揽</div>
            <div class="layout_charts--bussiness fix">
                <div class="layout_l">
                    <div class="using_data_box">
                        <div class="tit">在途业务数据(总计：{{histogramChartData.totalCount}}）</div>
                        <div>
                            <ve-histogram
                                height="360px"
                                :data="histogramChartData"
                                :settings="histogramChartSettings"
                                :extend="histogramChartExtend"
                                :data-empty="histogramDataEmpty"
                                :colors="histogramColors"
                            >
                                <!-- <div class="data-empty">没有数据</div> -->
                            </ve-histogram>
                            <!-- <ve-line :data="chartData"></ve-line> -->
                        </div>
                    </div>
                </div>
                <div class="layout_r">
                    <div class="check_percent">
                        <div class="tit">审核通过情况</div>
                        <div style="width:180px;margin:0 auto;">
                            <div v-if='throughRate'>
                                <circle-progress :progress-num='throughRate'></circle-progress>
                            </div>
                        </div>
                        <!-- {{throughRate}} -->
                        <!-- <div class="through_circle">
                            <div class="through_rate">
                                {{throughRate}}
                                <span>%</span>
                            </div>
                            <div class="through_rate_txt">通过率</div>
                        </div> -->
                        <div class="fix" style="margin-top:50px;">
                            <div class="total_num">总数：{{checkThroughData.totalCount}}</div>
                            <div class="through_num">审核通过数：{{checkThroughData.count}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 仓单信息、应收信息 -->
        <div>
            <div class="page_title_main" style="border-top:none;padding:18px 0 0 0">
                <div class="inner_tabs_menu" style="padding-left:20px;">
                    <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                    >
                        <el-menu-item index="1" class="tab_item">仓单信息</el-menu-item>
                        <el-menu-item index="2" class="tab_item">应收信息</el-menu-item>
                    </el-menu>
                </div>
                <div class="page_main_cont no_td_border" style="border:none;padding:0 20px">
                    <div v-show="tableShow1">
                         <whList />   
                    </div>
                    <div v-show="tableShow2">
                        <receList />
                    </div>
                    <!-- <div></div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "v-charts/lib/style.css";
import VeHistogram from "v-charts/lib/histogram.common";
// import VeRing from "v-charts/lib/ring.common";
import { requestPost } from "@/api/parent";
import { dealpercent } from "@/utils/filters";
import whList from "@/views/frontdashboard/user/whList"
import receList from "@/views/frontdashboard/user/receList"
import infoList from "@/views/frontdashboard/infoList";
import circleProgress from "@/components/CircleProgress"

export default {
  data() {

    //环形图
    this.ringChartSettings = {
      radius: [55, 105],
      // offsetX:0,
      offsetY: 160,
      label: {
        show: false
      }
      //     labelMap: {
      //     status: "状态",
      //     whOrder: "仓单",
      //   }
    };
    this.ringColors = ["#00ACF3", "#DBDBDB", "#7543F2"];
    this.ringChartExtend = {
      series(v) {
        v.forEach(i => {
          //   i.barWidth = 24;
          console.log(333);
          console.log(i);
          // i.pie.label.position = 'inside'
        });
        return v;
      }
    };

    //柱状图
    this.histogramChartSettings = {
      labelMap: {
        name: "状态",
        whreceiptPercentage: "仓单",
        receivablePercentage: "应收"
      }
    };
    this.histogramChartExtend = {
      series(v) {
        v.forEach(i => {
          i.barWidth = 24;
        });
        return v;
      }
      //  tooltip(v){
      //      console.log(222)
      //     console.log(v)
      //  }
    };
    this.histogramColors = ["#00ACF3", "#8EDA54"];
    return {

      // #2
      whNum:{
          currentMonthCount:0,
          lastMonthCount:0,
          totalCount:0
      },  
      receNum:{
          currentMonthCount:0,
          lastMonthCount:0,
          totalCount:0
      },  
      activeIndex:"1",  
      //表格显示
      tableShow1:true,  
      tableShow2:false,  
      //审核通过情况
      checkThroughData: {
        totalCount: 0, //总数
        count: 0,
        contractPercentage: 0
      },

      //仓单数展示
      showNumber: {
        countData: {
          count: 0,
          Percentage: null
        },
        whreceiptCountData: {
          whreceiptCount: 0,
          Percentage: null
        },
        receivableCountData: {
          whreceiptCount: 0,
          Percentage: null
        },
        totalCount: 0
      },

      //柱状图
      histogramDataEmpty: false,
      histogramChartData: {
        columns: ["name", "whreceiptPercentage", "receivablePercentage"],
        rows: [
          //   { status: "暂存", whreceiptPercentage: 1393, receivablePercentage: 1093,count: 0},
          //   { status: "contract", whreceiptPercentage: 1393, receivablePercentage: 1093 },
          //   { status: "暂存", whOrder: 3530, reOrder: 3230 },
          //   { status: "已提交", whOrder: 3530, reOrder: 3230 },
          //   { status: "已审核", whOrder: 2923, reOrder: 2623 },
          //   { status: "评估中", whOrder: 1723, reOrder: 1423 },
          //   { status: "已评估", whOrder: 3792, reOrder: 3492 },
          //   { status: "已申请融资", whOrder: 4593, reOrder: 4293 }
        ],
        totalCount: 0,
        histogramDataEmpty: true
      }
    };
  },
  components: { VeHistogram,whList,receList,infoList,circleProgress },
  created() {
 
    //企业业务员账号首页制单数数据
    requestPost("/api/auth/site/business/index", null).then(response => {
      if (response.data.code === 0) {
          //仓单
        let dataList1 = response.data.res_data.list[0]
        this.whNum.currentMonthCount = dataList1.currentMonthCount
        this.whNum.lastMonthCount =  dataList1.lastMonthCount
        this.whNum.totalCount = dataList1.totalCount
        //应收
        let dataList2 = response.data.res_data.list[1]
        this.receNum.currentMonthCount = dataList2.currentMonthCount
        this.receNum.lastMonthCount =  dataList2.lastMonthCount
        this.receNum.totalCount = dataList2.totalCount
      }
    });

    // 仓单，应收，订单，资产包总计
    requestPost("/api/auth/site/check/contract", null).then(response => {
      if (response.data.code === 0) {
        // console.log(111)
        // console.log(response.data.res_data)

        this.checkThroughData.totalCount = response.data.res_data.totalCount;
        this.checkThroughData.count = response.data.res_data.list[1].count;
        this.checkThroughData.contractPercentage =
          response.data.res_data.contractPercentage;
        // this.histogramChartData.rows = response.data.res_data.list
        // this.histogramChartData.totalCount = response.data.res_data.totalCount
      }
    });

    // 柱状图
    requestPost("/api/auth/site/business/route", null).then(response => {
      if (response.data.code === 0) {
        console.log(222);
        console.log(response.data.res_data);
        this.histogramChartData.rows = response.data.res_data.list;
        this.histogramChartData.totalCount = response.data.res_data.totalCount;
        // this.histogramChartData.rows = response.data.res_data.list
        // this.histogramChartData.totalCount = response.data.res_data.totalCount
      }
    });
  },
  methods: {
      //展示不同的列表
      handleSelect(key){
          if(key==1){
           this.tableShow1 = true;
            this.tableShow2 = false;
          }
          else if(key==2){
            this.tableShow1 = false;
            this.tableShow2 = true;
          }
      },
    toWhouseAdd() {
      this.$router.push({ name: "whreceiptBasicsManageAdd" });
    },
    toReceivableAdd() {
      this.$router.push({ name: "receiveableManageAdd" });
    }
  },
  computed: {
    throughRate() {
        // console.log(parseInt(dealpercent(this.checkThroughData.contractPercentage))===100)
        // return 60
    //     console.log(999)
    //     console.log(typeof(parseInt(dealpercent(this.checkThroughData.contractPercentage))))
       return (parseInt(dealpercent(this.checkThroughData.contractPercentage)))
    }
  }
};
</script>

<style scoped>
</style>