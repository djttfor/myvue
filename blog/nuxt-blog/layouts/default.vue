<template>
  <div id="app">
    <BackTop :gotoTop="gotoTop" />
    <Header :isFixed="isFixed" />
    <Nuxt />
    <div id="player" />
    <Footer />
  </div>
</template>
<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackTop from "../components/BackTop";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: `Astolfo`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.config.description || "Plumemo",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.config.keywords || "Plumemo",
        },
      ],
    };
  },
  computed: {
    ...mapState(["config"]),
  },
  components: {
    Header,
    Footer,
    BackTop,
  },
  data() {
    return {
      isFixed: false,
      gotoTop: false,
    };
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    //当页面滚动
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //设置背景颜色的透明读
      if (scrollTop) {
        this.isFixed = true;
      } else if (scrollTop === 0) {
        this.isFixed = false;
      }
      this.gotoTop = scrollTop > 600;
    },
  },
};
</script>
<style lang="less">
#player{
   @media (max-width: 768px) {
     display: none;
  }
}
</style>
