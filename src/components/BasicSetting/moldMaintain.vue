<template>
  <div>
    <el-page-header @back="cancel" content="模具维护" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div style="font-weight:bold;margin-bottom:20px;">模具信息</div>
      <el-row style="margin:15px;">
        <el-col :span="3">
          模具名称
        </el-col>
        <el-col :span="3" :offset="1" class="gray">
          {{ tmould.mouldName }}
        </el-col>
        <el-col :span="3" :offset="3">
          预警参考量
        </el-col>
        <el-col :span="3" :offset="1" class="gray">
          {{ tmould.warnRacc }}
        </el-col>
      </el-row>
      <el-row style="margin:15px;">
        <el-col :span="3">
          模具型号
        </el-col>
        <el-col :span="3" :offset="1" class="gray">
          {{ tmould.mouldModel }}
        </el-col>
        <el-col :span="3" :offset="3">
          累计拉丝量
        </el-col>
        <el-col :span="3" :offset="1" class="gray">
          {{ tmould.wiredrawSum }}
        </el-col>
      </el-row>
      <el-row style="margin:15px;">
        <el-col :span="3">
          模具编号
        </el-col>
        <el-col :span="3" :offset="1" class="gray">
          {{ tmould.mouldNumber }}
        </el-col>
        <el-col :span="3" :offset="3">
          拉丝范围um
        </el-col>
        <el-col :span="2" :offset="1">
          上限 <span class="gray">{{ tmould.wiredrawUp }}</span>
        </el-col>
        <el-col :span="2">
          下限 <span class="gray">{{ tmould.wiredrawDown }}</span>
        </el-col>
      </el-row>
      <el-row style="margin:15px;">
        <el-col :span="3">
          模具线别
        </el-col>
        <el-col :span="3" :offset="1" class="gray">
          {{ tmould.linetypeName }}
        </el-col>
        <el-col :span="3" :offset="3">
          拉丝量参考范围g
        </el-col>
        <el-col :span="2" :offset="1">
          上限 <span class="gray">{{ tmould.wiredrawgUp }}</span>
        </el-col>
        <el-col :span="2">
          标准 <span class="gray">{{ tmould.wiredrawgPip }}</span>
        </el-col>
        <el-col :span="2">
          下限 <span class="gray">{{ tmould.wiredrawgDown }}</span>
        </el-col>
      </el-row>
      <el-row style="margin:15px;">
        <el-col :span="3">
          拉丝范围描述
        </el-col>
        <el-col :span="3" :offset="1" class="gray">
          {{ tmould.wiredrawRemark }}
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">
        历史检查数据
        <el-button type="primary" style="margin-left:70%;" @click="toSetDetail()">新增维护</el-button>
        <el-button type="danger" @click="scrap()">模具报废</el-button>
      </div>
      <el-table :data="cuffingcheck" style="width: 100%" :header-cell-style="{ background: '#f0f5ff' }">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="createTime" label="检查日期"> </el-table-column>
        <el-table-column prop="judgeresult" label="综合判定"> </el-table-column>
        <el-table-column prop="staffName" label="检查人"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="toSetDetail(scope.row.id)">查看</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      cuffingcheck: [],
      tmould: {}
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    // 点击报废
    async scrap(){
      const confirmResult = await this.$confirm('是否确认报废？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('mouldController/updateTmouldByid', {
        updateID: this.id,
        updateType:'D'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)

      this.$message.success('删除成功')
      this.$router.go(-1)
    },
    // 点击删除
    async del(id) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('mouldController/updateTCuffingcheckByid', {
        updateID: id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)

      this.$message.success('删除成功')
      this.getData()
    },
    async getData() {
      const { data: res } = await this.$http.post('mouldController/getTMouldById', {
        findById: this.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.tmould = res.data.tmould
      this.cuffingcheck = res.data.cuffingcheck
    },
    toSetDetail(id = -1) {
      if (id <= 0) {
        this.$router.push({
          path: '/setDetail',
          query: {
            id: this.id,
            edit: -1
          }
        })
      } else {
        this.$router.push({
          path: '/setDetail',
          query: {
            id: id,
            edit: 1
          }
        })
      }
    },
    //返回上一步
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.gray {
  color: #9494b1;
}
</style>
