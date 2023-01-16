import boardApi from '@/api/board'
import { getStore, saveStore } from '@/utils';


export default {
  namespaced: true,
  state: {
    homes: getStore("caoliu"),
  },
  getters: {
    clHome: state => {
      const home = state.homes.find((item) => {
        return item.key === '1024地址'
      })
      return home && home.homes[1]
    }
  },
  mutations:{
    set_homes(state, data){
      state.homes = data
      saveStore("caoliu", data)
      console.log('state.homes--', data);
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
