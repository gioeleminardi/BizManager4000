// db.js
var mongoose = require('mongoose');
var config = require('../config');
module.exports = mongoose.connect(config.database);