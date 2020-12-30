<template>
  <div>
    <el-page-header @back="cancel" content="新增成品模具"> </el-page-header>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;margin-bottom:20px;">
        基本信息
      </div>
      <el-form ref="mould" :model="mould" label-width="180px">
        <el-form-item label="模具名称">
            <el-input v-model="mould.mouldName" style="width:40%;"></el-input>
        </el-form-item>
        <el-form-item label="模具型号">
            <el-input v-model="mould.mouldModel" style="width:40%;"></el-input>
        </el-form-item>
        <el-form-item label="模具编号">
            <el-input v-model="mould.mouldNumber" style="width:40%;"></el-input>
        </el-form-item>
        <el-form-item label="模具线别"  >
            <el-select v-model="mould.linetypeId" placeholder="请选择" style="width:40%;">
                <el-option :label="item.name" :value="item.id" v-for="item in XBType" :key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标称直径um">
            <el-input v-model="mould.wiredrawRemark" style="width:40%;"></el-input>
        </el-form-item>
        <el-form-item label="拉丝量参考范围g">
            <el-col :span="1" style="color:red;" :offset="1">
                上限
            </el-col>
            <el-col :span="2" >
                <el-input v-model="mould.wiredrawUp" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-col>
            <el-col :span="1" style="color:red;" :offset="1">
                标准
            </el-col>
            <el-col :span="2" >
                <el-input v-model="mould.wiredrawgPip" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-col>
            <el-col :span="1" style="color:red;" :offset="1">
                下限
            </el-col>
            <el-col :span="2" >
                <el-input v-model="mould.wiredrawgDown" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="预警参考量">
            <el-input v-model="mould.warnRacc" style="width:40%;"></el-input>
        </el-form-item>
        <el-form-item label="累计拉丝量">
            <el-input v-model="mould.wiredrawSum" style="width:40%;"></el-input>
        </el-form-item>
        <el-form-item label="适用机型">
            <el-select v-model="mould.modelusedId" placeholder="请选择 "  style="width:40%;">
            <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in equipmentXiaLa" :key="item.mapKey"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div class="footer">
          <el-button @click="cancel"> 取消</el-button>
          <el-button @click="saveAll" type="primary"> 保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
        form:{
            name:''
        },
        XBType:[],
        equipmentXiaLa:[],
        id:-1,
        mould:{
            mouldName:'',
            mouldModel:'',
            mouldNumber:'',
            linetypeId:'',
            wiredrawRemark:'',
            wiredrawUp:'',
            wiredrawgPip:'',
            wiredrawgDown:'',
            warnRacc:'',
            wiredrawSum:'',
            modelusedId:'',
            cuffingmouldNno:''
        }
    }
  },
  created() {
      
      this.getSelecteds()
  },
  methods: {
    //   点击保存
    async saveAll(){
        if(this.id>=0){
            this.mould.id=this.id
        }
        this.mould.cuffingmouldNno=0
        const { data: res } = await this.$http.post('mouldController/saveCompleteSet',{
            tMould:this.mould
        })
        if (res.code !== "0010") return this.$message.error(res.msg)
        this.$message.success(this.id>=0?'编辑成功':'新增成功')
        this.$router.go(-1)
    },
    //获取下拉框数据
    async getSelecteds(){
        const { data: res } = await this.$http.post('mouldController/getMouldInfo',{
            iswhether:0
        })
        if (res.code !== "0010") return this.$message.error(res.msg)
        this.XBType=res.data.XBType
        this.equipmentXiaLa=res.data.equipmentXiaLa
        this.id=this.$route.query.id
        if(this.id>=0){
            const { data: res } = await this.$http.post('mouldController/getTMouldByID',{
                findById:this.id
            })
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.mould=res.data.mould
        }
    },
    // 返回上一页
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.footer{
    text-align: left;
    margin-left: 30%;
    margin-top: 20px;
}
</style>
