<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="2"><div class="item " @click="todo('/melting')">熔炼</div></el-col>
      <el-col :span="2"><div class="item " @click="todo('/roughDrawing')">粗拉</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/mediumPull')">中拉</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/thinPull')">半成品</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/superThinPull')">成品</div></el-col>
      <el-col :span="2"><div class="item " @click="todo('/backFire')">转退火</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/winding')">绕线</div></el-col>
      <el-col :span="2"><div class="item current">成品改绕</div></el-col>
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
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="submitForm.findDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- <el-button type="primary" @click="showDialog" plain>新增</el-button> -->
          <el-button type="primary" @click="getData">筛选</el-button>
          <!-- <el-button @click="clear">清空</el-button> -->
          <el-button @click="toFeeding">生产投料</el-button>
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
            <el-button type="primary" size="mini" @click="toAddMedium(scope.row.id)">查看</el-button>

            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
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
    <el-dialog title="新增改绕" :visible.sync="dialogVisible" width="60%" @close="dialogClose">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-table :data="OneList" style="width: 100%" height="300px" :cell-style="{ padding: '5px 0' }" highlight-current-row :header-cell-style="{ background: '#f0f5ff', padding: '0' }" @row-click="rowClick">
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
          <el-button size="mini"  @click="addAllData()">添加</el-button>
        </el-col>
      </el-row>
      <el-table :data="listData" style="width: 100%" :cell-style="{padding: '5px 0'}"
                :header-cell-style="{background:'#f0f5ff',padding:'0'}">
        <el-table-column prop="ppNumber" label="生产批号" > </el-table-column>
        <el-table-column prop="productModel" label="产品型号" > </el-table-column>
        <el-table-column prop="bobbinName" label="线轴"> </el-table-column>
        <el-table-column prop="lengthM" label="长度/m"> </el-table-column>
        <el-table-column prop="pageNum" label="已选定数量"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="delDialog(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import _ from 'lodash'
export default {
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      submitForm: {
        findById: 9,
        findDate: '',
        findModelName: '',
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      dialogVisible: false,
      TwoList: [],
      OneList: [],
      row:{},
      listData:[],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    toFeeding(){
      this.$router.push("/detourFeeding")
    },
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
      const { data: res } = await this.$http.post('ProductionController/updatePPPByPPPId',{
        updateID:id,
        updateType:'D'
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },
    // 对话框删除
    async delDialog(index){
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
    // 对话框确认
    dialogConfirm(){
      if(!this.listData.length){
        return this.$message.error("请填写选定数量")
      }
      sessionStorage.setItem('detour',JSON.stringify(this.listData))
      this.$router.push('/detourDetail')
    },
    // 监听对话框关闭
    dialogClose(){
      this.listData=[]
    },
    // 添加数据合并
    addAllData(){ 
      this.listData.push(..._.cloneDeep(this.TwoList.filter(item => item.pageNum > 0 && item.numbers>=item.pageNum)))
      
      this.listData.forEach(item=>{
        item.leftId=this.row.id
        item.ppNumber=this.row.ppNumber
        item.productModel=this.row.productModel
      })
      
    },
    // 监听行点击
    async rowClick(row) {
      this.row=row
      const { data: res } = await this.$http.post('ProductionController/getFinishedByPPPId', {
        findById: row.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.TwoList = res.data.twoList
    },
    // 点击新增
    async showDialog() {
      this.dialogVisible = true
      const { data: res } = await this.$http.post('ProductionController/getAllFinished')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.OneList = res.data.oneList
      this.TwoList = res.data.twoList
      this.rowClick(this.OneList[0])
    },
    clear() {
      this.submitForm = {
        findById: 9,
        findDate: '',
        findModelName: '',
        findName: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    //   获取页面初始数据
    async getData() {
      const { data: res } = await this.$http.post('ProductionController/getAllPPProduction', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.tableData = res.data.list
      this.total = res.data.total
    },
    // 跳转页面
    todo(path) {
      window.sessionStorage.setItem('activePath', path)
      this.$router.push(path)
      this.reload()
    },

    toAddMedium(id) {
      this.$router.push({
        path:'/detourDetail',
        query:{
          id:id
        }
      })
    },
    handleSizeChange(e) {
      this.submitForm.pageSize = e
      this.getData()
    },
    handleCurrentChange(e) {
      this.submitForm.pageNum = e
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
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    margin-bottom: 30px;
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
    margin: 60px;
  }
  /deep/.el-table::before {//去掉最下面的那一条线
	height: 0px;
}
}
</style>
