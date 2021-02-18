import config from '../../env-config';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const db = {};
const sequelize = new Sequelize({
    host: config.MYSQL_HOST,
    database: config.MYSQL_DB_NAME,
    username: config.MYSQL_USER_NAME,
    password: config.MYSQL_USER_PASS,
    dialect: 'mysql',
});

fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.slice(-3) === '.js';
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { Video, AspectRatios, FileExtensions, User } = db;

if (config.isLocal) {
    AspectRatios.sync({ alter: true });
    FileExtensions.sync({ alter: true });
    Video.sync({ alter: true });
    User.sync({ alter: true });
}

Video.belongsTo(AspectRatios);
Video.belongsTo(FileExtensions);

export default db;
