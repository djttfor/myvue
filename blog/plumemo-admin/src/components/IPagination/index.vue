<template>
  <div>
    <a-pagination
      show-size-changer
      :defaultCurrent="defaultCurrent"
      :defaultPageSize="defaultPageSize"
      :total="total"
      :pageSize.sync="pageSize"
      :current="current"
      :pageSizeOptions="pageSizeOptions"
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>

<script>

export default {
  name:'IPagination',
  components: {
  },
  props: {
    defaultCurrent: {
      type: Number,
      default: 1,
    },
    defaultPageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      require: true,
    },
    pageSizeOptions: {
      default() {
        return ['5','10','20','50']
      },
    },
    pageSize: {
        type: Number,
        default: 10
    },
    current: {
        type: Number,
        default: 1
    }
  },
   watch: {
    pageSize(val) {
      console.log('pageSize', val);
    },
    current(val) {
      console.log('current', val);
    },
  },
  created() {},
  methods: {
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },
  },
}
</script>

<style lang="less" scoped>
</style>
