const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../routes/users/user.model')(sequelize);
    db.Sensor = require('../routes/sensors/sensor.model')(sequelize);
    db.Sockets = require('../routes/sockets/socket.model')(sequelize);
    db.Weather = require('../routes/weather/weather.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}
