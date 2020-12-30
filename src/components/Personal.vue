<template>
    <div class="wrapper">
        <div class="container">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }"><div class="back">返回首页</div></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card class="el-card-left" v-if="status==1">
            <el-form
                ref="form"
                :model="form"
                label-width="80px"
                labelPosition="top"
            >
                <el-form-item
                    label="员工编号"
                    style="width:45%;"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="员工姓名"
                    style="width:45%;"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="员工年龄"
                    style="width:45%;"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="性别"
                    style="width:45%;"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="手机号码"
                    style="width:45%;margin-right:45%;"
                >

                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="电子邮箱"
                    style="width:45%;"
                >
                    <div class="tips">这是我们将发送通知的主要电子邮箱地址</div>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="证件号码"
                    style="width:45%;"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="职位"
                    style="width:45%;"
                >
                    <el-select
                        v-model="form.region"
                        placeholder="请选择"
                        style="width:100%;"
                    >
                        <el-option
                            label="区域一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="区域二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="地址"
                    style="width:45%;"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="所属厂房"
                    style="width:45%;"
                >
                    <el-select
                        v-model="form.region"
                        placeholder="请选择"
                        style="width:100%;"
                    >
                        <el-option
                            label="区域一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="区域二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="所属部门"
                    style="width:45%;"
                >
                    <el-select
                        v-model="form.region"
                        placeholder="请选择"
                        style="width:100%;"
                    >
                        <el-option
                            label="区域一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="区域二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="form-footer">
                <el-button type="primary">保存并修改</el-button>
                <el-button @click="goback">取消</el-button>
            </div>
        </el-card>
        <el-card class="el-card-left" v-else>
            <el-form
                ref="form"
                :model="form"
                label-width="80px"
                labelPosition="top"
            >
                <el-form-item
                    label="旧密码"
                    style="width:45%;"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="新密码"
                    style="width:45%;"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="确定新密码"
                    style="width:45%;"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>    
            </el-form>
            <div class="form-footer">
                <el-button type="primary">更改密码</el-button>
                <el-button @click="goback">取消</el-button>
            </div>
        </el-card>
        <el-card class="el-card-right">
            <div class="item" @click=toggle(1)>
                <i :class="['el-icon-location',{current:status==1}]">
                    <div>个人资料</div>
                </i> 
                <span>设置有关您的个人账号密码信息</span>
            </div>
            <div class="item" @click=toggle(2)>
                <i :class="['el-icon-location',{current:status==2}]">
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
        status:1,
        form: {
            name: '',
            region: ''
        }
    }
  },
  methods:{
      toggle(status){
          this.status=status
      },
      goback(){
          this.$router.go(-1)
      }
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb{
    position: absolute;
    top: 50px;
    left: 220px;
    z-index: 2;
    font-size: 16px;
    
    .back{
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
.el-card-left{
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
.el-card-right{
    position: absolute;
    top: 60px;
    right: 5%;
    width: 28%;
    height: 411px;
}
.item{
    cursor: pointer;
    margin:50px 30px;
    position: relative;
    i{     
        display: flex;
        align-items: center;
        div{
            margin-left: 30px;
            font-weight: bold;
        }
        
    }
    span{
        line-height: 18px;
        font-size: 12px;
        color: #a494bc;
        padding-left: 50px;
        margin-top: 20px;
    }
    .current{
            color: #6e00ff;
    }  
}
</style>