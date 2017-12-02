'use strict';
// db.js
const mongoose = require('mongoose');
const config = require('../config');
module.exports = mongoose.connect(config.database);