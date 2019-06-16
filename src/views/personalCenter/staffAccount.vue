<template>
  <div>
    <!-- 顶部搜索框 -->
    <el-form :modal="searchForm" ref="searchEle">
      <div class="fix">
        <div style="float:right;margin-right:20px;">
          <div class="search_box">
            <el-form-item class="button-item">
              <el-button
                type="primary"
                icon="el-icon-add"
                class="primary_btn"
                @click="addDialogShow"
              >
                <i class="el-icon-plus"></i>
                新增
              </el-button>
            </el-form-item>
            <el-form-item label="员工角色" class="select-item w200">
              <el-select v-model="searchForm.roleId" size="small" placeholder="请选择">
                <el-option
                  v-for="item in defaultList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号" class="custom-item">
              <el-input placeholder="请输入内容" v-model="searchForm.memberName"></el-input>
            </el-form-item>
            <el-form-item class="button-item">
              <el-button
                icon="el-icon-search "
                class="search_btn"
                type="warning"
                size="small"
                @click="searchFn"
              >搜索</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      :header-row-class-name="customTableheader"
      :highlight-current-row="true"
      :cell-class-name="tableCellClass"
      style="width:100%;height:372px;"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="账号" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div class="ellipse_hide" style="width:170px">
            <el-button type="text" @click="showDialog(scope.row.memberId)">{{scope.row.memberName}}</el-button>
            <!-- <el-tooltip class="item" effect="dark" :content="scope.row.memberName" placement="bottom">
            </el-tooltip>-->
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="员工角色"></el-table-column>
      <el-table-column prop="customerRelevance" label="关联状态"></el-table-column>
      <el-table-column prop="handleTime" label="操作时间"></el-table-column>
      <el-table-column prop="handleName" label="操作人"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.roleCode == 'L1000'">
            <div>
              <div class="operation_finished">
                <span></span>
              </div>
            </div>
          </div>
          <div v-else>
            <el-button
              type="text"
              @click="editshowDialog(scope.row,scope.$index)"
              class="info_txt"
            >编辑</el-button>
            <el-button
              type="text"
              class="info_txt resetpassword"
              @click="resetPassword(scope.row.memberId)"
            >重置密码</el-button>
            <el-button type="text" @click="alertDelete(scope.row.memberId)" class="waiting_txt">删除</el-button>
          </div>






          <!-- 重置密码提示 -->
          <el-dialog
            title="提示"
            :visible.sync="resetPasswordDialogVisible"
            class="check_dialogue_small"
          >
            <div>
              <div style="text-align:center;margin-top:20px;font-size:16px;">
                <div>您将重置该用户的登录密码，原登录密码将无法使用！</div>
                <div class="mt10">请确认是否重置密码！</div>
              </div>
              <div>
                <!-- #2 -->
                <el-form>
                  <el-form-item class="submit_buttons" style="margin-top:20px;">
                    <el-button
                      type="primary"
                      @click="confirmResetPassword(resetForm.usermemberId)"
                      class="primary_btn"
                      style="width:140px;"
                    >确认</el-button>
                    <!-- {{scope.row.memberId}} -->
                    <el-button
                      @click="resetPasswordDialogVisible=false"
                      class="cancel_btn"
                      style="margin-left:50px;width:140px;"
                    >取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-dialog>



          <!-- 重置密码提示结束 -->
          <!-- 删除密码提示框 -->
          <el-dialog title="提示" :visible.sync="visbleSingleDialogue2" class="check_dialogue_small">
            <div>
              <div style="text-align:center;margin-top:20px;font-size:16px;">
                <div>删除之后该用户将无法操作我司相关业务！</div>
                <div class="mt10">请确认是否删除该用户！</div>
              </div>
              <div>
                <el-form>
                  <el-form-item class="submit_buttons" style="margin-top:20px;">
                    <el-button
                      type="primary"
                      @click="singleDialogue2(deleteForm.usermemberId)"
                      class="primary_btn"
                      style="width:140px;"
                    >确认</el-button>
                    <el-button
                      @click="cancelsingleDialogue2"
                      class="cancel_btn"
                      style="margin-left:50px;width:140px;"
                    >取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
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
    <!--编辑的弹框-->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      class="check_dialogue_large"
    >
      <div>
        <!-- #33 -->


        <div class="change_password_inner">
          <div class="search_box inner_assess" style="margin-left:50px;margin-top:20px;">
            <!-- 弹框show -->
            <div v-if="dialogStatus=='show'">
              <el-form
                :model="dialogForm"
                class="add_dialog_form"
              >
                <!-- :disabled="disabledFn()" -->
                <el-form-item label="账号" class="custom-item input_box_disabled" disabled="disabled">
                  <div>
                    <el-input v-model="dialogForm.memberName" disabled></el-input>
                  </div>
                </el-form-item>
                <el-form-item
                  label="员工姓名"
                  class="custom-item mt20 input_box_disabled"
                >
                  <div class="">
                    <el-input v-model="dialogForm.nickName" disabled="disabled"></el-input>
                  </div>
                </el-form-item>
                <el-form-item
                  label="员工角色"
                  class="select-item mt20 input_box_disabled"
                >
                  <div class="box_required">
                    <el-select v-model="dialogForm.roleId" size="small" placeholder="请选择"   disabled="disabled">
                      <el-option
                        v-for="(item,index) in roleList"
                        :key="index"
                        :label="item.roleName"
                        :value="item.roleCode"
                      ></el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item class="submit_buttons" style="margin-top:40px;margin-left:-30px">
                  <el-button
                    v-if="dialogStatus=='show'"
                    type="primary"
                    class="primary_btn"
                    @click="showCelDialog('dialogForm')"
                    style="width:140px;"
                  >关闭</el-button>
                </el-form-item>
              </el-form>

            </div>
            <!-- 弹框编辑 -->
            <div v-else-if="dialogStatus=='edit'">
              <el-form
                :model="dialogFormEdit"
                :rules="rules2"
                class="add_dialog_form"
                ref="dialogForm1"
              >
                <el-form-item label="账号" class="custom-item input_box_disabled" disabled="disabled">
                  <div>
                    <el-input v-model="dialogFormEdit.memberName" disabled></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="员工姓名" prop="nickName" class="custom-item mt20">
                  <div class="">
                    <el-input v-model="dialogFormEdit.nickName"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="员工角色" class="select-item mt20" prop="roleId">
                  <div class="box_required">
                    <el-select v-model="dialogFormEdit.roleId" size="small" placeholder="请选择">
                      <el-option
                        v-for="item in roleList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                      ></el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item class="submit_buttons" style="margin-top:40px;margin-left:-30px">
                  <el-button
                    type="primary"
                    @click="editSubmit('dialogForm1')"
                    class="primary_btn"
                    style="width:140px;"
                  >确认</el-button>
                  <el-button
                    @click="canCelDialog('dialogForm1')"
                    class="cancel_btn"
                    style="margin-left:50px;width:140px;"
                  >取 消</el-button>
                </el-form-item>
              </el-form>
            </div>
            <!-- 弹框新增 -->
            <div v-else-if="dialogStatus=='add'">
              <el-form
                :model="dialogFormAdd"
                :rules="rules3"
                class=""
                ref="dialogForm"
              >
                <el-form-item label="账号" prop="memberName" class="custom-item">
                  <div class="box_required">
                    <el-input v-model="dialogFormAdd.memberName"></el-input>
                  </div>
                  <span v-if="memberWarning" style="color: #FF3C00; height: 0px;float: right;margin-right: 200px;margin-top: -5px">账户已存在</span>
                </el-form-item>
                <el-form-item label="员工姓名" prop="nickName" class="custom-item mt20">
                  <div class="">
                    <el-input v-model="dialogFormAdd.nickName"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="员工角色" class="select-item mt20" prop="roleId">
                  <div class="box_required">
                    <el-select v-model="dialogFormAdd.roleId" size="small" placeholder="请选择">
                      <el-option
                        v-for="item in roleList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                      ></el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <!-- <div slot="footer" class="submit_buttons" style="margin-top:40px;"> -->
                <el-form-item class="submit_buttons" style="margin-top:40px;margin-left:-30px">
                  <el-button
                    type="primary"
                    @click="addSubmit('dialogForm')"
                    class="primary_btn"
                    style="width:140px;"
                  >确认</el-button>
                  <el-button
                    @click="canCelDialog('dialogForm')"
                    class="cancel_btn"
                    style="margin-left:50px;width:140px;"
                  >取 消</el-button>
                </el-form-item>
                <!-- </div> -->
              </el-form>
            </div>
          </div>
        </div>

      </div>
    </el-dialog>
  </div>
</template>
<script >
import { requestPost, request } from "@/api/parent";
import { isWscnEmail, isPhone, validatNumber } from "@/utils/validate";
import {validateAccount,validateStaffName} from "@/utils/validateRules"
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    // let isWscnEmail isPhone

    return {
      total: 0,
      pageNum: 1,
      pageSize: 5,
      currentPage1:1,

      memberWarning:false,
      isDisabled: false,

      deleteForm: {
        usermemberId: null
      },
      resetForm: {
        usermemberId: null
      },
      // 单独弹框
      visbleSingleDialogue2: false,

      // user:JSON.parse(localStorage.getItem("user_front")),
      //表格数据初始化
      defaultList: [],
      roleList: [],
      tableData: [],
  
      memberId: "",
      roleName: "",
      customerRelevance: "",
      reviewTime: "",
      operationName: "",
      roleId: "",
      customerId: "",
      //弹框数据,

      dialogStatus: "",
      textMap: {
        add: "新增",
        edit: "编辑",
        show: "查看"
      },
      dialogFormVisible: false,
      dialogForm: {
        memberName: "",
        nickName: "",
        roleId: "",
        roleName: "",
        memberId: ""
      },
       dialogFormEdit: {
        memberName: "",
        nickName: "",
        roleId: "",
        roleName: "",
        memberId: ""
      },
       dialogFormAdd: {
        memberName: "",
        nickName: "",
        roleId: "",
        roleName: "",
        memberId: ""
      },
      searchForm: {
        roleId: "",
        roleName: "",
        memberName: ""
      },
      //表单验证规则
      rules: {
        memberName: [
          {
            required: true,
            validator: validateAccount,
            trigger: ["blur","change"]
          }
        ],
        roleId: [
          {
            required: true,
            trigger: ["change"],
            message: "请选择员工角色"
          }
        ],
        nickName: [
          {
            required: true,
            trigger: ["change"],
            message: "请输姓名"
          }
        ]
      },
      // edit
      rules2: {
        // memberName: [
        //   {
        //     validator: validateAccount,
        //     trigger: ["blur","change"]
        //   },
        // ],
        nickName: [
          {
            validator:validateStaffName,
            trigger: ["blur","change"],
          }
        ],
        roleId: [
          {
            required: true,
            trigger: ["change"],
            message: "请选择员工角色"
          }
        ],
      
      },
      // Add
        rules3: {
        memberName: [
          {
            validator: validateAccount,
            trigger: ["blur","change"]
          }
        ],
        nickName: [
          {
            validator:validateStaffName,
            trigger: ["blur","change"],
          }
        ],
        roleId: [
          {
            required: true,
            trigger: ["change"],
            message: "请选择员工角色"
          }
        ],
      
      },

      value: "2",
      resetPasswordDialogVisible: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val;
      this.init();
    },
    alertDelete(memberId) {
      this.visbleSingleDialogue2 = true;
      this.deleteForm.usermemberId = memberId;
      console.log(this.deleteForm.usermemberId);
    },

    //删除提示框
    singleDialogue2(memberId) {
      //  this.deleteForm.memberId
      this.deleteData(memberId);
      this.visbleSingleDialogue2 = false;
      // #1
    },
    cancelsingleDialogue2() {
      this.visbleSingleDialogue2 = false;
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
    init() {
      this.tableData = [];
      this.memberId = null;
      this.memberName = null;
      this.roleName = null;
      this.customerRelevance = null;
      this.reviewTime = null;
      this.roleId = null;
      this.customerId = null;
      let data = {
        roleId: this.roleId,
        memberName: this.memberName,
        customerId: JSON.parse(localStorage.getItem("user_front")).customerId,
        pageNum: this.pageNum,
         pageSize: this.pageSize
      };

      requestPost("/api/auth/site/user/list", data).then(response => {
        if (response.data.code === 0) {
          this.tableData = response.data.res_data.list;
          this.total = response.data.res_data.total;
        }
      });

      requestPost("/api/auth/site/user/sysRoleList").then(response => {
        //console.log(response.data.res_data)
        console.log(9998);
        this.defaultList = response.data.res_data;
        console.log(this.defaultList);
      });
    },
    disabledFn() {
      //  console.log(this.dialogStatus)
      if (this.dialogStatus == "edit" || this.dialogStatus == "add") {
        return false;
      } else if (this.dialogStatus == "show") {
        return true;
      }
    },
    showDialog(memberId) {
      //查看

      this.dialogFormVisible = true;
      this.dialogStatus = "show";
      let data = {
        memberId: memberId
      };
      requestPost("/api/auth/site/user/show", data).then(response => {
        console.log(1111);
        console.log(response);
        if (response.data.code === 0) {
          this.dialogForm.memberName = response.data.res_data.userInfo.memberName;
          this.dialogForm.nickName = response.data.res_data.userInfo.nickName;
          this.dialogForm.roleId = response.data.res_data.sysRoleUser.roleCode;
        }
      });
      requestPost("/api/auth/site/user/sysRoleList").then(response => {
        // console.log(response.data.res_data);
        if (response.data.code === 0) {
          console.log(222);
          this.roleList = response.data.res_data;
          //改变原数组
          this.roleList.push({ roleCode: "L1000", roleName: "企业管理员" ,roleId:''});
        }
      });
    },
    cleardialogForm() {
      // 清空弹窗编表单
      this.dialogForm.nickName = "";
      this.dialogForm.memberName;
      this.dialogForm.roleName = "";
      this.dialogForm.roleId = "";
    },
    addDialogShow() {
      //添加
      this.dialogFormAdd = {
          memberName: "",
          nickName: "",
          roleId: "",
          roleName: "",
          memberId: ""
        }

      this.dialogForm = {
        memberName: "",
        nickName: "",
        roleId: "",
        roleName: "",
        memberId: ""
      }
      this.dialogFormVisible = true;
      this.dialogStatus = "add";
      console.log(1111111111)
      console.log(this.dialogForm)
      console.log(this.dialogFormAdd)
      console.log(1111111111)
      this.roleList = []
      requestPost("/api/auth/site/user/sysRoleList").then(response => {
        this.roleList = response.data.res_data;
      });

    },
    addSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            memberName: this.dialogFormAdd.memberName,
            nickName: this.dialogFormAdd.nickName,
            roleId: this.dialogFormAdd.roleId
          };
          requestPost("/api/auth/site/user/add", data).then(response => {
            //this.cleardialogForm()
            if (response.data.code === 0) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.init();
            } else if (response.data.code === 10004) {

              this.memberWarning = true
            }
          });
        } else {
        }
      });
    },
    searchFn() {
      //搜索

      let searchData = {
        roleId: this.searchForm.roleId,
        roleName: this.searchForm.roleName,
        // "roleName":null,
        memberName: this.searchForm.memberName,
        //   "memberName":null,
        //   "roleId":null,

        customerId: JSON.parse(localStorage.getItem("user_front")).customerId,
         pageNum: this.pageNum,
         pageSize: this.pageSize
      };
      requestPost("/api/auth/site/user/list", searchData).then(response => {
        if (response.data.code === 0) {
          console.log(response.data.res_data.list);
          response.data.res_data.list.forEach(item => {});
          this.tableData = response.data.res_data.list;
          this.total = response.data.res_data.total;
        }
      });
    },
    //编辑弹框
    editshowDialog(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "edit";

      this.memberId = row.memberId;
      this.roleId = row.roleId;
      this.customerId = row.customerId;
      let showData = {
        memberId: row.memberId
      };

      requestPost("/api/auth/site/user/show", showData).then(response => {
        if (response.data.code === 0) {
          this.dialogFormEdit.memberName =
          response.data.res_data.userInfo.memberName;
          this.dialogFormEdit.nickName = response.data.res_data.userInfo.nickName;
          this.dialogFormEdit.roleId = response.data.res_data.sysRoleUser.roleId;
        }
      });
      requestPost("/api/auth/site/user/sysRoleList").then(response => {
        // console.log(response.data.res_data);

        this.roleList = response.data.res_data;
      });
    },

    //编辑提交
    editSubmit(formName) {

      this.$refs[formName].validate(valid=>{
        if(valid){
             let data = {
        nickName: this.dialogFormEdit.nickName,
        roleId: this.dialogFormEdit.roleId,
        memberName: this.dialogFormEdit.memberName,
        customerId: this.customerId,
        memberId: this.memberId
      };

   
      console.log(10001)
      console.log(data)

      requestPost("api/auth/site/user/edit", data).then(response => {
        if (response.data.code === 0) {
          this.init();
          //  #44
          this.dialogStatus = "";
          this.dialogFormVisible = false;
          this.dialogFormEdit = {
            memberName: "",
            nickName: "",
            roleId: "",
            roleName: "",
            memberId: ""
          }
          this.$message({
            showClose: true,
            message: "更新成功",
            type: "success"
          });
        }else {
          this.$message({
            showClose: true,
            message: "更新失败",
            type: "warring"
          });
        }
      });
        }
      })


   
    },
    resetPassword(memberId) {
      this.resetForm.usermemberId = memberId;
      //重置
      this.resetPasswordDialogVisible = true;
    },
    confirmResetPassword(memberId) {
      let data = {
        memberId: this.resetForm.usermemberId
      };
      requestPost("/api/auth/site/user/resetPassword", data).then(response => {
        //重置密码
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
    canCelResetPassword(dialogForm) {},

    deleteData(memberId) {
      let data = {
        memberId: memberId
      };
      console.log(666);
      console.log(data);
      requestPost("/api/auth/site/user/deleteRelevance", data).then(
        response => {
          if (response.data.code === 0) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.init();
          }
        }
      );
    },
    canCelDialog(formName) {
      //this.cleardialogForm()
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
      formName = {
            memberName: "",
            nickName: "",
            roleId: "",
            roleName: "",
            memberId: ""
          }
    },
    showCelDialog(form){
      this.dialogFormVisible =false
      this.dialogForm = {
        memberName: "",
        nickName: "",
        roleId: "",
        roleName: "",
        memberId: ""
      }
    }
  },
  watch:{
    "dialogFormAdd.memberName"(value){
      this.memberWarning = false
    }
  }
};
</script>
<style>
</style>

