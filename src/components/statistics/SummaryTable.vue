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
                    <download-excel
                        class = "export-excel-wrapper"
                        :data = "tableData"
                        :fields = "json_fields"
                        name = "生产日报汇总表.xls">
                        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                        <el-button type="primary"  >导出</el-button>
                    </download-excel>
                    <el-button>清空</el-button>
                </el-col>
            </el-row>
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
<script type="module">
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
      // 自主选择要导出的字段，若不指定，默认导出全部数据中心全部字段
      json_fields: {
        "日期": "date",    //常规字段
        "姓名": "name", //支持嵌套属性
        "地址":'address'
      },
      // 需要导出的数据
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010"
          }
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244"
          }
        }
      ],
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
    }
  },
  methods: {
     
  },
}
</script>
<style lang="less" scoped>
.export-excel-wrapper{
    display: inline-block;
    margin: 0 20px;
}
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
