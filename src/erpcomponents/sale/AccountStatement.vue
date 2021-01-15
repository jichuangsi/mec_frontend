<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="日汇总" name="first">
          <template>
            <el-form label-width="120px">
              <el-form-item label="结算时间">
                <el-col :span="6">
                  <el-date-picker v-model="value1" type="date" placeholder="选择日期"> </el-date-picker>
                </el-col>
                <span style="color:#fb6638;">* 每日的对账单会在 次日凌晨 进行更新，每月的对账单会在 次月首日凌晨 进行更新</span>
                <el-button style="margin-left:30%;" type="primary"> 导出</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%"  :header-cell-style="{background:'#f0f5ff'}">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="date" label="结算时间"> </el-table-column>
              <el-table-column prop="date" label="结算账户"> </el-table-column>
              <el-table-column prop="date" label="发生金额（元）"> </el-table-column>
              <el-table-column prop="date" label="操作">
                  <template>
                      <el-button>查看</el-button>
                  </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="月汇总" name="second">
            <template>
                <el-form label-width="120px">
                <el-form-item label="结算时间">
                    <el-col :span="6">
                    <el-date-picker v-model="value1" type="date" placeholder="选择日期"> </el-date-picker>
                    </el-col>
                    <span style="color:#fb6638;">* 每日的对账单会在 次日凌晨 进行更新，每月的对账单会在 次月首日凌晨 进行更新</span>
                    <el-button style="margin-left:30%;" type="primary"> 导出</el-button>
                </el-form-item>
                </el-form>
                <el-table :data="tableData" style="width: 100%"  :header-cell-style="{background:'#f0f5ff'}">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="date" label="结算时间"> </el-table-column>
                <el-table-column prop="date" label="结算账户"> </el-table-column>
                <el-table-column prop="date" label="发生金额（元）"> </el-table-column>
                <el-table-column prop="date" label="操作">
                    <template>
                        <el-button>查看</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </template>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      value1: '',
      tableData: []
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>
<style lang="less" scoped></style>
