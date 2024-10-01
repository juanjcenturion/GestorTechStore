const { DataTypes } = require ('sequelize');
const sequelize = require('../models/index').sequelize;
const Type = require('../models/type')(sequelize, DataTypes);

const createType = async (req, res) => {
    try {
        const {name} = req.body;

        const type = Type.create({
            name: name,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })

        res.status(201).json({message: 'Tipo de dispositivo creado exitoramente', type})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error al crear el tipo de dispositivo'})
    }
}

module.exports = {createType}