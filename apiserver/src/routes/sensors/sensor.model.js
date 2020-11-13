const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        value: { type: DataTypes.FLOAT, allowNull: true }
    };
    const options = {};

    return sequelize.define('Sensor', attributes, options);
}