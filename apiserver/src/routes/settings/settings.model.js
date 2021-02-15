const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    const options = {};

    return sequelize.define('Settings', attributes, options);
}
