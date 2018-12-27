
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
// 导入安装包
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const Redis = require('koa-redis')
const json = require('koa-json')
const passport = require('koa-passport')
// const dbConfig = require('./dbs/config')
// const users = require('./interfance/users')
import dbConfig from './dbs/config'
import router from './interfance/users'


const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  // 启动数据库
  store: new Redis()
}))

// 扩展类型的处理
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())

// 连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

// 对passport进行初始化，否则后面的验证方法无法执行
app.use(passport.initialize())

// 这个主要是为了记住用户的登录状态，可以指定session过期时间
app.use(passport.session())



// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // 获取所有的路由表
  app.use(router.routes()).use(router.allowedMethods())
  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
