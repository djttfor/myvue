import Vue from 'vue'
import Router from 'vue-router'
import login from "../views/login";
import notFound from "../views/notFound";
import iv from "../views/iv";
import my from "../components/my";
import Main from "../views/Main";

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode:'history',
  routes: [
    {component:login,path:'/login'},
    {path:'/goLogin' ,redirect:"/login"},//重定向
    {path:'*',component: notFound},//404页面

    {path:"/main",component:Main,
    children:[
      {path:"iv",component:iv},
      {component:my, name: 'my', path : 'my/:id/:ids'},
    ]
    },

    {path:"/goMain",redirect:"/main"},//重定向到首页
  ]
})
