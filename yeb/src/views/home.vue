<template>
  <div>
    <el-container>
<!--  ###########################侧边栏#########################    -->
      <el-aside width="200px">
        <el-menu router unique-opened>
          <el-submenu :index="index+''"
                      v-for="(item,index) in routes" :key="index"
                      v-if="!item.hidden"
          >
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="children.path"
                            v-for="(children,j) in item.children" :key="j">
                {{children.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--  ###########################侧边栏#########################    -->

      <el-container>
        <el-header>Header</el-header>

        <el-main><router-view/></el-main>

        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed:{
    routes(){
      return this.$store.state.routes;
    }
  }
}
</script>

<style scoped>

</style>
