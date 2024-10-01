const express = require('express');
const { createUser, getUsers, loginUser, getProfile  } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const authrole = require('../middleware/authRoleMiddleware');
const router = express.Router();

router.post('/users/register', createUser);
router.get('/users/login', loginUser );
router.get('/users/profile', auth, authrole('Admin'), getProfile)
router.get('/users', getUsers);

module.exports = router;
