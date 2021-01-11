<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="员工管理" name="staff">
        <template>
          <el-form :inline="true" :model="submitForm">
            <el-form-item label="员工姓名">
              <el-input v-model="submitForm.findName" placeholder="请输入搜索内容"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-select v-model="submitForm.findIdOne" placeholder="全部">
                <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in selectedArray" :key="item.mapKey"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left:35%;">
              <el-button type="primary" @click="onScreen">筛选</el-button>
              <el-button type="primary" plain @click="onSubmit()">新增</el-button>
              <el-button type="text" @click="clearForm">清空筛选</el-button>
            </el-form-item>
          </el-form>
          <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
            <el-table-column label="序号" width="80" type="index"> </el-table-column>
            <el-table-column label="员工编号" prop="staffNum"> </el-table-column>
            <el-table-column label="员工姓名" prop="staffName"> </el-table-column>
            <el-table-column label="所属厂房" prop="workshopName"> </el-table-column>
            <el-table-column label="所属部门" prop="departmentName"> </el-table-column>
            <el-table-column label="角色" prop="roleName"> </el-table-column>
            <el-table-column label="备注" prop="staffName"> </el-table-column>
            <el-table-column label="员工状态" prop="state">
              <template slot-scope="scope">
                <el-switch @change="StateChange(scope.row)" v-model="scope.row.state" :active-value="0" :inactive-value="1"> </el-switch>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onSubmit(scope.row.id)">查看</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="submitForm.pageNum"
            :page-sizes="[5, 10, 15]"
            :page-size="submitForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="infoData.total"
          >
          </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="部门管理" name="department">
        <template>
          <el-form :inline="true" :model="submitForm">
            <el-form-item label="部门名称">
              <el-input v-model="submitForm.findName" placeholder="请输入搜索内容"></el-input>
            </el-form-item>

            <el-form-item style="margin-left:50%;">
              <el-button type="primary" @click="onScreen">筛选</el-button>
              <el-button type="primary" plain @click="onSubmit()">新增</el-button>
              <el-button type="text" @click="clearForm">清空筛选</el-button>
            </el-form-item>
          </el-form>
          <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
            <el-table-column label="序号" width="80" type="index"> </el-table-column>
            <el-table-column label="部门名称" prop="departmentName"> </el-table-column>
            <el-table-column label="部门负责人" prop="staffName"> </el-table-column>

            <el-table-column label="备注" prop="departmentRemark"> </el-table-column>
            <el-table-column label="部门状态">
              <template slot-scope="scope">
                <el-switch @change="StateChange(scope.row)" v-model="scope.row.state" :active-value="0" :inactive-value="1"> </el-switch>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini"  @click="onSubmit(scope.row.id)">查看</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="submitForm.pageNum"
            :page-sizes="[5, 10, 15]"
            :page-size="submitForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="infoData.total"
          >
          </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="职称管理" name="mesPost">
        <template>
          <el-form :inline="true" :model="formInline">
            <el-form-item label="职称名称">
              <el-input v-model="submitForm.findName" placeholder="请输入搜索内容"></el-input>
            </el-form-item>

            <el-form-item style="margin-left:50%;">
              <el-button type="primary" @click="onScreen">筛选</el-button>
              <el-button type="primary" plain @click="onSubmit()">新增</el-button>
              <el-button type="text" @click="clearForm">清空筛选</el-button>
            </el-form-item>
          </el-form>
          <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
            <el-table-column label="序号" width="80" type="index"> </el-table-column>
            <el-table-column label="职称名称" prop="postName"> </el-table-column>
            <el-table-column label="职称级别" prop="postLevel"> </el-table-column>
            <el-table-column label="职称简介" prop="remark"> </el-table-column>

            <el-table-column label="职称状态">
              <template slot-scope="scope">
                <el-switch @change="StateChange(scope.row)" v-model="scope.row.postState" :active-value="0" :inactive-value="1"> </el-switch>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onSubmit(scope.row.id)">查看</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="submitForm.pageNum"
            :page-sizes="[5, 10, 15]"
            :page-size="submitForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="infoData.total"
          >
          </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="班组管理" name="tTeam">
        <template>
          <el-form :inline="true" :model="formInline">
            <el-form-item label="班组名称">
              <el-input v-model="submitForm.findName" placeholder="请输入搜索内容"></el-input>
            </el-form-item>

            <el-form-item style="margin-left:50%;">
              <el-button type="primary" @click="onScreen">筛选</el-button>
              <el-button type="primary" plain @click="onSubmit()">新增</el-button>
              <el-button type="text" @click="clearForm">清空筛选</el-button>
            </el-form-item>
          </el-form>
          <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
            <el-table-column label="序号" width="80" type="index"> </el-table-column>
            <el-table-column label="班组名称" prop="teamName"> </el-table-column>
            <el-table-column label="班组负责人" prop="staffName"> </el-table-column>
            <el-table-column label="班次" prop="frequency"> </el-table-column>
            <el-table-column label="备注" prop="remark"> </el-table-column>

            <el-table-column label="班组状态" prop="state">
              <template slot-scope="scope">
                <el-switch @change="StateChange(scope.row)" v-model="scope.row.state" :active-value="0" :inactive-value="1"> </el-switch>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onSubmit(scope.row.id)">查看</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="submitForm.pageNum"
            :page-sizes="[5, 10, 15]"
            :page-size="submitForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="infoData.total"
          >
          </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="sRole">
        <template>
          <el-form :inline="true" :model="formInline">
            <el-form-item label="角色名称">
              <el-input v-model="submitForm.findName" placeholder="请输入搜索内容"></el-input>
            </el-form-item>

            <el-form-item style="margin-left:51%;">
              <el-button type="primary" @click="onScreen">筛选</el-button>
              <el-button type="primary" plain @click="onSubmit()">新增</el-button>
              <el-button type="text" @click="clearForm">清空筛选</el-button>
            </el-form-item>
          </el-form>
          <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
            <el-table-column label="序号" width="80" type="index"> </el-table-column>
            <el-table-column label="角色名称" prop="roleName"> </el-table-column>
            <el-table-column label="备注" prop="remark"> </el-table-column>
            <el-table-column label="角色状态" prop="state">
              <template slot-scope="scope">
                <el-switch @change="StateChange(scope.row)" v-model="scope.row.state" :active-value="0" :inactive-value="1"> </el-switch>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onSubmit(scope.row.id)">查看</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="submitForm.pageNum"
            :page-sizes="[5, 10, 15]"
            :page-size="submitForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="infoData.total"
          >
          </el-pagination>
        </template>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'staff',
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      infoData: {},
      value: true,
      submitForm: {
        findModelName: '', //需要查询的模块名字
        findName: '', //查询条件
        findIdOne: '', //下拉框的id
        pageNum: 1, //当前页
        pageSize: 10 //页面大小
      },
      selectedArray: []
    }
  },
  created() {
    if (sessionStorage.getItem('staffTabBar')) {
      this.activeName = sessionStorage.getItem('staffTabBar')
    }
    this.getData()
    this.getselected()
  },
  methods: {
    // 清空筛选
    clearForm() {
      this.submitForm.findName = ''
      this.submitForm.findIdOne = ''
    },
    // 点击筛选
    onScreen() {
      this.getData()
    },
    // 点击删除按钮
    async del(row) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除！')
      }
      const { data: res } = await this.$http.post('SysController/updateSysStateById', { findModelName: this.activeName, updateID: row.id, updateType: 'D' })
      if (res.code !== '0010') {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('删除成功！')
        this.getData()
      }
    },
    // 点击员工状态改变
    async StateChange(row) {
      const { data: res } = await this.$http.post('SysController/updateSysStateById', { findModelName: this.activeName, updateID: row.id, updateType: 'S' })
      if (res.code !== '0010') {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('修改状态成功！')
        this.getData()
      }
    },
    // 获取下拉框列表
    async getselected() {
      const { data: res } = await this.$http.post('SysController/getStaffBasicInfo', { findIdOne: 1 })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.selectedArray = res.data.bumen
    },
    // 获取页面的初始数据
    async getData() {
      this.submitForm.findModelName = this.activeName
      const { data: result } = await this.$http.post('SysController/getAllSysByName', this.submitForm)
      if (result.code !== '0010') return this.$message.error(result.msg)
      this.tableData = result.data.list
      this.infoData = result.data
      this.submitForm.findName = ''
    },
    // Tab栏切换
    handleTabClick(tab, event) {
      this.getData()
      sessionStorage.setItem('staffTabBar', this.activeName)
    },
    //   点击新增按钮
    onSubmit(id=-1) {
      switch (this.activeName) {
        case 'staff':
          this.$router.push({
              path:'/staffManagement/addStaff',
              query:{
                  id:id
              }
          })
          break
        case 'department':
          this.$router.push({
            path:'/staffManagement/addDepartment',
            query:{
              id:id
            }
          })
          break
        case 'mesPost':
          this.$router.push({
            path:'/staffManagement/addTitle',
            query:{
              id:id
            }
          })
          break
        case 'tTeam':
          this.$router.push({
            path:'/staffManagement/addClass',
            query:{
              id:id
            }
          })
          break
        case 'sRole':
          this.$router.push({
            path:'/staffManagement/addRole',
            query:{
              id:id
            }
          })
          break
        default:
          break
      }
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
<style lang="less" scoped></style>
