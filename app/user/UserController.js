'use strict';
const User = require('./User');

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

exports.create_user = (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) return res.status(400).send({ message: err });
        user.password = undefined;
        res.json(user);
    });
};