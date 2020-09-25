const Koa = require('koa')
const koaBody = require('koa-body')
const serve = require('koa-static')
const { resolve } = require('path')
// const webpackConfig = require('./app/config/webpack.config')
const router = require('./app/routers') // load routers
const chalk = require('chalk')
const cors = require('@koa/cors') //跨域处理
const jwt_auth = require('./app/auth/jwt')
const app = new Koa()



jwt_auth(app) //jwt Auth

async function start() {
  try {
    app.keys = ['some secret hurr']
    app.use(koaBody({
      multipart: true,
      formidable: {
        maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
      }
    }))
    app.use(
      cors({
        origin: 'http://localhost:8080/', //只允许http://localhost:8080这个域名的请求
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['origin', 'Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
      })
    )
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
