import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user') || 'null') // 当前登陆用户状态
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 持久化处理 本地存储只能存字符串
      localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
