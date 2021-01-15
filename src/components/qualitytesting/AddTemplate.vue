<template>
  <div>
    <el-page-header @back="cancel" content="新增模板" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div style="font-weight:bold;margin-bottom:40px;">基本信息</div>
      <el-form label-width="200px">
        <el-form-item label="模板编号">
          <el-input v-model="form.number" style="width:30%;" disabled></el-input>
        </el-form-item>
        <el-form-item label="模板名称">
          <el-input v-model="form.name" style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label="线别">
          <el-select v-model="form.xb" placeholder="请选择 " style="width:30%;">
            <el-option :label="item.name" :value="item.id" v-for="item in XB" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检验报告模板">
          <el-upload
            ref="upload"
            :data="{ findModelName: 'FILE' }"
            action="http://192.168.31.93:8080/fileController/upload"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :headers="headerObj"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传doc/docx/pdf/jpg/png文件，且不超过100M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="text-align:center;margin:100px 40%">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveAll">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aaa: '',
      templatesNumber: '',
      XB: [],
      form: {
        type: 1,
        fileRoute: '',
        name: ' ', //模板名称
        number: ' ', //模板编号
        remark: ' ', //备注
        xb: '', //线别id
        id: '' //新增的时候不用传。修改的时候必须传
      },
      // 图片上传组件的headers请求头对象
      headerObj: {
        accessToken: window.sessionStorage.getItem('token')
      },
      fileList: [],
      id: -1
    }
  },
  created() {
    this.getData()
    this.form.type=this.$route.query.type
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
  },
  methods: {
    //   监听图片上传成功
    handleSuccess(response) {
      this.form.fileRoute = response.data.path
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    //   保存所有数据
    async saveAll() {
      const { data: res } = await this.$http.post('templatesController/addTemplate', this.form)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success(this.id>=0?'编辑成功':'新增成功')
      this.$router.go(-1)
    },
    // 获取页面初始数据
    async getData() {
      const { data: res } = await this.$http.post('templatesController/getAddTemplateInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.form.number = res.data.templatesNumber
      this.XB = res.data.XB
      if (this.id >= 0) {
        const { data: res } = await this.$http.post('templatesController/getTemplateById', {
          findById: this.id
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.form=res.data
      }
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped></style>
