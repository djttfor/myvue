// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from "vue-axios";
import qs from "qs"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Router from "vue-router";
import myUtil from "./piugin/myUtil";

Vue.prototype.$qs = qs  //全局注册，使用方法为:this.qs

Vue.use(myUtil);
Vue.use(VueAxios,axios);
Vue.use(Router)
Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({

  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
