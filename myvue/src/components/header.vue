<template>
 <div>
   <h1>你的名字是：{{name}}</h1>
   <ul v-if="keys!==null">
     <li v-for="(v,i) in keys">
       {{`key:${v.k},value:${v.v}`}}
     </li>
   </ul>
   <button @click="btn">点我</button>
 </div>
</template>

<script>
export default {
  name: "header",
  props:{
    name:{type:String,required:true,default:"今晚打老虎"},
    keys:{type:Array,required:false,default:{}}
  },
  methods:{
    btn(){
      this.$emit("bbb",this.dw,this.dw1);
    }
  },
  data(){
    return {
      dw:'我们都有光明的未来',
      dw1:'我们都有美好的明天'
    }
  }
}
</script>

<style scoped>

</style>
