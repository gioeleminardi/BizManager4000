// app.js
var express = require('express');
var app = express();
var morgan = require('morgan');
var db = require('./db');
var UserController = require('./user/UserController');
var ItemController = require('./inventory/InventoryController');

app.use(morgan('dev'));
app.use('/api/users', UserController);
app.use('/api/items', ItemController);

// DEV
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const uuid = require('uuid');

var User = require('./user/User');
var Item = require('./inventory/InventoryItem');

app.use('/api/setup', (req, res) => {
    var users = [1, 2, 3, 4, 5].map(function (_) {
        return {
            firstname: uuid.v4(),
            lastname: uuid.v4(),
            username: uuid.v4(),
            password: uuid.v4(),
            _id: new ObjectId()
        }
    });
    var items = Array.from(new Array(20), function (x, i) { i + 1 }).map(function (_) {
        return {
            _id: new ObjectId(),
            serialnumber: uuid.v4(),
            model: uuid.v4(),
            brand: uuid.v4(),
            description: uuid.v4(),
            user_id: users[Math.floor(Math.random() * 5)]._id
        }
    });
    User.create(users, function (err) {
        if (err) { return console.log(err) }
        Item.create(items, function (err) {
            if (err) { return console.log(err) }
            res.status(200).send('OK');
        });
    });
});

app.use('/api/reset', (req, res) => {
    console.log('reset!');
    User.remove({}, () => { });
    Item.remove({}, () => { });
    res.status(200).send('OK');
});
// END DEV

module.exports = app;