<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="2"><div class="item " @click="todo('/melting')">熔炼</div></el-col>
      <el-col :span="2"><div class="item " @click="todo('/roughDrawing')">粗拉</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/mediumPull')">中拉</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/thinPull')">半成品</div></el-col>
      <el-col :span="2"><div class="item" @click="todo('/superThinPull')">成品</div></el-col>
      <el-col :span="2"><div class="item current">转退火</div></el-col>
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
        <el-table-column label="操作" width="300">
          <template slot-scope="scope" >
            <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">查看</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </el-card>
</template>
<script>
export default {
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      submitForm: {
        findById: 6,
        findDate: '',
        findModelName: '',
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    toFeeding(){
      this.$router.push("/backFireFeeding")
    },
    clear() {
      this.submitForm = {
        findById: 6,
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

    toDetail(id) {
      this.$router.push({
        path:'addBackFire',
        query:{
          Eid:id
        }
      })
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
}
</style>
