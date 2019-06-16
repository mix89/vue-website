<!-- 地址选择组件 -->
<template>
  <el-form :model="form" class="demo-ruleForm address_components" label-position="top" >
    <el-row :gutter="24" class="address">
      <el-col :span="8">
        <el-form-item>
          <el-select :disabled="addressDisabled" v-model="form.province" placeholder="请选择省" @change="proChange">
            <el-option v-for="item in provinces" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <el-select :disabled="addressDisabled" v-model="form.city" placeholder="请选择市" @change="cityChange">
            <el-option v-for="item in citys" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <el-select :disabled="addressDisabled" v-model="form.district" placeholder="请选择区/县" @change="districtChange">
            <el-option v-for="item in districts" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <span class="sign" v-if="! addressDisabled">*</span>
    </el-row>
    <el-row :gutter="24" class="address" style="margin-top:10px;">
      <el-col :span="20">
        <el-form-item>
          <el-input :disabled="addressDisabled" placeholder="请填写详细地址" v-model="form.detail"></el-input>
        </el-form-item>
        <div class="check">
          <span v-if="addressCheckShow">请输入正确的地址信息！</span>
          <span v-if="addressCheckShowOfWord">长度在 4 到 60 个字符!</span>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import {requestPost} from "@/api/parent";

function formatData(data) {
  return JSON.parse(data);
}
export default {
  // name: "address",
  props: ["province", "city", "district", "detail" ,"isShow","check"],
  data: function() {
    return {
      addressCheckShow:false,
      addressCheckShowOfWord:false,

      addressDisabled:this.isShow,
      form: {
        province: this.province,
        city: this.city,
        district: this.district,
        detail: this.detail
      },
      provinces: formatData(localStorage.getItem("address")),
      citys:[],
      districts:[]
    };
  },
  created(){
  },
  watch: {
    'form.province'(value){
      this.checkAddressFn()
    },
    'form.detail'(value){
      this.checkAddressFn()
    },

    check(value){
      if(value){
        this.checkAddressFn()
      }
    },
    form: {
      handler: function(val) {
        this.$emit("change", val);
      },
      deep: true
    },
    province(province,oldProvince){
      this.form.province = province
      this.provinces.forEach(item => {
        if(item.id === this.form.province){
          this.citys = item.childrens
        }
      })
    },
    city(city,oldCity){
      this.form.city = city
      this.citys.forEach(item => {
        if(item.id === this.form.city){
          this.districts = item.childrens
        }
      })
    },
    district(district,oldDistrict){
      this.form.district = district
    },
    detail(detail,oldDetail){
      this.form.detail = detail
    }
  },
  computed: {
  },
  methods: {
    checkAddressFn(){
      this.addressCheckShow = false
      this.addressCheckShowOfWord = false
      if(!this.form.detail || !this.form.province){
        this.addressCheckShow = true
        this.$emit("checkBack", false);
      }else if(this.form.detail.length < 4 || this.form.detail.length >60){
        this.addressCheckShowOfWord = true
        this.$emit("checkBack", false);
      }else {
        this.$emit("checkBack", true);
      }
    },
    proChange(val, oldVal) {
      this.provinces.forEach(item => {
        if(item.id === this.form.province){
          this.citys = item.childrens
        }
      })
      let tag = true
      this.citys.forEach(item =>{
        if(this.form.city == item.id){
          tag = false
        }
      })
      if(tag){
        this.form.city = this.citys[0].id;
      }
      this.cityChange()
    },
    cityChange(val, oldVal) {
      this.citys.forEach(item => {
        if(item.id === this.form.city){
          this.districts = item.childrens
        }
      })
      let tag = true
      this.districts.forEach(item =>{
        if(this.form.district == item.id){
          tag = false
        }
      })
      if(tag){
        this.form.district = this.districts[0].id
      }
    },
    districtChange(val, oldVal) {
    }
  }
};
</script>
<style scope>
.address .el-form-item {
  margin-bottom: 0 !important;
  margin-right: 0 !important;
}
.address .check{
  font-size: 12px;
  color: #f56c6c;
  position: absolute;
  left: 10px;
  top: 37px;
}
.address .sign{
  color: #f56c6c;
  font-size: 12px;
  position: absolute;
  right: -1px;
  top: 10px;
}


.address_components .el-form-item__error{
  top: 15px;
  /* padding-top: 0; */
}

</style>
