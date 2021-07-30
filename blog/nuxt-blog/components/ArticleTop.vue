<template>
  <div class="article-wapper">
    <div class="pattern-center-blank" />
    <div class="article-top">
      <div class="pattern-attachment-img">
        <img class="lazyload" :src="img" alt="" />
      </div>
      <div class="pattern-header">
        <h1>{{ name }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    img: String,
  },
};
</script>

<style lang="less" scoped>
.article-wapper {
  .pattern-center-blank {
    padding-top: 75px;
    background-color: #fff;
  }
  @media (max-width: 768px) {
    .pattern-center-blank {
      padding-top: 50px;
    }
  }
}
.article-top {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  &:after {
    content: "";
    width: 150%;
    height: 4.375rem;
    background: #fff;
    left: -25%;
    bottom: -2.875rem;
    border-radius: 100%;
    position: absolute;
  }
  .pattern-attachment-img {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-origin: border-box;
    width: 100%;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
  }
  .pattern-header {
    position: absolute;
    top: 45%;
    left: 0;
    right: 0;
    text-align: center;
    color: #fff;
    z-index: 1;
    h1 {
      color: #fff;
      font-size: 40px;
      font-weight: 500;
      width: 80%;
      margin: auto;
      padding: 0;
      border: 0;
    }
  }
  @media (max-width: 768px) {
    .pattern-attachment-img {
      height: 280px;
    }
    .pattern-header {
      top: 40%;
      h1 {
        font-size: 24px;
      }
    }
  }
}
</style>