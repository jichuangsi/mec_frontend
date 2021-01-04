<template>
  <div>
    <el-page-header @back="cancel" content="包装设置" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div style="font-weight:bold">包装设置</div>
      <el-form label-width="220px">
        <el-form-item label="包装编号"> 
            <el-input style="width:30%;" disabled></el-input><span style="color:red;margin-left:60px;">*包装编号唯一</span> </el-form-item>
        <el-form-item label="生产日期">
          <el-input style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label="保质期">
          <el-input style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label="原材料">
          <el-input style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label="装盒数量">
          <el-input style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label="选择要关联的库存产品">
          <el-button type="primary" style="margin-left:80%;">新增关联产品</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#f0f5ff' }">
        <el-table-column type="index" label="编号"  > </el-table-column>
        <el-table-column prop="date" label="包装编号"  > </el-table-column>
        <el-table-column prop="date" label="产品型号"  > </el-table-column>
        <el-table-column prop="date" label="产品编号"  > </el-table-column>
        <el-table-column prop="date" label="生产批号"  > </el-table-column>
        <el-table-column prop="date" label="产品型号" > </el-table-column>
        <el-table-column prop="name" label="规格"  > </el-table-column>
        <el-table-column prop="name" label="长度（m/轴）"> </el-table-column>
        <el-table-column prop="name" label="数量"> </el-table-column>
        <el-table-column prop="name" label="总长度m"> </el-table-column>
         <el-table-column label="操作">
             <template>
                 <el-button size="mini" type="danger">删除</el-button>
             </template>
         </el-table-column>
      </el-table>
      <div style="margin:20px 40%">
          <el-button>取消</el-button>
          <el-button type="primary">保存</el-button>
      </div>
    </el-card>
  </div>
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
      ]
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped></style>
