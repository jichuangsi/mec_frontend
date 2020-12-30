<template>
  <el-card>
    <el-row>
      <el-col :span="3"><div class="item current">供应商管理</div></el-col>
      <el-col :span="3"><div class="item" @click="todo('/client')">客户管理</div></el-col>
    </el-row>
    <el-form ref="form" label-width="120px" v-model="form">
      <el-row>
        <el-col :span="6">
          <el-form-item label="供应商名称">
            <el-input v-model="form.findName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" :offset="12">
          <el-button type="primary" @click="getData">筛选</el-button>
          <el-button @click="addSupplier()">新增</el-button>
          <el-button type="text" @click="clear">清空筛选</el-button>
        </el-col>
      </el-row>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%;margin-top:0">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="customerNumber" label="供应商编号"> </el-table-column>
        <el-table-column prop="customerName" label="供应商名称"> </el-table-column>
        <el-table-column prop="contactsMan" label="联系人"> </el-table-column>
        <el-table-column prop="contactsPhone" label="联系电话"> </el-table-column>
        <el-table-column prop="staffName" label="创建人"> </el-table-column>
        <el-table-column label="供应商状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" @change="switchChange(scope.row)" :active-value="1" :inactive-value="0"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="addSupplier(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination :current-page="form.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </el-card>
</template>
<script>
export default {
  inject: ['reload'],
  data() {
    return {
      form: {
        findName: '',
        pageNum: 1,
        pageSize: 5
      },
      total: 5,
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 删除操作
    async del(row) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除！')
      }
      let obj = {
        updateType: 'D',
        updateID: row.id
      }
      const { data: res } = await this.$http.post('SysController/updateCustomerById', obj)
      if (res.code !== '0010') {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('删除成功！')
        this.getData()
      }
    },
    // 改变状态
    async switchChange(row) {
      let obj = {}
      obj.updateID = row.id
      obj.updateType = 'S'
      const { data: res } = await this.$http.post('SysController/updateCustomerById', obj)
      if (res.code !== '0010') {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('更新状态成功！')
      }
    },
    // 点击清空
    clear() {
      this.form.findName = ''
    },
    // 获取页面初始数据
    async getData() {
      const { data: res } = await this.$http.post('SysController/findCustomer?clientNo=0', this.form)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.total = res.data.total
      this.tableData = res.data.list
    },
    // 点击新增
    addSupplier(id = '') {
      if (id) {
        this.$router.push({
          path: '/addsupplier',
          query: {
            id: id
          }
        })
      } else {
        this.$router.push('/addsupplier')
      }
    },
    // 跳转页面
    todo(path) {
      window.sessionStorage.setItem('activePath', path)
      this.$router.push(path)
      this.reload()
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
      width: 100px;
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
