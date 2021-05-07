// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './styles/element-variables.scss'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'

import './permission' // permission control

import iConstant from "./config/global";
import store from './store'
import 'font-awesome/css/font-awesome.css'

import '@/icons' // icon
import './utils/error-log' // error log

import * as filters from './filters' // global filters


Vue.prototype.iConstant = iConstant;
Vue.config.productionTip = false;
Vue.use(ElementUI);

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App),
  template: '<App/>'
})
