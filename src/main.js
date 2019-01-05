
import Vue from 'vue'

import VeeValidate from 'vee-validate'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

import router from './router'
import store from './store'

// vendor css
// require('node/module/style.css')

// Vue Setup
Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(VueAxios, axios) // TODO: Do I need this ???

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
