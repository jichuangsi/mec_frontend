<template>
  <div>
    <el-page-header @back="cancel" content="成品模具检查表" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div style="font-weight:bold;margin-bottom:20px;">基本信息</div>
      <el-form  label-width="180px">
        <el-form-item label="模具名称" >
          <el-input v-model="tmould.mouldName" style="width:30%;" disabled></el-input>
        </el-form-item>
        <el-form-item label="模具型号">
          <el-input v-model="tmould.mouldModel" style="width:30%;" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="tmould.remark" style="width:30%;" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold">直径计算器</div>
      <el-form  label-width="180px">
        <el-form-item label="长度m" >
          <el-input v-model="tmouldDetail.lengthM" style="width:30%;"  ></el-input> <span class="tips">*计算公式:D=SQRT((4000*W)/(ρ*π*L))其中：D为直径，SQRT为开根号，W为称重平均值,ρ为密度，π为3.1415926，L为长度</span>
        </el-form-item>
        <el-form-item label="密度">
          <el-input v-model="tmouldDetail.density" style="width:30%;" ></el-input>
        </el-form-item>
        <el-form-item label="重量mg">
          <el-row>
            <el-col :span="1" style="text-align:center;"> 1</el-col>
            <el-col :span="2"><el-input v-model="tmouldDetail.weightMg0" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
            <el-col :span="1" style="text-align:center;">2</el-col>
            <el-col :span="2"><el-input v-model="tmouldDetail.weightMg1" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
            <el-col :span="1" style="text-align:center;">3</el-col>
            <el-col :span="2"><el-input v-model="tmouldDetail.weightMg2" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
            <el-col :span="1" style="text-align:center;">4</el-col>
            <el-col :span="2"><el-input v-model="tmouldDetail.weightMg3" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
            <el-col :span="1" style="text-align:center;">5</el-col>
            <el-col :span="2"><el-input v-model="tmouldDetail.weightMg4" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="1" style="text-align:center;"> 6</el-col>
            <el-col :span="2"><el-input v-model="tmouldDetail.weightMg5"  oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
            <el-col :span="1" style="text-align:center;">7</el-col>
            <el-col :span="2"><el-input v-model="tmouldDetail.weightMg6" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
            <el-col :span="1" style="text-align:center;">8</el-col>
            <el-col :span="2"><el-input v-model="tmouldDetail.weightMg7" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
            <el-col :span="1" style="text-align:center;">9</el-col>
            <el-col :span="2"><el-input v-model="tmouldDetail.weightMg8" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
            <el-col :span="1" style="text-align:center;">10</el-col>
            <el-col :span="2"><el-input v-model="tmouldDetail.weightMg9" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="重量平均值mg">
          <el-input v-model="tmouldDetail.weightavageMg" style="width:30%;" disabled></el-input>
          <el-button type="primary" style="margin-left:20px;" @click="cal1()">计算</el-button>
        </el-form-item>
        <el-form-item label="实测直径um">
          <el-input v-model="tmouldDetail.measureddiamUm" style="width:30%;" disabled></el-input>
          <el-button type="primary" style="margin-left:20px;" @click="cal2()">计算</el-button>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary"  style="margin-left:40px;" @click="saveAll">保存</el-button>
      </div>
    </el-card>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      
      aaa:'',
      
      tmould: {
        judgeresult: '',
        mouldModel: '',
        mouldName: '',
        remark: '',
        mouldid:'',
      },
      index: -1,
      edit:'',
      tmouldDetail:{
        lengthM:'',//长度
        density:'',//密度
        weightMg0:'',
        weightMg1:'',
        weightMg2:'',
        weightMg3:'',
        weightMg4:'',
        weightMg5:'',
        weightMg6:'',
        weightMg7:'',
        weightMg8:'',
        weightMg9:'',      
        weightavageMg:'',//重量平均值mg
        measureddiamUm:'',//实测直径um
      },
    }
  },
  created() {
    this.id = this.$route.query.id
    this.edit=this.$route.query.edit
    this.getData()
  },
  methods: {
    // 保存全部
    async saveAll(){
      if(this.edit<0){
        this.tmouldDetail.mouldId=this.id
      }
      const { data: res } = await this.$http.post('mouldController/saveFinishedproducecheck',{
        ...this.tmouldDetail,
        remark:this.tmould.remark
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success("保存成功")
      this.$router.go(-1)
    },
    //计算实测直径um
    cal2(){
      if(!this.tmouldDetail.weightMg0||!this.tmouldDetail.weightMg1||!this.tmouldDetail.weightMg2||!this.tmouldDetail.weightMg3||!this.tmouldDetail.weightMg4||!this.tmouldDetail.weightMg5||!this.tmouldDetail.weightMg6||!this.tmouldDetail.weightMg7||!this.tmouldDetail.weightMg8||!this.tmouldDetail.weightMg9){
        return
      }
      this.tmouldDetail.measureddiamUm=Math.sqrt( (4000*this.tmouldDetail.weightavageMg)/(this.tmouldDetail.density*3.1415926*this.tmouldDetail.lengthM) )
    },
    // 计算平均值
    cal1(){
      if(!this.tmouldDetail.weightMg0||!this.tmouldDetail.weightMg1||!this.tmouldDetail.weightMg2||!this.tmouldDetail.weightMg3||!this.tmouldDetail.weightMg4||!this.tmouldDetail.weightMg5||!this.tmouldDetail.weightMg6||!this.tmouldDetail.weightMg7||!this.tmouldDetail.weightMg8||!this.tmouldDetail.weightMg9){
        return
      }
      this.tmouldDetail.weightavageMg=(+this.tmouldDetail.weightMg0+(+this.tmouldDetail.weightMg1)+(+this.tmouldDetail.weightMg2)+(+this.tmouldDetail.weightMg3)+(+this.tmouldDetail.weightMg4)+(+this.tmouldDetail.weightMg5)+(+this.tmouldDetail.weightMg6)+(+this.tmouldDetail.weightMg7)+(+this.tmouldDetail.weightMg8)+(+this.tmouldDetail.weightMg9))/10
    },
    // 获取页面初始数据
    async getData() {
      const { data: res } = await this.$http.post('mouldController/getFinishedproducecheckById', {
        findById: this.id,
        findModelName: this.$route.query.edit >= 0 ? 'C' : 'I'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      res.data.tmould.remark=''
      this.tmould = res.data.tmould
      if(res.data.tmouldDetail){
        this.tmouldDetail=res.data.tmouldDetail
      }
      
    },
    
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.gray {
  color: #646c9a;
}
.footer{
  margin: 20px  ;
  text-align: center;
  
}
.tips{
  color: red;
  font-size: 14px;
  margin:0 20px;
}
</style>
