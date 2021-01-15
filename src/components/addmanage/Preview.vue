<template>
  <el-card>
    <div style="display:flex">
      <table class="pure-table pure-table-bordered" v-for="(el, rindex) in list" :key="rindex" :style="{ borderRight: rindex + 1 < list.length ? 'none' : '' }">
        <thead :style="{ backgroundColor: el.color }">
          <tr>
            <th colspan="3">{{ el.name }}</th>
          </tr>
        </thead>

        <tr :style="{ backgroundColor: el.color }">
          <th>序号</th>
          <th>型号</th>
          <th>直径</th>
        </tr>

        <tbody>
          <tr v-for="(row, index) in el.tableList" :key="index" :style="{ backgroundColor: el.color }">
            <td>{{ index + 1 }}</td>
            <td>{{ row.type }}</td>
            <td>{{ row.long }}</td>
          </tr>
          <tr v-for="(row, index) in maxNum - el.tableList.length" :key="index">
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          name: '粗拉1',
          color: '#FF0000',
          tableList: [
            { type: '1-1', long: '0.256' },
            { type: '1-2', long: '0.256' },
            { type: '1-3', long: '0.256' },
            { type: '1-4', long: '0.256' },
            { type: '1-1', long: '0.256' },
            { type: '1-2', long: '0.256' },
            { type: '1-3', long: '0.256' }
          ]
        },
        {
          name: '粗拉2',
          color: '#FFFF00',
          tableList: [
            { type: '1-1', long: '0.256' },
            { type: '1-2', long: '0.256' },
            { type: '1-3', long: '0.256' },
            { type: '1-4', long: '0.256' },
            { type: '1-3', long: '0.256' },
            { type: '1-4', long: '0.256' }
          ]
        },
        {
          name: '中拉1',
          color: '#00FF00',
          tableList: [
            { type: '1-1', long: '0.256' },
            { type: '1-2', long: '0.256' },
            { type: '1-3', long: '0.256' },
            { type: '1-4', long: '0.256' },
            { type: '1-1', long: '0.256' },
            { type: '1-2', long: '0.256' },
            { type: '1-3', long: '0.256' },
            { type: '1-4', long: '0.256' }
          ]
        },
        {
          name: '中拉1',
          color: '#FF00FF',
          tableList: [{ type: '1-1', long: '0.256' }, { type: '1-2', long: '0.256' }, { type: '1-3', long: '0.256' }, { type: '1-4', long: '0.256' }]
        }
      ],
      maxNum: 0 // 找到最大的一个数组
    }
  },
  mounted() {},
  methods: {},
  created() {
    this.list.forEach(el => {
      if (el.tableList.length > this.maxNum) {
        this.maxNum = el.tableList.length
      }
    })
  }
}
</script>
<style type="text/css">
.el-card{
  min-height: 100%;
}
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 10px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}

.pure-table {
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #000;
}

.pure-table caption {
  color: #000;
  font: italic 85%/1 arial, sans-serif;
  padding: 1em 0;
  text-align: center;
}

.pure-table td,
.pure-table th {
  border-left: 1px solid #000;
  border-width: 0 0 0 1px;
  font-size: inherit;
  margin: 0;
  overflow: visible;
  height: 35px;
  width: 50px;
  text-align: center;
  line-height: 35px;
}

.pure-table thead {
  color: #000;
  text-align: left;
  vertical-align: bottom;
  border-bottom: 1px solid #000;
}

.pure-table td {
  background-color: transparent;
}

.pure-table-bordered td {
  border-bottom: 1px solid #000;
}

.pure-table-bordered tbody > tr:last-child > td {
  border-bottom-width: 0;
}
</style>
