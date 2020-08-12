const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const serve = require('koa-static')
const { resolve } = require('path')
// const webpackConfig = require('./app/config/webpack.config')
const router = require('./app/routers') // load routers
const chalk = require('chalk')
const cors = require('@koa/cors') //跨域处理
const CONFIG = {
  key: 'koa.sess' /** (string) cookie key (default is koa.sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: false /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
  secure: false /** (boolean) secure cookie*/,
  sameSite: null /** (string) session cookie sameSite options (default null, don't set it) */,
}
const app = new Koa()
async function start() {
  try {
    app.keys = ['some secret hurr']
    app.use(bodyParser())
    app.use(
      cors({
        origin: 'http://localhost:8081', //只允许http://localhost:8080这个域名的请求
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['origin', 'Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
      })
    )
    app.use(session(CONFIG, app)) // use default session config
    app.use(serve(resolve(__dirname, './app/public'))) // static files
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(3000)
    console.log('service running at:', chalk.blue('http://localhost:3000'))
  } catch (e) {
    console.log(e)
  }
}
start()
