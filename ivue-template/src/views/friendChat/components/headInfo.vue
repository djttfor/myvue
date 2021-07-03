<template>
  <div id="hInfo">
    <div id="hContent">{{currentUsername}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { generateSessionKey } from '@/utils/i-util'

export default {
  name: 'headInfo',
  data(){
    return{
      currentUsername:''
    }
  },
  computed:{
    ...mapState({
      currentSessionId: state => state.vueChat.currentSessionId,
      friendList: state => state.vueChat.friendList,
    })
  },
  methods:{
    getCurrentUserName(){
      if(this.friendList && this.friendList.length>0){
        this.currentUsername = this.friendList[this.currentSessionId].name
      }else{
        this.currentUsername = '系统消息'
      }
    }
  },
  watch:{
    currentSessionId :{
      handler: function (){
        this.getCurrentUserName()
      }
    }
  },
  created() {
    this.getCurrentUserName()
  }
}
</script>

<style scoped>
#hInfo{
  height: 40px;
  background-color: #2e3238;
  color: #eee;
  text-align: center;
}
#hContent{
  line-height: 40px;
}
</style>
