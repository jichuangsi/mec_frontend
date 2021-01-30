<template>
  <div>
    <el-page-header @back="cancel" content="新增绕线" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div style="font-weight:bold">待绕线成品参数</div>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="2" :offset="2">生产时间</el-col>
        <el-col :span="5" style="color:#8494a9;">{{ pppProducts.createTime | dateFormat }}</el-col>
        <el-col :span="3">长度m/轴</el-col>
        <el-col :span="3" style="color:#8494a9;">{{ pppProducts.lengthM }}</el-col>
        <el-col :span="3">直线</el-col>
        <el-col :span="3" style="color:#8494a9;">{{ pppProducts.straightLine }}</el-col>
      </el-row>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="2" :offset="2">工序</el-col>
        <el-col :span="5" style="color:#8494a9;">{{ oneListName }}</el-col>
        <el-col :span="3">毛重g</el-col>
        <el-col :span="3" style="color:#8494a9;">{{ pppProducts.grossWeight }}</el-col>
        <el-col :span="3">数量</el-col>
        <el-col :span="3" style="color:#8494a9;">{{ pppProducts.numbers }}</el-col>
      </el-row>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="2" :offset="2">线轴</el-col>
        <el-col :span="5" style="color:#8494a9;">50黄</el-col>
        <el-col :span="3">净重g</el-col>
        <el-col :span="3" style="color:#8494a9;">{{ pppProducts.netWeightg }}</el-col>
        <el-col :span="3">线轴规格</el-col>
        <el-col :span="3" style="color:#8494a9;">{{ pppProducts.standards }}</el-col>
      </el-row>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="2" :offset="2">表面</el-col>
        <el-col :span="5" style="color:#8494a9;">{{ pppProducts.surface }}</el-col>
        <el-col :span="3">放线</el-col>
        <el-col :span="3" style="color:#8494a9;">{{ pppProducts.payingOff }}</el-col>
        <el-col :span="3">线径um</el-col>
        <el-col :span="3" style="color:#8494a9;">{{ pppProducts.wireDiameterUm }}</el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20" style="margin-top:20px;">
      <!-- 生产设备设定 -->
      <el-col :span="12">
        <el-card>
          <div style="font-weight:bold">生产设备设定</div>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9"><div style="margin-top:10px;">设备型号</div></el-col>
            <el-col :offset="1" :span="9">
              <el-select v-model="PPPWindingInfo.equipmentId" placeholder="请选择 " @change="equipmentSelectChanged">
                <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in equipmentXiaLa" :key="item.mapKey"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9">设备状态</el-col>
            <el-col :offset="1" :span="9" style="color:#8494a9;" v-if=" equipmentInfo.state!=null">
             {{ equipmentInfo.state === 0 ? '正常' : '报废' }}
            </el-col>
          </el-row>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9">设备类型</el-col>
            <el-col :offset="1" :span="9" style="color:#8494a9;">
             {{equipmentInfo.equipmentType}}
            </el-col>
          </el-row>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9">最近一次检修员</el-col>
            <el-col :offset="1" :span="9" style="color:#8494a9;">
              {{ equipmentInfo.checkStaffName }}
            </el-col>
          </el-row>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9">最近一次检修时间</el-col>
            <el-col :offset="1" :span="9" style="color:#8494a9;">
              {{ equipmentInfo.checkTime }}
            </el-col>
          </el-row>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9">设备运行次数</el-col>
            <el-col :offset="1" :span="9" style="color:#8494a9;">
              {{ equipmentInfo.runNumber }}
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 工艺参数 -->
      <el-col :span="12">
        <el-card>
          <div style="font-weight:bold">工艺参数</div>
          <el-row :gutter="20" style="margin:20px 0;">
            <el-col   :span="3">绕线程序</el-col>
            <el-col :span="4">
              <el-input size="mini" v-model="PPPWindingInfo.windingProcedure"></el-input>
            </el-col>
            <el-col  :span="3">张力程序</el-col>
            <el-col :span="4">
              <el-input size="mini" v-model="PPPWindingInfo.tensionProgram"></el-input>
            </el-col>
            <el-col :offset="1" :span="5">绕线前总长度m</el-col>
            <el-col :span="4" style="color:#8494a9;">
              {{beforeLength}}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:20px 0;">
            <el-col :span="3">延伸率%</el-col>
            <el-col :span="4">
              <el-input size="mini" v-model="PPPWindingInfo.elongation"></el-input>
            </el-col>
            <el-col   :span="3">拉断力cn</el-col>
            <el-col :span="4">
              <el-input size="mini" v-model="PPPWindingInfo.breakingForce"></el-input>
            </el-col>
            <el-col :offset="1" :span="5">绕线后总长度m</el-col>
            <el-col :span="4" style="color:#8494a9;">
              {{afterLength}}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:20px 0;">
            <el-col   :span="3">线轴类型</el-col>
            <el-col :span="4">
              <el-input size="mini" v-model="PPPWindingInfo.bobbinType"></el-input>
            </el-col>
            <el-col   :span="3">线轴直径</el-col>
            <el-col :span="4">
              <el-input size="mini" v-model="PPPWindingInfo.bobbindiameter"></el-input>
            </el-col>
            <el-col :offset="1" :span="5">绕线前总重量m</el-col>
            <el-col :span="4" style="color:#8494a9;">
              {{beforeWeight}}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:22px 0;">
            <el-col  :span="3">线轴颜色</el-col>
            <el-col :span="4">
              <el-input size="mini" v-model="PPPWindingInfo.bobbinColor"></el-input>
            </el-col>
            <el-col  :span="3">首尾标识</el-col>
            <el-col :span="4">
              <el-input size="mini" v-model="PPPWindingInfo.identification"></el-input>
            </el-col>
            <el-col :offset="1" :span="5">绕线后总重量m</el-col>
            <el-col :span="4" style="color:#8494a9;">
              {{afterWeight}}
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 本班生产产物 -->
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold">本班生产产物（{{ oneListName }}）<el-button type="primary" plain style="margin-left:60%;" @click="showAddDialog" v-if="pppstate===0">新增</el-button></div>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="twoList">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="生产时间" prop="createTime">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="工序" prop="createTime">
          <template>
            {{ oneListName }}
          </template>
        </el-table-column>
        <el-table-column label="线轴" prop="bobbinName" show-overflow-tooltip></el-table-column>
        <el-table-column label="线轴规格" prop="standards"></el-table-column>
        <el-table-column label="线径μm" prop="wireDiameterUm"></el-table-column>
        <el-table-column label="轴号" prop="axleNumber"></el-table-column>
        <el-table-column label="轴重" prop="axleloadWeight"></el-table-column>
        <el-table-column label="长度m/轴" prop="lengthM"></el-table-column>
        <el-table-column label="毛重g" prop="grossWeight"></el-table-column>
        <el-table-column label="净重g" prop="netWeightg"></el-table-column>
        <el-table-column label="操作" width="200" v-if="pppstate===0">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editSmeltingProducts(scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delSmeltingProducts(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin:20px 40%" v-if="pppstate===0">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveAll()">保存</el-button>
      </div>
    </el-card>
    <!--  新增本班产物的对话框-->
    <el-dialog :title="this.index>=0?'编辑':'新增本班产物'" :visible.sync="addClassDialogVisible" width="30%" @close="addClassDialogClose">
      <el-form label-width="120px">
        <el-form-item label="线轴名称">
          <el-select v-model="aaa" placeholder="请选择 " style="width:60%" @change="selectedChange">
            <el-option :value="item.mapKey" :label="item.mapValue + '--' + item.mapValue2" v-for="item in BobbinXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线轴规格">
          <el-select v-model="twoListItem.bobbinDetailId" placeholder="请选择 " style="width:60%">
            <el-option :label="item.standards" :value="item.id" v-for="item in BobbinXiaLaInfo" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线径μm">
          <el-input v-model="twoListItem.wireDiameterUm" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
        </el-form-item>
         <el-form-item label="轴号">
          <el-input v-model="twoListItem.axleNumber" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
        </el-form-item>
         <el-form-item label="轴重">
          <el-input v-model="twoListItem.axleloadWeight" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label="长度m/轴">
          <el-input v-model="twoListItem.lengthM" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label="毛重g">
          <el-input v-model="twoListItem.grossWeight" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label="净重g">
          <el-input v-model=" netWeightg" disabled style="width:60%"></el-input>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClassDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClassDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      aaa: '',
      Eid: '',
      id: '',
      pppProducts: {},
      oneListName: '',
      equipmentXiaLa: [],
      twoList: [],
      twoListItem: {
        id: '', //id
        gxId: '',
        gxName: '',
        createTime: '', //生产时间
        bobbinDetailId: '', //明细
        bobbinName: '', //名称
        standards: '', //规格
        wireDiameterUm: '', ////线径um
        lengthM: '', //长度m/轴
        grossWeight: '', //毛重g
        netWeightg: '', //净重g
        wastageg: '', //废料g
        lossg: '', //损耗g
        tractionSpeed: '', //牵引速度
        takeUpSpeed: '', //收线速度
        surface: '', //表面
        payingOff: '', //放线
        straightLine: '', //直线
        numbers: '', //数量
        flatCable: '', //排线
        tension: '', //张力
        oddmentsG: '', //余料g
        totalLength: '', //总长度（长度*数量）
        netWeightgSum: '', //总净重g(净重*数量)
        state: '', //改绕/绕线否 0否 1是（默认0）
        deleteNo: '', //删除否
        pppid: '', //生产id
        slip: '', //滑差
        axleNumber:'',
        axleloadWeight:'',
      },
      PPPWindingInfo: {
        id: '', //产物ID
        equipmentId: '', //生产产物id
        tension: '', //张力
        wasteAge: '', //废料g
        cloutG: '', //余料g
        lossG: '', //损耗g
        flatCable: '', //排线
        surface: '', //表面
        settingOut: '', //放线
        straightLine: '', //直线
        deleteNo: '', //删除否
        ppppid: '' //生产产物id
      },
      oneListName: '',
      addClassDialogVisible: false,
      BobbinXiaLa: [],
      BobbinXiaLaInfo: '',
      equipmentInfo:{},
      beforeWeight:'',
      beforeLength:'',
      index:-1,
      pppstate:-1,
    }
  },
  
  computed:{
    afterLength () {
      let num=0
      this.twoList.forEach(item=>{
        num+=item.totalLength
      })
      return num
    },
    afterWeight () {
      let num=0
      this.twoList.forEach(item=>{
        num+=item.netWeightgSum
      })
      return num
    },
    netWeightg(){
      return this.twoListItem.grossWeight-this.twoListItem.axleloadWeight
    }
  },
  created() {
    this.Eid = this.$route.query.Eid
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    // 保存页面所有数据
    async saveAll(){

      this.PPPWindingInfo.ppppid=this.id
      this.twoList.forEach(item=>{
        item.fid=this.id
      })
      const { data: res } = await this.$http.post('ProductionController/savePWindingDetail',{
        ppProduction:{id:this.Eid},
        pppWindingInfo:this.PPPWindingInfo,
        twoList:this.twoList
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success("保存成功")
      this.$router.go(-1)
    },
    // 仪器设备下拉框改变
    async equipmentSelectChanged(){
      const { data: res } = await this.$http.post('ProductionController/getEquipmentXiaLaInfoById', {
        findById: this.PPPWindingInfo.equipmentId
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.equipmentInfo = res.data
    },
    // 编辑本班产物
    editSmeltingProducts(index) {
      this.index=index
      this.twoListItem = _.cloneDeep(this.twoList[index])
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
      this.twoList.splice(index, 1)
      this.$message.success('删除成功')
    },
    addClassDialogConfirm() {
      this.twoListItem.netWeightg=this.netWeightg
      this.twoListItem.totalLength=this.twoListItem.lengthM*this.twoListItem.numbers
      this.twoListItem.netWeightgSum=this.twoListItem.netWeightg*this.twoListItem.numbers
      this.twoListItem.createTime = new Date()
      this.BobbinXiaLaInfo.forEach(item => {
        if (item.id == this.twoListItem.bobbinDetailId) {
          this.twoListItem.standards = item.standards
        }
      })
      this.BobbinXiaLa.forEach(item => {
        if (item.mapKey == this.aaa) {
          this.twoListItem.bobbinName = item.mapValue + '--' + item.mapValue2
        }
      })
      if(this.index>=0){
        this.twoList.splice(this.index,1,_.cloneDeep(this.twoListItem))
      }else{
        this.twoList.push(_.cloneDeep(this.twoListItem))
      }
      
      this.addClassDialogVisible = false
    },
    // 监听添加本班对话框关闭
    addClassDialogClose() {
      this.index=-1,
      this.twoListItem = {
        id: '', //id
        gxId: '',
        gxName: '',
        createTime: '', //生产时间
        bobbinDetailId: '', //明细
        bobbinName: '', //名称
        standards: '', //规格
        wireDiameterUm: '', ////线径um
        lengthM: '', //长度m/轴
        grossWeight: '', //毛重g
        netWeightg: '', //净重g
        wastageg: '', //废料g
        lossg: '', //损耗g
        tractionSpeed: '', //牵引速度
        takeUpSpeed: '', //收线速度
        surface: '', //表面
        payingOff: '', //放线
        straightLine: '', //直线
        numbers: '', //数量
        flatCable: '', //排线
        tension: '', //张力
        oddmentsG: '', //余料g
        totalLength: '', //总长度（长度*数量）
        netWeightgSum: '', //总净重g(净重*数量)
        state: '', //改绕/绕线否 0否 1是（默认0）
        deleteNo: '', //删除否
        pppid: '', //生产id
        slip: '', //滑差
        axleNumber:'',
        axleloadWeight:'',
      }
    },
    async selectedChange(e) {
      const { data: res } = await this.$http.post('ProductionController/getBobbinXiaLaInfoByBId', {
        findById: e
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.BobbinXiaLaInfo = res.data
    },
    //打开本班产物对话框
    showAddDialog() {
      this.addClassDialogVisible = true
    },
    //   获取页面初始数据
    async getData() {
      const { data: res } = await this.$http.post('ProductionController/getPWindingDetailByPPWindingDetailId', {
        findById: this.Eid,
        findIdOne: this.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.pppProducts = res.data.pppProducts
      this.pppstate=res.data.pppstate
      this.oneListName = res.data.oneListName
      this.equipmentXiaLa = res.data.equipmentXiaLa
      this.twoList = res.data.TwoList
      this.oneListName = res.data.oneListName
      this.BobbinXiaLa = res.data.BobbinXiaLa
      this.PPPWindingInfo=res.data.PPPWindingInfo
      this.beforeLength=res.data.beforeLength
      this.beforeWeight=res.data.beforeWeight
      if(this.PPPWindingInfo.equipmentId){
        this.equipmentSelectChanged()
      }
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped></style>
