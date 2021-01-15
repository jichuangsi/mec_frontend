import Vue from 'vue'
import Router from 'vue-router'

// import Login from './components/Login.vue'
const Login = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ './components/Login.vue')
    // import Home from './components/Home.vue'
const Home = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ './components/Home.vue')
    // import Welcome from './components/Welcome.vue'
const Personal = () =>
    import ('./components/Personal.vue')
    // 概况
const Homepage = () =>
    import ('./components/survey/Homepage.vue')
const Workbench = () =>
    import ('./components/survey/Workbench.vue')
const AccountInfo = () =>
    import ('./components/survey/AccountInfo.vue')
const Todo = () =>
    import ('./components/todo/Todo.vue')
const Doing = () =>
    import ('./components/todo/Doing.vue')
const Done = () =>
    import ('./components/todo/Done.vue')
    // 生产计划
const Production = () =>
    import ('./components/production/Production.vue')
const Examine = () =>
    import ('./components/production/Examine.vue')
const NewLink = () =>
    import ('./components/production/NewLink.vue')
const NewNotLink = () =>
    import ('./components/production/NewNotLink.vue')
const Detail = () =>
    import ('./components/production/Detail.vue')
const ProductionDetail = () =>
    import ('./components/production/ProductionDetail.vue')
    // 生产管理
const Melting = () =>
    import ('./components/manage/Melting.vue')
const RoughDrawing = () =>
    import ('./components/manage/RoughDrawing.vue')
const MediumPull = () =>
    import ('./components/manage/MediumPull.vue')
const ThinPull = () =>
    import ('./components/manage/ThinPull.vue')
const SuperThinPull = () =>
    import ('./components/manage/SuperThinPull.vue')
const BackFire = () =>
    import ('./components/manage/BackFire.vue')
const ELTest = () =>
    import ('./components/manage/ELTest.vue')
const Winding = () =>
    import ('./components/manage/Winding.vue')

const Detour = () =>
    import ('./components/manage/Detour.vue')
    // 生产管理的添加项
const AddMelting = () =>
    import ('./components/addmanage/AddMelting.vue')
const AddRoughDrawing = () =>
    import ('./components/addmanage/AddRoughDrawing.vue')
const AddMediumPull = () =>
    import ('./components/addmanage/AddMediumPull.vue')
const AddThinPull = () =>
    import ('./components/addmanage/AddThinPull.vue')
const AddSuperThinPull = () =>
    import ('./components/addmanage/AddSuperThinPull.vue')
const AddBackFire = () =>
    import ('./components/addmanage/AddBackFire.vue')
const DetourDetail = () =>
    import ('./components/addmanage/DetourDetail.vue')
const WindingDetail = () =>
    import ('./components/addmanage/WindingDetail.vue')
const AddWinding = () =>
    import ('./components/addmanage/AddWinding.vue')
const AddDetour = () =>
    import ('./components/addmanage/AddDetour.vue')
const Preview = () =>
    import ('./components/addmanage/Preview.vue')
    // 质量检验
const QualitySetting = () =>
    import ('./components/qualitytesting/QualitySetting.vue')
const SamplingInspection = () =>
    import ('./components/qualitytesting/SamplingInspection.vue')
const AddSampling = () =>
    import ('./components/qualitytesting/AddSampling.vue')
const SamplingInfo = () =>
    import ('./components/qualitytesting/SamplingInfo.vue')
const AddTemplate = () =>
    import ('./components/qualitytesting/AddTemplate.vue')
const Certificate = () =>
    import ('./components/qualitytesting/Certificate.vue')
const AddCertificate = () =>
    import ('./components/qualitytesting/AddCertificate.vue')
    // 统计数据
const SummaryTable = () =>
    import ('./components/statistics/SummaryTable.vue')
const ThinTable = () =>
    import ('./components/statistics/ThinTable.vue')
const teamProduction = () =>
    import ('./components/statistics/TeamProduction.vue')
const qualityAnalysis = () =>
    import ('./components/statistics/qualityAnalysis.vue')
const FlashBack = () =>
    import ('./components/statistics/FlashBack.vue')
const FlashBackDetail = () =>
    import ('./components/statistics/FlashBackDetail.vue')
    //基础设置
const ModelSetting = () =>
    import ('./components/BasicSetting/ModelSetting.vue')
const AddProduct = () =>
    import ('./components/BasicSetting/AddProduct.vue')
const AddRaw = () =>
    import ('./components/BasicSetting/AddRaw.vue')
const AddThread = () =>
    import ('./components/BasicSetting/AddThread.vue')
const AddOther = () =>
    import ('./components/BasicSetting/AddOther.vue')
const MaintainManage = () =>
    import ('./components/BasicSetting/MaintainManage.vue')
const ReportRepair = () =>
    import ('./components/BasicSetting/ReportRepair.vue')
const AddRepair = () =>
    import ('./components/BasicSetting/AddRepair.vue')
const AddEquipment = () =>
    import ('./components/BasicSetting/AddEquipment.vue')
const EquipMaintain = () =>
    import ('./components/BasicSetting/EquipMaintain.vue')
const AccountChecking = () =>
    import ('./components/BasicSetting/AccountChecking.vue')
const AddMould = () =>
    import ('./components/BasicSetting/AddMould.vue')
const AddCombination = () =>
    import ('./components/BasicSetting/AddCombination.vue')
const AddFinish = () =>
    import ('./components/BasicSetting/AddFinish.vue')
const MoldMaintain = () =>
    import ('./components/BasicSetting/moldMaintain.vue')
const cpMoldMaintain = () =>
    import ('./components/BasicSetting/cpmoldMaintain.vue')
const SetDetail = () =>
    import ('./components/BasicSetting/SetDetail.vue')
const cpSetDetail = () =>
    import ('./components/BasicSetting/cpSetDetail.vue')
const Printer = () =>
    import ('./components/BasicSetting/Printer.vue')

// 系统设置
const DictionaryTable = () =>
    import ('./components/systemsettings/DictionaryTable.vue')
const SystemLog = () =>
    import ('./components/systemsettings/SystemLog.vue')
const StaffManagement = () =>
    import ('./components/systemsettings/StaffManagement.vue')
const AddStaff = () =>
    import ('./components/systemsettings/AddStaff.vue')
const AddDepartment = () =>
    import ('./components/systemsettings/AddDepartment.vue')
const AddTitle = () =>
    import ('./components/systemsettings/AddTitle.vue')
const AddClass = () =>
    import ('./components/systemsettings/AddClass.vue')
const AddRole = () =>
    import ('./components/systemsettings/AddRole.vue')
const ProductInfo = () =>
    import ('./components/systemsettings/ProductInfo.vue')




// ERP系统
const ERPHome = () =>
    import ('./components/ERPHome.vue')
    // 首页
const Index = () =>
    import ('./erpcomponents/index/Index.vue')
    // 客户关系
const supplier = () =>
    import ('./erpcomponents/customerrelation/Supplier.vue')
const addsupplier = () =>
    import ('./erpcomponents/customerrelation/AddSupplier.vue')
const client = () =>
    import ('./erpcomponents/customerrelation/Client.vue')
const addclient = () =>
    import ('./erpcomponents/customerrelation/AddClient.vue')
const complaint = () =>
    import ('./erpcomponents/customerrelation/Complaint.vue')
    // 采购管理
const PurchaseOrder = () =>
    import ('./erpcomponents/purchase/PurchaseOrder.vue')
const PurchaseBilling = () =>
    import ('./erpcomponents/purchase/PurchaseBilling.vue')
const OrderReview = () =>
    import ('./erpcomponents/purchase/OrderReview.vue')
const OrderReviewDetail = () =>
    import ('./erpcomponents/purchase/OrderReviewDetail.vue')
const IncomingInspection = () =>
    import ('./erpcomponents/purchase/IncomingInspection.vue')
const IncomingDetail = () =>
    import ('./erpcomponents/purchase/IncomingDetail.vue')
const Warehousing = () =>
    import ('./erpcomponents/purchase/Warehousing.vue')
const WarehousingDetail = () =>
    import ('./erpcomponents/purchase/WarehousingDetail.vue')
    // 销售管理
const SaleOrder = () =>
    import ('./erpcomponents/sale/SaleOrder.vue')
const SaleBilling = () =>
    import ('./erpcomponents/sale/SaleBilling.vue')
const SaleOrderReview = () =>
    import ('./erpcomponents/sale/SaleOrderReview.vue')
const SaleOut = () =>
    import ('./erpcomponents/sale/SaleOut.vue')
const SaleOutDetail = () =>
    import ('./erpcomponents/sale/SaleOutDetail.vue')
const SaleOrderBack = () =>
    import ('./erpcomponents/sale/SaleOrderBack.vue')
const OrderBackDetail = () =>
    import ('./erpcomponents/sale/OrderBackDetail.vue')
const SaleReviewDetail = () =>
    import ('./erpcomponents/sale/SaleReviewDetail.vue')
const AccountStatement = () =>
    import ('./erpcomponents/sale/AccountStatement.vue')
    // 库存管理
const Inandout = () =>
    import ('./erpcomponents/inventory/Inandout.vue')
const InventoryStatus = () =>
    import ('./erpcomponents/inventory/InventoryStatus.vue')
const InventoryStatusDetail = () =>
    import ('./erpcomponents/inventory/InventoryStatusDetail.vue')
const WarehouseAllocation = () =>
    import ('./erpcomponents/inventory/WarehouseAllocation.vue')
const WarehouseManage = () =>
    import ('./erpcomponents/inventory/WarehouseManage.vue')
const PackagingManage = () =>
    import ('./erpcomponents/inventory/PackagingManage.vue')
const PackagingSetting = () =>
    import ('./erpcomponents/inventory/PackagingSetting.vue')
    // 文件管理
const FileManage = () =>
    import ('./erpcomponents/file/FileManage.vue')
const SystemAnnounce = () =>
    import ('./erpcomponents/file/SystemAnnounce.vue')

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home',
            component: Home,
            redirect: '/homepage',
            label: '首页',
            children: [
                { path: '/welcome', component: Homepage, meta: '首页', },
                { path: '/homepage', component: Homepage, meta: '概况', },
                { path: '/workbench', component: Workbench, meta: '概况', },
                { path: '/todo', component: Todo, label: '待办事项', },
                { path: '/doing', component: Doing, label: '待办事项' },
                { path: '/done', component: Done, label: '待办事项' },
                { path: '/production', component: Production, label: '生产计划' },
                { path: '/production/newLink', component: NewLink, label: '生产计划' },
                { path: '/production/newNotLink', component: NewNotLink },
                { path: '/examine/detail', component: Detail },
                { path: '/ProductionDetail', component: ProductionDetail },
                { path: '/examine', component: Examine },
                { path: '/melting', component: Melting },
                { path: '/roughDrawing', component: RoughDrawing },
                { path: '/mediumPull', component: MediumPull },
                { path: '/thinPull', component: ThinPull },
                { path: '/superThinPull', component: SuperThinPull },
                { path: '/backFire', component: BackFire },
                { path: '/elTest', component: ELTest },
                { path: '/winding', component: Winding },
                { path: '/Detour', component: Detour },
                { path: '/windingDetail', component: WindingDetail },
                { path: '/detourDetail', component: DetourDetail },
                { path: '/addWinding', component: AddWinding },
                { path: '/addDetour', component: AddDetour },
                { path: '/preview', component: Preview },
                { path: '/summaryTable', component: SummaryTable },
                { path: '/thinTable', component: ThinTable },
                { path: '/teamProduction', component: teamProduction },
                { path: '/qualityAnalysis', component: qualityAnalysis },
                { path: '/flashBack', component: FlashBack },
                { path: '/flashBackDetail', component: FlashBackDetail },
                { path: '/modelSetting', component: ModelSetting },
                { path: '/modelSetting/addProduct', component: AddProduct },
                { path: '/modelSetting/addRaw', component: AddRaw },
                { path: '/modelSetting/addThread', component: AddThread },
                { path: '/modelSetting/addOther', component: AddOther },
                { path: '/maintainManage', component: MaintainManage },
                { path: '/reportRepair', component: ReportRepair, },
                { path: '/addRepair', component: AddRepair },
                { path: '/addEquipment', component: AddEquipment },
                { path: '/equipMaintain', component: EquipMaintain },
                { path: '/accountChecking', component: AccountChecking },
                { path: '/addMould', component: AddMould },
                { path: '/addCombination', component: AddCombination },
                { path: '/addFinish', component: AddFinish },
                { path: '/moldMaintain', component: MoldMaintain },
                { path: '/cpmoldMaintain', component: cpMoldMaintain },
                { path: '/setDetail', component: SetDetail },
                { path: '/cpsetDetail', component: cpSetDetail },
                { path: '/printer', component: Printer },
                { path: '/dictionaryTable', component: DictionaryTable },
                { path: '/systemLog', component: SystemLog },
                { path: '/staffManagement', component: StaffManagement },
                { path: '/staffManagement/addStaff', component: AddStaff },
                { path: '/staffManagement/addDepartment', component: AddDepartment },
                { path: '/staffManagement/addTitle', component: AddTitle },
                { path: '/staffManagement/addClass', component: AddClass },
                { path: '/staffManagement/AddRole', component: AddRole },
                { path: '/QualitySetting', component: QualitySetting },
                { path: '/samplingInspection', component: SamplingInspection },
                { path: '/addSampling', component: AddSampling },
                { path: '/samplingInfo', component: SamplingInfo },
                { path: '/addTemplate', component: AddTemplate },
                { path: '/certificate', component: Certificate },
                { path: '/addCertificate', component: AddCertificate },
                { path: '/addMelting', component: AddMelting },
                { path: '/addRoughDrawing', component: AddRoughDrawing },
                { path: '/addMediumPull', component: AddMediumPull },
                { path: '/addThinPull', component: AddThinPull },
                { path: '/addBackFire', component: AddBackFire },
                { path: '/addSuperThinPull', component: AddSuperThinPull },
                { path: '/productInfo', component: ProductInfo },
            ]
        },
        { path: '/personal', component: Personal },
        {
            path: '/erpHome',
            component: ERPHome,
            redirect: '/index',
            children: [
                { path: '/index', component: Index },
                { path: '/supplier', component: supplier },
                { path: '/addsupplier', component: addsupplier },
                { path: '/addclient', component: addclient },
                { path: '/client', component: client },
                { path: '/complaint', component: complaint },
                { path: '/purchaseOrder', component: PurchaseOrder },
                { path: '/purchaseBilling', component: PurchaseBilling },
                { path: '/orderreview', component: OrderReview },
                { path: '/orderreviewdetail', component: OrderReviewDetail },
                { path: '/incominginspection', component: IncomingInspection },
                { path: '/incomingdetail', component: IncomingDetail },
                { path: '/warehousing', component: Warehousing },
                { path: '/warehousingdetail', component: WarehousingDetail },
                { path: '/saleorder', component: SaleOrder },
                { path: '/salebilling', component: SaleBilling },
                { path: '/saleOrderReview', component: SaleOrderReview },
                { path: '/saleOut', component: SaleOut },
                { path: '/saleOutDetail', component: SaleOutDetail },
                { path: '/saleOrderBack', component: SaleOrderBack },
                { path: '/orderBackDetail', component: OrderBackDetail },
                { path: '/salereviewdetail', component: SaleReviewDetail },
                { path: '/accountStatement', component: AccountStatement },
                { path: '/inandout', component: Inandout },
                { path: '/inventoryStatus', component: InventoryStatus },
                { path: '/inventoryStatusDetail', component: InventoryStatusDetail },
                { path: '/warehouseallocation', component: WarehouseAllocation },
                { path: '/warehouseManage', component: WarehouseManage },
                { path: '/packagingSetting', component: PackagingSetting },
                { path: '/packagingManage', component: PackagingManage },
                { path: '/fileManage', component: FileManage },
                { path: '/systemAnnounce', component: SystemAnnounce },
            ]
        },
        {
            path: '*',
            redirect: '/login',
        }
    ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //     next()  放行    next('/login')  强制跳转

    if (to.path === '/login') return next()
        // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
        //  if (!tokenStr) return next('/login')
    next()
})

export default router