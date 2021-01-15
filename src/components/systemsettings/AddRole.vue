<template>
  <div>
    <el-card class="card-top">
      <div class="meta">角色信息</div>
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="角色名称" style="width:40%;">
          <el-input v-model="data.roleName"></el-input>
        </el-form-item>
        <el-form-item label="备注" style="width:40%;">
          <el-input v-model="data.remark"></el-input>
        </el-form-item>
        <el-form-item label="权限配置">
          <el-row :gutter="20">
            <el-col :span="9">
              <el-card style="margin:20px 0;min-height:400px;">
                <el-tree
                  ref="tree"
                  @check="currentChecked"
                  :data="getAllSRolePower"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="sRolePowerList"
                  :default-checked-keys="sRolePowerList"
                  :props="defaultProps"
                >
                </el-tree>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-switch v-model="data.state" :active-value="0" :inactive-value="1"> </el-switch>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveAll">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: 'right',

      id: -1,
      getAllSRolePower: [],
      data: {},
      sRolePowerList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id >= 0) {
      this.getIdData()
    } else {
      this.getData()
    }
  },
  methods: {
    currentChecked(nodeObj, SelectedObj) {
      this.sRolePowerList=SelectedObj.checkedKeys
    },
    async getData() {
      const { data: res } = await this.$http.post('SysController/getInfoBySRole')
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.data = res.data.data
      this.sRolePowerList = res.data.sRolePowerList
      this.getAllSRolePower = res.data.getAllSRolePower
    },
    //   保存全部数据
    async saveAll() {
      let rolePower = this.sRolePowerList.join(',')
      const { data: res } = await this.$http.post('SysController/addRole', {
        id: this.id >= 0 ? this.id : '',
        remark: this.data.remark,
        state: this.data.state,
        rolePower: rolePower,
        roleName: this.data.roleName
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('保存成功')
      this.$router.go(-1)
    },
    async getIdData() {
      const { data: res } = await this.$http.post('SysController/getAllSysByNameId', {
        findById: this.id,
        findModelName: 'sRole'
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.data = res.data.data
      this.sRolePowerList = res.data.sRolePowerList
      this.getAllSRolePower = res.data.getAllSRolePower
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.card-top {
  .meta {
    font-weight: bold;
  }
  .el-form {
    margin-left: 140px;
    margin-top: 30px;
  }
}
.card-bottom {
  margin-top: 20px;
  .meta {
    font-weight: bold;
  }
}
.footer {
  text-align: center;
}
</style>
