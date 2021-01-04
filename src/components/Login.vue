<template>
<div class="wrapper">
  <div class="login_container">
    <el-card class="login_box">
      <!-- 头像区域 -->
      <div class="box-head">
        <h1 style="text-align:center;color:#333333">登录MES管理系统</h1>
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm"  :rules="loginFormRules" class="login_form"  label-width="80px" label-position="left">      
        <!-- 用户名 -->
        <el-form-item prop="account" label="账号">
          <el-input v-model="loginForm.account" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pwd" label="密码">
          <el-input v-model="loginForm.pwd" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <el-form-item label="系统">
          <el-select v-model="loginForm.sysType" placeholder="请选择登录系统" style="with:300px;">
            <el-option label="MES系统" :value="1"></el-option>
            <el-option label="ERP系统" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</div>
  
</template>

<script>
import md5 from 'js-md5';
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        account: '666666',
        pwd: '123123',
        sysType:1,
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        account: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        pwd: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('userController/loginUser', {
          account:this.loginForm.account,
          sysType:this.loginForm.sysType,
          // pwd:md5(this.loginForm.pwd),
           pwd:this.loginForm.pwd
        })
        if (res.code !== "0010") return this.$message.error(res.msg)
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data)
        if(this.loginForm.sysType===1){
          this.$router.push('/home')
        }else{
          this.$router.push('/erpHome')
        }
        
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  width: 100%;
  height: 100%;
  position: relative;
}
.login_container {
  width: 100%;
  box-sizing: border-box;
  height: 50vh;
  background-color: #6e00ff;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
}
.login_box {
  padding: 0 !important;
  width: 450px;
  height: 500px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.box-head{
  padding: 30px 0;
}
.login_form {
  position: absolute;
  bottom: 45px;
  width: 90%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
}
.el-select{
  width: 100%;
}
</style>
