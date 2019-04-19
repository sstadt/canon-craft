
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('theme', 'src/theme')
    config.resolve.alias.set('assets', 'src/assets')
    config.module
      .rule("vue")
      .use("vue-svg-inline-loader")
        .loader("vue-svg-inline-loader")
        .options({ /* ... */ })
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/theme/_boilerplate.scss";
        `
      }
    }
  },
  pwa: {
    themeColor: '#410001',
    appleMobileWebAppCapable: 'yes'
  }
}
