[TOC]

# learn-mt-app

> My splendid Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


### 项目脚手架搭建 (progect-preparation)

#### 项目构建流程
##### 进行克隆github上面的项目
``` js
git clone git@github.com:aLittleLittleStar/learn-mt-app.git
```

##### 安装npx
``` js
npm install -g npx
```

###### 结果
``` js
C:\Program Files\nodejs\node_global\npx -> C:\Program Files\nodejs\node_global\node_modules\npx\index.js
+ npx@10.2.0
updated 1 package in 60.029s
```

##### 新建项目(learn-mt-app)
``` js
npx create-nuxt-app learn-mt-app
```

###### 项目安装包选择
``` js
npx: 402 安装成功，用时 107.458 秒
> Generating Nuxt.js project in C:\Users\29176\Desktop\learn-mt-app
? Project name (learn-mt-app)
? Project name learn-mt-app
? Project description (My splendid Nuxt.js project)
? Project description My splendid Nuxt.js project
? Use a custom server framework (Use arrow keys)
? Use a custom server framework __koa__
? Use a custom UI framework (Use arrow keys)
? Use a custom UI framework element-ui
? Choose rendering mode (Use arrow keys)
? Choose rendering mode Universal
? Use axios module (Use arrow keys)
? Use axios module yes
? Use eslint (Use arrow keys)
? Use eslint yes
? Use prettier (Use arrow keys)
? Use prettier no
? Author name (aLittleLittleStar)
? Author name aLittleLittleStar
? Choose a package manager (Use arrow keys)
? Choose a package manager npm
Reinitialized existing Git repository in C:/Users/29176/Desktop/learn-mt-app/.git/


> nodemon@1.18.9 postinstall C:\Users\29176\Desktop\learn-mt-app\node_modules\nodemon
> node bin/postinstall || exit 0

Love nodemon? You can now support the project via the open collective:
 > https://opencollective.com/nodemon/donate


> nuxt@2.3.4 postinstall C:\Users\29176\Desktop\learn-mt-app\node_modules\nuxt
> opencollective || exit 0


                                     :=.
                                    -=+=:   :-
                                  .-=+++=: :++=.
                                 .-+++++++=++++=.
                                .=+++++++****++++.
                               :=+++++++******++*+:
                              :=+++++++********++*+:
                             :=+++++++**********++*+-
                            -=+++++++*************+*+-.
                          .-=======+**************++++=.
                          .........::::::::::::::::::::.

                          Thanks for installing nuxtjs
                 Please consider donating to our open collective
                        to help us maintain this package.

                           Number of contributors: 156
                              Number of backers: 138
                            Annual budget: US$ 31,709
                            Current balance: US$ 7,639

                 Donate: https://opencollective.com/nuxtjs/donate

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN eslint-plugin-vue@4.7.1 requires a peer of eslint@^3.18.0 || ^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN acorn-jsx@5.0.1 requires a peer of acorn@^6.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x6                                   4"})

added 1095 packages from 543 contributors in 696.599s

  To get started:

    cd learn-mt-app
    npm run dev

  To build & start for production:

    cd learn-mt-app
    npm run build
    npm start
```

#### 注意事项
nuxt要从2.0 降级到1.4.2，避免后面模板没有更新带来的问题
进行重新编译防止报错 npm install --update-binary
安装 sass-loader 、node-sass

### 首页开发 (home-page)
#### 需求分析
+ 模板设计
  + header 
    + topBar
    + searchBar 
  + body
  + footer
+ 组件设计
  + 如何节省网络请求？
  + 如何语义化？
  + DOM最简化？
+ 数据结构设计
+ 接口设计

