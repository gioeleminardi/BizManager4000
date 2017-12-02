'use strict';
// app.js
const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./db');
const config = require('../config');
const bodyParser = require('body-parser');

// Routes
const authRoutes = require('./auth/AuthRoutes');
const userRoutes = require('./user/UserRoutes');
const itemRoutes = require('./inventory/InventoryRoutes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

// DEV
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const uuid = require('uuid');

const User = require('./user/User');
const Item = require('./inventory/InventoryItem');

app.use('/api/setup', (req, res) => {
    let users = [1, 2, 3, 4, 5].map(function (_) {
        return {
            firstname: uuid.v4(),
            lastname: uuid.v4(),
            username: uuid.v4(),
            password: uuid.v4(),
            _id: new ObjectId()
        }
    });
    let items = Array.from(new Array(20), function (x, i) { i + 1 }).map(function (_) {
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
    console.log(`Test user ${users[0].username} ${users[0].password}`);
});

app.use('/api/reset', (req, res) => {
    console.log('reset!');
    User.remove({}, () => { });
    Item.remove({}, () => { });
    db.connection.db.dropDatabase();
    res.status(200).send('OK');
});
// END DEV

// Error Handling
app.use((req, res) => {
    res.status(404).json({message: 'Url not found.'});
});

module.exports = app;