<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="检验报告" name="1">
        <template>
          <el-form :inline="true" ref="form" :model="form" label-width="80px">
            <el-form-item label="模板编号" style="width:60%;">
              <el-input v-model="submitForm.findName" placeholder="请输入搜索内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getData">筛选</el-button>
              <el-button type="primary" plain @click="toAdd()">新增</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="number" label="模板编号"> </el-table-column>
            <el-table-column prop="name" label="模板名称"> </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
            <el-table-column label="启用状态">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.closed" :active-value="0" :inactive-value="1" @change="switchChange(scope.row.id)"> </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="preview(scope.row.id)">预览</el-button>
                <el-button type="success" size="mini" @click="edit(scope.row.id)">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="submitForm.pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="submitForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="质量证书" name="2">
        <template>
          <el-form :inline="true" ref="form" :model="form" label-width="80px">
            <el-form-item label="模板编号" style="width:60%;">
              <el-input v-model="submitForm.findName" placeholder="请输入搜索内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getData">筛选</el-button>
              <el-button type="primary" plain @click="toAdd()">新增</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="number" label="模板编号"> </el-table-column>
            <el-table-column prop="name" label="模板名称"> </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
            <el-table-column label="启用状态">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.closed" :active-value="0" :inactive-value="1" @change="switchChange(scope.row.id)"> </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="preview(scope.row.id)">预览</el-button>
                <el-button type="success" size="mini" @click="edit(scope.row.id)">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="submitForm.pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="submitForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </template>
      </el-tab-pane>
    </el-tabs>
    <!-- <div id="printMe" style="width:220px;height:52px;">
      <canvas id="barcode"  style="width:100%;height:100%;"></canvas>
    </div> -->
    <div id="printMe" style="width:220px;height:52px;">
      <canvas id="barcode"  style="width:100%;height:100%;"></canvas>
    </div>
    <button v-print="'#printMe'">打印</button>
  </el-card>
</template>
<script>
import jsbarcode from 'jsbarcode'
export default {
  data() {
    return {
      dialogVisible: false,
      activeName: '1',
      form: {
        name: ''
      },
      tableData: [],
      submitForm: {
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created() {
    if (sessionStorage.getItem('qualitysetting')) {
      this.activeName = sessionStorage.getItem('qualitysetting')
    }
    this.getData()
  },
  mounted() {
    // 生成条形码
    jsbarcode(
      '#barcode',
      '9787544121212112291170',
      {
        displayValue: true // 是否在条形码下方显示文字
      }
    )
  },
  methods: {
    async preview(id){
      const { data: res } = await this.$http.post('templatesController/getTemplateById/'+id)
      if (res.code !== "0010") return this.$message.error(res.msg)
      window.location.href ='http://192.168.31.92:8080/'+ res.data;
    },
    edit(id){
      this.$router.push({
        path:"/addTemplate",
        query:{
          id:id,
          type:this.activeName
        }
      })
    },
    async del(id) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('templatesController/updateTemplateStatus',{
        updateID:id,
        updateType:'D'
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },
    // tab栏切换
    handleClick() {
      sessionStorage.setItem('qualitysetting', this.activeName)
      this.getData()
    },
    // 前往新增页面
    toAdd() {
      this.$router.push({
        path:"/addTemplate",
        query:{
          type:this.activeName
        }
      })
    },
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.submitForm.pageSize = newSize
      this.getData()
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.submitForm.pageNum = newPage
      this.getData()
    },
    // 修改状态
    async switchChange(id) {
      const { data: res } = await this.$http.post('templatesController/updateTemplateStatus', {
        updateID: id,
        updateType: 'S'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('修改成功')
      this.getData()
    },
    // 获取页面初始数据
    async getData() {
      this.submitForm.findById = this.activeName
      const { data: res } = await this.$http.post('templatesController/getTemplateByPage', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.total = res.data.total
      this.tableData = res.data.list
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  margin: 20px 200px;
}
</style>
