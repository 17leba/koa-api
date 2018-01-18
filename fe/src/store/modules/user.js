
import api from 'api/user'

const state = {
  userInfo: {}
}

const actions = {
  async getLogin ({ commit, state }){
    let res = await api.isLogin()
    commit('getLogin', res)
    return res
  },
  updateUserInfo ({ commit, state}, userInfo){
    commit('updateUserInfo', userInfo)
  }
}

const mutations = {
  getLogin (state, res){
    state.userInfo = res
  },
  updateUserInfo (state, userInfo){
    state.userInfo = userInfo
  }
}

export default {
  state,
  actions,
  mutations
}
