<template>
    <div>
        <el-page-header @back="goback" content="采购订单审核" style="margin-bottom:20px;">
        </el-page-header>      
        <!-- 申请采购单 -->
        <el-card style="margin-top:20px;">
            <div class="meta">申请采购单</div>
            <el-form ref="purchase" :model="purchase" label-position="top" >
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-form-item label="供应商名称">
                            <el-select v-model="purchase.customerId" placeholder="请选择 ">
                            <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in customerXiaLa" :key="item.mapKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="负责人">
                            <el-select v-model="purchase.staffId" placeholder="请选择 ">
                            <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in userXiaLa" :key="item.mapKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="采购类型">
                            <el-select v-model="purchase.purchasetypeId" placeholder="请选择 ">
                            <el-option :label="item.name" :value="item.id" v-for="item in purchaseType" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="仓库">
                            <el-select v-model="purchase.warehouseiId" placeholder="请选择活动区域">
                            <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in warehouse" :key="item.mapKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="开单日期" style="width:85%;">
                            <el-date-picker type="date" placeholder="选择日期" v-model="purchase.createTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="交货日期" style="width:85%;">
                            <el-date-picker type="date" placeholder="选择日期" v-model="purchase.finishedTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-form-item label="采购单号" style="width:85%;">
                            <el-input v-model="pruchaseNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="订单状态" style="width:85%;">
                            <el-input v-model="orderState"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="检验状态" style="width:85%;">
                            <el-input v-model="checkState"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="付款方式">
                            <el-select v-model="purchase.paytypeId" placeholder="请选择活动区域">
                            <el-option :label="item.name" :value="item.id" v-for="item in payType" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="备注" style="width:85%;">
                            <el-input v-model="purchase.remark"></el-input>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
                
            </el-form>
        </el-card>
        <!-- 采购条目 -->
        <el-card style="margin-top:20px;">
            <el-row>
                <el-col :span="4"><div class="meta" >采购条目</div></el-col>
                
            </el-row>
            <el-table
            :header-cell-style="{background:'#f0f5ff'}"
            :data="purchaseDetail"
            style="width: 100%;margin-bottom:20px;">
                <el-table-column
                   type="index"
                    label="序号"
                >
                </el-table-column>
                <el-table-column
                    prop="stockName"
                    label="原材料名称"
                >
                </el-table-column>
                <el-table-column
                    prop="stockModel"
                    label="原材料型号"
                >
                </el-table-column>
                <el-table-column
                    prop="stockNumber"
                    label="原材料编号"
                >
                </el-table-column>
                <el-table-column
                    prop="standards"
                    label="规格"
                >
                </el-table-column>
                <el-table-column
                    prop="stockAmount"
                    label="数量"
                >
                </el-table-column>
                <el-table-column
                    prop="unitName"
                    label="单位"
                 >
                </el-table-column>
                <el-table-column
                    prop="stockUnitPrice"
                    label="单价(元)">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注">
                </el-table-column>
                <el-table-column
                    prop="stockSum"
                    label="合计(元)">
                </el-table-column>
            </el-table>
            
        </el-card>
        <el-card style="margin-top:20px;">
            <div class="meta">审核流程</div>
             <el-timeline style="width:60%;margin:20px auto;">
                <el-timeline-item :timestamp="item.auditSetting" placement="top" v-for="item in auditDetail" :key="item.id">
                <el-card>
                    <h4>{{item.remark}}</h4>
                    <p>王小虎 提交于 {{item.createTime | dateFormat}}</p>
                </el-card>
                </el-timeline-item>
               
            </el-timeline>
            <div class="footer" v-if="purchase.orderState==3||purchase.orderState==4">
                <el-button type="primary" @click="showDialog('T')">审核通过</el-button>              
                <el-button type="warning" @click="showDialog('F')">驳回</el-button>
            </div>
           
        </el-card>
        <el-dialog
        :title="type=='T'?'审核通过':'驳回'"
        :visible.sync="dialogVisible"
        width="30%"
        @close="dialogClose">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="备注">
                <el-input v-model="form.updateRemark"></el-input>
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
export default {
    data() {
        return {
            auditDetail:'',//时间线的数据
            id:'',//页面跳转过来的id
            purchaseDetail: [],//表格数据
            customerXiaLa:[],//供应商的下拉框
            userXiaLa:[],  //负责人的下拉框
            purchaseType:[],    //采购类型的下拉框
            warehouse:[],   //仓库的下拉框
            payType:[],   //付款方式的下拉框
            orderState:'',   //订单状态
            checkState:'',    //检验状态
            pruchaseNum:'',   //采购单号
            purchase:{
                customerId:0,//供应商名称
                staffId:0,//负责人
                purchasetypeId:0,//采购类型
                warehouseiId:0,//仓库
                createTime:'',  //开单日期
                finishedTime:'', //交货日期
                paytypeId:0,//付款方式
                remark:'',//备注
                orderState:'',
            },    //申请采购单
            dialogVisible:false,
            form:{
                updateRemark:'',
            },
            type:'',
        }
    },
    created(){
        this.id=this.$route.query.message
        this.getData()
    },
    methods: {
        // 监听对话框关闭
        dialogClose(){
            this.form.updateRemark=''
        },
        //对话框点击确认
        async dialogConfirm(){
            this.form.updateID=this.id
            this.form.updateType=this.type
            const { data: res } = await this.$http.post('PurchaseController/updatePurchaseOrderAuditByid',this.form )
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success("编辑成功")
            this.$router.go(-1)
        },
        // 打开对话框
        showDialog(type){
            this.type=type
            this.dialogVisible=true
        },
        // 返回上一步
        goback(){
            this.id=this.$router.go(-1)
        },
        // 获取页面初始数据
        async getData(){
            const { data: res } = await this.$http.post('PurchaseController/getPurchaseBasicInfo' )
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.customerXiaLa=res.data.customerXiaLa
            this.userXiaLa=res.data.userXiaLa
            this.purchaseType=res.data.purchaseType
            this.warehouse=res.data.warehouse
            this.payType=res.data.payType
            this.checkState=res.data.checkState
            this.orderState=res.data.orderState
            this.pruchaseNum=res.data.pruchaseNum
            const { data: ress } = await this.$http.post('PurchaseController/getPurchaseById',{findById:this.id} )
            if (ress.code !== "0010") return this.$message.error(ress.msg)
            this.checkState=ress.data.purchase_checkState
            this.orderState=ress.data.purchase_orderstate
            this.purchase=ress.data.purchase
            this.purchaseDetail=ress.data.purchaseDetail
            this.auditDetail=ress.data.auditDetail
        },

    },
}
</script>
<style lang="less" scoped>
.top{
    cursor: pointer;
}
.meta{
    font-weight: bold;
    margin-bottom: 20px;
}
.footer{
    text-align: right;
    margin-top: 40px;
}
</style>
