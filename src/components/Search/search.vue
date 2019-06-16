<template>
  <div class="search">
    <el-form-item label="" class="searchbox-item">
      <el-input placeholder="请输入关键字" v-model="searchData">
        <el-select v-model="selectData" slot="prepend" class="prepend">
          <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item class="button-item" style="margin-left:5px">
      <el-button
        icon="el-icon-search "
        class="search_btn"
        type="warning"
        size="small"
        @click="searchFn"
      >搜索</el-button>
      <span class="lengthCheck" v-if="lengthCheckShow">字符长度为0-30字符</span>
      <span class="wordCheck" v-if="wordCheckShow">非法字符</span>
    </el-form-item>
  </div>
</template>
<script>
import { requestPost } from "@/api/parent";
import { validateContact } from "@/utils/validate";
export default {
  name: 'checkDialog',
  props: {
    options: {
      type: Array,
      required: []
    },
    value:{
      type:Number,
      required: null
    },
  },
  data() {
    return {
      selectData:this.value,
      lengthCheckShow:false,
      wordCheckShow:false,
      searchData:null,
    };
  },
  methods: {
    searchFn(){
      this.$emit('search', true)
    }
  },
  watch: {
    searchData(value){
      this.lengthCheckShow = false
      this.wordCheckShow = false
      if(value && !validateContact(value,0,30)){
        if(value.toString().length > 30){
          this.lengthCheckShow = true
        }else {
          this.wordCheckShow = true
        }
      }
      let data = {
        select:this.selectData,
        searchData:value
      }
      this.$emit('calBack', data)
    },
    selectData(value){
      this.searchData = null
      let data = {
        select:value,
        searchData:null
      }
      this.$emit('calBack', data)
    }
  }
};
</script>

<style scoped>
  .search{
    float: right;
    margin-left: 4px;
  }
  .search .lengthCheck{
    font-size: 12px;
    color: #f56c6c;
    position: absolute;
    left: -184px;
    top: 26px;
  }
  .search .wordCheck{
    font-size: 12px;
    color: #f56c6c;
    position: absolute;
    left: -184px;
    top: 26px;
  }

</style>
