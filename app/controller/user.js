const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
const { User } = require('../models')

const { getEncryptedPwd, checkPwd } = require('../utils')
class UserCtrl {
  static async CreateUser(ctx, next) {

    try {
      const { name, password, ...rest } = ctx.request.body
      if (!name || !password) {
        throw 'name and password is required'
      }
      //重名检查
      const [result] = await User.findAll({ name })
      if (result.length) {
        throw '用户已存在'
      }
      const encryptedPwd = await getEncryptedPwd(password)
      console.log(encryptedPwd)

      await User.create({
        name,
        password: encryptedPwd,
        ...rest
      })
      ctx.body = {
        status: true,
        message: '注册成功',
      }
    } catch (error) {
      console.error(error)
      ctx.body = {
        status: false,
        message: error || '服务器异常',
      }
    }
  }
  static async updateUser(ctx, next) {
    const { id, ...rest } = ctx.request.body
    try {
      await User.update(rest, { id: id })
      ctx.response.body = {
        status: true,
        msg: '更新成功'
      }
    } catch (error) {
      ctx.response.body = {
        status: false,
        msg: error.message || '更新失败'
      }
    }
  }
  static async removeUser(ctx, next) {
    try {
      const res = await User.removeByPK(ctx.params.id)
      console.error(res)
      ctx.response.body = ctx.response.body = {
        status: true,
        msg: '删除成功'
      }
    } catch (error) {
      ctx.response.body = {
        status: false,
        msg: error.message || '删除失败'
      }
    }
  }
  static async findAll(ctx, next) {
    const [result] = await User.findAll()
    ctx.response.body = result
  }
  static async findById(ctx, next) {
    const [result] = await User.findByPk(ctx.params.id)
    ctx.response.body = result[0]
  }

  /**
   * 用户登录
   * @param username
   * @param password
   */

  static async userLogin(ctx, next) {
    try {
      const { name, password } = ctx.request.body
      const [users] = await User.findAll({ name })
      console.log(users)
      if (!users.length) throw '用户名/密码错误'
      for (const user of users) {
        const isCorrectPwd = await checkPwd(password, user.password)
        if (isCorrectPwd) {

          ctx.body = {
            status: true,
            message: '登录成功',
            token: jwt.sign(
              { name: user.name, id: user.id }, // 加密userToken
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
