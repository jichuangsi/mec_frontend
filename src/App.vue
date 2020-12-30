<template>
  <div id="app">
    <!-- 路由占位符  路由做判断-->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>

<style>
::-webkit-scrollbar-track
{
  background: rgba(0,0,0,.1);
  border-radius: 0;
}

::-webkit-scrollbar
{
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb
{
    cursor: pointer;
    border-radius: 5px;
    background: rgba(0,0,0,.25);
    transition: color .2s ease;
}
.el-col {
  min-height: 1px
}
</style>
