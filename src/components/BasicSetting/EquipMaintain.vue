<template>
  <div>
    <el-page-header @back="cancel" content="设备检修" style="margin-bottom:20px;"> </el-page-header>

    <el-row>
      <el-col :span="15">
        <el-card>
          <div style="font-weight:bold;">设备信息</div>
          <el-row  >
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>设备名称</div>
                <div style="color:#8494a9;">{{equipment.equipmentName}}</div>
              </div>
            </el-col>
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>本月正常运行时间</div>
                <div style="color:#8494a9;">{{sumTime.currentNormalMonth}}</div>
              </div>
            </el-col>
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>累计正常运行时间</div>
                <div style="color:#8494a9;">{{sumTime.SumNormalMonth}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row  >
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>设备型号</div>
                <div style="color:#8494a9;">{{equipment.equipmentModel}}</div>
              </div>
            </el-col>
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>本月不正常运行时间</div>
                <div style="color:#8494a9;">{{sumTime.currentNONormalMonth}}</div>
              </div>
            </el-col>
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>累计不正常运行时间</div>
                <div style="color:#8494a9;">{{sumTime.SumNONormalMonth}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>设备编号</div>
                <div style="color:#8494a9;">{{equipment.equipmentNumber}}</div>
              </div>
            </el-col>
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>本月休班时间</div>
                <div style="color:#8494a9;">{{sumTime.currentRestMonth}}</div>
              </div>
            </el-col>
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>累计休班时间</div>
                <div style="color:#8494a9;">{{sumTime.SumRestMonth}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>设备状态</div>
                <div style="color:#8494a9;">{{equipment.state==1?'未启动':'启动'}}</div>
              </div>
            </el-col>
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>本月停用时间</div>
                <div style="color:#8494a9;">{{sumTime.currentOutMonth}}</div>
              </div>
            </el-col>
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>累计停用时间</div>
                <div style="color:#8494a9;">{{sumTime.SumOutMonth}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="7" :offset="1">
              <div class="info">
                <div>检修状态</div>
                <div style="color:#8494a9;">{{equipment.checkNo==0?'未检修':'已检修'}}</div>
              </div>
            </el-col>

          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-card style="padding:40px 0">
          <div style="color:#a494a9;margin:10px 0;">说明：1.点检在证书生产前进行；</div>
          <div style="color:#a494a9;margin:10px 0;">
            2.正常选择“√”，不正常打“×”，并报告生成班长或机修工修理并记录修理时间；凡停运待料时间、或休息也应记录在相应栏中，休班时打“▢”，设备停用时打“⚪”。
          </div>
          <div style="color:#a494a9;margin:10px 0;">3.本卡每月一张，妥善保管，月底交生产部统计分析。</div>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">
        设备日常点检表
        <el-button style="margin-left:60%;" type="primary" plain @click="overhaul">检修</el-button>
        <el-button type="warning" plain @click="outService">设备停用</el-button>
        <el-button type="danger" @click="scrap">设备报废</el-button>
      </div>
      <div class="box">
        <div class="card" @click="showYearDialog()">
          <div style="font-size:100px;padding-bottom:10px;color:#ccc">+</div>
        </div>
        <div v-for="item in equipmentOverhauls" :key="item.id" :class="['card',{current:status==item.id}]" @click="toggle(item.id)">
          <div>{{item.equipmentTime.substring(0,4)}}</div>
          <h2 style="margin:10px 0;">{{item.equipmentTime.substring(5)}}月</h2>
          <div v-if="status==item.id">当前选择</div>
        </div>
      </div>
      <!-- 表格部分 -->
        <el-table v-if="equipmentOverhauls.length" :data="tableData3" style="margin-left:20px;margin-bottom:40px;width:96.84%;" :cell-style="{padding: '0'}">
          <el-table-column label="时间" align="right" width="121">
            <el-table-column prop="name" label="检项" width="121" align="center"> </el-table-column>
          </el-table-column>
          <el-table-column label="班次" align="center" key="shiftShow" width="60">
            <template slot-scope="scope">
              <div v-if="scope.row.shiftShow" class="line-wrapper">
                <p>B</p>
                <div class="line" style="top:26px;"></div>
                <p>Y</p>
              </div>
              <div v-else></div>
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) of mechanism" :label="item+''" align="center" :key="item" width="45">
            <template slot-scope="scope">
              <div v-if="scope.row.shiftShow" class="line-wrapper">
                <p style="height:25px" v-if="scope.row.mechanism[index].value === 'B1'||scope.row.mechanism[index].value === 'BY1,1'||scope.row.mechanism[index].value === 'BY1,2'||scope.row.mechanism[index].value === 'BY1,3'||scope.row.mechanism[index].value === 'BY1,4'">✔</p>
                <p style="height:25px;font-size:20px;margin-bottom:20px;" v-else-if="scope.row.mechanism[index].value === 'B2'||scope.row.mechanism[index].value === 'BY2,1'||scope.row.mechanism[index].value === 'BY2,2'||scope.row.mechanism[index].value === 'BY2,3'||scope.row.mechanism[index].value === 'BY2,4'">×</p>
                <p style="height:25px" v-else-if="scope.row.mechanism[index].value === 'B3'||scope.row.mechanism[index].value === 'BY3,1'||scope.row.mechanism[index].value === 'BY3,2'||scope.row.mechanism[index].value === 'BY3,3'||scope.row.mechanism[index].value === 'BY3,4'">▢</p>
                <p style="height:25px" v-else-if="scope.row.mechanism[index].value === 'B4'||scope.row.mechanism[index].value === 'BY4,1'||scope.row.mechanism[index].value === 'BY4,2'||scope.row.mechanism[index].value === 'BY4,3'||scope.row.mechanism[index].value === 'BY4,4'">⚪</p>
                <p style="height:25px" v-else></p>
                <div class="line"></div>
                <p style="height:25px" v-if="scope.row.mechanism[index].value === 'Y1'||scope.row.mechanism[index].value === 'BY1,1'||scope.row.mechanism[index].value === 'BY2,1'||scope.row.mechanism[index].value === 'BY3,1'||scope.row.mechanism[index].value === 'BY4,1'">✔</p>
                <p style="height:25px" v-else-if="scope.row.mechanism[index].value === 'Y2'||scope.row.mechanism[index].value === 'BY1,2'||scope.row.mechanism[index].value === 'BY2,2'||scope.row.mechanism[index].value === 'BY3,2'||scope.row.mechanism[index].value === 'BY4,2'">×</p>
                <p style="height:25px" v-else-if="scope.row.mechanism[index].value === 'Y3'||scope.row.mechanism[index].value === 'BY1,3'||scope.row.mechanism[index].value === 'BY2,3'||scope.row.mechanism[index].value === 'BY3,3'||scope.row.mechanism[index].value === 'BY4,3'">▢</p>
                <p style="height:25px" v-else-if="scope.row.mechanism[index].value === 'Y4'||scope.row.mechanism[index].value === 'BY1,4'||scope.row.mechanism[index].value === 'BY2,4'||scope.row.mechanism[index].value === 'BY3,4'||scope.row.mechanism[index].value === 'BY4,4'">⚪</p>
                <p style="height:25px" v-else></p>
              </div>
              <div v-else>
                {{ scope.row.mechanism[index].value }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 检修的对话框 -->
      <el-dialog title="检修" :visible.sync="dialogVisible" width="40%" @close="dialogClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="检修日期">
            <el-date-picker  placeholder="选择日期" v-model="equipmentCheckRecord.equipmentTime" style="width:33%;" format="yyyy 年 MM 月 dd 日 " value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="时间h">
            <el-input v-model="equipmentCheckRecord.userTime" oninput = "value=value.replace(/[^\d.]/g,'')" style="width:33%;"></el-input>
          </el-form-item>
          <el-form-item label="班次">
            <el-select v-model="equipmentCheckRecord.frequency" placeholder="请选择">
              <el-option label="白班" :value="1"></el-option>
              <el-option label="夜班" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-table :data="equipmentItemsList" border :span-method="objectSpanMethod">
          <el-table-column prop="equipmentItems" label="检项" width="180" align="center"> </el-table-column>
          <el-table-column prop="status" label="正常" width="90" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.overhaulState" :true-label="1"  @change="change1(scope.row.overhaulState)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="newStatus" label="不正常" width="90" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.overhaulState" :true-label="2"   @change="change2(scope.row.overhaulState)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="offDuty" label="休班" width="90" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.overhaulState" :true-label="3" @change="change3(scope.row.overhaulState)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="deactivate" label="停用" width="90" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.overhaulState" :true-label="4" @change="change4(scope.row.overhaulState)"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
    <div>
      
    </div>
    <el-dialog
      title="新增年月"
      :visible.sync="yearDialogVisible"
      width="30%"
      @close="yearDialogClose">
      <el-form  label-width="120px">
        <el-form-item label="年月设定">
          <el-date-picker type="month" placeholder="选择日期" v-model="addYear" style="width:50%;" format="yyyy 年 MM 月 " value-format="yyyy-MM"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="yearDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="yearDialogConfoirm">新 增</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
      radio: '',
      mechanism: [], // 日期的天数
      tableData3: [],
      id: '',
      dialogVisible: false,
      form: {},
      equipmentItemsList:[],
      tableData: [
        { name: '项目A',overhaulState:1,equipmentOverhaulId:'' },
        { name: '项目B', overhaulState:1,equipmentOverhaulId:'' },
        { name: '项目C', overhaulState:1 ,equipmentOverhaulId:'' },
        { name: '项目D',overhaulState:1 ,equipmentOverhaulId:'' },
        { name: '项目E', overhaulState:1 ,equipmentOverhaulId:'' }
      ],
      equipmentCheckRecord: {
        equipmentTime: (new Date).getFullYear() + '-' + ((new Date).getMonth() + 1 + '').padStart(2, '0') + '-' + (new Date).getDate(),
        equipmentId: 1,
        frequency: 1,
        id: 0,
        staffId: 0,
        userTime:0
      },
      yearDialogVisible:false,
      addYear:'',
      equipmentOverhauls:[],
      status:'',
      equipment:{},
      sumTime:{},
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getData()
  },
  mounted() {
    
  },
  methods: {
    // 切换点检表的月份
    async toggle(id){
      this.status=id
      this.getAllTable()
    },
    // 获取该设备的点检信息
    async getAllTable(){
      const { data: res } = await this.$http.post('BasicSettingController/getEquipmentRecordByYMandEquipmentId',{
        findById:this.id, 
        findIdOne:this.status
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.tableData3=res.data.tableData3
      this.mechanism=res.data.mechanism
    },
    // 获取 已创建的年月点检信息
    async getData(){
      const { data: ress } = await this.$http.post('BasicSettingController/getAllEquipmentOverhaulById',{
        findById:this.id
      })
      if (ress.code !== "0010") return this.$message.error(ress.msg)
      this.equipment=ress.data.equipment
      this.sumTime=ress.data.sumTime
      const { data: res } = await this.$http.post('BasicSettingController/getEquipmentRecordYMByEquipmentId',{
        findById:this.id 
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.equipmentOverhauls=res.data.equipmentOverhauls
      if(this.equipmentOverhauls==null){
        return
      }
      this.status=this.equipmentOverhauls[0].id
      this.getAllTable()
      
    },
    // 监听新增年月对话框关闭
    yearDialogClose(){
      this.addYear=''
    },
    // 确认新增年月
    async yearDialogConfoirm(){
      const { data: res } = await this.$http.post('BasicSettingController/saveOverhaulYM',{
        findById:this.id,
        findDate:this.addYear
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success('新增成功')
      this.yearDialogVisible=false
      this.getData()
    },
    //打开新增年月的对话框
    showYearDialog(){
      this.yearDialogVisible=true
    },
    // 监听对话框关闭
    dialogClose(){
      this.equipmentCheckRecord.userTime=0
    },
    // 对话框点击确认
    async dialogConfirm(){
      let equipmentItemsList=this.equipmentItemsList
      equipmentItemsList.forEach(item =>{
        item.equipmentOverhaulId=item.id
      })
      this.equipmentCheckRecord.equipmentId=this.id
      const { data: res } = await this.$http.post('/BasicSettingController/saveEquipmentOverhaulRecord',{
        equipmentCheckRecord:this.equipmentCheckRecord,
        equipmentCheckDetailRecordList:this.equipmentItemsList
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success("新增成功")
      this.dialogVisible=false
      this.getData()
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let length = this.tableData.length
      if (columnIndex === 3 || columnIndex === 4) {
        if (rowIndex === 0) {
          return {
            rowspan: length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    change1(overhaulState) {   
        this.equipmentItemsList.forEach(item => {
          if(item.overhaulState==3||item.overhaulState==4){
            item.overhaulState=''
          }
        })    
    },
    change2(overhaulState) {   
        this.equipmentItemsList.forEach(item => {
          if(item.overhaulState==3||item.overhaulState==4){
            item.overhaulState=''
          }
        })    
    },
    change3(overhaulState) {   
        this.equipmentItemsList.forEach(item => {
            item.overhaulState=3
        })    
    },
    change4(overhaulState) {   
        this.equipmentItemsList.forEach(item => {
            item.overhaulState=4
        })    
    },
    cancel() {
      this.$router.go(-1)
    },
    // 点击检修
    async overhaul() {
      const { data: res } = await this.$http.post('BasicSettingController/getEquipmentOverhaulBasicInfo',{
        findById:this.id,
        findDate:this.equipmentCheckRecord.equipmentTime
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      res.data.equipmentItemsList.forEach(item=>{
        item.overhaulState=''
      })
      this.equipmentItemsList=res.data.equipmentItemsList
      this.dialogVisible = true
    },
    // 设备报废
    async scrap() {
      const confirmResult = await this.$confirm('是否确认报废？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('BasicSettingController/updateEquipmentStateById', {
        updateID: this.id,
        updateType: 'D'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('报废成功')
      this.$router.go(-1)
    },
    // 设备停用
    async outService() {
      const confirmResult = await this.$confirm('是否确认停用？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('BasicSettingController/updateEquipmentStateById', {
        updateID: this.id,
        updateType: 'S'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('停用成功')
    }
  }
}
</script>
<style lang="less" scoped>
.info {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
.box {
  display: flex;
  overflow: auto;
  padding: 20px;
  .current{
    color: #fff;
    background-color: #3370ff;
  }
  .card {
    cursor: pointer;
    flex-shrink: 0;
    border-radius: 10px;
    width: 120px;
    height: 120px;
    box-sizing: border-box;
    padding: 10px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #3370ff;
  }
}
/deep/.el-table tbody tr:hover>td { 
    background-color:#ffffff!important
}
/deep/.el-table thead.is-group th {
  background: none;
}

/deep/.el-table thead.is-group tr:first-of-type th:first-of-type {
  border-bottom: none;
}

/deep/.el-table thead.is-group tr:first-of-type th:first-of-type:before {
  content: '';
  position: absolute;
  width: 1px;
  height: 100px;
  top: 0;
  left: 0;
  background-color: grey;
  opacity: 0.3;
  display: block;
  transform: rotate(-51deg);
  transform-origin: top;
}

/deep/.el-table thead.is-group tr:last-of-type th:first-of-type:before {
  content: '';
  position: absolute;
  width: 1px;
  height: 100px;
  bottom: 0;
  right: 0;
  background-color: grey;
  opacity: 0.3;
  display: block;
  transform: rotate(-52deg);
  transform-origin: bottom;
}
.el-table .cell {
  padding: 0 !important;
}
.el-table td,
.el-table th {
  padding: 0 !important;
}
.line-wrapper {
  position: relative;
  .line {
    position: absolute;
    width: 220%;
    background-color: #ebeef5;
    height: 1px;
    top: 28px;
    left: -10px;
  }
}
</style>
