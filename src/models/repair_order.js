'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repair_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Repair_order.belongsTo(models.Devices, {foreignKey: 'deviceId'});
      Repair_order.belongsTo(models.Users, {foreignKey: 'userId'})
    }
  }
  Repair_order.init({
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    problema: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deviceId: {
      type: DataTypes.INTEGER,
      references: {
        model:'Devices',
        key:'id',
      },
      allowNull: false,
    },
    userId:{
      type: DataTypes.INTEGER,
      references :{
        model:'Users',
        key: 'id',
      },
      allowNull:false,
    },
    estimatedValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'repair_order',
  });
  return Repair_order;
};