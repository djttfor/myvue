const state = {
  t1: '明天去哪玩'
}

const mutations = {
  test1: state=>{
    alert("mutations执行了")
  }
}

const actions = {
  toggleTest1({ commit }) {
    commit('test1')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
