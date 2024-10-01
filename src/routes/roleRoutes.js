const express = require('express');
const {createRole} = require('../controllers/roleController')
const router = express.Router();

router.post('/role/create', createRole);

module.exports = router;