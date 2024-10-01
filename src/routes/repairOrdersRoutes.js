const express = require('express');
const {createRepairOrder, getAllRepairsOrders, updateRepairOrder, deleteRepairOrder} = require('../controllers/repairOrdersController');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authrole = require('../middleware/authRoleMiddleware');

router.post('/repair_orders', auth, authrole("Tecnico"), createRepairOrder);
router.get('/repair_orders', auth, getAllRepairsOrders);
router.put('/repair_orders/:id', auth, authrole("Tecnico"), updateRepairOrder);
router.delete('/repair_orders/:id', auth, authrole("Admin"), deleteRepairOrder);


module.exports = router;