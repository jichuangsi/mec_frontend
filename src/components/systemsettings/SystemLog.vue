<template>
  <el-card>
    <el-form :inline="true" label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="submitForm.findName" placeholder="请输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="submitForm.findIdOne">
          <el-option label="全部" :value="0"></el-option>
          <el-option label="成功" :value="1"></el-option>
          <el-option label="失败" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left:40%;">
        <el-button type="primary" @click="getData">筛选</el-button>
        <el-button type="primary" plain v-if=" rolePowerList.indexOf(36)>=0">导出</el-button>
        <el-button type="text" @click="clear">清空筛选</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录日志" name="1">
        <template>
          <el-table  :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
              <template slot-scope="scope">
                {{ scope.row.createTime | dateFormat }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="用户名"> </el-table-column>
            <el-table-column prop="operates" label="用户操作"> </el-table-column>
            <el-table-column prop="loginState" label="状态">
              <template slot-scope="scope">
                {{ scope.row.loginState == 1 ? '成功' : '失败' }}
              </template>
            </el-table-column>
            <el-table-column prop="userAgent" label="User-Agent" width="500" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="operaterIp" label="操作IP"> </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="2">
        <template>
          <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
              <template slot-scope="scope">
                {{ scope.row.createTime | dateFormat }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="用户名"> </el-table-column>
            <el-table-column prop="operates" label="用户操作"  :show-overflow-tooltip='true'> </el-table-column>
            <el-table-column prop="requestURL" label="请求URL"  show-overflow-tooltip> </el-table-column>
            <el-table-column prop="requestMode" label="请求方式"> </el-table-column>
            <el-table-column prop="requestParam" label="请求参数" :show-overflow-tooltip='true'> </el-table-column>
            <el-table-column prop="requestTime" label="请求时长（毫秒）"> </el-table-column>
            <el-table-column prop="userAgent" label="User-Agent" width="400" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="operaterIp" label="操作IP"> </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
      <el-tab-pane label="异常日志" name="3">
        <template>
          <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
              <template slot-scope="scope">
                {{ scope.row.createTime | dateFormat }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="用户名"> </el-table-column>
            <el-table-column prop="requestURL" label="请求URL" width="300"> </el-table-column>
            <el-table-column prop="requestMode" label="请求方式"> </el-table-column>
            <el-table-column prop="requestParam" label="请求参数"  :show-overflow-tooltip='true'> </el-table-column>
            <el-table-column prop="userAgent" label="User-Agent"  width="200"  :show-overflow-tooltip='true'> </el-table-column>
            <el-table-column prop="operaterIp" label="操作IP"> </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
    </el-tabs>
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
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeName: '1',
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      submitForm: {
        findById: 1,
        findName: '',
        findIdOne: 0,
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      rolePowerList:[],
    }
  },
  created() {
    this.rolePowerList=JSON.parse(sessionStorage.getItem("rolePowerList"))
    if (sessionStorage.getItem('systemlog')) {
      this.activeName = sessionStorage.getItem('systemlog')
    }
    this.getData()
  },
  methods: {
    clear() {
      this.submitForm = {
        findById: 1,
        findName: '',
        findIdOne: 0,
        pageNum: 1,
        pageSize: 10
      }
    },
    //   获取页面初始数据
    async getData() {
      this.submitForm.findById = this.activeName
      const { data: res } = await this.$http.post('operLogController/getOperLogByPage', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.total = res.data.total
      this.tableData = res.data.list
    },

    handleClick() {
      sessionStorage.setItem('systemlog', this.activeName)
      this.getData()
    },
    handleSizeChange(val) {
      this.submitForm.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.submitForm.pageNum = val
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped></style>
