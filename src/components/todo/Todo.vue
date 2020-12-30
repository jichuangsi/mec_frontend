<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="card-top  current">待办事项</div>
      </el-col>
      <el-col :span="3">
        <div
          class="card-top "
          @click="todo('/doing')"
        >进行事项</div>
      </el-col>
      <el-col :span="3">
        <div
          class="card-top"
          @click="todo('/done')"
        >完成事项</div>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      style="margin:30px 0;"
    >
      <el-col
        :span="2"
        style="margin-top:10px;"
      >待办事项</el-col>
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          v-model="query"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{background:'#f0f5ff'}"
    >
      <el-table-column
        type="index"
        width="50"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button
            type="primary"
            size="small"
          >前往</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      query: '',
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
    todo(path) {
      window.sessionStorage.setItem('activePath', path)
      this.$router.push(path)
      this.reload()
    }
  }
}
</script>
<style lang="less" scoped>
.box-card {
  width: 100%;
  height: 100%;
  position: relative;
  .card-top {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
  .current {
    position: relative;
    color: #0790ff;
    &:after {
      content: ' ';
      width: 56px;
      height: 5px;
      background: #0790ff;
      position: absolute;
      bottom: -10px;
      border-radius: 2px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .el-pagination {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
}
</style>