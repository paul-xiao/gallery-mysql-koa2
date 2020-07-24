const User = require('../models/user')

class UserCtrl {
  static async CreateUser(ctx, next) {
    ctx.response.body = 'cc'
  }
  static async updateUser(ctx, next) {
    ctx.response.body = 'OK'
  }
  static async removeUser(ctx, next) {
    ctx.response.body = 'OK'
  }
  static async findAll(ctx, next) {
    ctx.response.body = 'OK'
  }
  static async findById(ctx, next) {
    ctx.response.body = 'OK'
  }
}

module.exports = UserCtrl
