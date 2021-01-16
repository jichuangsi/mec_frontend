<template>
  <div class="container">
    <el-row :gutter="40">
      <el-col :span="16">
        <div class="data">
          <h1>今日数据</h1>
          <el-card class="box-card" shadow="always" style="border-radius:16px">
            <el-row>
              <el-col :span="6">
                <div class="card-item">
                  <div class="card-item-title">
                    生产
                  </div>
                  <h2>
                    {{ production }}
                  </h2>
                  <img src="../../assets/image/line.svg" />
                </div>
              </el-col>
              <el-col :span="6">
                <div class="card-item">
                  <div class="card-item-title">
                    生产订单量
                  </div>
                  <h2>
                    {{ productionOrderMatter }}
                  </h2>
                  <img src="../../assets/image/line.svg" />
                </div>
              </el-col>
              <el-col :span="6">
                <div class="card-item">
                  <div class="card-item-title">
                    采购金额
                  </div>
                  <h2>
                    {{ purchaseAmount }}
                  </h2>
                  <img src="../../assets/image/line.svg" />
                </div>
              </el-col>
              <el-col :span="6">
                <div class="card-item">
                  <div class="card-item-title">
                    销售金额
                  </div>
                  <h2>
                    {{ salesAmount }}
                  </h2>
                  <img src="../../assets/image/line.svg" />
                </div>
              </el-col>
            </el-row>
          </el-card>
          <el-card class="production" style="border-radius:16px">
            <div class="production-title">
              生产流程
            </div>
            <el-row style="margin-left:10%;">
              <el-col :span="3">
                <div class="production-item">
                  <img src="../../assets/image/melting.svg" />
                  <div>熔炼</div>
                  <img src="../../assets/image/arraw.svg" class="arraw" />
                </div>
              </el-col>
              <el-col :span="3">
                <div class="production-item">
                  <img src="../../assets/image/melting.svg" />
                  <div>粗拉</div>
                  <img src="../../assets/image/arraw.svg" class="arraw" />
                </div>
              </el-col>
              <el-col :span="3">
                <div class="production-item">
                  <img src="../../assets/image/melting.svg" />
                  <div>中拉</div>
                  <img src="../../assets/image/arraw.svg" class="arraw" />
                </div>
              </el-col>
              <el-col :span="3">
                <div class="production-item">
                  <img src="../../assets/image/melting.svg" />
                  <div>半成品</div>
                  <img src="../../assets/image/arraw.svg" class="arraw" />
                </div>
              </el-col>
              <el-col :span="3">
                <div class="production-item">
                  <img src="../../assets/image/melting.svg" />
                  <div>成品</div>
                  <img src="../../assets/image/arraw.svg" class="arraw" />
                </div>
              </el-col>

              <el-col :span="3">
                <div class="production-item">
                  <img src="../../assets/image/melting.svg" />
                  <div>退火</div>
                  <img src="../../assets/image/arraw.svg" class="arraw" />
                </div>
              </el-col>
              <el-col :span="3">
                <div class="production-item">
                  <img src="../../assets/image/melting.svg" />
                  <div>改绕</div>
                </div>
              </el-col>
            </el-row>
          </el-card>
          <el-card style="border-radius:16px" class="chart">
            <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="main" style="width: 100%;height:400px;"></div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="message">
          <h1>系统消息</h1>
          <el-card style=" height:410px;border-radius:14px;">
            <h4 style="margin:0">系统公告</h4>
            <div style="height:300px;overflow-y:auto;overflow-x:hidden;margin-top:20px;">
              <el-row :gutter="20" v-for="(item, index) in noticeList" :key="item.id" class="system" @click.native="showNoticeDialog(index)">
                <el-col :span="1">{{ index + 1 }}</el-col>
                <el-col :span="11" :offset="1">{{ item.noticeName }}</el-col>
                <el-col :span="10">{{ item.createTime | dateFormat }}</el-col>
              </el-row>
            </div>
          </el-card>

          <el-card style="margin-top:30px;height:490px;border-radius:14px;">
            <h4 style="margin:0">待办事项</h4>
            <div style="height:380px;overflow-y:auto;overflow-x:hidden;margin-top:20px;">
              <el-row :gutter="20" v-for="(item, index) in myMatter" :key="item.id" class="system">
                <el-col :span="1">{{ index + 1 }}</el-col>
                <el-col :span="15" :offset="1">{{ item.matterNews }}</el-col>
                <el-col :span="6" @click.native="toDetail(item.type)" style="color:#919191;">前往</el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog
    title="公告"
    :visible.sync="noticeDialogVisible"
    width="30%"
     >
    <el-form    label-width="80px">
      <el-form-item label="标题">
        {{noticeListRow.noticeName}}
      </el-form-item>
      <el-form-item label="内容">
        {{noticeListRow.noticeContent}}
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="noticeDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="noticeDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      
      myMatter: [],
      noticeList: [],
      production: '',
      productionOrderMatter: '',
      purchaseAmount: '',
      salesAmount: '',
      dayProductionDetail: [],
      dayProduction: [],
      noticeDialogVisible:false,
      noticeListRow:{}
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    showNoticeDialog(index){
      this.noticeListRow=this.noticeList[index]
      this.noticeDialogVisible=true
    },
    setChart() {
      var myChart = echarts.init(document.getElementById('main'))
      var option = {
        title: {
          text: '月生产量统计'
        },
        tooltip: {},
        legend: {
          data: ['邮件营销']
        },

        xAxis: {
          type: 'category',
          data: this.dayProduction
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.dayProductionDetail,
            type: 'line',
            smooth: true
          }
        ]
      }
      myChart.setOption(option)
    },
    toDetail(type) {
      switch (type) {
        
        case 1:
          this.$router.push('/orderreview')
          this.saveNavState('/orderreview')
          break
        case 2:
          this.$router.push('/incominginspection')
          this.saveNavState('/incominginspection')
          break
        case 3:
          this.$router.push('/saleOrderReview')
          this.saveNavState('/saleOrderReview')
          break
        case 4:
          this.$router.push('/saleOrderBack')
          this.saveNavState('/saleOrderBack')
          break
        case 5:
          this.$router.push('/examine')
          this.saveNavState('/examine')
          break
        case 6:
  
          this.saveNavState('/maintainManage')
   
          this.$router.push('/maintainManage')
          
          break
        default:
          break
      }
    },
    async getData() {
      const { data: res } = await this.$http.post('HomeController/findMyMatters')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.myMatter = res.data.myMatter
      this.noticeList = res.data.noticeList
      this.production = res.data.production
      this.productionOrderMatter = res.data.productionOrderMatter
      this.purchaseAmount = res.data.purchaseAmount
      this.salesAmount = res.data.salesAmount
      this.dayProduction = res.data.dayProduction
      this.dayProductionDetail = res.data.dayProductionDetail
      this.setChart()
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-table__body {
  width: 100% !important;
}
/deep/.el-table th {
  border: none;
}
/deep/.el-table__row > td {
  border: none;
}
/deep/.el-table::before {
  //去掉最下面的那一条线
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
      height: 410px;
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
.system {
  cursor: pointer;
  margin: 30px 0;
  color: #bdbec4;
}
</style>
