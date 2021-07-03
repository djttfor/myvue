import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})


// store.watch(function (state,getters) {
//   return getters.sessions
// },function (val) {
//   //console.log('CHANGE: ', val);
//   localStorage.setItem('vue-chat-session', JSON.stringify(val));
// },{
//   deep:true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
// })

export default store
