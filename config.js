var config = {};

config.database = process.env.DATABASE || 'mongodb://<hostname@port>/<dbname>'
config.secret = process.env.SECRET || '<yousupersecretkey>'

module.exports = config;