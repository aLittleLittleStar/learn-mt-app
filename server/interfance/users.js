/*
* @Author: Star
* @Date:   2018-12-24 15:55:37
* @Last Modified by:   Star
* @Last Modified time: 2018-12-27 17:28:29
*/
import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/modles/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

// 写接口
// 1.创建路由对象
let router = new Router({
  // 定义users为路由前缀 
  prefix: '/users'
})

// 声明变量：获取redis客户端
let Store = new Redis().client

// 定义注册接口 (post)
router.post('/signup', async (ctx) => {
  // 获取用户信息
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;

  // 进行数据校验
  if (code) {
  	// 先取出发送到后台数据库里面的验证码和有效时间
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    // 再与取出来的验证码进行校验比对
    if (code === saveCode) {
      // 如果验证码失效
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
      // 如果验证码填写错误
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
    // 如果没有填写验证码：进行拦截
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  // 查询用户名是否已经被注册了
  let user = await User.find({
    username
  })
  // 如果存在该用户名
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户名已被注册'
    }
    return
  }
  // 如果一切正常则进行写库
  let nuser = await User.create({
    username,
    password,
    email
  })
  if (nuser) {
    let res = await axios.post('/users/signin', {username, password})
      if (res.data && res.data.code === 0) {
        ctx.body = {
          code: 0,
          msg: '注册成功',
          user: res.data.user
        }
      } else {
        ctx.body = {
          code: -1,
          msg: 'error'
        }
      }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

// 登录接口
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1, 
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
        	code: 1,
        	msg: info,
        	usr: user
        }
      }
    }
  // ctx 进行传递
  })(ctx, next)
})

// 邮箱接口验证
// 发送邮件
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证码请求过于频繁,一分钟内一次'
    }
    return false
  }
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  // 邮件的接收方
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  // 邮件的内容
  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '注册码',
    html: `你的邀请码是${ko.code}`
  }
  // 发送信息
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
      Store.hmset(
        `nodemail: ${ko.user}`,
        'code', ko.code,
        'expire', ko.expire,
        'email', ko.email
      )
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期一分钟'
  }
})

// 退出
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

//将路由器导出
export default router
