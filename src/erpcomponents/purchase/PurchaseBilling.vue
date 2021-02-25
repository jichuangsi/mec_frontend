<template>
  <div>
    <el-page-header @back="goback" content="采购开单" style="margin-bottom:20px;"> </el-page-header>

    <!-- 申请采购单 -->
    <el-card style="margin-top:20px;">
      <div class="meta">申请采购单</div>
      <el-form ref="form" :model="form" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="供应商名称">
              <el-select v-model="tPurchase.customerId" placeholder="请选择">
                <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in selecteds.customerXiaLa" :key="item.mapKey"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="负责人">
              <el-select v-model="tPurchase.staffId" placeholder="请选择">
                <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in selecteds.userXiaLa" :key="item.mapKey"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="采购类型">
              <el-select v-model="tPurchase.purchasetypeId" placeholder="请选择 ">
                <el-option :label="item.name" :value="item.id" v-for="item in selecteds.purchaseType" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="仓库">
              <el-select v-model="tPurchase.warehouseiId" placeholder="请选择 ">
                <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in selecteds.warehouse" :key="item.mapKey"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="开单日期">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="tPurchase.createTime" style="width:85%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="交货日期">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="tPurchase.finishedTime" style="width:85%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="采购单号">
              <el-input disabled v-model="tPurchase.purchaseOrder" style="width:85%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="订单状态">
              <el-input disabled v-model="purchase_orderstate" style="width:85%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="检验状态">
              <el-input disabled v-model="purchase_checkState" style="width:85%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="付款方式">
              <el-select v-model="tPurchase.paytypeId" placeholder="请选择 ">
                <el-option :label="item.name" :value="item.id" v-for="item in selecteds.payType" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="备注">
              <el-input v-model="tPurchase.remark" style="width:85%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 采购条目 -->
    <el-card style="margin-top:20px;">
      <el-row>
        <el-col :span="4"><div class="meta">采购条目</div></el-col>
        <el-col :span="8" :offset="12" v-if="tPurchase.orderState == 0">
          <el-button type="primary" @click="addDialog">新增</el-button>
          <el-button type="primary" plain @click="clearTableData">清空</el-button>
        </el-col>
      </el-row>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="stockName" label="原材料名称"> </el-table-column>
        <el-table-column prop="stockModel" label="原材料型号"> </el-table-column>
        <el-table-column prop="stockNumber" label="原材料编号"> </el-table-column>
        <el-table-column prop="standards" label="规格"> </el-table-column>
        <el-table-column prop="stockAmount" label="数量"> </el-table-column>
        <el-table-column prop="unitName" label="单位"> </el-table-column>
        <el-table-column prop="stockUnitPrice" label="单价(元)"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="stockSum" label="合计(元)"> </el-table-column>
        <el-table-column label="操作" v-if="tPurchase.orderState == 0">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delRow(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer" v-if="tPurchase.orderState == 0">
        <el-button type="primary" @click="submit(0)">保存草稿</el-button>
        <el-button type="warning" @click="submit(1)">提交</el-button>
        <el-button type="danger" @click="del()">删除</el-button>
      </div>
      <div class="footer" v-if="tPurchase.orderState == 1 || tPurchase.orderState == 2">
        <!-- <el-button type="primary">打印单据</el-button> -->
        <el-button disabled>订单审核中</el-button>
        <el-button type="danger" @click="withdraw('CH')">撤回</el-button>
      </div>
      <div class="footer" v-if="tPurchase.orderState == 3 || tPurchase.orderState == 4">
        <!-- <el-button type="primary">打印单据</el-button> -->
        <el-button disabled>来料检验中</el-button>
      </div>
      <div class="footer" v-if="tPurchase.orderState == 5">
        <!-- <el-button type="primary">打印单据</el-button> -->
        <el-button type="info" @click="withdraw('JSCG')">结束采购</el-button>
        <el-button type="info" @click="withdraw('TH')">采购退回</el-button>
      </div>
      <div class="footer" v-if="tPurchase.orderState == 6">
        <!-- <el-button type="primary">打印单据</el-button> -->
        <el-button type="info" @click="withdraw('TH')">采购退回</el-button>
        <el-button type="danger">删除</el-button>
      </div>
      <div class="footer" v-if="tPurchase.orderState == 7">
        <!-- <el-button type="primary">打印单据</el-button> -->
        <el-button type="info" @click="withdraw('JS')">结束退回</el-button>
        <el-button type="danger">删除</el-button>
      </div>
      <div class="footer" v-if="tPurchase.orderState == 8">
        <!-- <el-button type="primary">打印单据</el-button> -->
        <el-button type="danger">删除</el-button>
      </div>
    </el-card>
    <!-- 这是添加的对话框 -->
    <el-dialog title="添加" :visible.sync="addDialogVisible" width="30%" @close="handleClose">
      <el-form ref="tPurchaseDetailsItemRef" :model="tPurchaseDetailsItem" label-width="150px">
        <el-form-item label="原材料名称">
          <el-select v-model="findById" placeholder="请选择 " @change="getSpecsSelecteds()">
            <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in dialogSelecteds.stockXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原材料规格" prop="stockId">
          <el-select v-model="tPurchaseDetailsItem.stockId" placeholder="请选择 ">
            <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in stockDetailXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量(g)" prop="stockAmount">
          <el-input type="number" v-model="tPurchaseDetailsItem.stockAmount" style="width:57%;"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unitId">
          <el-select disabled v-model="tPurchaseDetailsItem.unitId" placeholder="请选择 ">
            <el-option :label="item.name" :value="item.id" v-for="item in dialogSelecteds.DW" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价(元)" prop="stockUnitPrice">
          <el-input type="number" v-model="tPurchaseDetailsItem.stockUnitPrice" style="width:57%;"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="tPurchaseDetailsItem.remark" style="width:57%;"></el-input>
        </el-form-item>
        <el-form-item label="合计(元)">
          {{ totalMoney }}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="withdrawVisible" width="30%" @close="withdrawClose">
      <el-form ref="withdrawForm" :model="withdrawForm" label-width="80px">
        <el-form-item label="评论">
          <el-input v-model="withdrawForm.updateRemark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="withdrawVisible = false">取 消</el-button>
        <el-button type="primary" @click="withdrawConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      withdrawForm: {
        updateRemark: ''
      },
      withdrawVisible: false,
      type: '',
      stockDetailXiaLa: [], //原材料规格的下拉框
      findById: '', //保存的原材料名称下拉框id
      tPurchaseDetailsItem: {
        stockId: '',
        unitId: '',
        stockUnitPrice: '',
        stockAmount: '',
        remark: ''
      },
      addDialogVisible: false,
      selecteds: {},
      form: {
        name: ''
      },
      dialogSelecteds: {}, //这个是对话框中原材料名称和单位的下拉框数据
      tableData: [],
      tPurchase: {
        customerId: '',
        staffId: '',
        purchasetypeId: '',
        warehouseiId: '',
        createTime: new Date(),
        finishedTime: '',
        purchaseOrder: '',
        orderState: '',
        checkState: '',
        paytypeId: '',
        remark: ''
      },
      tPurchaseDetails: [],
      purchase_checkState: '',
      purchase_orderstate: '',
      tableFormItem: {
        stockAmount: '',
        stockUnitPrice: '',
        remark: '',
        stockSum: '',
        stockName: '',
        stockModel: '',
        stockNumber: '',
        unitName: '', //需要转化成id
        standards: '' //需要转换成id
      },
      id: ''
    }
  },
  created() {
    this.getData()
  },
  computed: {
    totalMoney() {
      return this.tPurchaseDetailsItem.stockAmount * this.tPurchaseDetailsItem.stockUnitPrice
    }
  },
  methods: {
    edit(index){
      this.tPurchaseDetailsItem=_.cloneDeep(this.tableData[index])
      this.addDialog()
      this.addDialogVisible = true
    },
    async delRow(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      this.tableData.splice(index, 1)
      this.$message.success('删除成功')
    },
    withdrawClose() {
      this.withdrawForm.updateRemark = ''
    },
    // 确认撤回
    async withdrawConfirm() {
      this.withdrawForm.updateID = +this.id
      this.withdrawForm.updateType = this.type
      const { data: res } = await this.$http.post('PurchaseController/updateOrderStateByid', this.withdrawForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('编辑成功')
      this.$router.go(-1)
    },
    //点击撤回
    withdraw(type) {
      this.type = type
      this.withdrawVisible = true
    },

    // 点击删除
    async del() {
      const { data: res } = await this.$http.post('PurchaseController/updatePurchaseByid', {
        updateID: this.id,
        updateType: 'D'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('删除成功！')
      this.$router.go(-1)
    },
    // 编辑页面获取初始数据
    async getAllData(id) {
      const { data: res } = await this.$http.post('PurchaseController/getPurchaseById', {
        findById: id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.purchase_checkState = res.data.purchase_checkState
      this.purchase_orderstate = res.data.purchase_orderstate
      this.tPurchase = res.data.purchase
      this.tableData = res.data.purchaseDetail
      this.tPurchaseDetails=res.data.purchaseDetail
    },
    // 点击提交
    async submit(status) {
      this.tPurchase.orderState = status
      this.tPurchase.id = 0
      this.tPurchase.deleteNo = 0
      if (this.id >= 0) {
        this.tPurchase.id = this.id
      }
      const { data: res } = await this.$http.post('PurchaseController/savePurchase', {
        tPurchase: this.tPurchase,
        tPurchaseDetails: this.tPurchaseDetails
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('保存成功')
      this.$router.go(-1)
    },
    // 清空采购条目
    clearTableData() {
      this.tableData = []
      this.tPurchaseDetails = []
    },
    // 点击确认添加
    addDialogConfirm() {
      // 添加到提交后台数据

      this.tPurchaseDetails.push(_.cloneDeep(this.tPurchaseDetailsItem))
      // 添加到表格中
      ;(this.tableFormItem.stockAmount = this.tPurchaseDetailsItem.stockAmount),
        (this.tableFormItem.stockUnitPrice = this.tPurchaseDetailsItem.stockUnitPrice),
        (this.tableFormItem.remark = this.tPurchaseDetailsItem.remark),
        (this.tableFormItem.stockSum = this.totalMoney)

      this.dialogSelecteds.stockXiaLa.forEach(item => {
        if (item.mapKey == this.findById) {
          this.tableFormItem.stockName = item.mapliandong
          this.tableFormItem.stockModel = item.mapValue
          this.tableFormItem.stockNumber = item.mapValue2
        }
      })
      this.dialogSelecteds.DW.forEach(item => {
        if (this.tPurchaseDetailsItem.unitId == item.id) {
          this.tableFormItem.unitName = item.name
        }
      })
      this.stockDetailXiaLa.forEach(item => {
        if (this.tPurchaseDetailsItem.stockId == item.mapKey) {
          this.tableFormItem.standards = item.mapValue
        }
      })
      this.tableData.push(_.cloneDeep(this.tableFormItem))
      this.addDialogVisible = false
    },
    // 获取规格的下拉框
    async getSpecsSelecteds() {
      this.dialogSelecteds.stockXiaLa.forEach(item=>{
        if(item.mapKey==this.findById){
          this.tPurchaseDetailsItem.unitId=+item.mapliandong2
        }
      })
      const { data: res } = await this.$http.post('PurchaseController/getPurchaseDetailById', { findById: this.findById })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.stockDetailXiaLa = res.data.stockDetailXiaLa
    },
    // 打开添加的对话框并加载初始数据
    async addDialog() {
      this.addDialogVisible = true
      const { data: res } = await this.$http.post('PurchaseController/getPurchaseDetailBasicInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.dialogSelecteds = res.data
    },
    // 监听添加的对话框关闭
    handleClose() {
      this.findById = ''
      this.$refs.tPurchaseDetailsItemRef.resetFields()
    },
    // 获取页面初始数据
    async getData() {
      this.tPurchase.staffId=JSON.parse(sessionStorage.getItem("user")).userId
      const { data: res } = await this.$http.post('PurchaseController/getPurchaseBasicInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.selecteds = res.data
      this.selecteds.purchaseType.forEach(item=>{
        if(item.name=='原材料'){
          this.tPurchase.purchasetypeId=item.id
        }
      })
      
      this.tPurchase.purchaseOrder = res.data.pruchaseNum
      this.purchase_checkState = res.data.checkState
      this.purchase_orderstate = res.data.orderState
      if (this.$route.query.id) {
        this.id = this.$route.query.id
        this.getAllData(this.id)
      }
    },
    // 返回上一步
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  cursor: pointer;
}
.meta {
  font-weight: bold;
  margin-bottom: 20px;
}
.footer {
  text-align: right;
  margin-top: 40px;
}
</style>
