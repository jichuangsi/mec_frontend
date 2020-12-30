<template>
    <el-card>
        <div class="meta">部门信息</div>
        <el-form :label-position="labelPosition" label-width="120px" :model="addForm">
            <el-form-item label="部门名称">
                <el-input v-model="addForm.departmentName"></el-input>
            </el-form-item>
            <el-form-item label="部门负责人">
                <el-select v-model="addForm.staffId" placeholder="请选择"  style="width:100%">
                    <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in selectedData" :key="item.mapKey"></el-option>
                    
                </el-select>
            </el-form-item>           
            <el-form-item label="部门简介">
                <el-input v-model="addForm.departmentRemark" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="部门状态">
                <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item style="text-align:right;">
                <el-button type="primary" plain @click="cancel">取消</el-button>
                <el-button type="primary" @click="addFormSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
export default {
    data() {
      return {
        selectedData:[],
        labelPosition: 'right',
        addForm: {
          departmentName: '',
          staffId: '',
          departmentRemark: '',
        },
        value: true//部门状态
      };
    },
    created(){
        this.getSelectedData()
    },
    methods:{
        // 获取下拉框数据
        async getSelectedData(){
            const { data: res } = await this.$http.post('SysController/getBasicInfo', this.addForm)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.selectedData=res.data.staffList
        },
        // 点击取消
        cancel(){
            this.$router.go(-1)
        },
        // 保存
        async addFormSubmit(){
            this.addForm.state=Number(this.value)+''
            const { data: res } = await this.$http.post('SysController/addDepartment', this.addForm)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success('保存成功')
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

