<template>
  <div id="message" >
<!--    <el-input type="text" v-model="currentSessionId"></el-input>-->
  	<ul v-if="currentSessionId===i" v-for="(item,i) in friendList">
  		<li v-for="entry in session">
  			<p class="time">
  				<span>{{entry.date | time}}</span>
  			</p>
  			<div class="main" :class="{self:entry.fromId===user.id}"><!--    main往左，self往右    -->
  				<img class="avatar" :src="entry.fromId===user.id ? user.img : item.img" alt="">
  				<p class="text">{{entry.content}}</p>
  			</div>
  		</li>
  	</ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { generateSessionKey, vueChatMapToJson } from '@/utils/i-util'

export default {
  name: 'message',
  data () {
    return {
      user: {},
      test1: '',
      session: []
    }
  },
  computed: {
    ...mapState({
      friendList: state => state.vueChat.friendList,
      currentSessionId: state => state.vueChat.currentSessionId,
      content: state => state.vueChat.content,
      name: state => state.user.name,
      avatar: state => state.user.avatar,
      id: state => state.user.id
  })
  },
  filters:{
  	time (date) {
  	  let dateTemp = new Date(date)
      let hours = dateTemp.getHours()+''
      let minutes = dateTemp.getMinutes()+''
      let seconds = dateTemp.getSeconds()+''
      let day = dateTemp.getDate()+''
      let month = (dateTemp.getMonth()+1)+''
      let fullYear = dateTemp.getFullYear()+''
      hours = hours.length<2?'0'+hours:hours
      minutes = minutes.length<2?'0'+minutes:minutes
      seconds = seconds.length<2?'0'+seconds:seconds
      day = day.length<2?'0'+day:day
      month = month.length<2?'0'+month:month
      return `${fullYear+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds}`;
  	},
  },
  watch:{
    currentSessionId:{
      handler: function (){
        this.getSession()
      },
      deep: true
    },
    content:{
      handler: function (){
        this.getSession()
      },
      deep: true
    }
  },
  methods:{
    getUser(){
      this.user = {
        id: this.id,
        name: this.name,
        img: this.avatar
      }
    },
    getSession(){
      if(this.currentSessionId!==-1 && this.$store.state.vueChat.messageMap && this.$store.state.vueChat.friendList.length>0){
        let friendId = this.$store.state.vueChat.friendList[this.currentSessionId].id
        let messageMap = this.$store.state.vueChat.messageMap
        // console.log('message:')
        // console.log(vueChatMapToJson(messageMap))
        if(messageMap && messageMap instanceof Map){
          let sessionMap = messageMap.get(this.user.id+'')
          if(sessionMap){
            this.session = sessionMap.get(friendId+'')
          }
        }
      }
    }
  },
  created() {
    this.getUser()
    this.getSession()
  },
  updated() {
    //发消息时滚动条滚到最底下
    var ele = document.getElementById('message')
    ele.scrollTop = ele.scrollHeight
  }
}
</script>

<style lang="scss" scoped>
#message {
	padding: 15px;
  max-height: 68%;
  overflow-y: scroll;
  ul {
  	list-style-type: none;
  	li {
  		margin-bottom: 15px;
  	}
  }
  .time {
  	text-align: center;
  	margin: 7px 0;
  	> span {
  		display: inline-block;
  		padding: 0 18px;
  		font-size: 12px;
  		color: #FFF;
  		background-color: #dcdcdc;
  		border-radius: 2px;
  	}
  }
  .main {
  	.avatar {
  		float: left;
  		margin: 0 10px 0 0;
  		border-radius: 3px;
  		width: 30px;
  		height: 30px;

  	}
  	.text {
  		display: inline-block;
  		padding: 0 10px;
  		max-width: 80%;
  		background-color: #fafafa;
      border-radius: 4px;
      line-height: 30px;
      word-wrap:break-word;
      word-break:break-all;
      overflow: hidden;
  	}
  }
  .self {
    text-align: right;
    .avatar {
      float: right;
      margin: 0 0 0 10px;
      border-radius: 3px;
      width: 30px;
      height: 30px;
    }
    .text {
      display: inline-block;
      padding: 0 10px;
      max-width: 80%;
      background-color: #b2e281;
      border-radius: 4px;
      line-height: 30px;
      word-wrap:break-word;
      word-break:break-all;
      overflow: hidden;
    }
  }
}
</style>
