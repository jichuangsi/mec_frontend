<template>
  <el-card>
    <el-form label-width="120px" inline>
      <el-form-item label="包装编号">
        <el-input style="width:200px;"></el-input>
      </el-form-item>
      <el-button style="margin-left:60%" type="primary" @click="toSetting" :disabled="rolePowerList.indexOf(89)==-1">新增</el-button>
    </el-form>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#f0f5ff' }">
      <el-table-column type="index" label="序号"  > </el-table-column>
      <el-table-column prop="date" label="包装时间"  > </el-table-column>
      <el-table-column prop="date" label="生产批号" > </el-table-column>
      <el-table-column prop="date" label="产品型号"  > </el-table-column>
      <el-table-column prop="date" label="长度/轴"  > </el-table-column>
      <el-table-column prop="date" label="盒装数量" > </el-table-column>
      <el-table-column prop="date" label="生产日期" > </el-table-column>
      <el-table-column prop="name" label="保质期"  > </el-table-column>
      <el-table-column prop="address" label="操作">
          <template>
              <el-button size="mini" type="primary"  :disabled="rolePowerList.indexOf(86)==-1">查看</el-button>
          </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
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
      rolePowerList:[],
    }
  },
  created() {
    this.rolePowerList=JSON.parse(sessionStorage.getItem("rolePowerList"))
  },
  methods: {
      toSetting(){
          this.$router.push("/PackagingSetting")
      }
  },
}
</script>
<style lang="less" scoped></style>
