<template>
  <div>
    <el-page-header @back="cancel" content="新增抽检" style="margin-bottom:20px;"> </el-page-header>
    <el-card style="width:100%">
      <div class="meta">基本信息</div>
      <el-row style="margin:15px 0">
        <el-col :span="8">
          <el-col :span="12" class="col-left">生产计划单号</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.ppNumber }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">产品名称</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.productName }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">始端</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.beginName }}</el-col>
        </el-col>
      </el-row>
      <el-row style="margin:15px 0">
        <el-col :span="8">
          <el-col :span="12" class="col-left">计划下达日期</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.createTime }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">产品编号</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.productNumber }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">末端</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.endName }}</el-col>
        </el-col>
      </el-row>
      <el-row style="margin:15px 0">
        <el-col :span="8">
          <el-col :span="12" class="col-left">计划完工日期</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.finishedTime }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">产品型号</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.productModel }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">成品线轴</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.bobbinName }}</el-col>
        </el-col>
      </el-row>
      <el-row style="margin:15px 0">
        <el-col :span="8">
          <el-col :span="12" class="col-left">客户名称</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.customerName }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">产品规格um</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.umStart }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">拉断力BL（CN）</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.blStart }}</el-col>
        </el-col>
      </el-row>
      <el-row style="margin:15px 0">
        <el-col :span="8">
          <el-col :span="12" class="col-left" style="color:red;">预计生产数量（米）</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.planNum }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">产品规格mil</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.milStart }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">延伸力EL（%）</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.elStart }}</el-col>
        </el-col>
      </el-row>
      <el-row style="margin:15px 0">
        <el-col :span="8">
          <el-col :span="12" class="col-left" style="color:red;">实际生产数量（米）</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.finishNum }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">成品长度（m/轴）</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.length }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" class="col-left">计划轴数（轴）</el-col>
          <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.quantum }}</el-col>
        </el-col>
      </el-row>
    </el-card>
    <!-- 证书信息 -->
    <el-card style="width:100%;margin-top:20px">
      <div style="font-weight:bold">证书信息</div>
      <el-form label-width="200px">
        <el-form-item label="抽检报告名称">
          <el-input v-model="tCertificateReport.reportName" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="质量证书模板">
          <el-select v-model="tCertificateReport.tempId" placeholder="请选择 " style="width:40%">
            <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in tempXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证书日期">
          <el-date-picker v-model="tCertificateReport.createTime" type="date" placeholder="选择日期" style="width:40%"> </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="tCertificateReport.remarks" style="width:40%"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 原材料比例 -->
    <el-card style="margin-top:20px">
      <div style="font-weight:bold">原料比例 <span style="font-weight:normal;color:red;margin-left:40%;">原料比例之和须等于0或小于100，不等于0或小于100无法保存</span></div>
      <el-table :data="RawMaterialRatio" style="width: 100%" :header-cell-style="{background:'#f0f5ff' }">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="stockName" label="原料名称"  > </el-table-column>
        <el-table-column   label="原料比例%" >
          <template slot-scope="scope">
            {{ scope.row.ratiostart && scope.row.ratioend ? scope.row.ratiostart + '-' + scope.row.ratioend : scope.row.ratiostart ? '&gt;' + scope.row.ratiostart : '&lt;' + scope.row.ratioend }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 力学信息 -->
    <el-card style="margin-top:20px">
      <el-form  label-width="200px">
        <el-form-item label="检测设备">
          <el-input  style="width:10%;margin:0 5%;" v-model="tCertificateReport.checkEquipment"></el-input>
          检测长度
          <el-input  style="width:10%;margin:0 5%;" v-model="tCertificateReport.checkLength"></el-input>
          拉伸长度
          <el-input  style="width:10%;margin:0 5%;" v-model="tCertificateReport.drawingSpeed "></el-input>
        </el-form-item>
        <el-form-item label="延伸率（%）">
          1
          <el-input  style="width:5%;margin:0 3%;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="tCertificateReport.elongation1"></el-input>
          2
          <el-input  style="width:5%;margin:0 3%;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="tCertificateReport.elongation2"></el-input>
          3
          <el-input  style="width:5%;margin:0 3%;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="tCertificateReport.elongation3"></el-input>
          4
          <el-input  style="width:5%;margin:0 3%;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="tCertificateReport.elongation4"></el-input>
          5
          <el-input  style="width:5%;margin:0 3%;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="tCertificateReport.elongation5"></el-input>
          平均值：{{average1}}

        </el-form-item>
        <el-form-item label="断裂符合（BL）">
          1
          <el-input  style="width:5%;margin:0 3%;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="tCertificateReport.crack1"></el-input>
          2
          <el-input  style="width:5%;margin:0 3%;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="tCertificateReport.crack2"></el-input>
          3
          <el-input  style="width:5%;margin:0 3%;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="tCertificateReport.crack3"></el-input>
          4
          <el-input  style="width:5%;margin:0 3%;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="tCertificateReport.crack4"></el-input>
          5
          <el-input  style="width:5%;margin:0 3%;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="tCertificateReport.crack5"></el-input>
          平均值：{{average2}}
        </el-form-item>
      </el-form>
      <div style="text-align:center;margin:50px 0">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="saveAll" type="primary">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      BasicInfo: {},
      staffXiaLa: [],
      tempXiaLa: [],
      tCertificateReport: {},
      RawMaterialRatio: [],
      id: -1,
      Eid:-1,
    }
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    this.getData()
  },
  computed: {
   
    average1(){
        return (Number(this.tCertificateReport.elongation1)+Number(this.tCertificateReport.elongation2)+Number(this.tCertificateReport.elongation3)+Number(this.tCertificateReport.elongation4)+Number(this.tCertificateReport.elongation5))/5
    },
    average2(){
        return (Number(this.tCertificateReport.crack1)+Number(this.tCertificateReport.crack2)+Number(this.tCertificateReport.crack3)+Number(this.tCertificateReport.crack4)+Number(this.tCertificateReport.crack5))/5
    }
  },
  methods: {
    // 保存全部数据
    async saveAll(){
    const { data: res } = await this.$http.post('templatesController/saveTCertificateReport',{
      ...this.tCertificateReport
    })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success(this.Eid>=0?'编辑成功':"新增成功")
      this.$router.go(-1)
    },
    async getData() {
      if (this.id >= 0) {
        const { data: res } = await this.$http.post('templatesController/getTCertificateReportByChooseIds', {
          findById: this.id
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.BasicInfo = res.data.BasicInfo
        this.staffXiaLa = res.data.staffXiaLa
        this.tempXiaLa = res.data.tempXiaLa
        this.tCertificateReport = res.data.tCertificateReport
        this.RawMaterialRatio = res.data.RawMaterialRatio
      } else {
        this.Eid=this.$route.query.Eid
        const { data: res } = await this.$http.post('templatesController/getTCertificateReportById', {
          findById:this.$route.query.Eid
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.BasicInfo = res.data.BasicInfo
        this.staffXiaLa = res.data.staffXiaLa
        this.tempXiaLa = res.data.tempXiaLa
        this.tCertificateReport = res.data.tCertificateReport
        this.RawMaterialRatio = res.data.RawMaterialRatio
      }
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped></style>
