<template>
  <div>
    <el-page-header @back="cancel" content="生产领料" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div style="font-weight:bold;margin-bottom:20px">
        生产领料
      </div>
      <el-row :gutter="40">
        <el-col :span="8">
          <div style="margin-bottom:20px;">当前生产计划单</div>
          <el-card v-for="item in productPlan" :class="[ {current:row.id==item.id}]" :key="item.id" style="margin-bottom:20px;padding:0;" @click.native="chooseItem(item)">
            <el-row style="margin:5px 0">
              <el-col :span="12">生产计划单：{{item.ppNumber}}</el-col>
              <el-col :span="12">销售单号：{{item.saleOrder}}</el-col>
            </el-row>
            <el-row style="margin:5px 0">
              计划下达日期：{{item.createTime|dateFormat}}
            </el-row>
            <el-row style="margin:5px 0">
              计划完工日期：{{item.finishedTime|dateFormat}}
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="16">
          <div style="margin-bottom:20px;">生产计划单列表</div>
          <div style="margin-bottom:10px;">生产计划单号：{{row.ppNumber}}</div>
          <div style="margin-bottom:10px;">销售单号：{{row.saleOrder}} <el-button type="primary" style="margin-left:40%" @click="toUsePicking">使用该计划单进行领料</el-button></div>
          <el-card style="min-height:500px;">
            <el-table :data="ppproduct" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="productName" label="产品名称"> </el-table-column>
              <el-table-column prop="productModel" label="产品型号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="length" label="长度m/轴"> </el-table-column>
              <el-table-column prop="quantum" label="数量"> </el-table-column>
              <el-table-column prop="sumMI" label="合计"> </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      productPlan:[],
      row:{},
      ppproduct:[]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    toUsePicking(){
      sessionStorage.setItem("productionPicking",JSON.stringify(this.row))
      this.$router.push({
        path:"/usePicking",
        query:{
          id:-1
        }
      })
    },
    async chooseItem(row){
      this.row=row
      const { data: res } = await this.$http.post('ProductionInventoryController/getPPPlanInfoById',{
        findById:row.id
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.ppproduct=res.data.ppproduct
    },
    // 获取也页面初始数据
    async getData(){
      const { data: res } = await this.$http.post('ProductionInventoryController/getPPPlanInfo' )
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.productPlan=res.data.productPlan
      this.chooseItem(this.productPlan[0])
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.current{
  border: 1px solid #00b2ff;
}
</style>
