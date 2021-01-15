<template>
    <el-card>
        <el-form   label-width="120px">
            <el-row >
                <el-col :span="6">  
                    <el-form-item label="文件名称">
                        <el-input v-model="submitForm.findName"></el-input>
                    </el-form-item>
                </el-col>
                
                <el-col :span="6" :offset="6">  
                    <el-button type="primary" @click="getData">筛选</el-button>
                    <el-button type="primary" @click="addDialog" plain>新增</el-button>
                    <el-button type="text" @click="clearAll()">清空筛选</el-button>
                </el-col>
            </el-row>
            <el-table
            :header-cell-style="{background:'#f0f5ff'}"
            :data="tableData"
            style="width: 100%;margin-top:0">
                <el-table-column
                    type="index"
                    label="序号"
                    >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="发布时间"
                    >
                </el-table-column>
                <el-table-column
                    prop="noticeName"
                    label="公告名称"  
                    >
                </el-table-column>
                <el-table-column
                    prop="staffName"
                    label="发布人">
                </el-table-column>
                <el-table-column
                    prop="noticeContent"
                    label="公告内容"
                    width="300">
                    <template slot-scope="scope">
                        <span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap; ">{{scope.row.noticeContent}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否在首页显示">  
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isshow" :active-value='1' :inactive-value='0' @change="switchChange(scope.row.id )">
                        </el-switch>
                    </template>                  
                </el-table-column>
                <el-table-column                  
                    label="操作">
                    <template slot-scope="scope">                     
                            <el-button type="primary"  size="mini" @click="downLoad(scope.row.id)">下载</el-button>                            
                            <el-button type="success"  size="mini" @click="addDialog(scope.row.id)">更新</el-button>                            
                            <el-button type="danger"  size="mini" @click="del(scope.row.id)">删除</el-button>                    
                    </template>
                </el-table-column>             
            </el-table>   
        </el-form>
        <el-pagination
            :current-page="submitForm.pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="submitForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <el-dialog
        :title="id>=0?'编辑':'新增'"
        :visible.sync="dialogVisible"
        width="30%"
        @close="dialogClose"
        >
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="公告名称">
                <el-input v-model="form.noticeName" ></el-input>
            </el-form-item>
            <el-form-item label="公告内容">
                <el-input v-model="form.noticeContent" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="文件上传">
                <el-upload
                    ref="upload"
                    :data="{findModelName:'NOTICE'}"
                    action="http://192.168.31.93:8080/fileController/upload"
                    :on-success="handleSuccess"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :headers="headerObj"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传doc/docx/pdf/jpg/png文件，且不超过100M</div>
                </el-upload>
            </el-form-item>
            
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        </span>
        </el-dialog>
        
    </el-card>
</template>
<script>
export default {
    inject: ['reload'],
    data(){
        return{
            form:{
                noticeContent:'',
                noticeName:'',
                noticeRoute:'',
            },
            dialogVisible:false,
            tableData: [],
            submitForm:{
                findName:'',
                pageNum:1,
                pageSize:10
            },
            total:0,
            // 图片上传组件的headers请求头对象
            headerObj: {
                accessToken: window.sessionStorage.getItem('token')
            },
            fileList: [],
            id:-1,
            type:'',
            id:'',//选中的id
        }
    },
    created(){
        this.getData()
    },
    methods: {
        //switch发生变化
        async switchChange(id){
            const { data: res } = await this.$http.post('fileController/updateNoticeByid',{
                updateID:id,
                updateType:'S'
            } )
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success('更新成功')
            this.getData()
        },
        //清空筛选
        clearAll(){
            this.submitForm.findName=''
        },
        // 新增监听对话框关闭
        dialogClose(){
            this.form={
                noticeContent:'',
                noticeName:'',
                noticeRoute:'',
            }
            
            this.$refs.upload.clearFiles()
        },
        //新增点击确认
        async dialogConfirm(){
            
            if(this.id>=0){
                this.form.id=this.id
            }
            const { data: res } = await this.$http.post('fileController/saveSysAnnouncement',this.form )
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success(this.id>=0?'编辑成功':'新增成功')
            this.dialogVisible=false
            this.getData()
        },
        //   监听图片上传成功
        handleSuccess(response) { 
            this.form.noticeRoute=response.data.path 
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //点击新增
        async addDialog(id=-1){
            if(id>=0){
                this.id=id
                const { data: res } = await this.$http.post('fileController/getNoticeById',{
                    findById:this.id
                } )
                if (res.code !== "0010") return this.$message.error(res.msg)
                this.form=res.data.sNotice
                this.fileList.push({
                    name:res.data.sNotice.noticeName,
                    url: res.data.sNotice.noticeRoute
                })
            }
            this.dialogVisible=true
        },
        // 删除文件
        async del(id){
            const confirmResult = await this.$confirm(
                '是否确认删除？',
                '提示',
                {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }
            ).catch(err => err)
            if (confirmResult !== 'confirm') {
                return 
            }       
            const { data: res } = await this.$http.post('fileController/updateNoticeByid',{
                updateID:id,
                updateType:'D'
            } )
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success('删除成功')
            this.getData()
        },
        // 下载文件
        async downLoad(id){
            const { data: res } = await this.$http.post('fileController/downloadFile',{
                findById:id,
                findModelName:'NOTICE'
            } )
            if (res.code !== "0010") return this.$message.error(res.msg)
            window.location.href = 'http://192.168.31.93:8080/'+res.data;
            
        },
        // 获取页面初始数据
        async getData(){
            const { data: res } = await this.$http.post('fileController/getAllNotice',this.submitForm )
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.total=res.data.total
            this.tableData=res.data.list
        },
        // 采购订单
        toSaleBilling(){
            this.$router.push('/salebilling')
        },
        // 跳转页面
        todo(path) {
            window.sessionStorage.setItem('activePath', path)
            this.$router.push(path)
            this.reload()
        }
    },
}
</script>
<style lang="less" scoped>
.el-card{
    width: 100%;
    height: 100%;
    position: relative;
    .item{
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        margin-bottom: 30px;
        cursor: pointer;
    }
    .current {
      position: relative;
      color: #0790ff;
      &:after {
        content: ' ';
        width: 100px;
        height: 4px;
        background: #0790ff;
        position: absolute;
        bottom: -7px;
        border-radius: 2px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .el-pagination{
      margin: 60px;
  }
}
</style>


