<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="产品型号规格" name="product">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="产品编号">
                  <el-input v-model="form.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="线别">
                  <el-select placeholder="请选择" v-model="form.findIdOne" @change="getData()">
                    <el-option  label="全部" :value="''"    :key="-1"></el-option>
                    <el-option :label="item.name" :value="item.id" v-for="item in XBType" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="choose">筛选</el-button>
                <el-button @click="toadd()">新增</el-button>
                <el-button @click="clear" type="text">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号" width="80"> </el-table-column>

              <el-table-column prop="productName" label="产品名称"> </el-table-column>
              <el-table-column prop="productNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="productModel" label="产品型号"> </el-table-column>
              <el-table-column prop="productLine" label="线别"> </el-table-column>
              <el-table-column prop="productRemark" label="备注"> </el-table-column>
              <el-table-column label="启用状态">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1" @change="switchChange(scope.row)"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toadd(scope.row.id)">
                    查看
                  </el-button>
                  <el-button type="danger" size="mini" @click="del(scope.row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="form.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="原材料型号规格" name="stock">
        <template>
          <el-form label-width="100px">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="原材料编号">
                  <el-input v-model="form.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="8">
                <el-button type="primary" @click="choose">筛选</el-button>
                <el-button @click="toadd()">新增</el-button>
                <el-button style="border:none" plain @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号" width="80"> </el-table-column>
              <el-table-column prop="stockName" label="原材料名称"> </el-table-column>
              <el-table-column prop="stockNumber" label="原材料编号"> </el-table-column>
              <el-table-column prop="stockModel" label="原材料型号"> </el-table-column>

              <el-table-column prop="stockType" label="线别"> </el-table-column>
              <el-table-column prop="stockRemarks" label="备注"> </el-table-column>
              <el-table-column label="启用状态">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1" @change="switchChange(scope.row)"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toadd(scope.row.id)">
                    查看
                  </el-button>
                  <el-button type="danger" size="mini" @click="del(scope.row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="form.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="线轴型号规格" name="bobbin">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="线轴型号">
                  <el-input v-model="form.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="线别">
                  <el-select placeholder="请选择" v-model="form.findIdOne" @change="getData()">
                    <el-option  label="全部" :value="''"    :key="-1"></el-option>
                    <el-option :label="item.name" :value="item.id" v-for="item in XBType" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="choose">筛选</el-button>
                <el-button @click="toadd()">新增</el-button>
                <el-button style="border:none" plain @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="stockName" label="线轴名称"> </el-table-column>
              <el-table-column prop="stockNumber" label="线轴编号"> </el-table-column>
              <el-table-column prop="gxName" label="工序"> </el-table-column>
              <el-table-column prop="stockModel" label="线轴型号"> </el-table-column>
              <el-table-column prop="stockType" label="线别"> </el-table-column>
              <el-table-column prop="stockRemarks" label="备注"> </el-table-column>
              <el-table-column label="启用状态">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1" @change="switchChange(scope.row)"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toadd(scope.row.id)">
                    查看
                  </el-button>
                  <el-button type="danger" size="mini" @click="del(scope.row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="form.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="其他型号规格" name="elseother">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="型号">
                  <el-input v-model="form.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="线别">
                  <el-select placeholder="请选择" v-model="form.findIdOne" @change="getData()">
                    <el-option  label="全部" :value="''"    :key="-1"></el-option>
                    <el-option :label="item.name" :value="item.id" v-for="item in XBType" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" v-model="choose">筛选</el-button>
                <el-button @click="toadd()">新增</el-button>
                <el-button style="text" @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="stockName" label="名称"> </el-table-column>
              <el-table-column prop="stockNumber" label="编号"> </el-table-column>
              <el-table-column prop="stockModel" label="型号"> </el-table-column>
              <el-table-column prop="stockType" label="线别"> </el-table-column>
              <el-table-column prop="stockRemarks" label="备注"> </el-table-column>
              <el-table-column label="启用状态">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1" @change="switchChange(scope.row)"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toadd(scope.row.id)">
                    查看
                  </el-button>
                  <el-button type="danger" size="mini" @click="del(scope.row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="form.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'product',
      form: {
        findName: '',
        pageNum: 1,
        pageSize: 10,
        findIdOne:'',
      },
      tableData: [],
      total: 0,
      XBType:[],
    }
  },
  created() {
    if (sessionStorage.getItem('modelActiveName')) {
      this.activeName = sessionStorage.getItem('modelActiveName')
    }
    // if (this.activeName == 'product') {
    //   this.getProductList()
    // }
    this.getData()
  },
  methods: {
    //  点击删除按钮
    async del(id) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('BasicSettingController/updateStateById', {
        findModelName: this.activeName,
        updateID: id,
        updateType: 'D'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('删除成功')
      this.getData()
    },
    // switch改变
    async switchChange(row) {
      const { data: res } = await this.$http.post('BasicSettingController/updateStateById', {
        findModelName: this.activeName,
        updateID: row.id,
        updateType: 'S'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('修改成功')
      this.getData()
    },
    // 清空筛选
    clear() {
      this.form.findName = ''
      this.form.findIdOne=''
    },
    // 筛选
    choose() {
      this.getData()
    },
    //   获取product下拉框数据
    async getProductList() {
      const { data: res } = await this.$http.post('BasicSettingController/getProductBasicInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.productList = res.data
    },
    //   tab栏切换
    handleClick(tab, event) {
      sessionStorage.setItem('modelActiveName', this.activeName)
      this.getData()
    },
    //   获取页面初始数据
    async getData() {
        const { data: ress } = await this.$http.post('mouldController/getAllTMouldXiaLa' )
        if (ress.code !== '0010') return this.$message.error(ress.msg)
        this.XBType=ress.data.XBType
      this.form.findModelName = this.activeName
      const { data: res } = await this.$http.post('BasicSettingController/getAllBasicSettingByName', this.form)
      if (res.code !== '0010') return this.$message.error(res.msg)

      this.total = res.data.total
      this.tableData = res.data.list
    },

    //   跳转新增页面如果id>=0则是编辑操作
    toadd(id = -1) {
      switch (this.activeName) {
        case 'product':
          this.$router.push({
            path: '/modelSetting/addProduct',
            query: {
              id: id
            }
          })
          break
        case 'stock':
          this.$router.push({
            path: '/modelSetting/addRaw',
            query: {
              id: id
            }
          })
          break
        case 'bobbin':
          this.$router.push({
            path: '/modelSetting/addThread',
            query: {
              id: id
            }
          })
          break
        case 'elseother':
          this.$router.push({
            path: '/modelSetting/addOther',
            query: {
              id: id
            }
          })
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  width: 100%;
  height: 100%;
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
