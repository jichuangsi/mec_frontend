<template>
  <div>
    <el-page-header @back="goback" content="销售订单管理" style="margin-bottom:20px;"> </el-page-header>
    <!-- 申请销售单 -->
    <el-card style="margin-top:20px;">
      <div class="meta">申请销售单</div>
      <el-form ref="tsaleorder" :model="tsaleorder" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="客户名称">
              <el-select style="width:100%" v-model="tsaleorder.customerId" placeholder="请选择 ">
                <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in selecteds.kehuXiaLa" :key="item.mapKey"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="负责人">
              <el-select style="width:100%" v-model="tsaleorder.staffId" placeholder="请选择 ">
                <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in selecteds.userXiaLa" :key="item.mapKey"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="销售类型">
              <el-select style="width:100%" v-model="tsaleorder.saleTypeId" placeholder="请选择 ">
                <el-option :label="item.name" :value="item.id" v-for="item in selecteds.purchaseType" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="仓库">
              <el-select style="width:100%" v-model="tsaleorder.warehouseId" placeholder="请选择 ">
                <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in selecteds.warehouse" :key="item.mapKey"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="开单日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="tsaleorder.createTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="交货日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="tsaleorder.finishedTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="销售单号">
              <el-input v-model="tsaleorder.saleOrder" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="订单状态">
              <el-input v-model="orderState" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="审核状态">
              <el-input v-model="checkState" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="付款方式">
              <el-select style="width:100%" v-model="tsaleorder.payType" placeholder="请选择 ">
                <el-option :label="item.name" :value="item.id" v-for="item in selecteds.payType" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="运输方式">
              <el-input v-model="tsaleorder.transportType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="交货地点">
              <el-input v-model="tsaleorder.receiveAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 销售条目 -->
    <el-card style="margin-top:20px;">
      <el-row>
        <el-col :span="4"><div class="meta">销售条目</div></el-col>
        <el-col :span="8" :offset="12">
          <el-button type="primary" @click="add()" v-if="tsaleorder.orderStateId == 0">新增</el-button>
        </el-col>
      </el-row>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="saleOrderDetail" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="productName" label="产品名称"> </el-table-column>
        <el-table-column prop="productModel" label="产品型号"> </el-table-column>
        <el-table-column prop="productNumber" label="产品编号"> </el-table-column>
        <el-table-column prop="umStart" label="规格"> </el-table-column>
        <el-table-column prop="productNum" label="数额"> </el-table-column>
        <el-table-column prop="unitName" label="单位"> </el-table-column>
        <el-table-column prop="productPrice" label="单价(元)"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="productSum" label="合计(元)"> </el-table-column>
        <el-table-column label="操作" v-if="tsaleorder.orderStateId == 0">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="add(scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增出库 -->
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold">
        新增出库
        <el-button type="primary" style="margin-left:70%" @click="showDialog">新增</el-button>
        <el-button>清空</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }">
        <el-table-column prop="stockNumber" label="生产批号"> </el-table-column>
        <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
        <el-table-column prop="updateRemark" label="线轴"> </el-table-column>
        <el-table-column prop="standards" label="长度/m"> </el-table-column>
        <el-table-column prop="pageNum" label="已选定数量"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="delDialog1(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <span style="margin-right:10%;" v-if="this.id >= 0">
          此单 <span style="color:red">{{ detailSize }}</span> 个产品，共计：<span style="color:red">{{ sumMoney }}</span> 元</span
        >

        <span v-if="tsaleorder.orderStateId == 3">
          <el-button type="info">打印单据</el-button>
          <el-button type="primary" @click="showUpdateMaterialOuter">销售出库</el-button>
        </span>
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="dialogClose">
      <el-form ref="saleOrderDetailItem" :model="saleOrderDetailItem" label-width="120px">
        <el-form-item label="产品名称" prop="productId">
          <el-select v-model="saleOrderDetailItem.productId" placeholder="请选择" @change="selectedChange">
            <el-option :label="item.mapValue2 + '--' + item.mapValue" :value="item.mapKey" v-for="item in stockXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品规格" prop="productdetailId">
          <el-select v-model="saleOrderDetailItem.productdetailId" placeholder="请选择">
            <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in productDetailXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="productNum">
          <el-input v-model="saleOrderDetailItem.productNum" style="width:53%;"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="productPrice">
          <el-input v-model="saleOrderDetailItem.productPrice" style="width:53%;" @blur="productPriceBlur()"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="saleOrderDetailItem.remark" style="width:53%;"></el-input>
        </el-form-item>
        <el-form-item label="合计(元)">
          <el-input v-model="saleOrderDetailItem.productSum" style="width:53%;" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="updateMaterialOuterVisible" width="30%" @close="updateMaterialOuterClose">
      <el-form ref="updateMaterialOuterForm" :model="updateMaterialOuterForm" label-width="80px">
        <el-form-item label="备注">
          <el-input v-model="updateMaterialOuterForm.updateRemark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateMaterialOuterVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateMaterialOuterConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增出库的对话框 -->
    <el-dialog title="新增出库" :visible.sync="dialogVisible1" width="60%" @close="dialogClose1">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-table
            :data="OneList"
            style="width: 100%"
            height="300px"
            :cell-style="{ padding: '5px 0' }"
            highlight-current-row
            :header-cell-style="{ background: '#f0f5ff', padding: '0' }"
            @row-click="rowClick"
          >
            <el-table-column prop="stockNumber" label="生产批号"> </el-table-column>
            <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table :data="TwoList" style="width: 100%" height="300px" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }">
            <el-table-column prop="updateRemark" label="线轴"> </el-table-column>
            <el-table-column prop="standards" label="长度/m"> </el-table-column>
            <el-table-column prop="updateNum" label="数量"> </el-table-column>
            <el-table-column label="选定数量">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.pageNum" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin:20px 0">
        <el-col :span="3" style="font-weight:bold">待改绕产品</el-col>
        <el-col :span="3" :offset="18">
          <el-button size="mini" @click="addAllData()">添加</el-button>
        </el-col>
      </el-row>
      <el-table :data="listData" style="width: 100%" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }">
        <el-table-column prop="stockNumber" label="生产批号"> </el-table-column>
        <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
        <el-table-column prop="updateRemark" label="线轴"> </el-table-column>
        <el-table-column prop="standards" label="长度/m"> </el-table-column>
        <el-table-column prop="pageNum" label="已选定数量"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="delDialog(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      updateMaterialOuterForm: {
        updateRemark: ''
      },
      dialogVisible: false,
      checkState: '', //审核状态
      orderState: '', //订单状态
      selecteds: {}, //客户以及下拉数据
      tsaleorder: {
        id: '',
        orderStateId: '',
        customerId: '',
        staffId: '',
        saleTypeId: '',
        warehouseId: '',
        createTime: '',
        finishedTime: '',
        saleOrder: '', //销售单号
        orderStateId: '',
        payType: '',
        transportType: '',
        receiveAddress: ''
      }, //上面那部分的对象数据
      saleOrderDetail: [], //大类数组
      saleOrderDetailItem: {
        id: '', //明细id
        saleorderId: '', //销售订单id
        productId: '', //产品id
        productdetailId: '', //产品规格id
        productNumber: '', //产品编号
        productName: '', //产品名称
        productModel: '', //产品型号
        umStart: '', //规格
        unitId: '', //单位id
        unitName: '', //单位名称
        productNum: '', //数量
        productPrice: '', //单价
        productSum: '', //合计
        remark: '', //明细备注
        deleteNo: ''
      }, //下面部分的每个小类
      stockXiaLa: [], //产品名称的下拉框
      productDetailXiaLa: [], //产品规格的下拉框
      index: -1, //编辑的索引
      id: -1, //编辑操作的id
      sumMoney: '', //底部总计多少元
      detailSize: '', //底部共多少产品
      updateMaterialOuterVisible: false,
      dialogVisible1: false,
      OneList: [],
      TwoList: [],
      row: {},
      listData: [],
      tableData: []
    }
  },
  created() {
    this.getSelecteds()
  },
  methods: {
    // 删除单行数据
    async del(id) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('ProductionController/updatePPPByPPPId', {
        updateID: id,
        updateType: 'D'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },
    // 对话框删除
    async delDialog(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      this.listData.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 对话框删除
    async delDialog1(index) {
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
    // 对话框确认
    dialogConfirm1() {
      if (!this.listData.length) {
        return this.$message.error('请填写选定数量')
      }
      this.tableData.push(..._.cloneDeep(this.listData))
      this.dialogVisible1 = false
    },
    // 监听对话框关闭
    dialogClose1() {
      this.listData = []
    },
    // 添加数据合并
    addAllData() {
      this.listData.push(..._.cloneDeep(this.TwoList.filter(item => item.pageNum > 0 && item.updateNum >= item.pageNum)))
      this.TwoList.forEach(item => {
        item.pageNum = ''
      })
      this.listData.forEach(item => {
        item.leftId = item.leftId?item.leftId:this.row.id
        item.stockModel = item.stockModel?item.stockModel:this.row.stockModel
        item.stockNumber =item.stockModel?item.stockModel: this.row.stockNumber
      })
    },
    // 点击新增
    async showDialog() {
      this.dialogVisible1 = true
      const { data: res } = await this.$http.post('warehouseController/getAllWarehousingChuKu', {
        findName: '',
        findModelName: 'product',
        findIdOne: ''
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.OneList = res.data.LData
      this.TwoList = res.data.RData
      this.rowClick(this.OneList[0])
    },
    // 监听行点击
    async rowClick(row) {
      this.row = row
      const { data: res } = await this.$http.post('warehouseController/getAllWarehousingChuKuById', {
        findById:row.id,
        findModelName:'product',
        findIdOne:''
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.TwoList = res.data.RData
    },
    //监听销售出库对话框关闭
    updateMaterialOuterClose() {
      this.updateMaterialOuterForm.updateRemark = ''
    },
    //确认销售出库
    async updateMaterialOuterConfirm() {
      this.updateMaterialOuterForm.updateID = this.id
      let arr = []
      this.tableData.forEach(item => {
        let obj = {
          findModelName: 'product',
          updateID: item.id,
          updateNum: item.pageNum,
          updateRemark: '销售成品出库'
        }
        arr.push(obj)
      })
      this.updateMaterialOuterForm.list = arr
      const { data: res } = await this.$http.post('saleController/updateMaterialOuter', this.updateMaterialOuterForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('编辑成功')
      this.$router.go(-1)
    },
    // 点击销售出库
    showUpdateMaterialOuter() {
      this.updateMaterialOuterVisible = true
    },
    // 计算总价
    productPriceBlur() {
      this.saleOrderDetailItem.productSum = this.saleOrderDetailItem.productNum * this.saleOrderDetailItem.productPrice
    },
    // 根据id获取页面的初始数据
    async getInitData() {
      const { data: res } = await this.$http.post('saleController/getSaleById', {
        findById: this.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.tsaleorder = res.data.saleorder
      this.saleOrderDetail = res.data.saleOrderDetail
      this.orderState = res.data.orderState
      this.checkState = res.data.checkState
      this.sumMoney = res.data.sumMoney
      this.detailSize = res.data.detailSize
    },
    // 添加全部
    async saveAll(id) {
      if (this.id >= 0) {
        this.tsaleorder.id = this.id
      }
      this.tsaleorder.orderStateId = id

      const { data: res } = await this.$http.post('saleController/saveSale', {
        tsaleorder: this.tsaleorder,
        tsaleorderdetail: this.saleOrderDetail
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success(this.id >= 0 ? '编辑成功' : '新增成功')
      this.$router.go(-1)
    },
    // 监听对话框关闭
    dialogClose() {
      this.saleOrderDetailItem = {
        id: '', //明细id
        saleorderId: '', //销售订单id
        productId: '', //产品id
        productdetailId: '', //产品规格id
        productNumber: '', //产品编号
        productName: '', //产品名称
        productModel: '', //产品型号
        umStart: '', //规格
        unitId: '', //单位id
        unitName: '', //单位名称
        productNum: '', //数量
        productPrice: '', //单价
        productSum: '', //合计
        remark: ' ', //明细备注
        deleteNo: 0
      }
    },
    // 点击删除按钮
    async del(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return
      }
      this.saleOrderDetail.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 确认添加对话框
    dialogConfirm() {
      this.stockXiaLa.forEach(item => {
        if (this.saleOrderDetailItem.productId == item.mapKey) {
          this.saleOrderDetailItem.productName = item.mapValue2
          this.saleOrderDetailItem.productModel = item.mapliandong
          this.saleOrderDetailItem.productNumber = item.mapValue
          this.saleOrderDetailItem.unitName = item.mapliandong2
        }
      })
      this.productDetailXiaLa.forEach(item => {
        if (this.saleOrderDetailItem.productdetailId == item.mapKey) {
          this.saleOrderDetailItem.umStart = item.mapValue
        }
      })
      if (this.index >= 0) {
        this.saleOrderDetail.splice(this.index, 1, _.cloneDeep(this.saleOrderDetailItem))
      } else {
        this.saleOrderDetail.push(_.cloneDeep(this.saleOrderDetailItem))
      }
      this.dialogVisible = false
    },
    // 产品名称下拉框发生变化
    async selectedChange(e) {
      const { data: res } = await this.$http.post('saleController/getSaleDetailById', { findById: e })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.productDetailXiaLa = res.data.productDetailXiaLa
    },
    // 点击新增或编辑
    async add(index = -1) {
      const { data: res } = await this.$http.post('saleController/getSaleDetailBasicInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.stockXiaLa = res.data.stockXiaLa
      if (index >= 0) {
        this.index = index
        this.saleOrderDetailItem = _.cloneDeep(this.saleOrderDetail[index])
        if (this.id >= 0) {
          this.selectedChange(this.saleOrderDetailItem.productId)
        }
      }
      this.dialogVisible = true
    },
    // 获取下拉框数据
    async getSelecteds() {
      const { data: res } = await this.$http.post('saleController/getSaleBasicInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.selecteds = res.data
      this.tsaleorder.saleOrder = res.data.pruchaseNum
      this.orderState = res.data.orderState
      this.checkState = res.data.checkState
      if (this.$route.query.id >= 0) {
        this.id = this.$route.query.id
        this.getInitData()
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
