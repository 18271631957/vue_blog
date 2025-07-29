const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // Webpack在打包过程中，会将所有的资源文件（如JavaScript、CSS、图片等）打包成一个或多个文件。
  // 这些文件在浏览器中可以通过一个公共路径来访问。publicPath属性就是用来定义这个公共路径的
  publicPath: './',
  // 生产环境构建文件的目录名
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  configureWebpack: {
    module: {
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        //会自动加载src/components ，还有其它位置的话可以直接配置
        dirs: ['src/components'],
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '小黄技术博客'
      return args
    })
  },
  css: {
    loaderOptions: {
      sass: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        additionalData: `@import "@/assets/styles/lmLayout.scss";` +
          `@import "@/assets/styles/variables.scss";` +
          `@import "@/assets/styles/var.scss";`
      }
    } // 全局样式文件
  },
})
