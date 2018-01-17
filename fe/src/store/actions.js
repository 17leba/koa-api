// 根级别的 action
export default {
  onLoading ({ commit }, isLoading){
    commit('changeLoading', isLoading)
  }
}
