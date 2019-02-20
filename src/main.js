
import Vue from 'vue'

import VueSanitize from 'vue-sanitize'
import VeeValidate from 'vee-validate'
import VueMoment from 'vue-moment'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

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
// Vue.use(VueAxios, axios) // TODO: to be used for blog state management

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
