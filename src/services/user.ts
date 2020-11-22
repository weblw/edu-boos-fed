// 用户相关模块
import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string;
  password: string;
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // 如果 data 是对象 application/json
    // 如果 data 是 qs 转换之后的形式 application/x-www-form-urlencoded
    // 如果 data 是 FormData 则是 mutipart/form-data
    data: qs.stringify(data) // axios 默认发送的是 application/json
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
