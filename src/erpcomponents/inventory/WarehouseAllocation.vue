<template>
    <el-card>
        <el-tabs v-model="activeName" >
            <el-tab-pane label="原材料" name="first">
                <template>
                    <el-form ref="form" label-width="80px">
                        <el-row :gutter="40">
                            <el-col :span="6">  
                                <el-form-item label="产品名称">
                                    <el-input ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">  
                                <el-form-item label="变动时间">
                                    <el-input ></el-input>
                                </el-form-item>
                            </el-col>
                            
                            <el-col :span="6">  
                                <el-button type="primary">筛选</el-button>
                                <el-button type="primary" plain>出库</el-button>
                                <el-button type="primary" plain>入库</el-button>
                            </el-col>
                        </el-row>
                        <el-table
                        :header-cell-style="{background:'#f0f5ff'}"
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="日期"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"  
                                >
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="地址">
                            </el-table-column>
                            <el-table-column                  
                                label="操作">
                                <template >                     
                                    <el-button type="primary"  size="mini" @click="toDetail">查看</el-button>
                                </template>
                            </el-table-column>             
                        </el-table>   
                    </el-form>
                    <el-pagination
                        :current-page="4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </template>
            </el-tab-pane>
            <el-tab-pane label="半成品" name="second">
                <template>
                    <el-form ref="form" label-width="80px">
                        <el-row :gutter="40">
                            <el-col :span="6">  
                                <el-form-item label="产品名称">
                                    <el-input ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">  
                                <el-form-item label="变动时间">
                                    <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">  
                                <el-button type="primary">筛选</el-button>
                                <el-button type="primary" plain>出库</el-button>
                                <el-button type="primary" plain>入库</el-button>
                            </el-col>
                        </el-row>
                        <el-table
                        :header-cell-style="{background:'#f0f5ff'}"
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="日期"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"  
                                >
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="地址">
                            </el-table-column>
                            <el-table-column                  
                                label="操作">
                                <template >                     
                                    <el-button type="primary"  size="mini" @click="toDetail">查看</el-button>
                                </template>
                            </el-table-column>             
                        </el-table>   
                    </el-form>
                    <el-pagination
                        :current-page="4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </template>
            </el-tab-pane>
            <el-tab-pane label="成品" name="3">
                <template>
                    <el-form ref="form" label-width="80px">
                        <el-row :gutter="40">
                            <el-col :span="6">  
                                <el-form-item label="产品名称">
                                    <el-input ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">  
                                <el-form-item label="变动时间">
                                    <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            
                            <el-col :span="6">  
                                <el-button type="primary">筛选</el-button>
                                <el-button type="primary" plain>出库</el-button>
                                <el-button type="primary" plain>入库</el-button>
                            </el-col>
                        </el-row>
                        <el-table
                        :header-cell-style="{background:'#f0f5ff'}"
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="日期"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"  
                                >
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="地址">
                            </el-table-column>
                            <el-table-column                  
                                label="操作">
                                <template >                     
                                    <el-button type="primary"  size="mini" @click="toDetail">查看</el-button>
                                </template>
                            </el-table-column>             
                        </el-table>   
                    </el-form>
                    <el-pagination
                        :current-page="4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </template>
            </el-tab-pane>
            <el-tab-pane label="废料" name="4">
                <template>
                    <el-form ref="form" label-width="80px">
                        <el-row :gutter="40">
                            <el-col :span="6">  
                                <el-form-item label="产品名称">
                                    <el-input ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">  
                                <el-form-item label="变动时间">
                                    <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            
                            <el-col :span="6">  
                                <el-button type="primary">筛选</el-button>
                                <el-button type="primary" plain>出库</el-button>
                                <el-button type="primary" plain>入库</el-button>
                            </el-col>
                        </el-row>
                        <el-table
                        :header-cell-style="{background:'#f0f5ff'}"
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="日期"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"  
                                >
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="地址">
                            </el-table-column>
                            <el-table-column                  
                                label="操作">
                                <template >                     
                                    <el-button type="primary"  size="mini" @click="toDetail">查看</el-button>
                                </template>
                            </el-table-column>             
                        </el-table>   
                    </el-form>
                    <el-pagination
                        :current-page="4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </template>
            </el-tab-pane>
            
            <el-tab-pane label="其他" name="6">
                <template>
                    <el-form ref="form" label-width="80px">
                        <el-row :gutter="40">
                            <el-col :span="6">  
                                <el-form-item label="产品名称">
                                    <el-input ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">  
                                <el-form-item label="变动时间">
                                    <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            
                            <el-col :span="6">  
                                <el-button type="primary">筛选</el-button>
                                <el-button type="primary" plain>出库</el-button>
                                <el-button type="primary" plain>入库</el-button>
                            </el-col>
                        </el-row>
                        <el-table
                        :header-cell-style="{background:'#f0f5ff'}"
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="日期"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"  
                                >
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="地址">
                            </el-table-column>
                            <el-table-column                  
                                label="操作">
                                <template >                     
                                    <el-button type="primary"  size="mini" @click="toDetail">查看</el-button>
                                </template>
                            </el-table-column>             
                        </el-table>   
                    </el-form>
                    <el-pagination
                        :current-page="4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </template>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            activeName:'first',
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
            }]
        }
    },
    methods: {
        toDetail(){
            this.$router.push('/orderreviewdetail')
        }
    },
}
</script>
<style lang="less" scoped>
.tips{
    color: #e0001b;
    font-size: 12px;
}
</style>
