import axios from 'axios'

export default {
  namespaced: true,
  state: {
    userOrders: [],
    userBoxes: []
  },
  getters: {
    userOrders: state => state.userOrders,
    userBoxes: state => state.userBoxes
  },
  actions: {
    async getUserOrders ({ commit }) {
      const result = await axios.get('/user/orders')
      commit('SET_USER_ORDERS', result.data)
    },
    async getUserBoxes ({ commit }) {
      const result = await axios.get('/user/boxes')
      commit('SET_USER_BOXES', result.data)
    }
  },
  mutations: {
    SET_USER_ORDERS (state, userOrders) {
      state.userOrders = userOrders
    },
    SET_USER_BOXES (state, userBoxes) {
      state.userBoxes = userBoxes
    }
  }
}
