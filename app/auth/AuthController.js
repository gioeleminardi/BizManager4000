'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../user/User');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/authenticate', (req, res) => {
    User.findByUsername(req.body.username, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed.' });
        } else if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) throw err;
                if (!result) res.json({ success: false, message: 'Authentication failed.' });
                if (result) {
                    const payload = {
                        username: user.username,
                        role: 'TEST_ROLE'
                    };
                    var token = jwt.sign(payload, app.get('jwt_secret_key'), {
                        expiresIn: config.jwt.expiresIn
                    });
                    res.json({ success: true, message: 'Authentication ok!', token: token});
                }
            });
        }
    });
});

module.exports = router;