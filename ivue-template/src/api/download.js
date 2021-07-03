import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 ,// request timeout
  responseType: 'arraybuffer'
})

service.interceptors.request.use(
  config => {

    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer' + getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    let headers = response.headers
    let reg = RegExp(/application\/json/)
    let contentType = headers['content-type']

    if(contentType.match(reg)){
      response.data = unitToString(response.data)
      return response.data
    }else{
      let fileDownload = require('js-file-download')
      let fileName = headers['content-disposition'].split(";")[1].split("filename=")[1]
      fileName = decodeURIComponent(fileName)
      fileDownload(response.data,fileName,contentType)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export function exportExcel() {
  return service({
    method: 'GET',
    url: '/emp/basic/export'
  })
}

function unitToString(data){
  let encodedString = String.fromCharCode.apply(null,new Uint8Array(data))
  let decodedString = decodeURIComponent(encodedString)
  return JSON.parse(decodedString)
}

//另一个下载方法
export function downloadExcel2(url) {
  var xhr = new XMLHttpRequest();		//定义http请求对象
  xhr.open("GET", url, true);
  //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader('Authorization','Bearer' + getToken())
  xhr.send();
  xhr.responseType = "blob";
  xhr.onload = function() {
    if(this.status === 200){
      let resp = this.response;
      let temp = xhr.getResponseHeader("Content-Disposition").split(";")[1].split("filename=")[1];
      var fileName = decodeURIComponent(temp);
      var reader = new FileReader();
      reader.readAsDataURL(resp);
      reader.onload = function(e){
        var a = document.createElement('a');
        a.download=fileName;			//自定义下载文件名称
        a.href = e.target.result;
        a.click();
      }
    }
  }
}
