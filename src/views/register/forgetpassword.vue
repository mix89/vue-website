<template>
    <div>
        <div class="page_main_container">
            <PageHeadSimple/>
            <div class="page_container">
                <div class="infoshow_box">
                    <div class="infoshow_title">
                    </div>
                    <div class="infoshow_body minh800">
                        <div class="register_feedback" style="height:350px">
                            <div class="register_feedback_title">请以账号邮箱发送重置密码申请至 info＠zytfintech.net</div>
                            <div class="register_feedback_body" style="text-align:left;">
                                <p>备注：1、账号非邮箱地址，则需注明需重置密码的账号、企业名称；</p>
                                <p> 2、邮件需附上清晰的企业营业执照扫描件</p>
                                <p> 3、工作人员将在1-3工作日内进行反馈，如需加急处理，请在发送邮件后致电客服：0755-25256566</p>
                            </div>
                            <div class="submit_buttons custom_buttons">
                               
                                 <a href="https://exmail.qq.com/cgi-bin/loginpage"><button class="cancel_btn" @click="cancel">发送邮件</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PageFooter/>
        </div>
    </div>
</template>

<script>
import PageHeadSimple from "@/views/layout/components/PageHeadSimple";
import PageFooter from "@/views/layout/components/PageFooter";
export default {
  data() {
    return {
      //   key: value
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "login" });
    }
  },
  components: {
    PageHeadSimple,
    PageFooter
  }
};
</script>

