'use strict';
const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../user/User');

exports.sign_in = (req, res) => {
    const username = req.body.username;
    if (!username) return res.status(401).json({ message: 'You must provide username and password parameters.' });
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
                let token = jwt.sign(payload, config.jwt.secret, {
                    expiresIn: config.jwt.expiresIn
                });
                return res.json({ token: token });
            }
        }
    });
};

exports.get_req_token = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt.secret, function (err, decode) {
            if (err) {
                req.user = undefined;
                console.log(err);
                next();
            }
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
};

exports.loginRequired = (req, res, next) => {
    if (req.username) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};