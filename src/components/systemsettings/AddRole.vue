<template>
<div>
    <el-card class="card-top">
        <div class="meta">角色信息</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="角色名称" style="width:600px;">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="备注" style="width:600px;">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="权限配置">
                 <el-table
                    :data="tableData"
                    style="width: 100%"
                    height="250">
                    <el-table-column
                    fixed
                    prop="date"
                    label="日期"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="province"
                    label="省份"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="市区"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址"
                    width="300">
                    </el-table-column>
                    <el-table-column
                    prop="zip"
                    label="邮编"
                    width="120">
                    </el-table-column>
                </el-table>
            </el-form-item>           
            <el-form-item label="角色状态">
                <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
        </el-form>
        <div class="footer">
            <el-button  @click="cancel">取消</el-button>
            <el-button type="primary">保存</el-button>
        </div>
    </el-card>
</div>
    
    
</template>
<script>
export default {
    data(){
        return{
            dialogVisible:false,
            radio:'',
            formLabelAlign: {
            name: '',
            region: '',
            type: '',
            resource:'',
            },
            value: true,
            labelPosition: 'right',
            tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
        }
    },
    methods:{
        cancel(){
            this.$router.go(-1)
        },
        
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
        margin-top: 30px;
    }
}
.card-bottom{
    margin-top: 20px;
    .meta{
        font-weight: bold;
    }
}
.footer{
    text-align: center;
}
</style>
