<template>
  <div>
    <el-page-header @back="cancel" content="规格型号设置" style="margin-bottom:20px;"> </el-page-header>

    <!-- 基本信息 -->
    <el-card style="margin-top:20px;">
      <div class="meta">基本信息</div>
      <el-form ref="tProduct" :model="tProduct" label-width="80px" style="width:600px;padding-left:80px;">
        <el-form-item label="产品编号">
          <el-input :value="selecteds.productNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="tProduct.productName"></el-input>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-input v-model="tProduct.productModel"></el-input>
        </el-form-item>
        <el-form-item label="产品线别">
          <el-select v-model="tProduct.productLineId" placeholder="请选择" style="width:100%;">
            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.XB" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品说明">
          <el-input v-model="tProduct.productRemark"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-select v-model="tProduct.productUnitId" placeholder="请选择" style="width:100%;">
            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.DW" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线轴">
          <el-select v-model="tProduct.bobbinId" placeholder="请选择" style="width:100%;">
            <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in selecteds.XZ" :key="item.mapKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="始端">
          <el-select v-model="tProduct.beginId" placeholder="请选择" style="width:100%;">
            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.SD" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="末端">
          <el-select v-model="tProduct.endId" placeholder="请选择" style="width:100%;">
            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.MD" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 规格型号 -->
    <el-card style="margin-top:20px;">
      <div class="meta">
        规格型号
        <span class="tips">设置本产品的规格以及物理特性，生产过程中，如果达不到标准便会预警</span>
        <el-button type="primary" plain style="margin-left:60%;" @click="showAddModelForm()">新增</el-button>
      </div>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="tProstandards" height="250" style="width: 100%">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column label="成品直径um">
          <template slot-scope="scope">
            {{ scope.row.umStart }}
          </template>
        </el-table-column>
        <el-table-column label="成品直径mil">
          <template slot-scope="scope">
            {{ scope.row.milStart }}
          </template>
        </el-table-column>
        <el-table-column label="延伸率EL%">
          <template slot-scope="scope">
            {{ scope.row.elStart && scope.row.elEnd ? scope.row.elStart + '-' + scope.row.elEnd : scope.row.elStart ? '&gt;' + scope.row.elStart : '&lt;' + scope.row.elEnd }}
          </template>
        </el-table-column>
        <el-table-column label="拉断力BL(CN)">
          <template slot-scope="scope">
            {{ scope.row.blStart && scope.row.blEend ? scope.row.blStart + '-' + scope.row.blEend : scope.row.blStart ? '&gt;' + scope.row.blStart : '&lt;' + scope.row.blEend }}
          </template>
        </el-table-column>
        <el-table-column label="粗拉直径um">
          <template slot-scope="scope">
            {{
              scope.row.coarseStart && scope.row.coarseEnd ? scope.row.coarseStart + '-' + scope.row.coarseEnd : scope.row.coarseStart ? '&gt;' + scope.row.coarseStart : '&lt;' + scope.row.coarseEnd
            }}
          </template>
        </el-table-column>
        <el-table-column label="中拉直径um">
          <template slot-scope="scope">
            {{ scope.row.diamStart && scope.row.diamEnd ? scope.row.diamStart + '-' + scope.row.diamEnd : scope.row.diamStart ? '&gt;' + scope.row.diamStart : '&lt;' + scope.row.diamEnd }}
          </template>
        </el-table-column>
        <el-table-column label="细拉um">
          <template slot-scope="scope">
            {{ scope.row.semiStart && scope.row.semiEnd ? scope.row.semiStart + '-' + scope.row.semiEnd : scope.row.semiStart ? '&gt;' + scope.row.semiStart : '&lt;' + scope.row.semiEnd }}
          </template>
        </el-table-column>
        <el-table-column label="超细拉um">
          <template slot-scope="scope">
            {{ scope.row.superfineStart && scope.row.superfineEnd ? scope.row.superfineStart + '-' + scope.row.superfineEnd : scope.row.superfineStart ? '&gt;' + scope.row.superfineStart : '&lt;' + scope.row.superfineEnd }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showAddModelForm(scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="tProstandardsDel(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--  各工序环节损耗比率-->
    <el-card style="margin-top:20px;">
      <div class="meta">
        各工序环节损耗比率
        <span class="tips">设置各个环节的损耗比例范围，超过该设定范围便会进行预警</span>
      </div>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="gxLossBislist" height="250" style="width: 100%">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column prop="name" label="工序"> </el-table-column>
        <el-table-column label="成品率%">
          <template slot-scope="scope">
            {{ scope.row.cpstart }}-{{ scope.row.cpend }}
          </template>
        </el-table-column>
        <el-table-column label="废品率%">
          <template slot-scope="scope">
            {{ scope.row.fpstart }}-{{ scope.row.fpend }}
          </template>
        </el-table-column>
        <el-table-column label="损耗率%">
          <template slot-scope="scope">
            {{ scope.row.lossstart }}-{{ scope.row.lossend }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showgx(scope.row, scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="resetgx(scope.row, scope.$index)">重置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 原料配比  -->
    <el-card style="margin-top:20px;">
      <div class="meta" style="width">
        原料配比
        <span class="tips">原料比例之和须等于0或，不等于0或100无法提交保存</span>
        <el-button type="primary" plain style="margin-left:65%;" @click="showAddMaterialVisible()">新增</el-button>
      </div>
      <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="rawMaterialRatios" height="250" style="width: 100%">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column prop="name" label="原料名称"> </el-table-column>
        <el-table-column label="原料比例%">
          <template slot-scope="scope">
            {{ scope.row.ratiostart }}-{{ scope.row.ratioend }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showAddMaterialVisible(scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delAddMaterial(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveAll()">保存</el-button>
      </div>
    </el-card>
    <!-- 新增规格型号的对话框 -->
    <el-dialog :title="indexModel >= 0 ? '编辑' : '新增'" :visible.sync="addModelVisible" width="50%" @close="addModelClose">
      <el-form ref="tProstandardsItem" :model="tProstandardsItem" label-width="120px">
        <el-form-item label="序号">
          <el-input style="width:50%;" :value="indexModel >= 0 ? indexModel + 1 : tProstandards.length + 1" disabled=""></el-input>
        </el-form-item>
        <p style="text-align:center;color:#d9001b;">注意：左侧填0，右侧填数字为小于；左侧填数字，右侧填0为大于；如：0~2相当于&lt;2，2~0相当于>2</p>
        <el-row>
          <el-col :span="12">
            <el-form-item label="成品直径um">
              <el-col :span="12">
                <el-input v-model="tProstandardsItem.umStart" type="number" @change="umStartChange"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成品直径mil">
              <el-col :span="24">
                <el-input disabled="" type="number" v-model="tProstandardsItem.milStart" style="width:38%"></el-input>
                注:1mil=25.4um
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="延伸率EL%">
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.elStart" type="number"></el-input>
              </el-col>
              <el-col :span="3" :offset="1">——</el-col>
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.elEnd" type="number"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="拉断力BL（CN）">
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.blStart" type="number"></el-input>
              </el-col>
              <el-col :span="3" :offset="1">——</el-col>
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.blEend" type="number"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="粗拉直径um">
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.coarseStart" type="number"></el-input>
              </el-col>
              <el-col :span="3" :offset="1">——</el-col>
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.coarseEnd" type="number"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中拉直径um">
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.diamStart" type="number"></el-input>
              </el-col>
              <el-col :span="3" :offset="1">——</el-col>
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.diamEnd" type="number"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="细拉um">
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.semiStart" type="number"></el-input>
              </el-col>
              <el-col :span="3" :offset="1">——</el-col>
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.semiEnd" type="number"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="超细拉um">
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.superfineStart" type="number"></el-input>
              </el-col>
              <el-col :span="3" :offset="1">——</el-col>
              <el-col :span="9">
                <el-input v-model="tProstandardsItem.superfineEnd" type="number"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addModelVisible = false">取 消</el-button>
        <el-button type="primary" @click="addModelFormConfirm()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增原料配比的对话框 -->
    <el-dialog :title="rawMaterialRatiosItemIndex == -1 ? '新增' : '编辑'" @close="addMaterialClose" :visible.sync="addMaterialVisible" width="40%">
      <el-form ref="rawMaterialRatiosItem" :model="rawMaterialRatiosItem" label-width="120px">
        <el-form-item label="序号">
          <el-input style="width:60%;" :value="rawMaterialRatiosItemIndex >= 0 ? rawMaterialRatiosItemIndex + 1 : rawMaterialRatios.length + 1" disabled></el-input>
        </el-form-item>
        <el-form-item label="原料">
          <el-select v-model="rawMaterialRatiosItem.stock_id" placeholder="请选择" style="width:60%;">
            <el-option :label="item.name" :value="item.id" v-for="item in selecteds.YL" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-row>
          <el-col :span="20">
            <el-form-item label="成品直径um">
              <el-col :span="5">
                <el-input v-model="rawMaterialRatiosItem.ratiostart" type="number"></el-input>
              </el-col>
              <el-col :span="2" :offset="1">——</el-col>
              <el-col :span="5">
                <el-input v-model="rawMaterialRatiosItem.ratioend" type="number"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <p style="padding:0 10%;color:#d9001b;">注意：左侧填0，右侧填数字视为小于；左侧填数字，右侧填0视为大于；如：0~2相当于&lt;2，2~0相当于>2~2相当于&lt;2，2~0相当于>2</p>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMaterialVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMaterialConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑各工序环节损耗比率的对话框 -->
    <el-dialog title="编辑" :visible.sync="gxLossBislistVisible" width="40%" @close="gxLossBislistClose()">
      <el-form ref="gxLossBislist" :model="gxLossBislistItem" label-width="160px">
        <el-form-item label="工序">
          <el-input disabled style="width:50%;" v-model="gxLossBislistItem.name"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color:#d9001b;line-height:20px;margin-right:20px;">注意：左侧填0，右侧填数字视为小于；左侧填数字，右侧填0视为大于；如：0~2相当于&lt;2，2~0相当于>2~2相当于&lt;2，2~0相当于>2</div>
        </el-form-item>

        <el-row>
          <el-col :span="20">
            <el-form-item label="成品率%">
              <el-col :span="5">
                <el-input v-model="gxLossBislistItem.cpstart" type="number"></el-input>
              </el-col>
              <el-col :span="2" :offset="1">——</el-col>
              <el-col :span="5" :offset="1">
                <el-input v-model="gxLossBislistItem.cpend" type="number"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="损耗率%">
              <el-col :span="5">
                <el-input v-model="gxLossBislistItem.lossstart" type="number"></el-input>
              </el-col>
              <el-col :span="2" :offset="1">——</el-col>
              <el-col :span="5" :offset="1">
                <el-input v-model="gxLossBislistItem.lossend" type="number"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="废品率%">
              <el-col :span="5">
                <el-input v-model="gxLossBislistItem.fpstart" type="number"></el-input>
              </el-col>
              <el-col :span="2" :offset="1">——</el-col>
              <el-col :span="5" :offset="1">
                <el-input v-model="gxLossBislistItem.fpend" type="number"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gxLossBislistVisible = false">取 消</el-button>
        <el-button type="primary" @click="gxLossConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      rawMaterialRatiosItem: {
        stock_id: '',
        ratiostart: '',
        ratioend: '',
        name: ''
      }, //原料配比的每个选项
      rawMaterialRatios: [], //原料配比的表格
      gxLossBislistVisible: false, //各工序环节显示隐藏
      gxLossBislist: [], //各工序环节损耗比率数组
      addModelForm: {},
      tProstandardsItem: {
        umStart: 0,
        umEnd: 0,
        milStart: 0,
        milEnd: 0,
        elStart: 0,
        elEnd: 0,
        blStart: 0,
        blEend: 0,
        coarseStart: 0,
        coarseEnd: 0,
        diamStart: 0,
        diamEnd: 0,
        semiStart: 0,
        semiEnd: 0,
        superfineStart:0,
        superfineEnd:0,
      },
      addMaterialVisible: false, //原料配比的对话框
      addModelVisible: false, //规格型号的对话框
      selecteds: [],
      tProduct: {
        productNumber: '',
        productName: '',
        productModel: '',
        productLineId: '',
        productRemark: '',
        productUnitId: '',
        bobbinId: '',
        beginId: '',
        endId: ''
      },
      tProstandards: [], //规格型号的数组
      tableData: [],
      indexModel: -1,
      gxLossBislistItem: {
        id: '',
        name: '',
        cpend: '',
        cpstart: '',
        fpend: '',
        fpstart: '',
        lossstart: '',
        lossend: ''
      }, //工序提交表单的每一项
      gxLossBislistItemIndex: -1, //编辑工序提交的选中项
      rawMaterialRatiosItemIndex: -1, //原料配比的索引
      id: '' //编辑的选中id
    }
  },
  created() {
    this.getSelects()
    if (this.$route.query.id >= 0) {
      this.id = this.$route.query.id
      this.getData()
    }
  },
  computed: {
    
  },
  methods: {
      umStartChange(){
          this.tProstandardsItem.milStart=(parseFloat(this.tProstandardsItem.umStart) / 25.4).toFixed(2)
      },
    // 编辑页面根据id获取初始数据
    async getData() {
      const { data: res } = await this.$http.post('BasicSettingController/getAllBasicSettingByNameAndId', {
        findModelName: 'product',
        findById: this.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.tProduct = res.data.TProductModel
      this.tProstandards = res.data.listTProstandard
      this.rawMaterialRatios = res.data.listRawMaterialRatio
    },
    // 保存全部
    async saveAll() {
      const { data: res } = await this.$http.post('BasicSettingController/saveProduct', {
        tProduct: this.tProduct,
        tProstandards: this.tProstandards,
        gxLossBislist: this.gxLossBislist,
        rawMaterialRatios: this.rawMaterialRatios
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success('添加成功')
      this.$router.go(-1)
    },
    // 删除原料配比的选项
    async delAddMaterial(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除！')
      }
      this.rawMaterialRatios.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 监听原料配比关闭
    addMaterialClose() {
      this.rawMaterialRatiosItem = {
        stock_id: '',
        ratiostart: '',
        ratioend: '',
        name: ''
      }
      this.rawMaterialRatiosItemIndex = -1
    },
    // 确定原料配比
    addMaterialConfirm() {
      this.selecteds.YL.forEach(item => {
        if (this.rawMaterialRatiosItem.stock_id == item.id) {
          this.rawMaterialRatiosItem.name = item.name
        }
      })
      this.rawMaterialRatios.push(this.rawMaterialRatiosItem)
      this.addMaterialVisible = false
    },
    // 监听工序窗口关闭
    gxLossBislistClose() {
      this.gxLossBislistItem = {
        id: '',
        name: '',
        cpend: '',
        cpstart: '',
        fpend: '',
        fpstart: '',
        lossstart: '',
        lossend: ''
      }
    },
    // 确认编辑
    gxLossConfirm() {
      this.gxLossBislist.splice(this.gxLossBislistItemIndex, 1, this.gxLossBislistItem)
      this.gxLossBislistVisible = false
    },
    // 各工序环节的重置操作
    resetgx(row, index) {
      this.gxLossBislistItemIndex = index
      this.gxLossBislistItem.name = row.name
      this.gxLossBislistItem.id = row.id
      this.gxLossBislist.splice(this.gxLossBislistItemIndex, 1, this.gxLossBislistItem)
    },
    // 各工序环节的编辑操作
    showgx(row, index) {
      this.gxLossBislistItem = this.gxLossBislist[index]
      this.gxLossBislistVisible = true
    },
    // 点击规格型号表单的删除
    async tProstandardsDel(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除！')
      }
      this.tProstandards.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 监听关闭重置表单
    addModelClose() {
      this.indexModel = -1
      this.tProstandardsItem = {
        umStart: 0,
        umEnd: 0,
        milStart: 0,
        milEnd: 0,
        elStart: 0,
        elEnd: 0,
        blStart: 0,
        blEend: 0,
        coarseStart: 0,
        coarseEnd: 0,
        diamStart: 0,
        diamEnd: 0,
        semiStart: 0,
        semiEnd: 0,
        superfineStart:0,
        superfineEnd:0,
      }
    },
    // 确认新增规格型号的对话框
    addModelFormConfirm() {
      if (this.indexModel >= 0) {
        this.tProstandards.splice(this.indexModel, 1, this.tProstandardsItem)
      } else {
        this.tProstandards.push(this.tProstandardsItem)
      }
      this.addModelVisible = false
    },
    // 展示原料配比型号的对话框
    showAddMaterialVisible(index = -1) {
      if (index >= 0) {
        this.rawMaterialRatiosItemIndex = index
        this.rawMaterialRatiosItem = this.rawMaterialRatios[index]
      }
      this.addMaterialVisible = true
    },
    // 展示新增规格型号的对话框
    showAddModelForm(index = -1) {
      if (index >= 0) {
        this.indexModel = index
        this.tProstandardsItem = _.cloneDeep(this.tProstandards[index])
      }
      this.addModelVisible = true
    },
    // 获取下拉框的数据
    async getSelects() {
      const { data: res } = await this.$http.post('BasicSettingController/getProductBasicInfo',{
          findById:this.id
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.selecteds = res.data
      this.tProduct.productNumber = this.selecteds.productNumber
      this.gxLossBislist=res.data.gxLossBislist
    //   res.data.GX.forEach(item => {
    //     this.gxLossBislist.push({
    //       id: item.id,
    //       name: item.name
    //     })
    //   })
    },
    // 返回上一步
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.meta {
  font-weight: bold;
  margin-bottom: 22px;
  .tips {
    margin-left: 60px;
    font-size: 12px;
    color: #db5564;
  }
}
.top {
  cursor: pointer;
}
</style>
