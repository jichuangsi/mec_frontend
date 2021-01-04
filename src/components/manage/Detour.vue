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
            <el-input v-model="submitForm.findDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="showDialog" plain>新增</el-button>
          <el-button type="primary" @click="getData">筛选</el-button>
          <el-button @click="clear">清空</el-button>
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
          <template>
            <el-button type="primary" size="mini" @click="toAddMedium">查看</el-button>

            <el-button type="danger" size="mini">删除</el-button>
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
    <el-dialog title="新增改绕" :visible.sync="dialogVisible" width="60%">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-table :data="OneList" style="width: 100%" :cell-style="{ padding: '5px 0' }" highlight-current-row :header-cell-style="{ background: '#f0f5ff', padding: '0' }" @row-click="rowClick">
            <el-table-column prop="ppNumber" label="生产批号"> </el-table-column>
            <el-table-column prop="productModel" label="产品型号"> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table :data="TwoList" style="width: 100%" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }">
            <el-table-column prop="bobbinName" label="线轴"> </el-table-column>
            <el-table-column prop="lengthM" label="长度/m"> </el-table-column>
            <el-table-column prop="numbers" label="数量"> </el-table-column>
            <el-table-column label="选定数量">
              <template>
                <el-input size="mini"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin:20px 0">
        <el-col :span="3" style="font-weight:bold">待改绕产品</el-col>
        <el-col :span="3" :offset="18">
          <el-button size="mini">添加</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" :cell-style="{padding: '5px 0'}"
                :header-cell-style="{background:'#f0f5ff',padding:'0'}">
        <el-table-column prop="date" label="生产批号" > </el-table-column>
        <el-table-column prop="name" label="产品型号" > </el-table-column>
        <el-table-column prop="address" label="线轴"> </el-table-column>
        <el-table-column prop="address" label="长度/m"> </el-table-column>
        <el-table-column prop="address" label="已选定数量"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
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
      OneList: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 监听行点击
    async rowClick(row) {
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

    toAddMedium() {
      this.$router.push('/addMediumPull')
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
}
</style>
