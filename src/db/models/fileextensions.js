'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FileExtensions extends Model {}
    FileExtensions.init(
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
            modelName: 'FileExtensions',
        },
    );
    return FileExtensions;
};
