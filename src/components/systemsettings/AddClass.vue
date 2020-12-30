<template>
<div>
    <el-card class="card-top">
        <div class="meta">班组信息</div>
        <el-form :label-position="labelPosition" label-width="120px" :model="classForm">
            <el-form-item label="班组名称">
                <el-input v-model="classForm.teamName"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="classForm.remark"></el-input>
            </el-form-item>
            <el-form-item label="班组负责人">
                <el-select v-model="classForm.staffId" placeholder="请选择"  style="width:100%">
                    <el-option :label="item.mapValue2+' '+item.mapValue" :value="item.mapKey" v-for="item in SelectedData" :key="item.mapKey"></el-option>
                   
                </el-select>
            </el-form-item>           
            <el-form-item label="班次">
                <el-checkbox-group v-model="classForm.frequency">
                    <el-checkbox label="白班"></el-checkbox>
                    <el-checkbox label="夜班"></el-checkbox>
                    
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="班组状态">
                <el-switch
                v-model="classForm.state"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card class="card-bottom">
        <el-row :gutter="100">
            <el-col :span="14">
                <div class="meta" >班组成员</div>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" plain @click="addTableData">新增</el-button>
            </el-col>
        </el-row>
         <el-table
            :header-cell-style="{background:'#f0f5ff'}"
            :data="tableData"
            style="width: 100%;margin-top:30px;">
            <el-table-column
                type="index"
                label="序号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="teamName"
                label="班组"
                >
            </el-table-column>
            <el-table-column
                prop="staffIdCard"
                label="员工编号"
                >
            </el-table-column>
            <el-table-column
                prop="staffIdName"
                label="姓名">
            </el-table-column>
            <el-table-column
                label="操作">
                <template>
                    <el-button type="primary" size="mini">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align:center;margin-top:30px;">
                <el-button type="primary" plain @click="cancel">取消</el-button>
                <el-button type="primary" @click="saveClass">保存</el-button>

        </div>
    </el-card>
    <!-- 提示的对话框 -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%">
        
        <el-select v-model="dialogStaffId" placeholder="请选择"  style="width:100%" >
            <el-option :label="item.mapValue2+' '+item.mapValue" :value="item.mapKey" v-for="item in SelectedData" :key="item.mapKey"></el-option>                  
        </el-select>
            
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addForm">新增</el-button>
        </span>
    </el-dialog>
</div>
    
    
</template>
<script>
import _ from 'lodash'
export default {
    data(){
        return{
            dialogVisible:false,
            radio:'',
            classForm: {
                teamName: '',
                remark: '',
                staffId: '',
                frequency:[],
                state:true
            },
            dialogStaffId:'',
            labelPosition: 'right',
            tableData: [],
            SelectedData:[],
        }
    },
    created(){
        this.getSelectedData()
    },
    methods:{
        // 保存新增员工
        async saveClass(){
            let paiban=''
            if(this.classForm.frequency.includes('白班')){
                paiban='1,'
            } 
            if(this.classForm.frequency.includes('夜班')){
                paiban+='2'
            }
            if(this.classForm.state){
                this.classForm.state='1'
            }else{
                this.classForm.state='0'
            }
            this.classForm.frequency=paiban
            let idList=''
            this.tableData.forEach(item=>{
                item.staffIdCard=item.staffIdCard+','
                idList+=item.staffIdCard
            })
            this.classForm.teamStaffList=idList
            const { data: res } = await this.$http.post('SysController/addTeam', this.classForm)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success('添加成功')
            this.$router.go(-1)
        },
        // 点击新增按钮
        addForm(){
            let obj={}
            this.SelectedData.forEach(item=>{
                if(item.mapKey==this.dialogStaffId){
                    obj.staffIdCard=item.mapValue2
                    obj.staffIdName=item.mapValue
                }
            })
            this.tableData.push({
                teamName:this.classForm.teamName,
                staffIdCard:obj.staffIdCard,
                staffIdName:obj.staffIdName,

            })
            this.dialogVisible=false
        },

        addTableData(){
            this.dialogVisible=true

        },
        cancel(){
            this.$router.go(-1)
        },
        async getSelectedData(){           
            const { data: result } = await this.$http.post('SysController/getBasicInfo')
            if (result.code !== "0010") return this.$message.error(result.msg)
            this.SelectedData=result.data.staffList

        }
    }
}
</script>
<style lang="less" scoped>
.card-top{
    .meta{
        font-weight: bold;
    }
    .el-form {
        margin-left: 140px;
        width: 600px;
        margin-top: 30px;
  }
}
.card-bottom{
    margin-top: 20px;
    .meta{
        font-weight: bold;
    }
}
</style>
