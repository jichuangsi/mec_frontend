<template>
  <el-card>
    <div style="font-weight:bold">班组生产统计</div>
    <div id="main" style="width: 100%;height:400px;"></div>
    <div id="main2" style="width: 100%;height:400px;"></div>
    <el-form label-width="100px">
      <el-form-item label="生产日期">
        <el-date-picker v-model="submitForm.findDate" format="yyyy 年 MM" value-format="yyyy-MM" type="month" placeholder="选择月"> </el-date-picker>
        <el-button style="margin-left:100px;" type="primary" @click="getData">查询本月</el-button>
      </el-form-item>
    </el-form>
    <el-table style="margin:60px 0;width: 100%;" :data="list" :header-cell-style="{ background: '#f0f5ff' }">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="teamName" label="班组"> </el-table-column>
      <el-table-column prop="incomeHeavy" label="来料g"> </el-table-column>
      <el-table-column prop="finishEdP" label="成品g"> </el-table-column>
      <el-table-column prop="wastageg" label="废料g"> </el-table-column>
      <el-table-column prop="lossg" label="损耗g"> </el-table-column>
      <el-table-column prop="netWeightgRate" label="成品率%"> </el-table-column>
      <el-table-column prop="wastagegRate" label="废品率%"> </el-table-column>
      <el-table-column prop="lossgRate" label="损耗率%"> </el-table-column>
    </el-table>
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
      twoData: [],
      oneData: [],
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
          text: '比例直方图',
          x: 'center',
          y: 'bottom'
        },

        tooltip: {},
        dataset: {
          dimensions: this.twoData.dimensions,
          source: this.twoData.source
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      }
      myChart.setOption(option)
    },
    setChart() {
      var myChart = echarts.init(document.getElementById('main'))
      var option = {
        title: {
          text: '产量直方图',
          x: 'center',
          y: 'bottom'
        },
        legend: {
          selectedMode: false
        },
        tooltip: {},
        dataset: {
          dimensions: this.oneData.dimensions,
          source: this.oneData.source
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      }
      myChart.setOption(option)
    },
    async getData() {
      const { data: res } = await this.$http.post('ProductionDataController/getProductionTeam', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.twoData = res.data.twoData
      this.oneData = res.data.oneData
      this.list = res.data.list
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
