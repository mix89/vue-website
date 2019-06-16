<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog title="确认提交" :visible.sync="showCheckDialog" :before-close="closeShow" class="check_dialogue_small" :append-to-body="true">
      <el-form :model="ruleForm3" ref="ruleForm3" :rules="rules3">
        <div>
          <div class="change_password_inner">
            <div class="search_box inner_assess" style="margin-left:50px">
              <el-form-item label="审核人" class="select-item mt10" prop="handleId">
                <div class="box_required">
                  <el-select
                    v-model="ruleForm3.handleId"
                    size="small"
                    placeholder="请选择审核人"
                    clearable
                  >
                    <el-option
                      v-for="(item) in checkPeopleList"
                      :key="item.memberId"
                      :label="item.nickName"
                      :value="item.memberId"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer">
        <div class="submit_buttons" style="margin-top:30px;background:#fff;">
          <el-button
            type="primary"
            @click="finalSubmit('ruleForm3')"
            class="primary_btn"
            style="width:140px;"
          >确 定</el-button>
          <el-button
            @click="closeShow"
            class="cancel_btn"
            style="margin-left:50px;width:140px;"
          >取 消</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { requestPost } from "@/api/parent";
export default {
  name: 'checkDialog',
  props: {
    showCheckDialog: {
      type: Boolean,
      required: false
    },
    id:{
      type:Number,
      required: null
    },
    isWhreceipt: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentRow:null,
      ruleForm3:{
        handleId:null
      },
      checkPeopleList: [],
       rules3: {
         handleId: [
           { required: true, message: "请选择审核人", trigger: "change" }
         ]
       },
    };
  },
  methods: {
    closeShow(){
      this.$emit('closeShow', false)
    },
    init() {
      requestPost("/api/auth/site/user/check/list",).then(response => {
        if (response.data.code === 0) {
          this.checkPeopleList = response.data.res_data
        }
      });
    },
    finalSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "/api/auth/site/receivable/submit"
          let data = {
            "receId": this.id,
            "wfProcessDetail":{
              "handleId": this.ruleForm3.handleId,
            }
          }
          if(this.isWhreceipt){
            url = "/api/auth/site/whreceipt/submit"
            data = {
              "whrId": this.id,
              "wfProcessDetail":{
                "handleId": this.ruleForm3.handleId,
              }
            }
          }
          requestPost(url,data).then(response => {
            if (response.data.code === 0) {
              this.$message.success("提交审核成功")
              this.ruleForm3.handleId = null
              this.$emit('succeed', true)
              this.$emit('closeShow', false)
            }else {
              this.$message.error("提交审核失败");
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  watch: {
    showCheckDialog(value){
      if(value){
        this.init()
      }
    }
  }
};
</script>

<style scoped>
.search_box {
  margin: 10px 5px -10px;
}
</style>
