const proxy = require('http-proxy-middleware');

module.exports =
  /**
   * modify here to set node proxy server
   *
   * documentation see https://github.com/chimurai/http-proxy-middleware
   */
  [
    proxy("/resources", {
      target: "https://openui5.hana.ondemand.com",
      changeOrigin: true,
      onProxyRes: function(p) {
        p.headers["cache-control"] = "public, max-age=31536000";
      }
    }),
    proxy("/test-resources", {
      target: "https://openui5.hana.ondemand.com",
      changeOrigin: true,
      onProxyRes: function(p) {
        p.headers["cache-control"] = "public, max-age=31536000";
      }
    })
  ];
