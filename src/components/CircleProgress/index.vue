<template>
    <div class="circle_container" :progress-num="progressNumber" :progress-per="progressPercent">
 
        <div :style="circleSize" :class="wrapClasses">
            <svg viewBox="0 0 100 100">
                <path :d="pathString" :stroke="trailColor" :stroke-width="0" :fill-opacity="0"/>
                <path :d="pathString" :stroke-linecap="strokeLinecap" :stroke="strokeColor" :stroke-width="4" fill-opacity="0" :style="pathStyle" class="circle_boxshadow"/>
            </svg>
            <div :class="innerClasses">
                <slot><h3 class="through_rate">{{ progressNumber }}<span>%</span></h3>
                    <div class="through_rate_txt">{{title}}</div>
                </slot>
            </div>
        </div>
 
    </div>
</template>
 
<script>
const prefixCls = 'ivu-chart-circle';

export default {
    props: {
        progressNum: {
            type: Number,
            default: 0
        },
        progressPer: {
            type: Number,
            default: 0
        },
        title:{
            type:String,
            default:"通过率"
        },
        // percent: {
        //     type: Number,
        //     default: 0
        // },
        size: {
            type: Number,
            default: 180
        },
        strokeColor: {
            type: String,
            default: '#00ACF3'
        },
        strokeLinecap: {
            default: 'round'
        },
        trailColor: {
            type: String,
            default: '#efefef'
        }
    },
    data () {
		return {
          percent:0,
          progressNumber:this.progressNum,
          progressPercent:this.progressPer  
    	}
    },
    computed: {
        circleSize () {
            return {
                width: `${this.size}px`,
                height: `${this.size}px`
            };
        },
        radius () {
            return 50 - 6 / 2;
        },
        pathString () {
            return `M 50,50 m 0,-${this.radius}
            a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
            a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`;
        },
        len () {
            return Math.PI * 2 * this.radius;
        },
        pathStyle () {
            return {
                'stroke-dasharray': `${this.len}px ${this.len}px`,
                'stroke-dashoffset': `${((100 - this.percent) / 100 * this.len)}px`,
                'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease',
            };
        },
        wrapClasses () {
            return `${prefixCls}`;
        },
        innerClasses () {
            return `${prefixCls}-inner`;
        },

        // currentPercent:{
        //     get(){
        //         this.percent = this.progressPercent = this.progressNum;
        //         return this.percent
        //     },
        //     set(val){
        //         this.percent = this.progressPercent = this.progressNum;
        //         return this.$emit('update:progressNum', val); 
        //     }
        // }

    },
    created() {
        this.percent = this.progressPercent = this.progressNumber;
        // console.log(99999)
        // console.log(this.percent)


    //    setTimeout(()=>{
    //         this.percent = this.list;
    //     },1000);
    },
    // watch:{
    //     progressNum(nv,ov){
    //        this.percent = this.progressPercent = this.nv
    //     }
    // },
  	methods: {
 
  	}
}
</script>
 
<style scoped>
    .clearfix{zoom: 1;}
    .clearfix:after{
        content: '';
        display: block;
        height: 0;
        visibility: hidden;
        clear: both;
    }
    .circle_container{
        width: 100%;
        position: relative;
    }
    .ivu-chart-circle-inner {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        line-height: 1;
        /* border: 1px solid red; */
    }
    .ivu-chart-circle-inner:before{
        content: "";
        position: absolute;
        width: 160px;
        height: 160px;
        top: -54px;
        left: 10px;
        border: 6px solid #EEEFEF;
        /* border: 6px solid green; */
        border-radius: 50% 50%;
    }
    .ivu-chart-circle {
        display: inline-block;
        position: relative;
    }
    /* 阴影 */
    .circle_boxshadow{
        box-shadow: 0 5px 10px #A9E3FB;


    }

  .tit{
    text-align: center;
    padding-top: 20px;
    font-size: 14px;
    color: #323232;
  }

  .through_rate{
    color: #323232;
    font-size: 42px;
    font-weight: bold;
    width: 180px;
    text-align: center;
    margin-top:-10px; 
  }

  .through_rate span{
      font-size: 14px;
      font-weight: bold;
    }
  .through_rate_txt{
    font-size: 14px;
    width: 180px;
    text-align: center;
    margin-top:-35px; 
  }

  
 

</style>
