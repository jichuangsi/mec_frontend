<template>
  <el-container class="home-container">
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width=" 200px" style="backgroundColor:#333744;overflow-x:hidden">
        <el-col :span="24">
          <h2 style="color:#fff;padding-left:20px">ERP系统</h2>
          <el-menu class="el-menu-vertical-demo" background-color="#333744" text-color="#fff" active-text-color="#fff" :router="true" unique-opened :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 文本 -->
                <span>{{item.label}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item @click="saveNavState(subItem.path)" :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" >
                <template slot="title">              
                  <span>{{subItem.label}}</span>
                </template>
              </el-menu-item>
             
              
            </el-submenu>
             <el-menu-item @click="saveNavState('/InventoryManage')" :index="'/InventoryManage'"  >
                <template  >              
                  <span> 生产库存管理 </span>
                </template>
              </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-container>
        <el-header>
          <div class="header-left">
            当前位置: 主页
          </div>
          <div class="header-right">
            
            <el-dropdown>
              <span class="el-dropdown-link" style="cursor:pointer;"> {{user.userName}}<i class="el-icon-arrow-down el-icon--right"></i> </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div @click="toAccountInfo">账号资料</div></el-dropdown-item>
                <el-dropdown-item><div @click="loginout()">退出登录</div> </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="text" @click="toems">切换MES系统</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 被激活的链接地址
      activePath: '',
      user:{},
      menulist:[],
    }
  },
  created() {
    let user=sessionStorage.getItem("user")
    this.user=JSON.parse(user)
    this.activePath = window.sessionStorage.getItem('activePath')
    this.getMenuList()
  },
  methods: {
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.post('HomeController/getMyRolePower',{
        sysType:1
      })
      if (res.code !== "0010") return this.$message.error(res.meta.msg)
      this.menulist = res.data.list
      sessionStorage.setItem("rolePowerList",JSON.stringify(res.data.rolePowerList))
      
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    toAccountInfo() {
      this.$router.push('/personal')
    },
    loginout() {
      this.$router.push('/login')
      sessionStorage.clear()
    },
    // 跳转到mes系统
    toems() {
      this.$router.push('/home')
      this.$message.warning('切换到MES系统成功')
      sessionStorage.removeItem("activePath")
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-item.is-active {
  background-color: #409eff !important;
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  align-items: center;
  color: #676767;
  font-size: 16px;
  .header-right {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 5px solid #f5f6fa;
    }
    .el-dropdown {
      margin: 0 20px;
    }
  }
}

.el-aside {
  background-color: #000c17;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #f3f3ff;
}

.iconfont {
  margin-right: 10px;
}
</style>
