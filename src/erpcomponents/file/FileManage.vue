<template>
  <el-card>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="文件名称">
            <el-input v-model="submitForm.findName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" :offset="6">
          <el-button type="primary" @click="getData">筛选</el-button>
          <el-button type="primary" @click="addDialog" plain>新增</el-button>
          <el-button type="text" @click="clearAll()">清空筛选</el-button>
        </el-col>
      </el-row>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%;margin-top:0">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="createTime" label="上传时间"> </el-table-column>
        <el-table-column prop="fileName" label="文件名称" width="500"> </el-table-column>
        <el-table-column prop="staffName" label="上传人"> </el-table-column>
        <el-table-column prop="isEncryptionstr" label="是否加密"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showPasswordDialog(scope.row, 'download')">下载</el-button>
            <el-button type="success" size="mini" @click="showPasswordDialog(scope.row, 'update')">更新</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="dialogClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文件上传">
          <el-upload
            ref="upload"
            :data="{ findModelName: 'FILE' }"
            action="http://192.168.31.92:8080/fileController/upload"
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
        <el-form-item label="文件加密">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证密码">
          <el-input v-model="form.password2" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="请输入密码" :visible.sync="passwordVisible" width="30%" @close="passwordClose">
      <el-row>
        <el-col :span="4" :offset="1" style="padding-top:10px;">文档密码</el-col>
        <el-col :span="12" :offset="1"><el-input placeholder="请输入密码" type="password" v-model="dialogPassword"></el-input></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passwordVisible = false">取 消</el-button>
        <el-button type="primary" @click="passwordConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import md5 from 'js-md5';
export default {
  inject: ['reload'],
  data() {
    return {
      form: {
        password: '',
        password2: ''
      },
      dialogVisible: false,
      tableData: [],
      submitForm: {
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      // 图片上传组件的headers请求头对象
      headerObj: {
        accessToken: window.sessionStorage.getItem('token')
      },
      fileList: [],
      addForm: {
        fileName: '',
        fileRoute: '',
        filePassword: ''
      },
      id: -1,
      passwordVisible: false,
      dialogPassword: '',
      type: '',
      id: '' //选中的id
    }
  },
  created() {
    this.getData()
  },
  methods: {
    //清空筛选
    clearAll() {
      this.submitForm.findName = ''
    },
    // 监听密码的对话框关闭
    passwordClose() {
      this.dialogPassword = ''
    },
    //密码框点击确认
    passwordConfirm() {
      if (this.type == 'download') {
        this.downLoad(this.id)
      } else if (this.type == 'update') {
        this.addDialog(this.id)
      }
      this.passwordVisible = false
    },
    //显示密码框
    showPasswordDialog(row, type) {
        this.type = type
        this.id = row.id
        if(row.isEncryption){
            this.passwordVisible = true
            
        }else{
            this.passwordConfirm()
        }
      
    },
    // 新增监听对话框关闭
    dialogClose() {
      this.form = {
        password: '',
        password2: ''
      }
      this.addForm = {
        fileName: '',
        fileRoute: '',
        filePassword: ''
      }
      this.fileList=[]
      this.$refs.upload.clearFiles()
    },
    //新增点击确认
    async dialogConfirm() {
      if (this.form.password !== this.form.password2) {
        return this.$message.error('两次密码不一致')
      }
      if (this.id >= 0) {
        this.addForm.id = this.id
      }
      this.addForm.filePassword =this.form.password2? md5(this.form.password2):''

      const { data: res } = await this.$http.post('fileController/saveFile', this.addForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('新增成功')
      this.dialogVisible = false
      this.getData()
    },
    //   监听图片上传成功
    handleSuccess(response) {
      this.addForm.fileName = response.data.fileName
      this.addForm.fileRoute = response.data.path
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    //点击新增
    async addDialog(id = -1) {
      if (id >= 0) {
        this.id = id
        const { data: res } = await this.$http.post('fileController/getFileById', {
          findById: this.id,
          findName: this.dialogPassword
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.addForm = res.data.fileTable
        this.form.password = res.data.fileTable.filePassword
        this.form.password2 = res.data.fileTable.filePassword
        this.fileList.push({
          name: res.data.fileTable.fileName,
          url: 'http://192.168.31.92:8080/' + res.data.fileTable.fileRoute
        })
      }
      this.dialogVisible = true
    },
    // 删除文件
    async del(id) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('fileController/updateFileByid', {
        updateID: id,
        updateType: 'D'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },
    // 下载文件
    async downLoad(id) {
      const { data: res } = await this.$http.post('fileController/downloadFile', {
        findById: id,
        findModelName: 'FILE',
        findName: md5(this.dialogPassword)
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      window.location.href = 'http://192.168.31.92:8080/' + res.data
    },
    // 获取页面初始数据
    async getData() {
      const { data: res } = await this.$http.post('fileController/getAllFile', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.total = res.data.total
      this.tableData = res.data.list
    },
    // 采购订单
    toSaleBilling() {
      this.$router.push('/salebilling')
    },
    // 跳转页面
    todo(path) {
      window.sessionStorage.setItem('activePath', path)
      this.$router.push(path)
      this.reload()
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  width: 100%;
  min-height: 100%;
  position: relative;
  .item {
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    margin-bottom: 30px;
    cursor: pointer;
  }
  .current {
    position: relative;
    color: #0790ff;
    &:after {
      content: ' ';
      width: 100px;
      height: 4px;
      background: #0790ff;
      position: absolute;
      bottom: -7px;
      border-radius: 2px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .el-pagination {
    margin: 60px;
  }
}
</style>
