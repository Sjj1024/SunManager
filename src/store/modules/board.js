import boardApi from '@/api/board'


export default {
  namespaced: true,
  state: {
    homes: null,
  },
  mutations:{
    set_homes(state, data){
      state.homes = data
    }
  },
  actions: {
    async getHomes({ commit }) {
      console.log('发送获取地址的get...');
      const res = await boardApi.getHomes()
      commit('set_homes', res.data)
      return res.data
    },
  }
}
