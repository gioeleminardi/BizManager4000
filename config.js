'use strict';
var config = {};

config.database = process.env.DATABASE || 'mongodb://<hostname@port>/<dbname>';
config.jwt = {
    secret: process.env.SECRET || '<yousupersecretkey>',
    expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME || 1440
};
module.exports = config;