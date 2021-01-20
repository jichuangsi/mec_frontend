<template>
  <div>
    <el-page-header @back="cancel" content="规格型号设置" style="margin-bottom:20px;"> </el-page-header>

    <el-card style="margin-top:20px;">
      <div class="meta">基本信息</div>
      <el-form ref="stock" :model="stock" label-width="80px" style="width:600px;padding-left:80px;">
        <el-form-item label="编号">
          <el-input v-model="stock.stockNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="stock.stockName"></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input v-model="stock.stockModel"></el-input>
        </el-form-item>
        <el-form-item label="线别">
          <el-select v-model="stock.stockTypeId" placeholder="请选择活动区域" style="width:100%;">
            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.XB" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="stock.stockRemarks"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-select v-model="stock.dictionarierId" placeholder="请选择活动区域" style="width:100%;">
            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.DW" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <div class="meta">
        规格型号
        <span class="tips">设置本产品的规格以及物理特性，生产过程中，如果达不到标准便会预警</span>
        <el-button type="primary" plain style="margin-left:60%;" @click="showDialog()">新增</el-button>
      </div>
      <el-table :data="tstandards" height="250" style="width: 100%" :header-cell-style="{background:'#f0f5ff' }">
        <el-table-column type="index" width="250" label="序号"> </el-table-column>
        <el-table-column prop="standards" label="规格"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showDialog(scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:20px;">
        <el-button type="primary" @click="saveAll">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="dialogClose">
      <el-form ref="tstandardsItem" :model="tstandardsItem" label-width="80px">
        <el-form-item label="序号">
          <el-input disabled :value="index >= 0 ? index + 1 : tstandards.length + 1"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="tstandardsItem.standards"></el-input>
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
      index: -1, //选中的id
      stock: {
        stockNumber: '',
        stockName: '',
        stockModel: '',
        stockTypeId: '',
        stockRemarks: '',
        dictionarierId: ''
      },
      selecteds: {}, //下拉框数据
      tstandards: [], //大类
      tstandardsItem: {
        standards: ''
      }, //小类
      dialogVisible: false,
      id: '' //编辑操作选中的id
    }
  },
  created() {
    this.getSelecteds()
    if (this.$route.query.id >= 0) {
      this.id = this.$route.query.id
      this.getData()
    }
  },
  methods: {
    // 根据id获取页面的初始数据
    async getData() {
      const { data: res } = await this.$http.post('BasicSettingController/getAllBasicSettingByNameAndId', {
        findModelName: 'elseother',
        findById: this.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.stock = res.data.elseother
      this.tstandards = res.data.listDetail
    },
    // 点击保存
    async saveAll() {
      if (this.id >= 0) {
        this.stock.id = this.id
      }
      const { data: res } = await this.$http.post('BasicSettingController/saveElseOther', {
        stock: this.stock,
        tstandards: this.tstandards
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success(this.id >= 0 ? '编辑成功' : '新增成功')
      this.$router.go(-1)
    },
    // 点击删除
    async del(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return
      }
      this.tstandards.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 监听对话框关闭
    dialogClose() {
      this.tstandardsItem = {
        standards: ''
      }
      this.index = -1
    },
    // 确认新增
    dialogConfirm() {
      if (this.index >= 0) {
        this.tstandards.splice(this.index, 1, this.tstandardsItem)
      } else {
        this.tstandards.push(_.cloneDeep(this.tstandardsItem))
      }
      this.dialogVisible = false
    },
    // 点击新增或编辑
    showDialog(index = -1) {
      if (index >= 0) {
        this.index = index
        this.tstandardsItem = _.cloneDeep(this.tstandards[index])
      }
      this.dialogVisible = true
    },
    // 获取下拉框的数据
    async getSelecteds() {
      const { data: res } = await this.$http.post('BasicSettingController/getRawStockInfo', {
        findModelName: 'QT'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.selecteds = res.data
      this.stock.stockNumber = res.data.rawStockNum
    },
    // 返回
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.meta {
  font-weight: bold;
  margin-bottom: 22px;
  .tips {
    margin-left: 60px;
    font-size: 12px;
    color: #db5564;
  }
}
</style>
