<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="生产领料单" name="first">
        <template>
          <el-form label-width="120">
            <el-form-item label="生产计划单号">
              <el-input placeholder="请输入内容" style="width:300px" v-model="submitForm.findName"></el-input>
              <el-button type="primary" plain style="margin-left:50%" @click="getData">筛选</el-button>
              <el-button type="primary"  @click="toProductionPicking">生产领料</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="date" label="领料时间">
              <template slot-scope="scope">
                {{scope.row.createTime|dateFormat}}
              </template>
            </el-table-column>
            <el-table-column prop="ppnumber" label="生产计划单号"> </el-table-column>
            <el-table-column prop="ppinumber" label="生产领料单号"> </el-table-column>
            <el-table-column prop="ppiname" label="生产领料名称"> </el-table-column>
            <el-table-column prop="ppiwarehouseName" label="领料车间"> </el-table-column>
            <el-table-column prop="totalNet" label="总净重(g)"> </el-table-column>
            <el-table-column prop="date" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">查看</el-button>
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
      <el-tab-pane label="入库历史" name="second">入库历史</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [
      ],
      submitForm: {
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      total:0,
    }
  },
  created() {
    if (sessionStorage.getItem('inventorymanage')) {
      this.activeName = sessionStorage.getItem('inventorymanage')
    }
    this.getData()
  },
  methods: {
    toDetail(id){
      this.$router.push({
        path:'/usePicking',
        query:{
          id:id
        }
      })
    },
    toProductionPicking(){
      this.$router.push("/productionPicking")
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
      const { data: res } = await this.$http.post('ProductionInventoryController/updatePPIByPPIId',{
        updateID:id
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },

    async getData(){
      const { data: res } = await this.$http.post('ProductionInventoryController/getAllPPPicking',this.submitForm)
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.tableData=res.data.list
      this.total=res.data.total
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
.el-pagination{
  margin: 60px;
}
</style>
