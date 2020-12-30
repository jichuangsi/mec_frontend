<template>
    <el-card>
        
        <el-form ref="form" label-width="120px">
            <el-row >
                <el-col :span="6">  
                    <el-form-item label="投诉内容">
                        <el-input v-model="form.findName"></el-input>
                    </el-form-item>
                </el-col>
                
                <el-col :span="6" :offset="12">  
                    <el-button type="primary" @click="choose">筛选</el-button>
                    <el-button @click="addDialog">新增</el-button>
                    <el-button type="text" @click="clear">清空筛选</el-button>
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
                    label="创建时间"
                    >
                </el-table-column>
                <el-table-column
                    prop="customerName"
                    label="投诉客户"  
                    >
                </el-table-column>
                <el-table-column
                    prop="complaintTitle"
                    label="投诉标题"  
                    >
                </el-table-column>
                <el-table-column
                    prop="complaintContent"
                    label="投诉内容"  
                    >
                </el-table-column>
                <el-table-column
                    label="上传人"  
                    >
                    <template slot-scope="scope">
                        {{scope.row.staffName?scope.row.staffName:'———'}}
                    </template>
                </el-table-column>
                
                <el-table-column                  
                    label="操作">
                    <template slot-scope="scope">                     
                            <el-button type="primary"  size="mini" @click="editFormDialog(scope.row)">编辑</el-button>                            
                            <el-button type="danger"  size="mini" @click="del(scope.row)">删除</el-button>                     
                    </template>
                </el-table-column>             
            </el-table>   
        </el-form>
        <el-pagination
                    :current-page="form.pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="form.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="total">
        </el-pagination>
        <!-- 添加投诉的对话框 -->
        <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="40%"
        >
            <el-form ref="addForm" :model="addForm" label-width="80px" style="width:80%;">
                <el-form-item label="投诉客户">
                    <el-select v-model="addForm.customerId" placeholder="请选择活动区域" style="width:100%;">
                        <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in listClient" :key="item.mapKey"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投诉标题">
                    
                    <el-input v-model="addForm.complaintTitle"></el-input>
                </el-form-item>
                <el-form-item label="投诉内容">
                    <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="addForm.complaintContent">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDialogConfirm">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑投诉的对话框 -->
        <el-dialog
        title="编辑"
        :visible.sync="editDialogVisible"
        width="40%"
        >
            <el-form ref="editForm" :model="editForm" label-width="80px" style="width:80%;">
                <el-form-item label="投诉客户">
                    <el-select v-model="editForm.customerId" placeholder="请选择" style="width:100%;">
                        <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in listClient" :key="item.mapKey"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投诉标题">
                    
                    <el-input v-model="editForm.complaintTitle"></el-input>
                </el-form-item>
                <el-form-item label="投诉内容">
                    <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="editForm.complaintContent">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDialogConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>
<script>
export default {
    inject: ['reload'],
    data(){
        return{
            editDialogVisible:false,
            dialogVisible:false,
            addForm:{
                customerId:'',
                complaintTitle:'',
                complaintContent:'',

            },
            form:{
                findName:'',
                pageNum:1,
                pageSize:10,
            },
            tableData: [],
            listClient:[],
            total:0,
            editForm: {
                customerId:'',
                complaintTitle:'',
                complaintContent:'',
                id:'',
            },
        }
    },
    created(){
        this.getData()
    },
    methods: {
        // 点击删除
        async del(row){
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
                return this.$message.info('已经取消删除！')
            }
            let obj={
                updateType:"D",
                updateID: row.id,
            }
            const { data: res } = await this.$http.post('SysController/updateComplaintById',obj)
            if (res.code !== "0010"){
                return this.$message.error(res.msg)
            }else{
                this.$message.success('删除成功！')
                this.getData()   
            }
        },
        // 点击清空
        clear(){
            this.form.findName=''
            this.getData()
        },
        // 确认编辑
        async editDialogConfirm(){
            const { data: ress } = await this.$http.post('SysController/saveComplaint',this.editForm)
            if (ress.code !== "0010") return this.$message.error(ress.msg)
            this.$message.success('编辑成功')
            this.editDialogVisible=false
            this.getData()
        },
        // 编辑操作
        async editFormDialog(row){
            this.editForm.id=row.id
            const { data: res } = await this.$http.post('SysController/findClientAllXiaLa?clientNo=1')
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.listClient=res.data.listClient            
            this.editDialogVisible=true
            const { data: ress } = await this.$http.post('SysController/findUserComplaintById',{findById:row.id})
            if (res.code !== "0010") return this.$message.error(ress.msg)
            this.editForm.customerId=ress.data.customerId
            this.editForm.complaintTitle=ress.data.complaintTitle
            this.editForm.complaintContent=ress.data.complaintContent
        },
        // pageSize改变
        handleSizeChange(val){
            this.form.pageSize=val
            this.getData()
        },
        // 翻页功能
        handleCurrentChange(val){
            this.form.pageNum=val
            this.getData()
        },
        // 对话框新增确认
        async addDialogConfirm(){
            const { data: res } = await this.$http.post('SysController/saveComplaint',this.addForm)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success('新增成功')
            this.dialogVisible=false
            this.getData()
        },
        // 点击新增
        async addDialog(){
            const { data: res } = await this.$http.post('SysController/findClientAllXiaLa?clientNo=1')
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.listClient=res.data.listClient
            
            this.dialogVisible=true
        },
        // 点击筛选
        choose(){
            this.getData()
            
        },
        // 获取页面的初始数据
        async getData(){
          
            const { data: res } = await this.$http.post('SysController/findComplaint', this.form)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.tableData=res.data.list
            this.total=res.data.total
            
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


