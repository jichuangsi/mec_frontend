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
    <!-- 抽检基本信息 -->
    <el-card style="margin-top:20px">
      <div style="font-weight:bold;margin-bottom:20px;">抽检基本信息</div>
      <el-form label-width="200px">
        <el-form-item label="抽检报告名称">
          <el-input v-model="TSamplingReport.reportName" disabled style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检验报告模板">
          <el-select v-model="TSamplingReport.tempId" placeholder="请选择 " style="width:40%">
            <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in tempXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检验日期">
          <el-date-picker style="width:40%" v-model="TSamplingReport.createTime" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="进检轴数"> {{ TSamplingReport.inspectionSum }} <span style="margin:0 50px;">抽检轴数</span>{{ TSamplingReport.samplesNums }} </el-form-item>
        <el-form-item label="进检盒号">
          <el-input v-model="TSamplingReport.inspectionBoxNumber" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="进检包装编号">
          <el-input v-model="TSamplingReport.inspectionPackingNumber" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="抽检包装编号">
          <el-input v-model="TSamplingReport.samplesPackingNumber" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="不合格包装编号">
          <el-input v-model="TSamplingReport.unqualifiedNumber" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检验员">
          <el-select v-model="TSamplingReport.staffId" placeholder="请选择 " style="width:40%">
            <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in staffXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 检验和试验内容 -->
    <el-card style="margin-top:20px">
      <div style="font-weight:bold;margin-bottom:20px;">检验和试验内容</div>
      <el-form label-width="200px">
        <el-form-item label="化学成分">
          <el-input v-model="TSamplingReport.chemicalcomposition" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检验直径um">
          <el-input v-model="TSamplingReport.checkUm" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检验重量g">
          <el-input v-model="TSamplingReport.checkWeightg" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检验长度m">
          <el-input v-model="TSamplingReport.checkLengthM" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="表面">
          <el-input v-model="TSamplingReport.surface" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="放线停点">
          <el-input v-model="TSamplingReport.settingstopPoint" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="弯曲扭曲实验">
          <el-input v-model="TSamplingReport.bendingtwisting" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检测设备">
          <el-input style="width:10%;margin:0 50px;" v-model="TSamplingReport.checkEquipment"></el-input>
          检测长度
          <el-input style="width:10%;margin:0 50px;" v-model="TSamplingReport.checkLength"></el-input>
          拉伸速度
          <el-input style="width:10%;margin:0 50px;" v-model="TSamplingReport.drawingSpeed"></el-input>
        </el-form-item>
        <el-form-item label="延伸率（%）">
          1
          <el-input style="width:6%;margin:0 50px;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="TSamplingReport.elongation1"></el-input>
          2
          <el-input style="width:6%;margin:0 50px;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="TSamplingReport.elongation2"></el-input>
          3
          <el-input style="width:6%;margin:0 50px;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="TSamplingReport.elongation3"></el-input>
          4
          <el-input style="width:6%;margin:0 50px;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="TSamplingReport.elongation4"></el-input>
          5
          <el-input style="width:6%;margin:0 50px;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="TSamplingReport.elongation5" ></el-input>
          平均值 {{average1}}
        </el-form-item>
        <el-form-item label="断裂符合（BL）">
          1
          <el-input style="width:6%;margin:0 50px;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="TSamplingReport.crack1"></el-input>
          2
          <el-input style="width:6%;margin:0 50px;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="TSamplingReport.crack2"></el-input>
          3
          <el-input style="width:6%;margin:0 50px;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="TSamplingReport.crack3"></el-input>
          4
          <el-input style="width:6%;margin:0 50px;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="TSamplingReport.crack4"></el-input>
          5
          <el-input style="width:6%;margin:0 50px;" oninput = "value=value.replace(/[^\d.]/g,'')" v-model="TSamplingReport.crack5" ></el-input>
          平均值 {{average2}}
        </el-form-item>
        <el-form-item label="检验结论">
          <el-input v-model="TSamplingReport.conclusion" style="width:40%" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;margin-bottom:20px;">抽检数据</div>
      <div style="text-align:right;">
        <span>合格轴数{{ qualifiedNum }}</span>
        <span style="margin:0 10%;">不合格轴数{{ unqualifiedNum }}</span>
      </div>
      <el-table :data="twoList" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="wireUm" label="线径um"> </el-table-column>
        <el-table-column prop="lengthM" label="长度m/轴"> </el-table-column>
        <el-table-column prop="samplingUm" label="检验直径um" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.samplingUm"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="surface" label="表面" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.surface"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="settingOut" label="放线" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.settingOut"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="straightLine" label="直线" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.straightLine"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="合格" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.qualifiedNo" :false-label="0" :true-label="1"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="不合格" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.qualifiedNo" :false-label="1" :true-label="0"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin:50px 0">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveAll">保存</el-button>
      </div>
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
      id: -1,
    }
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    this.getData()
  },
  computed: {
    unqualifiedNum() {
      return this.twoList.filter(item => item.qualifiedNo == '1').length
    },
    qualifiedNum() {
      return this.twoList.filter(item => item.qualifiedNo == '0').length
    },
    average1(){
        return (Number(this.TSamplingReport.elongation1)+Number(this.TSamplingReport.elongation2)+Number(this.TSamplingReport.elongation3)+Number(this.TSamplingReport.elongation4)+Number(this.TSamplingReport.elongation5))/5
    },
    average2(){
        return (Number(this.TSamplingReport.crack1)+Number(this.TSamplingReport.crack2)+Number(this.TSamplingReport.crack3)+Number(this.TSamplingReport.crack4)+Number(this.TSamplingReport.crack5))/5
    }
  },
  methods: {
    //   保存全部数据
    async saveAll() {
      this.TSamplingReport.unqualifiedNum = this.unqualifiedNum
      this.TSamplingReport.qualifiedNum = this.qualifiedNum
      const { data: res } = await this.$http.post('templatesController/saveTSamplingReport', {
        tSamplingReport: this.TSamplingReport,
        samplingReportDetailList: this.twoList
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success(this.id >= 0 ? '编辑成功' : '保存成功')
      this.$router.go(-1)
    },
    async getData() {
      if (this.id >= 0) {
        const { data: res } = await this.$http.post('templatesController/getTSamplingReportById', {
          findById: this.id
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.BasicInfo = res.data.BasicInfo
        this.TSamplingReport = res.data.TSamplingReport
        this.twoList = res.data.twoList
        this.staffXiaLa = res.data.staffXiaLa
        this.tempXiaLa = res.data.tempXiaLa
        
      } else {
        let form = sessionStorage.getItem('samplinginspection')
        const { data: res } = await this.$http.post('templatesController/getTemplatesByChooseIds', JSON.parse(form))
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.BasicInfo = res.data.BasicInfo
        this.TSamplingReport = res.data.tSamplingReport
        this.twoList = res.data.samplingReportDetailList
        this.staffXiaLa = res.data.staffXiaLa
        this.tempXiaLa = res.data.tempXiaLa
      }
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped></style>
