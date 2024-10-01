const { DataTypes } = require('sequelize');
const sequelize = require('../models/index').sequelize;
const {Device, Type, State} = require('../models/index')


const getAllDevices = async (req, res) => {
    try {
        const devices = await Device.findAll({
            attributes: {
                exclude: ['statusId', 'typeId', 'createdAt', 'updatedAt'],
            },
            include: [{
                model: Type,
                as: 'type',
                attributes: ['id','name']
            }, {
                model: State,
                as: 'status',
                attributes: ['id','name']
            }]
        });
        res.status(200).json(devices);
    } catch (error){
        console.error('Error obteniendo todos los dispositivos: ', error)
        res.status(500).json({ error: 'Error obteniendo los Dispositivos' });
    }
}


const createDevice = async (req, res) => {
    try {
        const {marca, modelo, typeId, numero_serie, statusId} = req.body;

        if (!marca || !modelo || !typeId || !numero_serie || !statusId) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const device = await Device.create({
            marca,
            modelo,
            typeId,
            numero_serie,
            statusId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({ message: 'Dispositivo creado exitosamente', device });
    } catch (error) {
        console.error('Error al crear el Dispositivo:', error);
        res.status(500).json({ error: 'Error creando el Dispositivo' });
    }
}


const updateDevice = async (req, res) => {
    const {id} = req.params;

    try {
        const device = await Device.findByPk(id)

        if (!device) {
            return res.status(404).json({message: 'Dispositivo no encontrado.'})
        }

        const updatedFields = {};

        for (const key in req.body) {
            if(req.body.hasOwnProperty(key) && req.body[key] !== undefined) {
                updatedFields[key] = req.body[key]
            }
        }

        if (Object.keys(updatedFields).length >0) {
            await device.update({
                ...updatedFields,
                updatedAt: new Date(),
            })
        }

        
        return res.status(200).json({ message: 'Dispositivo actualizado correctamente.', device });
    } catch (error) {
        console.error('Error al actualizar el dispositivo:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
}


const deleteDevice = async (req, res) => {
    const {id} = req.params

    try {
        const device = await Device.findByPk(id)

        if (!device) {
            return res.status(404).json({message: 'Dispositivo no encontrado.'})
        }

        await device.destroy();

        return res.status(200).json({ message: 'Dispositivo eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el dispositivo:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = {getAllDevices, createDevice, updateDevice, deleteDevice}