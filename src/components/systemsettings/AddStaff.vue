<template>
    <el-card>
        <div class="meta">员工信息</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="form">
            <el-form-item label="员工编号">
                <el-input v-model="form.staffNum" disabled></el-input>
            </el-form-item>
            <el-form-item label="员工姓名">
                <el-input v-model="form.staffName"></el-input>
            </el-form-item>
            <el-form-item label="员工年龄">
                <el-input v-model="form.staffAge"></el-input>
            </el-form-item>
            <el-form-item label="员工职称">
                <el-select v-model="form.postId" placeholder="请选择"  style="width:100%">
                    <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in initData.mespost" :key="item.mapkey"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="form.gender" placeholder="请选择"  style="width:100%">
                    <el-option label="男" value="1" ></el-option>
                    <el-option label="女" value="0" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱">
                <el-input v-model="form.eMail"></el-input>
            </el-form-item>
            <el-form-item label="证件号码">
                <el-input v-model="form.idcard"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.staffAddress"></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
                <el-select v-model="form.departmentId" placeholder="请选择"  style="width:100%">
                    <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in initData.bumen" :key="item.mapkey"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="所属厂房">
                <el-select v-model="form.workshopId" placeholder="请选择"  style="width:100%">
                    <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in initData.cangfang" :key="item.mapkey"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.loginPassword" placeholder="6-12位,包含数字和字母"></el-input>
            </el-form-item>
            <el-form-item label="员工状态">
                <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item label="角色">
                 <el-checkbox-group v-model="checkList">
                    <el-checkbox 
                    :label="item.mapValue" v-for="item in initData.juese" :key="item.mapkey"
                    >

                    </el-checkbox>
                    
                </el-checkbox-group>
            </el-form-item>
            <el-form-item style="text-align:right;">
                <el-button type="primary" plain @click="cancel">取消</el-button>
                <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
export default {
    data() {
      return {
        //   角色的多选框
        checkList:[],
        labelPosition: 'right',
        // 提交的数据表单
        form: {
          staffNum: '',
          staffName: '',
          staffAge: '',
          postId:'',
          gender:'',
          phone:'',
          eMail:'',
          idcard:'',
          staffAddress:'',
          departmentId:'',
          workshopId:'',
          loginPassword:'',
          state:'',         
        },
        value: true,
        initData:{},
      };
    },
    
    created(){
        this.getData()
    },
    methods:{
        cancel(){
            this.$router.go(-1)
        },
        // 获取初始数据
        async getData(){
            const { data: res } = await this.$http.post('SysController/getStaffBasicInfo')
            this.initData=res.data
            this.form.staffNum=this.initData.StaffNum
        },
        // 点击提交
        async submitForm(){
            this.form.state=Number(this.form.state)+''
            let selectedList=[]  
            this.initData.juese.forEach(item=>{
                if(this.checkList.includes(item.mapValue)){
                     selectedList.push(item.mapKey)                   
                }   
            })
            this.form.roleId=selectedList.join(',')
            const { data: res } = await this.$http.post('userController/registUser', this.form)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success('新增成功')
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
.el-card{
    .meta{
        font-weight: bold;
    }
    .el-form {
        margin-left: 140px;
        width: 600px;
        margin-top: 30px;
  }
}
</style>

