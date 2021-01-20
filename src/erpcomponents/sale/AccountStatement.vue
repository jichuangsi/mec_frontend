<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="日汇总" name="day">
          <template>
            <el-form label-width="120px">
              <el-form-item label="结算时间">
                <el-col :span="6">
                  <el-date-picker v-model="submitForm.findDate" type="date" placeholder="选择日期"> </el-date-picker>
                </el-col>
                <span style="color:#fb6638;">* 每日的对账单会在 次日凌晨 进行更新，每月的对账单会在 次月首日凌晨 进行更新</span>
                <el-button style="margin-left:30%;" type="primary"> 导出</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="createTime" label="结算时间">
                <template slot-scope="scope">
                  {{scope.row.createTime|dateFormat}}
                </template>
              </el-table-column>
              <el-table-column prop="settlementAccount" label="结算账户"> </el-table-column>
              <el-table-column prop="amountIncurred" label="发生金额（元）"> </el-table-column>
              <el-table-column prop="date" label="操作">
                <template slot-scope="scope">
                  <el-button @click="toDetail(scope.row.orderType)">查看</el-button>
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
        <el-tab-pane label="月汇总" name="month">
          <template>
            <el-form label-width="120px">
              <el-form-item label="结算时间">
                <el-col :span="6">
                  <el-date-picker v-model="submitForm.findDate" type="date" placeholder="选择日期"> </el-date-picker>
                </el-col>
                <span style="color:#fb6638;">* 每日的对账单会在 次日凌晨 进行更新，每月的对账单会在 次月首日凌晨 进行更新</span>
                <el-button style="margin-left:30%;" type="primary"> 导出</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="createTime" label="日期">
                <template slot-scope="scope">
                  {{scope.row.createTime|dateFormat}}
                </template>
              </el-table-column>
              <el-table-column prop="amountIncurred" label="总金额"> </el-table-column>
              
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
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'day',
      tableData: [],
      submitForm: {
        findDate: '',
        pageNum: '',
        pageSize: ''
      },
      total: 0
    }
  },
  created() {
    if(sessionStorage.getItem("accountstatement")){
      this.activeName=sessionStorage.getItem("accountstatement")
    }
    this.getData()
  },
  methods: {
    // 点击查看
    toDetail( orderType){
      if(orderType==1){
        this.$router.push("/purchaseorder")
      }else{
        this.$router.push("/saleorder")
      }
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
    // 获取页面初始数据
    async getData() {
      this.submitForm.findModelName = this.activeName
      const { data: res } = await this.$http.post('saleController/getAllByCreateTimeAndPage', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.total = res.data.total
      this.tableData = res.data.list
    },
    handleClick() {
      sessionStorage.setItem("accountstatement",this.activeName)
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped></style>
