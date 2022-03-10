import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new Router({
  mode: 'history',
  routes: [
    /** ********************************************公众号用户端 ********************************************/
    {
      path: '/',
      name: 'login',
      meta: {
        title: '登录',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/user_login.vue'], resolve)
      },
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        title: '首页',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/user_index.vue'], resolve)
      },

    },
    { // rechargeRecord
      path: '/rechargeRecord',
      name: 'rechargeRecord',
      meta: {
        title: '充值记录',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/user_rechargeRecord.vue'], resolve)
      },
    },
    { // expensesRecord
      path: '/expensesRecord',
      name: 'expensesRecord',
      meta: {
        title: '消费记录',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/user_meal_record.vue'], resolve)
      },
    },
    { // attendanceRecord
      path: '/attendanceRecord',
      name: 'attendanceRecord',
      meta: {
        title: '考勤记录',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/user_attend_record.vue'], resolve)
      },
    },
    { // passRecord
      path: '/passRecord',
      name: 'passRecord',
      meta: {
        title: '通行记录',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/user_pass_record.vue'], resolve)
      },
    },
    {
      path: '/newsList',
      name: 'newsList',
      meta: {
        title: '消息',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/user_news_list.vue'], resolve)
      },
    },
    {
      path: '/mine',
      name: 'mine',
      meta: {
        title: '我的',
        keepAlive: false //需要缓存
      },
      component: resolve => {
        require(['../views/user_myInfo.vue'], resolve)
      },
    },
    {
      path: '/accountInfo',
      name: 'accountInfo',
      meta: {
        title: '账户信息',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/user_accountInfo.vue'], resolve)
      },
    },
    {
      path: '/wallet',
      name: 'wallet',
      meta: {
        title: '钱包',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/user_wallet.vue'], resolve)
      },
    },
    {
      path: '/rechargeAmount',
      name: 'rechargeAmount',
      meta: {
        title: '充值',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/user_wallet_recharge.vue'], resolve)
      },
    },
    {
      path: '/campusCard',
      name: 'campusCard',
      meta: {
        title: '卡片挂失',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/user_campus_card.vue'], resolve)
      },
    },





    /** ***************************************公众号管理端 ******************************************/
    {
      path: '/admin',
      name: 'admin',
      meta: {
        title: '登录',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/admin_login.vue'], resolve)
      },
    },
    {
      path: '/adminIndex',
      name: 'adminIndex',
      meta: {
        title: '首页',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/admin_index.vue'], resolve)
      },
    },
    {
      path: '/consumption',
      name: 'consumption',
      meta: {
        title: '消费汇总',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/admin_consum_sum_list.vue'], resolve)
      },
    },
    {
      path: '/recharge',
      name: 'recharge',
      meta: {
        title: '充值汇总',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/admin_recharge_sum_list.vue'], resolve)
      },
    },
    {
      path: '/terminal',
      name: 'terminal',
      meta: {
        title: '终端消费汇总',
        keepAlive: false //需要缓存
      },
      component: resolve => {
        require(['../views/admin_terminal_list.vue'], resolve)
      },
    },
    {
      path: '/dataDetails',
      name: 'dataDetails',
      meta: {
        title: '餐厅报表',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/admin_dinroom_report.vue'], resolve)
      },
    },
    {
      path: '/onePass',
      name: 'onePass',
      meta: {
        title: '余额信息',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/admin_card_balance.vue'], resolve)
      },
    },
    {
      path: '/consumptionReport',
      name: 'consumptionReport',
      meta: {
        title: '消费记录',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/admin_consum_detail_record.vue'], resolve)
      },
    },
    {
      path: '/topupReport',
      name: 'topupReport',
      meta: {
        title: '充值记录',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/admin_recharge_detail_record.vue'], resolve)
      },
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      meta: {
        title: '我的',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/admin_myInfo.vue'], resolve)
      },
    },


    /**************************************采购管理*******************************************/
    {
      path: '/addPurOrder',
      name: 'addPurOrder',
      meta: {
        title: '添加采购',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/pur/addPurOrder.vue'], resolve)
      },
    },
    {
      path: '/shoppCart',
      name: 'shoppCart',
      meta: {
        title: '购物车',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/pur/shoppCart.vue'], resolve)
      },
    },
    {
      path: '/purSumReport',
      name: 'purSumReport',
      meta: {
        title: '采购汇总报表',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/pur/purSumReport.vue'], resolve)
      },
    },
    {
      path: '/purSumReportDetail',
      name: 'purSumReportDetail',
      meta: {
        title: '采购汇总明细报表',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/pur/purSumReportDetail.vue'], resolve)
      },
    },
    {
      path: '/myPurOrder',
      name: 'myPurOrder',
      meta: {
        title: '我的采购订单',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/pur/myPurOrder.vue'], resolve)
      },
    },
    {
      path: '/myPurOrderDetail',
      name: 'myPurOrderDetail',
      meta: {
        title: '我的采购订单明细',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/pur/myPurOrderDetail.vue'], resolve)
      },
    },

    /**************************************钉钉管理*******************************************/
    {
      path: '/dingding',
      name: 'dingding',
      meta: {
        title: '车辆预约登记',
        keepAlive: false
      },
      component: resolve => {
        require(['../views/dingding/index.vue'], resolve)
      },
    },
  ]
})
