<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="1"><div @click="goback" class="top"><i class="el-icon-back" style="font-size:20px;"></i><span style="margin-left:5px;">返回</span></div> </el-col>
                <el-col :span="2">| 订单审核</el-col>
            </el-row>
        </el-card>
        <!-- 销售申请单 -->
        <el-card style="margin-top:20px;">
            <div class="meta">销售申请单</div>
            <el-form ref="saleorder" :model="saleorder" label-position="top" >
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-form-item label="客户名称">
                            <el-select v-model="saleorder.customerId" placeholder="请选择" style="width:100%;">
                                <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in selecteds.kehuXiaLa" :key="item.mapKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="负责人">
                            <el-select v-model="saleorder.staffId" placeholder="请选择 " style="width:100%;">
                            <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in selecteds.userXiaLa" :key="item.mapKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="销售类型">
                            <el-select v-model="saleorder.saleTypeId" placeholder="请选择 " style="width:100%;">
                            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.purchaseType" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="仓库">
                            <el-select v-model="saleorder.warehouseId" placeholder="请选择 " style="width:100%;">
                            <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in selecteds.warehouse" :key="item.mapKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="开单日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="saleorder.createTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="交货日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="saleorder.finishedTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-form-item label="销售单号">
                            <el-input v-model="selecteds.pruchaseNum" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="订单状态">
                            <el-input v-model="selecteds.orderState" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="审核状态">
                            <el-input v-model="selecteds.checkState" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="付款方式">
                            <el-select v-model="saleorder.payType" placeholder="请选择 " style="width:100%;">
                            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.payType" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="运输方式">
                            <el-input v-model="saleorder.transportType"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="4">
                        <el-form-item label="交货地点">
                            <el-input v-model="saleorder.receiveAddress"></el-input>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
                
            </el-form>
        </el-card>
        <!-- 销售条目 -->
        <el-card style="margin-top:20px;">
            <el-row>
                <el-col :span="4"><div class="meta" >销售条目</div></el-col>
                
            </el-row>
            <el-table
            :header-cell-style="{background:'#f0f5ff'}"
            :data="saleOrderDetail"
            style="width: 100%;margin-bottom:20px;">
                <el-table-column
                    type="index"
                    label="序号"
                >
                </el-table-column>
                <el-table-column
                    prop="productName"
                    label="产品名称"
                >
                </el-table-column>
                <el-table-column
                    prop="productModel"
                    label="产品型号"
                >
                </el-table-column>
                <el-table-column
                    prop="productNumber"
                    label="产品编号">
                </el-table-column>
                <el-table-column
                    prop="umStart"
                    label="规格">
                </el-table-column>
                <el-table-column
                    prop="productNum"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="unitName"
                    label="单位">
                </el-table-column>
                <el-table-column
                    prop="productPrice"
                    label="单价(元)">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注">
                </el-table-column>
                <el-table-column
                    prop="productSum"
                    label="合计(元)">
                </el-table-column>
            </el-table>
            
        </el-card>
        <el-card style="margin-top:20px;">
            <div class="meta">审核流程</div>
             <el-timeline style="width:60%;margin:20px;">
                <el-timeline-item :timestamp="item.auditSetting" placement="top" v-for="item in initData.auditDetail" :key="item.id">
                <el-card>
                    <h4>{{item.remark}}</h4>
                    <p>{{item.staffName}} 提交于 {{item.createTime}}</p>
                </el-card>
                </el-timeline-item>
                
                
            </el-timeline>
            <div class="footer" >
                <span style="margin-right:20%;">此单 <span style="color:red;">{{initData.detailSize}}</span> 个产品，共计：<span style="color:red;">{{initData.sumMoney}}</span>元</span>
                <span v-if="saleorder.orderStateId==6||saleorder.orderStateId==7">
                    <el-button type="primary" @click="showDialog('T')">审核通过</el-button>
                    <el-button type="warning" @click="showDialog('F')">审核不通过</el-button>
                </span>
            </div>
        </el-card>
        <el-dialog
        :title="form.updateType=='T'?'审核通过':'审核不通过'"
        :visible.sync="dialogVisible"
        width="30%"
        @close="dialogClose"
        >
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="审核备注">
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
            dialogVisible:false,
            form:{
                updateRemark:'',
                updateType:'',//通过否 “T”:通过，"F":不通过
                updateID:'',
            },
            
            selecteds:{},
            saleorder: {
                id: '',//订单id
                customerId: '',//客户id
                staffId: '',//负责人id
                saleTypeId: '',//销售类型id
                warehouseId: '',//仓库id
                createTime: '',//创建时间
                finishedTime: "",//完成时间
                saleOrder: "",//销售订单号
                orderStateId: '',//订单状态  （0：草稿  1：提交）
                payType: '',//(付款类型id)
                transportType: "",//运输方式
                receiveAddress: "",//交货地址
                remark: "",
                deleteNo: ''
            },
            saleOrderDetail:[],
            initData:{},
            
        }
    },
    created(){
        this.getSelecteds()
    },
    methods: {
        // 监听对话框关闭
        dialogClose(){
            this.form.updateRemark=''
        },
        //对话框点击确认
        async dialogConfirm(){
            const { data: res } = await this.$http.post('saleController/updateSaleAuditStateByid',this.form)
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.$message.success("编辑成功")
            this.dialogVisible=false
            this.$router.go(-1)
        },
        //展示对话框 
        showDialog(updateType){
            this.form.updateType=updateType
            this.dialogVisible=true
        },
        // 获取初始下拉框数据
        async getSelecteds(){
            if(this.$route.query.id>=0){
                this.form.updateID=this.$route.query.id
            }
            let t=this
            const { data: res } = await this.$http.post('saleController/getSaleBasicInfo')
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.selecteds=res.data
            if(this.$route.query.id>=0){
                let id=this.$route.query.id
                const { data: ress } = await this.$http.post('saleController/getSaleById',{
                    findById:id
                })
                if (ress.code !== "0010") return this.$message.error(ress.msg)
                this.saleorder=ress.data.saleorder
                this.saleOrderDetail=ress.data.saleOrderDetail
                this.initData=ress.data
            }
        },
        // 返回上一步
        goback(){
            this.$router.go(-1)
        }
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
    padding-right: 5%;
}
</style>
