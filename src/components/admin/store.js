import axios from 'axios'

export default {
  namespaced: true,
  state: {
    ordersData: null,
    companies: []
  },
  getters: {
    ordersData: state => state.ordersData,
    companies: state => state.companies
  },
  actions: {
    async getOrdersData ({ commit }) {
      const result = await axios.get('/order/all')
      commit('SET_ORDERS_DATA', result.data)
    },
    async getCompanies ({ commit }) {
      const result = await axios.get('/company/all')
      commit('SET_COMPANIES', result.data)
    }
  },
  mutations: {
    SET_ORDERS_DATA (state, ordersData) {
      state.ordersData = ordersData
    },
    SET_COMPANIES (state, companies) {
      state.companies = companies
    }
  }
}
