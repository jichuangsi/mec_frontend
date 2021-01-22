<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有线轴" name="first">
        <template>
          <el-form label-width="120px">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="线轴名称/型号">
                  <el-select placeholder="请选择 " v-model="leftId" @change="selectedChange">
                    <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in bobbinXiaLa" :key="item.mapKey"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="线轴规格">
                  <el-select placeholder="请选择 " v-model="submitForm.findById">
                    <el-option label="全部" value="0"></el-option>
                    <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in bobbinDetailXiaLa" :key="item.mapKey"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="2">
                <el-button type="primary" @click="getData">筛选</el-button>
                <el-button @click="toAddStock">新增</el-button>
                <el-button type="text" @click="clear">清空筛选</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="stockName" label="线轴名称"> </el-table-column>
              <el-table-column prop="stockNumber" label="线轴编号"> </el-table-column>
              <el-table-column prop="stockType" label="工序"> </el-table-column>
              <el-table-column prop="stockModel" label="线轴型号"> </el-table-column>
              <el-table-column prop="standards" label="线轴规格"> </el-table-column>
              <el-table-column prop="stockRemarks" label="备注"> </el-table-column>
              <el-table-column prop="state" label="库存数量"> </el-table-column>

              <el-table-column label="操作">
                <template>
                  <el-button type="primary" size="mini">查看</el-button>
                  <el-button type="danger" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="批量新增" name="second">批量新增</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      form: {
        region: ''
      },
      tableData: [],
      submitForm: {
        findById: 0,
        pageNum: 1,
        pageSize: 10
      },
      total:0,
      bobbinXiaLa:[],
      leftId:'',
      bobbinDetailXiaLa:[],
    }
  },
  created() {
    if (sessionStorage.getItem('stockmaintain')) {
      this.activeName = sessionStorage.getItem('stockmaintain')
    }
  },
  methods: {
    toAddStock(){
      this.$router.push("/addStockMaintain")
    },
    // 清空
    clear(){
      this.submitForm={
        findById: 0,
        pageNum: 1,
        pageSize: 10
      }
    },
    // 监听下拉框改变
    async selectedChange(e){
      const { data: res } = await this.$http.post('BasicSettingController/getBobbinBasicInfoByBobbinId',{
        findById:e
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.bobbinDetailXiaLa=res.data.bobbinDetailXiaLa
    },
    // 获取页面初始数据
    async getData() {
      const { data: ress } = await this.$http.post('BasicSettingController/getAllTbobbinInfo', this.submitForm)
      if (ress.code !== '0010') return this.$message.error(ress.msg)
      this.total=ress.data.total
      this.tableData=ress.data.list
      const { data: res } = await this.$http.post('BasicSettingController/getBobbinBasicInfo' )
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.bobbinXiaLa=res.data.bobbinXiaLa
    },
    handleClick() {
      sessionStorage.setItem('stockmaintain', this.activeName)
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
