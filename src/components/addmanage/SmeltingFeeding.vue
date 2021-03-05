<template>
  <div>
    <el-page-header @back="cancel" content="熔炼投料" style="margin-bottom:20px;"> </el-page-header>
    <el-card style="margin-bottom:20px;">
      <div style="font-weight:bold;margin-bottom:20px">关联生产计划单&产品型号</div>
      <el-row v-if="id">
        <el-col :span="16">
          <el-row :gutter="20" style="margin:15px 0;">
            <el-col :span="6">
              生产计划单号
            </el-col>
            <el-col :span="6">
              {{BasicInfo.ppNumber}}
            </el-col>
            <el-col :span="6">
              产品名称
            </el-col>
            <el-col :span="6">
              {{BasicInfo.productName}}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:15px 0;">
            <el-col :span="6">
              计划下达日期
            </el-col>
            <el-col :span="6">
              {{BasicInfo.createTime|dateFormat}}
            </el-col>
            <el-col :span="6">
              产品编号
            </el-col>
            <el-col :span="6">
              {{BasicInfo.productNumber}}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:15px 0;">
            <el-col :span="6">
              计划完工日期
            </el-col>
            <el-col :span="6">
              {{BasicInfo.finishedTime|dateFormat}}
            </el-col>
            <el-col :span="6">
              产品型号
            </el-col>
            <el-col :span="6">
              {{BasicInfo.productModel}}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:15px 0;">
            <el-col :span="6">
              客户名称
            </el-col>
            <el-col :span="6">
              {{BasicInfo.customerName}}
            </el-col>
            <el-col :span="6">
              产品规格μm
            </el-col>
            <el-col :span="6">
              {{BasicInfo.umStart}}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:15px 0;">
            <el-col :span="6">
              产品单位
            </el-col>
            <el-col :span="6">
              {{BasicInfo.productUnit}}
            </el-col>
            <el-col :span="6">
              产品规格mil
            </el-col>
            <el-col :span="6">
              {{BasicInfo.milStart}}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:15px 0;">
            <el-col :span="6">
              预计生产数量（米）
            </el-col>
            <el-col :span="6">
               {{BasicInfo.planNum}}
            </el-col>
            <el-col :span="6">
              成品长度（m/轴）
            </el-col>
            <el-col :span="6">
               {{BasicInfo.length}}
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" style="margin-top:20%;" @click="showAddDialog">重新关联 <i class="el-icon-plus"></i></el-button>
          <el-button @click="cancelLink">取消关联</el-button>
        </el-col>
      </el-row>
      <el-row v-else style="height:312px;">
        <el-button type="primary" style="margin:10% 40%;" @click="showAddDialog">关联 <i class="el-icon-plus"></i></el-button>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="2" style="font-weight:bold">添加原材料</el-col>
        <el-col :span="2">当前车间</el-col>
        <el-col :span="2" style="color:#646ca7">车间1</el-col>
        <el-col :span="2">总净重</el-col>
        <el-col :span="2" style="color:#646ca7">{{sum}}</el-col>
        <el-col :span="2" :offset="8"><el-button style="margin-top:-10px;" @click="showAllocatDialog('diaobo')">新增</el-button></el-col>
      </el-row>
      <el-table :data="OneList" style="width: 100%"  :header-cell-style="{background:'#f0f5ff' }">
        <el-table-column type="index" label="序号"  > </el-table-column>
        <el-table-column prop="stockName" label="原材料名称" > </el-table-column>
        <el-table-column prop="stockModel" label="原材料型号" > </el-table-column>
        <el-table-column prop="stockNumber" label="原材料编号" > </el-table-column>
        <el-table-column prop="standards" label="规格" > </el-table-column>
        <el-table-column prop="unitName" label="单位" > </el-table-column>
        <el-table-column prop="quantityChoose" label="数量" > </el-table-column>
        <el-table-column prop="totalNet" label=" 净重g" > </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteData(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin:20px 40%">
        <el-button type="primary" @click="saveAll">开始生产</el-button>
        <el-button  @click="cancel">取消</el-button>
      </div>
    </el-card>
    
    <el-dialog title="新增熔炼" :visible.sync="addDialogVisible" width="60%">
      <div style="font-size:12px;margin:0 0 10px 10px;">step1：查询当前进行中的生产计划单</div>
      <el-row>
        <el-col :span="3"><div style="line-height:40px;">生产计划单表</div></el-col>
        <el-col :span="7" :offset="1">
          <el-input placeholder="请输入内容" v-model="input3">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="12" :offset="1"><div style="font-size:12px;line-height:40px;color:#d9001b;">*先在左框选择生产计划单，然后在右框选择生产的规格型号</div></el-col>
      </el-row>
      <div class="j-c-s">
        <el-table :cell-style="{ padding: '5px 0' }" highlight-current-row :header-cell-style="{ background: '#f0f5ff', padding: '0' }" :data="LData" style="margin-right:20px;" @row-click="rowClick">
          <el-table-column prop="ppNumber" label="生产计划单号"> </el-table-column>
          <el-table-column prop="ppName" label="生产计划单名称"> </el-table-column>
        </el-table>
        <el-table :data="RData" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column prop="productModel" label="产品型号"> </el-table-column>
          <el-table-column prop="standards" label="规格"> </el-table-column>
          <el-table-column type="selection" width="55"> </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <!--原材料调拨的对话框  -->
      <el-dialog title="添加原材料" :visible.sync="allocatDialogVisible" width="60%" @close="allocatDialogClose">
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
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-table stripe :data="listdata" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" style="width: 100%" @row-click="rowClick1">
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-table stripe :data="listdataDetail" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" style="width: 100%">
              <el-table-column prop="updateRemark" label="规格"> </el-table-column>
              <el-table-column prop="updateNum" label="库存数量g">
                <template slot-scope="scope">
                  {{ scope.row.updateNum ? scope.row.updateNum : '  --' }}
                </template>
              </el-table-column>
              <el-table-column label="选定数量g">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.xuandingNum" size="mini"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 下一部分的表格 -->
        <el-row>
          <el-col :span="5">
            <span style="line-height:60px;font-weight:bold;">待添加原材料</span>
          </el-col>
          <el-col :span="3" :offset="16">
            <el-button type="primary" plain size="mini" style="margin-top:20px;" @click="addAllData">添加</el-button>
          </el-col>
        </el-row>
        <el-table stripe :data="listdataDetailAll" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" style="width: 100%">
          <el-table-column prop="stockName" label="产品名称"> </el-table-column>
          <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
          <el-table-column prop="updateRemark" label="规格"> </el-table-column>
          <el-table-column label="库存数量g">
            <template slot-scope="scope">
              {{ scope.row.updateNum ? scope.row.updateNum : '  --' }}
            </template>
          </el-table-column>
          <el-table-column prop="xuandingNum" label="已选定数量g"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="del(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer">
          <el-button @click="allocatDialogVisible = false">取 消</el-button>
          <el-button style="margin-right:20%;margin-left:5%;" type="primary" @click="allocatNext">确定</el-button>
        </span>
      </el-dialog>
      
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      addDialogVisible: false,
      tableData: [
      ],
      LData:[],
      RData:[],
      row:{},
      multipleSelection:{},
      input3:'',
      BasicInfo:{},
      OneList:[],
      allocatDialogVisible:false,
      ChuKuForm: {
        findName: '',
        findModelName: '',
        findIdOne: 9
      },
      listdata: [],
      listdataDetail: [],
      listdataDetailAll: [],
      type: '',
      listdataObj: {
         
      },
      id:'',
    }
  },
   computed: {
    sum() {
      let sum=0
      this.OneList.forEach(item=>{
        sum=sum+Number(item.totalNet)
      })
      return sum
    }
  },
  created() {},
  methods: {
    del(index){
      this.listdataDetailAll.splice(index,1)
    },
    // 取消关联
    cancelLink(){
      this.id=''
      this.BasicInfo={}
       
    },
    async deleteData(index){
       const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      this.OneList.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 保存全部数据
    async saveAll(){
      const { data: res } = await this.$http.post('NewProductionController/saveStartProduction',{
        ppProduction:{
          pproductId:this.id,
          productionNumber:this.BasicInfo.productModel
        },
        oneList:this.OneList
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success("操作成功")
      this.$router.go(-1)
    },
    // 每一行点击
    async rowClick1(row) {
      this.listdataObj=row
      const { data: res } = await this.$http.post('warehouseController/getAllWarehousingChuKuById', {
        findById: row.id,
        findModelName: "stock",
        findIdOne:9
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.listdataDetail = res.data.RData
    },
    //展示调拨下一步
    allocatNext() {
      this.listdataDetailAll.forEach(item=>{
        let obj={}
        obj.stockName=item.stockName
        obj.stockModel=item.stockModel
        obj.stockNumber=item.stockNumber
        obj.standards=item.updateRemark
        obj.unitName=item.dictionarier
        obj.stockName=item.stockName
        obj.quantityChoose=item.xuandingNum
        obj.totalNet=Number(item.xuandingNum)
        obj.inventoryStatusId=item.updateID
        this.OneList.push(_.cloneDeep(obj))
      })
      this.allocatDialogVisible = false
       
    },
    // 添加数据合并
    addAllData() {
      for(let i=0;i<this.listdataDetailAll.length;i++){
        for(let j=0;j<this.listdataDetail.length;j++){
          if(this.listdataDetail[j].updateID==this.listdataDetailAll[i].updateID&&this.listdataDetail[j].updateID.updateNum>0){
             return this.$message.error("请不要添加重复数据")
          }
        }
      }
     
      this.listdataDetailAll.push(..._.cloneDeep(this.listdataDetail))
      this.listdataDetailAll.forEach(item => {
        item.stockName = item.stockName ? item.stockName : this.listdataObj.stockName
        item.stockNumber = item.stockNumber ? item.stockNumber : this.listdataObj.stockNumber
        item.pppid = item.pppid ? item.pppid : this.listdataObj.pppid
        item.stockModel = item.stockModel ? item.stockModel : this.listdataObj.stockModel
        item.dictionarier = item.dictionarier ? item.dictionarier : this.listdataObj.dictionarier
      })
      this.listdataDetailAll = this.listdataDetailAll.filter(item => item.xuandingNum > 0 && item.xuandingNum <= item.updateNum)
      this.listdataDetail.forEach(item=>{
        item.xuandingNum=''
      })
    },
    // 监听调拨的对话框关闭
    allocatDialogClose() {
      this.listdataDetail = []
      this.listdataDetailAll=[]
    },
    // 获取调拨的初始数据
    async getAllocat() {
      const { data: ress } = await this.$http.post('warehouseController/getAllWarehousingChuKu', this.ChuKuForm)
      if (ress.code !== '0010') return this.$message.error(ress.msg)
      this.listdata = ress.data.LData
      this.rowClick1(this.listdata[0])
       
    },
    //展示调拨的对话框
    async showAllocatDialog(type) {
      this.type = type
      this.allocatDialogVisible = true
      const { data: res } = await this.$http.post('warehouseController/getWarehousXiaLa')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.warehourseXiaLa = res.data.warehourseXiaLa
      this.ChuKuForm.findModelName = 'stock'
      this.getAllocat()
    },
    async confirm() {    
     
      this.addDialogVisible = false
      const { data: res } = await this.$http.post('NewProductionController/getMeltingInfoById',{
        findById:this.id,
        findIdOne:1,
        pageNum:0,
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      
      this.BasicInfo=res.data.BasicInfo
    },
    //   实现单选
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(val[val.length - 1])
      }
      this.multipleSelection = val[val.length - 1]
      this.id=this.multipleSelection.id?this.multipleSelection.id:''
    },
    //   监听行点击
    async rowClick(row) {
      this.row = row
      const { data: res } = await this.$http.post('ProductionController/getMeltingInfoById', {
        findById: row.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.RData = res.data.RData
    },
    async showAddDialog() {
      const { data: res } = await this.$http.post('ProductionController/getMeltingInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.LData = res.data.LData
      this.RData = res.data.RData
      this.addDialogVisible = true
      this.rowClick(this.LData[0])
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.j-c-s {
  display: flex;
  justify-content: space-between;
}


</style>
