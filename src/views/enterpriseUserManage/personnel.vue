<template>
  <div>
   
      <div class="main_container">
   
       
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" class="addDialog">
  <el-form :model="dialogForm" :rules="rules" class="add_dialog_form" ref="dialogForm">
        <div style="margin-top:30px;" >
       <el-form-item prop='memberName' style="width:100%; margin-left:0">
      <el-input  placeholder="请输入内容"   v-model="dialogForm.memberName">
        <template slot="prepend">账号</template>
     </el-input>


       </el-form-item>
  </div>
     <div style="margin-top:30px;">
      <el-form-item prop="nickName" style="width:100%;margin-left:0;">
           <el-input placeholder="请输入内容" v-model="dialogForm.nickName">
    <template slot="prepend">员工姓名</template>
  </el-input>


      </el-form-item>
</div>
       <div style="margin-top:30px;">
           <el-form-item label="所属企业" prop="customerId"  class="searchbox-item   dialog_form_select">
            <el-select v-model="dialogForm.customerId" size="small" placeholder="请选择" style="">
              <el-option 
                     v-for="(item,index) in customerInfoList"
                   :key="index"
                   :label="item.customerName"
                   :value="item.customerId"
                >
                </el-option>
                <!-- :label="item.customerName" -->
            </el-select>
          </el-form-item>
</div>
   <div style="margin-top:30px;">
      <el-form-item label="员工角色" prop="roleId" class="searchbox-item  dialog_form_select">
            <el-select v-model="dialogForm.roleId" size="small" placeholder="请选择">
                 <el-option 
                      v-for="(item,index) in sysRoleList"
                   :key="index"
                   :label="item.roleName"
                   :value="item.roleId" 
                   
                 ></el-option>
            </el-select>
          </el-form-item>
</div>
  </el-form>
  <div slot="footer" class="dialog-footer text_center">
    <el-button  v-if="dialogStatus=='add'" type="primary" @click="addSubmit('dialogForm')">确认增加</el-button>
     <el-button v-if="dialogStatus=='edit'" v-model="dialogForm.mamberId"   type="primary" @click="editSubmit"  >确认编辑</el-button>
     <el-button v-if="dialogStatus=='show'"  type="primary" @click="dialogFormVisible =false"    >确认显示</el-button>
     
    <el-button @click="canCelDialog(dialogForm)">取 消</el-button>
    
  </div>
</el-dialog>
        
        <el-form ref="searchForm" :model="searchForm">
          <!-- addDialogShow -->
                <el-form-item class="add_box m0">
                    <el-button type="primary" icon="el-icon-add" @click="addDialogShow"  class="primary_btn"  ><i class="el-icon-plus"></i> 新增</el-button> 
                </el-form-item>
          <div class="pull-right personel_form_box">
              <el-form-item label="员工角色" prop="roleId" class="searchbox-item personel_form_select  nopadding">
               <el-select v-model="searchForm.roleId" size="small" placeholder="请选择">
         
               <el-option 
                      v-for="(item,index) in sysRoleList"
                   :key="index"
                   :label="item.roleName"
                   :value="item.roleId" 
                   
                 ></el-option>
                 
              </el-select>
            
          </el-form-item>
           
             <el-form-item label="账号状态" class="searchbox-item personel_form_select">
            <el-select  v-model="searchForm.accountStatus" size="small" placeholder="请选择">
            
                 <!-- <el-option 
                      v-for="(item,index) in sysRoleList"
                   :key="index"
                     :label="item.status==1?'已启用':'已禁用'"
                   :value="item.status" 
                   >
                 </el-option> -->
                   <el-option label="已启用" value="1"></el-option>
                <el-option label="已禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
          
            <el-form-item label="企业关联状态" class="searchbox-item personel_form_select">
            <el-select  v-model='searchForm.customerRelevance'  size="small" placeholder="请选择">
              
                <!-- <el-option 
                      v-for="(item,index) in customerInfoList"
                   :key="index"
                     :label="item.status=='1'?'已关联':'未关联'"
                   :value="item.status" 
                   
                 ></el-option> -->
                   <el-option label="已关联" value="1"></el-option>
                <el-option label="未关联" value="2"></el-option>

            </el-select>
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
           
            <el-form-item label="" class="searchbox-item header_search_text ">
            <el-input placeholder="请输入关键字" size="" v-model="searchData" class="input-with-select">
              <el-select  slot="prepend" v-model="select">
                <el-option label="账号" value="1"></el-option>
                <el-option label="所属企业" value="2"></el-option>
                
              </el-select>
            </el-input>
          </el-form-item>
            <el-form-item>
            <el-button icon="el-icon-search "  class="search_btn" type="warning" size="small" @click="searchfn" >搜索</el-button>
          </el-form-item>
          </div>

        </el-form>
        <el-table :data="tableData" highlight-current-row
    @current-change="handleCurrentChange" style="width:100%" :header-cell-style="headerStyle"  stripe >
           <el-table-column
             type="index"
             label="序号"
             width="50">
           </el-table-column>
             <el-table-column
                 prop="memberName"
                 label="账号"
                 align="center"
                 >
               <template slot-scope="scope">
                    <el-button type="text"  @click="showInfo(scope.row.memberId)" size='small'    > {{scope.row.memberName}}</el-button> 
               </template>
             </el-table-column>
             <el-table-column
                 prop="customerName"
                 label="所属企业"
                  align="center"
                 >
                 
             </el-table-column>
             <el-table-column
                 prop="roleName"
                 label="员工角色"
                 align="center"
                 >
             </el-table-column>
             <el-table-column
             prop="status"
             label="账号状态"
             align="center"
           >
              <template slot-scope="scope">
                     <div v-if="scope.row.status=='2'">
                      已启用
                     </div>
                      <div v-if="scope.row.status=='4'">
                      已禁用
                     </div>
               </template>
           </el-table-column>
           <el-table-column
             prop="customerRelevance"
             label="企业关联状态"
             align="center"
           >
           </el-table-column>
           <el-table-column
             prop="reviewTime"
             label="操作时间"
             align="center"
           >
               <template slot-scope="scope">
                    {{scope.row.reviewTime}}
               </template>

           </el-table-column>
           <el-table-column
             prop="operationName"
             label="操作人"
             align="center"
           >
              <template slot-scope="scope">
                    {{scope.row.reviewTime}}
               </template>
           </el-table-column>
           <el-table-column
             prop="operation"
             label="操作"
             align="center"
             
           >
             <template slot-scope="scope">
               
              <!-- <el-button type="text"  @click="editshowDialog(scope.row.memberId)"> 编辑</el-button>  -->
              <el-button type="text"  @click="editshowDialog(scope.row,scope.$index)"> 编辑</el-button> 
              
              <div v-if="scope.row.status == '4'">
                <el-button @click=" operationClick(scope.row.memberId,2)" type="text" size="small" style="color: #fe9c21;">
                  启用
                </el-button>
              </div>
              <div v-if="scope.row.status == '2'">
                <el-button @click="operationClick(scope.row.memberId,4)" type="text" size="small" style="color: #fe9c21;">
                  禁用
                </el-button>
              </div>
               <el-button @click="resetPassword()" type="text" size="small" style="color: #fe9c21">重置密码</el-button>
                 <el-dialog
  title="提示"
  :visible.sync="resetPasswordDialogVisible"
  width="30%"
   >
  <span>您将重置该用户的登录密码，原登录密码将无法使用！</span>
  <span>请确认是否重置密码！</span>
  <span slot="footer" class="dialog-footer">
   
    <el-button type="primary" @click="confirmResetPassword(scope.row.memberId)">确 定</el-button>
     <el-button @click="canCelResetPassword()">取 消</el-button>
  </span>
</el-dialog>
             </template>
           </el-table-column>
        </el-table>
           
        
      </div>
        

    
    <pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pagination="init" />

   
  </div>
   

</template>

<script>
import { requestPost, request } from "@/api/parent";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      headerStyle: {
        background: "#f8f9fb",
        "text-align": "center",
        color: "black"
      },
      total: 0,
      pageNum: 1,
      pageSize: 10,
      operationTime: [
        new Date(2000, 10, 10, 10, 10),
        new Date(2000, 10, 11, 10, 10)
      ],
      userId: "",
      status: "",
      roleId: "",
      roleName: "",
      customerRelevance: "",
      customerName: "",
      roleCode: "",
      reviewTime: "",
      searchData: "",
      search: "",
      tableData: [],
      dialogFormVisible: false,
      resetPasswordDialogVisible: false,
      dialogStatus: "",
      textMap: {
        add: "增加",
        edit: "编辑",
        show: "查看"
      },
      startTime: null,
      endTime: null,
      dateTime: null,
      systemList: "",
      customerInfoList: "",
      value: "",
      dialogForm: {
        //表单数据初始化
        memberId: "",
        nickName: "",
        memberName: "",
        customerName: "",
        roleName: "",
        customerId: "",
        roleId: ""
      },
      select: "", //动态select搜索

      searchForm: {
        //搜索数据初始化
        customerRelevance: "",

        roleId: "",
        accountStatus: "",
        startTime: "",
        endTime: "",
        memberName: "",
        customerName: ""
      },
      formLabelWidth: "120px",
      //加载弹框表单下拉内容
      customerInfoList: [],
      sysRoleList: [],
      rules: {
        memberName: [
          { required: true, message: "请填写账号", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        nickName: [
          { required: true, message: "请填写员工姓名", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],

        customerId: [
          { required: true, message: "请选择所属企业", trigger: "blur" }
        ],
        roleId: [{ required: true, message: "请选择员工角色", trigger: "blur" }]
      }
    };
  },
  created() {
    requestPost("/api/auth/user/showDataLoad").then(response => {
      if (response.data.code === 0) {
        //  this.systemList =  response.data.res_data.sysRoleList
        //  console.log(this.systemList);
      }

      this.customerInfoList = response.data.res_data.customerInfoList;
      this.sysRoleList = response.data.res_data.sysRoleList;
      this.init();
    });
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    canCelDialog(formName) {
      this.$refs["dialogForm"].resetFields();
      // this.cleardialogForm()
      this.dialogFormVisible = false;
    },
    canCelResetPassword() {
      this.resetPasswordDialogVisible = false;
    },
    confirmResetPassword(memberId) {
      let data = {
        memberId: memberId
      };
      requestPost("/api/auth/user/resetPassword", data).then(response => {
        if (response.data.code === 0) {
          this.$message({
            showClose: true,
            message: "操作成功",
            type: "success"
          });
          this.resetPasswordDialogVisible = false;
        }
      });
    },
    operationClick(memberId, status) {
      let data = {
        memberId: memberId,
        status: status
      };
      requestPost("/api/auth/user/operationStatus", data).then(response => {
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

    cleardialogForm() {
      // 清空弹窗编表单
      this.dialogForm.nickName = "";
      this.dialogForm.memberName = "";
      this.dialogForm.customerName = "";
      this.dialogForm.roleName = "";
    },
    showInfo(memberId) {
      this.dialogStatus = "show";
      this.dialogFormVisible = true;
      let data = {
        memberId: memberId
      };
     
      requestPost("/api/auth/user/show", data).then(response => {
        // console.log(response);
        if (response.data.code === 0) {
          this.dialogForm.nickName = response.data.res_data.userInfo.nickName;
          this.dialogForm.memberName =
            response.data.res_data.userInfo.memberName;
          this.dialogForm.customerName =
            response.data.res_data.customerInfo.customerName;
          this.dialogForm.roleName =
            response.data.res_data.sysRoleUser.roleName;
        }
      });
      requestPost("/api/auth/user/showDataLoad").then(response => {
        console.log(response.data.res_data);
        this.customerInfoList = response.data.res_data.customerInfoList;
        this.sysRoleList = response.data.res_data.sysRoleList;
      });
    },
    editshowDialog(row, index) {
      this.dialogStatus = "edit";
      this.cleardialogForm();
      this.dialogFormVisible = true;
      let showData = {
        memberId: row.memberId
      };
      requestPost("/api/auth/user/show", showData).then(response => {
        if (response.data.code === 0) {
          this.dialogForm.nickName = response.data.res_data.userInfo.nickName;
          this.dialogForm.memberName =
            response.data.res_data.userInfo.memberName;
          this.dialogForm.customerName =
            response.data.res_data.customerInfo.customerName;
          this.dialogForm.roleName =
            response.data.res_data.sysRoleUser.roleName;
          this.dialogForm.memberId = row.memberId;
        }
      });
      requestPost("/api/auth/user/showDataLoad").then(response => {
        console.log(response.data.res_data);
        this.customerInfoList = response.data.res_data.customerInfoList;
        this.sysRoleList = response.data.res_data.sysRoleList;
      });
    },
    editSubmit() {
      let editData = {
        memberId: this.dialogForm.memberId,
        memberName: this.dialogForm.memberName,
        nickName: this.dialogForm.nickName,
        customerId: this.dialogForm.customerId,
        roleId: this.dialogForm.roleId
      };
      console.log(this.dialogForm);
      requestPost("/api/auth/user/edit", editData).then(response => {
        if (response.data.code === 0) {
          this.$message({
            showClose: true,
            message: "更新成功",
            type: "success"
          });
          this.dialogFormVisible = false;
          this.init();
        }
      });
    },

    addDialogShow(index, row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "add";
      this.cleardialogForm();
      requestPost("/api/auth/user/showDataLoad").then(response => {
        console.log(response.data.res_data);
        this.customerInfoList = response.data.res_data.customerInfoList;
        this.sysRoleList = response.data.res_data.sysRoleList;
      });
    },
    searchfn() {
      let memberName = null;
      let customerName = null;
      if (this.select == 1) {
        memberName = this.searchData;
      } else if (this.select == 2) {
        customerName = this.searchData;
      }
      let searchData = {
        //搜索数据
        startTime: this.startTime,
        endTime: this.endTime,
        roleName: this.searchForm.roleName,
        " customerId": this.searchForm.customerId,
        roleId: this.searchForm.roleId,
        status: this.searchForm.accountStatus,
        customerRelevance: this.searchForm.customerRelevance,
        memberName: memberName,
        customerName: customerName,
        page: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      };
      requestPost("/api/auth/user/list", searchData).then(response => {
        if (response.data.code === 0) {
          response.data.res_data.list.forEach(item => {});
          this.tableData = response.data.res_data.list;
          this.total = response.data.res_data.total;
        }
      });
    },
    addSubmit(formName) {
      //新增提交

      this.$refs[formName].validate(valid => {
        if (valid) {
          let addData = {
            memberName: this.dialogForm.memberName,
            nickName: this.dialogForm.nickName,
            customerId: this.dialogForm.customerId,
            roleId: this.dialogForm.roleId
          };

          requestPost("/api/auth/user/add", addData).then(response => {
            if (response.data.code === 0) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.$refs[formName].resetFields();
              this.dialogFormVisible = false;
              this.init();
            } else if (response.data.code === 10003) {
              this.$message({
                showClose: true,
                message: "账号已存在",
                type: "warn"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
          this.dialogFormVisible = false;
        }
      });
    },
    resetPassword(memberId) {
      this.resetPasswordDialogVisible = true;
    },
    init() {
      this.tableData = [];
      this.status = null;
      this.roleId = null;
      this.userName = null;
      this.customerRelevance = null;
      this.customerName = null;

      this.reviewTime = null;

      let data = {
        page: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      };
      requestPost("/api/auth/user/list", data).then(response => {
        if (response.data.code === 0) {
          this.tableData = response.data.res_data.list;
          this.total = response.data.res_data.total;
        }
      });
    }
  },
  components: {
    Pagination
  },
  watch: {
    dateTime(dateTime) {
      if (dateTime !== null && dateTime.length > 1) {
        this.startTime = dateTime[0].getTime();
        if (this.startTime === dateTime[1].getTime()) {
          this.endTime = dateTime[1].getTime() + 3600 * 24 * 1000;
        }
      } else {
        this.startTime = null;
        this.endTime = null;
      }
    }
  }
};
</script>

<style scoped>
.el-button--warning.search_btn {
  width: 90px;
}
</style>
