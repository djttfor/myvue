// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iServer from './config/global'
import vCodeCookieName from './config/global'
import {setCookie,getCookie,delCookie} from "./assets/cookie";
import store from './store'
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.css'


Vue.prototype.iBaseUrl = iServer;
Vue.prototype.$vCodeCookieName = vCodeCookieName;
Vue.config.productionTip = false;
Vue.use(ElementUI);

//根据名称获取cookie
Vue.prototype.$cookieStore = {setCookie,getCookie,delCookie};

router.beforeEach((to, from, next) => {

  //判断用户是否已经登录
  if(window.sessionStorage.getItem('tokenStr')){

    //初始化菜单
    initMenu(router,store);
    next();
  }else if(to.path==='/login'){
    next();
  }

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
