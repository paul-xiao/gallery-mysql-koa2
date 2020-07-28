const { User } = require('../models')
const { getEncryptedPwd, checkPwd } = require('../utils')
class UserCtrl {
  static async CreateUser(ctx, next) {
    try {
      const { username, password } = ctx.request.body
      console.log(username)

      //重名检查
      const user = await User.findAll({
        where: {
          username,
        },
      })
      if (user.length) {
        throw '用户已存在'
      }
      const encryptedPwd = await getEncryptedPwd(password)
      console.log(encryptedPwd)

      await User.create({
        username,
        password: encryptedPwd,
      })
      ctx.body = {
        status: true,
        message: '注册成功',
      }
    } catch (error) {
      ctx.body = {
        status: false,
        message: error || '服务器异常',
      }
    }
  }
  static async updateUser(ctx, next) {
    const { id, name } = ctx.request.body
    console.log(id, name)
    const user = await User.update({ username: name }, { where: { id: id } })
    ctx.response.body = user
  }
  static async removeUser(ctx, next) {
    await User.destroy({ where: { id: ctx.params.id } })
    ctx.response.body = 'OK'
  }
  static async findAll(ctx, next) {
    console.log(ctx.cookie)
    const users = await User.findAll()
    ctx.response.body = users
  }
  static async findById(ctx, next) {
    const user = await User.findByPk(ctx.params.id)
    ctx.response.body = user
  }
  static async userLogin(ctx, next) {
    try {
      const { username, password } = ctx.request.body
      const users = await User.findAll({
        where: { username },
      })
      for (const user of users) {
        const isCorrectPwd = await checkPwd(password, user.password)
        if (isCorrectPwd) {
          ctx.session.userInfo = {
            username,
          }
          ctx.body = {
            status: true,
            message: '登录成功',
            user: username,
          }
        }
      }
    } catch (error) {
      console.log(error.message)
      ctx.body = {
        status: false,
        message: error.message || '服务端错误',
      }
    }
  }
}

module.exports = UserCtrl
