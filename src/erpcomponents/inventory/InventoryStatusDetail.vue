<template>
  <div>
    <el-page-header @back="cancel" content="库存详情" style="margin-bottom:20px;"> </el-page-header>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div style="font-weight:bold;margin-bottom:20px;">原材料参数</div>
          <el-row style="margin:40px 0;">
            <el-col :span="12">
              <el-col :span="12">原材料编号</el-col>
              <el-col :span="12" style="color:#ccc;">{{ stockDetail.stockNumber }}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="12">原材料线别</el-col>
              <el-col :span="12" style="color:#ccc;">{{ stockDetail.stockType }}</el-col>
            </el-col>
          </el-row>
          <el-row style="margin:40px 0;">
            <el-col :span="12">
              <el-col :span="12">原材料名称</el-col>
              <el-col :span="12" style="color:#ccc;">{{ stockDetail.stockName }}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="12">原材料说明</el-col>
              <el-col :span="12" style="color:#ccc;">{{ stockDetail.stockRemarks }}</el-col>
            </el-col>
          </el-row>
          <el-row style="margin:40px 0;">
            <el-col :span="12">
              <el-col :span="12">原材料型号</el-col>
              <el-col :span="12" style="color:#ccc;">{{ stockDetail.stockModel }}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="12">单位</el-col>
              <el-col :span="12" style="color:#ccc;">{{ stockDetail.dictionarier }}</el-col>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="font-weight:bold;margin-bottom:20px;">库存参数</div>
          <div style="margin:20px 0;">
            <span style="display:inline-block;width:20%;">仓库名称:</span>
            <el-select placeholder="请选择 " v-model="submitForm.pageSize" @change="getData">
              <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in selecteds.warehouseXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </div>
          <div style="margin:20px 0;">
            <span style="display:inline-block;width:20%;">原材料规格:</span>
            <el-select placeholder="请选择 " v-model="submitForm.pageNum" @change="getData">
              <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in selecteds.DetailXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </div>
          <div style="margin:20px 0;">
            <span style="display:inline-block;width:20%;">当前仓库库存数量:</span>
            {{ currentInventoryNum }}
          </div>
          <div style="margin:20px 0;">
            <span style="display:inline-block;width:20%;">总库存数量:</span>
            {{ InventorySum }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:20px;">
      <el-tabs v-model="activeName">
        <el-tab-pane label="当前库存" name="1">
          <template>
            <el-table :data="[currentInventory]" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="inventorysum" label="数量"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="showDialog(scope.row)">盘点</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="库存记录" name="2">
          <template>
            <el-table :data="InventoryRecord" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="createTime" label="时间"> </el-table-column>
              <el-table-column prop="warehousenName" label="仓库"> </el-table-column>
              <el-table-column prop="recordType" label="类型"> </el-table-column>
              <el-table-column prop="standards" label="规格"> </el-table-column>
              <el-table-column prop="unitName" label="单位"> </el-table-column>
              <el-table-column prop="changequantity" label="发生数量"> </el-table-column>
              <el-table-column prop="remark" label="备注"> </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog title="盘点" :visible.sync="dialogVisible" width="30%" @close="dialogClose">
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="当前仓库">
          {{ row.warehousenName }}
        </el-form-item>
        <el-form-item label="规格">
          {{ row.standards }}
        </el-form-item>
        <el-form-item label="单位">
          {{ row.unitName }}
        </el-form-item>
        <el-form-item label="当前库存数量">
          {{ row.inventorysum }}
        </el-form-item>
        <el-form-item label="盘后库存数量">
          <el-input v-model="number" style="width:50%;" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
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
      form: {
        name: ''
      },
      activeName: '1',
      dialogVisible: false,
      submitForm: {
        findModelName: '',
        findById: '',
        pageNum: '', //规格id
        pageSize: '' //仓库id
      },
      currentInventory: {}, //当前库存
      stockDetail: {}, //原材料参数
      currentInventoryNum: '', //当前库存数量
      InventorySum: '', //总库存数量
      InventoryRecord: [], //库存记录
      findModelName: '',
      id: '',
      selecteds: {},
      row: {},
      number: ''
    }
  },
  created() {
    this.findModelName = this.$route.query.findModelName
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    // 监听对话框关闭
    dialogClose() {
      this.number = ''
    },
    // 对话框点击确定
    async dialogConfirm() {
      const { data: res } = await this.$http.post('warehouseController/updateInventoryStateSum', {
        updateID: this.row.id,
        updateNum: this.number,
        findModelName: this.findModelName
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('盘点成功')
      this.getData()
      this.dialogVisible = false
    },
    async getData() {
      const { data: res } = await this.$http.post('warehouseController/getwarehouseInventoryStatesBasicInfo', {
        findModelName: this.findModelName
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.selecteds = res.data
      this.submitForm.findModelName = this.findModelName
      this.submitForm.findById = this.id
      const { data: ress } = await this.$http.post('warehouseController/getAllInventoryStatesById', this.submitForm)
      if (ress.code !== '0010') return this.$message.error(ress.msg)
      this.currentInventory = ress.data.currentInventory
      this.stockDetail = ress.data.stockDetail
      this.currentInventoryNum = ress.data.currentInventoryNum
      this.InventorySum = ress.data.InventorySum
      this.InventoryRecord = ress.data.InventoryRecord
      this.submitForm.pageSize = ress.data.stockDetail.warehouseId
      this.submitForm.pageNum = ress.data.stockDetail.stockDetailId
    },
    showDialog(row) {
      this.row = row
      this.dialogVisible = true
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped></style>
