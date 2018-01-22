const state = {
  curType: '',
  isLoading: true,
  loveData: {},
  isShowFeatureBtn: true
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
  },
  showFeatureBtn ({ commit }){
    commit('showFeatureBtn')
  },
  hideFeatureBtn ({ commit }){
    commit('hideFeatureBtn')
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
  },
  showFeatureBtn (state){
    state.isShowFeatureBtn = true
  },
  hideFeatureBtn (state){
    state.isShowFeatureBtn = false
  }
}

export default {
  state,
  actions,
  mutations
}
