<template>
  <div>
    <el-page-header @back="cancel" content="新增绕线" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div style="font-weight:bold">待绕线成品参数</div>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="2" :offset="2">生产时间</el-col>
        <el-col :span="5" style="color:#8494a9;">{{pppProducts.createTime}}</el-col>
        <el-col :span="3">长度m/轴</el-col>
        <el-col :span="3" style="color:#8494a9;">{{pppProducts.lengthM}}</el-col>
        <el-col :span="3">直线</el-col>
        <el-col :span="3" style="color:#8494a9;">{{pppProducts.straightLine}}</el-col>
      </el-row>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="2" :offset="2">工序</el-col>
        <el-col :span="5" style="color:#8494a9;">{{oneListName}}</el-col>
        <el-col :span="3">毛重g</el-col>
        <el-col :span="3" style="color:#8494a9;">{{pppProducts.grossWeight}}</el-col>
        <el-col :span="3">数量</el-col>
        <el-col :span="3" style="color:#8494a9;">{{pppProducts.numbers}}</el-col>
      </el-row>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="2" :offset="2">线轴</el-col>
        <el-col :span="5" style="color:#8494a9;">50黄</el-col>
        <el-col :span="3">净重g</el-col>
        <el-col :span="3" style="color:#8494a9;">{{pppProducts.netWeightg}}</el-col>
        <el-col :span="3">线轴规格</el-col>
        <el-col :span="3" style="color:#8494a9;">{{pppProducts.standards}}</el-col>
      </el-row>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="2" :offset="2">表面</el-col>
        <el-col :span="5" style="color:#8494a9;">{{pppProducts.surface}}</el-col>
        <el-col :span="3">放线</el-col>
        <el-col :span="3" style="color:#8494a9;">{{pppProducts.payingOff}}</el-col>
        <el-col :span="3"  >线径um</el-col>
        <el-col :span="3" style="color:#8494a9;">{{pppProducts.wireDiameterUm}}</el-col>
      </el-row>

    </el-card>
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="12">
        <el-card>
          <div style="font-weight:bold">生产设备设定</div>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9"><div style="margin-top:10px;">设备型号</div></el-col>
            <el-col :offset="1" :span="9">
              <el-select v-model="aaa" placeholder="请选择 ">
                <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in equipmentXiaLa" :key="item.mapKey"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9">设备状态</el-col>
            <el-col :offset="1" :span="9" style="color:#8494a9;">
              正常
            </el-col>
          </el-row>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9">设备类型</el-col>
            <el-col :offset="1" :span="9" style="color:#8494a9;">
              正常
            </el-col>
          </el-row>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9">最近一次检修员</el-col>
            <el-col :offset="1" :span="9" style="color:#8494a9;">
              正常
            </el-col>
          </el-row>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9">最近一次检修时间</el-col>
            <el-col :offset="1" :span="9" style="color:#8494a9;">
              正常
            </el-col>
          </el-row>
          <el-row :gutter="60" style="margin:10px 0;">
            <el-col :offset="1" :span="9">设备运行次数</el-col>
            <el-col :offset="1" :span="9" style="color:#8494a9;">
              正常
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="font-weight:bold">工艺参数</div>
          <el-row :gutter="20" style="margin:20px 0;">
            <el-col :offset="1" :span="2">张力</el-col>
            <el-col :span="4">
              <el-input size="mini"></el-input>
            </el-col>
            <el-col :offset="1" :span="2">排线</el-col>
            <el-col :span="4">
              <el-input size="mini"></el-input>
            </el-col>
            <el-col :offset="1" :span="5">绕线前总长度m</el-col>
            <el-col :span="4" style="color:#8494a9;">
              12312231
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:20px 0;">
            <el-col :offset="1" :span="2">废料g</el-col>
            <el-col :span="4">
              <el-input size="mini"></el-input>
            </el-col>
            <el-col :offset="1" :span="2">表面</el-col>
            <el-col :span="4">
              <el-input size="mini"></el-input>
            </el-col>
            <el-col :offset="1" :span="5">绕线后总长度m</el-col>
            <el-col :span="4" style="color:#8494a9;">
              12312231
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:20px 0;">
            <el-col :offset="1" :span="2">余料g</el-col>
            <el-col :span="4">
              <el-input size="mini"></el-input>
            </el-col>
            <el-col :offset="1" :span="2">放线</el-col>
            <el-col :span="4">
              <el-input size="mini"></el-input>
            </el-col>
            <el-col :offset="1" :span="5">绕线前总重量m</el-col>
            <el-col :span="4" style="color:#8494a9;">
              12312231
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:22px 0;">
            <el-col :offset="1" :span="2">损耗g</el-col>
            <el-col :span="4">
              <el-input size="mini"></el-input>
            </el-col>
            <el-col :offset="1" :span="2">直线</el-col>
            <el-col :span="4">
              <el-input size="mini"></el-input>
            </el-col>
            <el-col :offset="1" :span="5">绕线后总重量m</el-col>
            <el-col :span="4" style="color:#8494a9;">
              12312231
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold">本班生产产物（绕线）<el-button type="primary" plain style="margin-left:60%;">新增</el-button></div>
      <el-table :header-cell-style="{ background: '#f0f5ff' }">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="生产时间"></el-table-column>
        <el-table-column label="工序"></el-table-column>
        <el-table-column label="线轴"></el-table-column>
        <el-table-column label="线轴规格"></el-table-column>
        <el-table-column label="轴重"></el-table-column>
        <el-table-column label="线径um"></el-table-column>
        <el-table-column label="长度m/轴"></el-table-column>
        <el-table-column label="毛重g"></el-table-column>
        <el-table-column label="净重g"></el-table-column>
        <el-table-column label="数量"></el-table-column>
        <el-table-column label="总长度m"></el-table-column>
        <el-table-column label="总净重m"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
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
      aaa: '',
      Eid: '',
      id:'',
      pppProducts:{},
      oneListName:'',
      equipmentXiaLa:[]
    }
  },
  created() {
    this.Eid = this.$route.query.Eid
    this.id=this.$route.query.id
    this.getData()
  },
  methods: {
    //   获取页面初始数据
    async getData() {
        const { data: res } = await this.$http.post('ProductionController/getPWindingDetailByPPWindingDetailId',{
            findById:this.Eid,
            findIdOne:this.id
        })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.pppProducts=res.data.pppProducts
      this.oneListName=res.data.oneListName
      this.equipmentXiaLa=res.data.equipmentXiaLa
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped></style>
