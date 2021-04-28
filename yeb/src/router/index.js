import Vue from 'vue'
import Router from 'vue-router'
import login from "../views/login";
import home from "../views/home";
import test1 from "../views/aside/test1";
import test2 from "../views/aside/test2";

Vue.use(Router)

export default new Router({
  routes: [
    {
      component: login,
      path: '/login',
      hidden: false,
    },
    {
      component: home,
      path: '/home',
      name: '导航一',
      children: [
        {
          component:test1,
          path: '/test1',
          name: '选项一'
        },
        {
          component:test2,
          path: '/test2',
          name: '选项二'
        },
      ]
    },
  ]
})
