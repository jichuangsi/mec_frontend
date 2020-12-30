<template>
     <el-card>
         <el-form ref="form" :model="form" label-width="80px" labelPosition="top">
            <el-form-item label="员工编号" style="width:45%;">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" style="width:45%;">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="员工年龄" style="width:45%;">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" style="width:45%;">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" style="width:45%;margin-right:45%;">
                
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" style="width:45%;">
                <div class="tips">这是我们将发送通知的主要电子邮箱地址</div>
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="证件号码" style="width:45%;">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="职位" style="width:45%;">
                <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地址" style="width:45%;">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="所属厂房" style="width:45%;">
                <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属部门" style="width:45%;">
                <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
         </el-form>
         <div class="form-footer">
             <el-button type="primary">保存并修改</el-button>
             <el-button>取消</el-button>
         </div>
     </el-card>
</template>

<script>
export default {
    
    data() {
        return {
            form:{
                name:'',
                region:''
            }
        }
    }
}
</script>
<style lang="less" scoped>
.el-form{
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
}
.form-footer{
    text-align: right;
    margin-right: 60px;
}
.tips{
    position: absolute;  
    top: -50px;
    left: 74px;
    font-size: 12px;
    color: #8494a9;
}
</style>