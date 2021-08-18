<template>
  <div class="footer">
    <div class="site-info">
      <div class="footertext">
        <p class="foo-logo" />
        <p class="name">
          <span>
            <a :href="config.domain" target="_blank">{{ config.copyright }}</a>
          </span>
        </p>
        <p>
          <img :src="require('../assets/images/beian.png')">
          © 2021 {{ config.title }}
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45122802000038" target="_blank">{{
            config.icp
          }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["config"]),
  },
};
</script>

<style lang="less" scoped>
.footer {
  padding: 2%;
  background: rgba(255, 255, 255, 0.8);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  .site-info {
    text-align: center;
    font-size: 13px;
    color: #b9b9b9;
    .footertext .foo-logo {
      background-image: url("../assets/images/sakura.svg");
      width: 30px;
      height: 30px;
      opacity: 0.8;
      margin: 0 auto;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      animation: poi-deg 12s infinite linear;
      -webkit-animation: poi-deg 12s infinite linear;
    }
    p {
      margin: 15px 0;
      a {
        color: #b9b9b9;
      }
    }
    .name {
      span {
        color: #666666;
      }
      i {
        color: #e74c3c;
      }
      a {
        color: #000000;
        text-decoration: none;
      }
    }
  }
  .footer-sponsor {
    img {
      width: 52px;
      margin-right: 10px;
    }
  }
  @keyframes poi-deg {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes poi-deg {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>