<template>
  <div>
    <div>
      <el-menu :default-active="''" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index = '' class="tab_item">全部</el-menu-item>
        <el-menu-item index = 2 class="tab_item" >已启用</el-menu-item>
        <el-menu-item index = 4 class="tab_item" >已禁用</el-menu-item>
        <el-menu-item index = 3 class="tab_item" >已驳回</el-menu-item>
        <el-menu-item index = 1 class="tab_item" >待审核</el-menu-item>
      </el-menu>
      <div class="main_container">
        <el-form>
          <div class="pull-right">
            <el-form-item class="add_box">
              <router-link :to="{ path: 'enterpriseUserManageAdd',query:{add:'1'}}">
                <el-button type="primary" icon="el-icon-add" class="primary_btn"  ><i class="el-icon-plus"></i> 新增</el-button>
              </router-link>
            </el-form-item>

            <el-form-item label="账号类型" class="searchbox-item status_item" >
              <div style="float: left;width:82%;">

                <el-select v-model="customerType" size="small" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in accountStatusList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>

            <el-form-item label="操作时间" class="datepicker-item" ref="cde">
              <el-date-picker
                v-model="dateTime"
                type="daterange"
                size="small"
                placeholder="选择日期时间"
                range-seperator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy.MM.dd">
              </el-date-picker>
            </el-form-item>


            <el-form-item label="状态" class="searchbox-item status_item" >
              <div style="float: left;width:82%;">

                <el-select v-model="statusObj" clearable size="small" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in optionList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>


            <el-form-item label="" class="searchbox-item header_search_text">
              <el-input placeholder="请输入关键字" v-model="searchData" class="input-with-select">
                <el-select v-model="select" slot="prepend">
                  <el-option label="企业名称" value="1"></el-option>
                  <el-option label="账号" value="2"></el-option>
                  <el-option label="法人代表" value="3"></el-option>
                </el-select>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button icon="el-icon-search" type="warning" size="small" @click="init">搜索</el-button>
            </el-form-item>
          </div>
        </el-form>
        <div>

        </div>
        <el-table :data="tableData" style="width:100%">
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="customerCode"
            label="企业ID"
            width="180"
          >
            <template slot-scope="scope">
              <el-button @click="toShow(scope.row.customerId)" type="text" size="small">{{scope.row.customerCode}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="企业名称"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="loginAccount"
            label="账号"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="customerType"
            label="账号类型"
            width="180"
          >
            <template slot-scope="scope">
              <span v-for="item in accountStatusList" v-if="item.key == scope.row.customerType">{{item.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="legalName"
            label="法人代表"
            width="180"
          >
 <!--           <template slot-scope="scope">
              <span >{{scope.row.startTime | formartDate('') }}</span>
              -
              <span >{{scope.row.endTime | formartDate('') }}</span>
            </template>-->
          </el-table-column>
          <el-table-column
            prop="contactName"
            label="联系人"
            width="180"
          >
            <!--<template slot-scope="scope">{{scope.row.totalAmount | currency('') }}</template>-->
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话"
            width="180"
          >
            <!--<template slot-scope="scope">{{scope.row.createtime | formartDate('') }}</template>-->
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="180"
          >
            <template slot-scope="scope">
              <span v-for="item in statusList" v-if="item.key == scope.row.status">{{item.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="reviewTime"
            label="操作时间"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="reviewName"
            label="操作人"
            width="180"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="300"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.status == '2'">
                <el-button @click="startClick(scope.row.customerId,4)" type="text" size="small" style="color: #fe9c21">
                  禁用
                </el-button>
                <el-button @click="toEdit(scope.row.customerId)" type="text" size="small">编辑</el-button>
                <el-button @click="resetPassword(scope.row.memberId)" type="text" size="small">重置密码</el-button>
                <el-button @click="resetPassword(scope.row.customerId)" type="text" size="small">信用评级</el-button>
              </div>
              <div v-if="scope.row.status == '4'">
                <el-button @click="startClick(scope.row.customerId,2)" type="text" size="small" style="color: #fe9c21">
                  启用
                </el-button>
                <el-button @click="toEdit(scope.row.customerId)" type="text" size="small">编辑</el-button>
                <el-button @click="resetPassword(scope.row.memberId)" type="text" size="small">重置密码</el-button>
              </div>
              <!-- <div v-if="scope.row.status == '3'">
                <el-button @click="handleClick(scope.row.customerId)" type="text" size="small">重新提交</el-button>
              </div> -->
              <div v-if="scope.row.status == '1'">
                <el-button @click="changeStatus(scope.row.customerId,2)" type="text" size="small">审核</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pagination="init" />

  </div>
</template>

<script>
  import { requestPost } from '@/api/parent'
  import { currency } from '@/utils/index'
  import Pagination from '@/components/Pagination'
  export default {
    components: { Pagination },
    data(){
      return {
        statusObj:'',
        customerType:'',
        accountStatusList:[
          {key:'',value:'全部'},
          {key:1,value:'融资方'},
          {key:2,value:'第三方保管机构'},
          {key:3,value:'第三方价值评估机构'},
          {key:4,value:'第三方风险评估机构'}
        ],



        startAmount:'',
        endAmount:'',
        status:'',
        optionList:[
          {key:'',value:'全部'},
          {key:1,value:'待审核'},
          {key:2,value:'已经启用'},
          {key:4,value:'待价值评估'},
          {key:5,value:'待风险评估'},
          {key:6,value:'凭证待确认'},
          {key:9,value:'已确认'},
          {key:10,value:'审核驳回'},
          {key:7,value:'凭证驳回'}
        ],
        statusList:[
          {key:0,value:'全部'},
          {key:1,value:'审核中'},
          {key:2,value:'启用'},
          {key:3,value:'已驳回'},
          {key:4,value:'禁用'},
          {key:5,value:'作废'}
        ],
        total:0,
        pageNum:1,
        pageSize:10,

        startTime:null,
        endTime:null,
        searchData:'',
        select:"1",

        phone:null,
        permissionNames:'',
        operation:'',
        tableData:[],
        dateTime:null,
      }
    },
    created(){
      this.init()
    },
    methods:{
      handleSelect(key, keyPath){
        this.status = key
        this.init()
      },
      resetPassword(memberId){
        requestPost('/api/auth/user/resetPassword',{'memberId':memberId}).then(response => {
          if(response.data.code === 0){
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            });
            this.init()
          }
        })
      },
      startClick(customerId,status){
        let msg = ''
        if(status == 4){
          msg = '禁用之后该用户将无法正常使用！请确认是否禁用该用户！'
        }
        if(status == 2){
          msg = '启用之后，该用户可重新进行交易！请确认是否启用该用户！'
        }
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeStatus(customerId,status)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      changeStatus(customerId,status){
        let data = {
          'customerId':customerId,
          'status':status
        }
        requestPost('/api/auth/customer/changeStatus',data).then(response => {
          if(response.data.code === 0){
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            });
            this.init()
          }
        })
      },
      toEdit(customerId){
        this.$router.push({ path: 'enterpriseUserManageEdit',query:{customerId:customerId}})
      },
      toShow(customerId){
        this.$router.push({ name: 'enterpriseUserManageShow',query:{customerId:customerId}})
      },
      handleClick(userId){
        this.$router.push({ path: 'adminManageEdit',query:{userId:userId}})
      },
      init(){
        this.tableData = []
        let customerName = null
        let loginAccount = null
        let legalName = null
        let wName = null
        let createName = null
        if(this.select === '1'){
          customerName = this.searchData
        }else if(this.select === '2'){
          loginAccount = this.searchData
        }else if(this.select === '3'){
          legalName = this.searchData
        }
        let data = {
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,
          "startTime":this.startTime,
          "endTime":this.endTime,
          "status":this.status,
          "startAmount":this.startAmount,
          "endAmount":this.endAmount,
          "customerType":this.customerType,

          "customerName":customerName,
          "loginAccount":loginAccount,
          "legalName":legalName,
        }
        requestPost('/api/auth/customer/list',data).then(response => {
          if(response.data.code === 0){
            this.tableData = response.data.res_data.list
            this.total = response.data.res_data.total
          }else if(response.data.code === 403){
            this.$message({
              message: response.data.msg,
              type: 'warning'
            });
          }
        })
      },
      toAdd(){
        this.$router.push({ path: 'adminManageAdd',query:{add:'1'}})
      },
      onSubmit(formName){
        this.init()
      },
    },
    watch:{
      dateTime(dateTime){
        if(dateTime !== null && dateTime.length > 1){
          this.startTime = dateTime[0].getTime()
          if(this.startTime === dateTime[1].getTime()){
            this.endTime = dateTime[1].getTime() + (3600 * 24 * 1000)
          }
        }else {
          this.startTime = null
          this.endTime = null
        }
      },
      select(select){
        this.searchData = null
      },
      statusObj(obj){
        this.status = obj
        this.init()
      }
    }
  }
</script>

<style scoped>

</style>
