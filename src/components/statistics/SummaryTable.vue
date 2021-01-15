<template>
  <el-card>
    <el-form ref="form" label-width="80px">
      <el-row :gutter="40">
        <el-col :span="6">
          <el-form-item label="生产批号">
            <el-input v-model="submitForm.findModelName" placeholder="请输入搜索内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生产单号">
            <el-input v-model="submitForm.findName" placeholder="请输入搜索内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生产日期">
            <el-date-picker v-model="submitForm.findDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="getData">筛选</el-button>
          <download-excel class="export-excel-wrapper" :data="tableData" :fields="json_fields" name="生产日报汇总表.xls">
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            <el-button type="primary">导出</el-button>
          </download-excel>
          <el-button type="text" @click="clear"> 清空筛选</el-button>
        </el-col>
      </el-row>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="productDate" label="生产日期"> </el-table-column>
        <el-table-column prop="ppNumber" label="生产单号"> </el-table-column>
        <el-table-column prop="productionNumber" label="生产批号" width="200"> </el-table-column>
        <el-table-column prop="productModel" label="型号"> </el-table-column>
        <el-table-column prop="incomeHeavy" label="来料重g"> </el-table-column>
        <el-table-column prop="noFinishEdP" label="半成品g"> </el-table-column>
        <el-table-column prop="finishEdP" label="成品g"> </el-table-column>
        <el-table-column prop="loss" label="损耗g"> </el-table-column>
        <el-table-column prop="waste" label="废料g"> </el-table-column>
        <el-table-column prop="totalNet" label="线上合计g"> </el-table-column>
      </el-table>
    </el-form>
    <el-pagination :current-page="submitForm.pageNum" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </el-card>
</template>
<script type="javascript">
export default {
  data() {
    return {
      tableData: [],
      // 自主选择要导出的字段，若不指定，默认导出全部数据中心全部字段
      json_fields: {
        日期: 'date', //常规字段
        姓名: 'name', //支持嵌套属性
        地址: 'address'
      },
      // 需要导出的数据
      json_data: [
        {
          name: 'Tony Peña',
          city: 'New York',
          country: 'United States',
          birthdate: '1978-03-15',
          phone: {
            mobile: '1-541-754-3010',
            landline: '(541) 754-3010'
          }
        },
        {
          name: 'Thessaloniki',
          city: 'Athens',
          country: 'Greece',
          birthdate: '1987-11-23',
          phone: {
            mobile: '+1 855 275 5071',
            landline: '(2741) 2621-244'
          }
        }
      ],
      json_meta: [
        [
          {
            ' key ': ' charset ',
            ' value ': ' utf- 8 '
          }
        ]
      ],
      submitForm:{
        findModelName: "",
        findName: "",
        findDate: "",
        pageNum: 1,
        pageSize: 10
      },
      total:0,

    }
  },
  created() {
    this.getData()
  },
  methods: {
    clear(){
      this.submitForm={
        findModelName: "",
        findName: "",
        findDate: "",
        pageNum: 1,
        pageSize: 10
      }
    },
    async getData(){
      const { data: res } = await this.$http.post('ProductionDataController/getProductionDiaryReport',this.submitForm)
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
  }
}
</script>
<style lang="less" scoped>
.export-excel-wrapper {
  display: inline-block;
  margin: 0 20px;
}
.el-card {
  width: 100%;
  position: relative;
  .el-pagination {
    margin: 60px;
  }
}
</style>
