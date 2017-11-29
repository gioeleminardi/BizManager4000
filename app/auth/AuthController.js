'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../user/User');

exports.sign_in = (req, res) => {
    const username = req.body.username;
    if (!username) return res.status(401).json({message: 'You must provide username and password parameters.'});
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Auth failed. User not found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Auth failed. Invalid password.' });
            } else {
                const payload = {
                    username: user.username,
                    role: 'TEST_ROLE'
                };
                var token = jwt.sign(payload, config.jwt.secret, {
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