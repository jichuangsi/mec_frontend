<template>
  <div>
    <el-page-header @back="goback" content="生产计划" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div class="meta">基本信息</div>
      <el-form label-width="200px">
        <el-form-item label="生产计划单号">
          <el-input v-model="pp.ppNumber" style="width:30%;" disabled></el-input>
        </el-form-item>
        <el-form-item label="生产计划单名称">
          <el-input v-model="pp.ppName" style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label="计划下达日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="pp.createTime" style="width:30%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="计划完工日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="pp.finishedTime" style="width:30%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="设置套模方案">
          <el-select v-model="pp.suitId" placeholder="请选择" style="width:30%;">
            <el-option :value="item.mapKey" :label="item.mapValue + '--' + item.mapValue2" v-for="item in SuitXiaLa" :key="item.mapKey"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="16">
        <el-card>
          <div style="font-weight:bold;">关联销售订单消息</div>
          <el-row style="margin:20px 0">
            <el-col :span="6">销售单号</el-col>
            <el-col :span="6" style="color:#8494a9;">{{ saleorder.saleOrder }}</el-col>
            <el-col :span="6">客户编号</el-col>
            <el-col :span="6" style="color:#8494a9;">{{ saleorder.customerNumber }}</el-col>
          </el-row>
          <el-row style="margin:20px 0">
            <el-col :span="6">订单状态</el-col>
            <el-col :span="6" style="color:#8494a9;">待出库</el-col>
            <el-col :span="6">客户名称</el-col>
            <el-col :span="6" style="color:#8494a9;">{{ saleorder.customer }}</el-col>
          </el-row>
          <el-row style="margin:20px 0">
            <el-col :span="6">开单日期</el-col>
            <el-col :span="6" style="color:#8494a9;">{{ saleorder.createTime }}</el-col>
            <el-col :span="6">联系电话</el-col>
            <el-col :span="6" style="color:#8494a9;">{{ saleorder.contactsPhone }}</el-col>
          </el-row>
          <el-row style="margin:20px 0">
            <el-col :span="6">交货日期</el-col>
            <el-col :span="6" style="color:#8494a9;">{{ saleorder.finishedTime }}</el-col>
            <el-col :span="6">联系人</el-col>
            <el-col :span="6" style="color:#8494a9;">{{ saleorder.contactsMan }}</el-col>
          </el-row>
          <el-row style="margin:20px 0">
            <el-col :span="6">付款方式</el-col>
            <el-col :span="6" style="color:#8494a9;">{{ saleorder.payType }}</el-col>
            <el-col :span="6">联系人职称</el-col>
            <el-col :span="6" style="color:#8494a9;">{{ saleorder.contactsPost }}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-table :data="customerDetail" style="width: 100%" height="230" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }">
            <el-table-column prop="customerDetailName" label="条目名称"> </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:20px;">
      <div class="meta">设置班组和班次</div>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="pp_scheduling" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="gxName" label="工序"> </el-table-column>
        <el-table-column prop="tteamName" label="班组"> </el-table-column>
        <el-table-column prop="frequencystr" label="班次"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showClassDialog(scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top:20px;">
      <div class="meta">设置计划产物<el-button type="primary" plain style="margin-left:60%;" @click="showLinkDialog">关联</el-button></div>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="ppproduct" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="productName" label="产品名称"> </el-table-column>
        <el-table-column prop="productModel" label="产品型号"> </el-table-column>
        <el-table-column prop="productNumber" label="产品编号"> </el-table-column>
        <el-table-column prop="standards" label="规格">
          <template slot-scope="scope">
            {{Number(scope.row.standards).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="length" label="长度(m/轴)"> </el-table-column>
        <el-table-column prop="quantum" label="数量(轴)"> </el-table-column>
        <el-table-column prop="sumMI" label="合计(米)"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showDialogEdit(scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer" v-if="pp.ppPlanState == 0">
        <el-button @click="goback">取消</el-button>
        <el-button type="primary" @click="saveAll(0)">保存草稿</el-button>
        <el-button type="primary" @click="saveAll(1)">提交审核</el-button>
      </div>
    </el-card>
    <el-dialog title="设置班组和班次" :visible.sync="dialogClassVisible" width="40%">
      <el-form label-width="140px">
        <el-form-item label="工序">
          <el-input v-model="pp_schedulingItem.gxName" style="width:37%;" disabled></el-input>
        </el-form-item>
        <el-form-item label="班组">
          <el-select v-model="pp_schedulingItem.tteamId" placeholder="请选择 ">
            <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in TeamXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班次">
          <el-select v-model="pp_schedulingItem.frequency" placeholder="请选择 ">
            <el-option label="白班" :value="1"></el-option>
            <el-option label="夜班" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClassVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogClassConfirm()">保存</el-button>
      </span>
    </el-dialog>
    <!-- 关联销售订单对话框 -->
    <el-dialog title="请关联销售订单" :visible.sync="linkDialogVisible" width="50%">
      <span style="color:#db001b;font-size:12px;">注：1、在左边框选择要关联的销售订单；2、在右边框选择该销售单下选择本次准备生产的产品。</span>
      <el-form label-width="80px" style="margin-top:10px;">
        <el-form-item label="销售单号" style="width:350px">
          <el-input v-model="findName"><i slot="suffix" class="el-input__icon el-icon-search" @click="getDialogData"></i></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-table :data="LData" highlight-current-row style="width: 100%" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" @row-click="rowClick">
              <el-table-column prop="mapValue" label="销售单号"> </el-table-column>
              <el-table-column prop="mapValue2" label="客户名称"> </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <el-table :data="RData" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }">
              <el-table-column prop="productModel" label="产品型号"> </el-table-column>
              <el-table-column prop="umStart" label="规格">
                <template slot-scope="scope">
                  {{Number(scope.row.umStart).toFixed(2)}}
                </template>
              </el-table-column>
              <el-table-column type="selection" width="55"> </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="linkDialogConfirm">确认</el-button>
        <el-button @click="linkDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 编辑长度数量合计的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogEditVisible" width="40%" @close="dialogClose">
      <el-row>
        <el-col :span="4" :offset="4">产品名称</el-col>
        <el-col :span="4" style="color:#8f9eb1;">{{ row.productName }}</el-col>
        <el-col :span="4">产品规格</el-col>
        <el-col :span="4" style="color:#8f9eb1;">{{ row.standards }}</el-col>
      </el-row>
      <el-row style="margin:30px 0">
        <el-col :span="4" :offset="4">产品编号</el-col>
        <el-col :span="4" style="color:#8f9eb1;">{{ row.productNumber }}</el-col>
        <el-col :span="4">产品型号</el-col>
        <el-col :span="4" style="color:#8f9eb1;">{{ row.productModel }}</el-col>
      </el-row>
      <el-form label-width="120px">
        <el-form-item label="长度(m/轴)">
          <el-input v-model="row.length" style="width:80%;" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="数量(轴)">
          <el-input v-model="row.quantum" style="width:80%;" oninput="value=value.replace(/[^\d.]/g,'')" @blur="inputBlur"></el-input>
        </el-form-item>
        <el-form-item label="合计(米)">
          <el-input v-model="row.sumMI" style="width:80%;" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditConfirm">确 定</el-button>
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
        name: '',
        data: ''
      },

      id: -1,
      GX: [],
      TeamXiaLa: [],
      SuitXiaLa: [],
      pp: {
        ppNumber: '',
        finishedTime: '',
        ppName: '',
        createTime: '',
        finishedTime: '',
        suitId: '',
        saleId: '',
        ppPlanState: 0 //0 草稿 1提交审核
      },
      pp_scheduling: [],
      pp_schedulingItem: {
        frequency: '', //班次（1白班 2夜班）
        frequencystr: '',
        gxId: '', //工序ID
        gxName: '',
        ppId: '',
        tteamId: '', //班组ID
        tteamName: ''
      },
      ppproduct: [],
      dialogClassVisible: false,
      classIndex: -1,
      linkDialogVisible: false,
      multipleSelection: [],
      findName: '',
      LData: [],
      RData: [],
      dialogEditVisible: false,
      row: {
        productName: '',
        productModel: '',
        productNumber: '',
        standards: '',
        length: '',
        quantum: '',
        sumMI: '',
        ppId: ''
      },
      editIndex: -1,
      saleId: '',
      saleorder: {},
      customerDetail: [],
      classAll: 0
    }
  },
  created() {
    if (sessionStorage.getItem('ppproduct')) {
      this.ppproduct = JSON.parse(sessionStorage.getItem('ppproduct'))
    }
    if (sessionStorage.getItem('saleId')) {
      this.saleId = sessionStorage.getItem('saleId')
    }
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    //   保存全部
    async saveAll(ppPlanState) {
      this.pp.ppPlanState = ppPlanState
      if (this.id >= 0) {
        this.pp.id = this.id
      }
      this.pp.saleId = this.saleId
      this.pp.relationNo = 1
      const { data: res } = await this.$http.post('ProductionPlanController/saveProductPlan', {
        ppProductList: this.ppproduct,
        ppSchedulingList: this.pp_scheduling,
        productPlan: this.pp
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success(this.id >= 0 ? '编辑成功' : '新增成功')
      this.$router.go(-1)
    },
    async del(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      this.ppproduct.splice(index, 1)
      this.$message.success('删除成功')
    },
    dialogClose() {
      this.row = {
        productName: '',
        productModel: '',
        productNumber: '',
        standards: '',
        length: '',
        quantum: '',
        sumMI: ''
      }
      this.editIndex = -1
    },
    //   编辑对话框确认
    dialogEditConfirm() {
      this.ppproduct.splice(this.editIndex, 1, this.row)
      this.dialogEditVisible = false
    },
    //   计算合计
    inputBlur() {
      this.row.sumMI = this.row.length * this.row.quantum
    },
    //   展示编辑的对话框
    showDialogEdit(index) {
      this.editIndex = index
      this.dialogEditVisible = true
      this.row = _.cloneDeep(this.ppproduct[index])
    },
    async rowClick(row) {
      this.row.productName = row.mapValue2
      this.row.productModel = row.mapliandong
      this.row.productNumber = row.mapValue
      const { data: res } = await this.$http.post('ProductionPlanController/getPPProductInfoById', {
        iswhether: 1,
        findById: row.mapKey
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.RData = res.data.RData
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    linkDialogConfirm() {
      if (!this.row.productName) {
        this.row.productName = this.LData[0].mapValue2
        this.row.productModel = this.LData[0].mapliandong
        this.row.productNumber = this.LData[0].mapValue
      }
      this.multipleSelection.forEach((item, index) => {
        this.row.productDetailId = item.id
        this.row.productModel = item.productModel
        this.row.standards = item.umStart
        this.ppproduct.push(_.cloneDeep(this.row))
      })
      this.linkDialogVisible = false
    },
    //   获取对话框初始数据
    async getDialogData() {
      const { data: res } = await this.$http.post('ProductionPlanController/getPPProductInfo', {
        iswhether: 1,
        findName: this.findName
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.LData = res.data.LData
      this.RData = res.data.RData
    },
    //   展示关联订单对话框
    async showLinkDialog() {
      this.dialogVisible = false
      this.linkDialogVisible = true
      this.getDialogData()
    },
    //   设置班组和班次确认
    dialogClassConfirm() {
      this.TeamXiaLa.forEach(item => {
        if (item.mapKey == this.pp_schedulingItem.tteamId) {
          this.pp_schedulingItem.tteamName = item.mapValue
        }
      })
      if (this.pp_schedulingItem.frequency == 1) {
        this.pp_schedulingItem.frequencystr = '白班'
      } else {
        this.pp_schedulingItem.frequencystr = '夜班'
      }
      if (this.classAll == 0) {
        this.pp_scheduling.forEach(item => {
          item.tteamId = this.pp_schedulingItem.tteamId
          item.tteamName = this.pp_schedulingItem.tteamName
          item.frequency = this.pp_schedulingItem.frequency
          item.frequencystr = this.pp_schedulingItem.frequencystr
          this.classAll++
        })
      } else {
        this.pp_scheduling.splice(this.classIndex, 1, { ...this.pp_schedulingItem })
      }

      this.dialogClassVisible = false
    },
    showClassDialog(index) {
      this.classIndex = index
      this.pp_schedulingItem = _.cloneDeep(this.pp_scheduling[index])
      this.dialogClassVisible = true
    },
    async getData() {
      const { data: res } = await this.$http.post('ProductionPlanController/getPPBasicInfo', { findById: this.saleId })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.GX = res.data.GX
      if (res.data.saleorder) {
        this.saleorder = res.data.saleorder
      }
      if (res.data.customerDetail) {
        this.customerDetail = res.data.customerDetail
      }
      this.GX.forEach(item => {
        this.pp_schedulingItem.gxId = item.id
        this.pp_schedulingItem.gxName = item.name
        this.pp_scheduling.push({ ...this.pp_schedulingItem })
      })
      this.TeamXiaLa = res.data.TeamXiaLa
      this.SuitXiaLa = res.data.SuitXiaLa
      this.pp.ppNumber = res.data.productPlanNum
      if (this.id >= 0) {
        const { data: res } = await this.$http.post('ProductionPlanController/getProductPlanById', {
          findById: this.id,
          findModelName: 'U'
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.pp = res.data.pp
        this.pp_scheduling = res.data.pp_scheduling
        this.ppproduct = res.data.ppproduct
      }
    },
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.meta {
  font-weight: bold;
  margin-bottom: 20px;
}
.footer {
  text-align: right;
  padding-right: 180px;
  margin-top: 20px;
}
</style>
