'use strict';
const {
  Model
} = require('sequelize');
module.exports = async (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  const { STRING, INTEGER } = DataTypes
  User.init({
    username: {
      type: STRING,
    },
    avatar: STRING,
    email: STRING,
    password: STRING,
    phone: INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};