// 我们组装模块并导出 store 的地方

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

import random from './modules/random'
import user from './modules/user'

const state = {
  isLoading: true
}

export default new Vuex.Store({
  actions,
  mutations,
  state,
  modules: {
    random,
    user
  }
})
