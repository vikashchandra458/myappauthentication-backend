const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
module.exports = db = {};

initialize();

async function initialize() {
    const { host, port, user, password, database } = config.database;
    
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
    if (!sequelize) {
        console.log(`Connection Failed 🚫`)
    } else {
        console.log(`Connected ✅`)
    }
    // init models and add them to the exported db object
    db.User = require('../API/users/dto/user.dto')(sequelize);
    // sync all models with database
    await sequelize.sync();
}