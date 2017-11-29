'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../user/User');

exports.sign_in = (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Auth failed. Invalid username.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Auth failed. Invalid password.' });
            } else {
                const payload = {
                    username: user.username,
                    role: 'TEST_ROLE'
                };
                var token = jwt.sign(payload, app.get('jwt_secret_key'), {
                    expiresIn: config.jwt.expiresIn
                });
                return res.json({ token: token });
            }
        }
    });
};

exports.loginRequired = (req, res, next) => {
    if (req.username) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};