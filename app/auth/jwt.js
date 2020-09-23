const jwtKoa = require('koa-jwt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')

module.exports = (app) => {
  // Middleware below this line is only reached if JWT token is valid
  // unless the URL starts with '/public'
  app.use(
    jwtKoa({ secret: SECRET }).unless({
      path: [/^\/user\/login/, /^\/user\/signup/], //登录接口不验证
    })
  )

  // 中间件对token进行验证
  app.use(async (ctx, next) => {
    if (ctx.header && ctx.header.authorization) {
      const parts = ctx.header.authorization.split(' ')
      if (parts.length === 2) {
        //取出token
        const scheme = parts[0]
        const token = parts[1]
        if (/^Bearer$/i.test(scheme)) {
          try {
            //jwt.verify方法验证token是否有效
            jwt.verify(token, SECRET, function (err, decoded) {
              console.log(decoded)
            })
          } catch (error) {
            //token过期 生成新的token
            //const newToken = getToken(user)
            //将新token放入Authorization中返回给前端
            //ctx.res.setHeader('Authorization', newToken)
            console.log('token过期')
          }
        }
      }
    }

    return next().catch((err) => {
      console.log(err)
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = {
          code: 401,
          msg: err.message,
        }
      } else {
        throw err
      }
    })
  })
}
