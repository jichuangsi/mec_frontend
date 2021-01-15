<template>
  <el-card>
    <el-form label-width="120px">
      <el-form-item label="抽检报告">
        <el-input style="width:20%;" placeholder="请输入搜索内容" v-model="submitForm.findName"></el-input>
        <el-button type="primary" style="margin-left:50%;" @click="getData">筛选</el-button>
        <el-button @click="showDialog">新增抽检</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column   label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createTime|dateFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="reportName" label="抽检报告名称"> </el-table-column>
      <el-table-column prop="pppNumbers" label="抽检批号"> </el-table-column>
      <el-table-column prop="inspectionSum" label="进检轴数"> </el-table-column>
      <el-table-column prop="samplesNums" label="抽检轴数"> </el-table-column>
      <el-table-column prop="qualifiedNum" label="合格轴数"> </el-table-column>
      <el-table-column prop="unqualifiedNum" label="不合格轴数"> </el-table-column>
      <el-table-column width="250" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="toInfo(scope.row.id)">查看</el-button>
          <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="submitForm.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="submitForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog title="新增抽检" :visible.sync="dialogVisible" width="60%" >
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
            <el-table-column prop="ppNumber" label="生产批号"> </el-table-column>
            <el-table-column prop="productModel" label="产品型号"> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table :data="TwoList" style="width: 100%" height="300px" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }">
            <el-table-column prop="bobbinName" label="线轴"> </el-table-column>
            <el-table-column prop="lengthM" label="长度/m"> </el-table-column>
            <el-table-column prop="numbers" label="数量"> </el-table-column>
            <el-table-column label="选定数量">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.pageNum"></el-input>
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
        <el-table-column prop="ppNumber" label="生产批号"> </el-table-column>
        <el-table-column prop="productModel" label="产品型号"> </el-table-column>
        <el-table-column prop="bobbinName" label="线轴"> </el-table-column>
        <el-table-column prop="lengthM" label="长度/m"> </el-table-column>
        <el-table-column prop="pageNum" label="选定数量"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="delDialog(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogNext">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增抽检" :visible.sync="dialogNextVisible" width="60%"  >
      <span>已选择待抽检成品</span>
      <el-table :data="listData" style="width: 100%" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }">
        <el-table-column prop="ppNumber" label="生产批号"> </el-table-column>
        <el-table-column prop="productModel" label="产品型号"> </el-table-column>
        <el-table-column prop="bobbinName" label="线轴"> </el-table-column>
        <el-table-column prop="lengthM" label="长度/m"> </el-table-column>
        <el-table-column prop="pageNum" label="选定数量"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="delDialog(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form   label-width="120px" style="margin-top:30px;">
        <el-form-item label="抽检报告名称">
          <el-input v-model="form.findName" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="抽检生产批号">
         {{listData[0]?listData[0].ppNumber:''}}
        </el-form-item>
        <el-form-item label="进检验轴数">
          {{listData[0]?listData[0].pageNum:''}}
        </el-form-item>
        <el-form-item label="抽检轴数">
          <el-input v-model="form.pageNum" style="width:30%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNextVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogNextConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      form:{
        pageNum:'',
        findName:'',
        findById:'',
        findIdOne:'',
        pageSize:'',
      },
      tableData: [],
      dialogVisible: false,
      OneList: [],
      TwoList: [],
      row: {},
      listData: [],
      dialogNextVisible: false,
      submitForm:{
        findName:'',
        pageNum:1,
        pageSize:10
      },
      total:0,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    toInfo( id){
      this.$router.push({
        path:'/samplingInfo',
        query:{
          id:id
        }
      })
    },
    // 编辑页面
    edit(id){
      this.$router.push({
        path:"/addSampling",
        query:{
          id:id
        }
      })
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
      const { data: res } = await this.$http.post('templatesController/updateTSamplingReportById',{
        updateID:id,
        updateType:'D'
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },
    // 获取页面初始数据
    async getData(){
      const { data: res } = await this.$http.post('templatesController/getAllTSamplingReport',this.submitForm)
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.total=res.data.total
      this.tableData=res.data.list
    },
    // 确认跳转
    dialogNextConfirm(){
      this.form.findById=this.listData[0].leftId
      this.form.findIdOne=this.listData[0].id
      this.form.pageSize=this.listData[0].pageNum
      if(!this.form.findName||!this.form.pageNum){
        return this.$message.error("请填写必要信息")
      }
      if(Number(this.form.pageNum)>Number(this.listData[0].pageNum)){
        return this.$message.error("抽检数不能大于进检数")
      }
      sessionStorage.setItem("samplinginspection",JSON.stringify(this.form))
      this.$router.push("/addSampling")
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
    dialogNext() {
      this.dialogVisible = false
      this.dialogNextVisible = true
    },
    // 对话框确认
    dialogConfirm() {
      if (!this.listData.length) {
        return this.$message.error('请填写选定数量')
      }
      sessionStorage.setItem('detour', JSON.stringify(this.listData))
      this.$router.push('/detourDetail')
    },
    // 添加数据合并
    addAllData() {
      if (this.listData.length > 0) {
        return
      }
      let arr=this.TwoList.filter((item, index) => item.pageNum > 0 && item.numbers >= item.pageNum  )
      if(arr.length>1){
        return this.$message.error("只能选择一项")
      }
      this.listData.push(..._.cloneDeep(arr))

      this.listData.forEach(item => {
        item.leftId = this.row.id
        item.ppNumber = this.row.ppNumber
        item.productModel = this.row.productModel
      })
    },
    // 监听行点击
    async rowClick(row) {
      this.row = row
      const { data: res } = await this.$http.post('ProductionController/getFinishedByPPPId', {
        findById: row.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.TwoList = res.data.twoList
    },
    // 监听对话框关闭
    dialogClose() {
      this.listData = []
    },
    //   打开新增抽检的对话框
    async showDialog() {
      this.dialogVisible = true
      const { data: res } = await this.$http.post('ProductionController/getAllFinished')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.OneList = res.data.oneList
      this.TwoList = res.data.twoList
      this.rowClick(this.OneList[0])
    },
    handleSizeChange(val) {
      this.submitForm.pageSize=val
      this.getData()
    },
    handleCurrentChange(val) {
      this.submitForm.pageNum=val
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  margin: 60px;
}
/deep/.el-table::before {//去掉最下面的那一条线
	height: 0px;
}

</style>
