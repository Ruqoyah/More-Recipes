import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

const basename = path.basename(module.filename);

const db = {};

const sequelize = new Sequelize(`${process.env.DB_DATABASE}_${process.env.NODE_ENV}`, process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  { dialect: process.env.DB_DIALECT, host: process.env.DB_HOST, port: process.env.DB_PORT });

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

