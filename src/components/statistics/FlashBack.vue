<template>
  <el-card style="height:100%;">
    <div class="card">
      <h2 style="margin:15% 20% 40px 45%;">批号生产回溯</h2>
      <div class="wrapper">
        <div>生产批号</div>
        <el-input style="width:40%;margin-left:20px;" placeholder="请输入搜索内容" v-model="findName"></el-input>
        <el-button style="margin-left:20px;" @click="search">搜索</el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      findName: ''
    }
  },
  methods: {
    //点击搜索
    async search() {
      if (!this.findName.trim()) {
        return this.$message.error('请输入搜索批号')
      }
      sessionStorage.setItem('flashback', this.findName)
      this.$router.push('/flashBackDetail')
    }
  }
}
</script>
<style lang="less" scoped>
.card {
  width: 100%;
  height: 100%;

  .wrapper {
    margin-left: 35%;
    width: 50%;
    display: flex;
    align-items: center;
  }
}
</style>
