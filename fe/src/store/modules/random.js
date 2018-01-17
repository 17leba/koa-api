
const state = {
  curType: '',
  isLoading: true,
  loveData: {}
}

const actions = {
  getLoveData ({ commit }, loveData){
    commit('getLoveData', loveData)
  },
  onType ({ commit }, curType){
    commit('changeType', curType)
  },
  openLoading ({ commit }){
    commit('openLoading')
  },
  closeLoading ({ commit }){
    commit('closeLoading')
  }
}

const mutations = {
  getLoveData (state, loveData){
    state.loveData = loveData
  },
  changeType (state, curType){
    state.curType = curType
  },
  openLoading (state){
    state.isLoading = true
  },
  closeLoading (state){
    state.isLoading = false
  }
}

export default {
  state,
  actions,
  mutations
}
