'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Device.belongsTo(models.Type, {foreignKey : 'typeId'})
      Device.belongsTo(models.State, {foreignKey : 'statusId'})
    }
  }
  Device.init({
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Types',
        key: 'id',
      },
    },
    numero_serie: DataTypes.STRING,
    statusId:{ 
      type: DataTypes.INTEGER,
      references: {
        model: 'States',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};