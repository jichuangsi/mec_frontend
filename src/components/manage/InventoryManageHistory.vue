<template>
  <el-card>
    <el-form inline label-width="80px">
      <el-form-item label="生产批号" style="width:20%">
        <el-input placeholder="请输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item label="包装编号" style="width:20%">
        <el-input placeholder="请输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:40%">
        <el-button type="primary" @click="toProductionWarehousing">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="name" label="入库时间"> </el-table-column>
      <el-table-column prop="address" label="生产批号"> </el-table-column>
      <el-table-column prop="address" label="包装编号"> </el-table-column>
      <el-table-column prop="address" label="产品型号"> </el-table-column>
      <el-table-column prop="address" label="长度/轴"> </el-table-column>
      <el-table-column prop="address" label="轴数"> </el-table-column>
      <el-table-column prop="address" label="总长度"> </el-table-column>
      <el-table-column prop="address" label="总净重"> </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      submitForm: {
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      tableData: [
        
      ]
    }
  },
  created() {
    if (sessionStorage.getItem('inventorymanage')) {
      this.activeName = sessionStorage.getItem('inventorymanage')
    }
    this.getData()
  },
  methods: {
    toProductionWarehousing() {
      this.$router.push('/productionWarehousing')
    },
    toDetail(id) {
      this.$router.push({
        path: '/usePicking',
        query: {
          id: id
        }
      })
    },
    toProductionPicking() {
      this.$router.push('/productionPicking')
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
      const { data: res } = await this.$http.post('ProductionInventoryController/updatePPIByPPIId', {
        updateID: id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },

    async getData() {
      const { data: res } = await this.$http.post('ProductionInventoryController/getAllPPPicking', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.tableData = res.data.list
      this.total = res.data.total
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
    handleClick() {
      sessionStorage.setItem('inventorymanage', this.activeName)
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  margin: 60px;
}
</style>
