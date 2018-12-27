    /*
* @Author: Star
* @Date:   2018-12-24 15:55:23
* @Last Modified by:   Star
* @Last Modified time: 2018-12-27 18:08:20
*/
import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/modles/users'

passport.use(new LocalStrategy(async function (username, password, done) {
  let where = {
    username
  };
  let result = await UserModel.findOne(where)
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

// 通过session来验证
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser( function (user, done) {
  return done(null, user)
})

// 导出passport
export default passport