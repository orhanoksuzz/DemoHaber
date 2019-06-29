const Sequelize = require('sequelize');
const db = {};
const DBuserName = 'f65I8Gc4Vf';
const DBpassword = 'CzDVYNIhKl';
const DBName = 'f65I8Gc4Vf';
const DBHost = 'remotemysql.com';
const DBPort = '3306';
// Option 1: Passing parameters separately
const sequelize = new Sequelize('f65I8Gc4Vf', 'f65I8Gc4Vf', 'CzDVYNIhKl', {
  host: 'remotemysql.com',
  dialect:'mysql',
  operatorAliases:false,
  pool:{
    max:5,
    min:0,
    acquire:30000,
    idle:10000,
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
