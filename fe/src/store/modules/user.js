
import api from 'api/user'

const state = {
  userInfo: {}
}

const actions = {
  async getLogin ({ commit, state }){
    let res = await api.isLogin()
    commit('getLogin', res)
    return res
  }
}

const mutations = {
  getLogin (state, res){
    state.userInfo = res
  }
}

export default {
  state,
  actions,
  mutations
}
