const Router = require('@koa/router')
const router = new Router()
const UserCtrl = require('../controller/user')
const postCtrl = require('../controller/post')
const VersionCtrl = require('../controller/version')

router
  .post('/user/signup', UserCtrl.CreateUser) //用户注册
  .post('/user/login', UserCtrl.userLogin)
  .post('/user/info', UserCtrl.getUserInfoByToken)
  .post('/user/update', UserCtrl.updateUser) //修改密码
  .get('/user/list', UserCtrl.findAll)
  .get('/user/session', UserCtrl.sessionCheck)
  .delete('/user/logout', UserCtrl.Logout)
  .get('/user/:id', UserCtrl.findById)
  .delete('/user/:id', UserCtrl.removeUser)
  .get('/update', VersionCtrl.checkUpdate)
  .post('/post/add', postCtrl.addPost)
  .post('/post/remove/:id', postCtrl.removePost)
  .post('/post/like', postCtrl.ToggleLikes)
  .get('/post/list', postCtrl.findAll)

module.exports = router
