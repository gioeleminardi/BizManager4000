'use strict';
var config = {};

config.database = process.env.DATABASE || 'mongodb://<hostname@port>/<dbname>'
config.secret = process.env.SECRET || '<yousupersecretkey>'
config.jwt = {
    expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME || 1440
}

module.exports = config;