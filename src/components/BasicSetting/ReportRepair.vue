<template>
  <el-card>
    <el-row :gutter="20">
      <el-form label-width="80px">
        <el-col :span="4">
          <el-form-item label="报修单号">
            <el-input v-model="submitForm.findName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select placeholder="请选择" v-model="submitForm.findIdOne" @change="selectedChange">
              <el-option label="全部" :value="4"></el-option>
              <el-option label="待处理" :value="0"></el-option>
              <el-option label="待维修" :value="1"></el-option>
              <el-option label="待检验" :value="2"></el-option>
              <el-option label="已完成" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="4">
          <el-button type="primary" @click="getData">筛选</el-button>
          <el-button @click="deal()">新增</el-button>
          <el-button type="text" @click="clear">清空筛选</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="createTime" label="报修时间"> </el-table-column>
      <el-table-column prop="repairReportNumber" label="报修单号"> </el-table-column>
      <el-table-column prop="equipmentName" label="设备名称"> </el-table-column>
      <el-table-column prop="equipmentModel" label="设备型号"> </el-table-column>
      <el-table-column prop="equipmentNumber" label="设备编号"> </el-table-column>
      <el-table-column prop="stateName" label="报修状态"> </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="deal(scope.row.id)">处理</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
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
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      submitForm: {
        findName: '',
        findIdOne: 4,
        pageNum: 1,
        pageSize: 10,
        findById: ''
      },
      total: 0
    }
  },
  created() {
    this.submitForm.findById = this.$route.query.id
    this.getData()
  },
  methods: {
    async del(id){
            const confirmResult = await this.$confirm(
                '是否确认删除？',
                '提示',
                {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }
            ).catch(err => err)

            if (confirmResult !== 'confirm') {
                return 
            }
            const { data: res } = await this.$http.post('BasicSettingController/updateRepairReportStateById', {
              updateID:id,
              updateType:'D'
            })
            if (res.code !== '0010') return this.$message.error(res.msg)
            this.$message.success('删除成功')
            this.getData()
      },
    clear() {
      this.submitForm.findName = ''
      this.submitForm.findIdOne= 4
    },
    //下拉框发生变化
    selectedChange() {
      this.getData()
    },
    async getData() {
      const { data: res } = await this.$http.post('BasicSettingController/getAllRepairReport', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.total = res.data.total
      this.tableData = res.data.list
    },

    // 前往处理页面
    deal(id) {
      if (id) {
        this.$router.push({
          path: '/addRepair',
          query: {
            id: id
          }
        })
      } else {
        this.$router.push('/addRepair')
      }
    },
    handleSizeChange(e) {
      this.submitForm.pageSize = e
    },
    handleCurrentChange(e) {
      this.submitForm.pageNum = e
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  margin: 60px;
}
</style>
