'use strict';
const express = require('express');
const router = express.Router();

const auth_controller = require('./AuthController');

router.post('/authenticate', auth_controller.sign_in);

module.exports = router;