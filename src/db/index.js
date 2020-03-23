'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');
const Promise = require('bluebird');
const db = {};
const Op = Sequelize.Op;

//Operator symbols to be used when querying data
config.dbConfig.operatorsAliases = {
  $iLike: Op.iLike
};

//connect to the database
const sequelize = new Sequelize(
    config.dbConfig.database,
    config.dbConfig.username,
    config.dbConfig.password,
    config.dbConfig,
);

//reading files from models directory
fs.readdirSync(__dirname + '/models').filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== 'index') &&
    (file.slice(-3) === '.js')).forEach(file => {
  const model = sequelize.import(path.join(__dirname, '/models', file));
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
