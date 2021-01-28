<template>
  <div>
    <el-page-header @back="cancel" content="模具维护" style="margin-bottom:20px;"> </el-page-header>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div style="font-weight:bold">选择生产批号</div>
          <div class="box-center" v-if="!ProductNumberRow.productionNumber">
            <el-button type="primary" @click="showProductNumber">选择生产批号 <i class="el-icon-plus"></i></el-button>
          </div>
          <div class="box-center" v-else>
            <el-row style="width:100%">
              <el-col :span="4" :offset="2">生产批号</el-col>
              <el-col :span="8" class="gray">{{ ProductNumberRow.productionNumber }}</el-col>
              <el-col :span="4">当前工序</el-col>
              <el-col :span="4" class="gray">{{ ProductNumberRow.gxname }}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="height:380px">
          <div style="font-weight:bold;margin-bottom:10px;">关联生产计划单&产品型号</div>
          <el-row v-if="id > 0">
            <el-col :span="24">
              <el-row :gutter="20" style="margin:15px 0;">
                <el-col :span="6">
                  生产计划单号
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.ppNumber }}
                </el-col>
                <el-col :span="6">
                  产品名称
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.productName }}
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin:15px 0;">
                <el-col :span="6">
                  计划下达日期
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.createTime | dateFormat }}
                </el-col>
                <el-col :span="6">
                  产品编号
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.productNumber }}
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin:15px 0;">
                <el-col :span="6">
                  计划完工日期
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.finishedTime | dateFormat }}
                </el-col>
                <el-col :span="6">
                  产品型号
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.productModel }}
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin:15px 0;">
                <el-col :span="6">
                  客户名称
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.customerName }}
                </el-col>
                <el-col :span="6">
                  产品规格μm
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.umStart }}
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin:15px 0;">
                <el-col :span="6">
                  产品单位
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.productUnit }}
                </el-col>
                <el-col :span="6">
                  产品规格mil
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.milStart }}
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin:15px 0;">
                <el-col :span="6">
                  预计生产数量（米）
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.planNum }}
                </el-col>
                <el-col :span="6">
                  成品长度（m/轴）
                </el-col>
                <el-col :span="6" class="gray">
                  {{ BasicInfo.length }}
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8" :offset="10">
              <el-button type="primary" style="margin-top:11%;" @click="showAddDialog">重新关联 <i class="el-icon-plus"></i></el-button>
              <el-button @click="cancelLink">取消关联</el-button>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-button type="primary" style="margin:20% 40%;" @click="showAddDialog">关联 <i class="el-icon-plus"></i></el-button>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 上班生产产物（熔炼） -->
    <el-card style="margin-top:20px">
      <el-row>
        <el-col :span="4" style="font-weight:bold">上班生产产物（{{ oneListName }}）</el-col>
        <el-col :span="2">当前仓库</el-col>
        <el-col :span="2" style="color:#9494b1">车间1</el-col>
        <el-col :span="2">当前余料g</el-col>
        <el-col :span="2" style="color:#9494b1">50000</el-col>
        <el-col :span="2">当前可选择余料g</el-col>
        <el-col :span="2" style="color:#9494b1">50000</el-col>
      </el-row>
      <el-table :data="OneList" style="width: 100%;margin:20px 0" :header-cell-style="{ background: '#f0f5ff' }">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="createTime" label="生产时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="gxName" label="工序">
          <template  >
            {{ oneListName }}
          </template>
        </el-table-column>
        <el-table-column prop="netWeightg" label="净重g"> </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加生产投料 -->
    <el-card style="margin-top:20px">
      <el-row>
        <el-col :span="4" style="font-weight:bold">添加生产投料</el-col>
        <el-col :span="2">总净重</el-col>
        <el-col :span="2" style="color:#9494b1">{{sum}}</el-col>
        <el-col :span="2" :offset="10"><el-button type="primary" style="margin-top:-10px;" @click="showDialogTLVisible ">新增</el-button></el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%;margin:20px 0" :header-cell-style="{ background: '#f0f5ff' }">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="createTime" label="生产时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="gxName" label="工序">
          <template>
            {{ oneListName }}
          </template>
        </el-table-column>
        <el-table-column prop="netWeightg" label="净重g"> </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin:40px 40%">
        <el-button type="primary" @click="saveAll">开始生产</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
    <el-dialog title="选择生产批号" :visible.sync="ProductNumberVisible" width="40%">
      <el-form label-width="80px">
        <el-form-item label="生产批号">
          <el-input v-model="abc" style="width:40%"></el-input>
        </el-form-item>
      </el-form>
      <el-table
        :data="LeftData"
        style="width: 100%"
        :cell-style="{ padding: '5px 0' }"
        :header-cell-style="{ background: '#f0f5ff', padding: '0' }"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="productionNumber" label="生产批号"> </el-table-column>
        <el-table-column prop="ppNumber" label="产品型号"> </el-table-column>
        <el-table-column type="selection" width="55"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ProductNumberVisible = false">取 消</el-button>
        <el-button type="primary" @click="ProductNumberConfirm">确 定</el-button>
      </span>
    </el-dialog>
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
        <el-table :data="RData" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" ref="multipleTable1" @selection-change="handleSelectionChange1">
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
    <!-- 投料的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogTLVisible" width="30%">
      <div>
        生产批号 <span style="margin-left:10%;color:#909399"> {{ ProductNumberRow.productionNumber }}</span>
      </div>
      <el-table :data="tableData1" style="width: 100%" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" @selection-change="handleSelectionChange2">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="createTime" label="生产时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="gxName" label="工序">
          <template>
            {{ oneListName }}
          </template>
        </el-table-column>
        <el-table-column prop="netWeightg" label="净重g"> </el-table-column>
        <el-table-column type="selection" width="55"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTLVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTLVisibleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      dialogTLVisible: false,
      ProductNumberVisible: false,
      abc: '',
      multipleSelection: {},
      multipleSelection1: {},
      tableData: [
      ],
      LeftData: [],
      ProductNumberRow: {},
      id: '',
      BasicInfo: {},
      addDialogVisible: false,
      input3: '',
      LData: [],
      RData: [],
      tableData: [],
      oneListName: '',
      OneList: [],
      tableData1: [],
      multipleSelection2: []
    }
  },
  created() {},
  computed: {
    sum() {
      let sum=0
      this.tableData.forEach(item=>{
        sum=sum+Number(item.netWeightg)
      })
      return sum
    }
  },
  methods: {
    // 保存全部数据
    async saveAll(){
      const { data: res } = await this.$http.post('NewProductionController/saveStartProduction2',{
        ppProduction:{
          pproductId:this.BasicInfo.id ,
          fid:this.ProductNumberRow.id,
          gxid:3
        },
        twoList:this.tableData
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success('保存成功')
      this.$router.go(-1)
    },
    handleSelectionChange2(val){
       this.multipleSelection2 = val;
    },
    dialogTLVisibleConfirm(){
      this.tableData.push(..._.cloneDeep(this.multipleSelection2))
      this.tableData1=this.tableData1.filter(v => {
          return this.tableData.every(e => e.id != v.id);
      });
      this.dialogTLVisible=false
    },
    // 展示添加生产投料的对话框
    showDialogTLVisible(){
      this.multipleSelection2=[]
      this.dialogTLVisible=true
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
      this.tableData1.push(_.cloneDeep(this.tableData[index]))
      this.tableData.splice(index, 1)
      
      this.$message.success('删除成功')
    },
    // 取消关联
    cancelLink() {
      this.id = ''
      this.BasicInfo = {}
      this.OneList = []
    },
    async confirm() {
      this.addDialogVisible = false
      const { data: res } = await this.$http.post('NewProductionController/getMeltingInfoById', {
        findById: this.id,
        findIdOne: 3,
        pageNum: this.ProductNumberRow.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.OneList = res.data.oneList
      this.tableData1 = _.cloneDeep(this.OneList)
      this.BasicInfo = res.data.BasicInfo
      this.oneListName = res.data.oneListName
    },
    ProductNumberConfirm() {
      this.ProductNumberRow = this.multipleSelection
      this.ProductNumberVisible = false
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
    //   实现单选
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(val[val.length - 1])
      }
      this.multipleSelection = val[val.length - 1]
    },
    //   实现单选
    handleSelectionChange1(val) {
      if (val.length > 1) {
        this.$refs.multipleTable1.clearSelection()
        this.$refs.multipleTable1.toggleRowSelection(val[val.length - 1])
      }
      this.multipleSelection1 = val[val.length - 1]
      this.id = this.multipleSelection1.id ? this.multipleSelection1.id : ''
    },
    async showProductNumber() {
      this.ProductNumberVisible = true
      const { data: res } = await this.$http.post('NewProductionController/getProductionList', {
        findById: 3
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.LeftData = res.data.LData
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.box-center {
  width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/deep/thead .el-table-column--selection .cell {
  display: none !important;
}
.j-c-s {
  display: flex;
  justify-content: space-between;
}
.gray{
  color:#9494b1;
}
</style>
