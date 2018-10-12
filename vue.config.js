
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('theme', 'src/theme')
  }
}
