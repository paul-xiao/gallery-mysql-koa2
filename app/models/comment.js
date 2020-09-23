'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
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

  Comment.init({
    user_id: {
      type: INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    post_id: {
      type: INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      }
    },
    comment: {
      type: STRING
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};