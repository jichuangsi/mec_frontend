<template>
    <el-card>
        <el-form
            ref="form"
            label-width="80px"
        >
            <el-row :gutter="40">
                <el-col :span="6">
                    <el-form-item label="生产批号">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="生产单号">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="生产日期">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary">筛选</el-button>
                    <el-button type="primary" plain >导出</el-button>
                    <el-button>清空</el-button>
                </el-col>
            </el-row>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="未完成" name="first">
                    <el-table
                        :header-cell-style="{background:'#f0f5ff'}"
                        :data="tableData"
                        style="width: 100%"
                    >
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
                                    size="mini"
                                >查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="已完成" name="second">配置管理</el-tab-pane>
            </el-tabs>
            
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
        activeName: 'second',
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
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>
<style lang="less" scoped>
.el-card {
  width: 100%;
  height: 99%;
  position: relative;
  .el-pagination {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
}
</style>
