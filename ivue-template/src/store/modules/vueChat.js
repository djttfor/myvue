import { getAll } from '@/api/admin'
import store from '@/store'
import SockJs from 'sockjs-client'
import Stomp from 'stompjs'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import { generateSessionKey, jsonToMap, mapToJson, vueChatJsonToMap, vueChatMapToJson } from '@/utils/i-util'

const state = {
    messageMap: null,//聊天记录
    friendList: [],//好友列表
    currentSessionId:0,//当前选中的列id
    content: '',//正在聊天时输入的内容
    client: null,//websocket连接
    unreadMsgCount: 0
}

const mutations = {
  //当前的消息内容
  setContent(state,content){
    state.content = content
  },
  //变更选中的好友
  changeCurrentSessionId (state,id) {
    state.currentSessionId = id;
  },
  //添加聊天记录
  addMessage (state,msg) {
    //获取选中的好友的id
    let friendId = state.friendList[state.currentSessionId].id
    //根据自己的id与好友id生成会话id
    processMsg(store.getters.userId,friendId,msg)
  },
  INIT_DATA(state) {
    return new Promise( async resolve => {
      let messageMap = localStorage.getItem('vue-chat-messageMap');
      let userList = localStorage.getItem('vue-chat-userList')

      //聊天记录
      if (messageMap) {
        state.messageMap = vueChatJsonToMap(messageMap);
      } else {
        state.messageMap = new Map()
      }
      initUserList(userList)
    })

  },
  SET_CLIENT(state,client){
    state.client = client
  },
  INCR_UNREAD_MSG_COUNT(state,num){
    state.unreadMsgCount += num
  },
  CLEAR_UNREAD_COUNT(state){
    state.unreadMsgCount = 0
  }
}
//初始化好友列表
function initUserList(userList) {
  if (userList) {
    let friendList = JSON.parse(userList)
    //去掉本人
    removeI(friendList)
    state.friendList = friendList
  } else {
    getFriendList()
  }
}

//模拟获取所有好友
function getFriendList(){
  return new Promise(resolve => {
    if(state.friendList && state.friendList.length>0){
      resolve(state.friendList)
    }else{
      getAll().then(resp=>{
        let data = resp.result
        data.forEach(v=>{
          let user = {}
          user.id = v.id
          user.name = v.name
          user.img = v.userFace
          state.friendList.push(user)
        })
        let systemUser = {id:'-2',name: '系统消息',img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=935013698,916621718&fm=26&gp=0.jpg'}
        state.friendList.unshift(systemUser)
        localStorage.setItem('vue-chat-userList',JSON.stringify(state.friendList))
        removeI(state.friendList)
        resolve(state.friendList)
      })
    }

  })

}
//去除本人
function removeI(userList){
  userList.forEach((v,i)=>{
    if(v.id===store.getters.userId){
      userList.splice(i,1)
    }
  })
}
//消息处理
function processMsg(uid,fid,msg){
  uid = uid +''
  fid = fid +''
  if(!state.messageMap || !state.messageMap instanceof Map){
    state.messageMap = new Map()
  }
  let sessionMap = state.messageMap.get(uid)
  if(sessionMap){
    let session  = sessionMap.get(fid)
    if(session){
      session.push(msg)
    }else{
      session = []
      session.push(msg)
    }
    sessionMap.set(fid,session)
  }else{
    sessionMap = new Map()
    let newSession = []
    newSession.push(msg)
    sessionMap.set(fid,newSession)
  }
  state.messageMap.set(uid,sessionMap)
  localStorage.setItem('vue-chat-messageMap',vueChatMapToJson(state.messageMap))
}

const actions = {
  //sockJs方式连接websocket
  initData (context) {
    context.commit('INIT_DATA')
  },
  incrUnreadCount(context,num){
    context.commit('INCR_UNREAD_MSG_COUNT',num)
  },
  clearUnreadCount(context){
    context.commit('CLEAR_UNREAD_COUNT')
  },

  //原生方式连接websocket
  rawConnect({commit,state}){
    let client = new WebSocket(`ws://localhost:81/rawChat/${store.getters.userId}/${'Bearer' + getToken()}`)
    commit('SET_CLIENT',client)
    //绑定事件
    client.onopen = function() {
      console.log("正在连接")
    }
    client.onmessage = function(e){
      let data = {}
      if(e.data){
        data = JSON.parse(e.data)
        commit('INCR_UNREAD_MSG_COUNT',1)
        //系统消息
        if(data.sysFlag){
          console.log(data)
          processMsg(store.getters.userId,'-2',data)
        }else{//好友消息
          console.log(data)
          processMsg(store.getters.userId,data.fromId,data)
        }
      }
    }
    client.onclose = function(){

    }
    client.onerror = function() {
      console.log("连接异常")
    }

  },
  disconnectRaw({state}){
    if (state.client) {
      state.client.close();
    }
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
