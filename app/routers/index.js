const Router = require('@koa/router')
const router = new Router()
const UserCtrl = require('../controller/user')

router
  .get('/user/add', UserCtrl.CreateUser)
  .get('/user/update', UserCtrl.updateUser)
  .get('/user/list', UserCtrl.findAll)
  .get('/user/:id', UserCtrl.findById)

module.exports = router
