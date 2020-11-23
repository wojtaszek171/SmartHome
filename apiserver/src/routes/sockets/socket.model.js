const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        device: { type: DataTypes.STRING, allowNull: true },
        enabled: { type: DataTypes.BOOLEAN, allowNull: true }
    };
    const options = {};

    return sequelize.define('Socket', attributes, options);
}