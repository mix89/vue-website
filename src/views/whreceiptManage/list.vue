<template>
  <div>
    <PageHead/>
    <div class="page_container">
      <!--<div class="page_title_main page_vice">
        &lt;!&ndash; tab页 &ndash;&gt;
        <div class="page_tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="first">
              <div>
                &lt;!&ndash; 顶部搜索框 &ndash;&gt;
                <el-form>
                  <div class="search_box">
                    <el-form-item class="button-item">
                      <router-link :to="{ name: 'whreceiptManageAdd',query:{add:'1'}}">
                        <el-button type="primary" icon="el-icon-add" class="primary_btn">
                          <i class="el-icon-plus"></i>新增
                        </el-button>
                      </router-link>
                    </el-form-item>
                    <el-form-item label="状态" class="select-item">
                      <el-select v-model="status" size="small" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="申请融资中" value="1"></el-option>
                        <el-option label="风险待评估" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="制单时间" class="datepicker-item" ref="cde">
                      <el-date-picker
                        v-model="dateTime"
                        type="daterange"
                        size="small"
                        placeholder="选择日期时间"
                        range-seperator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy.MM.dd"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="" class="searchbox-item">
                      <el-input placeholder="请输入关键字" v-model="searchData" clearable>
                        <el-select v-model="select" slot="prepend">
                          <el-option label="用户名" value="1"></el-option>
                          <el-option label="姓名" value="2"></el-option>
                          <el-option label="联系电话" value="3"></el-option>
                          <el-option label="所属部门" value="4"></el-option>
                          <el-option label="角色" value="5"></el-option>
                        </el-select>
                      </el-input>
                    </el-form-item>
                    <el-form-item class="button-item">
                      <el-button
                        icon="el-icon-search "
                        class="search_btn"
                        type="warning"
                        size="small"
                        @click="init"
                      >搜索</el-button>
                    </el-form-item>
                  </div>
                </el-form>
                &lt;!&ndash; 表格展示 &ndash;&gt;
                <el-table
                  ref="singleTable"
                  :data="tableData"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  style="width: 100%"
                >
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column property="date" label="日期" width="120"></el-table-column>
                  <el-table-column property="name" label="姓名" width="120"></el-table-column>
                  <el-table-column property="address" label="地址"></el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
                  <el-button @click="setCurrent()">取消选择</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="待确认" name="second">222</el-tab-pane>
            <el-tab-pane label="已确认" name="third">333</el-tab-pane>
            <el-tab-pane label="驳回" name="four">444</el-tab-pane>
          </el-tabs>
        </div>
      </div></div>-->
    <whreceipt-financing-list></whreceipt-financing-list>
    </div>
  </div>
</template>

<script>
import PageHead from "@/views/layout/components/PageHead";
import whreceiptFinancingList from "@/views/whreceiptManage/financing/list";

export default {
  components:{
    PageHead,
    whreceiptFinancingList
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      currentRow: null,
      activeName: "first"
    };
  },
  created(){

  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
};
</script>
