'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un rol tiene muchos usuarios
      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users', // Cambié 'role' a 'users' para reflejar mejor la relación
      });
    }
  }

  Role.init({
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Role',
  });

  return Role;
};
