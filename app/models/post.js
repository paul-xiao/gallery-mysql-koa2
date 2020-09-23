'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
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
  Post.init({
    user_id: {
      type: INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: STRING,
    desc: STRING,
    content: STRING,
    thunmbnails: STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};