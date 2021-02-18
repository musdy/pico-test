'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
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
            modelName: 'User',
        },
    );
    return User;
};
