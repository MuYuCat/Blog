import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  publicDir: "public",
  base: '/', // 打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  },
  //打包配置
 build: {
  //浏览器兼容性  "esnext"|"modules"
  target: "modules",
  //指定输出路径
  outDir: "dist",
  //生成静态资源的存放路径
  assetsDir: "assets",
  //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
  assetsInlineLimit: 4096,
  //启用/禁用 CSS 代码拆分
  cssCodeSplit: true,
  //构建后是否生成 source map 文件
  sourcemap: false,
  //自定义底层的 Rollup 打包配置
  rollupOptions: {
  },
  //@rollup/plugin-commonjs 插件的选项
  commonjsOptions: {
  },
},

})
