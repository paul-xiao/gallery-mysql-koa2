'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      avatar: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      nickname: DataTypes.STRING,
      region: DataTypes.STRING,
      id_number: DataTypes.Number,
      points: DataTypes.Number,
      balance: DataTypes.Number,
      signin_days: DataTypes.Number,
      draw_times: DataTypes.Number,
      level: DataTypes.Number,
      exp: DataTypes.Number,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
