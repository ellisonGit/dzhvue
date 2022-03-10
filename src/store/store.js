import Vue from 'vue'
import Element from 'element-ui'
import Router from 'vue-router'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vant);
Vue.use(Vuex)
Vue.use(Router)
Vue.use(Element)
const module = {
    state: {
        user: {
            name: '',
            id: '',
            tenantId: '',
            accessToken: '',
            ticket: '',
            courseId: 0,
            rate: 0,
            refresh: true,
            req_src: '',  // 请求来源
            corp_id: '',  // 企业ID
            emp_id: '',  // 工号
            emp_fname: '', // 姓名
            adminName: '', // 管理员姓名
            adminPhone: '', // 管理员联系方式
            adminEmail: '', // 管理员邮箱
            card_id: '', // 卡号
            card_balance: '', // 余额
            openid:''
        }
    },
    getters: {},
    mutations: {
        setUser(state, payload) {
            if (payload.hasOwnProperty('card_id')) {
              state.user.card_id = payload.card_id
            }
            if (payload.hasOwnProperty('card_balance')) {
              state.user.card_balance = payload.card_balance
            }
            if (payload.hasOwnProperty('req_src')) {
              state.user.req_src = payload.req_src
            }
            if (payload.hasOwnProperty('openid')) {
              state.user.openid = payload.openid
            }
            if (payload.hasOwnProperty('corp_id')) {
              state.user.corp_id = payload.corp_id
            }
            if (payload.hasOwnProperty('emp_id')) {
              state.user.emp_id = payload.emp_id
            }
            if (payload.hasOwnProperty('emp_fname')) {
              state.user.emp_fname = payload.emp_fname
            }
            if (payload.hasOwnProperty('adminName')) {
              state.user.adminName = payload.adminName
            }
            if (payload.hasOwnProperty('adminPhone')) {
              state.user.adminPhone = payload.adminPhone
            }
            if (payload.hasOwnProperty('adminEmail')) {
              state.user.adminEmail = payload.adminEmail
            }
            if (payload.hasOwnProperty('corp_id')) {
              state.user.corp_id = payload.corp_id
            }
            if (payload.hasOwnProperty('name')) {
                state.user.name = payload.name
            }
            if (payload.hasOwnProperty('id')) {
                state.user.id = payload.id
            }
            if (payload.hasOwnProperty('tenantId')) {
                state.user.tenantId = payload.tenantId
            }
            if (payload.hasOwnProperty('accessToken')) {
                state.user.accessToken = payload.accessToken
            }
            if (payload.hasOwnProperty('ticket')) {
                state.user.ticket = payload.ticket
            }
            if (payload.hasOwnProperty('courseId')) {
                state.user.courseId = payload.courseId
            }
            if (payload.hasOwnProperty('rate')) {
                state.user.rate = payload.rate
            }
            if (payload.hasOwnProperty('refresh')) {
                state.user.refresh = payload.refresh
            }
        },
        LOGOUT(state) {
            sessionStorage.clear();
            state.user.name = '';
            state.user.id = '';
            state.user.tenantId = '';
            state.user.ticket = '';
            state.user.accessToken = '';
            state.user.courseId = 0;
            state.user.rate = 0;
            state.user.refresh = true;
            state.user.req_src = '';
            state.user.corp_id = '';
            state.user.emp_id = '';
            state.user.emp_fname = '';
            state.user.adminName = '';
            state.user.adminPhone = '';
            state.user.adminEmail = '';
            state.user.card_id = '';
            state.user.card_balance = '';
            state.user.openid = '';
            state.user = {};
        },
    },
    plugins: [createPersistedState()]
}


const store = new Vuex.Store(module)
export default store
