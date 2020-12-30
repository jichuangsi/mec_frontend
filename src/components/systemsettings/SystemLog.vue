<template>
    <el-card>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">筛选</el-button>
                <el-button type="primary" plain @click="onSubmit">导出</el-button>
                <el-button type="text" @click="onSubmit">清空筛选</el-button>
            </el-form-item>
        </el-form>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="登录日志" name="first">
                <template>
                     <el-table
                        :default-sort="{prop: 'date', order: 'descending'}"
                        :header-cell-style="{background:'#f0f5ff'}"
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            sortable
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="second">
                <template>
                     <el-table
                        :default-sort="{prop: 'date', order: 'descending'}"
                        :header-cell-style="{background:'#f0f5ff'}"
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            sortable
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <el-tab-pane label="异常日志" name="third">
                <template>
                     <el-table
                        :default-sort="{prop: 'date', order: 'descending'}"
                        :header-cell-style="{background:'#f0f5ff'}"
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            sortable
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
        </el-tabs>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[3, 5, 10, 15]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
    </el-card>
</template>
<script>
export default {
    data() {
      return {
        activeName: 'first',
        formInline: {
          user: '',
          region: '',
        },
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }],
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}
</script>
<style lang="less" scoped>

</style>

