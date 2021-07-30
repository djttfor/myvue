const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/api',{//遇见/api前缀的请求，就会触发该代理配置
            target: 'http://47.112.181.157:81/',//请求发给谁
            changeOrigin: true,//控制服务器收到的响应头中的Host字段的值
            pathRewrite: {'^/api':''},
            onProxyRes: function (proxyRes,req,res) {
                console.log(proxyRes)
                console.log(req)
                console.log(res)
            }
        })
    )
}