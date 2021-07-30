<template>
  <div class="single-reward">
    <div class="reward-open">
      <p>赏</p>
      <div class="reward-main">
        <ul class="reward-row">
          <li v-for="(item, index) in list" :key="index">
            <img :src="item.content" alt="" />
            <p>{{ item.remark }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
};
</script>

<style lang="less" scoped>
.single-reward {
  position: relative;
  width: 100%;
  margin: 35px auto;
  text-align: center;
  z-index: 90;
  .reward-open {
    position: relative;
    width: 40px;
    height: 40px;
    font-size: 18px;
    padding: 7px;
    color: #fff;
    text-align: center;
    display: inline-block;
    border-radius: 100%;
    background: #d34836;
    cursor: pointer;
  }
  .reward-open:hover .reward-main {
    display: block;
  }
  .reward-main {
    position: absolute;
    top: 40px;
    left: -157px;
    margin: 0;
    padding: 15px 0 0;
    width: 355px;
    background: 0 0;
    display: none;
    animation: main 0.4s;
  }
  .reward-row {
    list-style: disc;
    border: 1px dashed #e4e4e4;
    margin: 0 auto;
    padding: 20px 15px 10px;
    background: #f5f5f5;
    display: inline-block;
    border-radius: 4px;
    cursor: auto;
    li {
      list-style-type: none;
      padding: 0 12px;
      display: inline-block;
      img {
        width: 130px;
        max-width: 130px;
        border-radius: 3px;
        position: relative;
      }
      p {
        color: #666666;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
@keyframes main {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>