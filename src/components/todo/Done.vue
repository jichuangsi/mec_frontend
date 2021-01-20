<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="card-top  " @click="todo('/todo')">待办事项</div>
      </el-col>
      <el-col :span="3">
        <div class="card-top " @click="todo('/doing')">进行事项</div>
      </el-col>
      <el-col :span="3">
        <div class="card-top current" >完成事项</div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin:30px 0;">
      <el-col :span="2" style="margin-top:10px;">待办事项</el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="submitForm.findName"  clearable>
          <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="createTime" label="时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="matterNews" label="待办事项"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="toDetail(scope.row.type)">前往</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </el-card>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      query: '',
      tableData: [],
      submitForm: {
        findName:'',
        findById: 3,
        pageNum: 1,
        pageSize: 10
      },
      total:0,
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

    async getData() {
      const { data: res } = await this.$http.post('HomeController/findMattersByState', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.tableData = res.data.list
      this.total = res.data.total
    },
    todo(path) {
      window.sessionStorage.setItem('activePath', path)
      this.$router.push(path)
      this.reload()
    },
    toDetail(type) {
      switch (type) {
        case 1:
          this.$router.push('/orderreview')
          this.saveNavState('/orderreview')
          break
        case 2:
          this.$router.push('/incominginspection')
          this.saveNavState('/incominginspection')
          break
        case 3:
          this.$router.push('/saleOrderReview')
          this.saveNavState('/saleOrderReview')
          break
        case 4:
          this.$router.push('/saleOrderBack')
          this.saveNavState('/saleOrderBack')
          break
        default:
          break
      }
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  }
}
</script>
<style lang="less" scoped>
.box-card {
  width: 100%;
  position: relative;
  .card-top {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
  .current {
    position: relative;
    color: #0790ff;
    &:after {
      content: ' ';
      width: 56px;
      height: 5px;
      background: #0790ff;
      position: absolute;
      bottom: -10px;
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
