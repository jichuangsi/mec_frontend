<template>
  <el-card>
    <el-form label-width="120px">
      <el-form-item label="证书">
        <el-input v-model="submitForm.findName" style="width:20%" placeholder="请输入"></el-input>
        <el-button type="primary" style="margin-left:50%;" @click="getData">筛选</el-button>
        <el-button @click="showDialog()">新增证书</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="reportName" label="证书名称"> </el-table-column>
      <el-table-column prop="pppNumbers" label="生产批号"> </el-table-column>
      <el-table-column prop="date" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">查看</el-button>
          <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
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
    <el-dialog title="新增抽检" :visible.sync="dialogVisible" width="40%">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-table
            :data="OneList"
            style="width: 100%"
            height="300px"
            :cell-style="{ padding: '5px 0' }"
            :header-cell-style="{ background: '#f0f5ff', padding: '0' }"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="stockNumber" label="生产批号"> </el-table-column>
            <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
            <el-table-column type="selection" label="操作"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>

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
      submitForm: {
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      tableData: [],
      dialogVisible: false,
      OneList: [],
      multipleSelection: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    edit(id) {
      this.$router.push({
        path: 'addCertificate',
        query: {
          Eid: id
        }
      })
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection() //清除
        this.$refs.multipleTable.toggleRowSelection(val.pop()) //pop：最后一个
      } else {
        this.multipleSelection = val //multipleSelection：当前选择的数组
      }
    },
    dialogConfirm() {
      this.dialogVisible = false
      this.$router.push({
        path: 'addCertificate',
        query: {
          id: this.multipleSelection[0].id
        }
      })
    },
    //   打开 对话框
    async showDialog() {
      this.dialogVisible = true
      const { data: res } = await this.$http.post('ProductionController/getAllFinished')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.OneList = res.data.LData
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
      const { data: res } = await this.$http.post('templatesController/updateTCertificateReportById', {
        updateID: id,
        updateType: 'D'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },
    //   获取页面初始数据
    async getData() {
      const { data: res } = await this.$http.post('templatesController/getAllTCertificateReport', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.total = res.data.total
      this.tableData = res.data.list
    },
    handleSizeChange(newSize) {
      this.submitForm.pageSize = newSize
      this.getData()
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.submitForm.pageNum = newPage
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  margin: 60px;
}

/deep/thead .el-table-column--selection .cell {
  display: none !important;
}
</style>
