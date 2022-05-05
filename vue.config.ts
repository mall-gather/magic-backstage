const path = require('path')

function resolve(dir: unknown): unknown {
  return path.join(__dirname)
}

module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('layout', resolve('src/layout'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('api', resolve('src/api'))
  }
}