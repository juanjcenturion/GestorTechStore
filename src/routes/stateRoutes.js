const express = require('express');
const {createState} = require('../controllers/stateController')
const router = express.Router();

router.post('/state/create', createState)

module.exports = router;