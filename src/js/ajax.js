
import axios from 'axios'
//多租户生产地址
const PRODUCT_URL = 'http://yslduozuhupt.gdeastriver.com/ysl/api';

//钉钉生产服务器地址113.106.190.59
// const PRODUCT_URL = 'http://113.106.190.60:8800/ysl/api';


const MOCK_URL = 'http://192.168.0.119:7010/ysl/api';
// const MOCK_URL = 'http://yslduozuhupt.gdeastriver.com/ysl/api';
let http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? PRODUCT_URL : MOCK_URL
})
// // 请求拦截器
// http.interceptors.request.use(
//     config => {
//         if (store.getters.token) {
//             config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//         }
//         return config
//     },
//     error => {
//         // Do something with request error
//         console.log(error); // for debug
//         Promise.reject(error)
//     }
// )
// // 响应拦截器
// http.interceptors.response.use(
//     response => {
//         /**
//          * code为非200是抛错 可结合自己业务进行修改
//          */
//         const res = response.data;
//         if (res.code !== 200) {
//             Message({
//                 message: res.data,
//                 type: 'error',
//                 duration: 5 * 1000
//             });
//
//             // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//             if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//                 MessageBox.confirm(
//                     '你已被登出，可以取消继续留在该页面，或者重新登录',
//                     '确定登出',
//                     {
//                         confirmButtonText: '重新登录',
//                         cancelButtonText: '取消',
//                         type: 'warning'
//                     }
//                 ).then(() => {
//                     store.dispatch('FedLogOut').then(() => {
//                         location.reload() // 为了重新实例化vue-router对象 避免bug
//                     })
//                 })
//             }
//             return Promise.reject('error')
//         } else {
//             return response.data
//         }
//     },
//     error => {
//         Message({
//             message: error.message,
//             type: 'error',
//             duration: 5 * 1000
//         });
//         return Promise.reject(error)
//     }
// )

function get(url, data, lodaing) {
  return new Promise((resolve, reject) => {
    http
      .get(url)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

function post(url, data, loading) {
  return new Promise((resolve, reject) => {
    http
      .post(url, data, { loading: loading })
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// export { get, post }
export default http
