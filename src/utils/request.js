// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的 axios 实例发请求，返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const service = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 进行请求配置的修改
  // 如果本地又token就在头部携带
  // 1. 获取用户信息对象
  const { profile } = store.user.state
  // 2. 判断是否有token
  if (profile.token) {
    // 3. 设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(res => {
  const data = res.data
  console.log(data)
}, err => {
  // 处理 401 状态码
  if (err.response && err.response.status === 401) {
    // 1. 清空无效用户信息
    store.commit('user/setUser', {})
    // 2. 跳转到登录页
    // 3. 跳转需要传参（当前路由地址）给登录页码
    // 当前路由地址
    // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
    // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
  return service({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
