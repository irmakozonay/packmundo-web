import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BoxList from './views/BoxList.vue'
import Tool from './views/Tool.vue'
import Quote from './views/Quote.vue'
import Profile from './views/Profile.vue'
import UserOrders from '@/components/user/UserOrders.vue'
import UserBoxes from '@/components/user/UserBoxes.vue'
import UserDetails from '@/components/user/UserDetails.vue'
import Admin from '@/components/admin/Admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/boxlist', name: 'BoxList', component: BoxList },
    { path: '/tool', name: 'Tool', component: Tool },
    { path: '/quote', name: 'Quote', component: Quote },
    { path: '/admin', name: 'Admin', component: Admin },
    {
      path: '/profile',
      component: Profile,
      children: [
        { path: '', name: 'UserOrders', component: UserOrders },
        { path: 'boxes', name: 'UserBoxes', component: UserBoxes },
        { path: 'details', name: 'UserDetails', component: UserDetails }
      ]
    },
    // {
    //   path: '/tool',
    //   name: 'Tool',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/Tool.vue')
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
