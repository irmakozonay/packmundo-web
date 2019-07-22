import axios from './axios-auth.js'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    accessToken: null
  },
  actions: {
    async signup ({ commit }, data) {
      const result = await axios.post('/signup', {
        email: data.email,
        password: data.password
      })
      console.log(result)
      commit('SET_TOKEN', result.data.accessToken)
    },
    async signin ({ commit, dispatch }, data) {
      const result = await axios.post('/signin', {
        email: data.email,
        password: data.password
      })
      console.log(result)
      commit('SET_TOKEN', result.data.accessToken)
      dispatch('setLogoutTimer', result.data.expiresIn)
      localStorage.setItem('expirationDate', new Date(new Date().getTime() + result.data.expiresIn))
    },
    signout ({ commit }) {
      commit('SET_TOKEN', null)
      router.replace('/signin')
    },
    setLogoutTimer ({ commit }, expirationTime) {
      setTimeout(() => {
        console.log('logout')
        commit('SET_TOKEN', null)
      }, expirationTime)
    },
    autoLogin ({ commit, dispatch }) {
      console.log('try autoLogin')
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        return
      }
      // todo expirationDate e kalan sureye setLogoutTimer cagirilmali
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        dispatch('signout')
        return
      }
      console.log('autoLogin accessToken:' + accessToken)
      commit('SET_TOKEN', accessToken)
    }
  },
  mutations: {
    SET_TOKEN (state, accessToken) {
      state.accessToken = accessToken
      if (accessToken == null) {
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('accessToken')
      } else {
        localStorage.setItem('accessToken', accessToken)
      }
    }
  }
}
