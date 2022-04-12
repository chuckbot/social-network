module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "./src/style/global.scss";`,
      },
    },
  },
};
