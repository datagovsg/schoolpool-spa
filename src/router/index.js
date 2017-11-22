import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import Dashboard from '@/components/Dashboard'
import { requireAuth } from '../../utils/AuthService'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // Enable path and anchor
  scrollBehavior(to) {
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: requireAuth,
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
})
