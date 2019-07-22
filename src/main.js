import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8181'

Vue.filter('formatDate', function (value, format) {
  if (value) {
    return moment(String(value)).format(format)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
