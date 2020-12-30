<template>
  <div>
    <el-page-header @back="cancel" content="新增组合" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div style="font-weight:bold;">基本信息</div>
      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="组合编号">
          <el-input v-model="tsuit.constituteNumber" style="width:33%;" disabled></el-input>
        </el-form-item>
        <el-form-item label="组合名称">
          <el-input v-model="tsuit.constituteName" style="width:33%;"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="tsuit.remark" style="width:33%;"></el-input>
        </el-form-item>
        <el-form-item label="线别">
          <el-select v-model="tsuit.lineTypeId" placeholder="请选择 " style="width:33%;">
            <el-option :label="item.name" :value="item.id" v-for="item in XBType" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用范围描述">
          <el-input v-model="tsuit.scopeApplication" style="width:33%;"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">粗拉<el-button type="primary" style="margin-left:70%;" @click="showDialog(1)">新增</el-button></div>
      <el-table :data="tsuitDetail" style="width: 100%" :row-class-name="tableRowClassName1">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column label="模具类别">
          <template slot-scope="scope">
            {{ scope.row.mouldType === 1 ? '成品模具' : scope.row.mouldType === 2 ? '成套模具' : '不使用模具' }}
          </template>
        </el-table-column>
        <el-table-column prop="mouldNumber" label="模具编号">
          <template slot-scope="scope">
            {{scope.row.mouldNumber?scope.row.mouldNumber:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="mouldModel" label="模具型号">
          <template slot-scope="scope">
            {{scope.row.mouldModel?scope.row.mouldModel:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="sonmouldModel" label="子模具编号">
          <template slot-scope="scope">
            {{scope.row.sonmouldModel?scope.row.sonmouldModel:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">中拉<el-button type="primary" style="margin-left:70%;" @click="showDialog(2)">新增</el-button></div>
      <el-table :data="tsuitDetail" style="width: 100%" :row-class-name="tableRowClassName2">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="date" label="模具类别">
          <template slot-scope="scope">
            {{ scope.row.mouldType === 1 ? '成品模具' : scope.row.mouldType === 2 ? '成套模具' : '不使用模具' }}
          </template>
        </el-table-column>
        <el-table-column prop="mouldNumber" label="模具编号">
          <template slot-scope="scope">
            {{scope.row.mouldNumber?scope.row.mouldNumber:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="mouldModel" label="模具型号">
          <template slot-scope="scope">
            {{scope.row.mouldModel?scope.row.mouldModel:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="sonmouldModel" label="子模具编号">
          <template slot-scope="scope">
            {{scope.row.sonmouldModel?scope.row.sonmouldModel:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">半成品<el-button type="primary" style="margin-left:70%;" @click="showDialog(3)">新增</el-button></div>
      <el-table :data="tsuitDetail" style="width: 100%" :row-class-name="tableRowClassName3">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="date" label="模具类别">
          <template slot-scope="scope">
            {{ scope.row.mouldType === 1 ? '成品模具' : scope.row.mouldType === 2 ? '成套模具' : '不使用模具' }}
          </template>
        </el-table-column>
        <el-table-column prop="mouldNumber" label="模具编号">
          <template slot-scope="scope">
            {{scope.row.mouldNumber?scope.row.mouldNumber:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="mouldModel" label="模具型号">
          <template slot-scope="scope">
            {{scope.row.mouldModel?scope.row.mouldModel:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="sonmouldModel" label="子模具编号">
          <template slot-scope="scope">
            {{scope.row.sonmouldModel?scope.row.sonmouldModel:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template>
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">成品<el-button type="primary" style="margin-left:70%;" @click="showDialog(4)">新增</el-button></div>
      <el-table :data="tsuitDetail" style="width: 100%" :row-class-name="tableRowClassName4">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="date" label="模具类别">
          <template slot-scope="scope">
            {{ scope.row.mouldType === 1 ? '成品模具' : scope.row.mouldType === 2 ? '成套模具' : '不使用模具' }}
          </template>
        </el-table-column>
        <el-table-column prop="mouldNumber" label="模具编号">
          <template slot-scope="scope">
            {{scope.row.mouldNumber?scope.row.mouldNumber:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="mouldModel" label="模具型号">
          <template slot-scope="scope">
            {{scope.row.mouldModel?scope.row.mouldModel:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="sonmouldModel" label="子模具编号">
          <template slot-scope="scope">
            {{scope.row.sonmouldModel?scope.row.sonmouldModel:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" style="margin:0 40px;" @click="saveAll">保存</el-button>
        <el-button type="warning">预览</el-button>
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" @close="dialogClose">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="模具类别">
          <el-select v-model="submitForm.iswhether" placeholder="请选择 " style="width:50%;" @change="selectedChange">
            <el-option label="不使用模具" :value="-1"></el-option>
            <el-option label="成套模具管理" :value="1"></el-option>
            <el-option label="成品模具管理" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模具名称">
          <el-input style="width:50%;" placeholder="请输入内容" v-model="submitForm.findName">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="selectedChangeData"></i>
          </el-input>
        </el-form-item>
        <div v-if="selectedIndex === 1">
          <el-row>
            <el-col :span="12">
              <el-table :data="tmould" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" style="width: 100%" @row-click="rowClick" highlight-current-row>
                <el-table-column prop="mouldName" label="模具名称"> </el-table-column>
                <el-table-column prop="mouldModel" label="模具型号"> </el-table-column>
                <el-table-column prop="mouldNumber" label="模具编号"> </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-table
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                :data="tmouldDetail"
                :cell-style="{ padding: '5px 0' }"
                :header-cell-style="{ background: '#f0f5ff', padding: '0' }"
                style="width: 100%"
              >
                <el-table-column prop="sonmouldModel" label="子模具编号"> </el-table-column>
                <el-table-column prop="sonmouldSpaNum" label="子模具孔径u"> </el-table-column>
                <el-table-column type="selection" width="55"> </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
        <div v-if="selectedIndex === 0">
          <el-table :data="tmould "  @selection-change="handleSelectionChange" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" style="width: 100%"  highlight-current-row>
            <el-table-column prop="mouldName" label="模具名称"></el-table-column>
            <el-table-column prop="mouldModel" label="模具型号"> </el-table-column>
            <el-table-column prop="mouldNumber" label="模具编号"> </el-table-column>
            <el-table-column prop="wiredrawRemark" label="标称直径um"> </el-table-column>
            <el-table-column prop="measureddiamUm" label="实测直径um"> </el-table-column>
            <el-table-column  type="selection" label="选择"> </el-table-column>
          </el-table>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
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
      tsuitDetail: [],
      tsuitDetailItem: {
        compositeTypeId: '', //组合类型(1粗拉，2中拉，3半成品，4成品等)
        mouldDetailId: '', //模具明细ID(在新增成套模具时需要此字段)。id，以“，”拼接
        mouldId: '', //模具ID
        mouldType: '', //模具类别(1成品模具/2成套模具/0不使用模具)
        mouldNumber: '', //模具编号
        mouldModel: '', //模具型号
        sonmouldModel: ''//套模编号
      },
      XBType: [],
      id: -1,
      tsuit: {
        constituteName: '', //名称
        constituteNumber: '', //组合编号
        id: '',
        lineTypeId: '', //线别类型ID
        remark: '', //名称
        scopeApplication: '' //scopeApplication
      },
      dialogVisible: false,
      
      submitForm: {
        iswhether: '', //模具类型：是否是成套模具 0 否 1是
        findModelName: '', //设备类型：粗拉中拉成品半成品
        findName: '' //模糊查询
      },
      compositeTypeId: '',
      tmould: [],
      tmouldDetail: [],
      multipleSelection: [],
      selectedIndex: -1,//-1不使用模具 1成套模具 0成品模具管理
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getSelecteds()
  },
  methods: {
    // 保存所有数据
    async saveAll(){
      if(this.id>=0){
        this.tsuit.id=this.id
      }
      const { data: res } = await this.$http.post('mouldController/saveTSuit',{
        tSuit:this.tsuit,
        tSuitdetailList:this.tsuitDetail
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success(this.id>=0?'编辑成功':"新增成功")
      this.$router.go(-1)
    },
    // 点击删除
    async del(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      this.tsuitDetail.splice(index, 1)
      this.$message.success('删除成功')
    },
    //   监听对话框关闭
    dialogClose() {
      this.selectedIndex=-1
      if(this.$refs.multipleTable){
        this.$refs.multipleTable.clearSelection()
      }
      this.tsuitDetailItem= {
        compositeTypeId: '', //组合类型(1粗拉，2中拉，3半成品，4成品等)
        mouldDetailId: '', //模具明细ID(在新增成套模具时需要此字段)。id，以“，”拼接
        mouldId: '', //模具ID
        mouldType: '', //模具类别(1成品模具/2成套模具/0不使用模具)
        mouldNumber: '', //模具编号
        mouldModel: '', //模具型号
        sonmouldModel: ''//套模编号
      },
      this.multipleSelection = []
      this.submitForm = {
        iswhether: '', //模具类型：是否是成套模具 0 否 1是
        findModelName: '', //设备类型：粗拉中拉成品半成品
        findName: '' //模糊查询
      }
    },
    //   确认添加
    async dialogConfirm() {
      
      if(this.selectedIndex===1){
        this.tsuitDetailItem.mouldType=2
        if (!this.tsuitDetailItem.mouldId) {
          this.tsuitDetailItem.mouldId = this.tmould[0].id
          this.tsuitDetailItem.mouldModel = this.tmould[0].mouldModel
          this.tsuitDetailItem.mouldNumber = this.tmould[0].mouldNumber
        }
        let str = ''
        let str2 = ''
        this.multipleSelection.forEach(item => {
          str = str + item.id + ','
          str2 = str2 + item.sonmouldModel + ','
        })
        this.tsuitDetailItem.mouldDetailId = str
        this.tsuitDetailItem.sonmouldModel = str2
        this.tsuitDetail.push({ ...this.tsuitDetailItem })
      }else if(this.selectedIndex===0){
        this.multipleSelection.forEach(item=>{
          this.tsuitDetailItem.mouldId=item.id
          this.tsuitDetailItem.mouldModel=item.mouldModel
          this.tsuitDetailItem.mouldNumber=item.mouldNumber
          this.tsuitDetailItem.mouldType=1
          this.tsuitDetail.push({ ...this.tsuitDetailItem })
        })   
      }else{
        this.tsuitDetailItem.mouldType=0
        this.tsuitDetail.push({ ...this.tsuitDetailItem })
      }
      
      this.dialogVisible = false
    },
    //   监听行点击事件
    async rowClick(row, event, column) {
      this.tsuitDetailItem.mouldId = row.id
      this.tsuitDetailItem.mouldModel = row.mouldModel
      this.tsuitDetailItem.mouldNumber = row.mouldNumber
      const { data: res } = await this.$http.post('mouldController/getTmouldByEquipmentTypeandTmouldTypeById', {
        iswhether: 1,
        findById: row.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.tmouldDetail = res.data
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //   展示对话框
    showDialog(compositeTypeId) {
      this.compositeTypeId = compositeTypeId
      this.tsuitDetailItem.compositeTypeId = compositeTypeId
      this.dialogVisible = true
    },
    //   下拉框发生变化
    async selectedChange(e) {
      this.selectedIndex = e
      if (e === -1) {
        return
      } else {
        switch (this.compositeTypeId) {
          case 1:
            this.submitForm.findModelName = 'CL'
            break
          case 2:
            this.submitForm.findModelName = 'ZL'
            break
          case 3:
            this.submitForm.findModelName = 'BCP'
            break
          case 4:
            this.submitForm.findModelName = 'CP'
            break
          default:
            break
        }
        this.selectedChangeData()
        
      }
    },
    async selectedChangeData(){
      const { data: res } = await this.$http.post('mouldController/getTmouldByEquipmentTypeandTmouldType', this.submitForm)
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.tmould = res.data.tmould
        if(res.data.tmouldDetail){
          this.tmouldDetail = res.data.tmouldDetail
        }
    },
    //   隐藏行
    tableRowClassName1: function(row, index) {
      if (row.row.compositeTypeId != 1) {
        return 'hidden-row'
      }
      return ''
    },
    tableRowClassName2: function(row, index) {
      if (row.row.compositeTypeId != 2) {
        return 'hidden-row'
      }
      return ''
    },
    tableRowClassName3: function(row, index) {
      if (row.row.compositeTypeId != 3) {
        return 'hidden-row'
      }
      return ''
    },
    tableRowClassName4: function(row, index) {
      if (row.row.compositeTypeId != 4) {
        return 'hidden-row'
      }
      return ''
    },
    //   获取下拉框
    async getSelecteds() {
      const { data: res } = await this.$http.post('mouldController/getSleeveDieInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.XBType = res.data.XBType
      this.tsuit.constituteNumber = res.data.mouldNumber
      if (this.id >= 0) {
        const { data: res } = await this.$http.post('mouldController/getTSuitById', {
          findById: this.id
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.tsuit=res.data.tsuit
        this.tsuitDetail = res.data.tsuitDetail
      }
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-table .hidden-row {
  display: none;
}
/deep/.el-table__header-wrapper  .el-checkbox{//找到表头那一行，然后把里面的复选框隐藏掉
	display:none
}
.footer{
  margin: 40px;
  text-align: center;
}
</style>
