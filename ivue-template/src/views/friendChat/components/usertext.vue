<template>
  <div>
    <div id="uesrtext" :class="{'notClick' : currentSessionId===-1}">
      <textarea
        placeholder="请输入消息"
        v-model="content"
        @keyup.enter.exact="addMessage"
        @keyup.ctrl.enter="lineFeed"
      ></textarea>
      <div >
        <el-tooltip
          class="item"
          effect="dark"
          content="不能发送空白消息"
          placement="top-end"
          v-model="showHintMessage"
          :manual="true"
        >
          <el-button size="small" id="btn" @click="addMessage" >发送</el-button>
        </el-tooltip>
      </div>
    </div>

  </div>

</template>

<script>
import {mapState} from 'vuex'
import { isString } from '@/utils/validate'
import { dateFormat } from '@/utils/i-util'

export default {
  name: 'uesrtext',
  data () {
    return {
      content:'',
      showHintMessage: false
    }
  },
  computed:{
    ...mapState({
      currentSessionId: state => state.vueChat.currentSessionId,
      friendList: state => state.vueChat.friendList,
      name: state => state.user.name,
      userId: state => state.user.id,
    })
  },
  methods: {
    test(){
      alert(this.currentSessionId)
    },
  	async addMessage() {
      if (this.content && this.content !== '\n') {
        //去除首尾的换行
        this.content = this.content.replace(/[\r\n]/g, '')
        //定义消息
        let msg = this.generateMsg(this.content)
        //设置当前消息
        this.$store.commit('vueChat/setContent',this.content)
        //清空输入框的消息
        this.content = ''
        //添加消息
        this.$store.commit('vueChat/addMessage', msg)
        //发送消息给好友
        let client = this.$store.state.vueChat.client
        client.send(JSON.stringify(msg))
      } else {
        this.content = ''
        let that = this;
        that.showHintMessage = true
        setTimeout(function() {
          that.showHintMessage = false
        }, 1000)
      }
    },
    lineFeed () {
      this.content = this.content + '\n'
    },
    generateMsg(content){
      let msg = {}
      msg.isSysMsg = false
      msg.fromId = this.userId
      msg.toId = this.friendList[this.currentSessionId].id
      //msg.to = this.friendList[this.currentSessionId].name
      msg.date = dateFormat(new Date)
      msg.content = content
      return msg
    }
  }
}
</script>

<style lang="scss" scoped>
#uesrtext {
  background-color: #FFFFFF;
	position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border: solid 1px #2E3238;
  > textarea {
  	padding: 10px;
  	width: 100%;
  	height: 70%;
  	border: none;
  	outline: none;
  }
  > div {
    margin: 0;
    height: 50px;
    text-align: right;
  }
}
#btn {
  margin-top: 10px;
  margin-right: 30px;
}
.notClick{
  pointer-events: none;
}
</style>
