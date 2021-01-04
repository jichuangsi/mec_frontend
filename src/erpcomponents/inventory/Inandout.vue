<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="原材料" name="stock">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="变动时间">
                  <el-date-picker v-model="submitForm.findDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" plain @click="getData()">筛选</el-button>
              </el-col>
              <el-col :span="6" :offset="5">
                <el-button type="primary" @click="showAllocatDialog('diaobo')">调拨</el-button>
                <el-button type="success"  @click="showAllocatDialog('chuku')">出库</el-button>
                <el-button type="warning"  @click="showAllocatDialog('ruku')">入库</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="createTime" label="时间"></el-table-column>
              <el-table-column prop="recordType" label="类型"></el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="changequantity" label="发生数量"> </el-table-column>
              <el-table-column prop="surplusquantity" label="剩余数量"> </el-table-column>
            </el-table>
          </el-form>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="半成品" name="selfproduct">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="变动时间">
                  <el-date-picker v-model="submitForm.findDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" plain @click="getData()">筛选</el-button>
              </el-col>
              <el-col :span="6" :offset="5">
                <el-button type="primary" @click="showAllocatDialog('diaobo')">调拨</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="createTime" label="时间"></el-table-column>
              <el-table-column prop="recordType" label="类型"></el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="changequantity" label="发生数量"> </el-table-column>
              <el-table-column prop="surplusquantity" label="剩余数量"> </el-table-column>
            </el-table>
          </el-form>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="成品" name="product">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="变动时间">
                  <el-date-picker v-model="submitForm.findDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" plain @click="getData()">筛选</el-button>
              </el-col>
              <el-col :span="6" :offset="5">
                <el-button type="primary" @click="showAllocatDialog('diaobo')">调拨</el-button>
                <el-button type="success"  @click="showAllocatDialog('chuku')">出库</el-button>
                <el-button type="warning"  @click="showAllocatDialog('ruku')">入库</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="createTime" label="时间"></el-table-column>
              <el-table-column prop="recordType" label="类型"></el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="changequantity" label="发生数量"> </el-table-column>
              <el-table-column prop="surplusquantity" label="剩余数量"> </el-table-column>
            </el-table>
          </el-form>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="废料" name="waste">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="变动时间">
                  <el-date-picker v-model="submitForm.findDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" plain @click="getData()">筛选</el-button>
              </el-col>
              <el-col :span="6" :offset="5">
                <el-button type="primary" @click="showAllocatDialog('diaobo')">调拨</el-button>
                <el-button type="success"  @click="showAllocatDialog('chuku')">出库</el-button>
                <el-button type="warning"  @click="showAllocatDialog('ruku')">入库</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="createTime" label="时间"></el-table-column>
              <el-table-column prop="recordType" label="类型"></el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="changequantity" label="发生数量"> </el-table-column>
              <el-table-column prop="surplusquantity" label="剩余数量"> </el-table-column>
            </el-table>
          </el-form>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="线轴" name="bobbin">
        <template>
          <el-form ref="form" label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="变动时间">
                  <el-date-picker v-model="submitForm.findDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
                  <el-button type="primary" plain @click="getData()" style="margin-left:5px;">筛选</el-button>
                </el-form-item>
              </el-col>
              
              <el-col :span="5">
                <span class="tips">*审核层级按数字由小到大排序，数字越小越先审核，如：审核层级为1的人先审核，然后按数字依次审核。</span>
              </el-col>
              <el-col :span="6"  >
                <el-button type="primary" @click="showAllocatDialog('diaobo')">调拨</el-button>
                <el-button type="success"  @click="showAllocatDialog('chuku')">出库</el-button>
                <el-button type="warning"  @click="showAllocatDialog('ruku')">入库</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="createTime" label="时间"></el-table-column>
              <el-table-column prop="recordType" label="类型"></el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="changequantity" label="发生数量"> </el-table-column>
              <el-table-column prop="surplusquantity" label="剩余数量"> </el-table-column>
            </el-table>
          </el-form>
          <el-pagination :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
      <el-tab-pane label="其他" name="elseother">
        <template>
          <el-form label-width="80px">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-form-item label="产品名称">
                  <el-input v-model="submitForm.findName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="变动时间">
                  <el-date-picker v-model="submitForm.findDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" plain @click="getData()">筛选</el-button>
              </el-col>
              <el-col :span="6" :offset="5">
                <el-button type="primary" @click="showAllocatDialog('diaobo')">调拨</el-button>
                <el-button type="success"  @click="showAllocatDialog('chuku')">出库</el-button>
                <el-button type="warning"  @click="showAllocatDialog('ruku')">入库</el-button>
              </el-col>
            </el-row>
            <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="createTime" label="时间"></el-table-column>
              <el-table-column prop="recordType" label="类型"></el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="stockName" label="产品名称"> </el-table-column>
              <el-table-column prop="stockModel" label="产品型号"> </el-table-column>
              <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="changequantity" label="发生数量"> </el-table-column>
              <el-table-column prop="surplusquantity" label="剩余数量"> </el-table-column>
            </el-table>
          </el-form>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="submitForm.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="submitForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </template>
      </el-tab-pane>
    </el-tabs>
    <!--原材料调拨的对话框  -->
    <el-dialog title="原材料调拨" :visible.sync="allocatDialogVisible" width="60%" @close="allocatDialogClose">
      <!-- 上一部分的表格 -->
      <el-row>
        <el-col :span="7">
          <el-col :span="6"><span style="line-height:40px;">产品名称：</span></el-col>
          <el-col :span="18">
            <el-input placeholder="请输入内容" v-model="ChuKuForm.findName">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getAllocat"></i>
            </el-input>
          </el-col>
        </el-col>
        <el-col :span="7" :offset="1" v-if="type=='diaobo'||type=='chuku'">
          <el-col :span="6"><span style="line-height:40px;">调出仓库：</span></el-col>
          <el-col :span="18">
            <el-select placeholder="请选择 " v-model="ChuKuForm.findIdOne"  @change="getAllocat">
              <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in warehourseXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="7" :offset="1" v-if="type=='diaobo'||type=='ruku'">
          <el-col :span="6"><span style="line-height:40px;">调入仓库：</span></el-col>
          <el-col :span="18">
            <el-select placeholder="请选择 " v-model="updateWarehourseID" >
              <el-option :label="item.mapValue+'--'+item.mapValue2" :value="item.mapKey" v-for="item in warehourseXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-table stripe :data="listdata" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" style="width: 100%" @row-click="rowClick">
            <el-table-column prop="stockName" label="产品名称"> </el-table-column>
            <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-table stripe :data="listdataDetail" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" style="width: 100%">
            <el-table-column prop="updateRemark" label="规格"> </el-table-column>
            <el-table-column prop="updateNum" label="库存数量">
              <template slot-scope="scope">
                {{scope.row.updateNum?scope.row.updateNum:'  --'}}
              </template>  
            </el-table-column>
            <el-table-column label="选定数量"> 
              <template slot-scope="scope">
                <el-input  v-model="scope.row.xuandingNum" size="mini"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 下一部分的表格 -->
      <el-row>
        <el-col :span="5">
          <span style="line-height:60px;font-weight:bold;">待调拨原材料</span>
        </el-col>
        <el-col :span="3" :offset="16">
          <el-button type="primary" plain size="mini" style="margin-top:20px;" @click="addAllData">添加</el-button>
        </el-col>
      </el-row>

      <el-table stripe :data="listdataDetailAll" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" style="width: 100%">
        <el-table-column prop="stockName" label="产品名称"> </el-table-column>
        <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
        <el-table-column prop="updateRemark" label="规格"> </el-table-column>
        <el-table-column   label="库存数量">
          <template slot-scope="scope">
            {{scope.row.updateNum?scope.row.updateNum:'  --'}}
          </template>  
        </el-table-column>
        <el-table-column prop="xuandingNum" label="已选定数量"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer">
        <el-button @click="allocatDialogVisible = false">取 消</el-button>
        <el-button style="margin-right:20%;margin-left:5%;" type="primary" @click="allocatNext">下一步</el-button>
      </span>
    </el-dialog>
    <!--原材料调拨下一步的对话框  -->
    <el-dialog :title="type == 'diaobo' ? '原材料调拨 ' : type =='chuku' ? '出库' : '入库' " :visible.sync="allocatNextDialogVisible" width="60%" @close="allocatNextDialogClose">
      <!-- 下一部分的表格 -->
      <el-row>
        <el-col :span="7">
          <span style="line-height:60px;font-weight:bold;">已选择待调拨原材料</span>
        </el-col>
      </el-row>

      <el-table stripe :data="listdataDetailAll" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#f0f5ff', padding: '0' }" style="width: 100%">
        <el-table-column prop="stockName" label="产品名称"> </el-table-column>
        <el-table-column prop="stockNumber" label="产品编号"> </el-table-column>
        <el-table-column prop="updateRemark" label="规格"> </el-table-column>
        <el-table-column prop="updateNum" label="库存数量" >
          <template slot-scope="scope">
            {{scope.row.updateNum?scope.row.updateNum:'  --'}}
          </template>
        </el-table-column>
        <el-table-column prop="xuandingNum" label="已选定数量"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin:20px;text-align:center;">备注：<el-input placeholder="请输入备注内容" style="width:40%;" v-model="updateRemark"></el-input></div>
      <span slot="footer">
        <el-button @click="allocatNextDialogVisible = false">取 消</el-button>
        <el-button style="margin-right:20%;margin-left:5%;" type="primary" @click="allocatConfirm" v-if="type=='diaobo'">调拨</el-button>
        <el-button style="margin-right:20%;margin-left:5%;" type="primary" @click="allocatConfirm" v-if="type=='chuku'">出库</el-button>
        <el-button style="margin-right:20%;margin-left:5%;" type="primary" @click="allocatConfirm" v-if="type=='ruku'">入库</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      activeName: 'stock',
      tableData: [],
      allocatDialogVisible: false,
      allocatNextDialogVisible: false,
      value1: '',
      submitForm: {
        findDate: '',
        findModelName: '',
        findName: '',
        pageNum: 1,
        pageSize: 10
      },
      total:0,
      warehourseXiaLa:[],
      ChuKuForm:{
        findName:'',
        findModelName:'',
        findIdOne:'',
      },
      listdata:[],
      listdataDetail:[],
      listdataDetailAll:[],
      listdataObj:{
        stockName:'',//产品名称
        stockNumber:'',//产品编号
      },
      updateWarehourseID:'',//选中的仓库id
      updateRemark:'',//备注
      type:'',
    }
  },
  created() {
        if(sessionStorage.getItem("inandout")){
            this.activeName=sessionStorage.getItem("inandout")
        }
        this.getData()
  },
  methods: {
    handleSizeChange(newSize) {
      this.submitForm.pageSize = newSize
      this.getData()
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.submitForm.pageNum = newPage
      this.getData()
    },
    // 监听下一步对话框关闭
    allocatNextDialogClose(){
      this.listdataDetailAll=[]
      this.getData()
      this.updateRemark='',
      this.updateWarehourseID=''
    },
    // 监听调拨的对话框关闭
    allocatDialogClose(){      
      this.listdataDetail=[]
    },
    // 最后确认调拨
    async allocatConfirm(){
      let list=[]
      let obj={
        findModelName:this.activeName,
        updateID:'',
        updateNum:'',
        updateRemark:this.updateRemark
      }
      if(this.type=="diaobo"||this.type=="ruku"){
        obj.updateWarehourseID=this.updateWarehourseID       
      }   
      this.listdataDetailAll.forEach(item=>{
        obj.updateID=item.updateID
        obj.updateNum=item.xuandingNum
        obj.unitId=item.unitId
        obj.stockModel=item.stockModel
        obj.stockName=item.stockName
        obj.stockNumber=item.stockNumber
        obj.standards=item.updateRemark
        list.push(_.cloneDeep(obj))
      })      
      if(this.type=='diaobo'){      
        const { data: res } = await this.$http.post('warehouseController/updateWarehouseAllocation',list)
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.$message.success("调拨成功")
      }else if(this.type=="chuku"){
        const { data: res } = await this.$http.post('warehouseController/updateWarehouseOut',list)
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.$message.success("出库成功")
      }else{      
        const { data: res } = await this.$http.post('warehouseController/updateWarehouseIn',list)
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.$message.success("入库成功")
      }    
      this.allocatNextDialogVisible=false
      this.getData()
    },
    del(index){
      this.listdataDetailAll.splice(index,1)
    },
    // 添加数据合并
    addAllData(){
      this.listdataDetailAll.push(..._.cloneDeep(this.listdataDetail))
      this.listdataDetailAll.forEach(item=>{
        item.stockName=item.stockName?item.stockName:this.listdataObj.stockName
        item.stockModel=item.stockModel?item.stockModel:this.listdataObj.stockModel
        item.unitId=item.unitId?item.unitId:this.listdataObj.unitId
        item.stockNumber=item.stockNumber?item.stockNumber:this.listdataObj.stockNumber
      })
      this.listdataDetailAll=this.listdataDetailAll.filter(item => item.xuandingNum > 0 )
      if(this.type=="diaobo"||this.type=="chuku"){
        this.listdataDetailAll=this.listdataDetailAll.filter(item =>  item.xuandingNum<=item.updateNum )
      }
    },
    // 每一行点击
    async rowClick(row){
      if(this.type=="ruku"){
        const { data: res } = await this.$http.post('warehouseController/getAllWarehousingProductById',{
        findById:row.id,
        findModelName:this.activeName
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.listdataDetail=res.data.liststockDetail
        this.listdataObj.stockName=row.stockName
        this.listdataObj.stockNumber=row.stockNumber
        this.listdataObj.unitId=row.dictionarierId
        this.listdataObj.stockModel=row.stockModel
      }else{
        const { data: res } = await this.$http.post('warehouseController/getAllWarehousingChuKuById',{
        findById:row.id,
        findModelName:this.activeName
        })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.listdataDetail=res.data.listdataDetail
        this.listdataObj.stockName=row.stockName
        this.listdataObj.stockNumber=row.stockNumber
      }
      
    },
    //获取页面的初始数据
    async getData() {
        this.submitForm.findModelName=this.activeName
        const { data: res } = await this.$http.post('warehouseController/getAllWarehousing', this.submitForm)
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.total = res.data.total
        this.tableData=res.data.list
    },
    //点击tab标签
    handleClick() {
      this.getData()
      sessionStorage.setItem("inandout",this.activeName)
    },
    //展示调拨下一步
    allocatNext() {
      if(this.type=='diaobo'||this.type=='ruku')
       if(!this.updateWarehourseID){
          return this.$message.error("请选择仓库")
        }
      this.allocatDialogVisible = false
      this.allocatNextDialogVisible = true
    },
    // 获取调拨的初始数据
    async getAllocat(){
      if(this.type=='ruku'){
        const { data: ress } = await this.$http.post('warehouseController/getAllWarehousingProduct',this.ChuKuForm)
        if (ress.code !== '0010') return this.$message.error(ress.msg)
        this.listdata=ress.data.liststock
        this.listdataDetail=ress.data.liststockDetail
        this.listdataObj.stockName=ress.data.liststock[0].stockName
        this.listdataObj.stockNumber=ress.data.liststock[0].stockNumber
        this.rowClick(ress.data.liststock[0])
      }else{
        const { data: ress } = await this.$http.post('warehouseController/getAllWarehousingChuKu',this.ChuKuForm)
        if (ress.code !== '0010') return this.$message.error(ress.msg)
        this.listdata=ress.data.listdata
        this.listdataDetail=ress.data.listdataDetail
        this.listdataObj.stockName=ress.data.listdata[0].stockName
        this.listdataObj.stockNumber=ress.data.listdata[0].stockNumber
      } 
    },
    //展示调拨的对话框
    async showAllocatDialog(type) {
      this.type=type
      this.allocatDialogVisible = true
      const { data: res } = await this.$http.post('warehouseController/getWarehousXiaLa')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.warehourseXiaLa=res.data.warehourseXiaLa
      this.ChuKuForm.findModelName=this.activeName
      this.getAllocat()
    },
    toDetail() {
      this.$router.push('/orderreviewdetail')
    }
  }
}
</script>
<style lang="less" scoped>
.tips {
  color: #e0001b;
  font-size: 12px;
}
/deep/.el-table::before {
  //去掉最下面的那一条线
  height: 0px;
}
</style>
