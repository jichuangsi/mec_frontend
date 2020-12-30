<template>
  <div>
    <el-page-header @back="cancel" content="成套模具检查表" style="margin-bottom:20px;"> </el-page-header>
    <el-card>
      <div style="font-weight:bold;margin-bottom:20px;">基本信息</div>
      <el-form ref="form" :model="form" label-width="180px">
        <el-form-item label="模具名称">
          <el-input v-model="tmould.mouldName" style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label="模具型号">
          <el-input v-model="tmould.mouldModel" style="width:30%;"></el-input>
        </el-form-item>
        <el-form-item label="综合判定">
          <el-select v-model="tmould.judgeresult" placeholder="请选择 " style="width:30%;">
            <el-option label="合格" value="0"></el-option>
            <el-option label="不合格" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="tmould.remark" style="width:30%;"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="font-weight:bold;">模孔表面状态</div>
      <div style="font-size:14px;color:#646c9a;margin:10px;">注：本表格所有数据单位均为um</div>
      <el-table :data="tmouldDetail" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="sonmouldModel" label="子模具型号"> </el-table-column>
        <el-table-column prop="sonmouldSpaNum" label="子模具孔径um"> </el-table-column>
        <el-table-column label="入口区" align="center">
          <template slot-scope="scope">{{ scope.row.entranceNo ? '✔' : '--' }}</template>
        </el-table-column>
        <el-table-column label="变形区" align="center">
          <template slot-scope="scope">{{ scope.row.deformationNo ? '✔' : '--' }}</template>
        </el-table-column>
        <el-table-column label="定径区" align="center">
          <template slot-scope="scope">{{ scope.row.rsmNo ? '✔' : '--' }}</template>
        </el-table-column>
        <el-table-column label="出口区" align="center">
          <template slot-scope="scope">{{ scope.row.exportNo ? '✔' : '--' }}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column label="操作" v-if="edit!=1">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer" v-if="edit!=1">
          <el-button @click="cancel" style="margin-right:40px;">取消</el-button>
          <el-button type="primary" @click="saveAll">保存</el-button>
        </div>
    </el-card>
    <el-dialog title="模孔表面状态" :visible.sync="dialogVisible" width="30%" @close="dialogClose">
      <el-form :model="form" label-width="120px">
        <el-form-item label="模具名称">
          <span class="gray">{{ tmould.mouldName }}</span>
        </el-form-item>
        <el-form-item label="模具型号">
          <span class="gray">{{ tmould.mouldModel }}</span>
        </el-form-item>
        <el-form-item label="模具套号">
          <span class="gray">{{ tmouldDetailItem.sonmouldModel }}</span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input style="width:60%;" v-model="tmouldDetailItem.remark" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="检项" align="center"> </el-table-column>
        <el-table-column prop="status" label="正常" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.status" :true-label="1" :false-label="0"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="newStatus" label="不正常" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.status" :true-label="2" :false-label="0"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
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
      tableData: [{ name: '入口区', status: 0 }, { name: '变形区', status: 0 }, { name: '定径区', status: 0 }, { name: '出口区', status: 0 }],
      dialogVisible: false,
      tmouldDetail: [],
      tmouldDetailItem: {
        sonmouldModel: '', //子模具型号
        sonmouldSpaNum: '', //子模具孔径um
        entranceNo: '', //入口区
        deformationNo: '', //变形区
        rsmNo: '', //定径区
        exportNo: '', //出口区
        remark: '' //备注
      },
      tmould: {
        judgeresult: '',
        mouldModel: '',
        mouldName: '',
        remark: '',
        mouldid:'',
      },
      index: -1,
      edit:'',
    }
  },
  created() {
    this.id = this.$route.query.id
    this.edit=this.$route.query.edit
    this.getData()
  },
  methods: {
    // 保存全体数据
    async saveAll(){
      this.tmould.mouldid=this.id
      const { data: res } = await this.$http.post('mouldController/savecuffingCheck',{
        cuffingcheckdetails:this.tmouldDetail,
        tCuffingcheck:this.tmould
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success("保存成功！")
      this.$router.go(-1)
    },
    // 删除某行
    async del(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      this.tmouldDetail.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 监听对话框关闭
    dialogClose() {
      this.tmouldDetailItem = {
        sonmouldModel: '', //子模具型号
        sonmouldSpaNum: '', //子模具孔径um
        entranceNo: '', //入口区
        deformationNo: '', //变形区
        rsmNo: '', //定径区
        exportNo: '', //出口区
        remark: '' //备注
      }
      this.tableData= [{ name: '入口区', status: 0 }, { name: '变形区', status: 0 }, { name: '定径区', status: 0 }, { name: '出口区', status: 0 }],
      this.index = -1
    },
    // 对话框点击确定
    async dialogConfirm() {
      this.tmouldDetailItem.entranceNo = this.tableData[0].status == 1 ? 1 : 0
      this.tmouldDetailItem.deformationNo = this.tableData[1].status == 1 ? 1 : 0
      this.tmouldDetailItem.rsmNo = this.tableData[2].status == 1 ? 1 : 0
      this.tmouldDetailItem.exportNo = this.tableData[3].status == 1 ? 1 : 0
      this.tmouldDetail.splice(this.index, 1, { ...this.tmouldDetailItem })
      this.$message.success('编辑成功')
      this.dialogVisible = false
    },
    change1(val) {
      if (!val.status) {
        return
      }
      val.newStatus = !val.status
    },
    change2(val) {
      if (!val.newStatus) {
        return
      }
      val.status = !val.newStatus
    },
    // 获取页面初始数据
    async getData() {
      const { data: res } = await this.$http.post('mouldController/getTMouldDetailById', {
        findById: this.id,
        findModelName: this.$route.query.edit >= 0 ? 'C' : 'I'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.tmould = res.data.tmould
      this.tmouldDetail = res.data.tmouldDetail
    },
    //   展示对话框
    showDialog(index, row) {
      this.index = index
      this.tmouldDetailItem = row
      this.tableData[0].status=this.tmouldDetailItem.entranceNo===1?1:0
      this.tableData[1].status=this.tmouldDetailItem.deformationNo===1?1:0
      this.tableData[2].status=this.tmouldDetailItem.rsmNo===1?1:0
      this.tableData[3].status=this.tmouldDetailItem.exportNo===1?1:0
      this.dialogVisible = true

    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.gray {
  color: #646c9a;
}
.footer{
  margin: 20px  ;
  text-align: center;
  
}
</style>
