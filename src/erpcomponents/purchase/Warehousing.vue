<template>
  <el-card>
    <el-form ref="form" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="采购单号">
            <el-input v-model="getDataForm.findName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开单时间">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="6">
          <el-button type="primary" @click="getData()">筛选</el-button>
          <el-button>导出</el-button>
          <el-button type="text" @click="clear">清空筛选</el-button>
        </el-col>
      </el-row>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%;margin-top:0">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="createTime" label="开单时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormatHH }}
          </template>
        </el-table-column>
        <el-table-column prop="purchaseOrder" label="采购单号"> </el-table-column>
        <el-table-column prop="customerName" label="供应商"> </el-table-column>
        <el-table-column prop="orderSum" label="订单总金额（元）"> </el-table-column>
        <el-table-column prop="staffName" label="负责人"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="orderState" label="订单状态"> </el-table-column>
        <el-table-column prop="checkState" label="检验结果"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toPurchaseBilling(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="getDataForm.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="getDataForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>
<script>
export default {
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      getDataForm: {
        findName: '',
        pageNum: 1,
        pageSize: 5
      },
      total: 1
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 点击筛选
    clear() {
      this.getDataForm.findName = ''
    },
    // 删除单条数据
    async deleteData(id) {
      const { data: res } = await this.$http.post('PurchaseController/updatePurchaseByid', {
        updateID: id,
        updateType: 'D'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },
    // 监听当前页发生变化
    handleCurrentChange(e) {
      this.getDataForm.pageNum = e
      this.getData()
    },
    // 监听页码大小发生变化
    handleSizeChange(e) {
      this.getDataForm.pageSize = e
      this.getData()
    },
    // 获取页面初始数据
    async getData() {
      const { data: res } = await this.$http.post('PurchaseController/getAllPurchase', this.getDataForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.total = res.data.total
      this.tableData = res.data.list
    },
    // 采购订单
    toPurchaseBilling(id = '') {
      if (id) {
        this.$router.push({
          path: '/warehousingDetail',
          query: {
            id: id
          }
        })
      }
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
  height: 100%;
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
