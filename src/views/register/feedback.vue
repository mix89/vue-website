<template>
    <div>
        <div class="page_main_container">
            <PageHeadSimple/>
            <div class="page_container">
                <div class="infoshow_box">
                    <div class="infoshow_title">
                    </div>
                    <div class="infoshow_body minh800">
                        <div class="register_feedback">
                            <div class="register_feedback_title">注册信息已提交，请耐心等待审核！</div>
                            <div class="register_feedback_body">
                                <p>审核反馈将在1-5个工作日内反馈至您的注册账号中，请留意！</p>
                                <p>如有疑问，请联系客服：400-4546451</p>
                            </div>
                            <div class="submit_buttons custom_buttons">
                                <button class="cancel_btn" @click="cancel">返回首页</button>
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

<style scoped>
</style>