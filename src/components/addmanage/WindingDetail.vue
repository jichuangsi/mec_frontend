<template>
  <div>
    <el-page-header @back="cancel" content="绕线" style="margin-bottom:20px;"> </el-page-header>
    <div class="container">
      <el-card style="width:67%">
        <div class="meta">基本信息</div>
        <el-row>
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
        <el-row>
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
        <el-row>
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
        <el-row>
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
        <el-row>
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
        <el-row>
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

      <!-- 操作信息 -->
      <el-card style="width:32%;">
        <div class="j-c-s">
          <div class="meta">操作信息</div>
          <el-button type="text" @click="showCZDialog">编辑</el-button>
        </div>
        <el-row style="margin:10px 0;">
          <el-col :span="6"><div class="col-left">操作员工</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right">{{ OperationInfo.staffName }}</div></el-col
          >
        </el-row>
        <el-row style="margin:10px 0;">
          <el-col :span="6"><div class="col-left">员工编号</div></el-col>
          <el-col :span="16" :offset="2">
            <div class="col-right">{{ OperationInfo.staffNumber }}</div>
          </el-col>
        </el-row>
        <el-row style="margin:10px 0;">
          <el-col :span="6"><div class="col-left">班组</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right">{{ OperationInfo.tteamName }}</div></el-col
          >
        </el-row>
        <el-row style="margin:10px 0;">
          <el-col :span="6"><div class="col-left">班次</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right">{{ OperationInfo.frequencystr }}</div></el-col
          >
        </el-row>
      </el-card>

      <el-card style="margin-top:20px;width:100%;">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="待绕线成品" name="first">
            <template>
              <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="Needstock" style="width: 100%">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="createTime" label="生产时间">
                  <template slot-scope="scope">
                    {{ scope.row.createTime | dateFormat }}
                  </template>
                </el-table-column>
                <el-table-column label="上班工序">
                  <template>
                    {{oneListName }}
                  </template>
                </el-table-column>
                <el-table-column prop="bobbinName" label="线轴"> </el-table-column>
                <el-table-column prop="standards" label="线轴规格"> </el-table-column>
                <el-table-column prop="wireDiameterUm" label="线径um"> </el-table-column>
                <el-table-column prop="lengthM" label="长度m"> </el-table-column>
                <el-table-column prop="grossWeight" label="毛重g"> </el-table-column>
                <el-table-column prop="netWeightg" label="净重g"> </el-table-column>
                <el-table-column prop="numbers" label="数量"> </el-table-column>
                <el-table-column prop="totalLength" label="总长度m"> </el-table-column>
                <el-table-column prop="netWeightgSum" label="总净重g"> </el-table-column>
                <el-table-column prop="payingOff" label="是否改绕">
                  <template slot-scope="scope">
                    {{scope.row.state==0?'否':'是'}}
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="start(scope.row.id)">开始绕线</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="绕线明细" name="second">
            <template>
              <el-table :data="SmeltingProducts"  :header-cell-style="{background:'#f0f5ff' }">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="生产时间"></el-table-column>
                <el-table-column   label="本班工序">
                  <template>绕线</template>
                </el-table-column>
                <el-table-column prop="bobbinName" label="线轴"></el-table-column>
                <el-table-column prop="standards" label="线轴规格"></el-table-column>
                <el-table-column prop="wireDiameterUm" label="线径um"></el-table-column>
                <el-table-column prop="lengthM" label="长度m/轴"></el-table-column>
                <el-table-column prop="grossWeight" label="毛重g"></el-table-column>
                <el-table-column prop="netWeightg" label="净重g"></el-table-column>
                <el-table-column prop="numbers" label="数量"></el-table-column>
                <el-table-column prop="totalLength" label="总长度m"></el-table-column>
                <el-table-column prop="netWeightgSum" label="总净重g"></el-table-column>
                <el-table-column prop="surface" label="表面"></el-table-column>
                <el-table-column prop="payingOff" label="放线"></el-table-column>
                <el-table-column prop="straightLine" label="直线"></el-table-column>
                <el-table-column prop="flatCable" label="排线"></el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
        <div class="card-footer" v-if="PPProductionInfo.state === 0  ">
          <el-button type="primary" @click="saveAll(0)">草稿</el-button>
          <el-button type="primary"  @click="saveAll(1)">保存</el-button>
          <el-button type="primary">打印标签</el-button>
        </div>
      </el-card>

      

      <!-- 操作信息的对话框 -->
      <el-dialog title="操作信息" :visible.sync="dialogCZVisible" width="30%">
        <el-form label-width="120px">
          <el-form-item label="操作员工">
            <el-select v-model="PPProductionInfo.staffId" placeholder="请选择 " style="width:70%;">
              <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in staffXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班组">
            <el-select v-model="PPProductionInfo.teamId" placeholder="请选择 " style="width:70%;">
              <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in TeamXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班次">
            <el-select v-model="PPProductionInfo.frequency" placeholder="请选择 " style="width:70%;">
              <el-option label="白班" :value="1"></el-option>
              <el-option label="夜班" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCZVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogCZConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      form: {
        name: ''
      },
      oneListName:'',
      elblDataList: [],
      historyList: [],
      //退火基本信息：
      ppAnnealingInfo: {
        id: '',
        pppId: '', //生产id
        temperature: '', //温度
        speed: '', //速度
        tension: '', //张力
        gasFlow: '', //气体流量
        furnaceNumber: '' //炉管号
      },
      addClassDialogVisible: false,
      dialogCZVisible: false,
      id: -1,
      Eid: -1,
      OperationInfo: {},
      staffXiaLa: [],
      TeamXiaLa: [],
      BasicInfo: {},
      ProcessTechnology: {},
      equipmentXiaLa: [],
      PPProductionInfo: {
        id: '', //传过来的id
        pproductId: '', //生产计划单-产物id
        finishNum: '', //实际生产数量(米)
        suitId: '', //套模id
        moldTemp: '', //铸造温度℃
        towTime: '', //牵引时间min
        towParameters: '', //牵引参数
        stopTime: '', //停止时间 min
        waterTemp: '', //水温℃
        equipmentId: '', //设备id
        staffId: '', //员工id
        teamId: '', //班组id
        frequency: '' //班次id （1 白班 2夜班）
      }, //需要提交的数据
      Needstock: [], //生产所需原材料
      SmeltingProducts: [], //生产产物 熔炼
      SmeltingProductsItem: {
        gxName: '', //工序名称
        createTime: '',
        bobbinDetailId: '', //线轴规格id
        bobbinName: '', //线轴名称
        standards: '', //线轴规格
        createTime: '', //生产时间
        deleteNo: '',
        grossWeight: '', //毛重g
        gxId: '', //工序id
        id: '',
        lengthM: '', //长度m/轴
        lossg: '', //损耗g
        netWeightg: '', //净重g
        netWeightgSum: '', //总净重g
        payingOff: '', //放线
        pppid: '', //生产id
        slip: '', //滑差
        straightLine: '', //直线
        surface: '', //表面
        takeUpSpeed: '', //收线速度
        totalLength: '', //总长度
        tractionSpeed: '', //牵引速度
        wastageg: '', //废料g
        wireDiameterUm: '' //线径um
      },
      NeedstockItem: {
        quantityChoose: '', //选择数量
        totalNet: '', //总净数g
        unitName: '', //单位
        standards: '', //规格
        stockName: '', //名称
        stockNumber: '', //编号
        inventoryStatusId: '' //库存原料id
      },

      type: '',
      activeName: 'first',
      BobbinXiaLa: [],
      BobbinXiaLaInfo: [],
      fileList: [],
      oneListName: '',
      twoListName: ''
    }
  },
  created() {
    if (this.$route.query.Eid) {
      this.Eid = this.$route.query.Eid
      this.getEditData()
    }
  },
  methods: {
    start(id){
      this.$router.push({
        path:'/addWinding',
        query:{
          Eid:this.Eid,
          id:id,
        }
      })
    },
    toDetail(id) {
      this.$router.replace({
        path: '/addBackFire',
        query: {
          Eid: id
        }
      })
    },
    // 撤回当前工序
    async goBack() {
      const confirmResult = await this.$confirm('是否确认撤回？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('ProductionController/backToPPProduction', {
        findById: this.Eid
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('撤回成功')
      this.$router.go(-1)
    },
 
 
  
    //   更改操作信息
    dialogCZConfirm() {
      this.staffXiaLa.forEach(item => {
        if (this.PPProductionInfo.staffId === item.mapKey) {
          this.OperationInfo.staffName = item.mapValue
          this.OperationInfo.staffNumber = item.mapValue2
        }
      })
      this.TeamXiaLa.forEach(item => {
        if (this.PPProductionInfo.teamId == item.mapKey) {
          this.OperationInfo.tteamName = item.mapValue
        }
      })
      if (this.PPProductionInfo.frequency == 1) {
        this.OperationInfo.frequencystr = '白班'
      } else {
        this.OperationInfo.frequencystr = '夜班'
      }
      this.dialogCZVisible = false
    },
   
    // 编辑本班产物
    editSmeltingProducts(index) {
      this.SmeltingProductsItem = _.cloneDeep(this.SmeltingProducts[index])
      this.addClassDialogVisible = true
    },
    // 删除本班产物
    async delSmeltingProducts(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      this.SmeltingProducts.splice(index, 1)
      this.$message.success('删除成功')
    },
   
    

    // 详情页面获取初始数据
    async getEditData() {
      const { data: res } = await this.$http.post('ProductionController/getPWindingDetailByPPPId', {
        findById: this.Eid
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.Needstock = res.data.oneList ? res.data.oneList : []
      this.BasicInfo = res.data.BasicInfo
      this.SmeltingProducts = res.data.twoList
      this.TeamXiaLa = res.data.TeamXiaLa
      this.equipmentXiaLa = res.data.equipmentXiaLa
      this.staffXiaLa = res.data.staffXiaLa
      this.BobbinXiaLa = res.data.BobbinXiaLa
      this.oneListName=res.data.oneListName
      this.PPProductionInfo=res.data.PPProductionInfo
      this.dialogCZConfirm()
    },
    // 保存全部数据
    async saveAll(state) {
      if (this.Eid >= 0) {
        this.PPProductionInfo.id = this.Eid
      } else {
        this.PPProductionInfo.suitId = this.ProcessTechnology.id
        this.PPProductionInfo.pproductId = this.id
        this.PPProductionInfo.gxid = 1
        this.PPProductionInfo.productionNumber = this.BasicInfo.productModel
      }
      if (!this.PPProductionInfo.teamId || !this.PPProductionInfo.staffId|| !this.PPProductionInfo.frequency) {
        return this.$message.error('请填写必要项')
      }
      this.ppAnnealingInfo.pppId = this.Eid
      this.PPProductionInfo.state = state
      this.SmeltingProducts.forEach(item => {
        item.gxId = this.PPProductionInfo.gxid
      })

      const { data: res } = await this.$http.post('ProductionController/savePWinding', {
        ppProduction: this.PPProductionInfo,
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success( '保存成功')
      this.$router.go(-1)
    },
    
    
    showCZDialog() {
      this.dialogCZVisible = true
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
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.col-left {
  text-align: right;
  font-size: 14px;
  line-height: 40px;
}
.col-right {
  font-size: 14px;
  text-align: left;
  color: #9896a9;
  line-height: 40px;
}
.meta {
  font-weight: bold;
}
.j-c-s {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-footer {
  text-align: right;
  margin-top: 40px;
}
</style>
