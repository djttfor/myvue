<template>
  <div id="app">
    <div id="container">
      <userList></userList>
    </div>
  </div>
</template>

<script>
import userList from '@/views/friendChat2/components/aside'
import sendArea from '@/views/friendChat2/components/footer'
import infoArea from '@/views/friendChat2/components/header'
import messageArea from '@/views/friendChat2/components/main'
export default {
  name: 'friendChat',
  components:{
    userList,sendArea,infoArea,messageArea
  }
}
</script>

<style scoped>

#container{
  width: 800px;
  height: 600px;
  border: 1px red solid;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
