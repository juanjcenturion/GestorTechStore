'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Repair.belongsTo(models.Repair_order, {foreignKey : 'orderId'})

    }
  }
  Repair.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:'Repair_orders',
        key: 'id'
      }
    },
    fechaInicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    realCost: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Repair',
  });
  return Repair;
};