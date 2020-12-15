/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // 개발 서버
      // target: 'http://panopticon-dev.gq',
      // 로컬 서버
      target: 'http://localhost:4000',
      changeOrigin: true,
    }),
  );
};
