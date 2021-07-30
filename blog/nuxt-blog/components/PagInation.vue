<template>
  <div class="page-wrapper">
    <p v-if="finished">很高兴你翻到这里，但是真的没有了...</p>
    <div class="example" v-if="!finished && loading">
      <a-spin size="large" />
    </div>
    <div v-if="!finished && !loading" class="btn" @click="nextList(page, id)">
      Previous
    </div>
  </div>
</template>

<script>
export default {
  props: {
    finished: Boolean,
    loading: Boolean,
    page: Number,
    id: Number | String,
    nextList: Function,
  },
};
</script>

<style lang="less" scoped>
.page-wrapper {
  width: 100%;
  padding: 20px 0;
  height: 92px;
  text-align: center;
  margin: 40px 0 80px;
  display: inline-block;
  @media (max-width: 768px) {
    margin: 0;
  }
  .btn {
    display: inline-block;
    cursor: data-uri("../assets/images/ayuda.cur"), auto;
    padding: 13px 35px;
    border: 1px solid #d6d6d6;
    border-radius: 50px;
    color: #adadad;
  }
  @media (min-width: 768px) {
    .btn:hover {
      border: 1px solid orange;
      color: #fe9600;
      border-color: #fe9600;
      box-shadow: 0 0 4px rgba(255, 165, 0, 0.85);
    }
  }
  p {
    color: #989898;
    font-size: 15px;
  }
  .example {
    height: 52px;
    line-height: 52px;
    i {
      background-color: #fe9600;
    }
  }
}
</style>