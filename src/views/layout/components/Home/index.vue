<template>
    <div>
        <div class="page_main_container">  
             <router-view></router-view>
            <!-- <transition name="fade-transform" mode="out-in">
               
            </transition> -->
            <pageFooter/>
        </div>
    </div>
</template>

<script>
// import PageHead from "@/views/layout/components/PageHead";
import PageFooter from "@/views/layout/components/PageFooter";

export default {
  name: "Home",
  data() {
    return {};
  },

  components: {
    // PageHead,
    PageFooter
  }
};
</script>

