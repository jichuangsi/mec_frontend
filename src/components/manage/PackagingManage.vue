<template>
  <el-card>
    <el-form label-width="120px" inline>
      <el-form-item label="包装编号">
        <el-input style="width:200px;" v-model="submitForm.findName"></el-input>
      </el-form-item>
      <el-button style="margin-left:50%" type="primary" plain @click="getData">筛选</el-button>
      <el-button type="primary" @click="toSetting()" :disabled="rolePowerList.indexOf(89) == -1">新增</el-button>
    </el-form>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="createTime" label="包装时间">
        <template slot-scope="scope">
          {{scope.row.createTime|dateFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="packingName" label="包装编号"> </el-table-column>
      <el-table-column prop="productionNumber" label="生产批号"> </el-table-column>
      <el-table-column prop="productModel" label="产品型号"> </el-table-column>
      <el-table-column prop="cartonsNumber" label=" 装盒数量"> </el-table-column>
      <el-table-column prop="productTime" label="生产日期">
        <template slot-scope="scope">
          {{scope.row.productTime|dateFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="qualityTime" label="保质期">
        <template slot-scope="scope">
          {{scope.row.qualityTime|dateFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="toSetting(scope.row.id)" :disabled="rolePowerList.indexOf(88) == -1">查看</el-button>
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
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
      ],
      total: 0,
      rolePowerList: [],
      submitForm: {
        findName: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.rolePowerList = JSON.parse(sessionStorage.getItem('rolePowerList'))
    this.getData()
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.post('packingController/getAllPicking',this.submitForm)
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.total=res.data.total
      this.tableData=res.data.list
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
    toSetting(id=-1) {
      this.$router.push({
        path:'/PackagingSetting',
        query:{
          id:id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  margin: 60px;
}
</style>
