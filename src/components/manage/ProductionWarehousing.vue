<template>
  <div>
    <el-page-header @back="cancel" content="生产入库" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div style="font-weight:bold;margin-bottom:20px;">
        生产入库
      </div>
      <el-row :gutter="40">
        <el-col :span="8">
          <el-card>
            <div style="font-weight:bold;">车间库存</div>
            <div style="margin:30px 0">
              <el-button size="mini" type="primary">按包装编号</el-button>
              <el-button size="mini" type="primary" plain>按生产编号</el-button>
              <el-button size="mini" type="text" style="margin-left:20%" @click="cancel">入库历史</el-button>
            </div>
            <div style="height:600px;overflow:auto;padding-right:14px;">
              <el-card :class="[{current:row.id==item.id}]" style="margin-bottom:20px" v-for="item in LData" :key="item.id" @click.native="rowClick(item)">
                <el-row>
                  <el-col :span="6">包装编号</el-col>
                  <el-col :span="18">{{ item.packingName }}</el-col>
                </el-row>
                <el-row style="margin:5px 0">
                  <el-col :span="6">生产批号</el-col>
                  <el-col :span="18">{{ item.productionNumber }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">轴数</el-col>
                  <el-col :span="4">{{ item.productidsNum }} </el-col>
                  <el-col :span="4">总长度</el-col>
                  <el-col :span="4">{{ item.lengthM }} </el-col>
                  <el-col :span="4">总净重</el-col>
                  <el-col :span="4">{{ item.totalNet }} </el-col>
                </el-row>
              </el-card>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card  style="height:750px;">
            <div style="font-weight:bold;margin-bottom:20px">成品列表</div>
            <div>包装编号：{{row.packingName}}</div>
            <div style="margin:10px 0">生产批号：{{row.productionNumber}} <el-button size="mini" style="margin-left:30%" @click="addRData()" :disabled="clickDisable">添加入库</el-button></div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="axleNumber" label="轴号"> </el-table-column>
              <el-table-column prop="standards" label="成品直径μm"> </el-table-column>
              <el-table-column prop="lengthm" label="长度（m/轴）"> </el-table-column>
              <el-table-column prop="inventorysum" label="净重g"> </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div style="font-weight:bold;">待入库列表</div>
            <div style="margin:25px 0">
              入库仓库
              <el-select v-model="findIdOne" placeholder="请选择 " style="margin-left:5px">
                <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in warehourseXiaLa" :key="item.mapKey"></el-option>
              </el-select>
              <el-button size="mini" style="margin-left:20%" @click="clear">清空</el-button>
            </div>
            <div style="height:600px;overflow:auto;padding-right:14px;">
              <el-card style="margin-bottom:20px" v-for="item in RData" :key="item.id" >
                <el-row>
                  <el-col :span="6">包装编号</el-col>
                  <el-col :span="18">{{ item.packingName }}</el-col>
                </el-row>
                <el-row style="margin:5px 0">
                  <el-col :span="6">生产批号</el-col>
                  <el-col :span="18">{{ item.productionNumber }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">轴数</el-col>
                  <el-col :span="4">{{ item.productidsNum }} </el-col>
                  <el-col :span="4">总长度</el-col>
                  <el-col :span="4">{{ item.lengthM }} </el-col>
                  <el-col :span="4">总净重</el-col>
                  <el-col :span="4">{{ item.totalNet }} </el-col>
                </el-row>
            </el-card>
            </div>
            
          </el-card>
        </el-col>
      </el-row>
      <div style="margin:40px 40%">
        <el-button>取消</el-button>
        <el-button type="primary" @click="saveAll">入库</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aaa: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      warehourseXiaLa: [],
      LData: [],
      row:{},
      RData:[],
      findIdOne:'',
      clickDisable:true,
    }
  },
  created() {
    this.getSelecteds()
    this.getData()
  },
  methods: {
    // 入库操作
    async saveAll(){  
      let str=''
      this.RData.forEach(item=>{
        str=str+item.id+','
      })
      const { data: res } = await this.$http.post('ProductionInventoryController/UpdateWareHouseId',{
        findIdOne:this.findIdOne,
        findName:str
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success("入库成功")
      this.$router.go(-1)
    },
    // 点击清空
    clear(){
      this.RData=[]
      this.getData()
    },
    // 点击添加入库
    addRData(){
      this.RData.push(this.row)
      let index=-1
      this.LData.forEach((item,i )=>{
        if(item.id==this.row.id){
          index=i 
        }
      })
      this.LData.splice(index,1)
      this.clickDisable=true
    },
    async rowClick(row){
      this.clickDisable=false
      this.row=row
      const { data: res } = await this.$http.post('ProductionInventoryController/getWorkshopInventoryById',{
        findById:row.pppid,
        findName:row.productids
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.tableData=res.data.RData
    },
    async getSelecteds() {
      const { data: res } = await this.$http.post('warehouseController/getWarehousXiaLa')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.warehourseXiaLa = res.data.warehourseXiaLa
    },
    async getData() {
      const { data: res } = await this.$http.post('ProductionInventoryController/getWorkshopInventory')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.LData = res.data.LData
      this.rowClick(this.LData[0])
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.current{
  border: 1px solid #00b2ff;
}
</style>
