require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: `${process.env.DB_DATABASE}_${process.env.NODE_ENV}`,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  production: {
    use_env_variable: 'DB_URL_PROD'
  }
};
