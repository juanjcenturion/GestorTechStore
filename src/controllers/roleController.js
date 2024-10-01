const { DataTypes } = require('sequelize');
const sequelize = require('../models/index').sequelize;
const Role = require('../models/role')(sequelize, DataTypes);

const createRole = async (req, res) => {
    try {
        const {roleName} = req.body

        const role = await Role.create({
            roleName:roleName,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })

        res.status(201).json({message: 'Rol creado exitosamente', role})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error creando el rol'});
    }
}

module.exports = {createRole}