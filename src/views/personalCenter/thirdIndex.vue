<template>
    <div>
        <PageHead/>
        <div class="page_container">
            <div class="layout_personal_container">
                <div class="layout_personal_sidebar">
                    <div class="page_title_main">个人中心</div>
                    <div class="personal_menu">
                        <!-- {{customerType}}  v-if="customerType=='1'-->
                        <router-link :to="{name:'companyAccountThird'}">账户信息</router-link>
                        <!-- <router-link :to="{name:'staffAccount'}">员工信息</router-link> -->
                    </div>
                </div>
                <div class="layout_personal_content">
                    <div class="page_body_main">
                        <router-view/>
                    <!-- <div v-if="abc==1">
                             <router-view name="company"/>
                        </div>
                        <div v-else-if="abc==2">
                              <router-view name="staff"/>
                        </div> -->
                    </div>   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PageHead from "@/views/layout/components/PageHead";
export default {
   data() {
       return {
          abc:1, 
          customerType: JSON.parse(localStorage.getItem('user_front')).customerType
       }
   }, 
  components: {
    PageHead
  }
};
</script>
