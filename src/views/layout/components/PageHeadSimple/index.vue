<template>
    <div>
        <div class="page_header">
            <!-- <PageTopBar/> -->
            <div class="page_head_container">
                <div class="page_container">
                    <div class="page_head_menu">
                        <Logo/>
                        <div class="page_head_title2">
                            <router-link class="page_head_login" :to="{name:'login'}">登录</router-link>
                            <router-link class="page_head_register" :to="{name:'protocol'}">注册</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from "@/views/layout/components/Logo";
// import PageTopBar from "@/views/layout/components/PageTopBar";

export default {
    components:{
        Logo,
        // PageTopBar
    }
};
</script>

