const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
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
    const users = await User.findAll()
    ctx.response.body = users
  }
  static async findById(ctx, next) {
    const user = await User.findByPk(ctx.params.id)
    ctx.response.body = user
  }

  /**
   * 用户登录
   * @param username
   * @param password
   */

  static async userLogin(ctx, next) {
    try {
      const { username, password } = ctx.request.body
      const users = await User.findAll({
        where: { username },
      })
      if (!users.length) {
        ctx.body = {
          status: false,
          message: '用户名/密码错误',
        }
        return false
      }
      for (const user of users) {
        const isCorrectPwd = await checkPwd(password, user.password)
        if (isCorrectPwd) {
          // ctx.session.userInfo = {
          //   username,
          // }
          // ctx.cookies.set('user', username)
          ctx.body = {
            status: true,
            message: '登录成功',
            token: jwt.sign(
              { name: user.username, id: user.id }, // 加密userToken
              SECRET,
              { expiresIn: Math.floor(Date.now() / 1000) + 60 }
            ),
          }
        } else {
          ctx.body = {
            status: false,
            message: '用户名/密码错误',
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
  static async Logout(ctx, next) {
    ctx.body = {
      status: true,
      message: 'ok',
    }
  }
  static async sessionCheck(ctx, next) {
    if (ctx.session.userInfo) {
      ctx.body = {
        status: true,
        message: 'ok',
      }
    } else {
      ctx.body = {
        status: false,
        message: 'unauthrized',
      }
    }
  }
  /**
   * 获取用户信息
   * @param token
   */

  static async getUserInfoByToken(ctx, next) {
    const token = ctx.header.authorization.split(' ')[1]
    const decoded = jwt.decode(token, { complete: true })
    const user = await User.findByPk(decoded.payload.id)
    const { password, ...data } = user.dataValues
    ctx.body = data
  }
}

module.exports = UserCtrl
