<template>
    <div>
        <div class="page_main_container">
            <PageHeadSimple/>
            <div class="page_container">
                <div class="infoshow_box">
                    <div class="infoshow_title">
                        <div class="infoshow_title_inner">信息填写</div>
                    </div>
                    <div class="infoshow_body">
                        <enterpriseUserAdd />
                     
               
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
import enterpriseUserAdd from '@/views/enterpriseUserManage/add'
export default {
  data() {
    return {
      //   key: value
    };
  },
  methods: {
    submit_register() {
      this.$router.push({ name: "registerFeedback" });
    },
    cancel() {
      this.$router.push({ name: "protocol" });
    }
  },
  components: {
    PageHeadSimple,
    PageFooter,
    enterpriseUserAdd
  }
};
</script>

<style scoped>

</style>