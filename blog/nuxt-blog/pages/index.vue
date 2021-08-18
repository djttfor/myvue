<template>
  <div class="container">
    <!-- banner -->
    <!-- 波浪特效 -->
    <div class="banner-wrapper">
      <div class="waveWrapper waveAnimation">
        <div class="waveWrapperInner bgTop">
          <div class="wave waveTop" />
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div class="wave waveMiddle" />
        </div>
        <div class="waveWrapperInner bgBottom">
          <div class="wave waveBottom" />
        </div>
      </div>

      <!-- 浮动的箭头 -->
      <div class="headertop-down animated">
        <span @click="handletopDown">
          <i class="iconfont icon-chevrondown" />
        </span>
      </div>

      <!-- 首页的背景图片 -->
      <div
        class="center"
        :style="{ backgroundImage: banner, height: innerHeight + 'px' }"
      >
        <div class="focusinfo">
          <div class="header-tou">
            <img :src="userInfo.avatar" alt="" />
            <!-- <img :src="require('../assets/images/list_01.png')" alt="" /> -->
          </div>
          <h1 class="glitch" data-text="HELLO WORLD!">HELLO WORLD!</h1>
          <div class="header-info">
            <p class="ellipsis">
              <i class="iconfont icon-quote-left" />
              <span>{{
                userInfo.introduction || "THE DEEP DARK FANTASY♂"
              }}</span>
              <i class="iconfont icon-quoteright" />
            </p>

            <div class="top-social_v2">
              <li @click="getBanner">
                <img class="flipx" src="../assets/images/next-b.svg" alt="" />
              </li>
              <li
                :class="{
                  img: item.showType === 1,
                  text: item.showType === 2,
                  link: item.showType === 3,
                }"
                v-for="(item, index) in socialList"
                :key="index"
              >
                <img :src="item.icon" alt="" v-if="item.showType === 1" />
                <div
                  class="img-box"
                  style="pointer-events: none"
                  v-if="item.showType === 1"
                >
                  <img :src="item.content" alt="" />
                </div>
                <img :src="item.icon" alt="" v-if="item.showType === 2" />
                <div
                  class="text-box"
                  style="pointer-events: none"
                  v-if="item.showType === 2"
                >
                  <p>{{ item.content }}</p>
                </div>
                <a-tooltip placement="bottom">
                  <template slot="title">
                    <span>{{item.remark}}</span>
                  </template>
                  <a
                    :href="item.content"
                    target="_blank"
                    v-if="item.showType === 3"
                  >
                    <img :src="item.icon" alt="" />
                  </a>
                </a-tooltip>
              </li>

              <li @click="getBanner">
                <img src="../assets/images/next-b.svg" alt="" />
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- banner-end -->
    <!-- 内容区域 -->
    <div id="indexContent">
      <!-- 推荐 -->
      <div class="feature-wrapper">
        <div class="feature-title">
          <h1><i class="iconfont icon-anchor" /><span> START:DASH!!</span></h1>
        </div>
        <a-row class="top-feature-row" :gutter="16">
          <a-col
            v-for="(item, index) in featureList"
            :key="index"
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            :xl="8"
          >
            <div class="top-feature-item">
              <nuxt-link :to="{ name: 'article-id', params: { id: item.id } }">
                <div class="img-box">
                  <img
                    :src="item.thumbnail || ListImg[randomImgNum[index]].img"
                    alt=""
                  />
                </div>
                <div class="info">
                  <h3 class="ellipsis">{{ item.title }}</h3>
                  <p class="ellipsis-two">{{ item.summary }}</p>
                </div>
              </nuxt-link>
            </div>
          </a-col>
        </a-row>
      </div>
      <!-- 推荐-end -->
      <!-- 首页列表 -->
      <div class="home-list">
        <div class="feature-title">
          <h1><i class="iconfont icon-anchor" /><span> Discovery</span></h1>
        </div>
        <div class="blog-list">
          <HomeList
            v-for="(item, index) in blogList"
            :key="index"
            :className="className[index % className.length]"
            :id="item.id"
            :thumbnail="item.thumbnail"
            :createTime="getTime(item.createTime)"
            :title="item.title"
            :views="item.views"
            :comments="item.comments"
            :categoryName="item.categoryName || ''"
            :summary="item.summary"
          />
        </div>
        <PagInation
          :page="page"
          :finished="blogList.length > 0 ? finished : true"
          :loading="loading"
          :nextList="nextBlogList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getrand,
  getRandomNumArr,
  scrollAnimation,
  getTime,
} from "../lib/public";
import HomeList from "../components/HomeList";
import PagInation from "../components/PagInation";
export default {
  components: {
    HomeList,
    PagInation,
  },
  async asyncData({ store, error }) {
    const banner = store.state.bannerList;
    const num = getrand(0, banner.length - 1);
    const [socialList, featureList, blogList] = await Promise.allSettled([
      store.dispatch("getSocial"),
      store.dispatch("getFeature"),
      store.dispatch("getBlogList", { page: 1 }),
    ]);
    if (
      socialList.status === "fulfilled" &&
      featureList.status === "fulfilled" &&
      blogList.status === "fulfilled"
    ) {
      let list = blogList.value.models;
      const ListImg = store.state.ListImg;
      for (let i = 0; i < list.length; i++) {
        list[i].thumbnail =
          list[i].thumbnail || ListImg[getrand(0, ListImg.length - 1)].img;
      }
      //修复页面高度变化时，推荐列表的图片也变化的问题
      let randomImgNum = [];
      randomImgNum = getRandomNumArr(0, ListImg.length - 1, 3);
      return {
        banner: `url('${banner[num].img}')`,
        socialList: socialList.value.models,
        featureList: featureList.value.models,
        blogList: list,
        randomImgNum: randomImgNum,
      };
    }
    error({ statusCode: 504 });
  },
  data() {
    return {
      banner: "",
      innerHeight: "",
      className: [
        "blog-item post-list-show left",
        "blog-item post-list-show right",
      ],
      page: 2, //默认加载了一次所以为第二页
      finished: false,
      loading: false,
    };
  },
  computed: {
    ...mapState(["userInfo", "bannerList", "ListImg"]),
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.changeInnerHeight);
  },
  mounted() {
    this.innerHeight = window.innerHeight;
    window.addEventListener("resize", this.changeInnerHeight);
  },
  methods: {
    //获取窗口高度
    changeInnerHeight() {
      this.innerHeight = window.innerHeight;
    },
    //向下滚动
    handletopDown() {
      const content = document.getElementById("indexContent").offsetTop;
      scrollAnimation(0, content);
    },
    getTime(createTime) {
      return getTime(createTime);
    },
    getrand(m, n) {
      return getrand(m, n);
    },
    // 切换banner
    getBanner() {
      const banner = this.bannerList;
      const num = getrand(0, banner.length - 1);
      this.banner = `url('${banner[num].img}')`;
    },
    //加载下一页
    async nextBlogList(page) {
      this.loading = true;
      const res = await this.$store.dispatch("getBlogList", { page });
      if (res.success === 1) {
        let current = res.pageInfo.page * res.pageInfo.size;
        let total = res.pageInfo.total;
        let list = res.models;
        for (let i = 0; i < list.length; i++) {
          list[i].thumbnail =
            list[i].thumbnail ||
            this.ListImg[getrand(0, this.ListImg.length - 1)].img;
        }
        this.page = page + 1;
        this.blogList = this.blogList.concat(list);
        this.loading = false;
        if (current > total) this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.banner-wrapper {
  position: relative;
  overflow: hidden;
  height: auto;
  @media (max-width: 768px) {
    display: none;
  }

  // 插入背景图片
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    background-attachment: fixed;
    background-image: url("../assets/images/grid.png");
  }

  @keyframes move_wave {
    0% {
      transform: translateX(0) translateZ(0) scaleY(1);
    }

    50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.55);
    }

    100% {
      transform: translateX(-50%) translateZ(0) scaleY(1);
    }
  }

  .waveWrapper {
    overflow: hidden;
    // position: absolute;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // top: 0;
    //margin: auto;
  }

  .waveWrapperInner {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    bottom: -1px;
  }

  .bgTop {
    z-index: 15;
    opacity: 0.5;
  }

  .bgMiddle {
    z-index: 10;
    opacity: 0.75;
  }

  .bgBottom {
    z-index: 5;
  }

  .wave {
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat-x;
    background-position: 0 bottom;
    transform-origin: center bottom;
  }

  .waveTop {
    background-size: 50% 100px;
  }

  .waveAnimation .waveTop {
    animation: move-wave 3s;
    -webkit-animation: move-wave 3s;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }

  .waveMiddle {
    background-size: 50% 120px;
  }

  .waveAnimation .waveMiddle {
    animation: move_wave 10s linear infinite;
  }

  .waveBottom {
    background-size: 50% 100px;
  }

  .waveAnimation .waveBottom {
    animation: move_wave 15s linear infinite;
  }

  .waveTop {
    background-image: url("../assets/images/wave-top.png");
  }

  .waveMiddle {
    background-image: url("../assets/images/wave-mid.png");
  }

  .waveBottom {
    background-image: url("../assets/images/wave-bot.png");
  }

  .headertop-down {
    position: absolute;
    bottom: 80px;
    left: 49%;
    cursor: pointer;
    z-index: 90;
    animation: float 2s linear infinite;

    i {
      font-size: 32px;
      color: #fff;
      -ms-transform: scale(1.5, 1);
      -webkit-transform: scale(1.5, 1);
      transform: scale(1.5, 1);
    }
  }

  @-webkit-keyframes float {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }

    50% {
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
    }

    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  @keyframes float {
    0% {
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }

    50% {
      -webkit-transform: translateY(-6px);
      -ms-transform: translateY(-6px);
      transform: translateY(-6px);
    }

    100% {
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
  }

  //当窗口宽度大于768px时才会开启波浪特性
  @media (max-width: 768px) {
    .waveWrapper {
      display: none;
    }
  }
}

.center {
  // width: 100%;
  // height: 550px;
  // margin: 0;
  // padding: 0;
  background-position: top center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  z-index: -1;
}

.focusinfo {
  position: relative;
  max-width: 800px;
  padding: 0 10px;
  top: 49.3%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  text-align: center;
  z-index: 99;
  -webkit-transition: 0.4s ease all;
  -moz-transition: 0.4s ease all;
  -o-transition: 0.4s ease all;
  transition: 0.4s ease all;

  @media (max-width: 768px) {
    display: none;
  }

  .header-tou {
    img {
      box-shadow: inset 0 0 10px #000;
      padding: 5px;
      opacity: 1;
      transform: rotate(0);
      transition: all ease 2s;
      width: 130px;
      height: 130px;
      border-radius: 100%;
    }
  }

  .header-tou img:hover {
    transform: rotate(360deg);
  }

  .glitch {
    font-family: "Ubuntu", sans-serif;
    position: relative;
    color: #fff;
    mix-blend-mode: lighten;
    margin: auto;
    font-size: 80px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .glitch:before,
  .glitch:after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0);
    clip: rect(0, 0, 0, 0);
  }

  .glitch:before {
    left: -1px;
    text-shadow: 1px 0 #ff3f1a;
  }

  .glitch:after {
    left: 1px;
    text-shadow: -1px 0 #00a7e0;
  }

  .glitch:hover:before {
    text-shadow: 4px 0 #ff3f1a;
    animation: glitch-loop-1 0.8s infinite ease-in-out alternate-reverse;
  }

  .glitch:hover:after {
    text-shadow: -5px 0 #00a7e0;
    animation: glitch-loop-2 0.8s infinite ease-in-out alternate-reverse;
  }

  @-webkit-keyframes glitch-loop-1 {
    0% {
      clip: rect(36px, 9999px, 9px, 0);
    }

    25% {
      clip: rect(25px, 9999px, 99px, 0);
    }

    50% {
      clip: rect(50px, 9999px, 102px, 0);
    }

    75% {
      clip: rect(30px, 9999px, 92px, 0);
    }

    100% {
      clip: rect(91px, 9999px, 98px, 0);
    }
  }

  @keyframes glitch-loop-1 {
    0% {
      clip: rect(36px, 9999px, 9px, 0);
    }

    25% {
      clip: rect(25px, 9999px, 99px, 0);
    }

    50% {
      clip: rect(50px, 9999px, 102px, 0);
    }

    75% {
      clip: rect(30px, 9999px, 92px, 0);
    }

    100% {
      clip: rect(91px, 9999px, 98px, 0);
    }
  }

  @-webkit-keyframes glitch-loop-2 {
    0% {
      top: -1px;
      left: 1px;
      clip: rect(65px, 9999px, 119px, 0);
    }

    25% {
      top: -6px;
      left: 4px;
      clip: rect(79px, 9999px, 19px, 0);
    }

    50% {
      top: -3px;
      left: 2px;
      clip: rect(68px, 9999px, 11px, 0);
    }

    75% {
      top: 0;
      left: -4px;
      clip: rect(95px, 9999px, 53px, 0);
    }

    100% {
      top: -1px;
      left: -1px;
      clip: rect(31px, 9999px, 149px, 0);
    }
  }

  @keyframes glitch-loop-2 {
    0% {
      top: -1px;
      left: 1px;
      clip: rect(65px, 9999px, 119px, 0);
    }

    25% {
      top: -6px;
      left: 4px;
      clip: rect(79px, 9999px, 19px, 0);
    }

    50% {
      top: -3px;
      left: 2px;
      clip: rect(68px, 9999px, 11px, 0);
    }

    75% {
      top: 0;
      left: -4px;
      clip: rect(95px, 9999px, 53px, 0);
    }

    100% {
      top: -1px;
      left: -1px;
      clip: rect(31px, 9999px, 149px, 0);
    }
  }

  .header-info {
    position: relative;
    width: 63%;
    margin: auto;
    font-size: 16px;
    color: #eaeadf;
    background: rgba(0, 0, 0, 0.5);
    padding: 15px;
    margin-top: 22px;
    letter-spacing: 0;
    line-height: 30px;
    border-radius: 10px;
    box-sizing: initial;
    white-space: nowrap;
  }

  .header-info:before {
    content: "";
    position: absolute;
    top: -30px;
    left: 50%;
    margin-left: -15px;
    border-width: 15px;
    border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, 0.5) transparent;
  }

  .header-info p {
    margin: 0;
    font-family: "Ubuntu", sans-serif;
    font-weight: 700;

    span {
      margin: 0 10px;
    }
  }

  .top-social_v2 {
    height: 35px;
    margin-bottom: -10px;
    list-style: none;
    display: inline-block;
  }

  .top-social_v2 li {
    height: 35px;
    float: left;
    margin: 0 6px;
    cursor: data-uri("../assets/images/ayuda.cur"), auto;
    position: relative;
  }

  .top-social_v2 li {
    .img-box {
      position: absolute;
      border-radius: 6px;
      transition: 0.7s all ease;
      width: 121px;
      height: 121px;
      padding: 4px;
      background: rgba(0, 0, 0, 0.4);
      top: 40px;
      left: 50%;
      transform: translate3d(0, 50px, 0) translateX(-50%);
      opacity: 0;

      &:before {
        content: "";
        position: absolute;
        top: -30px;
        left: 50%;
        margin-left: -15px;
        border-width: 15px;
        border-style: solid;
        border-color: transparent transparent rgba(0, 0, 0, 0.4) transparent;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .text-box {
      position: absolute;
      border-radius: 4px;
      transition: 0.7s all ease;
      background: rgba(0, 0, 0, 0.4);
      top: 40px;
      left: 50%;
      transform: translate3d(0, 50px, 0) translateX(-50%);
      opacity: 0;

      &:before {
        content: "";
        position: absolute;
        top: -30px;
        left: 50%;
        margin-left: -15px;
        border-width: 15px;
        border-style: solid;
        border-color: transparent transparent rgba(0, 0, 0, 0.4) transparent;
      }

      p {
        color: #ffffff;
        font-weight: normal;
        font-size: 12px;
        padding: 2px 5px;
      }
    }
  }

  .top-social_v2 li:hover .img-box {
    transform: translate3d(0, 16px, 0) translateX(-50%);
    opacity: 1;
    visibility: visible;
  }

  .top-social_v2 li:hover .text-box {
    transform: translate3d(0, 16px, 0) translateX(-50%);
    opacity: 1;
    visibility: visible;
  }

  .top-social_v2 li:hover .text-box {
    display: block;
  }

  .top-social_v2 img {
    height: 35px;
    width: 35px;
    padding: 6px;
    background: 0 0;
  }

  .flipx {
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
  }
}

#indexContent {
  width: 100%;
  max-width: 900px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(255, 255, 255, 0.8);
  animation: main 1s;
  @media (max-width: 768px) {
    margin-top: 30px;
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
}

.feature-wrapper {
  @media (max-width: 768px) {
    display: none;
  }

  .top-feature-row {
    .top-feature-item {
      position: relative;
      height: 160px;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      border-radius: 10px;

      a {
        display: block;
        height: 100%;
      }

      .img-box {
        transition: all 0.35s ease-in-out;
        transform: scale(1);
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      &:hover .img-box {
        transform: scale(1.2);
      }

      .info {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        backface-visibility: hidden;
        background: #333;
        background: rgba(0, 0, 0, 0.6);
        visibility: hidden;
        opacity: 0;
        transition: all 0.35s ease-in-out;

        h3 {
          text-transform: uppercase;
          color: #fff;
          text-align: center;
          font-size: 17px;
          padding: 10px;
          background: #111;
          margin: 40px 0 0;
          transition: all 0.35s ease-in-out;
          transform: translateX(-100%);
        }

        p {
          font-style: italic;
          font-size: 12px;
          position: relative;
          color: #bbb;
          padding: 0 20px;
          text-align: center;
          transition: all 0.35s 0.1s linear;
          transform: translateX(100%);
          margin-top: 15px;
          height: 40px;
          line-height: 20px;
        }
      }

      &:hover .info {
        visibility: visible;
        opacity: 1;

        h3 {
          transform: translateX(0);
        }

        p {
          transform: translateX(0);
        }
      }
    }
  }
}

.feature-title {
  width: 100%;
  height: auto;
  margin-top: 55px;
  display: inline-block;

  h1 {
    color: #666;
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    line-height: 24px;
    padding-bottom: 5px;
    margin-bottom: 30px;
    border-bottom: 1px dashed #ececec;
  }

  @media (max-width: 768px) {
    margin-top: 15px;

    h1 {
      margin-bottom: 15px;
    }
  }
}

.home-list {
  width: 100%;
}

.blog-list {
  width: 100%;
}
</style>
