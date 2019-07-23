import axios from 'axios'

export default {
  namespaced: true,
  state: {
    orderQuotes: null
  },
  getters: {
    orderQuotes: state => state.orderQuotes
  },
  actions: {
    async getOrderQuotes ({ commit }, orderId) {
      const result = await axios.get('/order/quotes?orderid=' + orderId)
      commit('SET_ORDER_QUOTES', result.data)
    }
  },
  mutations: {
    SET_ORDER_QUOTES (state, orderQuotes) {
      console.log('orderQuotes ready')
      state.orderQuotes = orderQuotes
    }
  }
}
