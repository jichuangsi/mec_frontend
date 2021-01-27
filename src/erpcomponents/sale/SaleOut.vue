<template>
  <el-card>
    <el-form ref="form" label-width="80px">
      <el-row :gutter="40">
        <el-col :span="6">
          <el-form-item label="订单编号">
            <el-input v-model="firstSubmitForm.findName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开单时间">
            <el-date-picker v-model="firstSubmitForm.findDate" type="date" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="6">
          <el-button type="primary" @click="getData()">筛选</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="text" @click="clearFirstSubmitForm">清空筛选</el-button>
        </el-col>
      </el-row>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="firstTableData" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="createTime" label="开单时间">
          <template slot-scope="scope">
            {{scope.row.createTime|dateFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="saleOrder" label="销售单号"> </el-table-column>
        <el-table-column prop="customer" label="客户"> </el-table-column>
        <el-table-column prop="orderSum" label="订单总金额(元)"> </el-table-column>
        <el-table-column prop="staffName" label="负责人"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="orderStates" label="订单状态"> </el-table-column>
        <el-table-column prop="checkStates" label="审核状态"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toDetail(scope.row.id)" :disabled="rolePowerList.indexOf(75)==-1">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="firstSubmitForm.pageNum" :page-sizes="[5, 10,15, 20]" :page-size="firstSubmitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>

    <!-- 新增或编辑的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="dialogClose">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="层级名称" prop="levelName">
          <el-input v-model="form.levelName" style="width:53%;"></el-input>
        </el-form-item>
        <el-form-item label="审核层级" prop="auditLevel">
          <el-input v-model="form.auditLevel" style="width:53%;" type="number"></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="staffId">
          <el-select v-model="form.staffId" placeholder="请选择活动区域" @change="selectedChange">
            <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in auditXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核人职称" prop="staffPost">
          <el-input v-model="form.staffPost" disabled style="width:53%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
     
      total: 0,
      dialogVisible: false,
      form: {
        auditLevel: '',
        id: '',
        levelName: '',
        staffId: '',
        staffPost: ''
      },
      auditXiaLa: [], //审核人的下拉框
      firstSubmitForm: {
        findDate: '',
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      firstTableData: [],
      rolePowerList:[],
    }
  },
  created() {
    this.rolePowerList=JSON.parse(sessionStorage.getItem("rolePowerList"))
    this.getData()
  },
  methods: {
    handleSizeChange(newSize) {
      this.firstSubmitForm.pageSize = newSize
      this.getData()
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.firstSubmitForm.pageNum = newPage
      this.getData()
    },
    // 清空搜索条件
    clearFirstSubmitForm() {
      this.firstSubmitForm = {
        findDate: '',
        findName: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    // 监听对话框关闭
    dialogClose() {
      this.$refs.form.resetFileds()
    },
    // 点击确认添加
    async dialogConfirm() {
      this.form.auditType = 'XX'
      const { data: res } = await this.$http.post('AuditController/saveAudit', this.form)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success(this.form > 0 ? '编辑成功' : '新增成功')
      this.dialogVisible = false
      this.getData()
    },
    //选中项发生联动
    selectedChange(e) {
      this.auditXiaLa.forEach(item => {
        if (item.mapKey == e) {
          this.form.staffPost = item.mapliandong
        }
      })
    },
    //获取下拉框数据
    async getSelecteds() {
      const { data: res } = await this.$http.post('AuditController/getAuditBasicInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.auditXiaLa = res.data.auditXiaLa
    },
    // 点击新增或编辑
    async add(id = -1) {
      this.dialogVisible = true
      this.getSelecteds()
      if (id >= 0) {
        const { data: res } = await this.$http.post('AuditController/findAllAuditById', {
          findById: id
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.form = res.data
      }
    },
    // 点击tab栏标签
    handleClick() {
      this.getData()
      sessionStorage.setItem('saleorderreview', this.activeName)
    },
    toDetail(id) {
      this.$router.push({
        path: '/saleOutDetail',
        query: {
          id: id
        }
      })
    },
    // 获取页面的初始数据
    async getData() {
        const { data: res } = await this.$http.post('saleController/getAllSale', this.firstSubmitForm)
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.total = res.data.total
        this.firstTableData = res.data.list
      
    }
  }
}
</script>
<style lang="less" scoped>
.tips {
  color: #e0001b;
  font-size: 12px;
}
</style>
