<template>
  <el-card>
    <el-form ref="form" label-width="80px">
      <el-row :gutter="40">
        <el-col :span="6">
          <el-form-item label="生产单号">
            <el-input style="width:80%;" v-model="submitForm.findName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生产日期">
            <el-date-picker v-model="submitForm.findDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="6">
          <el-button type="primary" @click="getData">筛选</el-button>
          <el-button type="primary" plain @click="dialogVisible = true">新增</el-button>
          <el-button type="text" @click="clear">清空筛选</el-button>
        </el-col>
      </el-row>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="saleOrder" label="关联销售单号"> </el-table-column>
        <el-table-column prop="ppNumber" label="生产单号"> </el-table-column>
        <el-table-column prop="ppName" label="生产计划单名称"> </el-table-column>
        <el-table-column prop="createTime" label="计划下达日期"> </el-table-column>
        <el-table-column prop="finishedTime" label="计划完工日期"> </el-table-column>
        <el-table-column prop="ppstate" label="审核状态"> </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toDatail(scope.row.id)">查看</el-button>
            <el-button type="warning" size="mini" @click="edit(scope.row.relationNo,scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination :current-page="submitForm.pageNum" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 关联销售订单对话框 -->
    <el-dialog title="请关联销售订单" :visible.sync="linkDialogVisible" width="50%">
      <span style="color:#db001b;font-size:12px;">注：1、在左边框选择要关联的销售订单；2、在右边框选择该销售单下选择本次准备生产的产品。</span>
      <el-form ref="form" :model="form" label-width="80px" style="margin-top:10px;">
        <el-form-item label="销售单号" style="width:350px">
          <el-input v-model="findName"><i slot="suffix" class="el-input__icon el-icon-search" @click="getDialogData"></i></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-table :data="LData" style="width: 100%" highlight-current-row :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" @row-click="rowClick">
              <el-table-column prop="mapValue" label="销售单号"> </el-table-column>
              <el-table-column prop="mapValue2" label="客户名称"> </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <el-table :data="RData" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }">
              <el-table-column prop="productModel" label="产品型号"> </el-table-column>
              <el-table-column prop="umStart" label="规格"> </el-table-column>
              <el-table-column type="selection" width="55"> </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toLink">确认</el-button>
        <el-button @click="linkDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 生产类型选择对话框 -->
    <el-dialog title="请选择生产计划单类型" :visible.sync="dialogVisible" width="30%">
      <el-row :gutter="30">
        <el-col :span="12" style="text-align:right;"><el-button type="primary" @click="showLinkDialog">关联销售订单</el-button></el-col>
        <el-col :span="12"><el-button type="primary" @click="toNotLink">不关联销售订单</el-button></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      value1: '',
      form: {
        name: ''
      },
      linkDialogVisible: false,
      dialogVisible: false,
      tableData: [],
      submitForm: {
        findDate: '',
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      LData: [],
      RData: [],
      multipleSelection: [],
      findName:'',
      saleId:'',
      row: {
        productName: '',
        productModel: '',
        productNumber: '',
        standards: '',
        length: '',
        quantum: '',
        sumMI: '',
        ppId:'',
      },
      ppproduct:[]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.submitForm.pageSize = newSize
      this.getData()
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.submitForm.pageNum = newPage
      this.getData()
    },
    async del(id) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('ProductionPlanController/updateProductPlanByid',{
          updateID:id,
          updateType:'D'
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },
    //   点击编辑
    edit(relationNo,id){
        if(relationNo===0){
            this.$router.push({
                path:'/production/newNotLink',
                query:{
                    id:id
                }
            })
        }else{
            this.$router.push({
                path:'/production/newLink',
                query:{
                    id:id
                }
            })
        }
    },
    //   监听行点击事件
    async rowClick(row) {
        this.saleId=row.mapKey
        this.row.productName = row.mapValue2
        this.row.productModel = row.mapliandong
        this.row.productNumber = row.mapValue
        const { data: res } = await this.$http.post('ProductionPlanController/getPPProductInfoById',{
            iswhether:1,
            findById:row.mapKey
        })
        if (res.code !== "0010") return this.$message.error(res.msg)
        this.RData=res.data.RData
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //   清空筛选条件
    clear() {
      this.submitForm = {
        findDate: '',
        findName: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    //   获取页面的初始数据
    async getData() {
      const { data: res } = await this.$http.post('ProductionPlanController/getAllProductPlan', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.tableData = res.data.list
      this.total = res.data.total
    },
    toLink() {
        if(!this.saleId){
            this.saleId=this.LData[0].mapKey
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
      this.dialogVisible = false
      let ppproduct=JSON.stringify(this.ppproduct)
      sessionStorage.setItem("ppproduct",ppproduct)
      sessionStorage.setItem("saleId",this.saleId)
      this.$router.push('/production/newLink')
    },
    toNotLink() {
      this.$router.push('/production/newNotLink')
    },
    async getDialogData(){
        const { data: res } = await this.$http.post('ProductionPlanController/getPPProductInfo', {
            iswhether: 1,
            findName:this.findName
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.LData = res.data.LData
        this.RData = res.data.RData
    },
    async showLinkDialog() {
      this.dialogVisible = false
      this.linkDialogVisible = true
      this.getDialogData()
    },
    toDatail(id) {
      this.$router.push({
        path:'/productionDetail',
        query:{
          id:id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  width: 100%;
  height: 99%;
  position: relative;
  .el-pagination {
    margin-top: 40px;
    margin-left: 200px;
  }
}
</style>
