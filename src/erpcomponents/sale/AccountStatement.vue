<template>
    <div>
        <el-card>
            <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="日汇总" name="first">
                    <template>
                        <el-form label-width="120px">
                            <el-form-item label="结算时间">
                                <el-col :span="6">
                                    <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="月汇总" name="second">配置管理</el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName:'first',
            value1:'',
        }
    },
    methods: {
        handleClick(){

        }
    },
}
</script>
<style lang="less" scoped>

</style>
