<template>
  <el-card>
    <div style="font-weight:bold">班组生产统计</div>
    <el-row :gutter="100">
        <el-col :span="12">
            <div id="main" style="width: 100%;height:400px;"></div>
        </el-col>
        <el-col :span="12">
            <div id="main2" style="width: 100%;height:400px;"></div>
        </el-col>
    </el-row>
    
    
    <el-form label-width="100px">
      <el-form-item label="生产日期">
        <el-date-picker v-model="submitForm.findDate" format="yyyy 年 MM" value-format="yyyy-MM" type="month" placeholder="选择月"> </el-date-picker>
        <el-button style="margin-left:100px;" type="primary" @click="getData">查询本月</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" :header-cell-style="{ background: '#f0f5ff' }" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="productDate" label="生产日期">
          <template slot-scope="scope">
              {{scope.row.productDate|dateFormat}}
          </template>
      </el-table-column>
      <el-table-column prop="incomeHeavy" label="来料g"> </el-table-column>
      <el-table-column prop="finishEdP" label="成品g"> </el-table-column>
      <el-table-column prop="wastageg" label="废料g"> </el-table-column>
      <el-table-column prop="lossg" label="损耗g"> </el-table-column>
      <el-table-column prop="netWeightgRate" label="成品率%"> </el-table-column>
      <el-table-column prop="wastagegRate" label="废品率%"> </el-table-column>
      <el-table-column prop="lossgRate" label="损耗率%"> </el-table-column>
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
import echarts from 'echarts'
export default {
  data() {
    return {
      submitForm: {
        findDate: '',
        pageNum: 1,
        pageSize: 10
      },
      list: [],
      RData: [],
      LData: [],
      total: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
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
    setChart2() {
      var myChart = echarts.init(document.getElementById('main2'))
      var option = {
        title: {
          text: '生产质量直方图'
        },

        xAxis: {
          data: this.RData.oneData
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: this.RData.twoData
          }
        ]
      }
      myChart.setOption(option)
    },
    setChart() {
      var myChart = echarts.init(document.getElementById('main'))
      var option = {
          title: {
          text: '生产质量扇形图'
        },
        series: [
          {
            name: '生产质量扇形图',
            type: 'pie',
            radius: '55%',
            data: this.LData
          }
        ]
      }
      myChart.setOption(option)
    },
    async getData() {
      const { data: res } = await this.$http.post('ProductionDataController/getProductionQualityAnalysis', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.LData = res.data.LData
      this.RData = res.data.RData
      this.list = res.data.list.list
      this.total=res.data.list.total
      this.setChart()
      this.setChart2()
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  width: 100%;
}
.el-pagination {
  margin: 60px;
}
</style>
