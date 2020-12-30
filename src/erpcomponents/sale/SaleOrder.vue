<template>
    <el-card>
        
        <el-form ref="form" label-width="120px">
            <el-row >
                <el-col :span="6">  
                    <el-form-item label="订单编号">
                        <el-input v-model="form.findName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">  
                    <el-form-item label="开单时间">
                        <el-date-picker
                        v-model="form.findDate"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="6">  
                    <el-button type="primary" @click="getData()">筛选</el-button>
                    <el-button type="primary" @click="toSaleBilling()" plain>销售开单</el-button>
                    <el-button>导出</el-button>
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
                    label="开单时间"
                    >
                    <template slot-scope="scope">
                        {{scope.row.createTime|| dateFormat}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="saleOrder"
                    label="销售单号"
                    >
                </el-table-column>
                <el-table-column
                    prop="customer"
                    label="客户"
                    >
                </el-table-column>
                <el-table-column
                    prop="orderSum"
                    label="订单总金额(元)"
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
                    prop="orderStates"
                    label="订单状态"  
                    >
                </el-table-column>
                <el-table-column
                    prop="checkStates"
                    label="审核状态">
                </el-table-column>
                <el-table-column                  
                    label="操作">
                    <template slot-scope="scope">                     
                            <el-button type="primary"  size="mini" @click="toSaleBilling(scope.row.id)">查看</el-button>                            
                            <el-button type="danger"  size="mini">删除</el-button>                     
                    </template>
                </el-table-column>             
            </el-table>   
        </el-form>
        <el-pagination
            @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="form.pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </el-card>
</template>
<script>
export default {
    inject: ['reload'],
    data(){
        return{
            tableData: [],
            form:{
                pageNum:1,
                pageSize:10,
                findName:'',
                findDate:''
            },//提交查询的条件
            total:0,
        }
    },
    created(){
        this.getData()
    },
    methods: {
        // pageSize发生变化
        handleSizeChange(newSize) {
            this.form.pageSize = newSize
            this.getData()
        },
        // 当前页发生变化
        handleCurrentChange(newPage) {
            this.form.pageNum = newPage
            this.getData()
        },
        async getData(){
            const { data: res } = await this.$http.post('saleController/getAllSale',{
                ...this.form
            }              
            )
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.total=res.data.total
            this.tableData=res.data.list
        },
        // 采购订单
        toSaleBilling(id=-1){      
            this.$router.push({
                path:'/salebilling',
                query: {
                        id: id
                }
            })
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


