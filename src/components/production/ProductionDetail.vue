<template>
  <div>
    <el-page-header @back="cancel" content="模具维护" style="margin-bottom:20px;"> </el-page-header>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div style="font-weight:bold;">基本信息</div>
          <el-row style="margin:15px 0;">
            <el-col :span="7">生产计划单号</el-col>
            <el-col :span="16" :offset="1" style="color:#9494bc;">{{pp.ppNumber}}</el-col>
          </el-row>
          <el-row style="margin:15px 0;">
            <el-col :span="7">计划下达日期</el-col>
            <el-col :span="16" :offset="1" style="color:#9494bc;">{{pp.createTime|dateFormat}}</el-col>
          </el-row>
          <el-row style="margin:15px 0;">
            <el-col :span="7">计划完工日期</el-col>
            <el-col :span="16" :offset="1" style="color:#9494bc;">{{pp.finishedTime|dateFormat}}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <div style="font-weight:bold;">产量统计</div>
          <el-row style="margin:15px 0">
            <el-col :span="6">
              <el-col :span="18">拉丝完成轴数</el-col>
              <el-col :span="4" style="color:#9494bc;">{{OutputStatistics.wireCompleteNum}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="18">退火完成轴数</el-col>
              <el-col :span="4" style="color:#9494bc;">{{OutputStatistics.annealingCompleteNum}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="18">绕线完成轴数</el-col>
              <el-col :span="4" style="color:#9494bc;">{{OutputStatistics.windingCompleteNum}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="18">检验轴数</el-col>
              <el-col :span="4" style="color:#9494bc;">{{OutputStatistics.checkNum}}</el-col>
            </el-col>
          </el-row>
          <el-row style="margin:15px 0">
            <el-col :span="6">
              <el-col :span="18">拉丝未完成轴数</el-col>
              <el-col :span="4" style="color:#9494bc;">{{OutputStatistics.wireNoCompleteNum}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="18">退火未完成轴数</el-col>
              <el-col :span="4" style="color:#9494bc;">{{OutputStatistics.annealingNoCompleteNum}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="18">绕线未完成轴数</el-col>
              <el-col :span="4" style="color:#9494bc;">{{OutputStatistics.windingNoCompleteNum}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="18">检验不合格轴数</el-col>
              <el-col :span="4" style="color:#9494bc;">{{OutputStatistics.checkNoQualifiedNum}}</el-col>
            </el-col>
          </el-row>
          <el-row style="margin:15px 0">
            <el-col :span="6">
              <el-col :span="18">检验合格轴数</el-col>
              <el-col :span="4" style="color:#9494bc;">{{OutputStatistics.checkQualifiedNum}}</el-col>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px;" v-if="customerDetail.length>0">
      <el-col :span="14">
        <el-card>
          <div style="font-weight:bold;">关联销售订单信息</div>
          <el-row style="margin:20px 0;">
            <el-col :span="6">销售单号</el-col>
            <el-col :span="6" style="color:#9494bc;">{{saleorder.saleOrder}}</el-col>
            <el-col :span="6">客户编号</el-col>
            <el-col :span="6" style="color:#9494bc;">{{saleorder.customerNumber}}</el-col>
          </el-row>
          <el-row style="margin:20px 0;">
            <el-col :span="6">订单状态</el-col>
            <el-col :span="6" style="color:#9494bc;"> {{saleorder.orderStates}}  </el-col>
            <el-col :span="6">客户名称</el-col>
            <el-col :span="6" style="color:#9494bc;">{{saleorder.customer}}</el-col>
          </el-row>
          <el-row style="margin:20px 0;">
            <el-col :span="6">开单日期</el-col>
            <el-col :span="6" style="color:#9494bc;">{{saleorder.createTime}}</el-col>
            <el-col :span="6">联系电话</el-col>
            <el-col :span="6" style="color:#9494bc;">{{saleorder.contactsPhone}}</el-col>
          </el-row>
          <el-row style="margin:20px 0;">
            <el-col :span="6">交货日期</el-col>
            <el-col :span="6" style="color:#9494bc;">{{saleorder.finishedTime}}</el-col>
            <el-col :span="6">联系人</el-col>
            <el-col :span="6" style="color:#9494bc;">{{saleorder.contactsMan}}</el-col>
          </el-row>
          <el-row style="margin:20px 0;">
            <el-col :span="6">付款方式</el-col>
            <el-col :span="6" style="color:#9494bc;">{{saleorder.payType}}</el-col>
            <el-col :span="6">联系人职称</el-col>
            <el-col :span="6" style="color:#9494bc;">{{saleorder.contactsPost}}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <div style="font-weight:bold">客户信息</div>
          <el-table :data="customerDetail" style="width: 100%" height="210" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }">
            <el-table-column prop="customerDetailName" label="条目名称"  > </el-table-column>
            <el-table-column prop="remark" label="备注" > </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">设置班组和班次</div>
      <el-table :data="pp_scheduling" :header-cell-style="{background:'#f0f5ff' }"   style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="gxName" label="工序"  > </el-table-column>
        <el-table-column prop="tteamName" label="班组" > </el-table-column>
        <el-table-column prop="frequencystr" label="班次"> </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">关联套模方案 <el-button style="margin-left:70%" type="primary" plain>预览套模 </el-button> </div>
      <el-table :data="suitDetail"  :header-cell-style="{background:'#f0f5ff' }"  style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="compositeType" label="工序"  > </el-table-column>
        <el-table-column prop="mouldType" label="模具类别" >
          <template slot-scope="scope">
            {{scope.row.mouldType==0?'不使用模具':scope.row.mouldType==1?'成品模具':'成套模具'}}
          </template>
        </el-table-column>
        <el-table-column prop="mouldNumber" label="模具编号" > </el-table-column>
        <el-table-column prop="sonmouldModel" label="模具型号" > </el-table-column>
        <el-table-column prop="sonmouldModel" label="套模编号" > </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">设置生产计划 </div>
      <el-table :data="ppproduct" :header-cell-style="{background:'#f0f5ff' }"   style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="productName" label="产品名称"  > </el-table-column>
        <el-table-column prop="productModel" label="产品型号" > </el-table-column>
        <el-table-column prop="productNumber" label="产品编号" > </el-table-column>
        <el-table-column prop="standards" label="规格" > </el-table-column>
        <el-table-column prop="length" label="长度（m/轴）" > </el-table-column>
        <el-table-column prop="quantum" label="数量（轴）" > </el-table-column>
        <el-table-column prop="sumMI" label="合计（米）" > </el-table-column>
      </el-table>
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
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      id:'',
      ppproduct:[],
      pp_scheduling:[],
      pp:{},
      OutputStatistics:{},
      saleorder:'',
      customerDetail:[],
      suitDetail:[],
    }
  },
  created () {
    this.id=this.$route.query.id
    this.getData()
  },
  methods: {
    // 获取页面初始数据
    async getData(){
      const { data: res } = await this.$http.post('ProductionPlanController/getProductPlanById',{
        findById:this.id,
        findModelName:'S'
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.OutputStatistics=res.data.OutputStatistics
      this.pp=res.data.pp
      this.pp_scheduling=res.data.pp_scheduling
      this.ppproduct=res.data.ppproduct
      this.suitDetail=res.data.suitDetail
      if(res.data.saleorder){
        this.saleorder=res.data.saleorder
      }
      if(res.data.customerDetail){
        this.customerDetail=res.data.customerDetail
      }
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-table::before {
  //去掉最下面的那一条线
  height: 0px;
}
/deep/.el-col {
  min-height: 1px
}
</style>
