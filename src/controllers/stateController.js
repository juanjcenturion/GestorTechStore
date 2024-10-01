const { DataTypes } = require('sequelize');
const sequelize = require('../models/index').sequelize;
const State = require('../models/state')(sequelize, DataTypes);

const createState = async (req, res) => {
    try {
        const {name} = req.body;

        const state = await State.create({
            name:name,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })

        res.status(201).json({message: 'Estado Creado Correctamente.', state})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error creando el Estado'});
    }
}

module.exports = {createState}