<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="生产计划审核" name="first">
        <template>
          <el-form ref="form" label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="生产单号">
                  <el-input style="width:80%;" v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="生产日期">
                  <el-date-picker v-model="submitForm.findDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="6">
                <el-button type="primary" @click="getData">筛选</el-button>
                <el-button type="primary" plain @click="dialogVisible = true">导出</el-button>
                <el-button type="text" @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="saleOrder" label="关联销售单号"> </el-table-column>
              <el-table-column prop="ppNumber" label="生产单号"> </el-table-column>
              <el-table-column prop="ppName" label="生产计划单名称"> </el-table-column>
              <el-table-column prop="createTime" label="计划下达日期">
                  <template slot-scope="scope">
                      {{scope.row.createTime|dateFormat}}
                  </template>
              </el-table-column>
              <el-table-column prop="finishedTime" label="计划完工日期">
                  <template slot-scope="scope">
                      {{scope.row.finishedTime|dateFormat}}
                  </template>
              </el-table-column>
              <el-table-column prop="ppstate" label="审核状态"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toDatail(scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-tab-pane>
      <el-tab-pane label="审核设置" name="second">
        <template>
          <el-form ref="form" label-width="80px">
            <el-row :gutter="40">
              
              <el-col :span="18">
                <span class="tips">*审核层级按数字由小到大排序，数字越小越先审核，如：审核层级为1的人先审核，然后按数字依次审核。</span>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData1" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="levelName" label="层级名称"> </el-table-column>
              <el-table-column prop="auditLevel" label="审核层级"> </el-table-column>
              <el-table-column prop="staffName" label="审核人"> </el-table-column>
              <el-table-column prop="staffPost" label="审核人职称"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="showDialog(scope.row.id)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="submitForm1.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm1.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="id >= 0 ? '编辑' : '新增'" :visible.sync="addDialogVisible" width="40%" @close="dialogClose">
      <el-form label-width="120px" style="width:500px;">
        <el-form-item label="层级名称">
          <el-input v-model="row.levelName" placeholder="请输入 "></el-input>
        </el-form-item>
        <el-form-item label="审核层级">
          <el-input v-model="row.auditLevel" placeholder="请输入 " type="number"></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-select v-model="row.staffId" placeholder="请选择" style="width:100%;" @change="selectedChange">
            <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in auditXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核人职称">
          <el-input v-model="row.staffPost" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisibleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      value1: '',
      form: {
        name: ''
      },
      addDialogVisible: false,
      activeName: 'first',
      tableData: [],
      tableData1: [],
      submitForm: {
        findDate: '',
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      submitForm1: {
        findModelName: 'PP',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      row: {
        auditLevel: '', //审核层级
        id: '', //新增时不需要此字段。修改时需要
        levelName: '', //层级名称
        staffId: '', //审核人id
        staffName: '', //审核人
        staffPost: '' //审核人职称
      },
      id: -1,
      auditXiaLa: []
    }
  },
  created() {
    if (sessionStorage.getItem('examine')) {
      this.activeName = sessionStorage.getItem('examine')
    }
    this.getData()
  },
  methods: {
    //   关闭对话框
    dialogClose() {
      this.row = {
        auditLevel: '', //审核层级
        id: '', //新增时不需要此字段。修改时需要
        levelName: '', //层级名称
        staffId: '', //审核人id
        staffName: '', //审核人
        staffPost: '' //审核人职称
      }
      this.id = -1
    },
    //对话框确认
    async addDialogVisibleConfirm() {
      if (this.id >= 0) {
        this.row.id = this.id
      }
      this.row.auditType='PP'
      const { data: res } = await this.$http.post('AuditController/saveAudit', this.row)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success(this.id >= 0 ? '编辑成功' : '新增成功')
      this.addDialogVisible = false
    this.getData()
    },
    //   下拉框发生变化
    selectedChange(e) {
      this.auditXiaLa.forEach(item => {
        if (item.mapKey === e) {
          this.row.staffPost = item.mapliandong
        }
      })
    },
    //   获取审核设置下拉框数据
    async getSelecteds() {
      const { data: res } = await this.$http.post('AuditController/getAuditBasicInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.auditXiaLa = res.data.auditXiaLa
      if (this.id >= 0) {
        const { data: res } = await this.$http.post('AuditController/findAllAuditById', {
          findById: this.id
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.row = res.data
        this.selectedChange(this.row.staffId) 
      }
    },
    //   点击编辑
    async showDialog(id = -1) {
      this.id = id
      this.getSelecteds()
      
      this.addDialogVisible = true
    },
    handleClick() {
      sessionStorage.setItem('examine', this.activeName)
      this.getData()
    },
    //   点击查看
    toDatail(id) {
      this.$router.push({
        path: '/examine/detail',
        query: {
          id: id
        }
      })
    },
    //   清空筛选条件
    clear() {
      this.submitForm = {
        findDate: '',
        findName: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    //   获取页面初始数据
    async getData() {
      if (this.activeName == 'first') {
        const { data: res } = await this.$http.post('ProductionPlanController/getAllProductPlan', this.submitForm)
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      } else {
        const { data: res } = await this.$http.post('AuditController/findAllAudit', this.submitForm1)
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.tableData1 = res.data.list
        this.total = res.data.total
      }
    },
    toggle(status) {
      this.status = status
    },
    toDetail() {
      this.$router.push('/examine/detail')
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  width: 100%;
  height: 99%;
  position: relative;
  .nav {
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 24px;
    text-align: center;
  }
  .current {
    position: relative;
    color: #0790ff;
    &:after {
      content: ' ';
      width: 90px;
      height: 4px;
      background: #0790ff;
      position: absolute;
      bottom: -7px;
      border-radius: 4px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .el-pagination {
    margin-top: 40px;
    margin-left: 200px;
  }
}
.tips {
  color: #e0001b;
  font-size: 12px;
}
</style>
