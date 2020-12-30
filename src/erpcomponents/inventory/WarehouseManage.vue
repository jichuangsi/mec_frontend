<template>
    <el-card>      
        <el-form ref="form" label-width="120px">
            <el-row >
                <el-col :span="6">  
                    <el-form-item label="仓库名称">
                        <el-input v-model="submitForm.findName"></el-input>
                    </el-form-item>
                </el-col>
                
                <el-col :span="6" :offset="6">  
                    <el-button type="primary" @click="getData">筛选</el-button>
                    <el-button type="primary"  plain @click="showDialog">新增</el-button>
                    <el-button type="text" @click="clearAll">清空筛选</el-button>
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
                    prop="warehouseNumber"
                    label="仓库编号"
                    >
                </el-table-column>
                <el-table-column
                    prop="warehousenName"
                    label="仓库名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="staffName"
                    label="负责人"
                    >
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                    >
                </el-table-column>
                <el-table-column
                    label="仓库状态"  
                    >
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" :active-value='1' :inactive-value='0' @change="switchChange(scope.row.id )">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column                  
                    label="操作">
                    <template slot-scope="scope">                     
                        <el-button type="primary"  size="mini" @click="showDialog(scope.row.id)">编辑</el-button>                            
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
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            @close="dialogClose">
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="仓库编号">
                    <el-input v-model="form.warehouseNumber" style="width:55%" disabled></el-input>
                </el-form-item>
                <el-form-item label="仓库名称">
                    <el-input v-model="form.warehousenName" style="width:55%"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-select v-model="form.staffId" placeholder="请选择 ">
                        <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in selecteds.userXiaLa" :key="item.mapKey"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark" style="width:55%"></el-input>
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
            tableData: [],
            submitForm:{
                findName:'',
                pageNum:1,
                pageSize:10,
            },
            form:{
                id:'',
                remark:'',
                staffId:'',
                state:'',
                warehouseNumber:'',
                warehousenName:'',
            },
            total:0,
            dialogVisible:false,
            selecteds:{},
            id:-1,
        }
    },
    created(){
        this.getData()
    },
    methods: {
        //清空筛选
        clearAll(){
            this.submitForm.findName=''
        },
        //切换switch
        async switchChange(id){
            const { data: res } = await this.$http.post('warehouseController/updateWarehouseByid',{
                updateID:id,
                updateType:'S'
            })
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success("修改成功")
            this.getData()
        },
        // 删除
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
            const { data: res } = await this.$http.post('warehouseController/updateWarehouseByid',{
                updateID:id,
                updateType:'D'
            })
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success('删除成功')
            this.getData()
        },
        //监听对话框关闭
        dialogClose(){
            this.form={
                id:'',
                remark:'',
                staffId:'',
                state:'',
                warehouseNumber:'',
                warehousenName:'',
            }
        },
        ///确认新增
        async dialogConfirm(){
            if(!this.form.warehousenName.trim()||!this.form.staffId){
                return
            }
            const { data: res } = await this.$http.post('warehouseController/saveWarehouse',this.form)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success(this.id>=0?'编辑成功':"新增成功")
            this.dialogVisible=false
            this.getData()
        },
        //打开新增的对话框
        async showDialog(id=-1){
            this.dialogVisible=true           
            const { data: res } = await this.$http.post('warehouseController/getwarehouseBasicInfo')
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.selecteds=res.data
            this.form.warehouseNumber=res.data.warehouseNum
            if(id>=0){
                this.id=id
                const { data: res } = await this.$http.post('warehouseController/getWarehourseById',{
                    findById:this.id
                })
                if (res.code !== "0010") return this.$message.error(res.msg)
                this.form=res.data.tWarehouse
            }
        },
        //获取页面的初始数据
        async getData(){
            const { data: res } = await this.$http.post('warehouseController/getAllWarehouse',this.submitForm)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.total=res.data.total
            this.tableData=res.data.list
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


