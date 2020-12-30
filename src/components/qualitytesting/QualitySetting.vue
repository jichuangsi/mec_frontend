<template>
    <el-card>
        <el-tabs v-model="activeName" >
            <el-tab-pane label="检验报告" name="first">
                <template>
                    <el-form :inline="true" ref="form" :model="form" label-width="80px">
                        <el-form-item label="活动名称" style="width:600px;">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">筛选</el-button>
                            <el-button type="primary" plain @click="dialogVisible=true">新增</el-button>
                        </el-form-item>
                    </el-form>
                     <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                        <el-table-column
                            label="启用状态">
                            <template>
                                <el-switch
                                :v-model="false"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template>
                                <el-button type="primary" size="mini">下载</el-button>
                                <el-button type="success" size="mini">更新</el-button>
                                <el-button type="danger" size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        :current-page="1"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </template>
            </el-tab-pane>
            <el-tab-pane label="质量证书" name="second">
                <template>
                    <el-form :inline="true" ref="form" :model="form" label-width="80px">
                        <el-form-item label="活动名称" style="width:600px;">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">筛选</el-button>
                            <el-button type="primary" plain>新增</el-button>
                        </el-form-item>
                    </el-form>
                     <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                        <el-table-column
                            label="启用状态">
                            <template>
                                <el-switch
                                :v-model="false"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作" width="320">
                            <template>
                                <el-button type="primary" size="mini">下载</el-button>
                                <el-button type="success" size="mini">更新</el-button>
                                <el-button type="warning" size="mini">修改密码</el-button>
                                <el-button type="danger" size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        :current-page="1"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </template>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="40%"
        >
        <el-form ref="form" :model="form" label-width="120px" style="width:500px;">
            <el-form-item label="模板编号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="模板名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
             <el-form-item label="模板上传">
                <el-button type="primary">点击上传</el-button>
                <div>只能上传doc/docx文件，且不超过1M，模板下载参考</div>
                <div style="color:#409eff;">质量管理证书模板.doc</div>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </el-card>
</template>
<script>
export default {
    data(){
        return {
            dialogVisible:false,
            activeName:'first',
            form:{
                name:''
            },
             tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    }    
}
</script>
<style lang="less" scoped>
.el-pagination{
    margin: 20px 200px;
}
</style>
