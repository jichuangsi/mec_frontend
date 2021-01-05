<template>
  <el-card>
    <el-form label-width="120px">
      <el-form-item label="抽检报告">
        <el-input style="width:20%;" placeholder="请输入搜索内容"></el-input>
        <el-button type="primary" style="margin-left:50%;">筛选</el-button>
        <el-button @click="showDialog">新增抽检</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="name" label="创建时间"> </el-table-column>
      <el-table-column prop="date" label="抽检报告名称"> </el-table-column>
      <el-table-column prop="date" label="抽检批号"> </el-table-column>
      <el-table-column prop="date" label="进检轴数"> </el-table-column>
      <el-table-column prop="date" label="抽检轴数"> </el-table-column>
      <el-table-column prop="date" label="合格轴数"> </el-table-column>
      <el-table-column prop="date" label="不合格轴数"> </el-table-column>
      <el-table-column width="250" prop="address" label="操作">
        <template>
          <el-button size="mini" type="primary">查看</el-button>
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
    <el-dialog title="新增抽检" :visible.sync="dialogVisible" width="60%">
      <el-form>
        <el-form-item label="生产批号">
          <el-input style="width:20%;" suffix-icon="el-icon-search"></el-input>
          <span style="margin-left:50px;">当前车库 车间1</span>
        </el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-table :data="tableData" style="width: 100%" :cell-style="{padding: '5px 0'}"
                :header-cell-style="{background:'#f0f5ff',padding:'0'}">
            <el-table-column prop="date" label="生产批号"  > </el-table-column>
            <el-table-column prop="name" label="产品型号"  > </el-table-column>
            <el-table-column prop="name" label="规格"> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table :data="tableData" style="width: 100%" :cell-style="{padding: '5px 0'}"
                :header-cell-style="{background:'#f0f5ff',padding:'0'}">
            <el-table-column prop="date" label="线轴"  > </el-table-column>
            <el-table-column prop="name" label="长度m/轴" > </el-table-column>
            <el-table-column prop="name" label="库存数量（轴）"> </el-table-column>
            <el-table-column prop="name" label="进检数量">
                <template>
                    <el-input size="mini"></el-input>
                </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin:10px 0">
          <el-col :span="4">待抽检成品  </el-col>
          <el-col :span="4" :offset="16">
              <el-button size="mini">添加</el-button>
          </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
    }
  },
  created() {},
  methods: {
    //   打开新增抽检的对话框
    showDialog() {
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  margin: 60px;
}
</style>
