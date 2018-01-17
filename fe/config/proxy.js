// proxy 配置文件
// https://github.com/chimurai/http-proxy-middleware
module.exports = {
  '/api/': {
    target: 'http://localhost:3000',
    changeOrigin: true
  },
}
