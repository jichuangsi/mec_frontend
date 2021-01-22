<template>
  <div>
    <el-page-header @back="cancel" content="中拉" style="margin-bottom:20px;"> </el-page-header>
    <div class="container">
      <el-card style="width:100%">
        <div class="meta">基本信息</div>
        <el-row>
          <el-col :span="8">
            <el-col :span="12" class="col-left">生产计划单号</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.ppNumber }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">产品名称</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.productName }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">始端</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.beginName }}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="12" class="col-left">计划下达日期</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.createTime }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">产品编号</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.productNumber }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">末端</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.endName }}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="12" class="col-left">计划完工日期</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.finishedTime }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">产品型号</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.productModel }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">成品线轴</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.bobbinName }}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="12" class="col-left">客户名称</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.customerName }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">产品规格um</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.umStart }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">拉断力BL（CN）</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.blStart }}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="12" class="col-left" style="color:red;">预计生产数量（米）</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.planNum }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">产品规格mil</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.milStart }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">延伸力EL（%）</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.elStart }}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-col :span="12" class="col-left" style="color:red;">实际生产数量（米）</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.finishNum }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">成品长度（m/轴）</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.length }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="12" class="col-left">计划轴数（轴）</el-col>
            <el-col :span="10" :offset="2" class="col-right">{{ BasicInfo.quantum }}</el-col>
          </el-col>
        </el-row>
      </el-card>

      <!-- 工艺参数 -->
      <el-card style="width:32%;margin-top:20px;">
        <div class="j-c-s">
          <div class="meta">工艺参数</div>
          <el-button type="text" @click="showGYDialog">编辑</el-button>
        </div>
        <el-row style="margin:20px 0">
          <el-col :span="8" style="text-align:right">温度℃</el-col>
          <el-col :span="8" :offset="4" style="color:#9896a9;">{{ ppAnnealingInfo.temperature }}</el-col>
        </el-row>
        <el-row style="margin:20px 0">
          <el-col :span="8" style="text-align:right">速度m/s</el-col>
          <el-col :span="8" :offset="4" style="color:#9896a9;">{{ ppAnnealingInfo.speed }}</el-col>
        </el-row>
        <el-row style="margin:20px 0">
          <el-col :span="8" style="text-align:right">张力</el-col>
          <el-col :span="8" :offset="4" style="color:#9896a9;">{{ ppAnnealingInfo.tension }}</el-col>
        </el-row>
        <el-row style="margin:20px 0">
          <el-col :span="8" style="text-align:right">气体流量</el-col>
          <el-col :span="8" :offset="4" style="color:#9896a9;">{{ ppAnnealingInfo.gasFlow }}</el-col>
        </el-row>
        <el-row style="margin:20px 0">
          <el-col :span="8" style="text-align:right">炉管号</el-col>
          <el-col :span="8" :offset="4" style="color:#9896a9;">{{ ppAnnealingInfo.furnaceNumber }}</el-col>
        </el-row>
      </el-card>
      <!-- 设备信息 -->
      <el-card style="width:32%;margin-top:20px;">
        <div class="j-c-s">
          <div class="meta">设备信息</div>
          <el-button type="text" @click="showInfoDialog">编辑</el-button>
        </div>
        <el-row>
          <el-col :span="6"><div class="col-left">生产设备</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right" v-if="equipmentInfo">{{ equipmentInfo.equipmentNumber }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">设备状态</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right" v-if="equipmentInfo">{{ equipmentInfo.state == 0 ? '正常' : '报废' }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">设备类型</div></el-col>
          <el-col :span="16" :offset="2"><div class="col-right" v-if="equipmentInfo">熔炼设备</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">最近一次检修员</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right" v-if="equipmentInfo">{{ equipmentInfo.checkStaffName }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">最近一次检修时间</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right" v-if="equipmentInfo">{{ equipmentInfo.checkTime }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">设备运行次数</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right" v-if="equipmentInfo">{{ equipmentInfo.runNumber }}</div></el-col
          >
        </el-row>
      </el-card>
      <!-- 操作信息 -->
      <el-card style="width:32%;margin-top:20px;">
        <div class="j-c-s">
          <div class="meta">操作信息</div>
          <el-button type="text" @click="showCZDialog">编辑</el-button>
        </div>
        <el-row>
          <el-col :span="6"><div class="col-left">操作员工</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right">{{ OperationInfo.staffName }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">员工编号</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right">{{ OperationInfo.staffNumber }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">班组</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right">{{ OperationInfo.tteamName }}</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"><div class="col-left">班次</div></el-col>
          <el-col :span="16" :offset="2"
            ><div class="col-right">{{ OperationInfo.frequencystr }}</div></el-col
          >
        </el-row>
      </el-card>
      <!-- 导入本次退火的EL/BL数据 -->
      <el-card style="margin-top:20px;width:100%;">
        <div style="font-weight:bold">导入本次退火的EL/BL数据
          <el-button type="primary" plain style="margin-left:60%;margin-right:40px;" @click="showELDialog">导入</el-button>
          <el-button type="primary"   @click="downTemplate">下载模板</el-button>
        </div>
        <el-table style="width:100%;" :data="elblDataList" :header-cell-style="{ background: '#f0f5ff' }">
          <el-table-column label="EL数据" align="center">
            <el-table-column label="x1" align="center" prop="elX1"></el-table-column>
            <el-table-column label="x2" align="center" prop="elX2"></el-table-column>
            <el-table-column label="x3" align="center" prop="elX3"></el-table-column>
            <el-table-column label="x4" align="center" prop="elX4"></el-table-column>
            <el-table-column label="x5" align="center" prop="elX5"></el-table-column>
          </el-table-column>
          <el-table-column label="BL数据" align="center">
            <el-table-column label="x1" align="center" prop="blX1"></el-table-column>
            <el-table-column label="x2" align="center" prop="blX2"></el-table-column>
            <el-table-column label="x3" align="center" prop="blX3"></el-table-column>
            <el-table-column label="x4" align="center" prop="blX4"></el-table-column>
            <el-table-column label="x5" align="center" prop="blX5"></el-table-column>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 同批号历史退火数据 -->
      <el-card style="margin-top:20px;width:100%;"  >
        <div style="font-weight:bold">同批号历史退火数据</div>
        <el-table  :data="historyList" style="width:100%" :header-cell-style="{background:'#f0f5ff'}">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="createTime" label="时间"></el-table-column>
          <el-table-column prop="gxname" label="工序"></el-table-column>
          <el-table-column prop="teamName" label="班组"></el-table-column>
          <el-table-column prop="frequencystr" label="班次"></el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="toDetail(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 上班生产产物（粗拉） -->
      <el-card style="width:100%;margin-top:20px;">
        <div class="j-c-s">
          <div class="meta">上班生产产物（{{ oneListName }}）</div>
        </div>
        <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="Needstock" style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="createTime" label="生产时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="工序">
            <template>
              {{ oneListName }}
            </template>
          </el-table-column>
          <el-table-column prop="bobbinName" label="线轴"> </el-table-column>
          <el-table-column prop="standards" label="线轴规格"> </el-table-column>
          <el-table-column prop="wireDiameterUm" label="线径um"> </el-table-column>
          <el-table-column prop="lengthM" label="长度m"> </el-table-column>
          <el-table-column prop="grossWeight" label="毛重g"> </el-table-column>
          <el-table-column prop="netWeightg" label="净重g"> </el-table-column>
          <el-table-column prop="wastageg" label="废料g"> </el-table-column>
          <el-table-column prop="lossg" label="损耗g"> </el-table-column>
        </el-table>
      </el-card>
      <!-- 本班生产产物（粗拉） -->
      <el-card style="width:100%;margin-top:20px;">
        <div class="j-c-s">
          <div class="meta">本班生产产物（{{ twoListName }}）</div>
          <el-button type="primary" plain @click="showAddClassDialog" v-if="PPProductionInfo.state === 0 || id >= 0">新增</el-button>
        </div>
        <el-table :header-cell-style="{ background: '#f0f5ff' }" :data="SmeltingProducts" style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="createTime" label="生产时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="工序">
            <template>
              {{ twoListName }}
            </template>
          </el-table-column>
          <el-table-column prop="bobbinName" label="线轴"> </el-table-column>
          <el-table-column prop="standards" label="线轴规格"> </el-table-column>
          <el-table-column prop="wireDiameterUm" label="线径um"> </el-table-column>
          <el-table-column prop="lengthM" label="长度m"> </el-table-column>
          <el-table-column prop="grossWeight" label="毛重g"> </el-table-column>
          <el-table-column prop="netWeightg" label="净重g"> </el-table-column>
          <el-table-column prop="wastageg" label="废料g"> </el-table-column>
          <el-table-column prop="lossg" label="损耗g"> </el-table-column>
          <el-table-column prop="surface" label="表面"> </el-table-column>
          <el-table-column prop="payingOff" label="放线"> </el-table-column>
          <el-table-column prop="straightLine" label="直线"> </el-table-column>
          <el-table-column label="操作" width="180" v-if="PPProductionInfo.state === 0 || id >= 0">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editSmeltingProducts(scope.$index)">编辑</el-button>
              <el-button type="danger" size="mini" @click="delSmeltingProducts(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="card-footer" v-if="PPProductionInfo.state === 0 || id >= 0">
          <el-button type="primary" @click="saveAll(0)">草稿</el-button>
          <el-button type="danger">打印标签</el-button>
          <el-button type="success" @click="saveAll(1)" v-if="PPProductionInfo.gxName.indexOf('中间退火')>=0">转下班工序</el-button>
          <el-button type="warning" @click="saveAll(2)">重复当前工序</el-button>
          <el-button type="success" @click="goBack()">撤回上班工序</el-button>
          <el-button type="warning" @click="saveAll(4)">完成生产</el-button>
        </div>
      </el-card>
      <!--  新增本班产物的对话框-->
      <el-dialog :title="SmeltingProductsIndex<0?'新增本班产物':'编辑'" :visible.sync="addClassDialogVisible" width="30%" @close="addClassDialogClose">
        <el-form label-width="120px">
          <el-form-item label="线轴名称">
            <el-select v-model="aaa" placeholder="请选择 " style="width:60%" @change="selectedChange">
              <el-option :value="item.mapKey" :label="item.mapValue + '--' + item.mapValue2" v-for="item in BobbinXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线轴规格">
            <el-select v-model="SmeltingProductsItem.bobbinDetailId" placeholder="请选择 " style="width:60%">
              <el-option :label="item.standards" :value="item.id" v-for="item in BobbinXiaLaInfo" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线径um">
            <el-input v-model="SmeltingProductsItem.wireDiameterUm" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="长度m/轴">
            <el-input v-model="SmeltingProductsItem.lengthM" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="毛重g">
            <el-input v-model="SmeltingProductsItem.grossWeight" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="净重g">
            <el-input v-model="SmeltingProductsItem.netWeightg" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="废料g">
            <el-input v-model="SmeltingProductsItem.wastageg" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="损耗g">
            <el-input v-model="SmeltingProductsItem.lossg" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="表面">
            <el-input v-model="SmeltingProductsItem.surface" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="放线">
            <el-input v-model="SmeltingProductsItem.payingOff" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="直线">
            <el-input v-model="SmeltingProductsItem.straightLine" oninput="value=value.replace(/[^\d.]/g,'')" style="width:60%"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addClassDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addClassDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑工艺参数的对话框 -->
      <el-dialog title="工艺参数" :visible.sync="dialogGYVisible" width="30%">
        <el-form label-width="120px">
          <el-form-item label="温度℃">
            <el-input v-model="ppAnnealingInfo.temperature" oninput="value=value.replace(/[^\d.]/g,'')" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="速度m/s">
            <el-input v-model="ppAnnealingInfo.speed" oninput="value=value.replace(/[^\d.]/g,'')" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="张力">
            <el-input v-model="ppAnnealingInfo.tension" oninput="value=value.replace(/[^\d.]/g,'')" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="气体流量">
            <el-input v-model="ppAnnealingInfo.gasFlow" oninput="value=value.replace(/[^\d.]/g,'')" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="炉管号">
            <el-input v-model="ppAnnealingInfo.furnaceNumber" oninput="value=value.replace(/[^\d.]/g,'')" style="width:80%"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogGYVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogGYVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 设备信息的对话框 -->
      <el-dialog title="设备信息" :visible.sync="dialogInfoVisible" width="30%">
        <el-row>
          <el-col :span="3" :offset="1" style="padding-top:10px;">生产机型</el-col>
          <el-col :span="14" :offset="1">
            <el-select v-model="PPProductionInfo.equipmentId" placeholder="请选择 " style="width:100%">
              <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in equipmentXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogInfoVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogInfoConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 操作信息的对话框 -->
      <el-dialog title="操作信息" :visible.sync="dialogCZVisible" width="30%">
        <el-form label-width="120px">
          <el-form-item label="操作员工">
            <el-select v-model="PPProductionInfo.staffId" placeholder="请选择 " style="width:70%;">
              <el-option :label="item.mapValue + '--' + item.mapValue2" :value="item.mapKey" v-for="item in staffXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班组">
            <el-select v-model="PPProductionInfo.teamId" placeholder="请选择 " style="width:70%;">
              <el-option :label="item.mapValue" :value="item.mapKey" v-for="item in TeamXiaLa" :key="item.mapKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班次">
            <el-select v-model="PPProductionInfo.frequency" placeholder="请选择 " style="width:70%;">
              <el-option label="白班" :value="1"></el-option>
              <el-option label="夜班" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCZVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogCZConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 导入EL BL数据的对话框 -->
      <el-dialog title="导入EL BL数据" :visible.sync="dialogELVisible" width="30%">
        <el-form label-width="120px">
          <el-form-item label="文件上传">
            <el-upload
              :data="{ findById: Eid }"
              class="upload-demo"
              action="http://192.168.31.94:8080/ProductionController/importFilePPProduction"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :headers="headerObj"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过100M</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogELVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogELVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      form: {
        name: ''
      },
      elblDataList: [],
      historyList:[],
      //退火基本信息：
      ppAnnealingInfo: {
        id: '',
        pppId: '', //生产id
        temperature: '', //温度
        speed: '', //速度
        tension: '', //张力
        gasFlow: '', //气体流量
        furnaceNumber: '' //炉管号
      },
      // 图片上传组件的headers请求头对象
      headerObj: {
        accessToken: window.sessionStorage.getItem('token')
      },
      aaa: '',
      tableData: [],
      addClassDialogVisible: false,
      dialogCZVisible: false,
      dialogGYVisible: false,
      dialogInfoVisible: false,
      allocatDialogVisible: false,
      allocatNextDialogVisible: false,
      dialogELVisible: false,
      id: -1,
      Eid: -1,
      OperationInfo: {},
      staffXiaLa: [],
      TeamXiaLa: [],
      BasicInfo: {},
      RawMaterialRatio: [],
      ProcessTechnology: {},
      equipmentInfo: {},
      equipmentXiaLa: [],
      PPProductionInfo: {
        id: '', //传过来的id
        pproductId: '', //生产计划单-产物id
        finishNum: '', //实际生产数量(米)
        suitId: '', //套模id
        moldTemp: '', //铸造温度℃
        towTime: '', //牵引时间min
        towParameters: '', //牵引参数
        stopTime: '', //停止时间 min
        waterTemp: '', //水温℃
        equipmentId: '', //设备id
        staffId: '', //员工id
        teamId: '', //班组id
        frequency: '' //班次id （1 白班 2夜班）
      }, //需要提交的数据
      Needstock: [], //生产所需原材料
      SmeltingProducts: [], //生产产物 熔炼
      SmeltingProductsItem: {
        gxName: '', //工序名称
        createTime: '',
        bobbinDetailId: '', //线轴规格id
        bobbinName: '', //线轴名称
        standards: '', //线轴规格
        createTime: '', //生产时间
        deleteNo: '',
        grossWeight: '', //毛重g
        gxId: '', //工序id
        id: '',
        lengthM: '', //长度m/轴
        lossg: '', //损耗g
        netWeightg: '', //净重g
        netWeightgSum: '', //总净重g
        payingOff: '', //放线
        pppid: '', //生产id
        slip: '', //滑差
        straightLine: '', //直线
        surface: '', //表面
        takeUpSpeed: '', //收线速度
        totalLength: '', //总长度
        tractionSpeed: '', //牵引速度
        wastageg: '', //废料g
        wireDiameterUm: '' //线径um
      },
      NeedstockItem: {
        quantityChoose: '', //选择数量
        totalNet: '', //总净数g
        unitName: '', //单位
        standards: '', //规格
        stockName: '', //名称
        stockNumber: '', //编号
        inventoryStatusId: '' //库存原料id
      },

      type: '',
      listdata: [],
      listdataDetail: [],
      ChuKuForm: {
        findName: '',
        findModelName: '',
        findIdOne: ''
      },
      listdataDetailAll: [],
      updateRemark: '', //备注
      warehourseXiaLa: [],
      updateWarehourseID: 1, //选中的仓库id
      listdataObj: {
        stockName: '', //产品名称
        stockNumber: '', //产品编号
        pppid: '' //生产id
      },
      activeName: 'stock',
      BobbinXiaLa: [],
      BobbinXiaLaInfo: [],
      fileList: [],
      oneListName: '',
      twoListName: '',
      SmeltingProductsIndex:-1,
    }
  },
  created() {
    if (this.$route.query.Eid) {
      this.Eid = this.$route.query.Eid
      this.getEditData()
    }
  },
  methods: {
    downTemplate(){
      window.location.href = 'http://192.168.31.94:8080/upload/file3223d4d0-7ced-4df1-8a88-d3f137164e07elbl.xlsx' 
    },
    toDetail(id){
      this.$router.replace({
        path:'/addBackFire',
        query:{
          Eid:id
        }
      })
    },
    // 撤回当前工序
    async goBack(){
      const confirmResult = await this.$confirm('是否确认撤回？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      const { data: res } = await this.$http.post('ProductionController/backToPPProduction',{
        findById:this.Eid
      })
      if (res.code !== "0010") return this.$message.error(res.msg)
      this.$message.success("撤回成功")
      this.$router.go(-1)
    },
    //   监听图片上传成功
    handleSuccess(response) {
      this.elblDataList = response.data
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    showELDialog() {
      this.dialogELVisible = true
    },
    async selectedChange(e) {
      const { data: res } = await this.$http.post('ProductionController/getBobbinXiaLaInfoByBId', {
        findById: e
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.BobbinXiaLaInfo = res.data
    },
    //   更改操作信息
    dialogCZConfirm() {
      this.staffXiaLa.forEach(item => {
        if (this.PPProductionInfo.staffId === item.mapKey) {
          this.OperationInfo.staffName = item.mapValue
          this.OperationInfo.staffNumber = item.mapValue2
        }
      })
      this.TeamXiaLa.forEach(item => {
        if (this.PPProductionInfo.teamId == item.mapKey) {
          this.OperationInfo.tteamName = item.mapValue
        }
      })
      if (this.PPProductionInfo.frequency == 1) {
        this.OperationInfo.frequencystr = '白班'
      } else {
        this.OperationInfo.frequencystr = '夜班'
      }
      this.dialogCZVisible = false
    },
    // 删除原材料
    async delNeedstock(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      this.Needstock.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 编辑本班产物
    editSmeltingProducts(index) {
      this.SmeltingProductsIndex=index
      this.SmeltingProductsItem = _.cloneDeep(this.SmeltingProducts[index])
      this.addClassDialogVisible = true
    },
    // 删除本班产物
    async delSmeltingProducts(index) {
      const confirmResult = await this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      this.SmeltingProducts.splice(index, 1)
      this.$message.success('删除成功')
    },
    //   更改设备类型数据
    async dialogInfoConfirm() {
      const { data: res } = await this.$http.post('ProductionController/getEquipmentXiaLaInfoById', {
        findById: this.PPProductionInfo.equipmentId
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.equipmentInfo = res.data
      this.dialogInfoVisible = false
    },
    // 确认新增本班产物对话框
    addClassDialogConfirm() {
      this.SmeltingProductsItem.createTime = new Date()
      this.BobbinXiaLaInfo.forEach(item => {
        if (item.id == this.SmeltingProductsItem.bobbinDetailId) {
          this.SmeltingProductsItem.standards = item.standards
        }
      })
      this.BobbinXiaLa.forEach(item => {
        if (item.mapKey == this.aaa) {
          this.SmeltingProductsItem.bobbinName = item.mapValue + '--' + item.mapValue2
        }
      })
      if(this.SmeltingProductsIndex>=0){
        this.SmeltingProducts.splice(this.SmeltingProductsIndex,1,_.cloneDeep(this.SmeltingProductsItem))
      }else{
        this.SmeltingProducts.push(_.cloneDeep(this.SmeltingProductsItem))
      }
      
      this.addClassDialogVisible = false
    },
    addClassDialogClose() {
      this.SmeltingProductsItem = {
        gxName: '', //工序名称
        createTime: '',
        bobbinDetailId: '', //线轴规格id
        bobbinName: '', //线轴名称
        standards: '', //线轴规格
        createTime: '', //生产时间
        deleteNo: '',
        grossWeight: '', //毛重g
        gxId: '', //工序id
        id: '',
        lengthM: '', //长度m/轴
        lossg: '', //损耗g
        netWeightg: '', //净重g
        netWeightgSum: '', //总净重g
        payingOff: '', //放线
        pppid: '', //生产id
        slip: '', //滑差
        straightLine: '', //直线
        surface: '', //表面
        takeUpSpeed: '', //收线速度
        totalLength: '', //总长度
        tractionSpeed: '', //牵引速度
        wastageg: '', //废料g
        wireDiameterUm:'' //线径um
      },
      this.aaa='',
      this.SmeltingProductsIndex=-1
    },

    // 详情页面获取初始数据
    async getEditData() {
      const { data: res } = await this.$http.post('ProductionController/getProductionDetailByPPPId', {
        findById: this.Eid
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.OperationInfo = res.data.OperationInfo
      this.Needstock = res.data.oneList ? res.data.oneList : []
      this.BasicInfo = res.data.BasicInfo
      this.PPProductionInfo = res.data.PPProductionInfo
      this.ProcessTechnology = res.data.ProcessTechnology
      this.RawMaterialRatio = res.data.RawMaterialRatio
      this.SmeltingProducts = res.data.twoList
      this.TeamXiaLa = res.data.TeamXiaLa
      this.equipmentInfo = res.data.equipmentInfo
      this.equipmentXiaLa = res.data.equipmentXiaLa
      this.staffXiaLa = res.data.staffXiaLa
      this.BobbinXiaLa = res.data.BobbinXiaLa
      this.elblDataList = res.data.elblDataList
      this.oneListName = res.data.oneListName
      this.twoListName = res.data.twoListName
      this.ppAnnealingInfo = res.data.ppAnnealingInfo //退火信息
      this.historyList=res.data.historyList
    },
    // 保存全部数据
    async saveAll(state) {
      if(state===2){
        const confirmResult = await this.$confirm('是否确认重复当前工序？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return
        }
      }
      if (this.Eid >= 0) {
        this.PPProductionInfo.id = this.Eid      
      } else {
        this.PPProductionInfo.suitId = this.ProcessTechnology.id       
        this.PPProductionInfo.pproductId = this.id
        this.PPProductionInfo.gxid = 1
        this.PPProductionInfo.productionNumber = this.BasicInfo.productModel
      }
      if(!this.PPProductionInfo.pproductId || !this.PPProductionInfo.equipmentId|| !this.PPProductionInfo.suitId|| !this.PPProductionInfo.staffId ){
        return this.$message.error("请填写必要项")
      }
      this.ppAnnealingInfo.pppId=this.Eid
      this.PPProductionInfo.state = state
      this.SmeltingProducts.forEach(item => {
        item.gxId = this.PPProductionInfo.gxid
      })
      this.elblDataList.forEach(item=>{
        if(!item.gxId||!item.pppid){
          item.gxId=this.PPProductionInfo.gxid
          item.pppid=this.Eid
        }
        
      })
      const { data: res } = await this.$http.post('ProductionController/savePPProduction', {
        ppProduction: this.PPProductionInfo,
        oneList: this.Needstock,
        twoList: this.SmeltingProducts,
        elblDataList:this.elblDataList,
        ppAnnealingInfo:this.ppAnnealingInfo
      })
      if (res.code !== '0010') return this.$message.error(res.msg)
      this.$message.success(this.Eid >= 0 ? '编辑成功' : '新增成功')
      this.$router.go(-1)
    },
    showAddClassDialog() {
      this.addClassDialogVisible = true
    },
    showGYDialog() {
      this.dialogGYVisible = true
    },
    showInfoDialog() {
      this.dialogInfoVisible = true
    },
    showCZDialog() {
      this.dialogCZVisible = true
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-table::before {
  //去掉最下面的那一条线
  height: 0px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.col-left {
  text-align: right;
  font-size: 14px;
  line-height: 40px;
}
.col-right {
  font-size: 14px;
  text-align: left;
  color: #9896a9;
  line-height: 40px;
}
.meta {
  font-weight: bold;
}
.j-c-s {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-footer {
  text-align: right;
  margin-top: 40px;
}
</style>
