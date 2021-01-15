<template>
  <el-card class="container">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-card style=" margin-top:40px;">
          <el-table :data="LData" highlight-current-row style="width: 100%" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ padding: '0',fontSize:'14px' }" @row-click="rowClick">
            <el-table-column prop="name" label="类型"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="21">
        <el-form :inline="true" :model="formInline" >
          <el-form-item label="名称" style="margin-right:200px;">
            <el-input v-model="submitForm.findName" placeholder="请输入搜索内容"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="getData">筛选</el-button>
            <el-button type="primary"  @click="showDialog()">新增</el-button>
          </el-form-item>
        </el-form>
        <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="RData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间"> </el-table-column>
          <el-table-column prop="dictFname" label="类型"> </el-table-column>
          <el-table-column prop="dictname" label="名称"> </el-table-column>
          <el-table-column prop="staffName" label="创建人"> </el-table-column>
          <el-table-column label="状态操作">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1" @change="switchChange(scope.row.id)"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.$index,scope.row.id)">编辑</el-button>
              <el-button type="text" style="color:red;" @click="del(scope.row.id,scope.$index)">删除</el-button>
              <el-button type="text">更多</el-button>
            </template>
          </el-table-column>
        </el-table>
        
      </el-col>
    </el-row>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    @close="dialogClose">
    <el-form  label-width="120px">
      <el-form-item label="类别" v-if="index==-1">
        <el-select v-model="dialogForm.dictFID" placeholder="请选择" style="width:60%">
          <el-option :label="item.name" :value="item.id" v-for="item in LData" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" 名称">
        <el-input v-model="dialogForm.name" style="width:60%"></el-input>
      </el-form-item>
      
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogConfirm">确 定</el-button>
    </span>
  </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      formInline: {
        user: '',
        region: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      value: true,
      submitForm: {
        findName: ''
      },
      RData: [],
      LData: [],
      dialogVisible: false,
      dialogForm:{
        id:'',
        name:'',
        dictFID:"",
      },
      index:-1,
      row:{},//左边的选中项
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 监听对话框关闭
    dialogClose(){
      this.index=-1
      this.dialogForm={
        id:'',
        name:'',
        dictFID:"",
      }
    },
    // 对话框点击确认
    async dialogConfirm(){
      const { data: res } = await this.$http.post('SysController/saveDictionary',this.dialogForm)
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success(this.index>=0?'编辑成功':"新增成功")
      this.dialogVisible=false
      this.getData()
    },
    // 点击打开对话框
    async showDialog(index=-1,id=-1){
      if(index>=0){
        this.dialogForm.id=id
        this.index=index
        this.dialogForm.name=this.RData[index].dictname
        
      }
      this.dialogForm.dictFID=this.row.id
      this.dialogVisible=true
    },
    // 点击删除
    async del(id,index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('SysController/updateStateById',{
        updateID:id,
        updateType:'D'
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.RData.splice(index, 1)
    },
    // 监听switch改变
    async switchChange(id){
      const { data: res } = await this.$http.post('SysController/updateStateById',{
        updateID:id,
        updateType:'S'
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success('修改成功')
    },
    // 监听行点击
    async rowClick(row) {
      this.row=row
      const { data: res } = await this.$http.post('SysController/findDictionaryByFid',{
        findById:row.id
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.RData=res.data.RData
    },
    // 获取页面初始数据
    async getData() {
      const { data: res } = await this.$http.post('SysController/findDictionary', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.LData = res.data.LData
      this.RData = res.data.RData
      this.row=this.LData[0]
    }
  }
}
</script>
<style lang="less" scoped></style>
