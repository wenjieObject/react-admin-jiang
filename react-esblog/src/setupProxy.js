
const { createProxyMiddleware }  = require('http-proxy-middleware');
module.exports = function(app){
  //console.log(app)
  app.use(
    createProxyMiddleware('/proxy', {
      target: 'http://127.0.0.1:8080/api',
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': ''
      }
    })
  )
}