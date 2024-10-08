'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un tipo puede tener muchos dispositivos
      Type.hasMany(models.Device, {
        foreignKey: 'typeId', 
        as: 'devices'  
      });
    }
  }

  Type.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Type',
  });

  return Type;
};
