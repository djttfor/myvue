<template>
  <div>
    <el-tabs v-model="activeName" type="border-card" style="margin-left: 20px" @tab-click="handleClick">
      <el-tab-pane label="部门管理" name="first"><dept-mana /></el-tab-pane>
      <el-tab-pane label="职位管理" name="second"><pos-mana /></el-tab-pane>
      <el-tab-pane label="职称管理" name="third"><title-mana /></el-tab-pane>
      <el-tab-pane label="奖惩规则" name="fourth"><ec-mana /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DeptMana from '@/views/sys/sysBasic/components/DeptMana'
import EcMana from '@/views/sys/sysBasic/components/EcMana'
import PosMana from '@/views/sys/sysBasic/components/PosMana'
import TitleMana from '@/views/sys/sysBasic/components/TitleMana'

export default {
  name: 'SysBasic',
  components: { TitleMana, PosMana, EcMana, DeptMana },
  data() {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>

</style>
