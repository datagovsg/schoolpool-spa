import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import ControlPanel from '@/components/ControlPanel'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'
import { requireAuth } from '../specs/models/Auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/schoolpool-spa/',
  // Enable path and anchor
  // scrollBehavior(to) {
  //   if (to.hash) {
  //     return { selector: to.hash }
  //   }
  //   return { x: 0, y: 0 }
  // },
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
      path: '/control-panel',
      name: 'ControlPanel',
      component: ControlPanel,
      beforeEnter: requireAuth,
      children: [

        // ControlPanel will be rendered inside ControlPanel's <router-view>
        // when /control-panel is matched
        { path: '', redirect: '/control-panel/dashboard' },

        // ControlPanel will be rendered inside ControlPanel's <router-view>
        // when /control-panel/dashboard is matched
        { path: 'dashboard', component: Dashboard },

        // ControlPanel will be rendered inside ControlPanel's <router-view>
        // when /control-panel/settings is matched
        { path: 'settings', component: Settings },
      ],
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
})
