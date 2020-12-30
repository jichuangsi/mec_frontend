<template>
    <div>
        <el-card>
            <div class="meta">供应商信息</div>
            <el-form ref="form"  :model="form" label-width="100px" style="width:40%">
                <el-form-item label="客户编号">
                    <el-input v-model="form.customerNumber"></el-input>
                </el-form-item>
                <el-form-item label="客户名称">
                    <el-input v-model="form.customerName"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="form.contactsMan"></el-input>
                </el-form-item>
                <el-form-item label="联系人职称">
                    <el-input v-model="form.contactsPost"></el-input>
                </el-form-item>
                <el-form-item label="联系手机">
                    <el-input v-model="form.contactsPhone"></el-input>
                </el-form-item>
                <el-form-item label="座机">
                    <el-input v-model="form.landline"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="form.eMails"></el-input>
                </el-form-item>
                <el-form-item label="传真">
                    <el-input v-model="form.fax"></el-input>
                </el-form-item>
                <el-form-item label="供应商状态">
                    <el-switch v-model="form.state" :active-value='1' :inactive-value='0'></el-switch>
                </el-form-item>
            </el-form>
            
        </el-card>
        <el-card style="margin-top:20px;">
            <div class="meta">自定义信息<el-button type="primary" plain style="margin-left:70%;" @click="showAddTable()">新增</el-button></div>
             <el-table
                :header-cell-style="{background:'#f0f5ff'}"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="序号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="customerDetailName"
                    label="条目名称"
                   >
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                    >
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="showAddTable(scope.$index)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>
        </el-card>
        <el-dialog
        :title="index!=-1?'编辑':'新增'"
        :visible.sync="dialogVisible"
        width="30%"
        @close="handleDialogClose"
        >
        <el-form ref="addForm" :model="addForm" label-width="80px">
            <el-form-item label="条目名称" prop="customerDetailName">
                <el-input v-model="addForm.customerDetailName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="addForm.remark" placeholder="备注"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFormConfirm">确 定</el-button>
        </span>
        </el-dialog>
    </div>
    
</template>
<script>
import _ from 'lodash'
export default {
    data() {
        return {
            addForm:{
                customerDetailName:'',
                remark:'',
            },
            dialogVisible:false,
            form:{
                customerName:'',
                customerNumber:'',
                address:'',
                contactsMan:'',
                contactsPost:'',
                contactsPhone:'',
                landline:'',
                eMails:'',
                fax:'',
                clientNo:1,
                state:0
            },
             tableData: [],
             id:'',
             index:-1,
        }
    },
    created(){
        
        if(this.$route.query.id){
            this.id=this.$route.query.id
            this.getData(this.id)
        }
    },
    methods:{
        // 监听对话框关闭
        handleDialogClose(){
            this.addForm={
                customerDetails:'',
                remark:'',
            }
            this.index=-1
        },
        // 删除用户
        async del(index){
            const confirmResult = await this.$confirm(
                '是否确认删除?',
                '提示',
                {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }
            ).catch(err => err)
            if (confirmResult == 'confirm') {
                this.tableData.splice(index, 1);
            }
            
        },
        // 获取页面初始数据
        async getData(id){
            const { data: res } = await this.$http.post(`SysController/getClientInfoById?clientId=${id}` )
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.form=res.data.SCustomer
            this.tableData=res.data.listdetail
        },
        // 点击保存
        async save(){
            if(this.id){
                this.form.id=this.id
            }
            const { data: res } = await this.$http.post('SysController/saveCustomer', {
                customerDetails:this.tableData,
                sclient:this.form
            })
            if (res.code !== "0010") return this.$message.error(res.msg)
            if(this.id){
                 this.$message.success('修改客户成功')
            }else{
                this.$message.success('新增客户成功')
            }
            
            this.$router.go(-1)
        },
        // 点击取消
        cancel(){
            this.$router.go(-1)
        },
        // 对话框点击确定
        addFormConfirm(){
            if(this.index>=0){
                this.tableData.splice(this.index, 1, this.addForm);
            }else{
                this.tableData.push(this.addForm)
            }           
            
            this.dialogVisible=false         
        },
        // 点击新增与 编辑自定义信息
        showAddTable(index=-1){
            if(index>=0){
                this.index=index               
                this.addForm = _.cloneDeep(this.tableData[index])
            }
            this.dialogVisible=true
        }
    }
}
</script>
<style lang="less" scoped>
.meta{
    font-weight: bold;
}
.el-form{
    margin: 20px 100px;
}
.footer{
    margin-top: 20px;
    text-align: center;
}
</style>
