const config = require('../env-config');

module.exports = {
    development: {
        host: config.MYSQL_HOST,
        database: config.MYSQL_DB_NAME,
        username: config.MYSQL_USER_NAME,
        password: config.MYSQL_USER_PASS,
        dialect: 'mysql',
    },
    production: {
        host: config.MYSQL_HOST,
        database: config.MYSQL_DB_NAME,
        username: config.MYSQL_USER_NAME,
        password: config.MYSQL_USER_PASS,
        dialect: 'mysql',
    },
};
