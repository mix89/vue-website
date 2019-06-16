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
            <div class="order_number_box" style="width:288px;">
                <div class="tit">仓单数(个）</div>
                <div class="num">{{showNumber.whreceiptCountData.whreceiptCount}}</div>
                <div class="tips">结束率：{{ whreceiptCountDataRate }}%</div>
            </div>
            <!-- <div class="order_number_box">
                <div class="tit">应收数(个）</div>
                <div class="num">{{showNumber.receivableCountData.receivableCount}}</div>
                <div class="tips">结束率：{{ receivableCountDataRate }}%</div>
            </div> -->
            <div class="order_number_box disabled" style="width:288px;">
                <div class="tit">订单数(个）</div>
                <div class="num">0</div>
                <div class="tips">结束率：0%</div>
            </div>
            <div class="order_number_box disabled" style="width:288px;">
                <div class="tit">资产包(个）</div>
                <div class="num">0</div>
                <div class="tips">结束率：0%</div>
            </div>
        </div>
        <div class="layout_checkInfo fix">
            <div class="layout_l">
                <div class="check_bussiness_list">
                    <!-- 价值评估列表 -->
                    <valueList/>
                </div>
            </div>
            <div class="layout_r">
                <div class="used_data_box" style="height:390px;">
                        <div class="tit">业务数据分布</div>
                        <div class="overlay"></div>
                        <div class="total_num" style="left:166px;">
                            <span>总计</span>
                            {{ringChartData.totalCount}}
                        </div>
                        <div>
                            <ve-ring
                                height="360px"
                                :data="ringChartData"
                                :settings="ringChartSettings"
                                :extend="ringChartExtend"
                                :colors="ringColors"
                                :events="ringEvents"
                            >
                                <!-- :data-empty="ringDataEmpty" -->
                                <!-- <div class="data-empty">没有数据</div> -->
                            </ve-ring>
                        </div>
                    </div>     
            </div>
        </div>
    
 
    </div>
</template>

<script>
// import VeLine from 'v-charts/lib/line.common'
import "v-charts/lib/style.css";
import VeRing from "v-charts/lib/ring.common";
import { requestPost } from "@/api/parent";
import infoList from "@/views/frontdashboard/infoList";
import valueList from "@/views/frontdashboard/value/valueList"
import {dealnumber} from '@/utils/filters'

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
    };
    this.ringColors = ["#00ACF3", "#DBDBDB", "#7543F2"];
    this.ringChartExtend = {
      series(v) {
        v.forEach(i => {
          //   i.barWidth = 24;
          // i.pie.label.position = 'inside'
        });
        return v;
      }
    };
    var self = this
    // 点击饼状图
    this.ringEvents = {
        click:function(e){
            self.name = e.name
            console.log(e)
        }
    }

    return {
      // #2
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
      ringChartData: {
        columns: ["name", "count"],
        rows: [
            // { name: "进入智能合约", count: 400, },
            // { name: "取消发布", count: 600, },
            // { name: "已驳回", count: 200, },
        ],
        totalCount: 0
      },

    };
  },
  components: { VeRing,infoList,valueList },
  created() {
    // #3
        

       //企业管理账号首页制单个数数据统计
       requestPost("/api/auth/site/thirdParty/index",{customerType:3}).then(response => {
        if (response.data.code === 0) {
         this.showNumber.countData = response.data.res_data.countData
         this.showNumber.whreceiptCountData = response.data.res_data.whreceiptCountData
         this.showNumber.receivableCountData =  response.data.res_data.receivableCountData
        }
      }); 

    // 环状图
    requestPost("/api/auth/site/thirdParty/distribution",{customerType:3}).then(response => {
      if (response.data.code === 0) {
        this.ringChartData.rows = response.data.res_data.list.splice(0,1);
        this.ringChartData.totalCount = response.data.res_data.totalCount;
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