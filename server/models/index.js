import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'production';
const db = {};

let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
    { dialect: process.env.DB_DIALECT, host: process.env.DB_HOST, port: process.env.DB_PORT });
} else if (env === 'test') {
  sequelize = new Sequelize(process.env.DB_TEST_NAME, process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    { dialect: process.env.DB_DIALECT, host: process.env.DB_HOST, port: process.env.DB_PORT });
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
    { dialect: process.env.DB_DIALECT, host: process.env.DB_HOST, port: process.env.DB_PORT });
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

