const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        start: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
            notEmpty: false
        },
        stop: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
            notEmpty: false
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    };
    const options = {};

    return sequelize.define('Socket', attributes, options);
}