<template>
  <div id="card">
  	<header>
  		<img class="avatar" :src="user.img" :alt="user.name">
  		<p class="name">{{user.name}}</p>
  	</header>
  	<footer>
  		<input class="search" type="text" style="display: inline-block;width: 170px" placeholder="姓名搜索">
  	</footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'card',
  data () {
    return {
      user: {
      	name: '',
      	img: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  created() {
    this.getUser()
  },
  methods:{
    getUser(){
      this.user = {
        name: this.name,
        img: this.avatar
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#card {
	padding: 12px;
  .avatar{
  	width: 40px;
  	height: 40px;
  	vertical-align: middle;/*这个是图片和文字居中对齐*/
  }
  .name {
  	display: inline-block;
  	padding: 10px;
  	margin-bottom: 15px;
  	font-size: 16px;
  }
  .search {
  	background: #26292E;
  	height: 30px;
  	line-height: 30px;
  	padding: 0 10px;
  	border: 1px solid #3a3a3a;
  	border-radius: 4px;
  	outline: none;/*鼠标点击后不会出现蓝色边框*/
    color: #FFF;
  }
}
</style>
