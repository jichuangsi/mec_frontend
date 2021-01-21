<template>
  <div>
    <el-page-header @back="goback" content="销售开单" style="margin-bottom:20px;"> </el-page-header>
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
                <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in selecteds.warehouse" :key="item.mapKey"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="开单日期">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="tsaleorder.createTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="交货日期">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="tsaleorder.finishedTime" style="width: 100%;"></el-date-picker>
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
        <el-table-column prop="lengthM" label="长度"> </el-table-column>
        <el-table-column prop="productNum" label="数额"> </el-table-column>
        <el-table-column prop="unitName" label="单位"> </el-table-column>
        <el-table-column prop="productPrice" label="单价(元)"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="productSum" label="合计(元)"> </el-table-column>
        <el-table-column prop="productLengthSum" label="合计(数量)"> </el-table-column>
        <el-table-column label="操作" v-if="tsaleorder.orderStateId == 0">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="add(scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <span style="margin-right:10%;" v-if="this.id >= 0">
          此单 <span style="color:red">{{ detailSize }}</span> 个产品，共计：<span style="color:red">{{ sumMoney }}</span> 元</span
        >
        <span v-if="tsaleorder.orderStateId == 0">
          <el-button type="info" @click="saveAll(0)">保存草稿</el-button>
          <el-button type="primary" @click="saveAll(1)">提交</el-button>
        </span>
        <span v-else-if="tsaleorder.orderStateId == 1 || tsaleorder.orderStateId == 2">
          <el-button type="info">打印单据</el-button>
          <el-button type="default" disabled>订单审核中</el-button>
          <el-button type="danger" @click="withdraw('CH')">撤回</el-button>
        </span>
        <span v-else-if="tsaleorder.orderStateId == 3">
          <el-button type="info">打印单据</el-button>
          <el-button type="default" disabled>销售出库</el-button>
        </span>
        <span v-else-if="tsaleorder.orderStateId == 4">
          <el-button type="info">打印单据</el-button>
          <el-button type="primary" @click="withdraw('JS')">结束销售</el-button>
        </span>
        <span v-else-if="tsaleorder.orderStateId == 5">
          <el-button type="info">打印单据</el-button>
          <el-button type="primary" @click="withdraw('TH')">销售退回</el-button>
          <el-button type="danger">删除</el-button>
        </span>
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="dialogClose">
      <el-form ref="saleOrderDetailItem" :model="saleOrderDetailItem" label-width="120px">
        <el-form-item label="产品名称" prop="productId">
          <el-select v-model="saleOrderDetailItem.productId" placeholder="请选择" @change="selectedChange">
            <el-option :label="item.mapValue2 + '--' + item.mapliandong" :value="item.mapKey" v-for="item in stockXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品规格" prop="productdetailId">
          <el-select v-model="saleOrderDetailItem.productdetailId" placeholder="请选择">
            <el-option :label="Number(item.mapValue).toFixed(2)" :value="item.mapKey" v-for="item in productDetailXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="长度(m/轴)" prop="lengthM">
          <el-input oninput = "value=value.replace(/[^\d.]/g,'')" v-model="saleOrderDetailItem.lengthM" style="width:53%;"></el-input>
        </el-form-item>
        <el-form-item label="数量(轴)" prop="productNum">
          <el-input oninput = "value=value.replace(/[^\d.]/g,'')" v-model="saleOrderDetailItem.productNum" style="width:53%;"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="productPrice">
          <el-input oninput = "value=value.replace(/[^\d.]/g,'')" v-model="saleOrderDetailItem.productPrice" style="width:53%;" @blur="productPriceBlur()"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="saleOrderDetailItem.remark" style="width:53%;"></el-input>
        </el-form-item>
        <el-form-item label="合计(数量)">
          {{saleOrderDetailItem.productLengthSum}}
        </el-form-item>
        <el-form-item label="合计(元)">
          {{saleOrderDetailItem.productSum}}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="withdrawVisible" width="30%" @close="withdrawClose">
      <el-form ref="withdrawForm" :model="withdrawForm" label-width="80px">
        <el-form-item label="备注">
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
        createTime: new Date(),
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
        lengthM:'',
        productLengthSum:'',
        remark: '', //明细备注
        deleteNo: ''
      }, //下面部分的每个小类
      stockXiaLa: [], //产品名称的下拉框
      productDetailXiaLa: [], //产品规格的下拉框
      index: -1, //编辑的索引
      id: -1, //编辑操作的id
      sumMoney: '', //底部总计多少元
      detailSize: '', //底部共多少产品，
      withdrawVisible: false,
      type: ''
    }
  },
  created() {
    
    this.getSelecteds()
  },
  methods: {
    withdrawClose() {
      this.withdrawForm.updateRemark = ''
    },
    // 确认撤回
    async withdrawConfirm() {
      this.withdrawForm.updateID = +this.id
      this.withdrawForm.updateType = this.type
      const { data: res } = await this.$http.post('saleController/updateSaleOrderStateByid', this.withdrawForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('编辑成功')
      this.$router.go(-1)
    },
    //点击撤回
    withdraw(type) {
      this.type = type
      this.withdrawVisible = true
    },
    // 计算总价
    productPriceBlur() {
      this.saleOrderDetailItem.productSum = this.saleOrderDetailItem.productNum * this.saleOrderDetailItem.productPrice * this.saleOrderDetailItem.lengthM
      this.saleOrderDetailItem.productLengthSum = this.saleOrderDetailItem.productNum * this.saleOrderDetailItem.lengthM
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
        lengthM:'',
        productLengthSum:'',
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
      if(!this.saleOrderDetailItem.productNum||!this.saleOrderDetailItem.remark||!this.saleOrderDetailItem.productPrice){
        return this.$message.error("请填写必要项")
      }
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
      this.tsaleorder.staffId=JSON.parse(sessionStorage.getItem('user')).userId
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
