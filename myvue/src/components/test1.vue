<template>
  <div id="app">
    <button @click="getData">Post单参数</button>
    <button @click="getData2">Post发对象</button>
    <button @click="getData3">Post发数组</button>
    <button @click="getData4">Post发数组2</button>
    <button @click="getData5">Post发对象</button><br>
    <button @click="getData6">Post发数组2</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "test1",
  data(){
    return {
      t1: "5",
      t2: {code:"123",message:"123"},
      t3:["name","pass","age"],
      t4:[
        {
          "username": "jimmy",
          "password": "123",
          "phone": "123",
          "address": "beijing",
          "accountList": [
            {
              "accountName": "45566"
            }
          ]
        },
        {
          "username": "jimmy",
          "password": "123"
        },
        {
          "username": "jimmy",
          "password": "123"
        }
      ],
      t5: {
          "username": "jimmy",
          "password": "123",
          "phone": "123",
          "address": "beijing",
          "account":{
            username:"jimmy",
            password:"123"
          },
          "accountList": [
            {
              "accountName": "45566"
            }
          ]
        },
      t6:{
        "username": "jimmy",
        "password": "123",
      }
    }
  },
  methods:{
    getData6(){
      this.axios.post(
        'http://localhost:8086/ssx/user/home12',this.t6,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}
      ).then(response=>{
        //alert(Object.values(response.data));
        console.log(response.data)
      }).catch(error=>{
        alert(error);
      });
    },
    getData5(){
      this.axios.post(
        'http://localhost:8086/ssx/user/home11',this.t5
      ).then(response=>{
        alert(Object.values(response.data));
        console.log(response.data)
      }).catch(error=>{
        alert(error);
      });
    },
    getData4(){
      this.axios.post(
        'http://localhost:8086/ssx/user/home10',this.t4
      ).then(response=>{
        //alert(Object.values(response.data));
        console.log(response.data)
      }).catch(error=>{
        alert(error);
      });
    },
    getData3(){
      this.axios.post(
        'http://localhost:8086/ssx/user/home9',this.t3
      ).then(response=>{
        alert(Object.values(response.data));
      }).catch(error=>{
        alert(error);
      });
    },
    getData2(){
      this.axios.post(
        'http://localhost:8086/ssx/user/home6',this.t2
      ).then(response=>{
        alert(Object.values(response.data));
      }).catch(error=>{
        alert(error);
      });
    },
    getData(){
      this.axios.post(
        'http://localhost:8086/ssx/user/home7',{name:this.t1}
      ).then(response=>{
        alert(Object.values(response.data));
      }).catch(error=>{
        alert(error);
      });
    }
  }
}
</script>

<style scoped>

</style>
