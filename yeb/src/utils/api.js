import axios from "axios";
import { Message } from 'element-ui';
import router from '../router'
import Vue from "vue";

//请求拦截器
axios.interceptors.request.use(success=>{
  if(window.sessionStorage.getItem('tokenStr')){
    success.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
  }
  return success;
},error => {
  console.error(error);
})



//响应拦截器
axios.interceptors.response.use(success=>{

  //业务逻辑错误
  if (success.status && success.status === 200) {
    if (success.data.code===500 ||
      success.data.code===401 ||
      success.data.code===403 ||
      success.data.code===405
    ) {
      Message.error(success.data.message)
    }
    //成功操作
    if (success.data.code === 200) {
      Message.success(success.data.message)
    }
  }
  return success.data;

},error => {
  if(error){
    Message.error(error.message)
  }
  if (error.response.code===500 || error.response.code===404) {
    Message.error("没找到服务器")
  }else if(error.response.code===403){
    Message.error("权限不足，请联系管理员")
  }else if(error.response.code===401){
    Message.error("尚未登录，请登录");
    router.replace('/login');
  }else {
    if(error.response.message){
      Message.error(error.response.message)
    }else{
      Message.error("未知错误")
    }
  }
})

//post请求
export const postRequest = (url,params)=>{
  //Message.info(`${Vue.prototype.iBaseUrl.iServer+url}`)
  return axios({
    method:'post',
    url:`${Vue.prototype.iBaseUrl.iServer+url}`,
    data:params
  })
}
//get请求
export const getRequest = (url)=>{
  return axios({
    method:'get',
    url:`${Vue.prototype.iBaseUrl.iServer+url}`,
  })
}
