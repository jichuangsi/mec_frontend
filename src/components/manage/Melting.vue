<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="2"><div class="item current">熔炼</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/roughDrawing')">粗拉</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/mediumPull')">中拉</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/thinPull')">半成品</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/superThinPull')">成品</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/backFire')">转退火</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/winding')">绕线</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/detour')">成品改绕</div></el-col>
    </el-row>
    <el-form ref="form" label-width="80px">
      <el-row :gutter="40">
        <el-col :span="6">
          <el-form-item label="生产批号">
            <el-input v-model="submitForm.findModelName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生产单号">
            <el-input v-model="submitForm.findName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生产日期">
            <el-input v-model="submitForm.findDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="getData">筛选</el-button>
          <el-button type="primary" @click="showAddDialog">新增</el-button>
          <el-button type="text" @click="clear">清空筛选</el-button>
        </el-col>
      </el-row>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%;margin-top:0">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="createTime" label="时间"> </el-table-column>
        <el-table-column prop="ppNumber" label="生产计划单号"> </el-table-column>
        <el-table-column prop="productionNumber" label="生产批号"> </el-table-column>
        <el-table-column prop="gxname" label="工序"> </el-table-column>
        <el-table-column prop="teamName" label="班组"> </el-table-column>
        <el-table-column prop="frequencystr" label="班次"> </el-table-column>
        <el-table-column prop="statestr" label="完成情况"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">查看</el-button>

            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    <!-- 步骤一的对话框 -->
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
    <!-- 步骤二的对话框 -->
    <el-dialog title="新增熔炼" :visible.sync="paramsDialogVisible" width="50%">
      <div style="font-size:12px;">step2：确认参数</div>
      <div style="display:flex;">
        <div class="paramsitem">产品名称</div>
        <div class="paramsitem" style="color:#8494a9;">{{ row.productName }}</div>
      </div>
      <div style="display:flex;">
        <div class="paramsitem">产品编号</div>
        <div class="paramsitem" style="color:#8494a9;">{{ row.productNumber }}</div>
      </div>
      <div style="display:flex;">
        <div class="paramsitem">产品型号</div>
        <div class="paramsitem" style="color:#8494a9;">{{ row.productModel }}</div>
      </div>
      <div style="display:flex;">
        <div class="paramsitem">产品规格</div>
        <div class="paramsitem" style="color:#8494a9;">{{ row.standards }}</div>
      </div>
      <div style="display:flex;">
        <div class="paramsitem">预计生产数量</div>
        <div class="paramsitem" style="color:#8494a9;">{{ row.quantum }}</div>
      </div>
      <div style="display:flex;">
        <div class="paramsitem">产品单位</div>
        <div class="paramsitem" style="color:#8494a9;">{{ row.ppUnit }}</div>
      </div>
      <div style="display:flex;">
        <div class="paramsitem">生产计划单号</div>
        <div class="paramsitem" style="color:#8494a9;">{{ row.ppNumber }}</div>
      </div>
      <div style="display:flex;">
        <div class="paramsitem">计划下达日期</div>
        <div class="paramsitem" style="color:#8494a9;">{{ row.createTime|dateFormat }}</div>
      </div>
      <div style="display:flex;">
        <div class="paramsitem">计划完工日期</div>
        <div class="paramsitem" style="color:#8494a9;">{{ row.finishedTime|dateFormat }}</div>
      </div>
      <div style="display:flex;">
        <div class="paramsitem">客户名称</div>
        <div class="paramsitem" style="color:#8494a9;">{{ row.customerName }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="paramsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toAddMelting">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  inject: ['reload'],
  data() {
    return {
      paramsDialogVisible: false,
      input3: '',
      addDialogVisible: false,
      tableData: [],
      LData: [],
      RData: [],
      multipleSelection: [],
      row: {
          id:'',
        customerName: '',
        finishedTime: '',
        createTime: '',
        ppNumber: '',
        ppUnit: '',
        quantum: '',
        standards: '',
        productModel: '',
        productNumber: '',
        productName: ''
      },
      submitForm:{
          findById:1,
          findDate:'',
          findModelName:'',
          findName:'',
          pageNum:1,
          pageSize:10,
      },
      total:0,
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 删除单行数据
    async del(id){
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('ProductionController/updatePPPByPPPId',{
        updateID:id,
        updateType:'D'
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },  
    // 前往详情页面
    toDetail(id){
      this.$router.push({
          path:'/AddMelting',
          query:{
              Eid:id
          }
      })
    },
    //   获取页面的初始数据
    async getData(){
        const { data: res } = await this.$http.post('ProductionController/getAllPPProduction',this.submitForm)
        if (res.code !== "0010") return this.$message.error(res.msg)
        this.total=res.data.total
        this.tableData=res.data.list
    },
    //   监听行点击
    async rowClick(row) {
      this.row.ppNumber = row.ppNumber
      this.row.createTime = row.createTime
      this.row.finishedTime = row.finishedTime
      const { data: res } = await this.$http.post('ProductionController/getMeltingInfoById', {
        findById: row.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.RData = res.data.RData
    },
    //   实现单选
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(val[val.length - 1])
      }
      this.multipleSelection = val[val.length - 1]
    },
    // 跳转页面
    todo(path) {
      window.sessionStorage.setItem('activePath', path)
      this.$router.push(path)
      this.reload()
    },
    toAddMelting() {
      this.paramsDialogVisible = false
      this.$router.push({
          path:'/AddMelting',
          query:{
              id:this.row.id
          }
      })
    },
    confirm() {
      this.row.customerName = this.multipleSelection.customerName
      this.row.ppUnit = this.multipleSelection.ppUnit
      this.row.quantum = this.multipleSelection.quantum
      this.row.standards = this.multipleSelection.standards
      this.row.productModel = this.multipleSelection.productModel
      this.row.productNumber = this.multipleSelection.productNumber
      this.row.productName = this.multipleSelection.productName
      this.row.id = this.multipleSelection.id
      this.addDialogVisible = false
      this.paramsDialogVisible = true
    },
    async showAddDialog() {
      const { data: res } = await this.$http.post('ProductionController/getMeltingInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.LData = res.data.LData
      this.RData = res.data.RData
      this.addDialogVisible = true
      this.rowClick(this.LData[0])
    },
    // 清空筛选条件
    clear(){
      this.submitForm={
          findById:1,
          findDate:'',
          findModelName:'',
          findName:'',
          pageNum:1,
          pageSize:10,
      }
    },
    handleSizeChange(e){
      this.submitForm.pageSize=e
      this.getData()
    },
    handleCurrentChange(e){
      this.submitForm.pageNum=e
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  width: 100%;
  height: 100%;
  position: relative;
  .item {
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    margin-bottom: 30px;
    cursor: pointer;
  }
  .current {
    position: relative;
    color: #0790ff;
    &:after {
      content: ' ';
      width: 56px;
      height: 4px;
      background: #0790ff;
      position: absolute;
      bottom: -7px;
      border-radius: 2px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .el-pagination {
    margin-top: 40px;
    margin-left: 200px;
  }
}
.j-c-s {
  display: flex;
  justify-content: space-between;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.paramsitem {
  flex: 1;
  text-align: center;
  font-size: 14px;
  line-height: 40px;
}
/deep/thead {
  .el-table-column--selection {
    .cell {
      display: none;
    }
  }
}
</style>
