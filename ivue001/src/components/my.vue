<template>
  <div>
    <h2>明天去哪里玩好呢</h2>
    {{ $route.params.id + $route.params.ids }}
<!--    <img src="http://localhost:8085/static/images/1.png">-->
    <ul>
      <li v-for="i in 3">
<!--      <img :src="`http://localhost:8085/static/images/${i}.png`">-->
        <el-image
          style="width: 100px; height: 100px"
          :src="`http://localhost:8085/static/images/${i}.png`" ></el-image>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: "my"


}
</script>

<style scoped>

</style>
