<template>
  <div>
    <el-page-header @back="cancel" content="包装设置" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div style="font-weight:bold">包装设置</div>
      <el-form label-width="220px">
        <el-form-item label="包装编号"> 
          <el-input style="width:30%;" v-model="form.packingName" disabled></el-input><span style="color:red;margin-left:60px;">*包装编号唯一</span> 
        </el-form-item>
        <el-form-item label="生产批号">
          <el-input style="width:30%;" v-model="pihao" disabled></el-input>
        </el-form-item>
         <el-form-item label="生产日期">
          <el-date-picker v-model="form.productTime" style="width:30%;" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
        <el-form-item label="保质期">
          <el-date-picker v-model="form.qualityTime" style="width:30%;" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
        <el-form-item label="原材料">
          <el-input style="width:30%;" v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item label="装盒数量">
          <el-input style="width:30%;" v-model="form.cartonsNumber"></el-input>
        </el-form-item>
        <el-form-item label="选择要关联的库存产品">
          <el-button v-if="this.id==-1" type="primary" style="margin-left:80%;" @click="showAllocatDialog('diaobo')">新增关联产品</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" :header-cell-style="{ background: '#f0f5ff' }" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column  label="包装编号">
          <template>
            {{form.packingName ? form.packingName : '--'}}
          </template>
        </el-table-column>
        <el-table-column prop="stockNumber" label="生产批号"> </el-table-column>
        <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
        <el-table-column prop="updateRemark" label="线轴"> </el-table-column>
        <el-table-column prop="axleNumber" label="轴号"> </el-table-column>
        <el-table-column prop="stockName" label="规格">
          <template slot-scope="scope">
            {{ Number(scope.row.stockName).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="standards" label="长度/轴"> </el-table-column>
        <el-table-column label="净重">
          <template slot-scope="scope">
            {{ scope.row.updateNum ? scope.row.updateNum : '  --' }}
          </template>
        </el-table-column>

        <el-table-column label="操作" v-if="this.id==-1">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delTableData(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin:20px 40%" v-if="this.id==-1">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveAll">保存</el-button>
      </div>
    </el-card>
    <!--原材料调拨的对话框  -->
    <el-dialog :title="type == 'diaobo' ? '  ' : type == 'chuku' ? '出库' : '入库'" :visible.sync="allocatDialogVisible" width="60%" @close="allocatDialogClose">
      <!-- 上一部分的表格 -->
      <el-row>
        <el-col :span="7">
          <el-col :span="6"><span style="line-height:40px;">生产批号：</span></el-col>
          <el-col :span="18">
            <el-input placeholder="请输入内容" v-model="ChuKuForm.findName">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getAllocat"></i>
            </el-input>
          </el-col>
        </el-col>
        <!-- <el-col :span="7" :offset="1" v-show="type == 'diaobo' || type == 'chuku'">
          <el-col :span="6"><span style="line-height:40px;">调出仓库：</span></el-col>
          <el-col :span="18">
            <el-select placeholder="请选择 " v-model="ChuKuForm.findIdOne" @change="getAllocat">
              <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in warehourseXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="7" :offset="1" v-show="type == 'diaobo' || type == 'ruku'">
          <el-col :span="6"><span style="line-height:40px;">调入仓库：</span></el-col>
          <el-col :span="18">
            <el-select placeholder="请选择 " v-model="updateWarehourseID">
              <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in warehourseXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-col>
        </el-col> -->
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-table
            :data="listdata"
            height="300px"
            :cell-style="{ padding: '5px 0' }"
            :header-cell-style="{ background: '#f0f5ff', padding: '0' }"
            style="width: 100%"
            highlight-current-row
            @row-click="rowClick"
          >
            <el-table-column prop="stockNumber" label="生产批号"> </el-table-column>
            <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="13" :offset="1">
          <el-table
            height="300px"
            @selection-change="handleSelectionChange"
            :data="listdataDetail"
            :cell-style="{ padding: '5px 0' }"
            :header-cell-style="{ background: '#f0f5ff', padding: '0' }"
            style="width: 100%"
          >
            <el-table-column prop="updateRemark" show-overflow-tooltip label="线轴名称"> </el-table-column>
            <el-table-column prop="axleNumber" label="轴号"> </el-table-column>
            <el-table-column prop="bobbinColor" label=" 轴色"> </el-table-column>
            <el-table-column prop="stockName" label="规格">
              <template slot-scope="scope">
                {{ Number(scope.row.stockName).toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="standards" label="长度m/轴"> </el-table-column>
           
            <el-table-column type="selection" width="55"> </el-table-column>
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
        <el-table-column prop="stockNumber" label="生产批号"> </el-table-column>
        <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
        <el-table-column prop="updateRemark" label="线轴名称"> </el-table-column>
        <el-table-column prop="axleNumber" label="轴号"> </el-table-column>
        <el-table-column prop="bobbinColor" label=" 轴色"> </el-table-column>
        <el-table-column prop="stockName" label="规格">
          <template slot-scope="scope">
            {{ Number(scope.row.stockName).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="standards" label="长度/轴"> </el-table-column>
        

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
      tableData: [],
      warehourseXiaLa: [],
      ChuKuForm: {
        findName: '',
        findModelName: '',
        findIdOne: ''
      },
      listdata: [],
      listdataDetail: [],
      listdataDetailAll: [],
      allocatDialogVisible: false,
      type: '',
      updateWarehourseID: '', //选中的仓库id
      activeName: 'product',
      multipleSelection: [],
      form: {
        cartonsNumber: '', //装盒数量
        id: 0,
        pppid: 0, //生产id
        productids: '', //关联的库存产品（字符串把id用“,”连起来）
        productTime: '', //生产日期
        qualityTime: '', //保质期
        stock: '' //原材料
      },
      id: -1
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id >= 0) {
      this.getData()
    }
  },
  computed:{
    pihao(){
      if(this.tableData.length){
        return this.tableData[0].stockNumber
      }
      return ''
    }
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.post('packingController/getPickingById', {
        findById: this.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.form = res.data.pickingInfo
      res.data.pickingDetail.forEach(item => {
        let obj = {}
        obj.stockNumber = item.productionNumber
        obj.stockModel = item.productModel
        obj.updateRemark = item.bobbinName
        obj.axleNumber = item.axleNumber
        obj.stockName = item.standards
        obj.standards = item.lengthm
        obj.updateNum = item.inventorysum
        this.tableData.push(_.cloneDeep(obj))
        
      })
    },
    // 保存全部数据
    async saveAll() {
      let str = ''
      this.tableData.forEach(item => {
        str = str + item.updateID + ','
      })
      this.form.productids = str
      const { data: res } = await this.$http.post('packingController/savePicking', this.form)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('保存成功')
      this.$router.go(-1)
    },
    async delTableData(index) {
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //展示调拨下一步
    allocatNext() {
      this.tableData = _.cloneDeep(this.listdataDetailAll)
      this.allocatDialogVisible = false
    },
    // 添加数据合并
    addAllData() {
      this.listdataDetailAll = _.cloneDeep(this.multipleSelection)
      this.listdataDetailAll.forEach(item => {
        item.stockNumber = item.stockNumber ? item.stockNumber : this.row.stockNumber
        item.stockModel = item.stockModel ? item.stockModel : this.row.stockModel
        item.stockName = item.stockName ? item.stockName : this.row.stockName
      })
    },
    del(index) {
      this.listdataDetailAll.splice(index, 1)
    },
    // 每一行点击
    async rowClick(row) {
      this.listdataDetailAll = []
      this.row = row
      const { data: res } = await this.$http.post('ProductionController/getFinishedByPPPId', {
        findById: row.id,
        findModelName: this.activeName,
        findIdOne: this.ChuKuForm.findIdOne
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.listdataDetail = res.data.RData
    },
    // 获取调拨的初始数据
    async getAllocat() {
      const { data: ress } = await this.$http.post('ProductionController/getAllFinished', this.ChuKuForm)
      if (ress.code !== '0010') return this.$message.error(ress.msg)
      this.listdata = ress.data.LData
      this.listdataDetail = ress.data.RData

      this.rowClick(ress.data.LData[0])
    },
    // 监听调拨的对话框关闭
    allocatDialogClose() {
      this.listdataDetail = []
      this.ChuKuForm.findIdOne = ''
    },
    //展示调拨的对话框
    async showAllocatDialog(type) {
      this.listdataDetailAll = []
      this.type = type
      this.allocatDialogVisible = true
      const { data: res } = await this.$http.post('warehouseController/getWarehousXiaLa')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.warehourseXiaLa = res.data.warehourseXiaLa
      this.ChuKuForm.findModelName = this.activeName
      this.getAllocat()
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped></style>
