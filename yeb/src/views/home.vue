<template>
  <div id="main">
    <el-container>
      <!--  ###########################侧边栏#########################    -->
        <div id="div-aside" :style="{height: asideDivH+'px','background-color': '#545c64'}">
          <el-aside width="200px" >
          <el-menu
            router unique-opened
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu :index="index+''"
                        v-for="(item,index) in routes" :key="index"
                        v-if="!item.hidden"
            >
              <template slot="title">
                <i :class="item.iconCls" style="color: #efe9e9"></i>
                <span style="color: #efe9e9">{{ item.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="children.path"
                              v-for="(children,j) in item.children" :key="j">
                  {{ children.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>

        </el-aside>
        </div>
        <!--  ###########################侧边栏#########################    -->
        <el-container>
          <el-header style="text-align: right" class="head">
            <div style="float: left ;font-size: 20px;color: lightpink"><span>The deep dark fantasy</span></div>
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>Header</span>
          </el-header>
          <el-main>
           <div>
<!--             <RightPanel>-->
<!--             </RightPanel>-->
             <router-view/>
           </div>
          </el-main>
          <el-footer style="border: 1px red solid">Footer</el-footer>
        </el-container>

    </el-container>
  </div>
</template>

<script>
import {initMenu} from "../utils/menus";
import RightPanel from '@/components/RightPanel'


export default {
  name: "Home",
  components: {RightPanel},
  data(){
    return{
      asideDivH:'',
      numb:0
    }
  },
  computed: {
    routes() {
      return this.$store.getters.routes;
    },
  },
  created() {
    this.asideDivH = document.documentElement.clientHeight;
    initMenu()

  },
  mounted(){
    //
  },
  methods:{

  }
}
</script>

<style scoped>
.head {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}


</style>
