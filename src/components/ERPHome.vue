<template>
  <el-container class="home-container">
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width=" 200px" style="backgroundColor:#333744;overflow-x:hidden">
        <el-col :span="24">
          <h2 style="color:#fff;padding-left:20px">ERP系统</h2>
          <el-menu class="el-menu-vertical-demo" background-color="#333744" text-color="#fff" active-text-color="#fff" :router="true" unique-opened :default-active="activePath">
            <el-menu-item index="/index" @click="saveNavState('/index')">首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title"
                >客户关系</template
              >
              <el-menu-item index="/supplier" @click="saveNavState('/supplier')">供应商管理</el-menu-item>
              <el-menu-item index="/client" @click="saveNavState('/client')">客户管理</el-menu-item>
              <el-menu-item index="/complaint" @click="saveNavState('/complaint')">客户投诉管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"
                >采购管理</template
              >
              <el-menu-item index="/purchaseorder" @click="saveNavState('/purchaseorder')">采购订单管理</el-menu-item>
              <el-menu-item index="/orderreview" @click="saveNavState('/orderreview')">订单审核</el-menu-item>
              <el-menu-item index="/incominginspection" @click="saveNavState('/incominginspection')">来料检验</el-menu-item>
              <el-menu-item index="/warehousing" @click="saveNavState('/warehousing')">采购入库</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"
                >销售管理</template
              >
              <el-menu-item index="/saleorder" @click="saveNavState('/saleorder')">销售订单管理</el-menu-item>
              <el-menu-item index="/saleOrderReview" @click="saveNavState('/saleOrderReview')">订单审核</el-menu-item>
              <el-menu-item index="/saleOut" @click="saveNavState('/saleOut')">销售出库</el-menu-item>
              <el-menu-item index="/saleOrderBack" @click="saveNavState('/saleOrderBack')">销售退回</el-menu-item>
              <el-menu-item index="/accountStatement" @click="saveNavState('/accountStatement')">对账单</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"
                >库存管理</template
              >
              <el-menu-item index="/inandout" @click="saveNavState('/inandout')">出入库管理</el-menu-item>
              <el-menu-item index="/inventoryStatus" @click="saveNavState('/inventoryStatus')">库存状况</el-menu-item>
              <!-- <el-menu-item index="/warehouseallocation" @click="saveNavState('/warehouseallocation')">仓库调拨</el-menu-item> -->

              <el-menu-item index="/warehouseManage" @click="saveNavState('/warehouseManage')">仓库管理</el-menu-item>
              <el-menu-item index="/packagingManage" @click="saveNavState('/packagingManage')">包装管理</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"
                >文件管理</template
              >
              <el-menu-item index="/fileManage" @click="saveNavState('/fileManage')">文件管理</el-menu-item>
              <el-menu-item index="/systemAnnounce" @click="saveNavState('/systemAnnounce')">系统公告</el-menu-item>
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
              <span class="el-dropdown-link" style="cursor:pointer;"> {{user.userName}}<i class="el-icon-arrow-down el-icon--right"></i> </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div @click="toAccountInfo">账号资料</div></el-dropdown-item>
                <el-dropdown-item><div @click="loginout()">退出登录</div> </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="text" @click="toems">切换EMS系统</el-button>
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
    }
  },
  created() {
    let user=sessionStorage.getItem("user")
    this.user=JSON.parse(user)
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
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
    // 跳转到ems系统
    toems() {
      this.$router.push('/home')
      this.$message.warning('切换到EMS系统成功')
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
