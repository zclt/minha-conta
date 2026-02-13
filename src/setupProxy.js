const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_MINHA_CONTA_URI,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};