
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('theme', 'src/theme')
    config.resolve.alias.set('assets', 'src/assets')
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
