import Vue from 'vue';//导入项目
import VueRouter from "vue-router";
import my from '../components/my'
import Main from "../views/Main";
import login from "../views/login";
import info from "../views/user/info";
import notFound from "../views/notFound";
import bt from "../components/bt";
import test1 from "../components/test1";
Vue.use(VueRouter);//安装路由

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

//配置导出路由
export default new VueRouter({
  mode:'history',//把地址栏的#号去掉
  routes:[
    {
      //路由的组件
      component:my,
      //路由的名字
      name: 'my',
      //配置路径
      path : '/my/:id/:ids',//restful风格
    },
    {
      component:Main,
      path:'/main',
      children:[
        {path:'info' ,component:info,name:'info'},
        ]
    },
    {component:login,path:'/login'},
    {path:'/goLogin' ,redirect:"/login"},//重定向
    {path:'*',component: notFound},//404页面
    {path:'/bt',component:bt},
    {path:"/test1",component:test1},
  ],

});

