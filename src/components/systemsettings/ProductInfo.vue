<template>
    <el-card>
        <div class="meta">厂房信息</div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="产房LOGO" >
                <el-upload
                :class="{hide:showUpload}"
                ref="upload"
                :on-success="handleSuccess"
                :headers="headerObj"
                :limit="1"
                action="http://192.168.31.96:8080/SysController/localUploadPic"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus" ></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="厂房信息" prop="workshopName">
                <el-input v-model="form.workshopName"></el-input>
            </el-form-item>
            <el-form-item label="厂房地址" prop="workshopAddress">
                <el-input v-model="form.workshopAddress"></el-input>
            </el-form-item>
            <el-form-item label="厂房介绍" prop="workshopRemark">
                <el-input v-model="form.workshopRemark"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="workshopContact">
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
        form:{},
        dialogImageUrl: '',
        dialogVisible: false,
        // 图片上传组件的headers请求头对象
        headerObj: {
            Authorization: window.sessionStorage.getItem('token')
        },
      };
    },
    methods: {
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
            this.$message.success('新增成功')
            this.$refs.form.resetFields()
            this.$refs.upload.clearFiles()
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
