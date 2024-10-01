const express = require('express');
const { getAllDevices, createDevice, updateDevice, deleteDevice } = require('../controllers/deviceController');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authrole = require('../middleware/authRoleMiddleware');

router.get('/devices', auth ,getAllDevices);
router.post('/devices', auth , authrole('Admin'), createDevice);
router.put('/devices/:id', auth, authrole('Admin'), updateDevice)
router.delete('/devices/:id', auth, authrole('Admin'), deleteDevice )

module.exports = router;