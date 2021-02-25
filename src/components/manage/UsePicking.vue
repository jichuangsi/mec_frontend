<template>
  <div>
    <el-page-header @back="cancel" content="新增生产领料" style="margin-bottom:20px;"> </el-page-header>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div style="font-weight:bold;margin-bottom:20px;">基本信息</div>
          <el-form label-width="120px">
            <el-form-item label="生产领料单编号">
              <el-input style="width:50%" v-model="productionPicking.ppinumber"></el-input>
            </el-form-item>
            <el-form-item label="生产领料单名称">
              <el-input style="width:50%" v-model="productionPicking.ppiname"></el-input>
            </el-form-item>
            <el-form-item label="领料日期">
              <el-date-picker disabled v-model="productionPicking.createTime" type="date" style="width:50%" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="font-weight:bold;margin-bottom:20px;">生产计划单信息</div>
          <el-form label-width="120px">
            <el-form-item label="生产计划单号">{{ productPlan.ppNumber }}</el-form-item>
            <el-form-item label="计划下达日期">{{ productPlan.createTime | dateFormat }} </el-form-item>
            <el-form-item label="计划完工日期"> {{ productPlan.finishedTime | dateFormat }}</el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:20px">
      <el-table :data="ppproduct" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="productName" label="产品名称"> </el-table-column>
        <el-table-column prop="productModel" label="产品型号"> </el-table-column>
        <el-table-column prop="standards" label="规格"> </el-table-column>
        <el-table-column prop="length" label="长度m/轴"> </el-table-column>
        <el-table-column prop="quantum" label="数量"> </el-table-column>
        <el-table-column prop="sumMI" label="合计"> </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top:20px">
      <el-row style="margin-bottom:20px;">
        <el-col :span="4" style="font-weight:bold">添加原材料</el-col>
        <el-col :span="6">领料车间 <span class="gray">车间1</span> </el-col>
        <el-col :span="6">总净重 <span class="gray">{{sum}}</span> </el-col>
        <el-col :span="6"><el-button type="primary" style="margin-top:-10px;" @click="showAllocatDialog('diaobo')" v-if="id==-1">新增</el-button></el-col>
      </el-row>
      <el-table :data="pickingStockList" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="stockName" label="产品名称"> </el-table-column>
        <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
        <el-table-column prop="stockModel" label="型号"> </el-table-column>
        <el-table-column prop="warehourseName" label="出库仓库"> </el-table-column>
        <el-table-column prop="standards" label="规格"> </el-table-column>
        <el-table-column prop="unitName" label="单位"> </el-table-column>
        <el-table-column prop="quantityChoose" label="数量"> </el-table-column>
        <el-table-column prop="totalNet" label="净重g"> </el-table-column>
        <el-table-column label="操作" v-if="id==-1">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delTableData(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin:40px 0" v-if="id==-1">
        <el-button type="primary" @click="saveAll">领料</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
    <!--原材料调拨的对话框  -->
    <el-dialog :title="type == 'diaobo' ? '原材料调拨 ' : type == 'chuku' ? '出库' : '入库'" :visible.sync="allocatDialogVisible" width="60%" @close="allocatDialogClose">
      <!-- 上一部分的表格 -->
      <el-row>
        <el-col :span="7">
          <el-col :span="6"><span style="line-height:40px;">产品名称：</span></el-col>
          <el-col :span="18">
            <el-input placeholder="请输入内容" v-model="ChuKuForm.findName">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getAllocat"></i>
            </el-input>
          </el-col>
        </el-col>
        <el-col :span="7" :offset="1" v-show="type == 'diaobo' || type == 'chuku'">
          <el-col :span="6"><span style="line-height:40px;">领料仓库：</span></el-col>
          <el-col :span="18">
            <el-select placeholder="请选择 " v-model="ChuKuForm.findIdOne" @change="getAllocat">
              <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in warehourseXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="7" :offset="1" v-show="type == 'diaobo' || type == 'ruku'">
          <el-col :span="6"><span style="line-height:40px;">领料车间</span></el-col>
          <el-col :span="18">
            <span style="line-height:40px;">车间1</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-table
            :data="listdata"
            height="300px"
            :cell-style="{ padding: '5px 0' }"
            :header-cell-style="{ background: '#f0f5ff', padding: '0' }"
            style="width: 100%"
            highlight-current-row
            @row-click="rowClick"
          >
            <el-table-column prop="stockName" label="产品名称"> </el-table-column>
            <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-table height="300px" :data="listdataDetail" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" style="width: 100%">
            <el-table-column prop="updateRemark" label="规格"> </el-table-column>
            <el-table-column prop="updateNum" label="库存数量">
              <template slot-scope="scope">
                {{ scope.row.updateNum ? scope.row.updateNum : '  --' }}
              </template>
            </el-table-column>
            <el-table-column label="选定数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.xuandingNum" size="mini" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!-- 下一部分的表格 -->
      <el-row>
        <el-col :span="5">
          <span style="line-height:60px;font-weight:bold;">待调拨原材料</span>
        </el-col>
        <el-col :span="3" :offset="16">
          <el-button type="primary" plain size="mini" style="margin-top:20px;" @click="addAllData">添加</el-button>
        </el-col>
      </el-row>
      <el-table :data="listdataDetailAll" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" style="width: 100%">
        <el-table-column prop="updateRemark" label="产品名称"> </el-table-column>
        <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
        <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
        <el-table-column prop="findModelName" label="出库仓库"> </el-table-column>
        <el-table-column prop="updateRemark" label="规格"> </el-table-column>
        <el-table-column prop="dictionarier" label="单位"> </el-table-column>
        <el-table-column label="库存数量">
          <template slot-scope="scope">
            {{ scope.row.updateNum ? scope.row.updateNum : '  --' }}
          </template>
        </el-table-column>
        <el-table-column prop="xuandingNum" label="已选定数量"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer">
        <el-button @click="allocatDialogVisible = false">取 消</el-button>
        <el-button style="margin-right:20%;margin-left:5%;" type="primary" @click="allocatNext">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      value1: '',
      ppproduct: [],
      row: {},
      row1: {},
      tableData: [
      ],
      warehourseXiaLa:[],
      ChuKuForm:{
        findName:'',
        findModelName:'',
        findIdOne:'',
      },
      type:'',
      listdata:[],
      listdataDetail:[],
      listdataDetailAll:[],
      activeName: 'stock',
      allocatDialogVisible:false,
      updateWarehourseID:'',//选中的仓库id
      id:-1,
      productPlan:{},
      pickingStockList:[],
      productionPicking:{}
    }
  },
  computed: {
    sum() {
      let sum=0
      this.pickingStockList.forEach(item=>{
        sum=sum+Number(item.totalNet)
      })
      return sum
    }
  },
  created() {
    this.id=this.$route.query.id
    this.row1 = JSON.parse(sessionStorage.getItem('productionPicking'))
    if(this.id>=0){
      this.getData()
    }else{
      this.chooseItem(this.row1)
    }
  },
  methods: {
    // 保存全部信息
    async saveAll(){
      if(!this.productionPicking.ppinumber||!this.productionPicking.ppiname||!this.pickingStockList.length){
        return this.$message.error("请填写必要信息")
      }
      if(!this.productionPicking.ppid){
        this.productionPicking.ppid=this.row1.id
         this.productionPicking.totalNet=this.sum
      }
      const { data: res } = await this.$http.post('ProductionInventoryController/saveProductionPicking',{
        pickingStockList:this.pickingStockList,
        productionPicking:this.productionPicking
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success(this.id>=0?'编辑成功':'保存成功')
      this.$router.go(-1)
    },
    // 编辑时获取的数据
    async getData(){

        const { data: res } = await this.$http.post('ProductionInventoryController/getPPPickingById', {
          findById: this.id
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.ppproduct=res.data.ppproduct
        this.productionPicking=res.data.productionPicking
        this.pickingStockList=res.data.pickingStockList
        this.productPlan=res.data.productPlan
    },
    // 添加数据合并
    addAllData(){
      for(let i=0;i<this.listdataDetailAll.length;i++){
        for(let j=0;j<this.listdataDetail.length;j++){
          if(this.listdataDetail[j].updateID==this.listdataDetailAll[i].updateID&&this.listdataDetail[j].updateID.updateNum>0){
             return this.$message.error("请不要添加重复数据")
          }
        }
      }
      this.listdataDetailAll.push(..._.cloneDeep(this.listdataDetail))
      for(let i=0;i<this.listdataDetail.length;i++){
        if(this.listdataDetail[i].xuandingNum>0){
          this.listdataDetail[i].xuandingNum=''
        }
      }
      this.listdataDetailAll.forEach(item=>{
          item.stockName=item.stockName?item.stockName:this.row.stockName
          item.stockModel=item.stockModel?item.stockModel:this.row.stockModel
          item.unitId=item.unitId?item.unitId:this.row.dictionarierId
          item.stockNumber=item.stockNumber?item.stockNumber:this.row.stockNumber
          item.dictionarier=item.dictionarier?item.dictionarier:this.row.dictionarier
          item.stockModel=item.stockModel?item.stockModel:this.row.stockModel
        })
      this.listdataDetailAll=this.listdataDetailAll.filter(item => item.xuandingNum > 0 )
      if(this.type=="diaobo"||this.type=="chuku"){
        this.listdataDetailAll=this.listdataDetailAll.filter(item =>  item.xuandingNum<=item.updateNum )
      }

    },
    // 监听调拨的对话框关闭
    allocatDialogClose(){
      this.listdataDetail=[]
      this.ChuKuForm.findIdOne=''
    },
    //展示调拨下一步
    allocatNext() {
      this.listdataDetailAll.forEach(item=>{
        let obj={}
        obj.stockName=item.updateRemark
        obj.stockNumber=item.stockNumber
        obj.stockModel=item.stockModel
        obj.warehourseName=item.findModelName
        obj.standards=item.updateRemark
        obj.unitName=item.dictionarier
        obj.quantityChoose=item.xuandingNum
        obj.totalNet=item.xuandingNum
        obj.inventoryStatusId=item.updateID
       this.pickingStockList.push(_.cloneDeep(obj))
      })
      this.allocatDialogVisible = false
    },
    async delTableData( index){
       const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      this.pickingStockList.splice(index, 1)
      this.$message.success('删除成功')
    },
    del(index){
      this.listdataDetailAll.splice(index,1)
    },
    // 每一行点击
    async rowClick(row){
      this.row=row
        const { data: res } = await this.$http.post('warehouseController/getAllWarehousingChuKuById',{
        findById:row.id,
        findModelName:this.activeName,
        findIdOne:this.ChuKuForm.findIdOne
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.listdataDetail=res.data.RData

    },
    // 获取调拨的初始数据
    async getAllocat(){
      if(this.type=='ruku'){
        const { data: ress } = await this.$http.post('warehouseController/getAllWarehousingProduct',this.ChuKuForm)
        if (ress.code !== '0010') return this.$message.error(ress.msg)
        this.listdata=ress.data.LData
        this.listdataDetail=ress.data.RData

        this.rowClick(ress.data.LData[0])
      }else{
        const { data: ress } = await this.$http.post('warehouseController/getAllWarehousingChuKu',this.ChuKuForm)
        if (ress.code !== '0010') return this.$message.error(ress.msg)
        this.listdata=ress.data.LData
        this.listdataDetail=ress.data.RData

        this.rowClick(ress.data.LData[0])
      }
    },
    //展示调拨的对话框
    async showAllocatDialog(type) {
      this.listdataDetailAll=[]
      this.type=type
      this.allocatDialogVisible = true
      const { data: res } = await this.$http.post('warehouseController/getWarehousXiaLa')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.warehourseXiaLa=res.data.warehourseXiaLa
      this.ChuKuForm.findModelName=this.activeName
      this.getAllocat()
    },
    cancel() {
      this.$router.go(-1)
    },
    async chooseItem(row) {
      
      const { data: res } = await this.$http.post('ProductionInventoryController/getPPPlanInfoById', {
        findById: row.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.ppproduct = res.data.ppproduct
      this.productPlan=row
      this.productionPicking.createTime=new Date()
    }
  }
}
</script>
<style lang="less" scoped>
.gray {
  color: #909399;
}
</style>
