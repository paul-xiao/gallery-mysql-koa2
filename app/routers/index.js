const Router = require('@koa/router')
const router = new Router()
const UserCtrl = require('../controller/user')

router
  .post('/user/signup', UserCtrl.CreateUser) //用户注册
  .post('/user/login', UserCtrl.userLogin)
  .post('/user/update', UserCtrl.updateUser) //修改密码
  .get('/user/list', UserCtrl.findAll)
  .get('/user/session', UserCtrl.sessionCheck)
  .delete('/user/logout', UserCtrl.Logout)
  .get('/user/:id', UserCtrl.findById)
  .delete('/user/:id', UserCtrl.removeUser)

module.exports = router
