<template>
  <div class="category-wrapper">
    <ArticleTop :name="name" :img="topImg" />
    <div class="main-wrapper">
      <header class="page-header">
        <h1 class="page-title">
          {{ `分类 “${name}” 下的文章` }}
        </h1>
      </header>
      <div class="site-main">
        <CategoryList
          v-for="(item, index) in categoryList"
          :key="index"
          :id="item.id"
          :thumbnail="item.thumbnail"
          :createTime="getTime(item.createTime)"
          :title="item.title"
          :views="item.views"
          :comments="item.comments"
          :summary="item.summary"
        />
        <PagInation
          :page="page"
          :finished="categoryList.length > 0 ? finished : true"
          :loading="loading"
          :nextList="nextCategoryList"
          :id="id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getrand, getTime } from "../../lib/public";
import { mapState } from "vuex";
import CategoryList from "../../components/CategoryList";
import ArticleTop from "../../components/ArticleTop";
export default {
  components: {
    CategoryList,
    ArticleTop,
  },
  async asyncData({ params, store, error }) {
    const id = parseInt(params.id);
    const { name } = store.state.categoryNav.find((item) => item.id === id);
    const data = await store.dispatch("getCategoryList", {
      page: 1,
      categoryId: id,
    });
    let list = data.models;
    const ListImg = store.state.ListImg;
    for (let i = 0; i < list.length; i++) {
      list[i].thumbnail =
        list[i].thumbnail || ListImg[getrand(0, ListImg.length - 1)].img;
    }
    if (data.success === 1) {
      return {
        categoryList: list,
        name: name,
        id,
        topImg: ListImg[getrand(0, ListImg.length - 1)].img,
      };
    }
    error({ statusCode: 504 });
  },
  data() {
    return {
      page: 2, //默认加载了一次所以为第二页
      finished: false,
      loading: false,
    };
  },
  computed: {
    ...mapState(["ListImg"]),
  },
  methods: {
    getTime(createTime) {
      return getTime(createTime);
    },
    getrand(m, n) {
      return getrand(m, n);
    },
    async nextCategoryList(page, id) {
      this.loading = true;
      const res = await this.$store.dispatch("getCategoryList", {
        page,
        categoryId: id,
      });
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
        this.categoryList = this.categoryList.concat(list);
        this.loading = false;
        if (current > total) this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
  .page-header {
    position: relative;
    text-align: center;
    margin-bottom: 50px;
    color: #9c9c9c;
    h1 {
      font-size: 20px;
      font-weight: 400;
      border: 1px dashed #ddd;
      padding: 15px;
      color: #828282;
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
</style>