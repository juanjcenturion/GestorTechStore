'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un estado puede tener muchos dispositivos
      State.hasMany(models.Device, {
        foreignKey: 'statusId',  
        as: 'devices'  
      });
    }
  }

  State.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Opcional: si deseas que cada nombre de estado sea único
    }
  }, {
    sequelize,
    modelName: 'State',
  });

  return State;
};
