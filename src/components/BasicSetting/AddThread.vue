<template>
  <div>
    <el-page-header @back="cancel" content="规格型号设置" style="margin-bottom:20px;"> </el-page-header>

    <el-card style="margin-top:20px;">
      <div class="meta">基本信息</div>
      <el-form ref="tBobbin" :model="tBobbin" label-width="80px" style="width:600px;padding-left:80px;">
        <el-form-item label="编号">
          <el-input v-model="tBobbin.bobbinNumber" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="线轴名称">
          <el-input v-model="tBobbin.bobbinName"></el-input>
        </el-form-item>
        <el-form-item label="线轴型号">
          <el-input v-model="tBobbin.bobbinModel"></el-input>
        </el-form-item>
        <el-form-item label="工序">
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="item.name"  v-for="item in selecteds.GX" :key="item.id"> </el-checkbox>
          </el-checkbox-group>
          <!-- <el-select v-model="tBobbin.procedureId" placeholder="请选择" style="width:100%;">
            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.GX" :key="item.id"></el-option>
          </el-select> -->
        </el-form-item>

        <el-form-item label="线轴线别">
          <el-select v-model="tBobbin.bobbintypeId" placeholder="请选择" style="width:100%;">
            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.XB" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线轴说明">
          <el-input v-model="tBobbin.remark"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-select v-model="tBobbin.dictionarierId" placeholder="请选择" style="width:100%;">
            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.DW" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <div class="meta">
        规格型号
        <el-button type="primary" plain style="margin-left:60%;" @click="addDialog()">新增</el-button>
      </div>
      <el-table :data="tstandards" height="250" style="width: 100%"  :header-cell-style="{background:'#f0f5ff' }">
        <el-table-column type="index" width="150" label="序号"> </el-table-column>
        <el-table-column prop="standards" label="轴号"> </el-table-column>
        <el-table-column prop="remark" label="轴重"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="addDialog(scope.$index)">编辑</el-button>
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
          <el-input :value="index >= 0 ? index + 1 : tstandards.length + 1" disabled></el-input>
        </el-form-item>
        <el-form-item label="轴号">
          <el-input v-model="tstandardsItem.standards"></el-input>
        </el-form-item>
        <el-form-item label="轴重">
          <el-input v-model="tstandardsItem.remark"></el-input>
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
      checkList:[],
      form: {
        name: ''
      },
      index: -1, //选中的id
      tBobbin: {
        bobbinNumber: '',
        bobbinName: '',
        bobbinModel: '',
        procedureId: '',
        bobbintypeId: '',
        remark: '',
        dictionarierId: ''
      }, //基本信息
      selecteds: {}, //下拉框初始数据
      tstandards: [], //型号数组
      tstandardsItem: {
        standards: '',
        remark: '',
        id: ''
      }, //每个型号数组
      dialogVisible: false,
      id: '' //编辑页面选中的id
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
        findModelName: 'bobbin',
        findById: this.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.tBobbin = res.data.bobbin
      this.tstandards = res.data.listbobbinDetail
    },
    // 点击保存全部
    async saveAll() {
      if (this.id >= 0) {
        this.tBobbin.id = this.id
      }
      this.checkList.forEach(item=>{
        this.selecteds.GX.forEach(item1=>{
          if(item==item1.name){
            this.tBobbin.procedureId=this.tBobbin.procedureId+item1.id+','
          }
        })
      })
      const { data: res } = await this.$http.post('BasicSettingController/saveBobbin', {
        tBobbin: this.tBobbin,
        tstandards: this.tstandards
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('新增成功')
      this.$router.go(-1)
    },
    // 删除
    async del(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除！')
      }
      this.tstandards.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 监听对话框关闭
    dialogClose() {
      this.index = -1
      this.tstandardsItem = {
        standards: '',
        remark: '',
        id: ''
      }
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
    // 打开新增的对话框
    addDialog(index = -1) {
      if (index >= 0) {
        this.index = index
        this.tstandardsItem = _.cloneDeep(this.tstandards[index])
      }
      this.dialogVisible = true
    },
    // 获取下拉框数据
    async getSelecteds() {
      const { data: res } = await this.$http.post('BasicSettingController/getRawStockInfo', {
        findModelName: 'XZ'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.selecteds = res.data
      this.tBobbin.bobbinNumber = res.data.rawStockNum
    },
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
