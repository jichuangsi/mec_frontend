<template>
  <div>
    <el-page-header @back="cancel" content="产品批号详情" style="margin-bottom:20px;"> </el-page-header>
    <!-- <el-card>
      <div style="font-weight:bold">基本信息</div>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="4" style="text-align:right">生产计划单号</el-col>
        <el-col :span="4">{{ BasicInfo.ppNumber }}</el-col>
        <el-col :span="4" style="text-align:right">产品名称</el-col>
        <el-col :span="4">{{ BasicInfo.productName }}</el-col>
        <el-col :span="4" style="text-align:right">始端</el-col>
        <el-col :span="4">{{ BasicInfo.beginName }}</el-col>
      </el-row>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="4" style="text-align:right">计划下达日期</el-col>
        <el-col :span="4">{{ BasicInfo.createTime | dateFormat }}</el-col>
        <el-col :span="4" style="text-align:right">产品编号</el-col>
        <el-col :span="4">{{ BasicInfo.productNumber }}</el-col>
        <el-col :span="4" style="text-align:right">末端</el-col>
        <el-col :span="4">{{ BasicInfo.endName }}</el-col>
      </el-row>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="4" style="text-align:right">计划完工日期</el-col>
        <el-col :span="4">{{ BasicInfo.finishedTime | dateFormat }}</el-col>
        <el-col :span="4" style="text-align:right">产品型号</el-col>
        <el-col :span="4">{{ BasicInfo.productModel }}</el-col>
        <el-col :span="4" style="text-align:right">成品线轴</el-col>
        <el-col :span="4">{{ BasicInfo.bobbinName }}</el-col>
      </el-row>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="4" style="text-align:right">客户名称</el-col>
        <el-col :span="4">{{ BasicInfo.customerName }}</el-col>
        <el-col :span="4" style="text-align:right">产品规格um</el-col>
        <el-col :span="4">{{ BasicInfo.umStart }}</el-col>
        <el-col :span="4" style="text-align:right">拉断力BL（CN）</el-col>
        <el-col :span="4">
          <div v-if="BasicInfo.blStart == 0">&lt;{{ BasicInfo.blEend }}</div>
          <div v-if="BasicInfo.blEend == 0">&gt;{{ BasicInfo.blStart }}</div>
          <div v-else>{{ BasicInfo.blStart }}-{{ BasicInfo.blEend }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="4" style="text-align:right;color:red">预计生产数量（米）</el-col>
        <el-col :span="4">{{ BasicInfo.planNum }}</el-col>
        <el-col :span="4" style="text-align:right">产品规格mil</el-col>
        <el-col :span="4">{{ BasicInfo.milStart }}</el-col>
        <el-col :span="4" style="text-align:right">延伸率EL（%）</el-col>
        <el-col :span="4">{{ BasicInfo.elStart }}</el-col>
      </el-row>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="4" style="text-align:right;color:red">实际生产数量（米）</el-col>
        <el-col :span="4">{{ BasicInfo.finishNum }}</el-col>
        <el-col :span="4" style="text-align:right">成品长度（m/轴）</el-col>
        <el-col :span="4">{{ BasicInfo.length }}</el-col>
        <el-col :span="4" style="text-align:right">计划轴数（轴）</el-col>
        <el-col :span="4">{{ BasicInfo.quantum }}</el-col>
      </el-row>
    </el-card> -->
    <div style="margin-top:20px;">
      <div style="font-weight:bold">
        生产工序 <span style="font-weight:normal;margin-left:50px;">生产批号: {{ PPProductionInfo.productionNumber }}</span>
      </div>
      <div style="width:100%" class="box-wrapper">
        <div :class="['box',{current:gxId==item.mapValue2}]" style="width:150px;height:100px;" v-for="item in productionList" :key="item.mapKey" @click="toggle(item)">
          {{ item.mapValue }}
        </div>
      </div>
    </div>
    <div >
      <el-row style="margin-top:20px;" :gutter="20" >
      <!-- 工艺参数 -->
      <el-col :span="8" v-if="gxId == 1">
        <el-card style="height:293px;">
          <div style="font-weight:bold">工艺参数</div>
          <el-row :gutter="10" style="margin:25px 0">
            <el-col :span="4" style="margin-top:10px;">套模方案</el-col>
            <el-col :span="10" style="margin-top:10px;color:#8494a9">{{ ProcessTechnology.constituteNumber }}</el-col>
            <el-col :span="5" style="margin-top:10px; color:#8494a9">{{ ProcessTechnology.constituteName }}</el-col>
            <el-col :span="3">
              <el-button>预览套模</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:25px 0">
            <el-col :span="6">
              铸造温度℃
            </el-col>
            <el-col :span="6" style="color:#8494a9">
              {{ PPProductionInfo.moldTemp }}
            </el-col>
            <el-col :span="6">
              牵引时间min
            </el-col>
            <el-col :span="6" style="color:#8494a9">
              {{ PPProductionInfo.towTime }}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:25px 0">
            <el-col :span="6">
              牵引参数
            </el-col>
            <el-col :span="6" style="color:#8494a9">
              {{ PPProductionInfo.towParameters }}
            </el-col>
            <el-col :span="6">
              停止时间min
            </el-col>
            <el-col :span="6" style="color:#8494a9">
              {{ PPProductionInfo.stopTime }}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:26px 0">
            <el-col :span="6">
              水温℃
            </el-col>
            <el-col :span="6" style="color:#8494a9">
              {{ PPProductionInfo.waterTemp }}
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8" v-if="gxId == 2|| gxId == 3|| gxId == 5">
        <el-card style="height:293px;">
          <div style="font-weight:bold">工艺参数</div>
          <el-row :gutter="10" style="margin:25px 0">
            <el-col :span="4" style="margin-top:10px;">套模方案</el-col>
            <el-col :span="10" style="margin-top:10px;color:#8494a9">{{ ProcessTechnology.constituteNumber }}</el-col>
            <el-col :span="5" style="margin-top:10px; color:#8494a9">{{ ProcessTechnology.constituteName }}</el-col>
            <el-col :span="3">
              <el-button>预览套模</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8" v-if="gxId == 4|| gxId == 7">
        <el-card style="height:293px;">
          <div style="font-weight:bold">工艺参数</div>
          <el-row :gutter="10" style="margin:25px 0">
            <el-col :span="12" style="margin-top:10px;">温度℃</el-col>
            <el-col :span="12" style="margin-top:10px;color:#8494a9">{{ ppAnnealingInfo.temperature }}</el-col>
          </el-row>
          <el-row :gutter="10" style="margin:25px 0">
            <el-col :span="12" style="margin-top:10px;">速度m/s</el-col>
            <el-col :span="12" style="margin-top:10px;color:#8494a9">{{ ppAnnealingInfo.speed }}</el-col>
          </el-row>
          <el-row :gutter="10" style="margin:25px 0">
            <el-col :span="12" style="margin-top:10px;">张力</el-col>
            <el-col :span="12" style="margin-top:10px;color:#8494a9">{{ ppAnnealingInfo.tension }}</el-col>
          </el-row>
          <el-row :gutter="10" style="margin:25px 0">
            <el-col :span="12" style="margin-top:10px;">气体流量</el-col>
            <el-col :span="12" style="margin-top:10px;color:#8494a9">{{ ppAnnealingInfo.gasFlow }}</el-col>
          </el-row>
          <el-row :gutter="10" style="margin:25px 0">
            <el-col :span="12" style="margin-top:10px;">炉管号</el-col>
            <el-col :span="12" style="margin-top:10px;color:#8494a9">{{ ppAnnealingInfo.furnaceNumber }}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8" v-if="gxId == 6">
        <el-card style="height:293px;">
          <div style="font-weight:bold">工艺参数</div>
          <el-row :gutter="10" style="margin:25px 0">
            <el-col :span="4" style="margin-top:10px;">套模方案</el-col>
            <el-col :span="10" style="margin-top:10px;color:#8494a9">{{ ProcessTechnology.constituteNumber }}</el-col>
            <el-col :span="5" style="margin-top:10px; color:#8494a9">{{ ProcessTechnology.constituteName }}</el-col>
            <el-col :span="3">
              <el-button>预览套模</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:25px 0">
            <el-col :span="6">
              PV
            </el-col>
            <el-col :span="6" style="color:#8494a9">
              {{ PPProductionInfo.pv }}
            </el-col>
            <el-col :span="6">
              滑动率%
            </el-col>
            <el-col :span="6" style="color:#8494a9">
              {{ PPProductionInfo.slipRate }}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:25px 0">
            <el-col :span="6">
              速度m/s
            </el-col>
            <el-col :span="6" style="color:#8494a9">
              {{ PPProductionInfo.speedM }}
            </el-col>
            <el-col :span="6">
              放线张力
            </el-col>
            <el-col :span="6" style="color:#8494a9">
              {{ PPProductionInfo.payTension }}
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 设备信息 -->
      <el-col :span="8" v-if="gxId == 1||gxId == 2|| gxId == 3|| gxId == 4||gxId == 5||gxId == 6|| gxId == 7">
        <el-card style="height:293px;">
          <div style="font-weight:bold">设备信息</div>
          <el-row style="margin:15px 0" :gutter="20">
            <el-col :span="12" style="text-align:right;">生产设备</el-col>
            <el-col :span="12" style="color:#8494a9">{{ equipmentInfo.equipmentNumber }}</el-col>
          </el-row>
          <el-row style="margin:15px 0" :gutter="20">
            <el-col :span="12" style="text-align:right;">设备状态</el-col>
            <el-col :span="12" style="color:#8494a9">{{ equipmentInfo.stateName }}</el-col>
          </el-row>
          <el-row style="margin:15px 0" :gutter="20">
            <el-col :span="12" style="text-align:right;">设备类型</el-col>
            <el-col :span="12" style="color:#8494a9">{{ equipmentInfo.equipmentType }}</el-col>
          </el-row>
          <el-row style="margin:15px 0" :gutter="20">
            <el-col :span="12" style="text-align:right;">最近一次检修员</el-col>
            <el-col :span="12" style="color:#8494a9">{{ equipmentInfo.checkStaffName }}</el-col>
          </el-row>
          <el-row style="margin:15px 0" :gutter="20">
            <el-col :span="12" style="text-align:right;">最近一次检修时间</el-col>
            <el-col :span="12" style="color:#8494a9">{{ equipmentInfo.checkTime | dateFormat }}</el-col>
          </el-row>
          <el-row style="margin:15px 0" :gutter="20" v-if="gxId==1||gxId==2||gxId==3||gxId==4||gxId==6||gxId==7">
            <el-col :span="12" style="text-align:right;">设备运行次数</el-col>
            <el-col :span="12" style="color:#8494a9">{{ equipmentInfo.runNumber }}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 操作信息 -->
      <el-col :span="8" v-if="gxId == 1||gxId == 2|| gxId == 3|| gxId == 4||gxId == 5||gxId == 6|| gxId == 7">
        <el-card>
          <div style="font-weight:bold">操作信息</div>
          <el-row style="margin:25px 0" :gutter="20">
            <el-col :span="12" style="text-align:right;">操作员工</el-col>
            <el-col :span="12" style="color:#8494a9">{{ OperationInfo.staffName }}</el-col>
          </el-row>
          <el-row style="margin:30px 0" :gutter="20">
            <el-col :span="12" style="text-align:right;">员工编号</el-col>
            <el-col :span="12" style="color:#8494a9">{{ OperationInfo.staffNumber }}</el-col>
          </el-row>
          <el-row style="margin:30px 0" :gutter="20">
            <el-col :span="12" style="text-align:right;">班组</el-col>
            <el-col :span="12" style="color:#8494a9">{{ OperationInfo.tteamName }}</el-col>
          </el-row>
          <el-row style="margin:30px 0" :gutter="20">
            <el-col :span="12" style="text-align:right;">班次</el-col>
            <el-col :span="12" style="color:#8494a9">{{ OperationInfo.frequencystr }}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    </div>
    
    <!-- 本班产物 -->
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold">本班产物</div>
      <el-table :data="twoList" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
        <el-table-column type="index" label="序号"  > </el-table-column>
        <el-table-column  label="生产时间"  >
          <template slot-scope="scope">{{ scope.row.createTime | dateFormat }}</template>
        </el-table-column>
        <el-table-column prop="gxName" label="工序"> </el-table-column>
        <el-table-column prop="bobbinName" label="线轴"> </el-table-column>
        <el-table-column prop="standards" label="线轴规格"> </el-table-column>
        <el-table-column prop="wireDiameterUm" label="线径um"> </el-table-column>
        <el-table-column prop="lengthM" label="长度m"> </el-table-column>
        <el-table-column prop="grossWeight" label="毛重g"> </el-table-column>
        <el-table-column prop="netWeightg" label="净重g"> </el-table-column>
        <el-table-column prop="wastageg" label="废料g"> </el-table-column>
        <el-table-column prop="lossg" label="损耗g"> </el-table-column>
        <el-table-column prop="slip" label="滑差" v-if="gxId==3"> </el-table-column>
        <el-table-column prop="tractionSpeed" label="牵引速度" v-if="gxId==3"> </el-table-column>
        <el-table-column prop="surface" label="表面" v-if="gxId==4||gxId==7"> </el-table-column>
        <el-table-column prop="payingOff" label="放线" v-if="gxId==4||gxId==7"> </el-table-column>
        <el-table-column prop="straightLine" label="直线" v-if="gxId==4||gxId==7"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      findName: '',
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
      BasicInfo: {},
      OperationInfo: {},
      PPProductionInfo: {},
      ProcessTechnology: {},
      equipmentInfo: {},
      productionList: [],
      twoList: [],
      twoListName: '',
      gxId: 1,
      ppAnnealingInfo:{},
    }
  },
  created() {
    this.findName = sessionStorage.getItem('flashback')
    this.getData()
  },
  methods: {
    // 点击切换
    async toggle(item) {
      this.gxId = item.mapValue2
      const { data: res } = await this.$http.post('ProductionDataController/getProductionInfoByPPPId', {
        findById: item.mapKey
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.OperationInfo = res.data.OperationInfo
      this.PPProductionInfo = res.data.PPProductionInfo
      this.ProcessTechnology = res.data.ProcessTechnology
      this.equipmentInfo = res.data.equipmentInfo?res.data.equipmentInfo:{}
      this.twoList = res.data.twoList
      this.twoListName = res.data.twoListName
    },
    //   获取页面初始数据
    async getData() {
      const { data: res } = await this.$http.post('ProductionDataController/getProductionInfoByNumber', {
        findName: this.findName
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.BasicInfo = res.data.BasicInfo
      this.OperationInfo = res.data.OperationInfo
      this.PPProductionInfo = res.data.PPProductionInfo
      this.ProcessTechnology = res.data.ProcessTechnology
      this.equipmentInfo = res.data.equipmentInfo
      this.productionList = res.data.productionList
      this.twoList = res.data.twoList
      this.twoListName = res.data.twoListName
      this.ppAnnealingInfo=res.data.ppAnnealingInfo?res.data.ppAnnealingInfo:{}
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.box-wrapper {
  width: 100%;
  display: flex;
  overflow: auto;
  .box {
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    border: 1px solid #ebeef5;
    background-color: #fff;
  }
  .current{
    border: 1px solid #00b2ff !important;
  }
}
</style>
