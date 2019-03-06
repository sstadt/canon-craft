
import Vue from 'vue'

import VueSanitize from 'vue-sanitize'
import VeeValidate from 'vee-validate'
import VueMoment from 'vue-moment'
import ToggleButton from 'vue-js-toggle-button'

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
