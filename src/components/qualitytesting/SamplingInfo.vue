<template>
  <div>
    <el-page-header @back="cancel" content="查看抽检情况" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div class="wrapper">
        <h2>银合金检验和试验报告</h2>
        <el-row style="text-align:center">
          <el-col :span="4"> 用户 </el-col>
          <el-col :span="8"> {{ BasicInfo.customerName }} </el-col>
          <el-col :span="4"> 进检轴数 </el-col>
          <el-col :span="8" class="border-right-none"> 110 </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 部件号 </el-col>
          <el-col :span="8"> </el-col>
          <el-col :span="4"> 进检包牌编号 </el-col>
          <el-col :span="8" class="border-right-none"> </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 订单号 </el-col>
          <el-col :span="8"> {{ BasicInfo.ppNumber }} </el-col>
          <el-col :span="4"> 进检盒号 </el-col>
          <el-col :span="8" class="border-right-none"> {{ TSamplingReport.inspectionBoxNumber }} </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 批号 </el-col>
          <el-col :span="8"> </el-col>
          <el-col :span="4"> 抽检轴数 </el-col>
          <el-col :span="8" class="border-right-none"> {{ TSamplingReport.samplesNums }} </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 型号 </el-col>
          <el-col :span="8"> {{ BasicInfo.productModel }} </el-col>
          <el-col :span="4"> 抽检包装编号 </el-col>
          <el-col :span="8" class="border-right-none"> {{ TSamplingReport.samplesPackingNumber }} </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 直径(μm) </el-col>
          <el-col :span="8"> {{ TSamplingReport.checkUm }} </el-col>
          <el-col :span="4"> 合格成品轴数 </el-col>
          <el-col :span="8" class="border-right-none"> {{ TSamplingReport.qualifiedNum }} </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 长度(m/轴) </el-col>
          <el-col :span="8"> {{ BasicInfo.length }} </el-col>
          <el-col :span="4"> 不合格轴数 </el-col>
          <el-col :span="8" class="border-right-none"> {{ TSamplingReport.unqualifiedNum }} </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 轴号 </el-col>
          <el-col :span="8"> </el-col>
          <el-col :span="4"> 不合格包装编号 </el-col>
          <el-col :span="8" class="border-right-none"> {{ TSamplingReport.unqualifiedNumber }} </el-col>
        </el-row>

        <el-row style="text-align:center">
          <el-col :span="24" class="border-right-none"> 检验和试验内容 </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 化学成分 </el-col>
          <el-col :span="8"> {{ TSamplingReport.chemicalcomposition }} </el-col>
          <el-col :span="4"> 表面 </el-col>
          <el-col :span="8" class="border-right-none"> {{ TSamplingReport.surface }} </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 直径(μm) </el-col>
          <el-col :span="8"> {{ TSamplingReport.checkUm }} </el-col>
          <el-col :span="4"> 放线停点 </el-col>
          <el-col :span="8" class="border-right-none"> {{ TSamplingReport.settingstopPoint }} </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 重量(g) </el-col>
          <el-col :span="8"> {{ TSamplingReport.checkWeightg }} </el-col>
          <el-col :span="4"> 弯曲扭曲实验 </el-col>
          <el-col :span="8" class="border-right-none"> {{ TSamplingReport.bendingtwisting }} </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 长度(m) </el-col>
          <el-col :span="8"> {{ BasicInfo.length }} </el-col>
          <el-col :span="4"> 标识 </el-col>
          <el-col :span="2"> 始端 </el-col>
          <el-col :span="2"> {{ BasicInfo.beginName }} </el-col>
          <el-col :span="2"> 末端 </el-col>
          <el-col :span="2" class="border-right-none"> {{ BasicInfo.endName }} </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" style="height:240px;line-height:240px;">断裂负荷</el-col>
          <el-col :span="8" style="border:none!important">
            <el-row>
              <el-col :span="4">1</el-col>
              <el-col :span="20">{{ TSamplingReport.crack1 }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">2</el-col>
              <el-col :span="20">{{ TSamplingReport.crack2 }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">3</el-col>
              <el-col :span="20">{{ TSamplingReport.crack3 }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">4</el-col>
              <el-col :span="20">{{ TSamplingReport.crack4 }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">5</el-col>
              <el-col :span="20">{{ TSamplingReport.crack5 }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">平均</el-col>
              <el-col :span="12">{{ average2 }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="4" style="height:240px;line-height:240px;">延伸率</el-col>
          <el-col :span="8" style="border:none!important">
            <el-row>
              <el-col :span="4">1</el-col>
              <el-col :span="20" class="border-right-none">{{ TSamplingReport.elongation1 }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">2</el-col>
              <el-col :span="20" class="border-right-none">{{ TSamplingReport.elongation2 }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">3</el-col>
              <el-col :span="20" class="border-right-none">{{ TSamplingReport.elongation3 }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">4</el-col>
              <el-col :span="20" class="border-right-none">{{ TSamplingReport.elongation4 }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">5</el-col>
              <el-col :span="20" class="border-right-none">{{ TSamplingReport.elongation5 }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">平均</el-col>
              <el-col :span="12" class="border-right-none">{{ average1 }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 结论 </el-col>
          <el-col :span="8"> {{TSamplingReport.conclusion}} </el-col>
          <el-col :span="4"> 检验员 </el-col>
          <el-col :span="8" class="border-right-none"> {{TSamplingReport.staffId}} </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4"> 处理意见 </el-col>
          <el-col :span="8"> 广东某电子厂 </el-col>
          <el-col :span="4"> 负责人 </el-col>
          <el-col :span="8" class="border-right-none"> 110 </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-col :span="4" style="height:80px;line-height:80px;"> 备注 </el-col>
          <el-col :span="20" style="height:80px;"> 广东某电子厂 </el-col>
        </el-row>
      </div>
       
      <el-button type="primary" style="margin:40px auto;">打印</el-button>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aaa: '',
      BasicInfo: {},
      TSamplingReport: {},
      twoList: [],
      tempXiaLa: [],
      staffXiaLa: [],
      id: -1
    }
  },
  computed: {
    average1() {
      return (
        (Number(this.TSamplingReport.elongation1) +
          Number(this.TSamplingReport.elongation2) +
          Number(this.TSamplingReport.elongation3) +
          Number(this.TSamplingReport.elongation4) +
          Number(this.TSamplingReport.elongation5)) /
        5
      )
    },
    average2() {
      return (
        (Number(this.TSamplingReport.crack1) + Number(this.TSamplingReport.crack2) + Number(this.TSamplingReport.crack3) + Number(this.TSamplingReport.crack4) + Number(this.TSamplingReport.crack5)) /
        5
      )
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getData()
  },

  methods: {
    async getData() {
      const { data: res } = await this.$http.post('templatesController/getTSamplingReportById', {
        findById: this.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.BasicInfo = res.data.BasicInfo
      this.TSamplingReport = res.data.TSamplingReport
      this.twoList = res.data.twoList
      this.staffXiaLa = res.data.staffXiaLa
      this.tempXiaLa = res.data.tempXiaLa
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.fwb {
  font-weight: bold;
}
.el-card {
  text-align: center;
}
.border-right-none {
  border-right: none !important;
}
.wrapper {
  width: 1000px;
  border: 1px solid #f0f1fa;
  margin: 0 auto;
  .el-col {
    text-align: center;
    border-top: 1px solid #e5e6fb;
    border-right: 1px solid #e5e6fb;
    height: 40px;
    line-height: 40px;
  }
}
</style>
