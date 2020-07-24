const Koa = require('koa')
// const koaWebpack = require('koa-webpack')
const serve = require('koa-static')
const webpack = require('webpack')
const { resolve } = require('path')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const webpackConfig = require('./app/config/webpack.config')
const router = require('./app/routers') // load routers
const chalk = require('chalk')

const app = new Koa()
const compiler = webpack(webpackConfig)

const wdm = webpackDevMiddleware(compiler, {
  noInfo: true,
  //publicPath: config.output.publicPath
})

async function start() {
  console.log(chalk.bgBlue('wcao111'))

  //  const compiler = webpack(webpackConfig)
  try {
    // const middleware = await koaWebpack({
    //   compiler,
    // })
    // app.use(middleware)

    app.use(wdm)
    app.use(webpackHotMiddleware(compiler))
    app.use(serve(resolve(__dirname, './app/public'))) // static files
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(3000)
    console.log(chalk.bgBlue('service running at localhost:3000'))
  } catch (e) {
    console.log(e)
  }
}
start()
