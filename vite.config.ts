/*
 * @Author: MuYuCat
 * @Date: 2022-04-19 11:58:49
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-25 13:28:20
 * @Description: file content
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
// import * as path from 'path';
import { resolve } from 'path';
// 按需使用Element-Plus
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 按需使用Element-Plus
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  publicDir: 'public',
  base: '/', // 打包路径
  server: {
    proxy: {
      '/map': {
        target: 'http://api.map.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/map/, '')
      },
      '/weather': {
        target: 'https://geoapi.qweather.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weather/, '')
      },
      '/devWeather': {
        target: 'https://devapi.qweather.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/devWeather/, '')
      },
      '/poetry': {
        target: 'https://v2.jinrishici.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/poetry/, '')
      },
      '/hitokoto': {
        target: 'https://v1.hitokoto.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hitokoto/, '')
      }
    },
    port: 8080, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  }
});
