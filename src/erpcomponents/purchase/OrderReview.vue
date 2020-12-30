<template>
    <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="采购订单审核" name="first">
                <template>
                    <el-form ref="form" label-width="80px">
                        <el-row :gutter="40">
                            <el-col :span="6">  
                                <el-form-item label="订单编号">
                                    <el-input v-model="selectedForm.findName"></el-input>
                                </el-form-item>
                            </el-col>
                            
                            <el-col :span="6">  
                                <el-form-item label="开单时间">
                                    <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" :offset="6">  
                                <el-button type="primary" @click="getData">筛选</el-button>
                                <el-button type="primary">导出</el-button>
                                <el-button type="text" @click="clear">清空筛选</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                        <el-table
                        :header-cell-style="{background:'#f0f5ff'}"
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                type="index"
                                label="序号"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="开单时间"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="purchaseOrder"
                                label="采购单号"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="customerName"
                                label="供应商"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="orderSum"
                                label="订单总金额（元）"  
                                >
                            </el-table-column>
                            <el-table-column
                                prop="staffName"
                                label="负责人">
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注">
                            </el-table-column>
                            <el-table-column
                                prop="orderState"
                                label="订单状态">
                            </el-table-column>
                            <el-table-column
                                prop="checkState"
                                label="检验结果">
                            </el-table-column>
                            <el-table-column                  
                                label="操作">
                                <template slot-scope="scope">                     
                                    <el-button type="primary"  size="mini" @click="toDetail(scope.row)">查看</el-button>
                                </template>
                            </el-table-column>             
                        </el-table>   
                    
                   <el-pagination
                        :current-page="selectedForm.pageNum"
                        :page-sizes="[5, 10,15, 20]"
                        :page-size="selectedForm.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </template>
            </el-tab-pane>
            <el-tab-pane label="审核设置" name="second">
                <template>
                    <el-form ref="form" label-width="80px">
                        <el-row :gutter="40">
                            
                            <el-col :span="12" >  
                                <span class="tips">*审核层级按数字由小到大排序，数字越小越先审核，如：审核层级为1的人先审核，然后按数字依次审核。</span>
                            </el-col>
                            <el-col :span="6" :offset="6">  
                                <el-button type="primary">筛选</el-button>
                                <el-button type="primary" plain @click="addDialog">新增</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-table
                        :header-cell-style="{background:'#f0f5ff'}"
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                type="index"
                                label="序号"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="levelName"
                                label="层次名称"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="auditLevel"
                                label="审核层级"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="staffName"
                                label="审核人"  
                                >
                            </el-table-column>
                            <el-table-column
                                prop="staffPost"
                                label="审核人职称">
                            </el-table-column>
                            <el-table-column                  
                                label="操作">
                                <template slot-scope="scope">                     
                                    <el-button type="primary"  size="mini" @click="addDialog(scope.row.id)">编辑</el-button>
                                </template>
                            </el-table-column>             
                    </el-table>   
                    
                    <el-pagination
                        :current-page="selectedForm.pageNum"
                        :page-sizes="[5, 10,15, 20]"
                        :page-size="selectedForm.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </template>
            </el-tab-pane>
        </el-tabs>
        <!-- 审核设置的新增对话框 -->
        <el-dialog
        :title="id>=0?'编辑':'新增'"
        :visible.sync="addDialogVisible"
        width="30%"
        @close="dialogClose"
        >
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="层级名称" style="width:63%;" prop="levelName">
                <el-input v-model="form.levelName"></el-input>
            </el-form-item>
            <el-form-item label="审核层级" style="width:63%;" prop="auditLevel">
                <el-input type="number" v-model="form.auditLevel"></el-input>
            </el-form-item>
            <el-form-item label="审核人" prop="staffId">
                <el-select v-model="form.staffId" placeholder="请选择 " @change="selectChanged">
                <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in auditXiaLa" :key="item.mapKey"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核人职称" style="width:63%;">
                <el-input v-model="zhicheng" disabled></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDialogConfirm">确 定</el-button>
        </span>
        </el-dialog>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            form:{
                levelName:'',
                auditLevel:'',
                staffId:'',            
            },
            zhicheng:'',
            addDialogVisible:false,//审核设置的新增对话框
            value1:'',
            activeName:'first',
            tableData: [],
            selectedForm:{
                findName: "",
                pageNum: 1,
                pageSize: 11
            },
            total:0,
            auditXiaLa:[],//审核人的下拉框
            id:-1,//编辑时选中的id
        }
    },
    created(){
        if(sessionStorage.getItem('orderreview')){
            this.activeName=sessionStorage.getItem('orderreview')
        }
        this.getData()
    },
    methods: {
        // 点击清空
        clear(){
            this.selectedForm={
                findName: "",
                pageNum: 1,
                pageSize: 11
            }
        },
        // 监听对话框关闭
        dialogClose(){
            this.$refs.form.resetFields()
            this.zhicheng=''
            this.id=-1
        },
        // 点击确认添加
        async addDialogConfirm(){
            this.form.auditType='CG'
            if(this.id>=0){
                this.form.id=this.id
            }
            const { data: res } = await this.$http.post('AuditController/saveAudit',this.form)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success(this.id>=0?'编辑成功':'新增成功')
            this.addDialogVisible=false
            this.getData()
        },
        // 监听下拉框发生改变
        selectChanged(e){
            this.auditXiaLa.forEach(item =>{
                if(item.mapKey===e){
                    this.zhicheng=item.mapliandong
                }
            })
        },
        // 审核设置点击新增
        async addDialog(id=-1){
            
            this.addDialogVisible=true
            const { data: res } = await this.$http.post('AuditController/getAuditBasicInfo')
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.auditXiaLa=res.data.auditXiaLa
            if(id>=0){
                this.id=id
                const { data: res } = await this.$http.post('AuditController/findAllAuditById',{findById:this.id})
                if (res.code !== "0010") return this.$message.error(res.msg)
                this.form=res.data
                this.selectChanged(res.data.staffId)
            }
        },
        // 点击切换tab标签
        handleClick() {
            this.getData()
            sessionStorage.setItem('orderreview',this.activeName)
        },
        // 获取页面的初始页面
        async getData(){
            if(this.activeName=='first'){
                const { data: res } = await this.$http.post('PurchaseController/getAllPurchaseOrderAudit', this.selectedForm)
                if (res.code !== "0010") return this.$message.error(res.msg)
                this.total=res.data.total
                this.tableData=res.data.list
            }else{
                const { data: res } = await this.$http.post('AuditController/findAllAudit', {
                    findModelName: "CG",
                    pageNum:this.selectedForm.pageNum,
                    pageSize:this.selectedForm.pageSize
                })
                if (res.code !== "0010") return this.$message.error(res.msg)
                this.total=res.data.total
                this.tableData=res.data.list
            }
            
        },
        // 前往详情页面
        toDetail(row){
            this.$router.push({
                path: '/orderreviewdetail',
                query: {
                    message: row.id
                }
            })
        }
    },
}
</script>
<style lang="less" scoped>
.tips{
    color: #e0001b;
    font-size: 12px;
}
</style>
