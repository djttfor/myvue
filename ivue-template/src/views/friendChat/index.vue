<template>
  <div id="app">
    <div class="sidebar">
      <card class="card"></card>
      <list class="list"></list>
    </div>

    <div class="main">
      <head-info/>
      <message></message>
      <usertext></usertext>
    </div>
  </div>
</template>

<script>
import card from './components/card.vue'
import list from './components/list.vue'
import message from './components/message.vue'
import usertext from './components/usertext.vue'
import headInfo from '@/views/friendChat/components/headInfo'
import store from '@/store'

export default {
  name: 'friendChat',
  data(){
    return{
      isShow: false
    }
  },
  created() {
    store.dispatch('vueChat/initData')
  },
  components:{
    card,
    list,
    message,
    usertext,
    headInfo
  }
}
</script>

<style lang="scss" scoped>
    #app {
      margin: 20px auto;
      width: 820px;
      height: 600px;
      overflow: hidden;
      //border-radius: 10px;
    .sidebar, .main {
      height: 100%;
    }
    .sidebar {
      float: left;
      color: #f4f4f4;
      background-color: #2e3238;
      width: 200px;
    }

    .list {
      overflow-y: scroll;
      height: 500px;
    }
    .card {
      height: 120px;
    }
    .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
    }

}
</style>
