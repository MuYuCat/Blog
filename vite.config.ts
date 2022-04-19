import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('/src') // 设置 `@` 指向 `src` 目录
    }
  },
  publicDir: 'public',
  base: '/', // 打包路径
  server: {
    proxy: {
      '/api': {
        target: 'http://muyucat.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    port: 8080, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  }
});
