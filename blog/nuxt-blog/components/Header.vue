<template>
  <div class="header-wrapper">
    <div class="nav-wrapper" :class="{ 'nav-fixed': isFixed }">
      <div class="logo flex-items">
        <nuxt-link to="/">{{ "Astolfo" }}</nuxt-link>
        <a-icon type="menu" @click="handlePhoneVisible" />
      </div>
      <div class="nav-p">
          <ul class="nav flex-items">
            <li class="nav-item">
              <nuxt-link to="/" class="item">
                <i class="iconfont icon-fort-awesome" />
                <span>首页</span>
              </nuxt-link>
            </li>
            <li class="nav-item" id="area" v-if="categoryNav.length > 0">
              <a-dropdown :getPopupContainer="getById">
                <span class="item">
                  <i class="iconfont icon-list-ul" />
                  <span>分类</span>
                </span>
                <a-menu slot="overlay" @click="handleCommandClick">
                  <a-menu-item v-for="item in categoryNav" :key="item.id">
                    {{ item.name }}
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </li>
            <li class="nav-item">
              <nuxt-link to="/archives" class="item">
                <i class="iconfont icon-archive" />
                <span>归档</span>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/links" class="item">
                <i class="iconfont icon-link" />
                <span>友人帐</span>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/tags" class="item">
                <i class="iconfont icon-tag" />
                <span>标签墙</span>
              </nuxt-link>
            </li>
            <!-- 自定义导航 -->
            <li
              class="nav-item"
              v-for="(item, index) in menu"
              :key="index"
              :id="'area' + item.id"
            >
              <a-dropdown
                :getPopupContainer="() => getChildById(item.id)"
                v-if="item.child && item.child.length > 0"
              >
                <span class="item">
                  <a-icon :type="item.icon" />
                  <span>{{ item.title }}</span>
                </span>
                <a-menu slot="overlay">
                  <a-menu-item v-for="(item, index) in item.child" :key="index">
                    <a :href="item.url" target="_blank">
                      {{ item.title }}
                    </a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
              <a :href="item.url" target="_blank" class="item" v-else>
                <a-icon :type="item.icon" />
                <span>{{ item.title }}</span>
              </a>
            </li>
          </ul>
        </div>
      <div class="nav-wapper flex-items">
        
        <div class="nav-search">
          <a-icon type="search" @click="handleSearchVisible" />
          <img v-show="avatar" :src="avatar" alt="" />
          <a-icon v-show="!avatar" @click="login" type="user" />
        </div>
      </div>
    </div>
    <!-- 搜索 -->
    <div
      class="search-form search-form--modal"
      :class="{ 'is-visible': searchVisible }"
    >
      <div class="search-form__inner">
        <div class="box">
          <p class="micro mb-">想要找点什么呢？</p>
          <a-icon type="search" />
          <input
            type="search"
            name="s"
            placeholder="Search"
            v-model="searchVal"
            @keypress.13="handleSearchKeypress"
          />
        </div>
      </div>
      <div class="search_close" @click="handleSearchVisible"></div>
    </div>
    <!-- 手机端导航 -->
    <div
      class="Mask"
      :class="{ show: phoneVisible, hidden: !phoneVisible }"
      @click="handlePhoneVisible"
    ></div>
    <div class="MoNav mo-nav" :class="{ open: phoneVisible }">
      <div class="m-avatar"><img :src="userInfo.avatar" alt="" /></div>
      <p class="name ellipsis">{{ userInfo.name }}</p>
      <p class="info ellipsis">{{ userInfo.introduction }}</p>
      <ul class="menu">
        <li>
          <span class="item flex-items" @click="handleOpenUrl('/')">
            <i class="iconfont icon-fort-awesome" />
            <span>首页</span>
          </span>
        </li>
        <li>
          <span class="item flex-items" @click="handlerCategory">
            <i class="iconfont icon-list-ul" />
            <span>分类</span>
          </span>
          <ul class="sub-menu" :class="!show?'sub-menu-none':''">
            <li v-for="(item, index) in categoryNav" :key="index">
              <span
                class="item flex-items"
                @click="handleOpenUrl('/category', item.id)"
              >
                <span>{{ item.name }}</span>
              </span>
            </li>
          </ul>
        </li>
        <li>
          <span class="item flex-items" @click="handleOpenUrl('/archives')">
            <i class="iconfont icon-archive" />
            <span>归档</span>
          </span>
        </li>
        <li>
          <span class="item flex-items" @click="handleOpenUrl('/links')">
            <i class="iconfont icon-link" />
            <span>友人帐</span>
          </span>
        </li>
        <li>
          <span class="item flex-items" @click="handleOpenUrl('/tags')">
            <i class="iconfont icon-tag" />
            <span>标签墙</span>
          </span>
        </li>
        <!-- 自定义菜单 -->
        <li v-for="(item, index) in menu" :key="index">
          <a :href="item.url" target="_blank" class="item flex-items">
            <a-icon :type="item.icon" />
            <span>{{ item.title }}</span>
          </a>
          <ul class="sub-menu" :class="!show?'sub-menu-none':''" v-if="item.child && item.child.length > 0">
            <li v-for="(item, index) in item.child" :key="index">
              <a :href="item.url" target="_blank" class="item flex-items">
                <span>{{ item.title }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setToken, setAvatar } from "../lib/public";
import openWindow from "../lib/openWindow";
export default {
  props: {
    isFixed: Boolean,
  },
  data() {
    return {
      searchVisible: false,
      phoneVisible: false,
      searchVal: "",
      isUser: false,
      show:false
    };
  },
  computed: {
    ...mapState(["categoryNav", "menu", "userInfo", "avatar"]),
  },
  methods: {
    async login() {
      const res = await this.$store.dispatch("goLogin");
      if (res.success === 1) {
        openWindow(res.model.authorizeUrl, "绑定GitHub", 540, 540);
        window.addEventListener("message", this.loginGithubHandel, false);
      }
    },
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
    getById() {
      return document.getElementById("area");
    },
    getChildById(id) {
      return document.getElementById(`area${id}`);
    },
    //点击分类
    handleCommandClick({ key }) {
      this.$router.push({ name: "category-id", params: { id: key } });
    },
    //显示隐藏搜索
    handleSearchVisible() {
      this.searchVisible = !this.searchVisible;
    },
    //搜索
    handleSearchKeypress() {
      if (this.searchVal === "") {
        this.$message.warning("Please type in the content");
      } else {
        this.$router.push({
          name: "search-keywords",
          params: { keywords: this.searchVal },
        });
        this.searchVisible = false;
      }
    },
    // 手机端导航显示隐藏
    handlePhoneVisible() {
      if (!this.phoneVisible) {
        document.body.style.height = "100%";
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.height = "";
        document.body.style.overflow = "";
      }
      this.phoneVisible = !this.phoneVisible;
    },
    //手机端导航点击
    handleOpenUrl(url, id) {
      if (id) {
        this.$router.push({ name: "category-id", params: { id } });
      } else {
        this.$router.push({ path: url });
      }
      this.phoneVisible = false;
      document.body.style.height = "";
      document.body.style.overflow = "";
    },
    handlerCategory(){
      this.show = !this.show
    },
  },
};
</script>

<style lang="less" scoped>
.header-wrapper {
  .search-form--modal {
    -webkit-transition: visibility 0.25s ease, opacity 0.25s ease;
    -moz-transition: visibility 0.25s ease, opacity 0.25s ease;
    -ms-transition: visibility 0.25s ease, opacity 0.25s ease;
    -o-transition: visibility 0.25s ease, opacity 0.25s ease;
    transition: visibility 0.25s ease, opacity 0.25s ease;
    overflow: hidden;
    z-index: 999;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #fff;
    visibility: hidden;
    opacity: 0;
  }

  .search-form--modal .search-form__inner {
    max-width: 640px;
    padding: 0 20px;
    margin: auto;
    text-align: left;
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    height: 285px;
    top: 0;
    bottom: 0;
  }

  .search-form .box {
    position: relative;
  }

  .search-form--modal .search-form__inner p {
    padding-left: 24px;
    color: #404040;
    font-size: 15px;
    line-height: 1.5;
    margin: 15px 0 22px 0;
  }

  .search-form i {
    font-size: 32px;
    font-size: 2rem;
    line-height: 1;
    color: #ddd;
    position: absolute;
    bottom: 10px;
    margin-top: -16px;
    left: 16px;
  }

  .search-form input {
    font-size: 24px;
    font-size: 1.5rem;
    background: #fff;
    padding: 12px 24px 12px 64px;
    width: 100%;
    outline: none;
    border-radius: 50px;
    color: #666;
    border: 1px solid #ccc;
  }

  .search-form .search_close {
    position: absolute;
    width: 35px;
    height: 35px;
    background: 0 0;
    top: 20px;
    right: 15px;
    cursor: data-uri("../assets/images/ayuda.cur"), auto;
  }

  .search_close:before,
  .search_close:after {
    background-color: #222;
    position: absolute;
    content: "";
    width: 30px;
    height: 2px;
    top: 17px;
    left: 2px;
  }

  .search_close:before {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .search_close:after {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .search-form.is-visible {
    visibility: visible;
    opacity: 0.99;
    animation: elastic 0.5s;
    background-image: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.2.1/img/other/iloli.gif);
    background-repeat: no-repeat;
    background-position: bottom right;
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

  @media (min-width: 768px) {
    &:hover .nav-wrapper {
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 1px 40px -8px rgba(0, 0, 0, 0.5);
    }
  }

  @media (max-width: 768px) {
    .search-form.is-visible {
      background-size: 30%;
    }

    .search-form--modal .search-form__inner p {
      padding-left: 10px;
      font-size: 14px;
    }

    .search-form i {
      font-size: 22px;
      bottom: 11px;
    }

    .search-form input {
      padding: 10px 10px 10px 45px;
      font-size: 18px;
    }
  }
}

.nav-wrapper {
  width: 100%;
  height: 75px;
  position: fixed;
  top: 0;
  padding: 0 30px;
  z-index: 999;
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    height: 50px;
    padding: 0 15px;
  }
}

.nav-fixed {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 40px -8px rgba(0, 0, 0, 0.5);
}

.logo {
  float: left;
  height: 75px;
  line-height: 75px;
  max-width: 120px;

  a {
    color: #464646;
    font-size: 20px;
    font-weight: 800;
  }

  i {
    font-size: 20px;
    color: #666666;
    cursor: data-uri("../assets/images/ayuda.cur"), auto;
    display: none;
  }

  i:hover {
    color: #fe9600;
  }

  a:hover {
    color: #fe9600;
  }

  @media (max-width: 768px) {
    height: 50px;
    line-height: 50px;

    a {
      display: none;
    }

    i {
      display: inline-block;
    }
  }
}

.nav-wapper {
  float: right;
  height: 75px;

  .flex-items {
    height: 75px;
  }

  @media (max-width: 768px) {
    height: 50px;
    .flex-items {
      height: 50px;
    }
  }
}
.nav-p{
  margin:0 auto;
  float: left;
  width: 500px;
  position: absolute;
  left: 0;
  right: 0;
}

.nav {
  height: 75px;
  margin: 0;
  @media (max-width: 768px) {
    display: none;
  }
}

.nav-item {
  padding: 0 15px;

  .item {
    display: block;
    color: #666666;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    position: relative;
    cursor: data-uri("../assets/images/ayuda.cur"), auto;
  }

  .item i {
    margin-right: 5px;
    font-size: 16px;
  }

  .item:after {
    content: "";
    display: block;
    position: absolute;
    bottom: -17px;
    height: 6px;
    background-color: #fe9600;
    width: 0px;
    transition: width 0.25s ease-in-out;
  }

  &:hover .item {
    color: #fe9600;
  }

  &:hover .item:after {
    width: 100%;
  }

  .NavDropdown ul {
    padding: 10px;
    text-align: center;
    box-shadow: 0 1px 40px -8px rgba(0, 0, 0, 0.5);
  }

  .NavDropdown ul li:hover {
    background: none;
  }

  .NavDropdown ul li:hover a {
    color: #fe9600;
  }

  .NavDropdown ul:before {
    content: "";
    position: absolute;
    top: -20px;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }
}

.nav-search {
  display: flex;
  align-items: center;
  i {
    font-size: 20px;
    margin-left: 20px;
    color: #666666;
    cursor: data-uri("../assets/images/ayuda.cur"), auto !important;
  }

  i:hover {
    color: #fe9600;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-left: 20px;
  }
}
.Mask {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 998;
  &.hidden {
    display: none;
  }
  &.show {
    display: block;
  }
}
.MoNav {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  background-color: #ffffff;
  width: 55%;
  z-index: 999;
  transition-duration: 0.5s;
  overflow-y: scroll;
  -webkit-transform: translateX(-100%) translateY(0px);
  transform: translateX(-100%) translateY(0px);
  &.open {
    transform: translateX(0px) translateY(0px);
    -webkit-transform: translateX(0px) translateY(0px);
  }
  .m-avatar {
    width: 100%;
    height: auto;
    padding: 30px 0 20px;
    text-align: center;
  }
  .m-avatar img {
    width: 90px;
    height: 90px;
    max-width: 90px;
    border-radius: 100%;
  }
  .name {
    margin-bottom: 10px;
    padding: 0 15px;
    text-align: center;
    font-size: 13px;
    color: #333;
  }
  .info {
    margin-bottom: 10px;
    padding: 0 15px 15px 15px;
    text-align: center;
    font-size: 13px;
    color: #333;
    position: relative;
  }
  .menu {
    position: relative;
    li span:hover{
      background-color: #fe9600;
      color: #fff;
    }
    &:after {
      position: absolute;
      right: 0px;
      top: 0;
      left: 0px;
      height: 1px;
      content: "";
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      background-color: #f1f1f1;
    }
    .item {
      position: relative;
      padding: 10px 15px;
      color: #333;
      font-size: 14px;
      span {
        margin-left: 5px;
      }
      i {
        font-size: 12px;
      }
      &:after {
        position: absolute;
        right: 0px;
        bottom: 0;
        left: 0px;
        height: 1px;
        content: "";
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        background-color: #f1f1f1;
      }
    }
  }
  .sub-menu {
    padding-left: 15px;
    .item {
      padding: 5px 10px;
      font-size: 13px;
    }
  }
  .sub-menu-none {
    display: none;
  }
  
}
</style>
