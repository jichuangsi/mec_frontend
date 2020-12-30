<template>
  <div>
    <el-page-header @back="goback" content="编辑报修单">
    </el-page-header>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;margin-bottom:20px;">基本信息</div>
      <el-row style="margin:20px;">
        <el-col :span="4" :offset="2">报修单号</el-col>
        <el-col :span="4" :offset="1"><span style="color:#8494a9;">{{equipmentVo.repairReportNumber?equipmentVo.repairReportNumber:'---'}}</span> </el-col>
      </el-row>
      <el-row style="margin:20px;">
        <el-col :span="4" :offset="2">报修时间</el-col>
        <el-col :span="4" :offset="1"><span style="color:#8494a9;">{{equipmentVo.createTime?equipmentVo.createTime:new Date()|dateFormat}}</span> </el-col>
      </el-row>
      <el-row style="margin:20px;">
        <el-col :span="4" :offset="2">报修名称</el-col>
        <el-col :span="4" :offset="1"><span style="color:#8494a9;">{{equipmentVo.equipmentName}}</span> </el-col>
      </el-row>
      <el-row style="margin:20px;">
        <el-col :span="4" :offset="2">报修型号</el-col>
        <el-col :span="4" :offset="1"><span style="color:#8494a9;">{{equipmentVo.equipmentModel}}</span> </el-col>
      </el-row>
      <el-row style="margin:20px;">
        <el-col :span="4" :offset="2">设备编号</el-col>
        <el-col :span="4" :offset="1"><span style="color:#8494a9;">{{equipmentVo.equipmentNumber}}</span> </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">报修流程</div>
      <div style="margin-top:40px;">
        <el-timeline style="width:50%;">
          <el-timeline-item :timestamp="item.auditSetting" placement="top" v-for="(item,index) in auditDetail" :key="index">
            <el-card>
              <h4>{{item.remark}}</h4>
              <p>{{item.staffName}} 提交于 {{item.createTime}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="footer">
        <el-button type="primary" @click="showDialog" v-if=" equipmentVo.state==1">提交处理意见</el-button>
        <el-button type="primary"  @click="showDialog" v-if="equipmentVo.state==2">提交检修记录</el-button>
      <el-button type="primary"  @click="showDialog" v-if="equipmentVo.state==3">提交验收记录</el-button>
      <el-button type="primary"  @click="showDialog" v-if="equipmentVo.state===0">提交保修单</el-button>
      </div>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogClose" >
      <el-form   label-width="80px">
        <el-form-item label="备注">
          <el-input v-model="updateRemark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      id:'',
      auditDetail:[],
      equipmentVo:{},
      dialogVisible:false,
      updateRemark:'',
      row:'',
    }
  },
  created(){
    if(this.$route.query.id){
      this.id=this.$route.query.id
      this.getData()
    }else{
      this.row=JSON.parse(sessionStorage.getItem("maintainManageRow"))
      this.id=this.row.id
      this.equipmentVo=this.row
    }
    
    
  },
  methods: {
    // 监听对话框关闭
    dialogClose(){
      this.updateRemark=''
    },
    // 提交评论
    async dialogConfirm(){
      if(!this.row){
        const { data: res } = await this.$http.post('BasicSettingController/updateRepairReportAuditPocessById',{
          updateID:this.id,
          updateRemark:this.updateRemark,
        })
        if (res.code !== "0010") return this.$message.error(res.msg)
        this.$message.success("更新成功")
      }else{
        const { data: res } = await this.$http.post('BasicSettingController/saveRepairReport',{
          updateID:this.id,
          updateRemark:this.updateRemark,
        })
        if (res.code !== "0010") return this.$message.error(res.msg)
        this.$message.success("新增成功")
      }
      this.dialogVisible=false
      this.$router.go(-1)
    },
    // 展示评论的对话框
    showDialog(){
      this.dialogVisible=true
    },
    // 根据ID获取页面的初始数据
    async getData(){
      const { data: res } = await this.$http.post('BasicSettingController/getRepairReportById',{findById:this.id})
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.equipmentVo=res.data.equipmentVo
      this.auditDetail=res.data.auditDetail
    },
    //返回
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  margin: 60px;
}
.footer{
  margin: 20px;

  text-align: right;
  padding-right: 80px;
}
</style>
