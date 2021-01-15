<template>
  <div>
    <el-page-header @back="goback" content="设备" style="margin-bottom:20px;"> </el-page-header>

    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;margin-bottom:20px;">基本信息</div>
      <el-row style="margin:10px;">
        <el-col :span="2" :offset="2" style="padding-top:10px;">设备名称</el-col>
        <el-col :span="4">
          <el-input v-model="equipment.equipmentName" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin:10px;">
        <el-col :span="2" :offset="2" style="padding-top:10px;">设备型号</el-col>
        <el-col :span="4">
          <el-input v-model="equipment.equipmentModel" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin:10px;">
        <el-col :span="2" :offset="2" style="padding-top:10px;">设备编号</el-col>
        <el-col :span="4">
          <el-input disabled :value="equipment.equipmentNumber"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin:10px;">
        <el-col :span="2" :offset="2" style="padding-top:10px;">设备类型</el-col>
        <el-col :span="4">
          <el-select v-model="equipment.equipmentTypeId" placeholder="请选择" style="width:100%;">
            <el-option :label="item.name" :value="item.id" v-for="item in SBType" :key="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">
        检修条目
        <el-button style="margin-left:80%;" type="primary" plain @click="showDialog()">新增</el-button>
      </div>
      <div style="margin-top:40px;">
        <el-table :data="equipmentItemsList" style="width: 100%">
          <el-table-column type="index" label="型号"> </el-table-column>
          <el-table-column prop="equipmentItems" label="检项名称"> </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="showDialog(scope.$index)">编辑</el-button>
              <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-button @click="goback">取消</el-button>
        <el-button type="primary" @click="saveAll">保存</el-button>
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="dialogClose">
      <el-form label-width="100px">
        <el-form-item label="检项名称">
          <el-input placeholder="请输入内容" v-model="equipmentItemsListItem.equipmentItems"> </el-input>
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
      value1: '',

      dialogVisible: false,
      SBNumber: '', //设别编号
      SBType: '', //设备类型下拉框
      id: -1, //编辑操作的id
      equipment: {
        equipmentTypeId: '',
        equipmentNumber: '',
        equipmentName: '',
        equipmentModel: '',
        id: ''
      },
      equipmentItemsList: [],
      equipmentItemsListItem: {
        equipmentItems: ''
      },
      index: -1
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    //保存全部
    async saveAll() {
      if (this.id >= 0) {
        this.equipment.id = this.id
      }
      const { data: res } = await this.$http.post('BasicSettingController/saveEquipment', {
        equipment: this.equipment,
        equipmentItemsList: this.equipmentItemsList
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
      this.equipmentItemsList.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 监听对话框关闭
    dialogClose() {
      ;(this.equipmentItemsListItem.equipmentItems = ''), (this.index = -1)
    },
    // 对话框点击确认
    dialogConfirm() {
      if (this.index >= 0) {
        this.equipmentItemsList.splice(this.index, 1, { ...this.equipmentItemsListItem })
      } else {
        this.equipmentItemsList.push({ ...this.equipmentItemsListItem })
      }
      this.dialogVisible = false
    },
    //  获取页面初始数
    async getData() {
      const { data: res } = await this.$http.post('BasicSettingController/getEquipmentBasicInfo')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.SBNumber = res.data.SBNumber
      this.SBType = res.data.SBType
      this.equipment.equipmentNumber = this.SBNumber
      if (this.id >= 0) {
        const { data: res } = await this.$http.post('BasicSettingController/getAllEquipmentById', { findById: this.id })
        if (res.code !== '0010') return this.$message.error(res.msg)
        this.equipment = res.data.equipment
        this.equipmentItemsList = res.data.equipmentOverhauls
      }
    },
    //打开新增的对话框
    showDialog(index = -1) {
      this.dialogVisible = true
      if (index >= 0) {
        this.index = index
        this.equipmentItemsListItem = _.cloneDeep(this.equipmentItemsList[index])
      }
    },
    //返回
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  margin: 60px;
}
.footer {
  margin: 20px;
  text-align: right;
  padding-left: 80px;
}
.top {
  cursor: pointer;
}
</style>
