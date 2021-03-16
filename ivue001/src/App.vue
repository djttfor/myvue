<template>
  <div id="app" >
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeRouteEnter(to,from,next){//进入路由前
    next(vm => {
      this.$router.push("/login");
    });
  },
}
</script>

<style>
</style>
