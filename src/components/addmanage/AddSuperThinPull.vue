<template>
  <div>
    <el-page-header @back="cancel" content="中拉" style="margin-bottom:20px;"> </el-page-header>
    <div class="container">
      <el-card style="width:100%">
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

      <!-- 工艺参数 -->
      <el-card style="width:32%;margin-top:20px;">
        <div class="j-c-s">
          <div class="meta">工艺参数</div>
          <el-button type="text" @click="showGYDialog" v-if="PPProductionInfo.state === 0">编辑</el-button>
        </div>
        <el-row style="margin:30px 0">
          <el-col :span="4" style="padding-top:10px;">套模方案</el-col>
          <el-col :span="10" style="padding-top:10px;">{{ ProcessTechnology.constituteNumber }}</el-col>
          <el-col :span="5" style="padding-top:10px;"> {{ ProcessTechnology.constituteName }}</el-col>
          <el-col :span="4"><el-button>预览套模</el-button></el-col>
        </el-row>
        <el-row style="margin:30px 0">
          <el-col :span="5">PV</el-col>
          <el-col :span="8">{{ PPProductionInfo.pv }} </el-col>
          <el-col :span="6">滑动率%</el-col>
          <el-col :span="5">{{ PPProductionInfo.slipRate }}</el-col>
        </el-row>
        <el-row style="margin:30px 0">
          <el-col :span="5">速度m/s</el-col>
          <el-col :span="8">{{ PPProductionInfo.speedM }}</el-col>
          <el-col :span="6">放线张力</el-col>
          <el-col :span="5">{{ PPProductionInfo.payTension }}</el-col>
        </el-row>
      </el-card>
      <!-- 设备信息 -->
      <el-card style="width:32%;margin-top:20px;">
        <div class="j-c-s">
          <div class="meta">设备信息</div>
          <el-button type="text" @click="showInfoDialog" v-if="PPProductionInfo.state === 0">编辑</el-button>
        </div>
        <el-row>
          <el-col :span="6"><div class="col-left">生产设备</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right" v-if="equipmentInfo">{{ equipmentInfo.equipmentNumber }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">设备状态</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right" v-if="equipmentInfo">{{ equipmentInfo.state == 0 ? '正常' : '报废' }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">设备类型</div></el-col>
          <el-col :span="16" :offset="2"><div class="col-right" v-if="equipmentInfo">熔炼设备</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">最近一次检修员</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right" v-if="equipmentInfo">{{ equipmentInfo.checkStaffName }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">最近一次检修时间</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right" v-if="equipmentInfo">{{ equipmentInfo.checkTime }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">设备运行次数</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right" v-if="equipmentInfo">{{ equipmentInfo.runNumber }}</div></el-col
          >
        </el-row>
      </el-card>
      <!-- 操作信息 -->
      <el-card style="width:32%;margin-top:20px;">
        <div class="j-c-s">
          <div class="meta">操作信息</div>
          <el-button type="text" @click="showCZDialog" v-if="PPProductionInfo.state === 0">编辑</el-button>
        </div>
        <el-row>
          <el-col :span="6"><div class="col-left">操作员工</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right">{{ OperationInfo.staffName }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">员工编号</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right">{{ OperationInfo.staffNumber }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">班组</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right">{{ OperationInfo.tteamName }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">班次</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right">{{ OperationInfo.frequencystr }}</div></el-col
          >
        </el-row>
      </el-card>

      <!-- 上班生产产物（粗拉） -->
      <el-card style="width:100%;margin-top:20px;">
        <div class="j-c-s">
          <div class="meta">上班生产产物（{{oneListName}}）</div>
        </div>
        <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="Needstock" style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="createTime" label="生产时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="工序">
            <template>
              {{oneListName}}
            </template>
          </el-table-column>
          <el-table-column prop="bobbinName" label="线轴"> </el-table-column>
          <el-table-column prop="standards" label="线轴规格"> </el-table-column>
          <el-table-column prop="wireDiameterUm" label="线径um"> </el-table-column>
          <el-table-column prop="lengthM" label="长度m"> </el-table-column>
          <el-table-column prop="grossWeight" label="毛重g"> </el-table-column>
          <el-table-column prop="netWeightg" label="净重g"> </el-table-column>
          <el-table-column prop="wastageg" label="废料g"> </el-table-column>
          <el-table-column prop="lossg" label="损耗g"> </el-table-column>
          <el-table-column label="操作" width="200" v-if="PPProductionInfo.state === 0">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editSmeltingProducts(scope.$index)">编辑</el-button>
              <el-button type="danger" size="mini" @click="delSmeltingProducts(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 本班生产产物（粗拉） -->
      <el-card style="width:100%;margin-top:20px;">
        <div class="j-c-s">
          <div class="meta">本班生产产物（{{twoListName}}）</div>
          <el-button type="primary" plain @click="showAddClassDialog" v-if="PPProductionInfo.state === 0">新增</el-button>
        </div>
        <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="SmeltingProducts" style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="createTime" label="生产时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="工序">
            <template>{{twoListName}}</template>
          </el-table-column>
          <el-table-column prop="bobbinName" label="线轴"> </el-table-column>
          <el-table-column prop="standards" label="线轴规格"> </el-table-column>
          <el-table-column prop="wireDiameterUm" label="线径um"> </el-table-column>
          <el-table-column prop="lengthM" label="长度m"> </el-table-column>
          <el-table-column prop="grossWeight" label="毛重g"> </el-table-column>
          <el-table-column prop="netWeightg" label="净重g"> </el-table-column>
          <el-table-column prop="wastageg" label="废料g"> </el-table-column>
          <el-table-column prop="lossg" label="损耗g"> </el-table-column>
          <el-table-column label="操作" v-if="PPProductionInfo.state === 0">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editSmeltingProducts(scope.$index)">编辑</el-button>
              <el-button type="danger" size="mini" @click="delSmeltingProducts(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="card-footer" v-if="PPProductionInfo.state === 0 || id >= 0">
          <el-button type="primary" @click="saveAll(0)">草稿</el-button>
          <el-button type="danger" @click="saveAll(1)">打印标签</el-button>
          <el-button type="warning" @click="saveAll(2)">重复当前工序</el-button>
          <el-button type="success" @click="goBack()">撤回上班工序</el-button>
          <el-button type="danger" @click="saveAll(3)">转退火</el-button>
          <el-button type="warning" @click="saveAll(4)">完成生产</el-button>
        </div>
      </el-card>
      <!--  新增本班产物的对话框-->
      <el-dialog title="新增本班产物" :visible.sync="addClassDialogVisible" width="30%" @close="addClassDialogClose">
        <el-form label-width="120px">
          <el-form-item label="线轴名称">
            <el-select v-model="aaa" placeholder="请选择 " style="width:60%" @change="selectedChange">
              <el-option :value="item.mapKey" :label="item.mapValue + '--' + item.mapValue2" v-for="item in BobbinXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线轴规格">
            <el-select v-model="SmeltingProductsItem.bobbinDetailId" placeholder="请选择 " style="width:60%">
              <el-option :label="item.standards" :value="item.id" v-for="item in BobbinXiaLaInfo" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线径um">
            <el-input v-model="SmeltingProductsItem.wireDiameterUm" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="长度m/轴">
            <el-input v-model="SmeltingProductsItem.lengthM" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="毛重g">
            <el-input v-model="SmeltingProductsItem.grossWeight" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="净重g">
            <el-input v-model="SmeltingProductsItem.netWeightg" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="废料g">
            <el-input v-model="SmeltingProductsItem.wastageg" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="损耗g">
            <el-input v-model="SmeltingProductsItem.lossg" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addClassDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addClassDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑工艺参数的对话框 -->
      <el-dialog title="工艺参数" :visible.sync="dialogGYVisible" width="30%">
        <el-form label-width="120px">
          <el-form-item label="滑动率%">
            <el-input v-model="PPProductionInfo.slipRate" oninput="value=value.replace(/[^\d.]/g,'')" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="速度m/s">
            <el-input v-model="PPProductionInfo.speedM" oninput="value=value.replace(/[^\d.]/g,'')" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="放线张力">
            <el-input v-model="PPProductionInfo.payTension" oninput="value=value.replace(/[^\d.]/g,'')" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="PV">
            <el-input v-model="PPProductionInfo.pv" oninput="value=value.replace(/[^\d.]/g,'')" style="width:80%"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogGYVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogGYVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 设备信息的对话框 -->
      <el-dialog title="设备信息" :visible.sync="dialogInfoVisible" width="30%">
        <el-row>
          <el-col :span="3" :offset="1" style="padding-top:10px;">生产机型</el-col>
          <el-col :span="14" :offset="1">
            <el-select v-model="PPProductionInfo.equipmentId" placeholder="请选择 " style="width:100%">
              <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in equipmentXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogInfoVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogInfoConfirm">确 定</el-button>
        </span>
      </el-dialog>
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
      twoListName:'',
      oneListName:'',
      form: {
        name: ''
      },
      aaa: '',
      tableData: [],
      addClassDialogVisible: false,
      dialogCZVisible: false,
      dialogGYVisible: false,
      dialogInfoVisible: false,
      allocatDialogVisible: false,
      allocatNextDialogVisible: false,
      id: -1,
      Eid: -1,
      OperationInfo: {},
      staffXiaLa: [],
      TeamXiaLa: [],
      BasicInfo: {},
      RawMaterialRatio: [],
      ProcessTechnology: {},
      equipmentInfo: {},
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
        frequency: '', //班次id （1 白班 2夜班）
        slipRate: '', //滑动率%
        speedM: '', //速度m/s
        payTension: '', //放线张力
        pv: ''
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
      listdata: [],
      listdataDetail: [],
      ChuKuForm: {
        findName: '',
        findModelName: '',
        findIdOne: ''
      },
      listdataDetailAll: [],
      updateRemark: '', //备注
      warehourseXiaLa: [],
      updateWarehourseID: 1, //选中的仓库id
      listdataObj: {
        stockName: '', //产品名称
        stockNumber: '', //产品编号
        pppid: '' //生产id
      },
      activeName: 'stock',
      BobbinXiaLa: [],
      BobbinXiaLaInfo: []
    }
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getData()
    }
    if (this.$route.query.Eid) {
      this.Eid = this.$route.query.Eid
      this.getEditData()
    }
  },
  methods: {
    // 撤回当前工序
    async goBack(){
      const confirmResult = await this.$confirm('是否确认撤回？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('ProductionController/backToPPProduction',{
        findById:this.Eid
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success("撤回成功")
      this.$router.go(-1)
    },
    async selectedChange(e) {
      const { data: res } = await this.$http.post('ProductionController/getBobbinXiaLaInfoByBId', {
        findById: e
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.BobbinXiaLaInfo = res.data
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
    // 删除原材料
    async delNeedstock(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      this.Needstock.splice(index, 1)
      this.$message.success('删除成功')
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
    //   更改设备类型数据
    async dialogInfoConfirm() {
      const { data: res } = await this.$http.post('ProductionController/getEquipmentXiaLaInfoById', {
        findById: this.PPProductionInfo.equipmentId
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.equipmentInfo = res.data
      this.dialogInfoVisible = false
    },
    // 确认新增本班产物对话框
    addClassDialogConfirm() {
      this.SmeltingProductsItem.createTime = new Date()
      this.BobbinXiaLaInfo.forEach(item => {
        if (item.id == this.SmeltingProductsItem.bobbinDetailId) {
          this.SmeltingProductsItem.standards = item.standards
        }
      })
      this.BobbinXiaLa.forEach(item => {
        if (item.mapKey == this.aaa) {
          this.SmeltingProductsItem.bobbinName = item.mapValue + '--' + item.mapValue2
        }
      })
      this.SmeltingProducts.push(_.cloneDeep(this.SmeltingProductsItem))
      this.addClassDialogVisible = false
    },
    addClassDialogClose() {
      this.SmeltingProductsItem = {
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
      }
      this.aaa=''
    },
    //   获取页面的初始数据
    async getData() {
      const { data: res } = await this.$http.post('ProductionController/getMeltingBasicInfoById', {
        findById: this.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.OperationInfo = res.data.OperationInfo
      this.staffXiaLa = res.data.staffXiaLa
      this.PPProductionInfo = res.data.PPProductionInfo
      this.TeamXiaLa = res.data.TeamXiaLa
      this.BasicInfo = res.data.BasicInfo
      this.RawMaterialRatio = res.data.RawMaterialRatio
      this.ProcessTechnology = res.data.ProcessTechnology
      this.equipmentInfo = res.data.equipmentInfo ? res.data.equipmentInfo : {}
      this.equipmentXiaLa = res.data.equipmentXiaLa
      this.PPProductionInfo.teamId = res.data.OperationInfo.tteamId
      this.PPProductionInfo.frequency = res.data.OperationInfo.frequency
    },
    // 详情页面获取初始数据
    async getEditData() {
      const { data: res } = await this.$http.post('ProductionController/getProductionDetailByPPPId', {
        findById: this.Eid
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.OperationInfo = res.data.OperationInfo
      this.Needstock = res.data.oneList ? res.data.oneList : []
      this.BasicInfo = res.data.BasicInfo
      this.PPProductionInfo = res.data.PPProductionInfo
      this.ProcessTechnology = res.data.ProcessTechnology
      this.RawMaterialRatio = res.data.RawMaterialRatio
      this.SmeltingProducts = res.data.twoList
      this.TeamXiaLa = res.data.TeamXiaLa
      this.equipmentInfo = res.data.equipmentInfo
      this.equipmentXiaLa = res.data.equipmentXiaLa
      this.staffXiaLa = res.data.staffXiaLa
      this.BobbinXiaLa = res.data.BobbinXiaLa
      this.oneListName=res.data.oneListName
      this.twoListName=res.data.twoListName
    },
    // 保存全部数据
    async saveAll(state) {
      if(state===2){
        const confirmResult = await this.$confirm('是否确认重复当前工序？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return
        }
      }
      if (this.Eid >= 0) {
        this.PPProductionInfo.id = this.Eid
      } else {
        this.PPProductionInfo.suitId = this.ProcessTechnology.id
        this.PPProductionInfo.pproductId = this.id
        this.PPProductionInfo.gxid = 1
        this.PPProductionInfo.productionNumber = this.BasicInfo.productModel
      }
      this.SmeltingProducts.forEach(item => {
        item.gxId = this.PPProductionInfo.gxid
      })
      
      if(!this.PPProductionInfo.pproductId || !this.PPProductionInfo.equipmentId|| !this.PPProductionInfo.suitId|| !this.PPProductionInfo.staffId ){
        return this.$message.error("请填写必要项")
      }
      this.PPProductionInfo.state = state
      const { data: res } = await this.$http.post('ProductionController/savePPProduction', {
        ppProduction: this.PPProductionInfo,
        oneList: this.Needstock,
        twoList: this.SmeltingProducts
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success(this.Eid >= 0 ? '编辑成功' : '新增成功')
      this.$router.go(-1)
    },
    showAddClassDialog() {
      this.addClassDialogVisible = true
    },
    showGYDialog() {
      this.dialogGYVisible = true
    },
    showInfoDialog() {
      this.dialogInfoVisible = true
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
