// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import vueSmoothScroll from 'vue-smooth-scroll'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = true
Vue.use(vueSmoothScroll)
Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
})
