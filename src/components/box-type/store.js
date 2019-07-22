import axios from 'axios'

export default {
  namespaced: true,
  state: {
    mainBoxTypes: [],
    subBoxTypes: []
  },
  getters: {
    mainBoxTypes: state => state.mainBoxTypes,
    subBoxTypes: state => state.subBoxTypes
  },
  actions: {
    async getMainBoxTypes ({ commit }) {
      const result = await axios.get('/box/type/mains')
      commit('SET_MAIN_BOX_TYPES', result.data)
    },
    async getSubBoxTypes ({ commit }, mainBoxTypeId) {
      const result = await axios.get('/box/type/subs?maintypeid=' + mainBoxTypeId)
      commit('SET_SUB_BOX_TYPES', result.data)
    }
  },
  mutations: {
    SET_MAIN_BOX_TYPES (state, mainBoxTypes) {
      state.mainBoxTypes = mainBoxTypes
    },
    SET_SUB_BOX_TYPES (state, subBoxTypes) {
      state.subBoxTypes = subBoxTypes
    }
  }
}
