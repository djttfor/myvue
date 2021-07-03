<template>
  <div>
    <el-button type="primary" @click="test1">test</el-button>
    <div>{{user.name}}</div>
    <div>{{user.age}}</div>
  </div>
</template>

<script>
import { test1, test2 } from '@/api/user'
import Cookies from 'js-cookie'
import { dateFormat, vueChatJsonToMap, vueChatMapToJson } from '@/utils/i-util'
export default {
  name: 'Index',
  data(){
    return{
      show:false,
      user: {},
    }
  },
  methods:{
    test1(){
      this.$store.dispatch('vueChat/rawConnect')
    },
    parse(user){
      let values = Object.values(user)
      return values[0]+','+values[1]
    },
  },
  created() {

  }
}
</script>

<style scoped>

</style>
