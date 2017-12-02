'use strict';
const express = require('express');
const router = express.Router();

const auth_controller = require('./AuthController');

router.get('/authenticate', (req, res) => {
    return res.status(405).json({ message: 'Only POST request.' });
});
router.post('/authenticate', auth_controller.sign_in);

module.exports = router;