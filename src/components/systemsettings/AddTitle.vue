<template>
    <el-card>
        <div class="meta">职称信息</div>
        <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="addTitleForm"
        >
            <el-form-item label="职称名称">
                <el-input v-model="addTitleForm.postName"></el-input>
            </el-form-item>
            <el-form-item label="职称级别">
                <el-input v-model="addTitleForm.postLevel"></el-input>

            </el-form-item>
            <el-form-item label="职称简介">
                <el-input
                    v-model="addTitleForm.remark"
                    placeholder="请输入内容"
                ></el-input>
                <div class="tips">*职称级别按数字由小到大排序，数字越大级别越高</div>
            </el-form-item>
            <el-form-item label="部门状态">
                <el-switch
                    v-model="addTitleForm.postState"
                    :active-value="0" :inactive-value="1"
                >
                </el-switch>
            </el-form-item>
            <el-form-item style="text-align:right;">
                <el-button
                    type="primary"
                    plain
                    @click="cancel"
                >取消</el-button>
                <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>

        </el-form>

    </el-card>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      addTitleForm: {
        postName: '',
        postLevel: '',
        remark: '',
        postState:'',
      },
      value: true,//部门状态
      id:-1,
    }
  },
  created(){
    this.id=this.$route.query.id
    if(this.id>=0){
      this.getData()
    }
  },
  methods: {
    // 编辑获取初始数据
    async getData(){
      const { data: res } = await this.$http.post('SysController/getAllSysByNameId',{
        findById:this.id,
        findModelName:'mesPost'
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.addTitleForm=res.data.data
    },
    cancel() {
      this.$router.go(-1)
    },
    async submitForm(){
      const { data: result } = await this.$http.post('SysController/addMesPost', this.addTitleForm)
      if (result.code !== "0010") return this.$message.error(result.msg)
      this.$message.success(this.id>=0?'编辑成功':'新增成功')
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>

.el-card {
  position: relative;
  .meta {
    font-weight: bold;
  }
  .el-form {
    width: 600px;
    margin-left: 140px;
    margin-top: 30px;
    .tips {
      color: #d9001b;
      position: absolute;
      bottom: 64px;
      right: -330px;
    }
  }
}
</style>

