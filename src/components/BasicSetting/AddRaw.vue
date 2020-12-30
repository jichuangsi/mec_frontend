<template>
    <div>
        <el-card >
            <el-row>
                <el-col :span="1"><div @click="cancel" style="cursor: pointer;"><i class="el-icon-back" style="font-size:20px;"></i><span style="margin-left:5px;">返回</span></div> </el-col>
                <el-col :span="2">| 规格型号设置</el-col>
            </el-row>
        </el-card>
        <el-card style="margin-top:20px;">
            <div class="meta">基本信息</div>
            <el-form ref="stock" :model="stock" label-width="120px" style="width:600px;padding-left:80px;">
                <el-form-item label="原材料编号">
                    <el-input v-model="stock.stockNumber" disabled></el-input>
                </el-form-item>
                <el-form-item label="原材料名称">
                    <el-input v-model="stock.stockName"></el-input>
                </el-form-item>
                <el-form-item label="原材料型号">
                    <el-input v-model="stock.stockModel"></el-input>
                </el-form-item>
                <el-form-item label="原材料线别">
                    <el-select v-model="stock.stockTypeId" placeholder="请选择 " style="width:100%;">
                    <el-option :label="item.name" :value="item.id" v-for="item in selecteds.XB" :key="item.id"></el-option>
                   
                    </el-select>
                </el-form-item>
                <el-form-item label="原材料说明">
                    <el-input v-model="stock.stockRemarks"></el-input>
                </el-form-item>
                <el-form-item label="单位">
                    <el-select v-model="stock.dictionarierId" placeholder="请选择 " style="width:100%;">
                    <el-option :label="item.name" :value="item.id" v-for="item in selecteds.DW" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                
            </el-form>
        </el-card>
        <el-card style="margin-top:20px;">
            <div class="meta">
                规格型号
                <el-button type="primary" plain style="margin-left:60%;" @click="addguige()">新增</el-button>
            </div>
             <el-table
                :data="tstandards"
                height="250"
                style="width: 100%">
                <el-table-column
                type="index"
                width="300"
                label="序号"
                >
                </el-table-column>
                <el-table-column
                prop="standards"
                label="规格">
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="addguige(scope.$index)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align:center;margin-top:20px;">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary"  @click="saveAll">保存</el-button>
                
            </div>
        </el-card>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        @close="handleClose">
        <el-form ref="tstandardsItem" :model="tstandardsItem" label-width="80px"  >
            <el-form-item label="序号 " >
                <el-input :value="index==-1?tstandards.length+1:index" disabled style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label="规格" prop="standards"  >
                <el-input v-model="tstandardsItem.standards" oninput = "value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input><span style="margin-left:20px;color:red;">单位(g)</span>
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
            stock: {
                stockNumber:'',
                stockName:'',
                stockModel:'',
                stockTypeId:'',
                stockRemarks:'',
                dictionarierId:'',          
            },        
            id:'',//编辑操作选中的id
            selecteds:{},//获取的下拉框
            dialogVisible:false,//控制规格型号对话框的隐藏
            tstandards:[],//规格型号数组
            tstandardsItem:{
                id:'',
                standards:''
            },//每个规格型号
            index:-1,//选中规格型号的序号
            
        }
    },
    created(){
        this.getSelecteds()
        if(this.$route.query.id>=0){
            this.id=this.$route.query.id
            this.getData()
        }
        
    },
    methods:{
        // 点击保存
        async saveAll(){
            if(this.id>=0){
                this.stock.id=this.id
            }
            const { data: res } = await this.$http.post('BasicSettingController/saveRawStock',{
                stock:this.stock,
                tstandards:this.tstandards
            })
            if (res.code !== "0010") return this.$message.error(res.msg)
             this.$message.success("添加成功")
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
                return this.$message.info('已经取消删除！')
            }
            this.tstandards.splice(index,1)
            this.$message.success('删除成功')
        },
        // 监听对话框关闭
        handleClose(){
            this.tstandardsItem.id=''
            this.tstandardsItem.standards=' '
            this.index=-1
        },
        // 新增对话框点击确定
        dialogConfirm(){
            if(!this.tstandardsItem.standards.trim()){
                return
            }
            if(this.index>=0){
                this.tstandards.splice(this.index,1,_.cloneDeep(this.tstandardsItem))
            }else{
                this.tstandards.push(_.cloneDeep(this.tstandardsItem))
            }
            
            this.dialogVisible=false

        },
        // 新增规格
        addguige(index=-1){
            this.dialogVisible=true
            if(index>=0){
                this.tstandardsItem=_.cloneDeep(this.tstandards[index])
                this.index=index
            }
        },
        // 获取下拉框的数据
        async getSelecteds(){
            const { data: res } = await this.$http.post('BasicSettingController/getRawStockInfo',{
                findModelName:'YL'
            })
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.selecteds=res.data
            this.stock.stockNumber=res.data.rawStockNum
        },
        // 根据id获取页面初始数据
        async getData(){
            const { data: res } = await this.$http.post('BasicSettingController/getAllBasicSettingByNameAndId',{
                findModelName:'stock',
                findById:this.id
            })
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.tstandards=res.data.listDetail
            this.stock=res.data.stockModel
        },
        // 返回
        cancel(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
.meta{
    font-weight: bold;
    margin-bottom: 22px;
    .tips{
        margin-left: 60px;
        font-size: 12px;
        color: #db5564;
    }
}

</style>