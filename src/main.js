// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router/index'
import VueWechatTitle from 'vue-wechat-title';

// import axios from 'axios'
// import { get, post } from './js/ajax'
import utils from './js/utils'
import 'lib-flexible/flexible'
import {AlertPlugin,DatetimePlugin, ConfirmPlugin, LoadingPlugin, ToastPlugin} from 'vux'
import store from './store/store'
//复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'
import {i18n, vantLocales} from './common/lang'
VueClipboard.config.autoSetContainer = true;
import Calendar from 'vue-mobile-calendar'
Vue.use(Calendar)
Vue.use(VueClipboard)
Vue.use(DatetimePlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(VueWechatTitle)
console.log('当前的语言是：', i18n.locale)
vantLocales(i18n.locale)
// 把 get，post 方法挂载到 vue 实例上
// Vue.prototype.$http = { get, post }
// 添加方法到 vue 实例的原型链上
Vue.use(utils)
Vue.use(VueRouter)

// console.log(router)
// Vue.use(axios);
// const routes = [{
//   path: '/',
//   component: Home
// },
// // {
// //   path: '/list',
// //   component: './views/HelloWorld.vue'
// // }
// ]

// const router = new VueRouter({
//   routes
// })

router.beforeEach((to, from, next) => {
    // if (store.getters.token) { // 判断是否有token
    if (to.path == '/login') {
        next({path: '/'});
        // console.log(1);
    } else {
        next()
        // console.log(2);
    }
    // }
    // else {
    //   next({path: '/login'});
    //   console.log(3);
    //
    // }
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    store,
    router,
  i18n,
    render: h => h(App)
}).$mount('#app-box')

