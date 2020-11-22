import axios from 'axios'
import store from '@/store'

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

// 响应拦截

export default request
