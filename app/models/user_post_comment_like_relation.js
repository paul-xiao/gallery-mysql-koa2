'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_post_comment_like_relation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_post_comment_like_relation.init({
    user_id: DataTypes.STRING,
    post_id: DataTypes.STRING,
    comment_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_post_comment_like_relation',
  });
  return user_post_comment_like_relation;
};