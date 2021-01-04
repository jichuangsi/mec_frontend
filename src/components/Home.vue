<template>
  <el-container class="home-container">
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width=" 200px" style="backgroundColor:#333744;overflow-x:hidden">
        <el-col :span="24">
          <h2 style="color:#fff;padding-left:20px">MES系统</h2>
          <el-menu class="el-menu-vertical-demo" background-color="#333744" text-color="#fff" active-text-color="#fff" :router="true" unique-opened :default-active="activePath">
            <el-submenu index="1">
              <template slot="title"
                >概况</template
              >
              <el-menu-item index="/homepage" @click="saveNavState('/homepage')">主页</el-menu-item>
              <el-menu-item index="/workbench" @click="saveNavState('/workbench')">工作台</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"
                >代办事项</template
              >
              <el-menu-item index="/todo" @click="saveNavState('/todo')">代办事项</el-menu-item>
              <el-menu-item index="/doing" @click="saveNavState('/doing')">进行事项</el-menu-item>
              <el-menu-item index="/done" @click="saveNavState('/done')">完成事项</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"
                >生产计划</template
              >
              <el-menu-item index="/production" @click="saveNavState('/production')">创建生产计划单</el-menu-item>
              <el-menu-item index="/examine" @click="saveNavState('/examine')">生产计划单审核</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"
                >生产管理</template
              >
              <el-menu-item index="/melting" @click="saveNavState('/melting')">熔炼</el-menu-item>
              <el-menu-item index="/roughDrawing" @click="saveNavState('/roughDrawing')">粗拉</el-menu-item>
              <el-menu-item index="/mediumPull" @click="saveNavState('/mediumPull')">中拉</el-menu-item>
              <el-menu-item index="/thinPull" @click="saveNavState('/thinPull')">半成品(细拉)</el-menu-item>
              <el-menu-item index="/superThinPull" @click="saveNavState('/superThinPull')">成品(超细拉)</el-menu-item>
              <el-menu-item index="/backFire" @click="saveNavState('/backFire')">退火</el-menu-item>
              <el-menu-item index="/winding" @click="saveNavState('/winding')">绕线</el-menu-item>
              <el-menu-item index="/detour" @click="saveNavState('/detour')">成品改绕</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"
                >质量检验</template
              >
              <el-menu-item index="/QualitySetting" @click="saveNavState('/QualitySetting')">证书模板设置</el-menu-item>
              <el-menu-item index="/homepage1">抽样检验</el-menu-item>
              <el-menu-item index="/homepage1">生成证书</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"
                >统计数据</template
              >
              <el-menu-item index="/summaryTable">生产日报汇总表</el-menu-item>
              <el-menu-item index="/thinTable">生产日报细分报表</el-menu-item>
              <el-menu-item index="/homepage1">班组生产情况报表</el-menu-item>
              <el-menu-item index="/homepage1">批号生产回溯</el-menu-item>
              <el-menu-item index="/homepage1">SPC</el-menu-item>
              <el-menu-item index="/homepage1">MSA</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title"
                >基础设置</template
              >
              <el-menu-item index="/modelSetting" @click="saveNavState('/modelSetting')">规格型号设置</el-menu-item>
              <el-menu-item index="/maintainManage" @click="saveNavState('/maintainManage')">仪器设备管理维护</el-menu-item>
              <el-menu-item index="/accountChecking" @click="saveNavState('/accountChecking')">模具管理核账</el-menu-item>
              <el-menu-item index="/printer" @click="saveNavState('/accountChecking')">打印机管理</el-menu-item>
            </el-submenu>
            <el-submenu index="8">
              <template slot="title"
                >系统设置</template
              >
              <el-menu-item index="/productInfo" @click="saveNavState('/productInfo')">厂房信息</el-menu-item>
              <el-menu-item index="/staffManagement" @click="saveNavState('/staffManagement')">员工管理</el-menu-item>
              <el-menu-item index="/dictionaryTable" @click="saveNavState('/dictionaryTable')">字典表维护</el-menu-item>
              <el-menu-item index="/systemLog" @click="saveNavState('/systemLog')">系统日志</el-menu-item>
            </el-submenu>
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
            <img src="../assets/image/avatar.svg" />
            <el-dropdown>
              <span class="el-dropdown-link" style="cursor:pointer;"> 用户名称<i class="el-icon-arrow-down el-icon--right"></i> </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div @click="toAccountInfo">账号资料</div></el-dropdown-item>
                <el-dropdown-item><div @click="loginout()">退出登录</div> </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="text" @click="toggleSystem">切换ERP系统</el-button>
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
      activePath: ''
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 跳转到erp系统
    toggleSystem() {
      this.$router.push('/erpHome')
      this.$message.warning('切换到ERP系统成功')
      let token = window.sessionStorage.getItem('token')
      window.sessionStorage.clear()
      window.sessionStorage.setItem('token', token)
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
