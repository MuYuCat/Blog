<!--
 * @Author: MuYuCat
 * @Date: 2022-04-14 16:32:47
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-19 17:03:50
 * @Description: README
-->
# MuYuCat's Blog
> [个人博客](https://muyucat.com) / 用于记录自己的生活

## 技术栈 
>Vue 3 + Typescript + Vite
## 代码架构
```
.
├── .husky  # Git Hook 工具，可以设置在 git 各个阶段触发我们的命令。
│   └──pre-commit  # pre-commit hook
├── public
│   └── Mlogo.ico  # 页面图标
├── src 
│   ├── api                     # 接口文件
│   │   ├── home                # 主页面接口文件
│   │   └── request             # 接口方法文件
│   ├── assets                  # 静态文件
│   ├── components              # 公共组件
│   ├── router                  # 路由
│   ├── store                   # vuex文件
│   ├── styles                  # 公共样式
│   ├── utils                   # 公共方法
│   ├── views                   # 所有页面
│   │   ├── home                # 主页面
│   │   │   ├── components      # 所用组件
│   │   │   └── home.vue        # 页面文件
│   │   ├── 404                 # 404页面
│   │   └── demo                # demo页面
│   ├── App.vue 
│   ├── env.d.ts
│   └── main.ts
├── .editorconfig               # editorConfig 配置文件
├── .eslintrc.js                # eslint 配置文件
├── .gitignore                  # git 排除配置文件
├── .prettierrc                 # prettier 配置文件
├── index.html
├── package-lock.json
├── package.json
├── README.md                   # README
├── tsconfig.json
└── vite.config.ts
```
## 前端页面部署

注意事项：
  1. 修改服务器中nginx.config
  ```
    在server：listen 80中增加：
    location /api/ {
      proxy_pass http://127.0.0.1:7001/;
    }
  ```
  2. 修改vite.config
  ```
    在server中设置
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
  ```
  3. 修改接口设计文件api
  ```
    设置接口路径url
    const findAll = () => {
      return request({
        url: '/api/users/findAll',
        method: 'get'
      });
    };
  ```


## 待办
```
  1. 登陆页面
  2. admin管理页面
  3. 文章撰写页面
  ……
```

## logs
```
  1. 2022/04/14 项目架构重构
  2. 2020/04/19 项目前后端部署
```

> 道阻且长
