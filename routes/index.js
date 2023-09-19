const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/api/register', userController.createUser );

module.exports = router;