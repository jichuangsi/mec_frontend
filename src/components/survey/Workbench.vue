<template>
    <el-card>
        <el-row>
            <div class="title">今日任务</div>
        </el-row>
        <div class="main">
            <div class="item-wrapper">
                <div class="item-title">待开始</div>
                <div class="item-card" v-for="item in toStart" :key="item.id">
                    <div class="card-main">当前工序：{{item.gxname}}</div>
                    <div class="card-main">班组：{{item.teamName}}</div>
                    <div class="card-main">计划下达时间：{{item.createTime|dateFormat}}</div>
                    <div class="card-main">计划完成: {{item.createTime|dateFormat}}</div>
                    <div class="card-box">
                        <div class="border-right">查看计划单</div>
                        <div>前往操作</div>
                    </div>
                    <el-tag effect="dark" type="warning">待开始</el-tag>
                </div>
                
            </div>
            <div class="item-wrapper">
                <div class="item-title">进行中</div>
                <div class="item-card" v-for="item in inProgress" :key="item.id">
                    <div class="card-main">当前工序：{{item.gxname}}</div>
                    <div class="card-main">班组：{{item.teamName}}</div>
                    <div class="card-main">计划下达时间：{{item.createTime|dateFormat}}</div>
                    <div class="card-main">计划完成: {{item.createTime|dateFormat}}</div>
                    <div class="card-box">
                        <div class="border-right">查看计划单</div>
                        <div>前往操作</div>
                    </div>
                    <el-tag type="success">进行中</el-tag>
                </div>
                            
            </div>
            <div class="item-wrapper">
                <div class="item-title">已完成</div>
                <div class="item-card" v-for="item in completed" :key="item.id">
                    <div class="card-main">当前工序：{{item.gxname}}</div>
                    <div class="card-main">班组：{{item.teamName}}</div>
                    <div class="card-main">计划下达时间：{{item.createTime|dateFormat}}</div>
                    <div class="card-main">计划完成: {{item.createTime|dateFormat}}</div>
                    <div class="card-box">
                        <div class="border-right">查看计划单</div>
                        <div>前往操作</div>
                    </div>
                    <el-tag type="info">已完成</el-tag>
                </div>
                         
            </div>
            <div class="item-wrapper">
                <div class="item-title">预警信息</div>
                <div class="item-card" v-for="item in warning" :key="item.id">
                    <div class="card-main">当前工序：{{item.gxname}}</div>
                    <div class="card-main">班组：{{item.teamName}}</div>
                    <div class="card-main">计划下达时间：{{item.createTime|dateFormat}}</div>
                    <div class="card-main">计划完成: {{item.createTime|dateFormat}}</div>
                    <div class="card-box">
                        <div class="border-right">查看计划单</div>
                        <div>前往操作</div>
                    </div>
                    <el-tag type="danger">预警</el-tag>
                </div>
                
            </div>
        </div>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            completed:[],
            toStart:[],
            inProgress:[],
            warning:[],
        }
    },
    created() {
        this.getData()
    },
    methods: {
        async getData(){
            const { data: res } = await this.$http.post('HomeController/findProductionTask' )
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.toStart=res.data.toStart
            this.inProgress=res.data.inProgress
            this.warning=res.data.warning
            this.completed=res.data.completed
        }
    },
}
</script>
<style lang="less" scoped>
.el-card {
  width: 100%;
  .border-right {
    border-right: 1px solid #fbf0ff;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .main {
    display: flex;
    justify-content: space-between;
    .item-wrapper {
       
      width: 300px;
      height: 750px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .item-title {
        font-size: 16px;
        font-weight: bold;
        margin: 6px 0;
        color: #4a4b58;
      }
      .item-card {
        margin: 10px 0;
        position: relative;
        border: 1px solid #f0f5ff;
        width: 280px;
        height: 160px;
        background-color: #fff;
        .card-main {
          font-size: 14px;
          color: #999999;
          margin: 10px 20px;
        }
        .el-tag {
          position: absolute;
          top: 10px;
          right: 10px;
          border-radius:20px;
        }
        .card-box {
          display: flex;
          width: 100%;
          div {
            cursor: pointer;
            border-top: 1px solid #fbf0ff;
            color: #999999;
            text-align: center;
            flex: 1;
            font-size: 14px;
            line-height: 32px;
          }
        }
      }
    }
  }
}
</style>
