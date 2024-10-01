const express = require('express');
const {createType} = require('../controllers/typeController')
const router = express.Router();

router.post('/type/create', createType);

module.exports = router;