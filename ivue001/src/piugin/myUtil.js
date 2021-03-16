import Vue from 'vue'


export default ({

  install(Vue,options) {
    Vue.prototype.open1 = function (msg) {
      Vue.prototype.$message({
        showClose: true,
        message: msg,
        type: 'warning'
      });
    }
  }
})
