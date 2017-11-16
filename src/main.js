// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    // Create html tags to reference external APIs - Reference: https://medium.com/@lassiuosukainen/how-to-include-a-script-tag-on-a-vue-component-fe10940af9e8
    generateScript: (url) => {
      const script = document.createElement('script')
      script.setAttribute('src', url)
      return script
    },
    generateMeta: (name, content) => {
      const meta = document.createElement('meta')
      meta.setAttribute('name', name)
      meta.setAttribute('content', content)
      return meta
    },
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
