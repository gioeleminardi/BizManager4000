'use strict';
const   jwt = require('jsonwebtoken'),
        config = require('../../config'),
        User = require('./User');

// router.get('/:username/items', (req, res) => {
//     User.findByUsername(req.params.username, (err, user) => {
//         if (err) return res.status(500).send('There was a problem finding the user.');
//         if (!user) return res.status(404).send(`User ${req.params.username} not found.`);
//         Item.findAllByUserId(user._id, (err, items) => {
//             if (err) return res.status(500).send('There was a problem finding the users items.');
//             res.status(200).send(items);
//         });
//     });
// });

exports.get_user = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        if (err) res.send(err);
        res.json(user);
    });
};

exports.get_all_users = (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.send(err);
        res.json(users);
    });
};

exports.update_user = (req, res) => {
    User.findOneAndUpdate({ username: req.params.username }, req.body, { new: true }, (err, user) => {
        if (err) res.send(err);
        res.json(user);
    });
};

exports.delete_user = (req, res) => {
    User.findOneAndRemove({ username: req.params.username }, (err, user) => {
        if (err) res.send(err);
        res.json({ message: `User ${user.username} successfully deleted.` });
    });
};

exports.register = (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) return res.status(400).send({ message: err });
        user.password = undefined;
        res.json(user);
    });
};

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