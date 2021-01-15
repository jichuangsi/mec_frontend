<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="原材料" name="stock">
        <template>
          <el-form ref="form" label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6" :offset="6">
                <el-button type="primary" @click="getData">筛选</el-button>
                <el-button>导出</el-button>
                <el-button type="text" plain @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="inventoryTypestr" label="产品类型"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="inventorysum" label="库存数量"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">查看</el-button>
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
      <el-tab-pane label="半成品" name="nofinished">
        <template>
          <el-form ref="form" label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6" :offset="6">
                <el-button type="primary" @click="getData">筛选</el-button>
                <el-button>导出</el-button>
                <el-button type="text" plain @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="inventoryTypestr" label="产品类型"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="inventorysum" label="库存数量"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="成品" name="product">
        <template>
          <el-form ref="form" label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6" :offset="6">
                <el-button type="primary" @click="getData">筛选</el-button>
                <el-button>导出</el-button>
                <el-button type="text" plain @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="inventoryTypestr" label="产品类型"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="inventorysum" label="库存数量"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="废料" name="waste">
        <template>
          <el-form ref="form" label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6" :offset="6">
                <el-button type="primary" @click="getData">筛选</el-button>
                <el-button>导出</el-button>
                <el-button type="text" plain @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="inventoryTypestr" label="产品类型"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="inventorysum" label="库存数量"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="线轴" name="bobbin">
        <template>
          <el-form ref="form" label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6" :offset="6">
                <el-button type="primary" @click="getData">筛选</el-button>
                <el-button>导出</el-button>
                <el-button type="text" plain @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="inventoryTypestr" label="产品类型"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="inventorysum" label="库存数量"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="其他" name="elseother">
        <template>
          <el-form ref="form" label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6" :offset="6">
                <el-button type="primary" @click="getData">筛选</el-button>
                <el-button>导出</el-button>
                <el-button type="text" plain @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="inventoryTypestr" label="产品类型"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="inventorysum" label="库存数量"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
      activeName: 'stock',
      tableData: [],

      value1: '',
      submitForm: {
        findModelName: '',
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSizeChange(newSize) {
      this.submitForm.pageSize = newSize
      this.getData()
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.submitForm.pageNum = newPage
      this.getData()
    },
    handleClick() {
      this.getData()
    },
    // 清空筛选
    clear() {
      this.submitForm.findName = ''
    },
    //获取页面初始数据
    async getData() {
      this.submitForm.findModelName = this.activeName
      const { data: res } = await this.$http.post('warehouseController/getAllInventoryStates', this.submitForm)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.total = res.data.total
      this.tableData = res.data.list
    },
    toDetail(id) {
      this.$router.push({
        path: '/inventoryStatusDetail',
        query: {
          id: id,
          findModelName: this.activeName
        }
      })
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
