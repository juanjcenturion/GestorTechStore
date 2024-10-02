const { DataTypes } = require('sequelize');
const sequelize = require('../models/index').sequelize;
const {Repair, RepairOrder} = require('../models/index');

// Registrar reparación
const createRepair = async (req, res) => {
    try {
        const {orderId, fechaInicio, fechaFin, realCost} = req.body;

        if (!orderId || !fechaInicio || !fechaFin || !realCost) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const repair = await Repair.create({
            orderId,
            fechaInicio,
            fechaFin,
            realCost,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        res.status(201).json({ message: 'Reparacion registrada correctamente', repair });
    } catch (error) {
        console.error('Error al crear la Orden:', error);
        res.status(500).json({ error: 'Error creando la Orden' });
    }
};


const getAllRepairs = async (req, res) => {
    try {
        const repairs = await Repair.findAll({
            attributes: {
                exclude:['createdAt', 'updatedAt']
            },
            include : [{
                model: RepairOrder,
                as: "repair_order",
                attributes: ['problema', 'estimatedValue']
            }]
        })
        res.status(200).json(repairs);
    } catch (error) {
        console.error('Error obteniendo todas las Reparaciones: ', error)
        res.status(500).json({ error: 'Error obteniendo las Reparaciones' });
    }
};


const updateRepair = async (req, res) => {
    const {id} = req.params;

    try {
        const repair = await Repair.findByPk(id);

        if (!repair) {
            return res.status(404).json({message: 'Reparacion no encontrada.'});
        }

        const updatedFields = {};
        
        for (const key in req.body){
            if(req.body.hasOwnProperty(key) && req.body[key] !== undefined){
                updatedFields[key] = req.body[key];
            };
        };

        if (Object.keys(updatedFields).length > 0) {
            await repair.update({
                ...updatedFields,
                updatedAt: new Date(),
            });
        };

        return res.status(200).json({ message: 'Reparacion Actualizada correctamente.', repairOrder});

    } catch (error){
        console.error('Error al actualizar la Reparacion:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    };
};

module.exports = {createRepair, getAllRepairs, updateRepair}