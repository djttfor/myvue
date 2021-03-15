<template>
<div>
  <Header :name="names.h_name" :keys="keys" @bbb="bbb"></Header>
  <MyContent :name="names.content_name"></MyContent>
  <Footer :name="names.footer_name"></Footer>
</div>
</template>

<script>
export default {
  name: "bt",
  data(){
    return {
      names:{h_name:'h1',content_name:'cn1',footer_name:'f1'},
      keys:[
        {k:'u',v:'1'},
        {k:'v',v:'2'},
        {k:'w',v:'3'}
      ]
    }
  },
  methods:{
    bbb(str,str2){
      this.names.h_name=str;
      this.names.content_name = str2;
    }
  }
}
</script>

<style scoped>

</style>
