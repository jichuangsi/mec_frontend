<template>
    <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="来料检验" name="first">
                <template>
                    <el-form ref="form" label-width="80px">
                        <el-row :gutter="40">
                            <el-col :span="6">  
                                <el-form-item label="采购单号">
                                    <el-input v-model="subForm.findName"></el-input>
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
                            <el-col :span="6">  
                                <el-button type="primary" @click="getData">筛选</el-button>
                                <el-button type="primary">导出</el-button>
                                <el-button type="text" @click="clear">清空筛选</el-button>
                            </el-col>
                        </el-row>
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
                                label="采购单号">
                            </el-table-column>
                            <el-table-column
                                prop="customerName"
                                label="供应商">
                            </el-table-column>
                            <el-table-column
                                prop="orderSum"
                                label="订单总金额(元)">
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
                                label="检验状态">
                            </el-table-column>
                            <el-table-column                  
                                label="操作">
                                <template slot-scope="scope">                     
                                    <el-button type="primary"  size="mini" @click="toDetail(scope.row.id)">查看</el-button>
                                </template>
                            </el-table-column>             
                        </el-table>   
                    </el-form>
                    <el-pagination
                        :current-page="subForm.pageNum"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="subForm.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </template>
            </el-tab-pane>
            <el-tab-pane label="检验设置" name="second">
                <template>
                    <el-form ref="form" label-width="80px">
                        <el-row :gutter="40">
                            
                            <el-col :span="12" :offset="6">  
                                <span class="tips">*审核层级按数字由小到大排序，数字越小越先审核，如：审核层级为1的人先审核，然后按数字依次审核。</span>
                            </el-col>
                            <el-col :span="6">  
                                <el-button type="primary">筛选</el-button>
                                <el-button type="primary" plain @click="showDialog()">新增</el-button>
                            </el-col>
                        </el-row>
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
                                label="层级名称"
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
                                label="审核人职称"
                                >
                            </el-table-column>
                            
                            <el-table-column                  
                                label="操作">
                                <template slot-scope="scope">                     
                                    <el-button type="primary"  size="mini" @click="showDialog(scope.row.id)">编辑</el-button>
                                </template>
                            </el-table-column>             
                        </el-table>   
                    </el-form>
                    <el-pagination
                        :current-page="subForm.pageNum"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="subForm.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </template>
            </el-tab-pane>
        </el-tabs>
        <!-- 检验设置新增的对话框 -->
        <el-dialog
        :title="id>=0?'编辑':'新增'"
        :visible.sync="dialogVisible"
        width="30%"
        @close="dialogClose"
        >
        <el-form ref="addForm" :model="addForm" label-width="120px">
            <el-form-item label="层级名称" style="width:63%;" prop="levelName">
                <el-input v-model="addForm.levelName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="审核层级" style="width:63%;" prop="auditLevel">
                <el-input type="number" v-model="addForm.auditLevel" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="审核人" prop="staffId">
                <el-select v-model="addForm.staffId" placeholder="请选择" @change="selectChanged">
                    <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in auditXiaLa" :key="item.mapKey"></el-option>
                </el-select>             
            </el-form-item>
            <el-form-item label="审核人职称" style="width:63%;">
                <el-input v-model="zhicheng" disabled></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDialogConfirm">确 定</el-button>
        </span>
        </el-dialog>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            id:-1,//编辑选中的id
            addForm:{
                levelName:'',
                auditLevel:'',
                staffId:''
            },//新增的表单
            dialogVisible:false,//检验设置新增的对话框
            value1:'',
            activeName:'first',//tab栏名称
            tableData: [],//表格数据
            subForm:{
                findName: "",//模糊查询
                pageNum: 1,
                pageSize: 11
            },//提交的分页
            total:0,//总条数
            auditXiaLa:[],//审核人下拉框数据
            zhicheng:'',//审核人职称
        }
    },
    created(){
        if(sessionStorage.getItem('incomingInspection')){
            this.activeName=sessionStorage.getItem('incomingInspection')
        }
        this.getData()
    },
    methods: {
        clear(){
            this.subForm.findName=''
        },
        // 监听对话框关闭
        dialogClose(){
            this.$refs.addForm.resetFields()
            this.id=-1
            this.zhicheng=''
        },
        // 点击确认新增
        async addDialogConfirm(){
            this.addForm.auditType='LL'
            if(this.id>=0){
                this.addForm.id=this.id
            }
            const { data: res } = await this.$http.post('AuditController/saveAudit',this.addForm)
            if (res.code !== "0010") return this.$message.error(res.msg)
            
            this.$message.success(this.id>=0?'编辑成功':'新增成功')
            this.dialogVisible=false
            this.getData()
        },
        // 新增审核人时联动职称
        selectChanged(e){
            this.auditXiaLa.forEach(item=>{
                if(item.mapKey===e){
                    this.zhicheng=item.mapliandong
                }
            })
        },
        
        // 点击新增
        async showDialog(id=-1){
            this.dialogVisible=true
            const { data: res } = await this.$http.post('AuditController/getAuditBasicInfo')
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.auditXiaLa=res.data.auditXiaLa
            if(id>=0){
                this.id=id
                const { data: ress } = await this.$http.post('AuditController/findAllAuditById',{findById:this.id})
                if (res.code !== "0010") return this.$message.error(res.msg)
                this.addForm=ress.data
              
                this.selectChanged(ress.data.staffId)
            }
        },
        // tab栏切换
        handleClick(){
            sessionStorage.setItem('incomingInspection',this.activeName)
            this.getData()
        },
        // 获取页面的初始数据
        async getData(){
            if(this.activeName=="first"){
                const { data: res } = await this.$http.post('PurchaseController/getAllPurchaseLLAudit',this.subForm)
                if (res.code !== "0010") return this.$message.error(res.msg)
                this.total=res.data.total
                this.tableData=res.data.list
            }else{
                const { data: res } = await this.$http.post('AuditController/findAllAudit',{
                    findModelName:'LL',
                    pageNum:this.subForm.pageNum,
                    pageSize:this.subForm.pageSize
                })
                if (res.code !== "0010") return this.$message.error(res.msg)
                this.total=res.data.total
                this.tableData=res.data.list
            }
            
        },
        // 点击查看
        toDetail(id){
            this.$router.push({
                path: '/incomingdetail',
                query: {
                    message: id
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
