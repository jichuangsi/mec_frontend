/* eslint-disable */
<template>
    <div class="container">
        <el-row :gutter="40">
            <el-col :span="16">

                <div class="data">
                    <h1>今日数据</h1>
                    <el-card
                        class="box-card"
                        shadow="always"
                        style="border-radius:16px"
                    >

                        <el-row>
                            <el-col :span="6">
                                <div class="card-item">
                                    <div class="card-item-title">
                                        生产
                                    </div>
                                    <h2>
                                        2685
                                    </h2>
                                    <img src="../../assets/image/line.svg" />
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="card-item">
                                    <div class="card-item-title">
                                        生产
                                    </div>
                                    <h2>
                                        2685
                                    </h2>
                                    <img src="../../assets/image/line.svg" />
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="card-item">
                                    <div class="card-item-title">
                                        生产
                                    </div>
                                    <h2>
                                        2685
                                    </h2>
                                    <img src="../../assets/image/line.svg" />
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="card-item">
                                    <div class="card-item-title">
                                        生产
                                    </div>
                                    <h2>
                                        2685
                                    </h2>
                                    <img src="../../assets/image/line.svg" />
                                </div>
                            </el-col>
                        </el-row>

                    </el-card>
                    <el-card
                        class="production"
                        style="border-radius:16px"
                    >
                        <div class="production-title">
                            生产流程
                        </div>
                        <el-row>
                            <el-col :span="4">
                                <div class="production-item">
                                    <img src="../../assets/image/melting.svg" />
                                    <div>熔炼</div>
                                    <img
                                        src="../../assets/image/arraw.svg"
                                        class="arraw"
                                    />
                                </div>

                            </el-col>
                            <el-col :span="4">
                                <div class="production-item">
                                    <img src="../../assets/image/melting.svg" />
                                    <div>熔炼</div>
                                    <img
                                        src="../../assets/image/arraw.svg"
                                        class="arraw"
                                    />
                                </div>

                            </el-col>
                            <el-col :span="4">
                                <div class="production-item">
                                    <img src="../../assets/image/melting.svg" />
                                    <div>熔炼</div>
                                    <img
                                        src="../../assets/image/arraw.svg"
                                        class="arraw"
                                    />
                                </div>

                            </el-col>
                            <el-col :span="4">
                                <div class="production-item">
                                    <img src="../../assets/image/melting.svg" />
                                    <div>熔炼</div>
                                    <img
                                        src="../../assets/image/arraw.svg"
                                        class="arraw"
                                    />
                                </div>

                            </el-col>
                            <el-col :span="4">
                                <div class="production-item">
                                    <img src="../../assets/image/melting.svg" />
                                    <div>熔炼</div>
                                    <img
                                        src="../../assets/image/arraw.svg"
                                        class="arraw"
                                    />
                                </div>

                            </el-col>
                            <el-col :span="4">
                                <div class="production-item">
                                    <img src="../../assets/image/melting.svg" />
                                    <div>熔炼</div>

                                </div>

                            </el-col>

                        </el-row>
                    </el-card>
                    <el-card
                        style="border-radius:16px"
                        class="chart"
                    >
                        <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
                        <div
                            id="main"
                            style="width: 750px;height:400px;"
                        ></div>
                    </el-card>
                </div>

            </el-col>
            <el-col :span="8">
                <div class="message">
                    <h1>系统消息</h1>
                    <el-card>
                        <div class="message-title">系统公告</div>
                        <el-table
                            class="customer-table"
                            :row-class-name="tableRowClassName"
                            :data="tableData"
                            style="padding:10px;"
                            height="400"
                        >
                            <el-table-column
                                type="index"
                                width="60"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                width="160"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                width="160"
                            >
                            </el-table-column>
                        </el-table>
                    </el-card>

                    <el-card style="margin-top:20px;">
                        <div class="message-title">系统公告</div>
                        <el-table
                            class="customer-table"
                            :row-class-name="tableRowClassName"
                            :data="tableData"
                            style="padding:10px;width:100%;"
                            height="400"
                        >
                            <el-table-column
                                type="index"
                                width="60"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                
                            >
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                
                            >
                            </el-table-column>
                        </el-table>
                    </el-card>
                </div>

            </el-col>
        </el-row>

    </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '元旦放假通知',
        },
        {
          date: '2016-05-04',
          name: '关于2020年度总结',
        },
        {
          date: '2016-05-01',
          name: '年末公司年会通知',
        },
        {
          date: '2016-05-01',
          name: '年末公司年会通知',
        },
        {
          date: '2016-05-01',
          name: '年末公司年会通知',
        },
        {
          date: '2016-05-01',
          name: '年末公司年会通知',
        },
        
      ]
    }
  },
  created() {},
  mounted() {
    var myChart = echarts.init(document.getElementById('main'))
    var option = {
      title: {
        text: '月生产量统计'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }
      ]
    }
    myChart.setOption(option)
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return 'tablerow'
    }
  }
}
</script>

<style lang="less" scoped>
/deep/  .el-table__body{
  width: 100% !important;
}
/deep/.el-table th{
    border:none;
  }
/deep/.el-table__row>td{
	border: none;
}
/deep/.el-table::before {//去掉最下面的那一条线
	height: 0px;
}
.el-table /deep/ .tablerow {
  font-weight: bold;
  color: #bdbec4;
  font-size: 16px;
}
h1 {
  font-size: 30px;
  color: #474a61;
}
.container {
  padding: 0 20px;
  box-sizing: border-box;
  .data {
    .box-card {
      width: 100%;
      height: 200px;

      .card-item {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .card-item-title {
          margin-top: 10px;
          font-size: 20px;
          color: #bdbec4;
          font-weight: bold;
          text-align: center;
        }
        h2 {
          margin: 20px 0;
          text-align: center;
        }
        img {
          width: 90px;
          padding-left: -20px;
        }
      }
    }
    .production {
      box-sizing: border-box;
      margin-top: 30px;
      width: 100%;
      height: 180px;
      .production-title {
        font-size: 20px;
        font-weight: bold;
        color: #474a61;
      }
      .production-item {
        position: relative;

        margin-top: 25px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 60px;
        }
        div {
          font-size: 16px;
          margin-top: 10px;
        }
        .arraw {
          position: absolute;
          top: 20px;
          right: -10px;
          width: 20px;
        }
      }
    }
    .chart {
      padding: 20px;
      box-sizing: border-box;
      margin-top: 30px;
      width: 100%;
    }
  }
//   系统消息
  .message {
    .el-card {
      position: relative;
      height: 450px;
      .message-title {
        font-weight: bold;
        color: #474a61;
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 2;
      }
      .el-table {
        width: 100% !important;
        position: absolute;
        top: 10px;
        left: 0;
      }
    }
  }
}
</style>
