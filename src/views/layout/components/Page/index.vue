<template>
    <div>
        <div class="page_main_container">
            <div class="page_main_title">
                <slot name="page_title">
                    <!-- <div class="page_title">
                    新增
                    <a class="page_back" href="#">返回</a>
                    </div>-->
                </slot>
            </div>
            <div class="page_main_body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
};
</script>

<style scoped>
</style>