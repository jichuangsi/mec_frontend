<template>
  <div class="wrapper">
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }"><div class="back">返回首页</div></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="el-card-left" v-if="status == 1">
      <el-form ref="form" :model="form" label-width="80px" labelPosition="top">
        <el-form-item label="员工编号" style="width:45%;">
          <el-input v-model="form.staffNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" style="width:45%;">
          <el-input v-model="form.staffName"></el-input>
        </el-form-item>
        <el-form-item label="员工年龄" style="width:45%;">
          <el-input v-model="form.staffAge"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="width:45%;">
          <el-select v-model="form.gender" style="width:100%">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="手机号码" style="width:45%;margin-right:45%;">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" style="width:45%;">
          <div class="tips">这是我们将发送通知的主要电子邮箱地址</div>
          <el-input v-model="form.eMail"></el-input>
        </el-form-item>
        <el-form-item label="证件号码" style="width:45%;">
          <el-input v-model="form.idcard"></el-input>
        </el-form-item>
        <el-form-item label="职位" style="width:45%;">
          <el-checkbox-group v-model="checkList">
          <el-checkbox :label="item.mapValue" v-for="item in initData.juese" :key="item.mapkey"> </el-checkbox>
        </el-checkbox-group>
        </el-form-item>
        <el-form-item label="地址" style="width:45%;">
          <el-input v-model="form.staffAddress"></el-input>
        </el-form-item>
        <el-form-item label="所属厂房" style="width:45%;">
          <el-select v-model="form.workshopId" placeholder="请选择" style="width:100%">
          <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in initData.cangfang" :key="item.mapkey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" style="width:45%;">
          <el-select v-model="form.departmentId" placeholder="请选择" style="width:100%">
          <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in initData.bumen" :key="item.mapkey"></el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div class="form-footer">
        <el-button type="primary"  @click="submitForm1">保存并修改</el-button>
        <el-button @click="goback">取消</el-button>
      </div>
    </el-card>
    <el-card class="el-card-left" v-else>
      <el-form ref="form" :model="form" label-width="80px" labelPosition="top">
        <el-form-item label="旧密码" style="width:45%;">
          <el-input v-model="submitForm.oldPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" style="width:45%;">
          <el-input v-model="submitForm.firstPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确定新密码" style="width:45%;">
          <el-input v-model="submitForm.secondPwd" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="form-footer">
        <el-button type="primary" @click="changePassword">更改密码</el-button>
        <el-button @click="goback">取消</el-button>
      </div>
    </el-card>
    <el-card class="el-card-right">
      <div class="item" @click="toggle(1)">
        <i :class="['el-icon-location', { current: status == 1 }]">
          <div>个人资料</div>
        </i>
        <span>设置有关您的个人账号密码信息</span>
      </div>
      <div class="item" @click="toggle(2)">
        <i :class="['el-icon-location', { current: status == 2 }]">
          <div>修改密码</div>
        </i>
        <span>修改个人的登录密码</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 1,
      checkList: [],
      form: {
        staffNum: '',
        staffName: '',
        staffAge: '',
        postId: '',
        gender: '',
        phone: '',
        eMail: '',
        idcard: '',
        staffAddress: '',
        departmentId: '',
        workshopId: '',
        loginPassword: '',
        state: ''
      },
      submitForm: {
        oldPwd: '',
        firstPwd: '',
        secondPwd: '',
      },
      initData: {},
      id:-1,
    }
  },
  created() {
      if(sessionStorage.getItem('personal')){
          this.status=sessionStorage.getItem('personal')
      }
      this.id=JSON.parse(sessionStorage.getItem("user")).userId
      this.getData()
  },
  methods: {
    // 获取初始数据
    async getData() {
      const { data: res } = await this.$http.post('SysController/getStaffBasicInfo', {
        findIdOne: '0'
      })
      this.initData = res.data
      this.form.staffNum = this.initData.StaffNum
      if (this.id >= 0) {
        const { data: res } = await this.$http.post('SysController/getAllSysByNameId', {
          findModelName: 'staff',
          findById: this.id
        })
        this.form = res.data.data
        let arr = this.form.roleId.split(',')
        arr.forEach(arrItem => {
          this.initData.juese.forEach(item => {
            if (arrItem == item.mapKey) {
              this.checkList.push(item.mapValue )
            }
          })
        })
        
      }
    },
    // 点击提交
    async submitForm1() {
      this.form.state = Number(this.form.state) + ''
      let selectedList = []
      this.initData.juese.forEach(item => {
        if (this.checkList.includes(item.mapValue)) {
          selectedList.push(item.mapKey)
        }
      })
      this.form.roleId = selectedList.join(',')
      if (this.id >= 0) {
        this.form.id = this.id
      }
      let form1={...this.form}
      const { data: res } = await this.$http.post('userController/registUser', form1)
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('保存成功')
      this.$router.go(-1)
    },
    //   修改密码
    async changePassword(){
        if(this.submitForm.secondPwd!==this.submitForm.firstPwd){
            return this.$message.error('两次密码输入不一致')
        }
        const { data: res } = await this.$http.post('userController/updateUserPwd',this.submitForm)
        if (res.code !== "0010") return this.$message.error(res.msg)
        this.$message.success('修改成功')
        this.$router.go(-1)
    },
    toggle(status) {
      this.status = status
      sessionStorage.setItem('personal',status)
    },
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  position: absolute;
  top: 50px;
  left: 220px;
  z-index: 2;
  font-size: 16px;

  .back {
    font-weight: bold;
    cursor: pointer;
    color: #000;
  }
}
.wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  box-sizing: border-box;
}
.container {
  width: 100%;
  box-sizing: border-box;
  height: 50vh;
  background-color: #6e00ff;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
}
.el-card-left {
  position: absolute;
  top: 30px;
  left: 200px;
  width: 50%;

  .el-form {
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
  }
  .form-footer {
    text-align: right;
    margin-right: 60px;
  }
  .tips {
    position: absolute;
    top: -50px;
    left: 74px;
    font-size: 12px;
    color: #8494a9;
  }
}
.el-card-right {
  position: absolute;
  top: 60px;
  right: 5%;
  width: 28%;
  height: 411px;
}
.item {
  cursor: pointer;
  margin: 50px 30px;
  position: relative;
  i {
    display: flex;
    align-items: center;
    div {
      margin-left: 30px;
      font-weight: bold;
    }
  }
  span {
    line-height: 18px;
    font-size: 12px;
    color: #a494bc;
    padding-left: 50px;
    margin-top: 20px;
  }
  .current {
    color: #6e00ff;
  }
}
</style>
