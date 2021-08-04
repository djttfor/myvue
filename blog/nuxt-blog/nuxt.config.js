const env = require('./env')
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Astolfo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Astolfo' },
      { hid: 'keywords', name: 'keywords', content: 'Astolfo' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/lmx.svg' },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_1569838_q17qktt1g1.css' }
    ],
    script: [
      { src: "https://image.bygit.cn/highlight.min.js" },
      { src: "https://image.bygit.cn/highlightjs-line-numbers.min.js" },
      { src: "https://hm.baidu.com/hm.js?ec46c045bff2ebcd37911ed94014e720" } //百度统计
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'assets/css/base.less',
    'assets/css/atom.less'
  ],
  

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/antd-ui', ssr: true },
    { src: '@/plugins/router', ssr: true },
    { src: '@/plugins/axios', ssr: true },
    { src: '@/plugins/aplayer', ssr: false },
    { src: '@/plugins/baidu', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],
  loading: {
    color: '#fe9600',
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },
  proxy: {
    '/api/blog/': {
      target: env[process.env.MODE].ENV_API,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api/blog/': '/api/plumemo-service/',
        changeOrigin: true
      }
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // ... 省略其他配置
    transpile: ['ant-design-vue'],
    babel: {
      plugins: [
        ['import', {
          libraryName: 'ant-design-vue',
          libraryDirectory: 'lib', // 默认'lib'，也可视情况改为 'es'，通过查看组件可知这两个目录均存在。
          style: true,  // true 代表使用less, 若使用css文件，可设置为 'css'
        },
          "ant-design-vue"]
      ]
    },
    // style: true时才需要，如果上面 style:'css'，则不需要该处的 loaders 配置
    loaders: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#fe9600',
          },
          javascriptEnabled: true
        }
      }
    }
  }
}
