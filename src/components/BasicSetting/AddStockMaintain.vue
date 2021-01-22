<template>
  <div>
    <el-page-header @back="cancel" content="线轴维护" style="margin-bottom:20px;"> </el-page-header>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div style="font-weight:bold">
            选择线轴
          </div>
          <el-form label-width="120px" style="margin-top:36px;">
            <el-form-item label="线轴名称/型号">
              <el-select v-model="form.region" placeholder="请选择 " @change="selectedChange">
                <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in bobbinXiaLa" :key="item.mapKey"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="线轴规格">
              <el-select v-model="form.region" placeholder="请选择 ">
                <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in bobbinDetailXiaLa" :key="item.mapKey"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="font-weight:bold">
            线轴信息
          </div>
          <el-row style="margin:15px 0">
            <el-col :span="4">线轴名称</el-col>
            <el-col :span="8" style="color:#9494b1">50黄</el-col>
            <el-col :span="4">线轴线别</el-col>
            <el-col :span="8" style="color:#9494b1">金线</el-col>
          </el-row>
          <el-row style="margin:15px 0">
            <el-col :span="4">线轴型号</el-col>
            <el-col :span="8" style="color:#9494b1">JZB1</el-col>
            <el-col :span="4">线轴说明</el-col>
            <el-col :span="8" style="color:#9494b1">30</el-col>
          </el-row>
          <el-row style="margin:15px 0">
            <el-col :span="4">线轴编号</el-col>
            <el-col :span="8" style="color:#9494b1">01-03-0023-03</el-col>
            <el-col :span="4">线轴规格</el-col>
            <el-col :span="8" style="color:#9494b1">线轴规格</el-col>
          </el-row>
          <el-row style="margin:15px 0">
            <el-col :span="4">单位</el-col>
            <el-col :span="8" style="color:#9494b1">个</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold">库存线轴信息 <el-button style="margin-left:60%" type="primary" @click="showDialog">新增</el-button></div>
      <el-table :data="tableData" style="width: 100%"   :header-cell-style="{background:'#f0f5ff' }">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="name" label="线轴规格"> </el-table-column>
        <el-table-column prop="address" label="轴号"> </el-table-column>
        <el-table-column prop="address" label="实际轴重g"> </el-table-column>
        <el-table-column prop="address" label="近1次测量g"> </el-table-column>
        <el-table-column prop="address" label="近2次测量g"> </el-table-column>
        <el-table-column prop="address" label="近3次测量g"> </el-table-column>
        <el-table-column prop="address" label="近4次测量g"> </el-table-column>
        <el-table-column prop="address" label="近5次测量g"> </el-table-column>
        <el-table-column prop="address" label="启用状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1" @change="switchChange(scope.row.id)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template>
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style=" margin:20px 40%;">
        <el-button>
          取消
        </el-button>
        <el-button type="primary">
          确定
        </el-button>
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="轴号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="最新轴重">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="历史轴重"> </el-form-item>
        <el-table :data="tableData" style="width: 100%" :cell-style="{padding: '5px 0'}"
                :header-cell-style="{background:'#f0f5ff',padding:'0'}">
          <el-table-column prop="date" label="修改时间"  > </el-table-column>
          <el-table-column prop="name" label="历史轴重" > </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">新 增</el-button>
      </span>
    </el-dialog>
  </div>
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
      ],
      dialogVisible: false,
      bobbinXiaLa:[],
      bobbinDetailXiaLa:[]
    }
  },
  created() {
    this.getSelecteds()
  },
  methods: {
    async selectedChange(e){
       const { data: res } = await this.$http.post('BasicSettingController/getBobbinBasicInfoByBobbinId',{
         findById:e
       } )
        if (res.code !== "0010") return this.$message.error(res.msg)
        this.bobbinDetailXiaLa=res.data.bobbinDetailXiaLa
    },  
    async getSelecteds(){
      const { data: res } = await this.$http.post('BasicSettingController/getBobbinBasicInfo' )
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.bobbinXiaLa=res.data.bobbinXiaLa
    },
    showDialog() {
      this.dialogVisible = true
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped></style>
