'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Version extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Version.init({
    wgt_url: DataTypes.STRING,
    android_pkg_url: DataTypes.STRING,
    ios_pkg_url: DataTypes.STRING,
    app_version: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Version',
  });
  return Version;
};