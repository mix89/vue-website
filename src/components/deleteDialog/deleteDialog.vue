<template>
    <div>
        <el-dialog title="提示" :visible.sync="visbleSingleDialogue2" class="check_dialogue_small">
            <div>
                <div style="text-align:center;margin-top:30px;font-size:16px;">确认删除？</div>
                <div>
                    <el-form>
                        <el-form-item class="submit_buttons" style="margin-top:40px;">
                            <el-button
                                type="primary"
                                @click="singleDialogue2"
                                class="primary_btn"
                                style="width:140px;"
                            >确认</el-button>
                            <el-button
                                @click="cancelsingleDialogue2"
                                class="cancel_btn"
                                style="margin-left:50px;width:140px;"
                            >取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>