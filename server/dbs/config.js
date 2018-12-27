/*
* @Author: Star
* @Date:   2018-12-24 15:54:47
* @Last Modified by:   Star
* @Last Modified time: 2018-12-26 15:05:08
*/
// QQ邮箱授权码 mmuznigclhbadfid
module.exports =  {
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host () {
      return '127.0.0.1'
    },
    get port () {
      return 6379
    }
  },
  smtp: {
    // 设置验证的为QQ邮箱
    get host () {
      return 'smtp.qq.com'
    },
    // 接受的QQ账号
    get user () {
      return '2917615487@qq.com'
    },
    // QQ邮箱授权码
    get pass () {
      return 'mmuznigclhbadfid'
    },
    // 上成随机验证码
    get code () {
      return () => {
        // 转化为16进制[toString(16)]的4位数[slice(2, 6)]大写[toUpperCase()]的随机值
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    // 设置验证码的过期时间[有效时间]
    get expire () {
      return () => {
        // 设置有效时间为一分钟
        return new Date().getTime() + 60*1000
      }
    }
  }
}