const express = require('express');
const { createRepair, getAllRepairs, updateRepair  } = require('../controllers/repairController')
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authrole = require('../middleware/authRoleMiddleware');

router.post('/repairs', auth, authrole("Tecnico"), createRepair);
router.get('/repairs', auth, getAllRepairs );
router.put('/repairs/:id', auth, authrole("Tecnico"), updateRepair);

module.exports = router