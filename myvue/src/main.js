// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from "vue-axios";
import header from "./components/header";
import myContent from "./components/myContent"
import Footer from "./components/footer"
import qs from "qs.js"
Vue.prototype.$qs = qs  //全局注册，使用方法为:this.$axios
         //全局注册，使用方法为:this.qs

Vue.use(VueAxios,axios);
Vue.use(ElementUI);
Vue.component('Header',header);
Vue.component('MyContent',myContent);
Vue.component('Footer',Footer);


//相当于全局拦截器
router.beforeEach((to,from,next)=>{
 // alert(to.path);
 //  if(to.path === '/main'){//如果访问的是/main
 //    next({path:'/main/info'})//那么让他跳到/main/info去
 //  }
  if (to.path === '/main/info'){
    alert("我让你访问了吗")
    next(false);//返回原来的页面
  }else{
    next();//一定要放行
  }

});


new Vue({
  el: '#app',
  axios,
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
