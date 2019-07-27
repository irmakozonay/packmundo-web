import Vue from 'vue'
import Vuex from 'vuex'
import boxType from '@/components/box-type/store'
import auth from '@/components/auth/store'
import user from '@/components/user/store'
import order from '@/components/order/store'
import admin from '@/components/admin/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    boxType,
    auth,
    user,
    order,
    admin
  }
})
