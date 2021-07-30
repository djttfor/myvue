<template>
  <div class="tags-wrapper">
    <ArticleTop name="标签墙" :img="topImg" />
    <div class="main-wrapper">
      <div class="tags-list" v-if="tagsList.length > 0">
        <a-tag
          v-for="(item, index) in tagsList"
          :key="index"
          :color="color[getrand(0, color.length - 1)]"
        >
          <nuxt-link
            :to="{
              name: 'tags-id-name',
              params: { id: item.id, name: item.name },
            }"
          >
            {{ item.name }}({{ item.postsTotal }})
          </nuxt-link>
        </a-tag>
      </div>
      <div class="tags-list" v-else>
        <p>你暂时还未添加标签...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleTop from "../../components/ArticleTop";
import { getrand } from "../../lib/public";
export default {
  async asyncData({ store, error }) {
    const ListImg = store.state.ListImg;
    const res = await store.dispatch("getTags");
    if (res.success === 1) {
      return {
        topImg: ListImg[getrand(0, ListImg.length - 1)].img,
        tagsList: res.models,
        color: [
          "#23b7e5",
          "#3a3f51",
          "#27c24c",
          "#1c2b36",
          "#fad733",
          "#7266ba",
          "#f05050",
        ],
      };
    }
    error({ statusCode: 504 });
  },
  components: {
    ArticleTop,
  },
  methods: {
    getrand(m, n) {
      return getrand(m, n);
    },
  },
};
</script>

<style lang="less" scoped>
.tags-wrapper {
  .main-wrapper {
    min-height: 600px;
    max-width: 900px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 50px;
    background-color: rgba(255, 255, 255, 0.8);
    animation: main 1s;
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
    .example {
      height: 52px;
      line-height: 52px;
      text-align: center;
      i {
        background-color: #fe9600;
      }
    }
    .tags-list {
      span {
        padding: 2px 20px;
        margin-right: 15px;
        margin-bottom: 15px;
      }
      a {
        line-height: 22px;
      }
      p {
        width: 100%;
        padding: 20px 0;
        text-align: center;
        margin: 40px 0 80px;
        display: inline-block;
        color: #989898;
        font-size: 15px;
      }
    }
    @media (max-width: 768px) {
      padding-top: 30px;
      min-height: 400px;
      .page-header {
        margin-bottom: 30px;
        h1 {
          font-size: 16px;
          font-weight: 400;
          border: 1px dashed #ddd;
          padding: 10px;
          color: #828282;
        }
      }
    }
  }
}
</style>