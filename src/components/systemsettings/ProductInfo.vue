<template>
    <el-card>
        <div class="meta">厂房信息</div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="厂房LOGO" >
                <el-upload
                :class="{hide:showUpload}"
                ref="upload"
                :on-success="handleSuccess"
                :headers="headerObj"
                :limit="1"
                :file-list="fileList"
                action="http://192.168.0.186:8080/SysController/localUploadPic"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus" ></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="厂房信息">
                <el-input v-model="form.workshopName"></el-input>
            </el-form-item>
            <el-form-item label="厂房地址" >
                <el-input v-model="form.workshopAddress"></el-input>
            </el-form-item>
            <el-form-item label="厂房介绍" >
                <el-input v-model="form.workshopRemark"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" >
                <el-input v-model="form.workshopContact"></el-input>
            </el-form-item>
        </el-form>
        <div class="div-footer">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button>取消</el-button>
        </div>
    </el-card>
</template>
<script>
export default {
    data() {
      return {
        showUpload:false,
        form:{
            workshopName:'',
            workshopRemark:'',
            workshopAddress:'',
            workshopContact:'',
            workshopImg:'',
        },
        dialogImageUrl: '',
        fileList:[],
        dialogVisible: false,
        // 图片上传组件的headers请求头对象
        headerObj: {
            accessToken: window.sessionStorage.getItem('token')
        },
      };
    },
    created() {
        this.getData()
    },
    methods: {
        async getData(){
            const { data: res } = await this.$http.post('SysController/getWorkShopNewInfo', this.form)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.form.workshopName=res.data.workshopName
            this.form.workshopRemark=res.data.workshopRemark
            this.form.workshopAddress=res.data.workshopAddress
            this.form.workshopContact=res.data.workshopContact
            this.form.workshopImg=res.data.workshopImg
            if(this.form.workshopImg){  
                this.fileList.push({url:'http://192.168.0.186:8080'+this.form.workshopImg })             
                this.dialogImageUrl='http://192.168.0.186:8080'+this.form.workshopImg               
                this.showUpload = true
            }
        },
        handleRemove(file, fileList) {
            this.showUpload = false
        
        },
        handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        },
        //   监听图片上传成功
        handleSuccess(response) {
        console.log(response)
        
        this.form.workshopImg=response.data  
        this.showUpload = true
        },
        // 点击提交
        async save(){       
            const { data: res } = await this.$http.post('SysController/addWorkShop', this.form)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success('保存成功')   
        }
    }
}
</script>
<style lang="less" scoped>
/deep/ .hide .el-upload--picture-card {
  display: none;
}
.meta{
    font-weight: bold;
}
.el-form{
    margin-top: 60px;
    width: 700px;
    margin-left: 140px;
}
.div-footer{
    text-align: center;
    margin-top: 20px;
}
</style>
