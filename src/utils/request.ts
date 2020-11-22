import qs from 'qs'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

const request = axios.create({
  // baseURL
})

// 请求拦截
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, error => {
  return Promise.reject(error)
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      // refresh_token 只能使用一次
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 响应拦截
let isRefreshing = false // 控制刷新 token 的状态
let requests: any[] = [] // 存储刷新 token 期间的 401 请求
request.interceptors.response.use(response => {
  // 2 开头的状态码会走这里
  return response
}, async error => {
  // 除了 2 开头的状态会走这里
  if (error.response) { // 请求发出去收到响应了，但是状态码超出了 2xx 范围
    // 400 401 403 404 500
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效（没有提供token、token无效、token过期）
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 尝试刷新 token
      if (!isRefreshing) {
        isRefreshing = true // 开启刷新状态
        // 尝试刷新获取新的 token
        // 创建新的 axios 实例，新实例没有拦截器
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 Token 失败')
          }
          // 刷新 token 成功
          store.commit('setUser', res.data.content)
          // 把 requests 中的请求重新发出去
          requests.forEach(cb => cb())
          // 清空 requests 数组
          requests = []
          return request(error.config)
        }).catch(err => {
          console.log(err)
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false // 重置刷新状态
        })
      }
      // 刷新状态下，把请求挂起放到 requests 数组中
      // 返回一个不执行 resolve 的 Promise 请求就会被挂起
      return new Promise(resolve => {
        requests.push(() => {
          // resolve 执行的时候 Promise 就结束了
          // resolve 中重新发起失败的请求
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端异常，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试！')
  } else { // 在设置请求时，触发了错误
    Message.error(`请求失败:${error.message}`)
  }
  // 抛出请求错误对象
  return Promise.reject(error)
})

export default request
