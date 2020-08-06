 
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports=function(app){
    app.use(createProxyMiddleware('/proxy',{
         target: 'http://10.40.3.209:5000/api/v1', 
         changeOrigin: true ,
         pathRewrite:{
             "^/proxy":""
         }
        })
    );
}