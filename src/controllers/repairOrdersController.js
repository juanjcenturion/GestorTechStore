const { DataTypes } = require('sequelize');
const sequelize = require('../models/index').sequelize;
const { RepairOrder, User, Device } = require('../models/index')


const createRepairOrder = async (req, res) => {
    const {fecha, problema, deviceId, userId, estimatedValue} = req.body;
    try {
        if (!fecha || !problema || !deviceId || !userId || !estimatedValue){
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const [day, month, year] = fecha.split('/').map(Number);
        const formattedDate = new Date(year, month - 1, day);

        const repairOrder = await RepairOrder.create({
            fecha:formattedDate,
            problema,
            deviceId,
            userId,
            estimatedValue,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        res.status(201).json({ message: 'Orden creada exitosamente', repairOrder });

    } catch (error) {
        console.error('Error al crear la Orden:', error);
        res.status(500).json({ error: 'Error creando la Orden' });
    }
}


const getAllRepairsOrders = async (req, res) => {
    try {
        const RepairsOrders = await RepairOrder.findAll({
            attributes:{
                exclude: ['deviceId', 'userId', 'createdAt', 'updatedAt']
            },
            include: [{
                model:User,
                as:'User',
                attributes:['id','name', 'email']
            },{
                model:Device,
                as:'Device',
                attributes:['id','marca', 'modelo']
            }]
        })

        res.status(200).json(RepairsOrders);
    } catch (error){
        console.error('Error obteniendo todas las Ordenes: ', error)
        res.status(500).json({ error: 'Error obteniendo las Ordenes' });
    }
};


const updateRepairOrder = async (req, res) => {
    const {id} = req.params;

    try {
        const repairOrder = await RepairOrder.findByPk(id);

        if (!repairOrder) {
            return res.status(404).json({message: 'Orden no encontrada.'})
        }

        const updatedFields = {};
        for (const key in req.body){
            if(req.body.hasOwnProperty(key) && req.body[key] !== undefined) {
                updatedFields[key] = req.body[key]
            }
        }

        if (Object.keys(updatedFields).length > 0) {
            await repairOrder.update({
                ...updatedFields,
                updatedAt: new Date(),
            })
        }

        return res.status(200).json({ message: 'Orden Actualizada correctamente.', repairOrder});

    } catch (error){
        console.error('Error al actualizar la Orden:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


const deleteRepairOrder = async (req, res) => {
    const {id} = req.params;

    try {
        const repairOrder = await RepairOrder.findByPk(id);

        if (!repairOrder) {
            return res.status(404).json({message: 'Orden de reparación no encontrada.'});
        }

        await repairOrder.destroy();
        
        return res.status(200).json({ message: 'Orden de reparación eliminada correctamente.' });

    } catch (error) {
        console.error('Error al eliminar la orden:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = {getAllRepairsOrders , createRepairOrder, updateRepairOrder, deleteRepairOrder}