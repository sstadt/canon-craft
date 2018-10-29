
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('theme', 'src/theme')
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/theme/_boilerplate.scss";
        `
      }
    }
  }
}
