// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/global.less'

import mavonEditor from 'mavon-editor' // makedown
import 'mavon-editor/dist/css/index.css'

import { Pagination } from "ant-design-vue";
import 'ant-design-vue/lib/pagination/style/css'
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  mavonEditor,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
