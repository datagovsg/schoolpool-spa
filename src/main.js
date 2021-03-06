// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import vueSmoothScroll from 'vue-smooth-scroll'
import VeeValidate, { Validator } from 'vee-validate'
import auth from '../src/utils/auth'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = true
Vue.use(vueSmoothScroll)
Vue.use(VeeValidate)
// Can be accessed by __proto__.__proto__.$emailjs
Vue.prototype.$emailjs = emailjs
// Can be accessed by __proto__.__proto__.$auth
Vue.prototype.$auth = auth
Validator.extend('phoneNumber', {
  getMessage: field => `Field ${field} is not legitimate.`,
  // Returns a boolean value
  validate(value) {
    return new Promise((resolve) => {
      resolve({
        valid: value.match(/(6|8|9)\d{7}/g) ? !!value : false,
      })
    })
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
})
