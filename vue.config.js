const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://smart-community.vnuo.com.cn:9926',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        onProxyReq: function (proxyReq, req, res) {
          console.log('Proxying request:', req.url);
        },
      },
    },
  },
});
