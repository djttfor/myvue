<template>
  <div class="article-wrapper">
    <div class="pattern-center-blank" />
    <div class="article-top">
      <div class="pattern-attachment-img">
        <img class="lazyload" :src="topImg" alt="" />
      </div>
      <div class="single-header">
        <h1 class="entry-title">{{ data.title }}</h1>
        <p class="entry-census">
          <span><img :src="userInfo.avatar" alt="" /></span>
          <span>{{ userInfo.name }}</span>
          <span class="bull">·</span>
          <span>{{ getTime(data.createTime) }}</span>
          <span class="bull">·</span>
          <span>{{ data.views }} 次阅读</span>
        </p>
      </div>
    </div>
    <div class="main-wrapper">
      <div class="flex-items">
        <div class="cell">
          <!-- 内容 -->
          <div class="entry-content" id="content" v-html="compiledMarkdown" />
          <!-- <a
            class="aly"
            href="https://www.aliyun.com/1111/new?userCode=luwg14ys"
            target="_blank"
          >
            <img
              src="https://image.bygit.cn/helloblog/image/3eb0fd43-02b9-422f-9e40-ee7775588906.jpg"
              alt=""
            />
          </a>
          <a
            class="aly-mobile"
            href="https://www.aliyun.com/1111/new?userCode=luwg14ys"
            target="_blank"
          >
            <img
              src="https://image.bygit.cn/helloblog/image/36b9f2c9-c1db-4b03-b754-2643c777e492.jpg"
              alt=""
            />
          </a> -->
          <!-- 打赏 -->
          <Socials v-if="socialsList.length > 0" :list="socialsList" />
          <!-- 评论 -->
          <div class="comments-wrapper">
            <h3 class="comments-list-title">
              Comments |
              <span class="noticom">{{ pageInfo.total }} 条评论 </span>
            </h3>
            <ul class="commentwrap">
              <li
                class="comment"
                v-for="(item, index) in commentsList"
                :key="index"
              >
                <div class="commentinfo flex-items">
                  <img :src="item.authorAvatar" alt="" />
                  <div class="commeta cell">
                    <h2>{{ item.authorName }}</h2>
                    <h3>
                      {{ getTime(item.createTime) }} |
                      {{ getFormatTime(item.createTime) }}
                    </h3>
                  </div>
                  <span
                    @click="reply(item.id, item.authorName)"
                    class="comment-reply-link"
                    >Reply</span
                  >
                </div>
                <div class="body">
                  <p>
                    <span v-if="item.parentUserName"
                      >@{{ item.parentUserName }}</span
                    >{{ item.content }}
                  </p>
                </div>
                <hr />
              </li>
            </ul>
            <a-pagination
              class="pagination"
              hideOnSinglePage
              size="small"
              @change="getComments"
              :item-render="itemRender"
              :current="pageInfo.page"
              :pageSize="5"
              :total="pageInfo.total"
            />
            <div class="comment-textarea" v-if="data.isComment">
              <textarea
                placeholder="你是我一生只会遇见一次的惊喜 ..."
                name="comment"
                class="commentbody"
                id="comment"
                rows="5"
                tabIndex="4"
                v-model="value"
              />
              <div class="form-submit">
                <input
                  @click="addComments"
                  name="submit"
                  type="submit"
                  id="submit"
                  class="submit"
                  value="BiuBiuBiu~"
                />
              </div>
            </div>
            <p v-else clss="text">此处评论已关闭</p>
          </div>
          <!-- 评论-end -->
        </div>
        <!-- 目录 -->
        <a-anchor
          class="toc"
          affix
          showInkInFixed
          :offsetTop="100"
          @click="handleClick"
          v-if="tocItems.length > 0"
        >
          <AnchorLink :list="tocItems" />
        </a-anchor>
      </div>
    </div>
  </div>
</template>

<script>
import { getrand, getTime, getFormatTime } from "../../lib/public";
import { mapState } from "vuex";
import marked from "marked";
import Clipboard from "clipboard";
import { last } from "lodash";
import Socials from "../../components/Socials";
import AnchorLink from "../../components/AnchorLink";
import openWindow from "../../lib/openWindow";
import { setToken, setAvatar } from "../../lib/public";
import { lang } from "../../lib/lang";
const rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
});
export default {
  head() {
    return {
      title: `Astolfo-${this.data.title}`,
    };
  },
  components: {
    Socials,
    AnchorLink,
  },
  async asyncData({ params, store, error }) {
    const id = parseInt(params.id);
    const [data, comments] = await Promise.allSettled([
      store.dispatch("getPosts", { id }),
      store.dispatch("getComments", { page: 1, postsId: id }),
    ]);
    const ListImg = store.state.ListImg;
    if (
      data.status === "fulfilled" &&
      data.value.success === 1 &&
      comments.status === "fulfilled"
    ) {
      return {
        id,
        data: data.value.model,
        commentsList: comments.value.models,
        pageInfo: comments.value.pageInfo,
        topImg: ListImg[getrand(0, ListImg.length - 1)].img,
      };
    }
    error({ statusCode: 404 });
  },
  data() {
    return {
      clipboard: "",
      value: "",
      parentId: "",
      preContent: "",
      anchors: [],
      tocItems: [],
      index: [],
    };
  },
  computed: {
    ...mapState(["userInfo", "socialsList", "config"]),
    //此函数将markdown内容进一步的转换
    compiledMarkdown() {
      rendererMD.heading = (text, level) => {
        const anchor = this.add(text, level);
        return `<h${level} id="${anchor}">${text}</h${level}>`;
      };
      return marked(this.data.content);
    },
  },
  mounted() {
    this.bindClick();
  },
  destroyed() {
    if (this.clipboard) this.clipboard.destroy();
  },
  methods: {
    //评论下一页
    async getComments(page) {
      const data = await this.$store.dispatch("getComments", {
        page,
        postsId: this.id,
      });
      this.commentsList = data.models;
      this.pageInfo = data.pageInfo;
    },
    // 添加评论
    async addComments() {
      const { value, id, parentId, preContent } = this;
      const data = { content: value, postsId: id };
      if (value === "") {
        this.$message.warning("please type a comment");
        return false;
      }
      if (parentId) {
        let content = value.replace(preContent, "");
        if (content === "") {
          this.$message.warning("please type a comment");
          return false;
        }
        if (value.indexOf(preContent, 0) !== -1) {
          data["parentId"] = parentId;
          data["content"] = content;
        }
      }
      const res = await this.$store.dispatch("addComments", data);
      if (res.success === 1) {
        this.$message.success("评论成功");
        this.value = "";
        this.parentId = "";
        this.getComments(1);
      } else {
        this.login();
      }
    },
    //@某人
    reply(parentId, authorName) {
      this.value = `@${authorName}：`;
      this.preContent = `@${authorName}：`;
      this.parentId = parentId;
    },
    //获取登录
    async login() {
      const res = await this.$store.dispatch("goLogin");
      if (res.success === 1) {
        openWindow(res.model.authorizeUrl, "绑定GitHub", 540, 540);
        window.addEventListener("message", this.loginGithubHandel, false);
      }
    },
    //登录
    loginGithubHandel(e) {
      const { socialId, avatar, name, htmlUrl } = e.data;
      if (socialId) {
        this.$store
          .dispatch("login", {
            socialId,
            avatar,
            name,
            htmlUrl,
          })
          .then((res) => {
            if (res.success === 1) {
              setToken(res.model.token);
              setAvatar(res.model.avatar);
              this.$message.success("登录成功");
              this.$store.commit("setAvatar", res.model.avatar);
            }
          });
        window.removeEventListener("message", this.loginGithubHandel, false);
      }
    },
    // 分页渲染样式
    itemRender(current, type, originalElement) {
      if (type === "prev") {
        return <span>« Older</span>;
      } else if (type === "next") {
        return <span>Newer »</span>;
      }
      return originalElement;
    },
    //绑定Click 渲染代码高亮，行号
    bindClick() {
      this.$nextTick(() => {
        let content = document.getElementById("content");
        let pre = content.querySelectorAll("pre");
        for (let i = 0; i < pre.length; i++) {
          hljs.highlightBlock(pre[i].querySelector("code"));
          hljs.lineNumbersBlock(pre[i].querySelector("code"));
          let classList = pre[i].querySelector("code").classList;
          for (let j = 0; j < classList.length; j++) {
            if (classList[j].indexOf("language") > -1) {
              let text = classList[j].substring(
                classList[j].indexOf("-") + 1,
                classList[j].length
              );
              pre[i].querySelector("code").setAttribute("data-rel", text);
            } else {
              let text = lang.find((item) => item === classList[j]);
              if (text)
                pre[i].querySelector("code").setAttribute("data-rel", text);
            }
          }
          let median = pre[i]
            .querySelector("code")
            .innerHTML.replace(/<\/?.+?>/g, "");
          let res = median.replace(/ /g, "");
          let a = `<a class="copy-code" data-clipboard-action="copy" data-clipboard-target="#copy${i}"><i class="iconfont icon-fuzhi"></a>`;
          let b = `<a class="enlarge"><i class="iconfont icon-fangda"></a>`;
          let c = `<textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${i}">${res}</textarea>`;
          pre[i].querySelector("code").insertAdjacentHTML("afterend", a);
          pre[i].querySelector("code").insertAdjacentHTML("afterend", b);
          pre[i].querySelector("code").insertAdjacentHTML("afterend", c);
          pre[i].querySelector(".enlarge").onclick = () => {
            if (pre[i].classList.contains("code-block-fullscreen")) {
              pre[i].classList.remove("code-block-fullscreen");
            } else {
              pre[i].classList.add("code-block-fullscreen");
            }
          };
        }
        this.clipboard = new Clipboard(".copy-code");
        this.clipboard.on("success", (e) => {
          this.$message.success("复制成功");
        });
        this.clipboard.on("error", (e) => {
          this.$message.error("复制失败");
        });
      });
    },
    // 阻止冒泡
    handleClick(e) {
      e.preventDefault();
    },
    getTime(createTime) {
      return getTime(createTime);
    },
    getFormatTime(time) {
      return getFormatTime(time);
    },
    getrand(m, n) {
      return getrand(m, n);
    },
    //渲染目录开始
    add(text, level) {
      const anchor = `toc${level}${++this.index}`;
      this.anchors.push(anchor);
      const item = { anchor, level, text };
      const items = this.tocItems;

      if (items.length === 0) {
        // 第一个 item 直接 push
        items.push(item);
      } else {
        let lastItem = last(items); // 最后一个 item

        if (item.level > lastItem.level) {
          // item 是 lastItem 的 children
          for (let i = lastItem.level + 1; i <= 6; i++) {
            const { children } = lastItem;
            if (!children) {
              // 如果 children 不存在
              lastItem.children = [item];
              break;
            }

            lastItem = last(children); // 重置 lastItem 为 children 的最后一个 item

            if (item.level <= lastItem.level) {
              // item level 小于或等于 lastItem level 都视为与 children 同级
              children.push(item);
              break;
            }
          }
        } else {
          // 置于最顶级
          items.push(item);
        }
      }

      return anchor;
    },
  },
};
</script>

<style lang="less" scoped>
.article-wrapper {
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
  .single-header {
    max-width: 1100px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    top: auto;
    bottom: 20px;
    position: absolute;
    left: 0;
    right: 0;
    color: #fff;
    text-shadow: 2px 2px 10px #000;
    z-index: 1;
    .entry-title {
      font-size: 32px;
      width: 100%;
      color: #fff;
      font-weight: bold;
    }
    .entry-census {
      color: #fff;
      font-size: 14px;
      padding: 18px 0 0;
      line-height: 39px;
      span {
        color: #fff;
        font-size: 14px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 100%;
          float: left;
          margin-right: 12px;
        }
      }
      .bull {
        margin: 0 5px;
      }
    }
  }
  @media (max-width: 768px) {
    .pattern-attachment-img {
      height: 280px;
    }
    .single-header {
      .entry-title {
        font-size: 24px;
      }
      .entry-census {
        padding: 0;
      }
    }
  }
}
/deep/ .main-wrapper {
  min-height: 600px;
  max-width: 1100px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
  background-color: rgba(255, 255, 255, 0.8);
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
  .cell {
    margin-right: 25px;
  }
  .entry-content {
    position: relative;
    animation: main 1s;
  }

  .entry-content .begin,
  .single-begin {
    float: left;
    font-size: 3.6em;
    line-height: 1em;
    margin-right: 3px;
    margin-top: 2px;
    font-weight: 700;
  }

  @media screen and (max-width: 860px) {
    .entry-content .begin,
    .single-begin {
      margin-top: 6px;
    }
  }

  .entry-content ul {
    list-style: disc;
    border: 1px dashed #e4e4e4;
    padding: 15px 10px 15px 30px;
    color: #616161;
    margin-left: 0;
    border-radius: 10px;
    margin: 16px 0;
  }

  .entry-content ol {
    list-style: decimal;
    border: 1px dashed #e4e4e4;
    padding: 15px 10px 15px 30px;
    color: #616161;
    margin-left: 0;
    border-radius: 10px;
    margin: 16px 0;
  }

  .entry-content > table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  .entry-content table th {
    font-weight: 600;
  }

  .entry-content table th,
  .entry-content table td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  .entry-content table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }

  .entry-content table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }

  .entry-content blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
  }

  .entry-content blockquote > :first-child {
    margin-top: 0;
  }

  .entry-content blockquote > :last-child {
    margin-bottom: 0;
  }

  .entry-content ol li,
  .entry-content ul li {
    padding: 8px 0;
  }

  .entry-content h3 {
    color: #737373;
    margin: 17px 0;
  }

  .entry-content h1 {
    margin: 16px 0;
    clear: both;
    font-size: 24px;
    color: rgb(64, 64, 64);
  }

  .entry-content h2 {
    margin: 18px 0;
    clear: both;
    font-size: 22px;
    color: rgb(64, 64, 64);
  }

  .entry-content h3 {
    margin: 17px 0;
    clear: both;
    font-size: 20px;
    color: rgb(64, 64, 64);
  }

  .entry-content h4 {
    margin: 16px 0;
    clear: both;
    font-size: 18px;
    color: rgb(64, 64, 64);
  }

  .entry-content h5 {
    margin: 15px 0;
    clear: both;
    font-size: 16px;
    color: rgb(64, 64, 64);
  }

  .entry-content h6 {
    margin: 14px 0;
    clear: both;
    font-size: 14px;
    color: rgb(64, 64, 64);
  }

  .entry-content a {
    color: #e67474;
    position: relative;
  }

  .entry-content a:hover {
    color: orange;
    text-decoration: none;
  }

  .entry-content a:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: orange;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  .entry-content a:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  .entry-content p {
    color: #797979;
    margin: 15px 0 22px;
    line-height: 30px;
  }

  .entry-content hr {
    max-width: 100%;
    height: 50px;
    background: url("../../assets/images/hr.gif") 100% no-repeat;
    border: none;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .entry-content .post-password-form {
    text-align: center;
  }

  .entry-content a img.alignleft,
  .entry-content a img.alignright,
  .entry-content a img.aligncenter {
    cursor: -webkit-zoom-in;
  }

  .entry-content img {
    max-width: 100%;
  }

  pre {
    position: relative;
    background: #282c34;
    border-radius: 5px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    font-size: 15px;
    max-width: 100%;
    overflow: auto;
    text-shadow: none;
    padding-top: 30px;
    box-shadow: 0 10px 30px 0px rgba(0, 0, 0, 0.4);
  }
  pre:before {
    content: " ";
    position: absolute;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #fc625d;
    width: 12px;
    height: 12px;
    left: 12px;
    margin-top: -18px;
    -webkit-box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
    box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
    z-index: 2;
  }
  .entry-content .copy-code {
    color: #fff;
    position: absolute;
    float: right;
    right: 10px;
    top: 0;
    padding-top: 4px;
    padding-right: 2px;
    z-index: 2;
    font-size: 16px;
    &:hover:after {
      display: none;
    }
  }
  .entry-content .enlarge {
    color: #fff;
    position: absolute;
    float: right;
    right: 40px;
    top: 0;
    padding-top: 4px;
    padding-right: 2px;
    z-index: 2;
    font-size: 16px;
    &:hover:after {
      display: none;
    }
  }
  @keyframes elastic {
    0% {
      transform: scale(0);
    }

    55% {
      transform: scale(1);
    }

    70% {
      transform: scale(0.98);
    }

    100% {
      transform: scale(1);
    }
  }

  code {
    word-break: break-word;
    padding: 2px;
    text-shadow: none;
    border-radius: 0 0 5px 5px;
    cursor: data-uri("../../assets/images/texto.cur"), auto;
  }

  code[data-rel]:before {
    color: #fff;
    content: attr(data-rel);
    height: 30px;
    line-height: 30px;
    background: #21252b;
    font-size: 16px;
    position: absolute;
    margin-top: -30px;
    left: 0;
    width: 100%;
    font-family: Ubuntu, sans-serif;
    font-weight: 700;
    padding: 0 80px;
    text-indent: 15px;
    text-align: center;
    float: left;
    z-index: 1;
    border-radius: 5px 5px 0 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    pointer-events: none;
  }
  .code-block-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 100%;
    z-index: 999;
    margin: 0;
    animation: elastic 1s;
  }
  .code-block-fullscreen code {
    --widthA: 100%;
    --widthB: calc(var(--widthA) - 30px);
    height: var(--widthB);
    min-height: 99%;
    overflow-y: hidden;
    overflow-x: auto;
    height: auto;
  }
  .entry-content {
    .hljs-ln {
      width: 100%;
      margin: 6px 0 0 !important;
      color: #fff;
      tr {
        background-color: transparent !important;
        border: none !important;
      }
      td {
        border: none !important;
        padding: 0;
      }
      td.hljs-ln-numbers {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
        background: #282c34;
        color: #888f96;
        vertical-align: top;
        position: absolute;
        left: 0;
        width: 30px;
      }
      .hljs-ln-code .hljs-ln-line {
        margin-left: 25px;
        padding-left: 5px;
      }
      .hljs-ln-code .hljs-ln-line:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
  .example {
    text-align: center;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
    i {
      background-color: #fe9600;
    }
  }
  .toc {
    width: 200px;
    h3 {
      padding: 7px 0 7px 16px;
      line-height: 1.143;
      font-size: 16px;
      font-weight: bold;
      color: #fe9600;
    }
    .ant-anchor-link-active > .ant-anchor-link-title {
      color: #fe9600;
    }
    .ant-anchor-link-title:hover {
      color: #fe9600;
    }
    .ant-anchor-ink-ball {
      border: 2px solid #fe9600;
    }
  }
  .flex-items {
    align-items: initial;
  }

  @media (max-width: 768px) {
    padding: 10px;
    min-height: 400px;
    .cell {
      margin: 0;
    }
    .toc {
      display: none;
    }
  }
}
.comments-wrapper {
  padding-top: 40px;
  .comments-list-title {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 40px;
    color: #7d7d7d;
    font-weight: 400;
    span {
      font-size: 13px;
      font-weight: 400;
      color: #909090;
    }
  }
  .commentwrap {
    margin: 0 auto 30px;
    .comment {
      .commentinfo {
        img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          box-shadow: 0 1px 10px -6px rgba(0, 0, 0, 0.5);
          margin-right: 15px;
        }
        .commeta {
          h2 {
            color: #fe9600;
            font-size: 15px;
            font-weight: 600;
            line-height: 20px;
          }
          h3 {
            line-height: 20px;
            font-size: 12px;
            letter-spacing: 0px;
            text-transform: none;
            color: rgba(0, 0, 0, 0.35);
          }
        }
        .comment-reply-link {
          font-size: 12px;
          display: block;
          margin-left: 10px;
          float: right;
          text-transform: uppercase;
          color: #fff;
          height: 20px;
          background-color: #fe9600;
          line-height: 20px;
          padding: 0 6px;
          border-radius: 3px;
          cursor: data-uri("../../assets/images/ayuda.cur"), auto;
          opacity: 0;
          transition: color 0.2s ease-out, border 0.2s ease-out,
            opacity 0.2s ease-out;
        }
      }
      &:hover .comment-reply-link {
        opacity: 0.9;
      }
      .body {
        line-height: 32px;
        color: #63686d;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        position: relative;
        p {
          font-size: 14px;
          line-height: 30px;
          margin-top: 10px;
          padding-bottom: 20px;
          padding-left: 3px;
          color: #63686d;
          span {
            font-size: 12px;
            color: #909090;
            margin-right: 3px;
          }
        }
      }
      hr {
        height: 0;
        width: 100%;
        background: #eee;
        border: 0;
        margin: 40px 0;
      }
    }
  }
  .pagination {
    margin: 20px 0;
    .ant-pagination-item {
      border: none;
      font-family: inherit;
      font-size: 15px;
    }
    .ant-pagination-item a {
      font-family: inherit;
      font-size: 15px;
    }
    .ant-pagination-item-active a {
      color: #fe9600;
    }
    .ant-pagination-item:focus a,
    .ant-pagination-item:hover a {
      color: #fe9600;
    }
    .ant-pagination-next,
    .ant-pagination-prev {
      color: #fe9600;
      font-family: inherit;
      font-size: 15px;
    }
    .ant-pagination-next span,
    .ant-pagination-prev span {
      color: #fe9600;
      font-family: inherit;
      font-size: 15px;
    }
    .ant-pagination-next:hover span,
    .ant-pagination-prev:hover span {
      color: #fe9600;
    }
    .ant-pagination-disabled span {
      color: rgba(0, 0, 0, 0.25);
    }
    .ant-pagination-disabled:hover span {
      color: rgba(0, 0, 0, 0.25);
    }
  }
  .text {
    font-size: 14px;
    padding: 20px 0;
  }
}
.comment-textarea {
  position: relative;
  .commentbody {
    width: 100%;
    background: url(https://view.moezx.cc/images/2018/03/24/comment-bg.png)
      right center / contain no-repeat transparent;
    padding: 21px 21px 20px;
    font-size: 14px;
    display: block;
    height: 180px;
    margin-bottom: 10px;
    color: rgb(83, 90, 99);
    border: 1px solid rgb(221, 221, 221);
    resize: vertical;
    border-radius: 6px;
    outline: none;
  }
  .commentbody:focus {
    border: 1px solid #fe9600;
  }
  .form-submit {
    clear: both;
    display: block;
    overflow: hidden;
    margin: 20px 0;
    input {
      background: #fff;
      border-radius: 6px;
      width: 100%;
      margin: 0;
      padding: 15px 25px;
      text-transform: none;
      color: #535a63;
      -webkit-transition: all 0.1s ease-out;
      -moz-transition: all 0.1s ease-out;
      transition: all 0.1s ease-out;
      box-shadow: none;
      border: 1px solid #ccc;
      text-shadow: none;
      cursor: data-uri("../../assets/images/ayuda.cur"), auto;
    }
    input:hover {
      border: 1px solid #fe9600;
      color: #fe9600;
    }
  }
}
.aly {
  display: block;
  text-align: center;
  img {
    max-width: 100%;
  }
  @media (max-width: 768px) {
    display: none;
  }
}
.aly-mobile {
  display: none;
  text-align: center;
  img {
    max-width: 100%;
  }
  @media (max-width: 768px) {
    display: block;
  }
}
</style>