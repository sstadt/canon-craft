
import Vue from 'vue'

import VueSanitize from 'vue-sanitize'
import VeeValidate from 'vee-validate'
import VueMoment from 'vue-moment'
import ToggleButton from 'vue-js-toggle-button'
import VueLazyload from 'vue-lazyload'
import VueMq from 'vue-mq'

import App from './App.vue'

import router from './router'
import store from './store'

import sanitizeConfig from './lib/config.sanitize.js'

// vendor css
// require('node/module/style.css')

// Vue Setup
Vue.config.productionTip = false

Vue.use(VueSanitize, sanitizeConfig)
Vue.use(VeeValidate)
Vue.use(VueMoment)
Vue.use(ToggleButton)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/images/loader.gif',
  attempt: 1
})

Vue.use(VueMq, {
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: Infinity
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
