<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="成套模具" name="first">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="模具型号">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="线别">
                  <el-select placeholder="请选择 " v-model="submitForm.findIdOne" @change="getData">
                    <el-option :label="item.name" :value="item.id" v-for="item in XBType" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="模具状态">
                  <el-select placeholder="请选择" v-model="submitForm.findById" @change="getData">
                    <el-option label="全部" :value="2"></el-option>
                    <el-option label="正常" :value="0"></el-option>
                    <el-option label="报废" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="getData()" >筛选</el-button>
                <el-button @click="toAddMould()">新增</el-button>
                <el-button type="text" @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="stateName" label="模具状态"> </el-table-column>
              <el-table-column prop="mouldName" label="模具名称"> </el-table-column>
              <el-table-column prop="mouldModel" label="模具型号"> </el-table-column>
              <el-table-column prop="mouldNumber" label="模具编号"> </el-table-column>
              <el-table-column prop="linetypeName" label="线别"> </el-table-column>
              <el-table-column prop="wiredrawRemark" label="拉丝范围描述"> </el-table-column>
              <el-table-column prop="warnRacc" label="预警参考量"> </el-table-column>
              <el-table-column prop="wiredrawSum" label="累计拉丝量"> </el-table-column>
              <el-table-column label="启用状态">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.scrapNo" :active-value="1" :inactive-value="0" @change="switchChange(scope.row.id)"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toMoldMaintain(scope.row.id)">
                    维护
                  </el-button>
                  <el-button type="warning" size="mini" @click="toAddMould(scope.row.id)">
                    编辑
                  </el-button>
                  <el-button type="danger" size="mini" @click="deleteRow(scope.row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="成品模具" name="second">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="模具型号">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="线别">
                  <el-select placeholder="请选择 " v-model="submitForm.findIdOne" @change="getData">
                    <el-option :label="item.name" :value="item.id" v-for="item in XBType" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="模具状态">
                  <el-select placeholder="请选择" v-model="submitForm.findById" @change="getData">
                    <el-option label="全部" :value="2"></el-option>
                    <el-option label="正常" :value="0"></el-option>
                    <el-option label="报废" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="getData()" >筛选</el-button>
                <el-button @click="toAddFinish()">新增</el-button>
                <el-button type="text" @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="stateName" label="模具状态"> </el-table-column>
              <el-table-column prop="mouldName" label="模具名称"> </el-table-column>
              <el-table-column prop="mouldModel" label="模具型号"> </el-table-column>
              <el-table-column prop="mouldNumber" label="模具编号"> </el-table-column>
              <el-table-column prop="linetypeName" label="线别"> </el-table-column>
              <el-table-column prop="wiredrawRemark" label="标称直径um"> </el-table-column>
              <el-table-column prop="warnRacc" label="预警参考量"> </el-table-column>
              <el-table-column prop="wiredrawSum" label="累计拉丝量"> </el-table-column>
              <el-table-column label="启用状态">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.scrapNo" :active-value="1" :inactive-value="0" @change="switchChange(scope.row.id)"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="tocpMoldMaintain(scope.row.id)">
                    维护
                  </el-button>
                  <el-button type="warning" size="mini" @click="toAddFinish(scope.row.id)">
                    编辑
                  </el-button>
                  <el-button type="danger" size="mini" @click="deleteRow(scope.row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="套模方案" name="third">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="组合名称">
                  <el-input v-model="submitForm1.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="线别">
                  <el-select placeholder="请选择 " v-model="submitForm1.findIdOne" @change="getData">
                    <el-option :label="item.name" :value="item.id" v-for="item in XBType" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="模具状态">
                  <el-select placeholder="请选择" v-model="submitForm1.findById" @change="getData">
                    <el-option label="全部" :value="2"></el-option>
                    <el-option label="正常" :value="0"></el-option>
                    <el-option label="报废" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="getData()">筛选</el-button>
                <el-button @click="toAddCom()">新增</el-button>
                <el-button type="text" @click="clear1">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData1" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="scrapNo" label="模具组合状态"> </el-table-column>
              <el-table-column prop="constituteNumber" label="组合编号"> </el-table-column>
              <el-table-column prop="constituteName" label="组合名称"> </el-table-column>
              <el-table-column prop="lineType" label="线别"> </el-table-column>
              <el-table-column prop="staffName" label="制定人"> </el-table-column>
              <el-table-column prop="scopeApplication" label="使用范围描述" width="300"> </el-table-column>
              <el-table-column label="启用状态">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.stateNo" :active-value="1" :inactive-value="0" @change="switchChange(scope.row.id)"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini"  >
                    预览
                  </el-button>
                  <el-button type="warning" size="mini" @click="toAddCom(scope.row.id)">
                    编辑
                  </el-button>
                  <el-button type="danger" size="mini" @click="deleteRow(scope.row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1" :current-page="submitForm1.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm1.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
      activeName: 'first',
      status: 1,
      tableData: [],
      tableData1: [],
      submitForm: {
        findName: '',
        findById: 2,
        findIdOne: '',
        iswhether: '', //是否是成套模具 0 否 1是
        pageNum: 1,
        pageSize: 10
      },
      submitForm1: {
        findName: '',
        findById: 2,
        findIdOne: '',
        pageNum: 1,
        pageSize: 10
      },
      XBType: [],
      total: 0
    }
  },
  created() {
    if(sessionStorage.getItem('accountchecking')){
       this.activeName = sessionStorage.getItem('accountchecking')
    }
   
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
    // 监听 pagesize 改变
    handleSizeChange1(newSize) {
      this.submitForm1.pageSize = newSize
      this.getData()
    },
    // 监听 pagenum 改变
    handleCurrentChange1(newPage) {
      this.submitForm1.pageNum = newPage
      this.getData()
    },
    // 前往新增组合页面
    toAddCom(id=-1){
      this.$router.push({
        path: '/addCombination',
        query:{
          id:id
        }
      })
    },
    // 前往成品模具维护页面
    tocpMoldMaintain(id){
      this.$router.push({
        path: '/cpmoldMaintain',
        query: {
          id: id
        }
      })
    },
    // 前往模具维护页面
    toMoldMaintain(id) {
      this.$router.push({
        path: '/moldMaintain',
        query: {
          id: id
        }
      })
    },
    // 监听switch变化
    async switchChange(id) {
      if (this.activeName === 'third') {
        const { data: res } = await this.$http.post('mouldController/updateTsuitByid', {
          updateID: id,
          updateType: 'S'
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.$message.success('编辑成功')
        this.getData()
        return
      }
      const { data: res } = await this.$http.post('mouldController/updateTmouldByid', {
        updateID: id,
        updateType: 'S'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('编辑成功')
      this.getData()
    },
    // 删除单行数据
    async deleteRow(id) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return
      }
      if (this.activeName === 'third') {
        const { data: res } = await this.$http.post('mouldController/updateTsuitByid', {
          updateID: id,
          updateType: 'D'
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.$message.success('删除成功')
        this.getData()
        return
      }
      const { data: res } = await this.$http.post('mouldController/updateTmouldByid', {
        updateID: id,
        updateType: 'D'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },
    clear() {
      this.submitForm.findName = ''
      this.submitForm.findById = 2
      this.submitForm.findIdOne = ''
    },
    clear1() {
      this.submitForm1={
        findName: '',
        findById: 2,
        findIdOne: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    //   前往新增成套模具页面
    toAddMould(id = -1) {
      this.$router.push({
        path: '/addMould',
        query: {
          id: id
        }
      })
    },
    //   获取下拉框的初始数据
    async getSelecteds() {
      const { data: res } = await this.$http.post('mouldController/getAllTMouldXiaLa')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.XBType = res.data.XBType
    },
    //  获取页面初始数据
    async getData() {
      this.getSelecteds()
      if (this.activeName === 'third') {
        const { data: res } = await this.$http.post('mouldController/getAllTSuit', this.submitForm1)
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.total = res.data.total
        this.tableData1 = res.data.list
        return
      }
      if (this.activeName === 'first') {
        this.submitForm.iswhether = 1
      } else if (this.activeName === 'second') {
        this.submitForm.iswhether = 0
      }
      const { data: res } = await this.$http.post('mouldController/getAllTMould', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.total = res.data.total
      this.tableData = res.data.list
    },
    // 去往新增成品页面
    toAddFinish(id = -1) {
      this.$router.push({
        path: 'addFinish',
        query: {
          id: id
        }
      })
    },
    handleClick() {
      sessionStorage.setItem('accountchecking', this.activeName)
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
