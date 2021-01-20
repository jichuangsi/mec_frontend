<template>
    <el-card>
        <div class="meta">供应商信息</div>
        <el-form ref="form" :model="form" label-width="100px" style="width:40%">
            <el-form-item label="供应商编号">
                <el-input v-model="form.customerNumber"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称">
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
                <el-switch v-model="form.state" :active-value='0' :inactive-value='1'></el-switch>
            </el-form-item>
        </el-form>
        <div class="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
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
                clientNo:0,
                state:'',
            },
            id:'',
        }
    },
    created(){
        
        if(this.$route.query.id){
            this.id=this.$route.query.id
            this.getData(this.id)
        }
    },
    methods:{
        // 编辑用户
        async getData(id){
            const { data: res } = await this.$http.post(`SysController/getClientInfoById?clientId=${id}` )
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.form=res.data.SCustomer
        },
        // 点击取消
        cancel(){
            this.$router.go(-1)
        },
        // 点击保存
        async save(){
            if(this.id){
                this.form.id=this.id
            }
            const { data: res } = await this.$http.post('SysController/saveCustomer', {
               
                sclient:this.form
            })
            if (res.code !== "0010") return this.$message.error(res.msg)
            if(this.id){
                 this.$message.success('修改成功')
            }else{
                this.$message.success('新增成功')
            }
            this.$router.go(-1)
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
    text-align: center;
}
</style>
