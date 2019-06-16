<template>
    <div>
        <div class="order_number_container mt10">
            <div class="order_number_box--total">
                <div class="tit">业务总数(个）</div>
                <div class="num fix">
                    {{showNumber.countData.count}} 
                    <div class="tips">结束率：{{ countDateRate }}%</div>
                </div>
            </div>
            <div class="order_number_box">
                <div class="tit">仓单数(个）</div>
                <div class="num">{{showNumber.whreceiptCountData.whreceiptCount}}</div>
                <div class="tips">结束率：{{ whreceiptCountDataRate }}%</div>
            </div>
            <div class="order_number_box">
                <div class="tit">应收数(个）</div>
                <div class="num">{{showNumber.receivableCountData.receivableCount}}</div>
                <div class="tips">结束率：{{ receivableCountDataRate }}%</div>
            </div>
            <div class="order_number_box disabled">
                <div class="tit">订单数(个）</div>
                <div class="num">0</div>
                <div class="tips">结束率：0%</div>
            </div>
            <div class="order_number_box disabled">
                <div class="tit">资产包(个）</div>
                <div class="num">0</div>
                <div class="tips">结束率：0%</div>
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
            <div class="whole_every_step">
                <span class="num">03</span>
                <span class="tit">信息审核</span>
                <span class="member">（审核人）</span>
            </div>
            <div class="whole_every_step step_4 disabled">
                <span class="num">04</span>
                <span class="tit">评估机构</span>
            </div>
            <div class="whole_every_step">
                <span class="num">05</span>
                <span class="tit">申请融资</span>
                <span class="member">（审核人）</span>
            </div>
            <div class="whole_every_step step_6 disabled">
                <span class="num">06</span>
                <span class="tit">进入智能合约</span>
            </div>
        </div>
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
                    <div class="used_data_box">
                        <div class="overlay"></div>
                        <div class="tit">已结束数据</div>
                        <div class="total_num"><span>总计</span>{{ringChartData.totalCount}}</div>
                        <div>
                             <ve-ring
                          
                                height="360px"
                                :data="ringChartData"
                                :settings="ringChartSettings"
                                :extend="ringChartExtend"
                                :colors="ringColors"
                            >
                                <!-- :data-empty="ringDataEmpty" -->
                                <!-- <div class="data-empty">没有数据</div> -->
                            </ve-ring>   
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script>
import "v-charts/lib/style.css";
import VeHistogram from "v-charts/lib/histogram.common";
import VeRing from "v-charts/lib/ring.common";
import { requestPost } from "@/api/parent";
import {dealnumber} from '@/utils/filters'

export default {
  data() {
    //环形图
    this.ringChartSettings ={
        radius:[55,105],
        // offsetX:0,
         offsetY:160,
         label:{
             show:false
         }
    //     labelMap: {
    //     status: "状态",
    //     whOrder: "仓单",
    //   }

    }
    this.ringColors = ["#00ACF3","#DBDBDB","#7543F2"]
    this.ringChartExtend = {
         series(v) {
        v.forEach(i => {
        //   i.barWidth = 24;
        console.log(333)
        console.log(i)
        // i.pie.label.position = 'inside'
        });
        return v;
      }
    }

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

        //仓单数展示
        showNumber:{
            countData:{
                count:0,
                percentage:0
            },
            whreceiptCountData:{
                whreceiptCount:0,
                percentage:0
            },
            receivableCountData:{
                whreceiptCount:0,
                percentage:0
            },
            totalCount:0
        },

       //环形图 
      ringChartData:{
        columns: ["name", "count"],
        rows: [
        //   { name: "进入智能合约", finishedOrder: 400, },
        //   { name: "取消发布", finishedOrder: 600, },
        //   { name: "已驳回", finishedOrder: 200, },
        ],
         totalCount:0,
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
        totalCount:0,
        histogramDataEmpty: true
      }
    };
  },
  components: { VeHistogram,VeRing},
  created(){
      //企业管理账号首页制单个数数据统计
       requestPost("/api/auth/site/admin/index",null).then(response => {
        if (response.data.code === 0) {
         this.showNumber.countData = response.data.res_data.countData
         this.showNumber.whreceiptCountData = response.data.res_data.whreceiptCountData
         this.showNumber.receivableCountData =  response.data.res_data.receivableCountData
        }
      }); 
      // 柱状图
        requestPost("/api/auth/site/admin/route",null).then(response => {
        if (response.data.code === 0) {
            this.histogramChartData.rows = response.data.res_data.list
            this.histogramChartData.totalCount = response.data.res_data.totalCount
        }
      }); 
    // 环状图 
         requestPost("/api/auth/site/admin/end",null).then(response => {
        if (response.data.code === 0) {
            this.ringChartData.rows = response.data.res_data.list
            this.ringChartData.totalCount = response.data.res_data.totalCount
        }
      }); 
  },
  computed:{
      countDateRate(){
          return (dealnumber(this.showNumber.countData.percentage))
      },
      whreceiptCountDataRate(){
          return (dealnumber(this.showNumber.whreceiptCountData.percentage))
      },
      receivableCountDataRate(){
          return (dealnumber(this.showNumber.receivableCountData.percentage))
      }   
  }

};
</script>

<style scoped>
/* .data-empty{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
} */
</style>