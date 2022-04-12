const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
});

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "./src/style/global.scss";`,
      },
    },
  },
};
