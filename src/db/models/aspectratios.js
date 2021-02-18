'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AspectRatios extends Model {}
    AspectRatios.init(
        {
            name: DataTypes.STRING,
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.NOW,
            },
        },
        {
            sequelize,
            modelName: 'AspectRatios',
        },
    );
    return AspectRatios;
};
