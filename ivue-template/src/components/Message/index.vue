<template>
 <div>
   <div style="margin-right: 8px">
     <el-badge :value="unreadMsgCount" :hidden="unreadMsgCount===0"  style="height: 18px">
       <el-tooltip content="聊天信息" effect="dark" placement="bottom">
          <i style="height: 18px;position: relative;top: -15px;" class="el-icon-bell" @click="click"></i>
       </el-tooltip>
     </el-badge>
   </div>
 </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Message',
  data(){
    return{
    }
  },
  methods:{
    click(){
      this.$store.dispatch('vueChat/clearUnreadCount')
      this.$router.replace('/friendChat',true);
    },
    page(){
      document.addEventListener('visibilitychange', function() {
        // 页面变为不可见时触发
        if (document.visibilityState === 'hidden') {
          document.title = '离开';
        }
        // 页面变为可见时触发
        if (document.visibilityState === 'visible') {
          document.title = '回来';
        }
      });
       // 页面的 hidden属性,false,true;
      document.addEventListener('visibilitychange',function(){
        var isHidden = document.hidden;
        if(isHidden){
          document.title = '离开';
        } else {
          document.title = '回来';
        }
      });
    }

  },
  computed: {
    ...mapState({
      unreadMsgCount: state =>state.vueChat.unreadMsgCount
    })
  },
  created() {
    //this.$store.dispatch('vueChat/incrUnreadCount',1)
   // alert(this.$store.state.vueChat.unreadMsgCount)
    console.log(this.$route.path)
    this.page()
  }

}
</script>

<style scoped>

</style>
