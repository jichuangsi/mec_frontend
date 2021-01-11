<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有设备" name="first">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="20">
              
              <el-col :span="6">
                <el-form-item label="设备型号">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态">
                  <el-select placeholder="请选择" v-model="submitForm.findIdOne" @change="getData">
                    <el-option label="全部" :value="2"></el-option>
                    <el-option label="已检修" :value="1"></el-option>
                    <el-option label="未检修" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="getData">筛选</el-button>
                <el-button @click="toAddEquip()">新增</el-button>
                <el-button style="border:none" plain @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="equipmentName" label="设备名称"> </el-table-column>
              <el-table-column prop="equipmentModel" label="设备型号"> </el-table-column>
              <el-table-column prop="equipmentNumber" label="设备编号"> </el-table-column>
              <el-table-column label="检修状态(当日)">
                <template slot-scope="scope">
                  {{ scope.row.checkNo == 0 ? '未检修' : '已检修' }}
                </template>
              </el-table-column>
              <el-table-column label="启用状态">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1" @change="switchChange(scope.row.id)"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="320px">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toEquipMaintain(scope.row.id)">
                    检修
                  </el-button>
                  <el-button type="success" size="mini" @click="toReportRepair(scope.row)">
                    报修
                  </el-button>
                  <el-button type="warning" size="mini" @click="toAddEquip(scope.row.id)">
                    编辑
                  </el-button>
                  <el-button type="danger" size="mini" @click="del(scope.row.id)">
                    删除
                  </el-button>
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
        </template>
      </el-tab-pane>
      <el-tab-pane label="报修设置" name="BX">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="20">
              <el-col :span="20">
                <span style="color:red;font-size:14px;">*审核层级按数字由小到大排序，数字越小越先审核，如：审核层级为1的人先审核，然后按数字依次审核。</span>
              </el-col>
              <el-col :span="4" >
                <el-button type="primary" @click="showDialog">新增</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData2" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="levelName" label="层级名称"> </el-table-column>
              <el-table-column prop="auditLevel" label="审核层级"> </el-table-column>
              <el-table-column prop="staffName" label="审核人"> </el-table-column>
              <el-table-column prop="staffPost" label="审核职称"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="warning" size="mini" @click="showDialog(scope.row.id)">
                    编辑
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="submitForm2.pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="submitForm2.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="dialogClose">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="层级名称">
          <el-select style="width:60%;" v-model="form.levelName" placeholder="请选择 " @change="levelNameChange">
            <el-option label="验收人" value="验收人"></el-option>
            <el-option label="维修人" value="维修人"></el-option>
            <el-option label="负责人" value="负责人"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核层级">
          <el-input v-model="form.auditLevel" style="width:60%;" type="number" ></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-select v-model="form.staffId" placeholder="请选择" style="width:60%;" @change="selectedChange">
            <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in auditXiaLa" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核人职称">
          <el-input v-model="form.staffPost" disabled style="width:60%;"></el-input>
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
      activeName: 'first',
      form: {
        levelName: '',
        auditLevel: '',
        staffId: '',
        staffPost: ''
      },
      tableData: [],
      tableData2: [],
      total: 0,
      submitForm: {
        findName: '',
        findIdOne: 2,
        pageNum: 1,
        pageSize: 10
      },
      submitForm2: {
        findModelName: 'BX',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      id: -1,
      auditXiaLa: []
    }
  },
  created() {
    if (sessionStorage.getItem('maintainmanage')) {
      this.activeName = sessionStorage.getItem('maintainmanage')
    }
    this.getData()
  },
  methods: {
    toEquipMaintain(id) {
      this.$router.push({
        path:'/equipMaintain',
        query:{
          id:id
        }
      })
    },
    levelNameChange(e) {
      switch (e) {
        case '验收人':
          this.form.auditLevel = 3
          break
        case '维修人':
          this.form.auditLevel = 2
          break
        case '负责人':
          this.form.auditLevel = 1
          break
        default:
          break
      }
    },
    //下拉框发生改变
    selectedChange(e) {
      this.auditXiaLa.forEach(item => {
        if (item.mapKey == e) {
          this.form.staffPost = item.mapliandong
        }
      })
    },
    // 监听对话框关闭
    dialogClose() {
      this.form = {
        levelName: '',
        auditLevel: '',
        staffId: '',
        staffPost: ''
      }
      this.id = -1
    },
    //确认添加对话框
    async dialogConfirm() {
      if (this.id >= 0) {
        this.form.id = this.id
      }
      this.form.auditType = 'BX'
      const { data: res } = await this.$http.post('AuditController/saveAudit', this.form)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success(this.id >= 0 ? '编辑成功' : '新增成功')
      this.dialogVisible = false
      this.getData()
    },
    //展示对话框
    async showDialog(id = -1) {
      if (id >= 0) {
        this.id = id
        const { data: res } = await this.$http.post('AuditController/findAllAuditById', { findById: id })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.form = res.data
        this.selectedChange(this.form.staffId)
      }
      const { data: res } = await this.$http.post('AuditController/getAuditBasicInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.auditXiaLa = res.data.auditXiaLa
      this.dialogVisible = true
    },
    //删除操作
    async del(id) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('BasicSettingController/updateEquipmentStateById', {
        updateID: id,
        updateType: 'D'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },
    // 前往新增设备页面
    toAddEquip(id = -1) {
      this.$router.push({
        path: '/addEquipment',
        query: {
          id: id
        }
      })
    },
    // 修改状态
    async switchChange(id) {
      const { data: res } = await this.$http.post('BasicSettingController/updateEquipmentStateById', {
        updateID: id,
        updateType: 'S'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('修改成功')
      this.getData()
    },
    // 清空筛选条件
    clear() {
      this.submitForm.findName = ''
      this.submitForm.findIdOne = 2
    },
    // 获取页面的初始数据
    async getData() {
      if (this.activeName == 'first') {
        const { data: res } = await this.$http.post('BasicSettingController/getAllEquipment', this.submitForm)
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.total = res.data.total
        this.tableData = res.data.list
      } else {
        const { data: res } = await this.$http.post('AuditController/findAllAudit', this.submitForm2)
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.total = res.data.total
        this.tableData2 = res.data.list
      }
    },
    handleClick(tab, event) {
      sessionStorage.setItem('maintainmanage', this.activeName)
      this.getData()
    },
    toReportRepair(row) {
      this.$router.push({
        path: '/reportRepair',
        query: {
          id: row.id
        }
      })

      sessionStorage.setItem('maintainManageRow', JSON.stringify(row))
    },
    handleSizeChange(e) {
      if (this.activeName == 'first') {
        this.submitForm.pageSize = e
      } else {
        this.submitForm2.pageSize = e
      }
      this.getData()
    },
    handleCurrentChange(e) {
      if (this.activeName == 'first') {
        this.submitForm.pageNum = e
      } else {
        this.submitForm2.pageNum = e
      }
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  width: 100%;
  position: relative;
  .nav {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
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
      bottom: -8px;
      border-radius: 4px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .el-form {
    margin-top: 30px;
  }
  .el-button {
    margin-right: 10px;
  }
  .el-pagination {
    margin: 60px;
  }
}
</style>
