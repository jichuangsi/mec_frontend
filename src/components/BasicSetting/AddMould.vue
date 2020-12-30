<template>
    <div>
        <el-page-header @back="cancel" content="新增成套模具">
        </el-page-header>
        <el-card style="margin-top:20px;">
            <div style="font-weight:bold;margin-bottom:20px;">基本信息</div>
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="模具名称">
                    <el-input v-model="tmould.mouldName" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="模具型号">
                    <el-input v-model="tmould.mouldModel" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="模具编号">
                    <el-input v-model="tmould.mouldNumber" style="width:30%;"></el-input>
                </el-form-item>          
                <el-form-item label="模具线别">
                    <el-select v-model="tmould.linetypeId" placeholder="请选择 " style="width:30%;">
                    <el-option :label="item.name" :value="item.id" v-for="item in XBType" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="拉丝范围描述">
                    <el-input v-model="tmould.wiredrawRemark" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="拉丝范围um">
                    <el-col :span="1" style="color:red;" :offset="1">上限</el-col>
                    <el-col :span="2"><el-input  v-model="tmould.wiredrawUp" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
                    <el-col :span="1" style="color:red;" :offset="1">下限</el-col>
                    <el-col :span="2"><el-input  v-model="tmould.wiredrawDown" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
                </el-form-item>
                <el-form-item label="拉丝量参考范围g">
                    <el-col :span="1" style="color:red;" :offset="1">上限</el-col>
                    <el-col :span="2"><el-input v-model="tmould.wiredrawgUp" oninput = "value=value.replace(/[^\d.]/g,'')"  ></el-input></el-col>
                    <el-col :span="1" style="color:red;" :offset="1">标准</el-col>
                    <el-col :span="2"><el-input v-model="tmould.wiredrawgPip" oninput = "value=value.replace(/[^\d.]/g,'')" ></el-input></el-col>
                    <el-col :span="1" style="color:red;" :offset="1">下限</el-col>
                    <el-col :span="2"><el-input v-model="tmould.wiredrawgDown" oninput = "value=value.replace(/[^\d.]/g,'')"   ></el-input></el-col>
                </el-form-item>
                <el-form-item label="预警参考量">
                    <el-input v-model="tmould.warnRacc" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="累计拉丝量">
                    <el-input v-model="tmould.wiredrawSum" style="width:30%;" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="适用机型">
                    <el-select v-model="tmould.modelusedId" placeholder="请选择 " style="width:30%;">
                    <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in equipmentXiaLa" :key="item.mapKey"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top:20px">
            <div style="font-weight:bold;">模具套装 <el-button type="primary" style="margin-left:70%;" @click="showDialog">新增</el-button></div>
             <el-table
                :data="cuffingcheck"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="序号"
                >
                </el-table-column>
                <el-table-column
                    prop="mouldModel"
                    label="模具型号"
                >
                </el-table-column>
                <el-table-column
                    prop="sonmouldModel"
                    label="子模具型号">
                </el-table-column>
                <el-table-column
                    prop="sonmouldSpaNum"
                    label="子模具孔径">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="showDialog(scope.$index)">查看</el-button>
                        <el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table> 
            <div class="footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="saveAll()">保存</el-button>
            </div>      
        </el-card>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        @close="dialogClose" >
        <el-form ref="form" :model="cuffingcheckItem" label-width="120px">
            <el-form-item label="序号">
                <el-input :value="index>=0?index+1:cuffingcheck.length+1" disabled style="width:60%;"></el-input>
            </el-form-item>
            <el-form-item label="子模具型号">
                <el-input v-model="cuffingcheckItem.sonmouldModel" style="width:60%;"></el-input>
            </el-form-item>
            <el-form-item label="子模具孔径">
                <el-input v-model="cuffingcheckItem.sonmouldSpaNum" style="width:60%;"></el-input>
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
import _ from 'lodash'
export default {
    data() {
        return {
            aaa:'',
            form:{
                name:'',
                aaa:'',
            },
            tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
            }],
            dialogVisible:false,
            id:-1,
            cuffingcheck:[],
            cuffingcheckItem:{
                mouldModel:'',
                sonmouldModel:'',
                sonmouldSpaNum:''
            },
            tmould:{
                mouldName:'',
                mouldModel:'',
                mouldNumber:'',
                linetypeId:'',
                wiredrawRemark:'',
                wiredrawDown:'',
                wiredrawgUp:'',
                wiredrawgPip:'',
                wiredrawgDown:'',
                warnRacc:'',
                wiredrawSum:'',
                modelusedId:'',
                id:'',
            },
            XBType:[],
            equipmentXiaLa:[],
            index:-1,
        }
    },
    created(){
        this.id=this.$route.query.id    
        if(this.id>=0){
            this.getData()
        }else{
            this.getSelecteds()
        }
    },
    methods:{
        // 保存所有数据
        async saveAll(){
            if(this.id>=0){
                this.tmould.id=this.id
            }
            this.tmould.cuffingmouldNno=1
            const { data: res } = await this.$http.post('mouldController/saveCompleteSet',{
                tMould:this.tmould,
                tMouldDetailList:this.cuffingcheck
            })
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success(this.id>=0?"编辑成功":'新增成功')
            this.$router.go(-1)
        },
        // 点击删除
        async del(index){
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
            this.cuffingcheck.splice(index,1)
            this.$message.success('删除成功')
        },
        //监听对话框关闭
        dialogClose(){
            this.cuffingcheckItem={
                mouldModel:'',
                sonmouldModel:'',
                sonmouldSpaNum:''
            }
            this.index=-1
        },
        // 确认对话框
        dialogConfirm(){
            this.cuffingcheckItem.mouldModel=this.tmould.mouldModel
            this.cuffingcheck.push({...this.cuffingcheckItem})
            this.dialogVisible=false
        },
        // 获取初始下拉框数据
        async getSelecteds(){
            const { data: res } = await this.$http.post('mouldController/getMouldInfo',{
                iswhether:1
            })
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.equipmentXiaLa=res.data.equipmentXiaLa
            this.XBType=res.data.XBType
            this.tmould.mouldNumber=res.data.mouldNumber
        },
        // 根据id 获取页面的初始数据
        async getData(){
            this.getSelecteds()
            const { data: res } = await this.$http.post('mouldController/getTMouldByID',{
                findById:this.id
            })
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.tmould=res.data.mould
            this.cuffingcheck=res.data.mouldDetail
            this.cuffingcheck.forEach(item=>{
                item.mouldModel=this.tmould.mouldModel
            })
        },
        cancel(){
            this.$router.go(-1)
        },
        //打开对话框
        showDialog(index=-1){
            this.index=index
            if(this.index>=0){
                this.cuffingcheckItem=_.cloneDeep(this.cuffingcheck[this.index])
            }
            this.dialogVisible=true
        }
    }
}
</script>
<style lang="less" scoped>
.footer{
    margin-top: 20px;
    margin-left: 80%;
}
</style>
