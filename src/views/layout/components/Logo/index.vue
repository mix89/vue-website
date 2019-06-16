<template>
    <div>
        <div class="page_logo">
            <a href="#" @click.prevent="goHome"><img :src="logoSrc" alt="logo"></a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logoSrc: require("../../../../assets/images/logo.png"),
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'frontdashboard'})
        }
    }
};
</script>

