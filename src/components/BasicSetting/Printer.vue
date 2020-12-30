<template>
    <el-card>
        <el-form label-width="80px">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="设备型号">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="状态">
                        <el-select
                            placeholder="请选择活动区域"
                            v-model="form.region"
                        >
                            <el-option
                                label="区域一"
                                value="shanghai"
                            ></el-option>
                            <el-option
                                label="区域二"
                                value="beijing"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary">筛选</el-button>
                    <el-button>新增</el-button>
                    <el-button
                        plain
                    >导出</el-button>
                </el-col>
            </el-row>
            <el-table
                :header-cell-style="{background:'#f0f5ff'}"
                :data="tableData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
            >
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址"
                >
                </el-table-column>
                <el-table-column label="启用状态">
                    <template>
                        <el-switch>
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template>
                        <el-button
                            type="danger"
                            size="mini"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <el-pagination
            :current-page="4"
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
  data() {
    return {
      form: {
        region: ''
      },
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
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>