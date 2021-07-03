<template>
  <div id="list" style="overflow-y: scroll;" >
  	<ul style="padding-left: 0">
  		<li v-for="(item,i) in friendList" :class="{ active: i === currentSessionId }" @click="changeCurrentSessionId(i)"><!--   :class="[item.id === currentSessionId ? 'active':'']" -->
  			<img class="avatar" :src="item.img" :alt="item.name">
  			<p class="name">{{item.name}}</p>
<!--        <div style="float: right;position: relative;top: 21px">-->
<!--          <el-badge :value="1"-->
<!--                    :max="99"-->
<!--          >-->
<!--          </el-badge>-->
<!--        </div>-->
  		</li>
  	</ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { initAml } from '@/store/modules/vueChat'
import {mapToJson} from '@/utils/i-util'

export default {
  name: 'list',
  data () {
    return {
      msgMap:null,
    }
  },
  computed: mapState({
    msgAlertMap: state => state.vueChat.msgAlertMap,
    friendList: state => state.vueChat.friendList,
    currentSessionId : state => state.vueChat.currentSessionId
  }),
  methods:{
    mapToJson(map){
      return mapToJson(map)
    },
  	changeCurrentSessionId:function (id) {
  		this.$store.commit('vueChat/changeCurrentSessionId',id)
  	},
  	hiddenMessageCount(item,flag,itemId){
  	  if(flag){
  	   item.set(itemId,0)
      }
  	  return item.get(itemId) === 0
    },

  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
#list {
	li {
		padding: 8px 15px;
		border-bottom: 1px solid #292C33;
		cursor: pointer;
		&:hover {
			background-color: rgba(255, 255, 255, 0.03);
		}
	}
  li.active {/*注意这个是.不是冒号:*/
			background-color: rgba(255, 255, 255, 0.1);
	}
	.avatar {
		border-radius: 2px;
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}
	.name {
		display: inline-block;
		margin-left: 15px;
    margin-right: 15px;
	}
  .item-hint{
    position: relative;
    top: 6px;
    right: -18px;
  }
}
</style>
