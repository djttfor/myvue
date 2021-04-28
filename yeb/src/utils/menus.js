import {getRequest} from "./api";
import {isObject} from "element-ui";

export const initMenu = (router,store)=>{
 //如果已经初始化了
  if(store.state.routes.length>0){
    return;
  }

  getRequest('/system/cfg/menu').then(resp=>{
    if(resp){
      //格式化Router
      let fmtRoutes = formatRoutes(resp);
      //添加到router
      router.addRoutes(fmtRoutes)
      //将数据存入vuex
      store.commit('initRoutes',fmtRoutes);
    }
  })
};

export const formatRoutes = (routes)=>{
  let fmtRoutes = [];
  routes.forEach(router=>{
    let{
      path,
      componentName,
      name,
      iconCls,
      children,
    } = router;

    if(children && children instanceof  Array){
      children = formatRoutes(children);
    }
    let fmRouter = {
      path:path,
      name:name,
      iconCls:iconCls,
      children:children,
      component(resolve){
        // console.log(componentName)
        // console.log(typeof componentName)
        // console.log(componentName.startWith('Home'))
        if(componentName.substring(0,4).endsWith('Home')){
          require(['../views/'+componentName.toLowerCase()+'.vue'],resolve);
        }
        else if(componentName.substring(0,3).endsWith('Emp')){
          require(['../views/emp/'+componentName+'.vue'],resolve);
        }else if(componentName.substring(0,3).endsWith('Sta')){
          require(['../views/sta/'+componentName+'.vue'],resolve);
        }else if(componentName.substring(0,3).endsWith('Sal')){
          require(['../views/sal/'+componentName+'.vue'],resolve);
        }else if(componentName.substring(0,3).endsWith('Per')){
          require(['../views/per/'+componentName+'.vue'],resolve);
        }else if(componentName.substring(0,3).endsWith('Sys')){
          require(['../views/sys/'+componentName+'.vue'],resolve);
        }
      }
    }
    fmtRoutes.push(fmRouter);
  });
  return fmtRoutes;
}
